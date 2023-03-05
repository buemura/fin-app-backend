export class Investment {
  id: string;
  userId: string;
  accountId: string | null;
  category: string;
  ticker: string;
  type: string | null;
  pricePerQuantity: number;
  totalQuantity: number;
  totalPaidPrice: number;
  totalPrice: number;
  allocation: number;
  createdAt: Date;
  updatedAt: Date;
}
