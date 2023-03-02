import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateExpenseDto, UpdateExpenseDto } from '../dtos/expense.dto';
import { ExpenseRepository } from '../repositories/expense.repository';

@Injectable()
export class ExpensesService {
  constructor(private readonly expenseRepository: ExpenseRepository) {}

  async findByUserId(userId: string) {
    return this.expenseRepository.findByUserId(userId);
  }

  async create(createExpenseDto: CreateExpenseDto) {
    return this.expenseRepository.create(createExpenseDto);
  }

  async update(updateExpenseDto: UpdateExpenseDto) {
    await this.checkExpenseExists(updateExpenseDto.expenseId);
    return this.expenseRepository.update(updateExpenseDto);
  }

  async remove(expenseId: string) {
    await this.checkExpenseExists(expenseId);
    return this.expenseRepository.remove(expenseId);
  }

  private async checkExpenseExists(expenseId: string): Promise<void> {
    const expense = this.expenseRepository.findById(expenseId);
    if (!expense) {
      throw new BadRequestException('Expense not found');
    }
  }
}
