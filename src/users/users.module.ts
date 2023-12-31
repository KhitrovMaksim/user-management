import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersServiceAbstract } from './users-service-abstract/users-service-abstract';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { RolesModule } from '../roles/roles.module';
import { RoleSchema } from '../roles/schemas/role.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Role', schema: RoleSchema },
    ]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: UsersServiceAbstract,
      useClass: UsersService,
    },
  ],
  exports: [
    {
      provide: UsersServiceAbstract,
      useClass: UsersService,
    },
  ],
})
export class UsersModule {}
