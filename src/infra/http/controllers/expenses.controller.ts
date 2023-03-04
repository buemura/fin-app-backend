import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateExpenseDto, UpdateExpenseDto } from '@core/dtos/expense.dto';
import { PaginationQueryParams } from '@core/dtos/pagination.dto';
import { ExpensesService } from '@core/services/expenses.service';
import { DEFAULT_PAGINATION } from 'src/helpers/pagination/constants';

@Controller('users/:userId/expenses')
@UseGuards(AuthGuard('jwt'))
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  async create(
    @Param('userId', new ParseUUIDPipe()) userId: string,
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
    @Param('userId', new ParseUUIDPipe()) userId: string,
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
    @Param('expenseId', new ParseUUIDPipe()) expenseId: string,
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
  async deactivate(@Param('expenseId', new ParseUUIDPipe()) expenseId: string) {
    return this.expensesService.deactivate(expenseId);
  }

  @Delete(':expenseId')
  async remove(@Param('expenseId', new ParseUUIDPipe()) expenseId: string) {
    return this.expensesService.remove(expenseId);
  }
}
