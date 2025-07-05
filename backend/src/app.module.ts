import * as path from 'node:path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { configProvider } from './app.config.provider';
import { LoggerFactory } from './loggers/logger.factory';
import { FilmsEntity, ScheduleEntity } from './films/entity/films.entity';

const { database, serveStatic } = configProvider.useValue;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    database.driver == 'mongodb'
      ? MongooseModule.forRoot(
          `${database.driver}://${database.host}:${database.port}/${database.name}`,
        )
      : TypeOrmModule.forRoot({
          type: database.driver,
          host: database.host,
          port: database.port,
          username: database.user.name,
          password: database.user.password,
          database: database.name,
          entities: [FilmsEntity, ScheduleEntity],
          synchronize: true,
        }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', serveStatic.rootPath),
      serveRoot: serveStatic.serveRoot,
    }),
    FilmsModule,
    OrderModule,
  ],
  providers: [configProvider, LoggerFactory],
})
export class AppModule {}
