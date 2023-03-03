import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import {
  CreateExpenseDto,
  UpdateExpenseDto,
} from '@application/dtos/expense.dto';
import { PaginationQueryParams } from '@application/dtos/pagination.dto';
import { ExpensesService } from '@application/services/expenses.service';
import { DEFAULT_PAGINATION } from 'src/helpers/pagination/constants';

@Controller('users/:userId/expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  async create(
    @Param('userId') userId: string,
    @Body() createExpenseDto: CreateExpenseDto,
  ) {
    const props = {
      userId,
      ...createExpenseDto,
    };
    return this.expensesService.create(props);
  }

  @Get()
  async findByUserId(
    @Param('userId') userId: string,
    @Query() query: PaginationQueryParams,
  ) {
    const props = {
      userId,
      pagination: {
        page: Number(query.page) || DEFAULT_PAGINATION.PAGE,
        items: Number(query.items) || DEFAULT_PAGINATION.ITEMS,
      },
    };
    return this.expensesService.findByUserId(props);
  }

  @Patch(':expenseId')
  async update(
    @Param('expenseId') expenseId: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    const data = {
      expenseId,
      ...updateExpenseDto,
    };
    return this.expensesService.update(data);
  }

  @Patch()
  async resetAllStatus() {
    return this.expensesService.resetAllStatus();
  }

  @Patch(':expenseId/deactivate')
  async deactivate(@Param('expenseId') expenseId: string) {
    return this.expensesService.deactivate(expenseId);
  }

  @Delete(':expenseId')
  async remove(@Param('expenseId') expenseId: string) {
    return this.expensesService.remove(expenseId);
  }
}
