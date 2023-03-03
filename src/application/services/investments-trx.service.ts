import { Injectable } from '@nestjs/common';

import { InvestmentTrxRepository } from '@application/repositories/investment-trx.repository';
import {
  CreateInvestmentTrxDto,
  UpdateInvestmentTrxDto,
} from '../dtos/investment-trx.dto';

@Injectable()
export class InvestmentsTrxService {
  constructor(
    private readonly investmentTrxRepository: InvestmentTrxRepository,
  ) {}

  async create(data: CreateInvestmentTrxDto) {
    return this.investmentTrxRepository.create(data);
  }

  async findByUserId(userId: string) {
    return this.investmentTrxRepository.findByUserId(userId);
  }

  async findOne(id: string) {
    return this.investmentTrxRepository.findById(id);
  }

  async update(id: string, updateInvestmentTrxDto: UpdateInvestmentTrxDto) {
    const data = {
      id,
      ...updateInvestmentTrxDto,
    };
    return this.investmentTrxRepository.update(data);
  }

  async remove(id: string) {
    return this.investmentTrxRepository.remove(id);
  }
}
