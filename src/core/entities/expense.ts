export class Expense {
  id: string;
  userId: string;
  title: string;
  imageUrl: string | null;
  isPaid: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
