import { IsNotEmpty, Min, IsIn } from 'class-validator';
import { TravelDestinations } from 'src/constants/destinations';

export class FlightResponseDto {
  status: 'success' | 'fail';
  message: string;
  payload: {
    data: FlightDataDto[];
    from: string;
    to: string;
  };
}

export class FlightDataDto {
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
