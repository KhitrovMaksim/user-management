import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TokenServiceAbstract } from './token-service-abstract/token-service-abstract';

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
    JwtService,
  ],
  exports: [
    {
      provide: TokenServiceAbstract,
      useClass: TokenService,
    },
  ],
})
export class TokenModule {}
