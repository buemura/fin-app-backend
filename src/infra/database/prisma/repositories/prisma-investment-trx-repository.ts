import { PrismaClient } from "@prisma/client";

import {
  CreateInvestmentTrxDto,
  TotalDetailsReponse,
  UpdateInvestmentTrxDto,
} from "@application/dtos/investment-trx-dto";
import { InvestmentTrx } from "@application/entities/investment-trx";
import { CacheRepository } from "@application/repositories/cache-repository";
import { InvestmentTrxRepository } from "@application/repositories/investment-trx-repository";

export class PrismaInvestmentTrxRepository implements InvestmentTrxRepository {
  private readonly investmentsTrx;

  constructor(private readonly cacheRepository: CacheRepository) {
    const prisma = new PrismaClient();
    this.investmentsTrx = prisma.investmentTransaction;
  }

  async findMany(): Promise<InvestmentTrx[]> {
    return this.investmentsTrx.findMany();
  }

  async findById(id: string): Promise<InvestmentTrx | null> {
    return this.investmentsTrx.findFirst({
      where: { id },
    });
  }

  async findByUserId(userId: string): Promise<InvestmentTrx[]> {
    const cached = await this.cacheRepository.get<InvestmentTrx[]>(
      String(process.env.REDIS_INVESTMENTS_TRX_KEY)
    );
    if (cached) {
      return cached;
    }

    const result = await this.investmentsTrx.findMany({
      where: { userId },
    });

    await this.cacheRepository.save(
      String(process.env.REDIS_INVESTMENTS_TRX_KEY),
      result
    );

    return result;
  }

  async create(data: CreateInvestmentTrxDto): Promise<InvestmentTrx> {
    await this.cacheRepository.remove(
      String(process.env.REDIS_INVESTMENTS_KEY)
    );
    await this.cacheRepository.remove(
      String(process.env.REDIS_INVESTMENTS_TRX_KEY)
    );
    return this.investmentsTrx.create({
      data: {
        userId: data.userId,
        investmentId: data.investmentId,
        pricePerQuantity: data.pricePerQuantity,
        quantity: data.quantity,
        pricePaid: data.quantity * data.pricePerQuantity,
      },
    });
  }

  async update(data: UpdateInvestmentTrxDto): Promise<InvestmentTrx> {
    await this.cacheRepository.remove(
      String(process.env.REDIS_INVESTMENTS_KEY)
    );
    await this.cacheRepository.remove(
      String(process.env.REDIS_INVESTMENTS_TRX_KEY)
    );
    return this.investmentsTrx.update({
      where: { id: data.investmentTrxId },
      data: {
        investmentId: data.investmentId,
        pricePerQuantity: data.pricePerQuantity,
        quantity: data.quantity,
        pricePaid: (data?.quantity ?? 0) * (data?.pricePerQuantity ?? 0),
      },
    });
  }

  async delete(id: string): Promise<InvestmentTrx> {
    await this.cacheRepository.remove(
      String(process.env.REDIS_INVESTMENTS_KEY)
    );
    await this.cacheRepository.remove(
      String(process.env.REDIS_INVESTMENTS_TRX_KEY)
    );
    return this.investmentsTrx.delete({
      where: { id },
    });
  }

  async getTotalDetails(investmentId: string): Promise<TotalDetailsReponse> {
    const { _sum } = await this.investmentsTrx.aggregate({
      where: {
        investmentId,
      },
      _sum: {
        pricePaid: true,
        quantity: true,
      },
    });

    return {
      totalPaidPrice: _sum.pricePaid ?? 0,
      totalQuantity: _sum.quantity ?? 0,
    };
  }
}
