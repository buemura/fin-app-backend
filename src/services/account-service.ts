import { AppError } from "../utils/app-error";
import { type AccountProps } from "../interfaces/account";
import { type IUserRepository, type IAccountRepository } from "../repositories";
import { RedisCache } from "../utils/redis-cache";
import { logger } from "../utils/logger";

interface getAccountsByIdProps {
  id: string;
}

interface getAccountsByUserIdProps {
  userId: string;
}

interface GetAccountsByUserIdResponse {
  accounts: AccountProps[];
  totalBalance: number;
}

interface createAccountProps {
  userId: string;
  name: string;
  balance: number;
  icon?: string;
}

interface updateAccountProps {
  id: string;
  name?: string;
  balance?: number;
  icon?: string;
}

interface deleteAccountProps {
  id: string;
}

export class AccountService {
  private readonly accountsKey: string = process.env.REDIS_ACCOUNTS_KEY ?? "";
  private readonly redisCache: RedisCache = new RedisCache();

  constructor(
    private readonly userRepository: IUserRepository,
    private readonly accountRepository: IAccountRepository
  ) {}

  async getAccountById({
    id,
  }: getAccountsByIdProps): Promise<AccountProps | null> {
    if (!id) {
      throw new AppError("Missing required parameter");
    }

    return this.accountRepository.findById(id);
  }

  async getAccountsByUserId({
    userId,
  }: getAccountsByUserIdProps): Promise<GetAccountsByUserIdResponse> {
    if (!userId) {
      throw new AppError("Missing required parameter");
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("User does not exists");
    }

    let accounts = await this.redisCache.get<AccountProps[]>(this.accountsKey);
    if (!accounts) {
      logger.info(`No cache found for user ${userId}`);
      accounts = await this.accountRepository.findByUserId(userId);

      logger.info(`Creating cache for user ${userId}`);
      await this.redisCache.save(this.accountsKey, accounts);
    } else {
      accounts = accounts.filter((account) => account.userId === userId);
    }

    const totalBalance = accounts
      .reduce((acc, account) => acc + account.balance, 0)
      .toFixed(2);

    return { accounts, totalBalance: Number(totalBalance) };
  }

  async createAccount({
    userId,
    name,
    balance,
    icon,
  }: createAccountProps): Promise<AccountProps> {
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

    await this.redisCache.remove(this.accountsKey);

    return result;
  }

  async updateAccount({
    id,
    name,
    balance,
    icon,
  }: updateAccountProps): Promise<AccountProps | null> {
    if (!id) {
      throw new AppError("Missing required parameter");
    }

    const account = await this.accountRepository.findById(id);
    if (!account) {
      throw new AppError("Account not found");
    }

    const result = await this.accountRepository.update(id, {
      name,
      balance: Number(balance),
      icon,
    });

    await this.redisCache.remove(this.accountsKey);

    return result;
  }

  async deleteAccount({
    id,
  }: deleteAccountProps): Promise<AccountProps | null> {
    if (!id) {
      throw new AppError("Missing required parameter");
    }

    const account = await this.accountRepository.findById(id);
    if (!account) {
      throw new AppError("Account not found");
    }

    await this.redisCache.remove(this.accountsKey);

    return this.accountRepository.delete(id);
  }
}
