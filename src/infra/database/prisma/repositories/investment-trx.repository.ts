import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import {
  CreateInvestmentTrxDto,
  UpdateInvestmentTrxDto,
} from '@core/dtos/investment-trx.dto';
import { InvestmentTrx } from '@core/entities/investment-trx.entity';
import { InvestmentTrxRepository } from '@core/repositories/investment-trx.repository';

@Injectable()
export class PrismaInvestmentTrxRepository implements InvestmentTrxRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findById(id: string): Promise<InvestmentTrx> {
    return this.prisma.investmentTransaction.findFirst({
      where: { id },
    });
  }

  async findByUserId(userId: string): Promise<InvestmentTrx[]> {
    return this.prisma.investmentTransaction.findMany({
      where: { userId },
    });
  }

  async create(data: CreateInvestmentTrxDto): Promise<InvestmentTrx> {
    return this.prisma.investmentTransaction.create({
      data: {
        userId: data.userId,
        investmentId: data.investmentId,
        pricePerQuantity: data.pricePerQuantity,
        quantity: data.quantity,
        pricePaid: data.pricePaid,
      },
    });
  }

  async update(data: UpdateInvestmentTrxDto): Promise<InvestmentTrx> {
    return this.prisma.investmentTransaction.update({
      where: { id: data.investmentTrxId },
      data: {
        investmentId: data.investmentId,
        pricePerQuantity: data.pricePerQuantity,
        quantity: data.quantity,
        pricePaid: data.pricePaid,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.investmentTransaction.delete({
      where: { id },
    });
  }
}
