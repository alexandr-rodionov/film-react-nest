import { Injectable } from '@nestjs/common';
import { AbstractFilmsRepository } from '../repository/films.repository';
import { IFilms } from '../schemas/films.schema';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: AbstractFilmsRepository) {}

  async findAll(): Promise<IFilms[]> {
    return await this.filmsRepository.findAll();
  }

  async findById(id: string): Promise<IFilms | null> {
    return await this.filmsRepository.findById(id);
  }
}
