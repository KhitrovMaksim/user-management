import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AddPayloadInterface } from './interfaces/add-payload.interface';
import { TokenServiceAbstract } from './token-service-abstract/token-service-abstract';

@Injectable()
export class TokenService extends TokenServiceAbstract {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  public async generateJwtToken(payload: AddPayloadInterface): Promise<string> {
    return this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('PRIVATE_KEY'),
      expiresIn: '24h',
    });
  }
}
