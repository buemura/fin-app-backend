import { randomUUID } from "crypto";

import {
  CreateAccountDto,
  UpdateAccountDto,
} from "../../../src/application/dtos/account-dto";
import { Account } from "../../../src/application/entities/account";
import { AccountRepository } from "../../../src/application/repositories/account-repository";

export class InMemoryAccountRepository implements AccountRepository {
  private accounts: Account[] = [
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

  async findMany(): Promise<Account[]> {
    return this.accounts;
  }

  async findById(id: string): Promise<Account | null> {
    const account = this.accounts.find((account) => account.id === id);
    if (!account) {
      return null;
    }

    return account;
  }

  async findByUserId(userId: string): Promise<Account[]> {
    const account = this.accounts.filter(
      (account) => account.userId === userId
    );

    return account;
  }

  async create(data: CreateAccountDto): Promise<Account> {
    const account: Account = {
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

  async update(data: UpdateAccountDto): Promise<Account | null> {
    const account = this.accounts.find(
      (account) => account.id === data.accountId
    );
    if (!account) {
      return null;
    }

    account.name = data?.name ?? account.name;
    account.balance = data?.balance ?? account.balance;
    account.icon = data?.icon ?? account.icon;

    return account;
  }

  async delete(id: string): Promise<Account | null> {
    const account = this.accounts.find((account) => account.id === id);
    if (!account) {
      return null;
    }

    this.accounts = this.accounts.filter((account) => account.id !== id);
    return account;
  }
}
