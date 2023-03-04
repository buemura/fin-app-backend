import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { CreateExpenseDto, UpdateExpenseDto } from '@core/dtos/expense-dto';
import { Expense } from '@core/entities/expense-entity';
import { ExpenseRepository } from '@core/repositories/expense-repository';

@Injectable()
export class PrismaExpenseRepository implements ExpenseRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findById(id: string): Promise<Expense> {
    return this.prisma.expense.findFirst({
      where: { id },
    });
  }

  async findByUserId(userId: string): Promise<Expense[]> {
    return this.prisma.expense.findMany({
      where: { userId },
    });
  }

  async create(data: CreateExpenseDto): Promise<Expense> {
    return this.prisma.expense.create({
      data: {
        userId: data.userId,
        title: data.title,
        imageUrl: data.imageUrl,
        isPaid: false,
        isActive: true,
      },
    });
  }

  async update(data: UpdateExpenseDto): Promise<Expense> {
    return this.prisma.expense.update({
      where: { id: data.expenseId },
      data: {
        title: data.title,
        isPaid: data.isPaid,
        isActive: data.isActive,
      },
    });
  }

  async updateAll(): Promise<void> {
    await this.prisma.expense.updateMany({
      where: { isPaid: true },
      data: {
        isPaid: false,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.expense.delete({
      where: { id },
    });
  }
}
