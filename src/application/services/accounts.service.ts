import { Injectable } from '@nestjs/common';

import { AccountRepository } from '@application/repositories/account.repository';
import { CreateAccountDto, UpdateAccountDto } from '../dtos/account.dto';

@Injectable()
export class AccountsService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async create(data: CreateAccountDto) {
    return this.accountRepository.create(data);
  }

  async findByUserId(userId: string) {
    return this.accountRepository.findByUserId(userId);
  }

  async findOne(id: string) {
    return this.accountRepository.findById(id);
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    const data = {
      id,
      ...updateAccountDto,
    };
    return this.accountRepository.update(data);
  }

  async remove(id: string) {
    return this.accountRepository.remove(id);
  }
}
