import { PaginationQueryParams } from './pagination-dto';

export interface CreateExpenseDto {
  userId: string;
  title: string;
  imageUrl?: string;
}

export interface UpdateExpenseDto {
  expenseId: string;
  title?: string;
  imageUrl?: string;
  isPaid?: boolean;
  isActive?: boolean;
}

export interface FindByUserIdDto {
  userId: string;
  pagination: PaginationQueryParams;
}
