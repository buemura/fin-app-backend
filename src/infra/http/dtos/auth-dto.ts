import { IsEmail, IsNotEmpty, Matches } from "class-validator";

import { RegexHelper } from "@helpers/regex";

export class RegisterAuthDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(RegexHelper.password, { message: RegexHelper.validationError })
  password: string;
}

export class LoginAuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(RegexHelper.password)
  password: string;
}
