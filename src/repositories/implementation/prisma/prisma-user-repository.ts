import { PrismaClient } from "@prisma/client";
import {
  type CreateUserProps,
  type UpdateUserProps,
  type UserProps,
} from "../../../interfaces/user";
import { type UserRepository } from "../../interfaces/user-repository";

export class PrismaUserRepository implements UserRepository {
  private readonly userRespository;

  constructor() {
    const prisma = new PrismaClient();
    this.userRespository = prisma.user;
  }

  async findById(id: string): Promise<UserProps | null> {
    return this.userRespository.findFirst({ where: { id } });
  }

  async findByEmail(email: string): Promise<UserProps | null> {
    return this.userRespository.findFirst({ where: { email } });
  }

  async create(data: CreateUserProps): Promise<UserProps> {
    return this.userRespository.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        isExternal: data.isExternal,
        externalId: data.externalId,
        imageUrl: data.imageUrl,
      },
    });
  }

  async update(data: UpdateUserProps): Promise<UserProps | null> {
    return this.userRespository.update({
      where: { id: data.id },
      data: {
        name: data.name,
        email: data.email,
      },
    });
  }
}
