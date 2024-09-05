import { IsNotEmpty, Min, IsIn } from 'class-validator';
import { TravelDestinations } from 'src/constants/destinations';

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

  @IsNotEmpty()
  @IsIn(Object.keys(TravelDestinations))
  destination: string;
}
