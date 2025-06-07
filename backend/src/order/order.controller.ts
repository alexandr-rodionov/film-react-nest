import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO, TicketDTO } from './dto/order.dto';

interface TicketDTORes {
  total: number;
  items: TicketDTO[];
}

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Body() createOrderDTO: CreateOrderDTO,
  ): Promise<TicketDTORes> {
    try {
      const tickets = await this.orderService.create(createOrderDTO);

      return {
        total: tickets.length,
        items: tickets,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
