import { Document, model, Schema } from 'mongoose';

export interface IFilms extends Document {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedule: ISchedule[];
}

export interface ISchedule {
  id: string;
  daytime: string;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

const ScheduleSchema = new Schema<ISchedule>(
  {
    id: { type: String, required: true },
    daytime: { type: String, required: true },
    hall: { type: Number, required: true },
    rows: { type: Number, required: true },
    seats: { type: Number, required: true },
    price: { type: Number, required: true },
    taken: { type: [String], default: [] },
  },
  { _id: false },
);

export const FilmsSchema = new Schema<IFilms>({
  id: { type: String, unique: true, index: true },
  rating: { type: Number, min: 0, max: 10 },
  director: { type: String, required: true },
  tags: { type: [String], default: [] },
  image: { type: String },
  cover: { type: String },
  title: { type: String, required: true },
  about: { type: String },
  description: { type: String },
  schedule: [ScheduleSchema],
});

export const FilmsModel = model('Films', FilmsSchema);
