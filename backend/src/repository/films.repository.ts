import { Injectable } from '@nestjs/common';

export interface IFilmsRepository {
  findAll(): Promise<any[]>;
  findById(id: string): Promise<any | null>;
  findMany(ids: string[]): Promise<any[]>;
  updateFilm(film: any): Promise<void>;
  updateMany(films: any[]): Promise<void>;
}

@Injectable()
export abstract class AbstractFilmsRepository implements IFilmsRepository {
  abstract findAll(): Promise<any[]>;
  abstract findById(id: string): Promise<any | null>;
  abstract findMany(ids: string[]): Promise<any[]>;
  abstract updateFilm(film: any): Promise<void>;
  abstract updateMany(films: any[]): Promise<void>;
}
