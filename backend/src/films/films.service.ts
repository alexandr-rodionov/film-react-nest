import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { IFilms } from '../schemas/films.schema';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll(): Promise<IFilms[]> {
    return await this.filmsRepository.findAll();
  }

  async findById(id: string): Promise<IFilms | null> {
    return await this.filmsRepository.findById(id);
  }
}
