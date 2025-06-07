import { IFilms } from '../schemas/films.schema';
import { FilmsDTO } from '../films/dto/films.dto';

export const filmsModelToDTO = (model: IFilms): FilmsDTO => ({
  id: model.id,
  rating: model.rating,
  director: model.director,
  tags: model.tags,
  image: model.image,
  cover: model.cover,
  title: model.title,
  about: model.about,
  description: model.description,
  schedule: model.schedule.map((s) => ({
    id: s.id,
    daytime: s.daytime,
    hall: s.hall,
    rows: s.rows,
    seats: s.seats,
    price: s.price,
    taken: s.taken,
  })),
});
