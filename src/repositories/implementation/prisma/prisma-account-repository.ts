import { PrismaClient } from "@prisma/client";
import {
  AccountProps,
  CreateAccountProps,
  UpdateAccountProps,
} from "../../../interfaces/account";
import { AccountRepository } from "../../interfaces/account-repository";
import { CacheRepository } from "../../interfaces/cache-repository";

export class PrismaAccountRepository implements AccountRepository {
  private readonly accountRespository;

  constructor(private readonly cacheRepository: CacheRepository) {
    const prisma = new PrismaClient();
    this.accountRespository = prisma.account;
  }

  async findMany(): Promise<AccountProps[]> {
    const cached = await this.cacheRepository.get<AccountProps[]>(
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

  async findById(id: string): Promise<AccountProps | null> {
    return this.accountRespository.findFirst({
      where: { id },
    });
  }

  async findByUserId(userId: string): Promise<AccountProps[]> {
    const cached = await this.cacheRepository.get<AccountProps[]>(
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

  async create(data: CreateAccountProps): Promise<AccountProps> {
    await this.cacheRepository.remove(String(process.env.REDIS_ACCOUNTS_KEY));
    return this.accountRespository.create({
      data: {
        userId: data.userId,
        name: data.name,
        balance: data.balance ?? 0,
        icon: data.icon ?? "",
      },
    });
  }

  async update(data: UpdateAccountProps): Promise<AccountProps | null> {
    await this.cacheRepository.remove(String(process.env.REDIS_ACCOUNTS_KEY));
    return this.accountRespository.update({
      where: { id: data.id },
      data: {
        name: data.name,
        balance: data.balance,
        icon: data.icon,
      },
    });
  }

  async delete(id: string): Promise<AccountProps | null> {
    await this.cacheRepository.remove(String(process.env.REDIS_ACCOUNTS_KEY));
    return this.accountRespository.delete({ where: { id } });
  }
}
