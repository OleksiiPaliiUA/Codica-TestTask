import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { version } from '../package.json';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  ApiKeyEnum,
  EnvEnum,
  NestHttpExceptionFilter,
  TimeoutInterceptor,
} from '@common';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('bootstrap');

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: await configService.get(EnvEnum.CORS_ORIGINS).split(','),
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      disableErrorMessages: false,
    }),
  );
  app.useGlobalFilters(new NestHttpExceptionFilter());
  app.useGlobalInterceptors(new TimeoutInterceptor(5000));

  const options = new DocumentBuilder()
    .setTitle('Codica - API')
    .setDescription('Codica api')
    .setVersion(version)
    .addApiKey(
      {
        type: 'apiKey',
        name: ApiKeyEnum.HeaderName,
        in: 'header',
      },
      ApiKeyEnum.HeaderName,
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  process.on('unhandledRejection', (reason: unknown, p: unknown) => {
    const message = `Unhandled Rejection at: Promise: ${p}, reason: ${reason}`;
    console.error(message);
    logger.error(message);
    process.abort();
  });
  process.on('uncaughtException', (err: unknown, origin: unknown) => {
    const message = `Unhandled Exception at: ${err}: err, origin: ${origin}`;
    console.error(message);
    logger.error(message);
    process.abort();
  });

  await app.listen(await configService.get(EnvEnum.PORT));
}
bootstrap();
