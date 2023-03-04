import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AccountsService } from '@core/services/accounts.service';
import { DEFAULT_PAGINATION } from '@helpers/pagination/constants';
import { CreateAccountDto, UpdateAccountDto } from '../dtos/account-dto';
import { PaginationQueryParams } from '../dtos/pagination-dto';

@Controller('users/:userId/accounts')
@UseGuards(AuthGuard('jwt'))
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  async create(
    @Param('userId', new ParseUUIDPipe()) userId: string,
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
    @Param('userId', new ParseUUIDPipe()) userId: string,
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
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.accountsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) accountId: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    const props = {
      accountId,
      ...updateAccountDto,
    };
    return this.accountsService.update(props);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.accountsService.remove(id);
  }
}
