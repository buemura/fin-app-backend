import { IUserRepository, IAccountRepository } from "@repositories";
import { AccountProps } from "@dtos/account";
import { AppError } from "@utils/app-error";

type getAccountsByIdProps = {
  id: string;
};

type getAccountsByUserIdProps = {
  userId: string;
};

type getAccountsByUserIdResponse = {
  accounts: AccountProps[];
  totalBalance: number;
};

type createAccountProps = {
  userId: string;
  name: string;
  balance: number;
  icon?: string;
};

type updateAccountProps = {
  id: string;
  name?: string;
  balance?: number;
  icon?: string;
};

type deleteAccountProps = {
  id: string;
};

export class AccountService {
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
  }: getAccountsByUserIdProps): Promise<getAccountsByUserIdResponse> {
    if (!userId) {
      throw new AppError("Missing required parameter");
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("User does not exists");
    }

    const accounts = await this.accountRepository.findByUserId(userId);
    const totalBalance = accounts
      .reduce((acc, account) => acc + account.balance, 0)
      .toFixed(2);

    return { accounts, totalBalance: Number(totalBalance) };
  }

  async createAccount({ userId, name, balance, icon }: createAccountProps) {
    if (!userId || !name || !balance) {
      throw new AppError("Missing required parameter");
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("User does not exists");
    }

    return this.accountRepository.create({
      userId,
      name,
      balance: Number(balance),
      icon,
    });
  }

  async updateAccount({ id, name, balance, icon }: updateAccountProps) {
    if (!id) {
      throw new AppError("Missing required parameter");
    }

    const account = await this.accountRepository.findById(id);
    if (!account) {
      throw new AppError("Account not found");
    }

    return this.accountRepository.update(id, {
      name,
      balance: Number(balance),
      icon,
    });
  }

  async deleteAccount({ id }: deleteAccountProps) {
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
