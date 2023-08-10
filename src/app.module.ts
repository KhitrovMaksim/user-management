import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesModule } from './files/files.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from './roles/roles.module';
import { TokenModule } from './token/token.module';
import { VotesModule } from './votes/votes.module';
import { QueuesModule } from './queues/queues.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL_USER_MANAGMENT),
    FilesModule,
    UsersModule,
    AuthModule,
    RolesModule,
    TokenModule,
    VotesModule,
    QueuesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
