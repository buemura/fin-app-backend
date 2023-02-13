import { randomUUID } from "crypto";
import { type UserRepository } from "../../../src/repositories/interfaces/user-repository";
import {
  type CreateUserProps,
  type UpdateUserProps,
  type UserProps,
} from "../../../src/interfaces/user";

export class InMemoryUserRepository implements UserRepository {
  private readonly users: UserProps[] = [
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

  async findById(id: string): Promise<UserProps | null> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string): Promise<UserProps | null> {
    const user = this.users.find((user) => user.email === email);
    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: CreateUserProps): Promise<UserProps> {
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

  async update(data: UpdateUserProps): Promise<UserProps | null> {
    const user = this.users.find((user) => user.id === data.id);
    if (!user) {
      return null;
    }

    user.name = data.name ?? user.name;
    user.email = data.email ?? user.email;

    return user;
  }
}
