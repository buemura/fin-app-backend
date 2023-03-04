import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from '@core/services/users.service';
import { UpdateUserDto, UpdateUserPasswordDto } from '../dtos/user-dto';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const data = {
      id,
      ...updateUserDto,
    };

    return this.usersService.update(data);
  }

  @Patch(':id')
  async updatePasswird(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    const data = {
      id,
      ...updateUserPasswordDto,
    };

    return this.usersService.updatePassword(data);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.remove(id);
  }
}
