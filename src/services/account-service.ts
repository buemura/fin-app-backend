import {
  AccountProps,
  CreateAccountProps,
  DeleteAccountProps,
  GetAccountsByIdProps,
  GetAccountsByUserIdProps,
  GetAccountsByUserIdResponse,
  UpdateAccountProps,
} from "../interfaces/account";
import { IAccountRepository, IUserRepository } from "../repositories";
import { AppError } from "../utils/app-error";
import { paginationMetadata, sliceParams } from "../utils/functions";

export class AccountService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly accountRepository: IAccountRepository
  ) {}

  async getAccountById({
    id,
  }: GetAccountsByIdProps): Promise<AccountProps | null> {
    if (!id) {
      throw new AppError("Missing required parameter");
    }

    return this.accountRepository.findById(id);
  }

  async getAccountsByUserId({
    pagination,
    userId,
  }: GetAccountsByUserIdProps): Promise<GetAccountsByUserIdResponse> {
    if (!userId) {
      throw new AppError("Missing required parameter");
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("User does not exists");
    }

    const { start, end } = sliceParams({
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

    const metadata = paginationMetadata({
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

  async createAccount({
    userId,
    name,
    balance,
    icon,
  }: CreateAccountProps): Promise<AccountProps> {
    if (!userId || !name || !balance) {
      throw new AppError("Missing required parameter");
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("User does not exists");
    }

    const result = await this.accountRepository.create({
      userId,
      name,
      balance: Number(balance),
      icon,
    });

    return result;
  }

  async updateAccount({
    id,
    name,
    balance,
    icon,
  }: UpdateAccountProps): Promise<AccountProps | null> {
    if (!id) {
      throw new AppError("Missing required parameter");
    }

    const account = await this.accountRepository.findById(id);
    if (!account) {
      throw new AppError("Account not found");
    }

    const result = await this.accountRepository.update({
      id,
      name,
      balance: Number(balance),
      icon,
    });

    return result;
  }

  async deleteAccount({
    id,
  }: DeleteAccountProps): Promise<AccountProps | null> {
    if (!id) {
      throw new AppError("Missing required parameter");
    }

    const account = await this.accountRepository.findById(id);
    if (!account) {
      throw new AppError("Account not found");
    }

    return this.accountRepository.delete(id);
  }
}
