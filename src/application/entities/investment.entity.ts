export class Investment {
  id: string;
  userId: string;
  accountId: string;
  category: string;
  ticker: string;
  type: string;
  pricePerQuantity: number;
  totalQuantity: number;
  totalPaidPrice: number;
  totalPrice: number;
  allocation: number;
  createdAt: Date;
  updatedAt: Date;
}
