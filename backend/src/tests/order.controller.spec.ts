import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from '../order/order.controller';
import { OrderService } from '../order/order.service';
import { CreateOrderDTO, TicketDTO } from '../order/dto/order.dto';

const mockedTickets: TicketDTO[] = [
  {
    film: 'some-film1',
    session: 'qwe',
    daytime: '9:00',
    row: 1,
    seat: 1,
    price: 100,
  },
  {
    film: 'some-film2',
    session: 'rty',
    daytime: '10:00',
    row: 1,
    seat: 1,
    price: 100,
  },
];

const mockedOrder: CreateOrderDTO = {
  email: 'test@test.test',
  phone: '+11111111111',
  tickets: mockedTickets,
};

describe('OrderController', () => {
  let controller: OrderController;
  const mockService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('Be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createOrder()', () => {
    it('Successfully create an order and return ticket data', async () => {
      mockService.create.mockResolvedValue(mockedTickets);

      const result = await controller.createOrder(mockedOrder);

      expect(result).toEqual({ total: 2, items: mockedTickets });
      expect(mockService.create).toHaveBeenCalledWith(mockedOrder);
    });

    it('Handle exceptions', async () => {
      const expectedErrorMessage = 'Failed to create order';

      mockService.create.mockRejectedValueOnce(new Error(expectedErrorMessage));

      await expect(controller.createOrder(mockedOrder)).rejects.toThrow(
        expectedErrorMessage,
      );
      expect(mockService.create).toHaveBeenCalledWith(mockedOrder);
    });
  });
});
