import { Injectable } from '@nestjs/common';
import { CreateAccountDto, UpdateAccountDto } from '../dtos/account.dto';

@Injectable()
export class AccountsService {
  create(createAccountDto: CreateAccountDto) {
    return 'This action adds a new account';
  }

  async findAllByUserId(userId: string) {
    return `This action returns all accounts`;
  }

  findOne(id: string) {
    return `This action returns a #${id} account`;
  }

  update(id: string, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: string) {
    return `This action removes a #${id} account`;
  }
}
