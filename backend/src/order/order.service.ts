import { v4 as uuidv4 } from 'uuid';
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDTO, TicketDTO } from './dto/order.dto';
import { AbstractFilmsRepository } from '../repository/films.repository';

type SeatPosition = `${number}:${number}`;

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: AbstractFilmsRepository) {}

  async create(createOrderDTO: CreateOrderDTO): Promise<TicketDTO[]> {
    const uniqueFilmIds = [
      ...new Set(createOrderDTO.tickets.map((t) => t.film)),
    ];
    const films = await this.filmsRepository.findMany(uniqueFilmIds);

    const results = [];

    for (const ticket of createOrderDTO.tickets) {
      const film = films.find((f) => f.id === ticket.film);
      if (!film) throw new NotFoundException('Фильм не найден');

      const schedule = film.schedule.find((s) => s.id === ticket.session);
      if (!schedule) throw new NotFoundException('Расписание не найдено');

      const seatKey = `${ticket.row}:${ticket.seat}` as SeatPosition;
      if (schedule.taken.includes(seatKey)) {
        throw new ConflictException(`Место ${seatKey} уже занято`);
      }

      schedule.taken.push(seatKey);
      results.push({ ...ticket, id: uuidv4() });
    }

    await this.filmsRepository.updateMany(films);

    return results;
  }
}
