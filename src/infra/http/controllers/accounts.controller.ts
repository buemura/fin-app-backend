import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CreateAccountDto, UpdateAccountDto } from '@core/dtos/account.dto';
import { PaginationQueryParams } from '@core/dtos/pagination.dto';
import { AccountsService } from '@core/services/accounts.service';
import { DEFAULT_PAGINATION } from 'src/helpers/pagination/constants';

@Controller('users/:userId/accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  async create(
    @Param('userId') userId: string,
    @Body() createAccountDto: CreateAccountDto,
  ) {
    const props = {
      userId,
      ...createAccountDto,
    };
    return this.accountsService.create(props);
  }

  @Get()
  async findByUserId(
    @Param('userId') userId: string,
    @Query() query: PaginationQueryParams,
  ) {
    const props = {
      userId,
      pagination: {
        page: Number(query.page) || DEFAULT_PAGINATION.PAGE,
        items: Number(query.items) || DEFAULT_PAGINATION.ITEMS,
      },
    };
    return this.accountsService.findByUserId(props);
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
