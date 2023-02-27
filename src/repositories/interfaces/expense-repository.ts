import {
  type ExpenseProps,
  type CreateExpenseProps,
  type UpdateExpenseProps,
} from "../../interfaces/expense";

export abstract class ExpenseRepository {
  abstract findMany(): Promise<ExpenseProps[]>;
  abstract findById(id: string): Promise<ExpenseProps | null>;
  abstract findByUserId(userId: string): Promise<ExpenseProps[]>;
  abstract create(data: CreateExpenseProps): Promise<ExpenseProps>;
  abstract update(data: UpdateExpenseProps): Promise<ExpenseProps | null>;
  abstract updateAll(): Promise<void>;
  abstract delete(id: string): Promise<ExpenseProps | null>;
}
