import { PrismaClient } from "@prisma/client";
import { InvestmentRepository } from "../../interfaces/investment-repository";
import {
  InvestmentProps,
  CreateInvestmentProps,
  UpdateInvestmentProps,
} from "../../../interfaces/investment";

export class PrismaInvestmentRepository implements InvestmentRepository {
  private readonly investments;

  constructor() {
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
    return this.investments.findMany({
      where: { userId },
    });
  }

  async create(data: CreateInvestmentProps): Promise<InvestmentProps> {
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
    return this.investments.delete({
      where: { id },
    });
  }
}
