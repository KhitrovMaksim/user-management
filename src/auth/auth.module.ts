import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthServiceAbstract } from './auth-service-abstract/auth-service-abstract';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    UsersModule,
    TokenModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthServiceAbstract,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
