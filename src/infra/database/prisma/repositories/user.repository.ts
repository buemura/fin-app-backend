import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { User } from '@application/entities/user.entity';
import { UserRepository } from '@application/repositories/user.repository';
import { CreateUserDto, UpdateUserDto } from '@application/dtos/user.dto';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: { email },
    });
  }

  async create(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        isExternal: false,
      },
    });
  }

  async update(data: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
