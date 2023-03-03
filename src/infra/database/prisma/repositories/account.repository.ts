import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import {
  CreateAccountDto,
  UpdateAccountDto,
} from '@application/dtos/account.dto';
import { Account } from '@application/entities/account.entity';
import { AccountRepository } from '@application/repositories/account.repository';

@Injectable()
export class PrismaAccountRepository implements AccountRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findById(id: string): Promise<Account> {
    return this.prisma.account.findFirst({
      where: { id },
    });
  }

  async findByUserId(userId: string): Promise<Account[]> {
    return this.prisma.account.findMany({
      where: { userId },
    });
  }

  async create(data: CreateAccountDto): Promise<Account> {
    return this.prisma.account.create({
      data: {
        userId: data.userId,
        name: data.name,
        balance: data.balance,
        icon: data.icon,
      },
    });
  }

  async update(data: UpdateAccountDto): Promise<Account> {
    return this.prisma.account.update({
      where: { id: data.accountId },
      data: {
        name: data.name,
        balance: data.balance,
        icon: data.icon,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.account.delete({
      where: { id },
    });
  }
}
