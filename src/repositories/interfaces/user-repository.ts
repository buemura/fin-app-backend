import {
  type CreateUserProps,
  type UpdateUserProps,
  type UserProps,
} from "../../interfaces/user";

export abstract class UserRepository {
  abstract findById(id: string): Promise<UserProps | null>;
  abstract findByEmail(email: string): Promise<UserProps | null>;
  abstract create(data: CreateUserProps): Promise<UserProps>;
  abstract update(data: UpdateUserProps): Promise<UserProps | null>;
}
