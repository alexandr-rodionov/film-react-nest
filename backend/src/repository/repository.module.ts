import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmsSchema } from '../schemas/films.schema';
import { FilmsEntity } from '../films/entity/films.entity';
import { AbstractFilmsRepository } from './films.repository';
import { FilmsMongoRepository } from './films.repository.mongo';
import { FilmsPostgresRepository } from './films.repository.postgres';

@Module({
  imports: [
    process.env.DATABASE_DRIVER === 'mongodb'
      ? MongooseModule.forFeature([{ name: 'Films', schema: FilmsSchema }])
      : TypeOrmModule.forFeature([FilmsEntity]),
  ],
  providers: [
    {
      provide: AbstractFilmsRepository,
      useClass:
        process.env.DATABASE_DRIVER === 'mongodb'
          ? FilmsMongoRepository
          : FilmsPostgresRepository,
    },
  ],
  exports: [AbstractFilmsRepository],
})
export class RepositoryModule {}
