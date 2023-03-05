import { AppError } from "../../helpers/errors/app-error";
import { ERROR_MESSAGE } from "../../helpers/errors/messages";
import { PaginationHelper } from "../../helpers/pagination/functions";
import {
  CreateInvestmentDto,
  UpdateInvestmentDto,
} from "../dtos/investment-dto";
import { FindByUserIdDto } from "../dtos/pagination-dto";
import { ResponseDto } from "../dtos/response-dto";
import { AccountRepository } from "../repositories/account-repository";
import { InvestmentRepository } from "../repositories/investment-repository";
import { UserRepository } from "../repositories/user-repository";

export class InvestmentService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly accountRepository: AccountRepository,
    private readonly investmentRepository: InvestmentRepository
  ) {}

  async findByUserId({
    userId,
    pagination,
  }: FindByUserIdDto): Promise<ResponseDto> {
    if (!userId) {
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    const { start, end } = PaginationHelper.getSliceParams({
      page: pagination.page,
      items: pagination.items,
    });

    const investments = await this.investmentRepository.findByUserId(userId);
    const result = investments.slice(start, end);

    const metadata = PaginationHelper.getMetadata({
      data: investments,
      page: pagination.page,
      items: pagination.items,
    });

    return {
      metadata,
      data: result,
    };
  }

  async create({
    userId,
    accountId,
    category,
    ticker,
    type,
  }: CreateInvestmentDto): Promise<ResponseDto> {
    if (!userId || !accountId || !category || !ticker || !type) {
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    const account = await this.accountRepository.findById(accountId);
    if (!account) {
      throw new AppError(ERROR_MESSAGE.ACCOUNT_NOT_FOUND);
    }

    const investment = await this.investmentRepository.findByTicker(ticker);
    if (investment) {
      throw new AppError(ERROR_MESSAGE.INVESTMENT_ALREADY_EXISTS);
    }

    const result = await this.investmentRepository.create({
      userId,
      accountId,
      category,
      ticker,
      type,
    });

    return {
      data: {
        id: result.id,
      },
    };
  }

  async update({
    investmentId,
    accountId,
    category,
    ticker,
    type,
  }: UpdateInvestmentDto): Promise<ResponseDto> {
    if (!investmentId) {
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const investment = await this.investmentRepository.findById(investmentId);
    if (!investment) {
      throw new AppError(ERROR_MESSAGE.INVESTMENT_NOT_FOUND);
    }

    const result = await this.investmentRepository.update({
      investmentId,
      accountId,
      category,
      ticker,
      type,
    });

    return {
      data: {
        id: result?.id,
      },
    };
  }

  async delete(investmentId: string): Promise<ResponseDto> {
    if (!investmentId) {
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const investment = await this.investmentRepository.findById(investmentId);
    if (!investment) {
      throw new AppError(ERROR_MESSAGE.INVESTMENT_NOT_FOUND);
    }

    let result;
    try {
      result = await this.investmentRepository.delete(investmentId);
    } catch (error) {
      console.log(error);
    }

    return {
      data: {
        id: result?.id,
      },
    };
  }
}
