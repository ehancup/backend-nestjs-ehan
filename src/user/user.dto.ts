import { OmitType } from '@nestjs/mapped-types';
import {
  IsInt,
  IsString,
  Length,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsEnum,
  IsEmail,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TType } from './user.entity';

export class UserDto {
  id: number;

  @IsString()
  @IsNotEmpty()
  @Length(3)
  nama: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsInt()
  @IsNotEmpty()
  umur: number;

  @IsString()
  @IsNotEmpty()
  tanggal_lahir: string;

  @IsEnum(TType)
  @IsNotEmpty()
  status: TType;
}

export class CreateUserDto extends OmitType(UserDto, ['id']) {}
export class UpdateUserDto extends OmitType(UserDto, ['id']) {}

export class createBookArrayDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  data: CreateUserDto[];
}

export class DeleteUserBulk {
  @IsArray()
  delete: number[];
}
