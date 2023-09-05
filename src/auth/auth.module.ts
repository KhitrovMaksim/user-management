import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthServiceAbstract } from './auth-service-abstract/auth-service-abstract';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/schemas/user.schema';
import { UsersModule } from '../users/users.module';
import { TokenModule } from '../token/token.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    TokenModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('PRIVATE_KEY'),
        signOptions: {
          expiresIn: '24h',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthServiceAbstract,
      useClass: AuthService,
    },
  ],
  exports: [
    {
      provide: AuthServiceAbstract,
      useClass: AuthService,
    },
    JwtModule,
  ],
})
export class AuthModule {}
