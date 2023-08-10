import { Module } from '@nestjs/common';
import { QueuesProcessor } from './queues.processor';
import { FilesModule } from '../files/files.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [FilesModule, UsersModule],
  providers: [QueuesProcessor],
})
export class QueuesModule {}
