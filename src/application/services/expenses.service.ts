import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateExpenseDto, UpdateExpenseDto } from '../dtos/expense.dto';
import { ExpenseRepository } from '../repositories/expense.repository';

@Injectable()
export class ExpensesService {
  constructor(private readonly expenseRepository: ExpenseRepository) {}

  async findByUserId(userId: string) {
    return this.expenseRepository.findByUserId(userId);
  }

  async create(data: CreateExpenseDto) {
    return this.expenseRepository.create(data);
  }

  async update(data: UpdateExpenseDto) {
    await this.checkExpenseExists(data.expenseId);
    return this.expenseRepository.update(data);
  }

  async resetAllStatus() {
    return this.expenseRepository.updateAll();
  }

  async deactivate(expenseId: string) {
    const data = {
      expenseId,
      isActive: false,
    };
    return this.expenseRepository.update(data);
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
