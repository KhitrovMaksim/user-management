import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AddPayloadInterface } from './interfaces/add-payload.interface';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async generateJwtToken(payload: AddPayloadInterface): Promise<string> {
    return this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('PRIVATE_KEY'),
      expiresIn: '24h',
    });
  }
}
