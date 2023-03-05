import { PrismaClient } from "@prisma/client";

import { CreateUserDto, UpdateUserDto } from "@application/dtos/user-dto";
import { User } from "@application/entities/user";
import { UserRepository } from "@application/repositories/user-repository";

export class PrismaUserRepository implements UserRepository {
  private readonly userRespository;

  constructor() {
    const prisma = new PrismaClient();
    this.userRespository = prisma.user;
  }

  async findById(id: string): Promise<User | null> {
    return this.userRespository.findFirst({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRespository.findFirst({ where: { email } });
  }

  async create(data: CreateUserDto): Promise<User> {
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

  async update(data: UpdateUserDto): Promise<User | null> {
    return this.userRespository.update({
      where: { id: data.id },
      data: {
        name: data.name,
        email: data.email,
      },
    });
  }
}
