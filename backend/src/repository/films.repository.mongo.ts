import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractFilmsRepository } from './films.repository';
import { IFilms } from '../schemas/films.schema';

@Injectable()
export class FilmsMongoRepository extends AbstractFilmsRepository {
  constructor(
    @InjectModel('Films') private readonly filmsModel: Model<IFilms>,
  ) {
    super();
  }

  async findAll(): Promise<IFilms[]> {
    return await this.filmsModel.find().exec();
  }

  async findById(id: string): Promise<IFilms | null> {
    return await this.filmsModel.findOne({ id }).exec();
  }

  async findMany(ids: string[]): Promise<IFilms[]> {
    return await this.filmsModel.find({ id: { $in: ids } }).exec();
  }

  async updateFilm(film: IFilms): Promise<void> {
    await film.save();
  }

  async updateMany(films: IFilms[]): Promise<void> {
    await this.filmsModel.bulkWrite(
      films.map((film) => ({
        updateOne: {
          filter: { id: film.id },
          update: film,
        },
      })),
    );
  }
}
