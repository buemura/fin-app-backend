import { BadRequestException, Injectable } from '@nestjs/common';

import { ERROR_MESSAGE } from '@helpers/errors/messages';
import { UpdateUserDto, UpdateUserPasswordDto } from '../dtos/user.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async findOne(id: string) {
    const { password, ...userToReturn } = await this.userRepository.findById(
      id,
    );

    return { data: userToReturn };
  }

  async update(data: UpdateUserDto) {
    const user = await this.findOne(data.id);
    if (!user) {
      throw new BadRequestException(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    return this.userRepository.update(data);
  }

  // TODO: Finish this
  async updatePassword(data: UpdateUserPasswordDto) {
    const user = await this.findOne(data.id);
    if (!user) {
      throw new BadRequestException(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    return this.userRepository.update(data);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new BadRequestException(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    return this.userRepository.remove(id);
  }
}
