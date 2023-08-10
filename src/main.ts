import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('User management')
    .setDescription('User management with rating, avatars and jwt auth')
    .setVersion('1.0.0')
    .addTag('Maksim Khitrov')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  const configService: ConfigService = app.get(ConfigService);
  await app.listen(configService.getOrThrow('PORT'));
}

bootstrap();
