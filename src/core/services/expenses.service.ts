import { BadRequestException, Injectable } from '@nestjs/common';

import { ERROR_MESSAGE } from '@helpers/errors/messages';
import {
  paginationMetadata,
  paginationSliceParams,
} from '@helpers/pagination/functions';
import {
  CreateExpenseDto,
  FindByUserIdDto,
  UpdateExpenseDto,
} from '../dtos/expense-dto';
import { ExpenseRepository } from '../repositories/expense-repository';

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
      throw new BadRequestException(ERROR_MESSAGE.EXPENSE_NOT_FOUND);
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

  async remove(expenseId: string) {
    const expense = await this.expenseRepository.findById(expenseId);
    if (!expense) {
      throw new BadRequestException(ERROR_MESSAGE.EXPENSE_NOT_FOUND);
    }

    await this.expenseRepository.remove(expenseId);

    return {
      data: {
        id: expenseId,
      },
    };
  }
}
