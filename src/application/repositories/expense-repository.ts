import { CreateExpenseDto, UpdateExpenseDto } from "../dtos/expense-dto";
import { Expense } from "../entities/expense";

export abstract class ExpenseRepository {
  abstract findMany(): Promise<Expense[]>;
  abstract findById(id: string): Promise<Expense | null>;
  abstract findByUserId(userId: string): Promise<Expense[]>;
  abstract create(data: CreateExpenseDto): Promise<Expense>;
  abstract update(data: UpdateExpenseDto): Promise<Expense | null>;
  abstract updateAll(): Promise<void>;
  abstract delete(id: string): Promise<Expense | null>;
}
