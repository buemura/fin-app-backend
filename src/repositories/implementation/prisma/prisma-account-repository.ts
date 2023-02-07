import { PrismaClient } from "@prisma/client";
import { type AccountRepository } from "../../interfaces/account-repository";
import {
  type AccountProps,
  type CreateAccountProps,
  type UpdateAccountProps,
} from "../../../dtos/account";

export class PrismaAccountRepository implements AccountRepository {
  private readonly accountRespository;

  constructor() {
    const prisma = new PrismaClient();
    this.accountRespository = prisma.account;
  }

  async findById(id: string): Promise<AccountProps | null> {
    return this.accountRespository.findFirst({
      where: { id },
    });
  }

  async findByUserId(userId: string): Promise<AccountProps[]> {
    return this.accountRespository.findMany({
      where: { userId },
    });
  }

  async create(data: CreateAccountProps): Promise<AccountProps> {
    return this.accountRespository.create({
      data: {
        userId: data.userId,
        name: data.name,
        balance: data.balance ?? 0,
        icon: data.icon ?? "",
      },
    });
  }

  async update(
    id: string,
    data: UpdateAccountProps
  ): Promise<AccountProps | null> {
    return this.accountRespository.update({
      where: { id },
      data: {
        name: data.name,
        balance: data.balance,
        icon: data.icon,
      },
    });
  }

  async delete(id: string): Promise<AccountProps | null> {
    return this.accountRespository.delete({ where: { id } });
  }
}
