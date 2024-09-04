import { IsNotEmpty, Min } from 'class-validator';

export class FlightResponseDto {
  status: 'success' | 'fail';
  message: string;
  payload: FlightPayloadDto[];
}

export class FlightPayloadDto {
  price: string;
  date: string;
}

export class FlightOptionDto {
  @IsNotEmpty()
  @Min(1)
  numberOfCheaper: number;
}
