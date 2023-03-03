import { BadRequestException, Injectable } from '@nestjs/common';

import { AccessTokenAdapter } from '@adapters/access-token-adapter';
import { PasswordHashAdapter } from '@adapters/password-hash-adapter';
import { LoginAuthDto, RegisterAuthDto } from '../dtos/auth.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const user = await this.userRepository.findByEmail(registerAuthDto.email);
    if (user) {
      throw new BadRequestException('User already registered');
    }

    const hashedPassword = await PasswordHashAdapter.hashPassword(
      registerAuthDto.password,
    );

    const data = {
      ...registerAuthDto,
      password: hashedPassword,
      isExternal: false,
    };
    return this.userRepository.create(data);
  }

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.userRepository.findByEmail(loginAuthDto.email);
    if (!user) {
      throw new BadRequestException('User not registered');
    }

    const match = await PasswordHashAdapter.comparePassword(
      loginAuthDto.password,
      user.password,
    );
    if (!match) {
      throw new BadRequestException('Invalid credentials');
    }

    const accessToken = await AccessTokenAdapter.generate(user.id);

    return {
      accessToken,
      user,
    };
  }
}
