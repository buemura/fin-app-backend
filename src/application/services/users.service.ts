import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dtos/user';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: string) {
    return this.userRepository.findById(id);
  }

  async update(updateUserDto: UpdateUserDto) {
    const user = await this.findOne(updateUserDto.id);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    return this.userRepository.update(updateUserDto);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    return this.userRepository.remove(id);
  }
}
