import { IsEmail, IsOptional, Matches } from 'class-validator';

import { RegexHelper } from '@helpers/regex';

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
