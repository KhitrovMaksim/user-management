import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { VotesServiceAbstract } from './votes-service-abstract/votes-service-abstract';
import { AddVoteDto } from './dtos/add-vote.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Vote } from './schemas/vote.schema';
import { User } from '../users/schemas/user.schema';
import { ConfigService } from '@nestjs/config';
import { UsersServiceAbstract } from '../users/users-service-abstract/users-service-abstract';
import { DeleteVoteDto } from './dtos/delete-vote.dto';

@Injectable()
export class VotesService extends VotesServiceAbstract {
  constructor(
    @InjectModel(Vote.name) private voteModel: mongoose.Model<Vote>,
    private readonly userService: UsersServiceAbstract,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async addVote(voteDto: AddVoteDto): Promise<Vote> {
    const isVotedForSameProfile: Vote = await this.voteModel.findOne({
      voter: voteDto.voterId,
      profile: voteDto.profileId,
    });

    if (isVotedForSameProfile)
      throw new HttpException(
        'You can not vote twice for the same profile.',
        HttpStatus.CONFLICT,
      );

    const voter: User = await this.userService.findUserById(voteDto.voterId);

    if (voter.last_vote) {
      const toDay = new Date();

      if (
        toDay.getTime() - voter.last_vote.getTime() <
        this.configService.getOrThrow('HOUR')
      ) {
        throw new HttpException(
          'You can vote only one time per hour.',
          HttpStatus.CONFLICT,
        );
      }
    }

    await this.userService.updateUserLastVote({
      userId: voteDto.voterId,
      lastVote: new Date(),
    });

    const vote: Vote = await this.voteModel.create({
      voter: voteDto.voterId,
      profile: voteDto.profileId,
      vote: voteDto.vote === 'increment' ? 1 : -1,
    });
    return vote;
  }

  async updateVote(voteDto: AddVoteDto): Promise<Vote> {
    const vote: Vote = await this.voteModel.findOneAndUpdate(
      { voter: voteDto.voterId, profile: voteDto.profileId },
      { vote: voteDto.vote === 'increment' ? 1 : -1 },
    );
    return vote;
  }

  async deleteVote(
    voteDto: DeleteVoteDto,
  ): Promise<mongoose.mongo.DeleteResult> {
    const result: mongoose.mongo.DeleteResult = await this.voteModel.deleteOne({
      voter: voteDto.voterId,
      profile: voteDto.profileId,
    });
    return result;
  }
}
