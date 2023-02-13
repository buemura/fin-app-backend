import { randomUUID } from "crypto";
import { type AccountRepository } from "../../interfaces/account-repository";
import {
  type AccountProps,
  type CreateAccountProps,
  type UpdateAccountProps,
} from "../../../interfaces/account";

export class InMemoryAccountRepository implements AccountRepository {
  private accounts: AccountProps[] = [
    {
      id: "account-1",
      userId: "user-1",
      name: "Nubank",
      balance: 5200,
      icon: "http://image.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async findById(id: string): Promise<AccountProps | null> {
    const account = this.accounts.find((account) => account.id === id);
    if (!account) {
      return null;
    }

    return account;
  }

  async findByUserId(userId: string): Promise<AccountProps[]> {
    const account = this.accounts.filter(
      (account) => account.userId === userId
    );

    return account;
  }

  async create(data: CreateAccountProps): Promise<AccountProps> {
    const account: AccountProps = {
      id: randomUUID(),
      userId: data.userId,
      name: data.name,
      balance: data.balance ?? 0,
      icon: data?.icon ?? "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.accounts.push(account);
    return account;
  }

  async update(
    id: string,
    data: UpdateAccountProps
  ): Promise<AccountProps | null> {
    const account = this.accounts.find((account) => account.id === id);
    if (!account) {
      return null;
    }

    account.name = data?.name ?? account.name;
    account.balance = data?.balance ?? account.balance;
    account.icon = data?.icon ?? account.icon;

    return account;
  }

  async delete(id: string): Promise<AccountProps | null> {
    const account = this.accounts.find((account) => account.id === id);
    if (!account) {
      return null;
    }

    this.accounts = this.accounts.filter((account) => account.id !== id);
    return account;
  }
}
