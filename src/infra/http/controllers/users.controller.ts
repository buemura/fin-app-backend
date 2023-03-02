import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from '@application/services/users.service';
import { UpdateUserDto } from '@application/dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const data = {
      id,
      ...updateUserDto,
    };

    return this.usersService.update(data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
