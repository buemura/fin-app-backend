import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterAuthDto, LoginAuthDto } from '../dtos/auth';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const user = await this.userRepository.findByEmail(registerAuthDto.email);
    if (user) {
      throw new BadRequestException('User already registered');
    }

    const data = {
      ...registerAuthDto,
      isExternal: false,
    };
    return this.userRepository.create(data);
  }

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.userRepository.findByEmail(loginAuthDto.email);
    if (!user) {
      throw new BadRequestException('User not registered');
    }

    const match = user.password === loginAuthDto.password;
    if (!match) {
      throw new BadRequestException('Invalid credentials');
    }

    return user;
  }
}
