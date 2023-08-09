import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersServiceAbstract } from './users-service-abstract/users-service-abstract';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserInterface } from './interfaces/update-user.interface';
import { Hash } from '../libs/hash/hash';
import { UsersPaginationDto } from './dtos/users-pagination.dto';
import { LastVoteUpdateDto } from './dtos/last-vote-update.dto';
import { usersWithRating } from './queries/aggregate.query';

@Injectable()
export class UsersService extends UsersServiceAbstract {
  constructor(@InjectModel(User.name) private userModel: mongoose.Model<User>) {
    super();
  }

  async getListOfUsers(query: UsersPaginationDto): Promise<User[]> {
    const users: User[] = await this.userModel
      .find({ deleted_at: { $eq: null } })
      .select('_id nickname firstname lastname updated_at role');

    if (!query.page || !query.limit) {
      return users;
    }

    const startIndex: number = (query.page - 1) * query.limit;
    const endIndex: number = query.page * query.limit;
    const result: User[] = users.slice(startIndex, endIndex);
    return result;
  }

  async deleteUser(userId: string): Promise<User> {
    try {
      const user: User = await this.userModel.findOne({ _id: userId });

      if (!user)
        throw new NotFoundException({
          message: `User with id ${userId} was not found.`,
        });

      if (user.deleted_at) {
        throw new HttpException(
          `User with id ${userId} was deleted.`,
          HttpStatus.NO_CONTENT,
        );
      }

      const newData = {
        updated_at: new Date().toISOString(),
        deleted_at: new Date().toISOString(),
      };

      const softDeletedUser: User = await this.userModel
        .findOneAndUpdate(
          {
            _id: userId,
          },
          newData,
        )
        .select('_id nickname firstname lastname');

      return softDeletedUser;
    } catch (e) {
      return e.message;
    }
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const newUserWithExtraData: User = await this.userModel.create(dto);
    const jsonNewUser: string = JSON.stringify(newUserWithExtraData);
    const newUserOnlyWithUserData = JSON.parse(jsonNewUser);
    return newUserOnlyWithUserData;
  }

  async updateUser(userDataToUpdate: UpdateUserInterface): Promise<User> {
    const user: User = await this.userModel.findOne({
      _id: userDataToUpdate.id,
    });

    if (!user || user.deleted_at !== null)
      throw new NotFoundException({
        message: `User with id ${userDataToUpdate.id} was not found or deleted.`,
      });

    if (
      userDataToUpdate.unmodifiedSince.getTime() < user.updated_at.getTime()
    ) {
      throw new HttpException(
        'Precondition Failed',
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    if (userDataToUpdate.nickname) {
      const candidate: User = await this.userModel.findOne({
        nickname: userDataToUpdate.nickname,
      });
      if (candidate) {
        throw new HttpException(
          `User with nickname ${userDataToUpdate.nickname} already exist.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    const newData = {
      nickname: !userDataToUpdate.nickname
        ? user.nickname
        : userDataToUpdate.nickname,
      password: !userDataToUpdate.password
        ? user.password
        : await Hash.getHashedPassword(userDataToUpdate.password),
      firstname: !userDataToUpdate.firstname
        ? user.firstname
        : userDataToUpdate.firstname,
      lastname: !userDataToUpdate.lastname
        ? user.lastname
        : userDataToUpdate.lastname,
      updated_at: new Date().toISOString(),
    };

    const updatedUser: User = await this.userModel.findOneAndUpdate(
      {
        _id: userDataToUpdate.id,
      },
      newData,
    );

    return updatedUser;
  }

  async findUserByNickname(nickname: string): Promise<User> {
    return this.userModel.findOne({ nickname });
  }

  async findUserById(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id });
  }

  async updateUserLastVote(lastVoteDto: LastVoteUpdateDto): Promise<User> {
    return this.userModel.findOneAndUpdate(
      { _id: lastVoteDto.userId },
      { last_vote: new Date().toISOString() },
    );
  }

  async getListOfUsersWithRating(): Promise<User[]> {
    return this.userModel.aggregate(usersWithRating);
  }
}
