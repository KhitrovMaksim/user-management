import { forwardRef, Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { FilesServiceAbstract } from './files-service-abstract/files-service-abstract';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    ThrottlerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ttl: configService.getOrThrow('UPLOAD_RATE_TTL'),
        limit: configService.getOrThrow('UPLOAD_RATE_LIMIT'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [FilesController],
  providers: [
    {
      provide: FilesServiceAbstract,
      useClass: FilesService,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [
    {
      provide: FilesServiceAbstract,
      useClass: FilesService,
    },
  ],
})
export class FilesModule {}
