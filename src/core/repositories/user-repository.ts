import { CreateUserDto, UpdateUserDto } from '../dtos/user-dto';
import { User } from '../entities/user-entity';

export abstract class UserRepository {
  abstract findAll(): Promise<User[]>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(data: CreateUserDto): Promise<User>;
  abstract update(data: UpdateUserDto): Promise<User | null>;
  abstract remove(id: string): Promise<void>;
}
