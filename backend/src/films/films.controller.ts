import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { filmsModelToDTO } from '../utils/converter';
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
    const models = await this.filmsService.findAll();
    const films = models.map(filmsModelToDTO);

    return {
      total: films.length,
      items: films,
    };
  }

  @Get(':id/schedule')
  async getSchedule(@Param('id') id: string): Promise<ScheduleDTORes | null> {
    const model = await this.filmsService.findById(id);

    if (!model) return null;

    const { schedule } = filmsModelToDTO(model);

    return {
      total: schedule.length,
      items: schedule,
    };
  }
}
