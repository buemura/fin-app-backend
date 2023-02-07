import { PrismaClient } from "@prisma/client";
import {
  ExpenseProps,
  CreateExpenseProps,
  UpdateExpenseProps,
} from "@dtos/expense";
import { ExpenseRepository } from "@repositories/interfaces/expense-repository";

export class PrismaExpenseRepository implements ExpenseRepository {
  private expenseRespository;

  constructor() {
    const prisma = new PrismaClient();
    this.expenseRespository = prisma.expense;
  }

  async findById(id: string): Promise<ExpenseProps | null> {
    return this.expenseRespository.findFirst({
      where: { id },
    });
  }

  async findByUserId(userId: string): Promise<ExpenseProps[]> {
    return this.expenseRespository.findMany({
      where: { userId },
    });
  }

  async create(data: CreateExpenseProps): Promise<ExpenseProps> {
    return this.expenseRespository.create({
      data: {
        userId: data.userId,
        title: data.title,
        imageUrl: data.imageUrl,
        isPaid: false,
        isActive: true,
      },
    });
  }

  async update(data: UpdateExpenseProps): Promise<ExpenseProps | null> {
    return this.expenseRespository.update({
      where: { id: data.expenseId },
      data: {
        title: data.title,
        isPaid: data.isPaid,
        isActive: data.isActive,
      },
    });
  }

  async updateAll(): Promise<void> {
    await this.expenseRespository.updateMany({
      where: { isPaid: true },
      data: {
        isPaid: false,
      },
    });
  }

  async delete(id: string): Promise<ExpenseProps | null> {
    return this.expenseRespository.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  }
}
