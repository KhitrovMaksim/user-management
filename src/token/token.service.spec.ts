import { TokenService } from './token.service';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { AddPayloadInterface } from './interfaces/add-payload.interface';

describe('TokenService', () => {
  const payload: AddPayloadInterface = {
    id: '64d019d97ce88a141ace76a8' as unknown as mongoose.Schema.Types.ObjectId,
    nickname: 'Max10',
    role: 'admin',
    updatedAt: new Date('2023-08-06T22:07:58.879Z'),
  };
  let tokenService: TokenService;
  let jwtService: JwtService;
  let configService: ConfigService;
  const privateKey = 'PRIVATE_KEY';
  const token = 'jwtToken';

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [TokenService, JwtService, ConfigService],
    }).compile();

    tokenService = moduleRef.get<TokenService>(TokenService);
    jwtService = moduleRef.get<JwtService>(JwtService);
    configService = moduleRef.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(tokenService).toBeDefined();
  });

  it('should return the token', async () => {
    jest.spyOn(jwtService, 'sign').mockReturnValue(token);
    jest.spyOn(configService, 'getOrThrow').mockReturnValue(privateKey);
    const result = await tokenService.generateJwtToken(payload);
    expect(result).toEqual(token);
  });
});
