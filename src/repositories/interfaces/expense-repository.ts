import {
  ExpenseProps,
  CreateExpenseProps,
  UpdateExpenseProps,
} from "@dtos/expense";

export abstract class ExpenseRepository {
  abstract findById(id: string): Promise<ExpenseProps | null>;
  abstract findByUserId(userId: string): Promise<ExpenseProps[]>;
  abstract create(data: CreateExpenseProps): Promise<ExpenseProps>;
  abstract update(data: UpdateExpenseProps): Promise<ExpenseProps | null>;
  abstract updateAll(): Promise<void>;
  abstract delete(id: string): Promise<ExpenseProps | null>;
}
