import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TokenServiceAbstract } from './token-service-abstract/token-service-abstract';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule,
  ],
  providers: [
    {
      provide: TokenServiceAbstract,
      useClass: TokenService,
    },
    JwtStrategy,
  ],
  exports: [
    {
      provide: TokenServiceAbstract,
      useClass: TokenService,
    },
  ],
})
export class TokenModule {}
