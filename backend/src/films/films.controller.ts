import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsDTO, ScheduleDTO } from './dto/films.dto';

interface FilmsDTORes {
  total: number;
  items: FilmsDTO[];
}

interface ScheduleDTORes {
  total: number;
  items: ScheduleDTO[];
}

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getAll(): Promise<FilmsDTORes> {
    const films = await this.filmsService.findAll();

    return {
      total: films.length,
      items: films,
    };
  }

  @Get(':id/schedule')
  async getSchedule(@Param('id') id: string): Promise<ScheduleDTORes | null> {
    const film = await this.filmsService.findById(id);

    if (!film) return null;

    const { schedule } = film;

    return {
      total: schedule.length,
      items: schedule,
    };
  }
}
