import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async generateJwtToken(user): Promise<string> {
    const payload = {
      id: user._id,
      nickname: user.nickname,
      role: user.role,
      updated_at: user.updated_at,
    };
    return this.jwtService.sign(
      { payload },
      {
        secret: this.configService.getOrThrow('PRIVATE_KEY'),
        expiresIn: '24h',
      },
    );
  }
}
