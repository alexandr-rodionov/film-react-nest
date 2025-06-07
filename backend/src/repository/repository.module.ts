import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmsRepository } from './films.repository';
import { FilmsSchema } from '../schemas/films.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Films', schema: FilmsSchema }]),
  ],
  providers: [FilmsRepository],
  exports: [FilmsRepository],
})
export class RepositoryModule {}
