import { RegexHelper } from '@helpers/regex';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @Matches(RegexHelper.password, { message: RegexHelper.validationError })
  password?: string;

  @IsOptional()
  externalId?: string;

  @IsNotEmpty()
  isExternal: boolean;

  @IsOptional()
  imageUrl?: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @Matches(RegexHelper.password)
  password?: string;
}

export class UpdateUserPasswordDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @Matches(RegexHelper.password)
  password?: string;
}
