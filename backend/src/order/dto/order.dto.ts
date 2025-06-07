import {
  IsArray,
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateOrderDTO {
  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;

  @IsArray()
  tickets: TicketDTO[];
}

export class TicketDTO {
  @IsString()
  film: string;

  @IsString()
  session: string;

  @IsString()
  daytime: string;

  @IsNumber()
  row: number;

  @IsNumber()
  seat: number;

  @IsNumber()
  price: number;
}
