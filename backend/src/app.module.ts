import * as path from 'node:path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { configProvider } from './app.config.provider';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';

const { database, serveStatic } = configProvider.useValue;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRoot(database.url),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', serveStatic.rootPath),
      serveRoot: serveStatic.serveRoot,
    }),
    FilmsModule,
    OrderModule,
  ],
  providers: [configProvider],
})
export class AppModule {}
