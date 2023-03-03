export interface CreateInvestmentTrxDto {
  userId: string;
  investmentId: string;
  pricePerQuantity: number;
  pricePaid: number;
  quantity: number;
}

export interface UpdateInvestmentTrxDto {
  investmentTrxId: string;
  investmentId?: string;
  pricePerQuantity?: number;
  pricePaid?: number;
  quantity?: number;
}
