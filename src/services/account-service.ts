import { AppError } from "../utils/app-error";
import { type AccountProps } from "../dtos/account";
import { type IUserRepository, type IAccountRepository } from "../repositories";

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

    const accounts = await this.accountRepository.findByUserId(userId);
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

    return this.accountRepository.create({
      userId,
      name,
      balance: Number(balance),
      icon,
    });
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

    return this.accountRepository.update(id, {
      name,
      balance: Number(balance),
      icon,
    });
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

    return this.accountRepository.delete(id);
  }
}
