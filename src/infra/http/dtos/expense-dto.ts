import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateExpenseDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  imageUrl?: string;
}

export class UpdateExpenseDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  imageUrl?: string;

  @IsOptional()
  @IsBoolean()
  isPaid?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
