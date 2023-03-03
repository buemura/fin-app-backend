import { BadRequestException, Injectable } from '@nestjs/common';

import {
  paginationMetadata,
  paginationSliceParams,
} from '@helpers/pagination/functions';
import {
  CreateExpenseDto,
  FindByUserIdDto,
  UpdateExpenseDto,
} from '../dtos/expense.dto';
import { ExpenseRepository } from '../repositories/expense.repository';

@Injectable()
export class ExpensesService {
  constructor(private readonly expenseRepository: ExpenseRepository) {}

  async findByUserId(props: FindByUserIdDto) {
    const { userId, pagination } = props;

    const { start, end } = paginationSliceParams({
      page: pagination.page,
      items: pagination.items,
    });

    const expenses = await this.expenseRepository.findByUserId(userId);
    const data = expenses.slice(start, end);

    const metadata = paginationMetadata({
      data: expenses,
      page: pagination.page,
      items: pagination.items,
    });

    return { metadata, data };
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
    await this.checkExpenseExists(expenseId);

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
    const expense = await this.expenseRepository.findById(expenseId);
    if (!expense) {
      throw new BadRequestException('Expense not found');
    }
  }
}
