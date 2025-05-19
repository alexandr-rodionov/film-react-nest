import { v4 as uuidv4 } from 'uuid';
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDTO, TicketDTO } from './dto/order.dto';
import { FilmsRepository } from '../repository/films.repository';

type SeatPosition = `${number}:${number}`;

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async create(createOrderDTO: CreateOrderDTO): Promise<TicketDTO[]> {
    const results = [];

    for (const ticket of createOrderDTO.tickets) {
      const film = await this.filmsRepository.findById(ticket.film);
      const schedule = film.schedule.find((s) => s.id === ticket.session);

      if (!schedule) throw new NotFoundException('Расписание не найдено');

      const seatKey = `${ticket.row}:${ticket.seat}` as SeatPosition;
      if (schedule.taken.includes(seatKey)) {
        throw new ConflictException(`Место ${seatKey} уже занято`);
      }

      schedule.taken.push(seatKey);
      await this.filmsRepository.updateFilm(film);
      results.push({ ...ticket, id: uuidv4() });
    }

    return results;
  }
}
