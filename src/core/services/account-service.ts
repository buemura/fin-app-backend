import { AppError } from "@helpers/errors/app-error";
import { ERROR_MESSAGE } from "@helpers/errors/messages";
import { PaginationHelper } from "@helpers/pagination/functions";

import { CreateAccountDto, UpdateAccountDto } from "../dtos/account-dto";
import { FindByUserIdDto } from "../dtos/pagination-dto";
import { ResponseDto } from "../dtos/response-dto";
import { AccountRepository } from "../repositories/account-repository";
import { UserRepository } from "../repositories/user-repository";

export class AccountService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly accountRepository: AccountRepository
  ) {}

  async findById(accountId: string): Promise<ResponseDto> {
    if (!accountId) {
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const result = await this.accountRepository.findById(accountId);

    return {
      data: result,
    };
  }

  async findByUserId({
    pagination,
    userId,
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

    const accounts = await this.accountRepository.findByUserId(userId);
    const result = accounts.slice(start, end);

    const totalBalance = accounts
      .reduce((acc, account) => acc + account.balance, 0)
      .toFixed(2);

    const accountsMetrics = accounts.map((account) => ({
      name: account.name,
      balance: account.balance,
    }));

    const metadata = PaginationHelper.getMetadata({
      data: accounts,
      page: pagination.page,
      items: pagination.items,
    });

    return {
      metadata,
      data: {
        accounts: result,
        totalBalance: Number(totalBalance),
        metricsData: accountsMetrics,
      },
    };
  }

  async create({
    userId,
    name,
    balance,
    icon,
  }: CreateAccountDto): Promise<ResponseDto> {
    if (!userId || !name) {
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    const result = await this.accountRepository.create({
      userId,
      name,
      balance: balance ? Number(balance) : 0,
      icon: icon ? String(icon) : "",
    });

    return {
      data: {
        id: result.id,
      },
    };
  }

  async update({
    accountId,
    name,
    balance,
    icon,
  }: UpdateAccountDto): Promise<ResponseDto> {
    if (!accountId) {
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const account = await this.accountRepository.findById(accountId);
    if (!account) {
      throw new AppError(ERROR_MESSAGE.ACCOUNT_NOT_FOUND);
    }

    const result = await this.accountRepository.update({
      accountId,
      name,
      balance: Number(balance),
      icon,
    });

    return {
      data: {
        id: result?.id,
      },
    };
  }

  async delete(accountId: string): Promise<ResponseDto> {
    if (!accountId) {
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const account = await this.accountRepository.findById(accountId);
    if (!account) {
      throw new AppError(ERROR_MESSAGE.ACCOUNT_NOT_FOUND);
    }

    const result = await this.accountRepository.delete(accountId);

    return {
      data: {
        id: result?.id,
      },
    };
  }
}
