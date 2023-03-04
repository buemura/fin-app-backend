import { BadRequestException, Injectable } from '@nestjs/common';

import { ERROR_MESSAGE } from '@helpers/errors/messages';
import {
  CreateInvestmentTrxDto,
  UpdateInvestmentTrxDto,
} from '../dtos/investment-trx-dto';
import { InvestmentRepository } from '../repositories/investment-repository';
import { InvestmentTrxRepository } from '../repositories/investment-trx-repository';

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
      throw new BadRequestException(ERROR_MESSAGE.INVESTMENT_NOT_FOUND);
    }

    const investmentTrx = await this.investmentTrxRepository.create(props);

    await this.incrementInvestmentTotals(
      props.investmentId,
      investment.totalQuantity,
      investment.totalPaidPrice,
      props.quantity,
      props.pricePaid,
    );

    return { data: { id: investmentTrx.id } };
  }

  async findByUserId(userId: string) {
    const data = await this.investmentTrxRepository.findByUserId(userId);
    return { data };
  }

  async findOne(id: string) {
    const data = await this.investmentTrxRepository.findById(id);
    return { data };
  }

  async update(props: UpdateInvestmentTrxDto) {
    const investmentTrx = await this.investmentTrxRepository.findById(
      props.investmentTrxId,
    );
    if (!investmentTrx) {
      throw new BadRequestException(ERROR_MESSAGE.INVESTMENT_TRX_NOT_FOUND);
    }

    const investment = await this.investmentRepository.findById(
      props.investmentId,
    );
    if (!investment) {
      throw new BadRequestException(ERROR_MESSAGE.INVESTMENT_NOT_FOUND);
    }

    const newInvestmentTrx = await this.investmentTrxRepository.update(props);

    await this.updateInvestmentTotals(
      props.investmentId,
      investment.totalQuantity,
      investment.totalPaidPrice,
      props.quantity,
      props.pricePaid,
      investmentTrx.quantity,
      investmentTrx.pricePaid,
    );

    return { data: { id: newInvestmentTrx.id } };
  }

  async remove(id: string) {
    const investmentTrx = await this.investmentTrxRepository.findById(id);
    if (!investmentTrx) {
      throw new BadRequestException(ERROR_MESSAGE.INVESTMENT_TRX_NOT_FOUND);
    }

    const investment = await this.investmentRepository.findById(
      investmentTrx.investmentId,
    );
    if (!investment) {
      throw new BadRequestException(ERROR_MESSAGE.INVESTMENT_NOT_FOUND);
    }

    await this.decrementInvestmentTotals(
      investmentTrx.investmentId,
      investment.totalQuantity,
      investment.totalPaidPrice,
      investmentTrx.quantity,
      investmentTrx.pricePaid,
    );

    await this.investmentTrxRepository.remove(id);
    return { data: { id } };
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
