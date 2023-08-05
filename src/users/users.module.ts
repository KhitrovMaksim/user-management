import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersServiceAbstract } from './users-service-abstract/users-service-abstract';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: UsersServiceAbstract,
      useClass: UsersService,
    },
  ],
})
export class UsersModule {}
