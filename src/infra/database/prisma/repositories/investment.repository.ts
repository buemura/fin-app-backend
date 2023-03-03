import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import {
  CreateInvestmentDto,
  UpdateInvestmentDto,
} from '@application/dtos/investment.dto';
import { Investment } from '@application/entities/investment.entity';
import { InvestmentRepository } from '@application/repositories/investment.repository';

@Injectable()
export class PrismaInvestmentRepository implements InvestmentRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findById(id: string): Promise<Investment> {
    return this.prisma.investment.findFirst({
      where: { id },
    });
  }

  async findByTicker(ticker: string): Promise<Investment> {
    return this.prisma.investment.findFirst({
      where: { ticker },
    });
  }

  async findByUserId(userId: string): Promise<Investment[]> {
    return this.prisma.investment.findMany({
      where: { userId },
    });
  }

  async create(data: CreateInvestmentDto): Promise<Investment> {
    console.log(data);

    return this.prisma.investment.create({
      data: {
        userId: data.userId,
        accountId: data.accountId,
        category: data.category,
        ticker: data.ticker,
        type: data.type,
      },
    });
  }

  async update(data: UpdateInvestmentDto): Promise<Investment> {
    return this.prisma.investment.update({
      where: { id: data.investmentId },
      data: {
        accountId: data.accountId,
        category: data.category,
        ticker: data.ticker,
        type: data.type,
        pricePerQuantity: data.pricePerQuantity,
        totalQuantity: data.totalQuantity,
        totalPaidPrice: data.totalPaidPrice,
        totalPrice: data.totalPrice,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.investment.delete({
      where: { id },
    });
  }
}
