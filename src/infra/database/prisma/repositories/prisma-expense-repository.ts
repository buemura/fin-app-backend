import { PrismaClient } from "@prisma/client";

import {
  CreateExpenseDto,
  UpdateExpenseDto,
} from "@application/dtos/expense-dto";
import { Expense } from "@application/entities/expense";
import { CacheRepository } from "@application/repositories/cache-repository";
import { ExpenseRepository } from "@application/repositories/expense-repository";

export class PrismaExpenseRepository implements ExpenseRepository {
  private readonly expenseRespository;

  constructor(private readonly cacheRepository: CacheRepository) {
    const prisma = new PrismaClient();
    this.expenseRespository = prisma.expense;
  }

  async findMany(): Promise<Expense[]> {
    return this.expenseRespository.findMany();
  }

  async findById(id: string): Promise<Expense | null> {
    return this.expenseRespository.findFirst({
      where: { id },
    });
  }

  async findByUserId(userId: string): Promise<Expense[]> {
    const cached = await this.cacheRepository.get<Expense[]>(
      String(process.env.REDIS_EXPENSES_KEY)
    );
    if (cached) {
      return cached;
    }

    const result = await this.expenseRespository.findMany({
      where: { userId },
    });

    await this.cacheRepository.save(
      String(process.env.REDIS_EXPENSES_KEY),
      result
    );

    return result;
  }

  async create(data: CreateExpenseDto): Promise<Expense> {
    await this.cacheRepository.remove(String(process.env.REDIS_EXPENSES_KEY));
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

  async update(data: UpdateExpenseDto): Promise<Expense | null> {
    await this.cacheRepository.remove(String(process.env.REDIS_EXPENSES_KEY));
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
    await this.cacheRepository.remove(String(process.env.REDIS_EXPENSES_KEY));
    await this.expenseRespository.updateMany({
      where: { isPaid: true },
      data: {
        isPaid: false,
      },
    });
  }

  async delete(id: string): Promise<Expense | null> {
    await this.cacheRepository.remove(String(process.env.REDIS_EXPENSES_KEY));
    return this.expenseRespository.delete({
      where: { id },
    });
  }
}
