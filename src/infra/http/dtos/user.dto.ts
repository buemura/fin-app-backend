import { RegexHelper } from '@helpers/regex';
import { IsEmail, IsOptional, Matches } from 'class-validator';

export class UpdateUserDto {
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
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @Matches(RegexHelper.password)
  password?: string;
}
