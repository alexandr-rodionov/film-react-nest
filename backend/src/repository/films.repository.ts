import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IFilms } from '../schemas/films.schema';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectModel('Films') private readonly filmsModel: Model<IFilms>,
  ) {}

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
