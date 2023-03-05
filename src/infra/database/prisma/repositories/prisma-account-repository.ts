import { PrismaClient } from "@prisma/client";

import {
  CreateAccountDto,
  UpdateAccountDto,
} from "@application/dtos/account-dto";
import { Account } from "@application/entities/account";
import { AccountRepository } from "@application/repositories/account-repository";
import { CacheRepository } from "@application/repositories/cache-repository";

export class PrismaAccountRepository implements AccountRepository {
  private readonly accountRespository;

  constructor(private readonly cacheRepository: CacheRepository) {
    const prisma = new PrismaClient();
    this.accountRespository = prisma.account;
  }

  async findMany(): Promise<Account[]> {
    const cached = await this.cacheRepository.get<Account[]>(
      process.env.REDIS_ACCOUNTS_KEY ?? ""
    );
    if (cached) {
      return cached;
    }

    const result = await this.accountRespository.findMany();
    await this.cacheRepository.save(
      process.env.REDIS_ACCOUNTS_KEY ?? "",
      result
    );

    return result;
  }

  async findById(id: string): Promise<Account | null> {
    return this.accountRespository.findFirst({
      where: { id },
    });
  }

  async findByUserId(userId: string): Promise<Account[]> {
    const cached = await this.cacheRepository.get<Account[]>(
      String(process.env.REDIS_ACCOUNTS_KEY)
    );
    if (cached) {
      return cached;
    }

    const result = await this.accountRespository.findMany({
      where: { userId },
    });

    await this.cacheRepository.save(
      String(process.env.REDIS_ACCOUNTS_KEY),
      result
    );

    return result;
  }

  async create(data: CreateAccountDto): Promise<Account> {
    await this.cacheRepository.remove(String(process.env.REDIS_ACCOUNTS_KEY));
    return this.accountRespository.create({
      data: {
        userId: data.userId,
        name: data.name,
        balance: data?.balance ?? 0,
        icon: data?.icon ?? "",
      },
    });
  }

  async update(data: UpdateAccountDto): Promise<Account | null> {
    await this.cacheRepository.remove(String(process.env.REDIS_ACCOUNTS_KEY));
    return this.accountRespository.update({
      where: { id: data.accountId },
      data: {
        name: data.name,
        balance: data.balance,
        icon: data.icon,
      },
    });
  }

  async delete(id: string): Promise<Account | null> {
    await this.cacheRepository.remove(String(process.env.REDIS_ACCOUNTS_KEY));
    return this.accountRespository.delete({ where: { id } });
  }
}
