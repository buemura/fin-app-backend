import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateInvestmentDto {
  @IsNotEmpty()
  @IsUUID()
  accountId: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  ticker: string;

  @IsNotEmpty()
  type: string;
}

export class UpdateInvestmentDto {
  @IsOptional()
  @IsUUID()
  accountId?: string;

  @IsOptional()
  category?: string;

  @IsOptional()
  ticker?: string;

  @IsOptional()
  type?: string;

  @IsOptional()
  pricePerQuantity?: number;

  @IsOptional()
  totalQuantity?: number;

  @IsOptional()
  totalPaidPrice?: number;

  @IsOptional()
  totalPrice?: number;

  @IsOptional()
  allocation?: number;
}
