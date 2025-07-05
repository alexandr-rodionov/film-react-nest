import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerFactory } from './loggers/logger.factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const loggerFactory = await app.resolve(LoggerFactory);
  const logger = loggerFactory.create({
    type: process.env.LOGGER_TYPE || 'dev',
    dirName: process.env.LOGGER_DIR || '/logs',
    allowedLevels: process.env.LOGGER_LEVELS || '*',
  });

  app.useLogger(logger);

  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
