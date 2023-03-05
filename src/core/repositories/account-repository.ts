import { CreateAccountDto, UpdateAccountDto } from "../dtos/account-dto";
import { Account } from "../entities/account";

export abstract class AccountRepository {
  abstract findMany(): Promise<Account[]>;
  abstract findById(id: string): Promise<Account | null>;
  abstract findByUserId(userId: string): Promise<Account[]>;
  abstract create(data: CreateAccountDto): Promise<Account>;
  abstract update(data: UpdateAccountDto): Promise<Account | null>;
  abstract delete(id: string): Promise<Account | null>;
}
