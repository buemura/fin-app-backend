import { type Expense } from "@prisma/client";

export interface ExpenseProps extends Expense {}

export interface FindAllExpensesProps {
  userId: string;
}

export interface CreateExpenseProps {
  userId: string;
  title: string;
  imageUrl?: string;
}

export interface UpdateExpenseProps {
  expenseId: string;
  title?: string;
  imageUrl?: string;
  isPaid?: boolean;
  isActive?: boolean;
}

export interface DeleteExpenseProps {
  expenseId: string;
}
