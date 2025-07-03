import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from '../films/films.controller';
import { FilmsService } from '../films/films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  const mockService = {
    findAll: jest.fn(),
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get(FilmsController);
  });

  it('Be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll()', () => {
    it('Return all films', async () => {
      const mockedFilms = [{ title: 'Film 1' }, { title: 'Film 2' }];

      mockService.findAll.mockResolvedValue(mockedFilms);

      const result = await controller.getAll();

      expect(result).toEqual({ total: 2, items: mockedFilms });
      expect(mockService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSchedule()', () => {
    it('Return the schedule of a film by its ID', async () => {
      const mockedFilm = {
        id: 'some-film-id',
        title: 'Test Film',
        schedule: [{ time: '18:00' }],
      };

      mockService.findById.mockResolvedValue(mockedFilm);

      const result = await controller.getSchedule('some-film-id');

      expect(result).toEqual({ total: 1, items: mockedFilm.schedule });
      expect(mockService.findById).toHaveBeenCalledWith('some-film-id');
    });

    it('Return NULL when film is not found', async () => {
      mockService.findById.mockResolvedValue(undefined);

      const result = await controller.getSchedule('non-existing-id');

      expect(result).toBeNull();
      expect(mockService.findById).toHaveBeenCalledWith('non-existing-id');
    });
  });
});
