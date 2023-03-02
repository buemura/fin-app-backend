import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterAuthDto, LoginAuthDto } from '../dtos/auth.dto';
import { UserRepository } from '../repositories/user.repository';
import { PasswordHelper } from '@helpers/password-helper';
import { AccessTokenHelper } from '@helpers/access-token-helper';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const user = await this.userRepository.findByEmail(registerAuthDto.email);
    if (user) {
      throw new BadRequestException('User already registered');
    }

    const hashedPassword = await PasswordHelper.hashPassword(
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

    const match = await PasswordHelper.comparePassword(
      loginAuthDto.password,
      user.password,
    );
    if (!match) {
      throw new BadRequestException('Invalid credentials');
    }

    const accessToken = await AccessTokenHelper.generate(user.id);

    return {
      accessToken,
      user,
    };
  }
}
