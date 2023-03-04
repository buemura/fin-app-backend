import { BadRequestException, Injectable } from '@nestjs/common';

import { ERROR_MESSAGE } from '@helpers/errors/messages';
import {
  CreateInvestmentDto,
  UpdateInvestmentDto,
} from '../dtos/investment-dto';
import { AccountRepository } from '../repositories/account-repository';
import { InvestmentRepository } from '../repositories/investment-repository';

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
      throw new BadRequestException(ERROR_MESSAGE.INVESTMENT_ALREADY_EXISTS);
    }

    const account = await this.accountRepository.findById(props.accountId);
    if (!account) {
      throw new BadRequestException(ERROR_MESSAGE.ACCOUNT_NOT_FOUND);
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

  async update(props: UpdateInvestmentDto) {
    const investment = await this.investmentRepository.findById(
      props.investmentId,
    );
    if (!investment) {
      throw new BadRequestException(ERROR_MESSAGE.INVESTMENT_NOT_FOUND);
    }

    // TODO: revalidate if ticker should be unique
    const investmentExists = await this.investmentRepository.findByTicker(
      props.ticker,
    );
    if (investmentExists && investmentExists.id !== props.investmentId) {
      throw new BadRequestException(ERROR_MESSAGE.INVESTMENT_ALREADY_EXISTS);
    }

    const account = await this.accountRepository.findById(props.accountId);
    if (!account) {
      throw new BadRequestException(ERROR_MESSAGE.ACCOUNT_NOT_FOUND);
    }

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
