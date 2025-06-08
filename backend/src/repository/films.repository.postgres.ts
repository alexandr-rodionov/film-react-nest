import { Repository, In } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmsEntity } from '../films/entity/films.entity';
import { AbstractFilmsRepository } from './films.repository';

@Injectable()
export class FilmsPostgresRepository extends AbstractFilmsRepository {
  constructor(
    @InjectRepository(FilmsEntity)
    private readonly filmsRepository: Repository<FilmsEntity>,
  ) {
    super();
  }

  async findAll(): Promise<FilmsEntity[]> {
    return await this.filmsRepository.find();
  }

  async findById(id: string): Promise<FilmsEntity | null> {
    return await this.filmsRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });
  }

  async findMany(ids: string[]): Promise<FilmsEntity[]> {
    return await this.filmsRepository.find({
      where: { id: In(ids) },
      relations: ['schedule'],
    });
  }

  async updateFilm(film: FilmsEntity): Promise<void> {
    await this.filmsRepository.save(film);
  }

  async updateMany(films: FilmsEntity[]): Promise<void> {
    await this.filmsRepository.save(films);
  }
}
