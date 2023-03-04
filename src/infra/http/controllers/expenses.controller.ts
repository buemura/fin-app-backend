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

import { PaginationQueryParams } from '@core/dtos/pagination.dto';
import { ExpensesService } from '@core/services/expenses.service';
import { DEFAULT_PAGINATION } from 'src/helpers/pagination/constants';
import { CreateExpenseDto, UpdateExpenseDto } from '../dtos/expense.dto';

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
    const props = {
      expenseId,
      ...updateExpenseDto,
    };
    return this.expensesService.update(props);
  }

  @Patch()
  async resetAllStatus() {
    return this.expensesService.resetAllStatus();
  }

  @Delete(':expenseId')
  async remove(@Param('expenseId', new ParseUUIDPipe()) expenseId: string) {
    return this.expensesService.remove(expenseId);
  }
}
