import { PrismaClient } from "@prisma/client";
import {
  CreateInvestmentProps,
  InvestmentProps,
  UpdateInvestmentProps,
} from "../../../interfaces/investment";
import { CacheRepository } from "../../interfaces/cache-repository";
import { InvestmentRepository } from "../../interfaces/investment-repository";

export class PrismaInvestmentRepository implements InvestmentRepository {
  private readonly investments;

  constructor(private readonly cacheRepository: CacheRepository) {
    const prisma = new PrismaClient();
    this.investments = prisma.investment;
  }

  async findMany(): Promise<InvestmentProps[]> {
    return this.investments.findMany();
  }

  async findById(id: string): Promise<InvestmentProps | null> {
    return this.investments.findFirst({
      where: { id },
    });
  }

  async findByUserId(userId: string): Promise<InvestmentProps[]> {
    const cached = await this.cacheRepository.get<InvestmentProps[]>(
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

  async create(data: CreateInvestmentProps): Promise<InvestmentProps> {
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

  async update(data: UpdateInvestmentProps): Promise<InvestmentProps | null> {
    await this.cacheRepository.remove(
      String(process.env.REDIS_INVESTMENTS_KEY)
    );
    return this.investments.update({
      where: { id: data.id },
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

  async delete(id: string): Promise<InvestmentProps | null> {
    await this.cacheRepository.remove(
      String(process.env.REDIS_INVESTMENTS_KEY)
    );
    return this.investments.delete({
      where: { id },
    });
  }
}
