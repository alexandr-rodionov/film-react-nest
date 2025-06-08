import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { deserializeArray, serializeArray } from '../../utils/serializer';

@Entity('films')
export class FilmsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('double precision', { nullable: false })
  rating: number;

  @Column('varchar', { nullable: false })
  director: string;

  @Column('text', { nullable: false })
  tags: string;

  @Column('varchar', { nullable: false })
  image: string;

  @Column('varchar', { nullable: false })
  cover: string;

  @Column('varchar', { nullable: false })
  title: string;

  @Column('varchar', { nullable: false })
  about: string;

  @Column('varchar', { nullable: false })
  description: string;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.film, {
    cascade: true,
  })
  schedule: ScheduleEntity[];
}

@Entity('schedule')
export class ScheduleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  daytime: string;

  @Column('integer', { nullable: false })
  hall: number;

  @Column('integer', { nullable: false })
  rows: number;

  @Column('integer', { nullable: false })
  seats: number;

  @Column('double precision', { nullable: false })
  price: number;

  @Column('text', {
    transformer: {
      to: serializeArray,
      from: deserializeArray,
    },
    nullable: false,
  })
  taken: string[];

  @ManyToOne(() => FilmsEntity, (film) => film.schedule)
  film: FilmsEntity;
}
