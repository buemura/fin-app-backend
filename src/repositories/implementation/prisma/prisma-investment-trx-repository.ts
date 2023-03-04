import { PrismaClient } from "@prisma/client";
import {
  CreateInvestmentTrxProps,
  GetTotalDetailsReponse,
  InvestmentTrxProps,
  UpdateInvestmentTrxProps,
} from "../../../interfaces/investment-trx";
import { CacheRepository } from "../../interfaces/cache-repository";
import { InvestmentTrxRepository } from "../../interfaces/investment-trx-repository";

export class PrismaInvestmentTrxRepository implements InvestmentTrxRepository {
  private readonly investmentsTrx;

  constructor(private readonly cacheRepository: CacheRepository) {
    const prisma = new PrismaClient();
    this.investmentsTrx = prisma.investmentTransaction;
  }

  async findMany(): Promise<InvestmentTrxProps[]> {
    return this.investmentsTrx.findMany();
  }

  async findById(id: string): Promise<InvestmentTrxProps | null> {
    return this.investmentsTrx.findFirst({
      where: { id },
    });
  }

  async findByUserId(userId: string): Promise<InvestmentTrxProps[]> {
    const cached = await this.cacheRepository.get<InvestmentTrxProps[]>(
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

  async create(data: CreateInvestmentTrxProps): Promise<InvestmentTrxProps> {
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

  async update(
    data: UpdateInvestmentTrxProps
  ): Promise<InvestmentTrxProps | null> {
    await this.cacheRepository.remove(
      String(process.env.REDIS_INVESTMENTS_KEY)
    );
    await this.cacheRepository.remove(
      String(process.env.REDIS_INVESTMENTS_TRX_KEY)
    );
    return this.investmentsTrx.update({
      where: { id: data.id },
      data: {
        investmentId: data.investmentId,
        pricePerQuantity: data.pricePerQuantity,
        quantity: data.quantity,
        pricePaid: (data?.quantity ?? 0) * (data?.pricePerQuantity ?? 0),
      },
    });
  }

  async delete(id: string): Promise<InvestmentTrxProps | null> {
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

  async getTotalDetails(investmentId: string): Promise<GetTotalDetailsReponse> {
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
