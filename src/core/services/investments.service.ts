import { BadRequestException, Injectable } from '@nestjs/common';

import {
  CreateInvestmentDto,
  UpdateInvestmentDto,
} from '../dtos/investment.dto';
import { InvestmentRepository } from '../repositories/investment.repository';

@Injectable()
export class InvestmentsService {
  constructor(private readonly investmentRepository: InvestmentRepository) {}

  async create(data: CreateInvestmentDto) {
    const investment = await this.investmentRepository.findByTicker(
      data.ticker,
    );
    if (investment) {
      throw new BadRequestException('Investment already registered');
    }
    return this.investmentRepository.create(data);
  }

  async findByUserId(userId: string) {
    const data = await this.investmentRepository.findByUserId(userId);
    return { data };
  }

  async findOne(id: string) {
    const data = await this.investmentRepository.findById(id);
    return { data };
  }

  async update(id: string, updateInvestmentDto: UpdateInvestmentDto) {
    const data = {
      investmentId: id,
      ...updateInvestmentDto,
    };

    const resp = await this.investmentRepository.update(data);
    return { data: resp };
  }

  async remove(id: string) {
    return this.investmentRepository.remove(id);
  }
}
