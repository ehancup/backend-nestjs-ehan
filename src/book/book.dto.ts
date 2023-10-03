import { OmitType } from '@nestjs/mapped-types';
import {
  IsInt,
  IsString,
  Length,
  Min,
  Max,
  IsNotEmpty,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PageRequestDto } from 'src/utils/dto/page.dto';
export class BookDto {
  id: number;

  @IsString()
  @IsNotEmpty()
  @Length(3)
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsInt()
  @Max(2024)
  @Min(2019)
  year: number;
}

export class CreateBookDto extends OmitType(BookDto, ['id']) {}
export class UpdateBookDto extends OmitType(BookDto, ['id']) {}

export class createBookArrayDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBookDto)
  data: CreateBookDto[];
}

export class FindBookDto extends PageRequestDto {}
