import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthServiceAbstract } from './auth-service-abstract/auth-service-abstract';
import { RegisterUserDto } from './dtos/register-user.dto';
import mongoose from 'mongoose';
import { LoginUserDto } from './dtos/login-user.dto';

describe('AuthController', () => {
  let authController: AuthController;
  const mockAuthService = {
    registration: jest.fn((dto) => {
      return {
        _id: '64d019d97ce88a141ace76a8' as unknown as mongoose.Schema.Types.ObjectId,
        role: '24d019d97ce88a141ace76a8' as unknown as mongoose.Schema.Types.ObjectId,
        ...dto,
        token: 'token',
      };
    }),
    login: jest.fn((dto) => {
      return mockToken;
    }),
  };
  const mockRegisterUserDto: RegisterUserDto = {
    firstname: 'Max',
    lastname: 'Max',
    nickname: 'Max',
    password: 'Max',
  };
  const mockLoginUserDto: LoginUserDto = {
    nickname: 'Max',
    password: 'Max',
  };
  const mockToken = 'token';

  beforeEach(async () => {
    const authModule: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthServiceAbstract,
          useClass: AuthService,
        },
      ],
    })
      .overrideProvider(AuthServiceAbstract)
      .useValue(mockAuthService)
      .compile();

    authController = authModule.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('should return user and token', () => {
    expect(authController.registration(mockRegisterUserDto)).toEqual({
      _id: '64d019d97ce88a141ace76a8',
      firstname: 'Max',
      lastname: 'Max',
      nickname: 'Max',
      password: 'Max',
      role: '24d019d97ce88a141ace76a8',
      token: mockToken,
    });
    expect(mockAuthService.registration).toHaveBeenCalledWith(
      mockRegisterUserDto,
    );
  });

  it('should return token', () => {
    expect(authController.login(mockLoginUserDto)).toEqual(mockToken);
    expect(mockAuthService.login).toHaveBeenCalledWith(mockLoginUserDto);
  });
});
