import { randomUUID } from "crypto";

import {
  CreateUserDto,
  UpdateUserDto,
} from "../../../src/application/dtos/user-dto";
import { User } from "../../../src/application/entities/user";
import { UserRepository } from "../../../src/application/repositories/user-repository";

export class InMemoryUserRepository implements UserRepository {
  private readonly users: User[] = [
    {
      id: "user-1",
      name: "john",
      email: "john@example.com",
      password: "$2b$10$9gtP7YpI6rEZKYfJn7lDquygCTQKGNHn1jzWj3TOiEB4CIWDAO/pS",
      isExternal: false,
      externalId: null,
      imageUrl: "http://localhost.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);
    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password ?? "",
      isExternal: data.isExternal,
      externalId: data.externalId ?? "",
      imageUrl: data.imageUrl ?? "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(user);
    return user;
  }

  async update(data: UpdateUserDto): Promise<User | null> {
    const user = this.users.find((user) => user.id === data.id);
    if (!user) {
      return null;
    }

    user.name = data.name ?? user.name;
    user.email = data.email ?? user.email;

    return user;
  }
}
