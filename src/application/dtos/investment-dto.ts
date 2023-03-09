export interface CreateInvestmentDto {
  userId: string;
  accountId: string;
  category: string;
  ticker: string;
  type: string;
}

export interface UpdateInvestmentDto {
  investmentId: string;
  accountId?: string;
  category?: string;
  ticker?: string;
  type?: string;
  pricePerQuantity?: number;
  totalQuantity?: number;
  totalPaidPrice?: number;
  totalPrice?: number;
  allocation?: number;
}
