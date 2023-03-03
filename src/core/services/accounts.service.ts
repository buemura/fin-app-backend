import { Injectable } from '@nestjs/common';

import {
  paginationMetadata,
  paginationSliceParams,
} from '@helpers/pagination/functions';
import {
  CreateAccountDto,
  FindByUserIdDto,
  UpdateAccountDto,
} from '../dtos/account.dto';
import { AccountRepository } from '../repositories/account.repository';

@Injectable()
export class AccountsService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async create(data: CreateAccountDto) {
    return this.accountRepository.create(data);
  }

  async findByUserId(props: FindByUserIdDto) {
    const { userId, pagination } = props;

    const { start, end } = paginationSliceParams({
      page: pagination.page,
      items: pagination.items,
    });

    const accounts = await this.accountRepository.findByUserId(userId);
    const data = accounts.slice(start, end);

    const metadata = paginationMetadata({
      data: accounts,
      page: pagination.page,
      items: pagination.items,
    });

    return { metadata, data };
  }

  async findOne(id: string) {
    const data = await this.accountRepository.findById(id);
    return { data };
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    const data = {
      accountId: id,
      ...updateAccountDto,
    };
    return this.accountRepository.update(data);
  }

  async remove(id: string) {
    return this.accountRepository.remove(id);
  }
}
