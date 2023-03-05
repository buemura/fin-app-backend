import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateInvestmentTrxDto {
  @IsNotEmpty()
  @IsUUID()
  investmentId: string;

  @IsNotEmpty()
  pricePerQuantity: number;

  @IsNotEmpty()
  pricePaid: number;

  @IsNotEmpty()
  quantity: number;
}

export class UpdateInvestmentTrxDto {
  @IsOptional()
  @IsUUID()
  investmentId?: string;

  @IsOptional()
  pricePerQuantity?: number;

  @IsOptional()
  pricePaid?: number;

  @IsOptional()
  quantity?: number;
}
