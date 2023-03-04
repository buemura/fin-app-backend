import { BadRequestException, Injectable } from '@nestjs/common';

import { AccessTokenProvider } from '@application/providers/access-token-provider';
import { HashProvider } from '@application/providers/hash-provider';
import { ERROR_MESSAGE } from '@helpers/errors/messages';
import { LoginAuthDto, RegisterAuthDto } from '../dtos/auth-dto';
import { User } from '../entities/user-entity';
import { UserRepository } from '../repositories/user-repository';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const user = await this.userRepository.findByEmail(registerAuthDto.email);
    if (user) {
      throw new BadRequestException(ERROR_MESSAGE.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await HashProvider.hashPassword(
      registerAuthDto.password,
    );

    const props = {
      ...registerAuthDto,
      password: hashedPassword,
      isExternal: false,
    };
    const data = await this.userRepository.create(props);
    return { data: { id: data.id } };
  }

  async validateUser(loginAuthDto: LoginAuthDto) {
    const user = await this.userRepository.findByEmail(loginAuthDto.email);
    if (!user) {
      return null;
    }

    const match = await HashProvider.comparePassword(
      loginAuthDto.password,
      user.password,
    );
    if (!match) {
      return null;
    }

    return user;
  }

  async login(user: User) {
    const accessToken = await AccessTokenProvider.generate(user.id);
    const { password, ...userToReturn } = user;

    return {
      data: {
        accessToken,
        user: userToReturn,
      },
    };
  }
}
