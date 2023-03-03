import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import {
  CreateAccountDto,
  UpdateAccountDto,
} from '@application/dtos/account.dto';
import { AccountsService } from '@application/services/accounts.service';

@Controller('users/:userId/accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  async create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  async findByUserId(@Param('userId') userId: string) {
    return this.accountsService.findByUserId(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.accountsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return this.accountsService.update(id, updateAccountDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.accountsService.remove(id);
  }
}
