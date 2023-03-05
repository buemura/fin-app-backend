import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateAccountDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  balance?: number;

  @IsOptional()
  icon?: string;
}

export class UpdateAccountDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  balance?: number;

  @IsOptional()
  icon?: string;
}
