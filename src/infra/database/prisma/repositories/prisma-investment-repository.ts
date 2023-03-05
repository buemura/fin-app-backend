import { PrismaClient } from "@prisma/client";

import {
  CreateInvestmentDto,
  UpdateInvestmentDto,
} from "@core/dtos/investment-dto";
import { Investment } from "@core/entities/investment";
import { CacheRepository } from "@core/repositories/cache-repository";
import { InvestmentRepository } from "@core/repositories/investment-repository";

export class PrismaInvestmentRepository implements InvestmentRepository {
  private readonly investments;

  constructor(private readonly cacheRepository: CacheRepository) {
    const prisma = new PrismaClient();
    this.investments = prisma.investment;
  }

  async findMany(): Promise<Investment[]> {
    return this.investments.findMany();
  }

  async findById(id: string): Promise<Investment | null> {
    return this.investments.findFirst({
      where: { id },
    });
  }

  async findByUserId(userId: string): Promise<Investment[]> {
    const cached = await this.cacheRepository.get<Investment[]>(
      String(process.env.REDIS_INVESTMENTS_KEY)
    );
    if (cached) {
      return cached;
    }

    const result = await this.investments.findMany({
      where: { userId },
    });

    await this.cacheRepository.save(
      String(process.env.REDIS_INVESTMENTS_KEY),
      result
    );

    return result;
  }

  async findByTicker(ticker: string): Promise<Investment | null> {
    return this.investments.findFirst({
      where: { ticker },
    });
  }

  async create(data: CreateInvestmentDto): Promise<Investment> {
    await this.cacheRepository.remove(
      String(process.env.REDIS_INVESTMENTS_KEY)
    );
    return this.investments.create({
      data: {
        userId: data.userId,
        accountId: data.accountId,
        category: data.category,
        ticker: data.ticker,
        type: data.type,
      },
    });
  }

  async update(data: UpdateInvestmentDto): Promise<Investment | null> {
    await this.cacheRepository.remove(
      String(process.env.REDIS_INVESTMENTS_KEY)
    );
    return this.investments.update({
      where: { id: data.investmentId },
      data: {
        category: data.category,
        ticker: data.ticker,
        type: data.type,
        pricePerQuantity: data.pricePerQuantity,
        totalQuantity: data.totalQuantity,
        totalPaidPrice: data.totalPaidPrice,
        totalPrice: data.totalPrice,
        allocation: data.allocation,
      },
    });
  }

  async delete(id: string): Promise<Investment | null> {
    await this.cacheRepository.remove(
      String(process.env.REDIS_INVESTMENTS_KEY)
    );
    return this.investments.delete({
      where: { id },
    });
  }
}
