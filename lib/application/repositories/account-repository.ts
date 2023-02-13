import {
  type AccountProps,
  type CreateAccountProps,
  type UpdateAccountProps,
} from "../interfaces/account";

export abstract class AccountRepository {
  abstract findById(id: string): Promise<AccountProps | null>;
  abstract findByUserId(userId: string): Promise<AccountProps[]>;
  abstract create(data: CreateAccountProps): Promise<AccountProps>;
  abstract update(
    id: string,
    data: UpdateAccountProps
  ): Promise<AccountProps | null>;
  abstract delete(id: string): Promise<AccountProps | null>;
}
