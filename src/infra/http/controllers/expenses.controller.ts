import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import {
  CreateExpenseDto,
  UpdateExpenseDto,
} from '@application/dtos/expense.dto';
import { ExpensesService } from '@application/services/expenses.service';

@Controller('users/:userId/expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  async findByUserId(@Param('userId') userId: string) {
    return this.expensesService.findByUserId(userId);
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

  @Patch(':expenseId')
  async deactivate(@Param('expenseId') expenseId: string) {
    return this.expensesService.deactivate(expenseId);
  }

  @Delete(':expenseId')
  async remove(@Param('expenseId') expenseId: string) {
    return this.expensesService.remove(expenseId);
  }
}
