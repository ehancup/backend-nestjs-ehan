import { OmitType } from '@nestjs/mapped-types';
import {
  IsInt,
  IsString,
  IsEnum,
  Min,
  Max,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsIn,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MerekMobil } from './mobil.entity';

export class MobilDto {
  id: number;

  @IsString()
  @IsNotEmpty()
  nama: string;

  @IsString()
  @IsEnum(MerekMobil)
  @IsNotEmpty()
  merek_mobil: MerekMobil;

  @IsString()
  @IsIn([
    'CRV',
    'BRV',
    'HRV',
    'Avanza',
    'Innova',
    'Raize',
    'Ertiga',
    'XL7',
    'baleno',
  ])
  @IsNotEmpty()
  tipe_mobil: string;

  @IsInt()
  @Min(150000000)
  @Max(400000000)
  @IsNotEmpty()
  harga: number;

  @IsInt()
  @IsNotEmpty()
  @Max(2023)
  @Min(2017)
  tahun: number;
}

export class CreateMobilDto extends OmitType(MobilDto, ['id']) {}
export class UpdateMobilDto extends OmitType(MobilDto, ['id']) {}

export class DeleteMobilBulk {
  @IsArray()
  delete: number[];
}

export class createMobilArrayDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMobilDto)
  data: CreateMobilDto[];
}

export class FindMobilDto {
  @IsOptional()
  merek: string;

  @IsOptional()
  tipe: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  from_year: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  to_year: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  from_price: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  to_price: number;
}
