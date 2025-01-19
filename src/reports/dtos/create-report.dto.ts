import {
  IsString,
  IsPositive,
  Min,
  Max,
  IsInt,
  IsNumber,
} from 'class-validator';

export class CreateReportDto {
    @IsNumber({}, { message: 'Price must be a valid number' })
    @IsPositive()
    price: number;

    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsInt()
    @Min(1900)
    @Max(2026)
    year: number;

    @IsNumber({}, { message: 'Longitude must be a valid number' })
    @Min(-180)
    @Max(180)
    lng: number;

    @IsNumber({}, { message: 'Latitude must be a valid number' })
    @Min(-90)
    @Max(90)
    lat: number;

    @IsNumber({}, { message: 'Mileage must be a valid number' })
    @IsPositive()
    mileage: number;
}
