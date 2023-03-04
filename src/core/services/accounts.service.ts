import { Injectable } from '@nestjs/common';

import {
  paginationMetadata,
  paginationSliceParams,
} from '@helpers/pagination/functions';
import {
  CreateAccountDto,
  FindByUserIdDto,
  UpdateAccountDto,
} from '../dtos/account-dto';
import { AccountRepository } from '../repositories/account-repository';

@Injectable()
export class AccountsService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async create(data: CreateAccountDto) {
    const account = await this.accountRepository.create(data);

    return {
      data: {
        id: account.id,
      },
    };
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

  async update(updateAccountDto: UpdateAccountDto) {
    const account = await this.accountRepository.update(updateAccountDto);

    return {
      data: {
        id: account.id,
      },
    };
  }

  async remove(id: string) {
    await this.accountRepository.remove(id);

    return {
      data: { id },
    };
  }
}
