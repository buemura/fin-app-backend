import { BadRequestException, Injectable } from '@nestjs/common';

import { InvestmentTrxRepository } from '@application/repositories/investment-trx.repository';
import { InvestmentRepository } from '@application/repositories/investment.repository';
import {
  CreateInvestmentTrxDto,
  UpdateInvestmentTrxDto,
} from '../dtos/investment-trx.dto';

@Injectable()
export class InvestmentsTrxService {
  constructor(
    private readonly investmentTrxRepository: InvestmentTrxRepository,
    private readonly investmentRepository: InvestmentRepository,
  ) {}

  async create(props: CreateInvestmentTrxDto) {
    const investment = await this.investmentRepository.findById(
      props.investmentId,
    );
    if (!investment) {
      throw new BadRequestException('Investment not found');
    }

    const investmentTrx = await this.investmentTrxRepository.create(props);

    await this.incrementInvestmentTotals(
      props.investmentId,
      investment.totalQuantity,
      investment.totalPaidPrice,
      props.quantity,
      props.pricePaid,
    );

    return { data: investmentTrx };
  }

  async findByUserId(userId: string) {
    const data = await this.investmentTrxRepository.findByUserId(userId);
    return { data };
  }

  async findOne(id: string) {
    const data = await this.investmentTrxRepository.findById(id);
    return { data };
  }

  async update(id: string, props: UpdateInvestmentTrxDto) {
    const investmentTrx = await this.investmentTrxRepository.findById(id);
    if (!investmentTrx) {
      throw new BadRequestException('Investment transaction not found');
    }

    const investment = await this.investmentRepository.findById(
      investmentTrx.investmentId,
    );
    if (!investment) {
      throw new BadRequestException('Investment not found');
    }

    const resp = await this.investmentTrxRepository.update({
      investmentTrxId: id,
      ...props,
    });

    await this.updateInvestmentTotals(
      props.investmentId,
      investment.totalQuantity,
      investment.totalPaidPrice,
      props.quantity,
      props.pricePaid,
      investmentTrx.quantity,
      investmentTrx.pricePaid,
    );

    return { resp };
  }

  async remove(id: string) {
    const investmentTrx = await this.investmentTrxRepository.findById(id);
    if (!investmentTrx) {
      throw new BadRequestException('Investment transaction not found');
    }

    const investment = await this.investmentRepository.findById(
      investmentTrx.investmentId,
    );
    if (!investment) {
      throw new BadRequestException('Investment not found');
    }

    await this.decrementInvestmentTotals(
      investmentTrx.investmentId,
      investment.totalQuantity,
      investment.totalPaidPrice,
      investmentTrx.quantity,
      investmentTrx.pricePaid,
    );

    return this.investmentTrxRepository.remove(id);
  }

  private async incrementInvestmentTotals(
    investmentId: string,
    investmentTotalQuantity: number,
    investmentTotalPaidPrice: number,
    quantity: number,
    pricePaid: number,
  ) {
    await this.investmentRepository.update({
      investmentId: investmentId,
      totalQuantity: investmentTotalQuantity + quantity,
      totalPaidPrice: investmentTotalPaidPrice + pricePaid,
    });
  }

  private async decrementInvestmentTotals(
    investmentId: string,
    investmentTotalQuantity: number,
    investmentTotalPaidPrice: number,
    quantity: number,
    pricePaid: number,
  ) {
    await this.investmentRepository.update({
      investmentId: investmentId,
      totalQuantity: investmentTotalQuantity - quantity,
      totalPaidPrice: investmentTotalPaidPrice - pricePaid,
    });
  }

  private async updateInvestmentTotals(
    investmentId: string,
    investmentTotalQuantity: number,
    investmentTotalPaidPrice: number,
    quantity: number,
    pricePaid: number,
    prevQuantity: number,
    prevPricePaid: number,
  ) {
    await this.investmentRepository.update({
      investmentId: investmentId,
      totalQuantity: investmentTotalQuantity - prevQuantity + quantity,
      totalPaidPrice: investmentTotalPaidPrice - prevPricePaid + pricePaid,
    });
  }
}
