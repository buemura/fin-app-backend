import { type Expense } from "@prisma/client";
import {
  PaginationMetadataProps,
  PaginationMetadataResponse,
} from "./pagination";

export interface ExpenseProps extends Expense {}

export interface FindAllExpensesProps {
  userId: string;
}

export interface FindUserExpensesProps {
  pagination: PaginationMetadataProps;
  userId: string;
}

export interface FindUserExpensesResponse {
  data: ExpenseProps[];
  metadata: PaginationMetadataResponse;
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

export interface UpdateAllExpensesResponseProps {
  message: string;
}

export interface DeleteExpenseProps {
  expenseId: string;
}
