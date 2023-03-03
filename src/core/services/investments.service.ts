import { BadRequestException, Injectable } from '@nestjs/common';

import {
  CreateInvestmentDto,
  UpdateInvestmentDto,
} from '../dtos/investment.dto';
import { AccountRepository } from '../repositories/account.repository';
import { InvestmentRepository } from '../repositories/investment.repository';

@Injectable()
export class InvestmentsService {
  constructor(
    private readonly investmentRepository: InvestmentRepository,
    private readonly accountRepository: AccountRepository,
  ) {}

  async create(props: CreateInvestmentDto) {
    const investment = await this.investmentRepository.findByTicker(
      props.ticker,
    );
    if (investment) {
      throw new BadRequestException(
        'Investment with provided ticker already registered',
      );
    }

    const account = await this.accountRepository.findById(props.accountId);
    if (!account) {
      throw new BadRequestException('Account not found');
    }

    const newInvestment = await this.investmentRepository.create(props);

    return {
      data: {
        id: newInvestment.id,
      },
    };
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
    const investment = await this.investmentRepository.findById(id);
    if (!investment) {
      throw new BadRequestException('Investment not found');
    }

    // TODO: revalidate if ticker should be unique
    const investmentExists = await this.investmentRepository.findByTicker(
      updateInvestmentDto.ticker,
    );
    if (investmentExists && investmentExists.id !== id) {
      throw new BadRequestException(
        'Investment with provided ticker already exists',
      );
    }

    const account = await this.accountRepository.findById(
      updateInvestmentDto.accountId,
    );
    if (!account) {
      throw new BadRequestException('Account not found');
    }

    const props = {
      investmentId: id,
      ...updateInvestmentDto,
    };

    const newInvestment = await this.investmentRepository.update(props);
    return {
      data: {
        id: newInvestment.id,
      },
    };
  }

  async remove(id: string) {
    await this.investmentRepository.remove(id);
    return {
      data: { id },
    };
  }
}
