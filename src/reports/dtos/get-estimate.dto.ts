import {
  IsString,
  IsPositive,
  Min,
  Max,
  IsInt,
  IsNumber,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimateDto {

    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsInt()
    @Min(1900)
    @Max(2026)
    @Transform(({value}) => parseInt(value))
    year: number;

    @IsNumber({}, { message: 'Longitude must be a valid number' })
    @Min(-180)
    @Max(180)
    @Transform(({value}) => parseFloat(value))
    lng: number;

    @IsNumber({}, { message: 'Latitude must be a valid number' })
    @Min(-90)
    @Max(90)
    @Transform(({value}) => parseFloat(value))
    lat: number;

    @IsNumber({}, { message: 'Mileage must be a valid number' })
    @IsPositive()
    @Transform(({value}) => parseInt(value))
    mileage: number;
}
