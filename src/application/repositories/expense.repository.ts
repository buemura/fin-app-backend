import { CreateExpenseDto, UpdateExpenseDto } from '../dtos/expense.dto';
import { Expense } from '../entities/expense.entity';

export abstract class ExpenseRepository {
  abstract findById(id: string): Promise<Expense | null>;
  abstract findByUserId(userId: string): Promise<Expense[]>;
  abstract create(data: CreateExpenseDto): Promise<Expense>;
  abstract update(data: UpdateExpenseDto): Promise<Expense | null>;
  abstract updateAll(): Promise<void>;
  abstract remove(id: string): Promise<void>;
}
