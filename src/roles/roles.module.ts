import { forwardRef, Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RolesServiceAbstract } from './roles-service-abstract/roles-service-abstract';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchema } from './schemas/role.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Role', schema: RoleSchema }]),
    AuthModule,
  ],
  controllers: [RolesController],
  providers: [
    {
      provide: RolesServiceAbstract,
      useClass: RolesService,
    },
  ],
  exports: [
    {
      provide: RolesServiceAbstract,
      useClass: RolesService,
    },
  ],
})
export class RolesModule {}
