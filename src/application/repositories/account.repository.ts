import { CreateAccountDto, UpdateAccountDto } from '../dtos/account.dto';
import { Account } from '../entities/account.entity';

export abstract class AccountRepository {
  abstract findById(id: string): Promise<Account | null>;
  abstract findByUserId(userId: string): Promise<Account[]>;
  abstract create(data: CreateAccountDto): Promise<Account>;
  abstract update(data: UpdateAccountDto): Promise<Account | null>;
  abstract remove(id: string): Promise<void>;
}
