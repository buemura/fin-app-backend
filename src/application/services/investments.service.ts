import { Injectable } from '@nestjs/common';

import { InvestmentRepository } from '@application/repositories/investment.repository';
import {
  CreateInvestmentDto,
  UpdateInvestmentDto,
} from '../dtos/investment.dto';

@Injectable()
export class InvestmentsService {
  constructor(private readonly investmentRepository: InvestmentRepository) {}

  async create(data: CreateInvestmentDto) {
    return this.investmentRepository.create(data);
  }

  async findByUserId(userId: string) {
    return this.investmentRepository.findByUserId(userId);
  }

  async findOne(id: string) {
    return this.investmentRepository.findById(id);
  }

  async update(id: string, updateInvestmentDto: UpdateInvestmentDto) {
    const data = {
      id,
      ...updateInvestmentDto,
    };
    return this.investmentRepository.update(data);
  }

  async remove(id: string) {
    return this.investmentRepository.remove(id);
  }
}
