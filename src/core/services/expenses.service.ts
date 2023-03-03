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
    const expense = await this.expenseRepository.create(data);

    return {
      data: {
        id: expense.id,
      },
    };
  }

  async update(props: UpdateExpenseDto) {
    const expenseExists = await this.expenseRepository.findById(
      props.expenseId,
    );
    if (!expenseExists) {
      throw new BadRequestException('Expense not found');
    }

    const expense = await this.expenseRepository.update(props);

    return {
      data: {
        id: expense.id,
      },
    };
  }

  async resetAllStatus() {
    return this.expenseRepository.updateAll();
  }

  async deactivate(expenseId: string) {
    const expense = await this.expenseRepository.findById(expenseId);
    if (!expense) {
      throw new BadRequestException('Expense not found');
    }

    const data = {
      expenseId,
      isActive: false,
    };

    await this.expenseRepository.update(data);

    return {
      data: {
        id: expenseId,
      },
    };
  }

  async remove(expenseId: string) {
    const expense = await this.expenseRepository.findById(expenseId);
    if (!expense) {
      throw new BadRequestException('Expense not found');
    }

    await this.expenseRepository.remove(expenseId);

    return {
      data: {
        id: expenseId,
      },
    };
  }
}
