import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { ExpensesService } from '@application/services/expenses.service';
import {
  CreateExpenseDto,
  UpdateExpenseDto,
} from '@application/dtos/expense.dto';

@Controller('users/:userId/expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  findByUserId(@Param('userId') userId: string) {
    return this.expensesService.findByUserId(userId);
  }

  @Put(':expenseId')
  update(
    @Param('expenseId') expenseId: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    const data = {
      expenseId,
      ...updateExpenseDto,
    };
    return this.expensesService.update(data);
  }

  @Delete(':expenseId')
  remove(@Param('expenseId') expenseId: string) {
    return this.expensesService.remove(expenseId);
  }
}
