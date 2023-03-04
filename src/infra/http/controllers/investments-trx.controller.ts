import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { InvestmentsTrxService } from '@core/services/investments-trx.service';
import {
  CreateInvestmentTrxDto,
  UpdateInvestmentTrxDto,
} from '../dtos/investment-trx-dto';

@Controller('users/:userId/investments-trx')
@UseGuards(AuthGuard('jwt'))
export class InvestmentsTrxController {
  constructor(private readonly investmentsTrxService: InvestmentsTrxService) {}

  @Post()
  async create(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body() createInvestmentTrxDto: CreateInvestmentTrxDto,
  ) {
    const props = {
      userId,
      ...createInvestmentTrxDto,
    };
    return this.investmentsTrxService.create(props);
  }

  @Get()
  async findByUserId(@Param('userId', new ParseUUIDPipe()) userId: string) {
    return this.investmentsTrxService.findByUserId(userId);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.investmentsTrxService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) investmentTrxId: string,
    @Body() updateInvestmentTrxDto: UpdateInvestmentTrxDto,
  ) {
    const props = {
      investmentTrxId,
      ...updateInvestmentTrxDto,
    };
    return this.investmentsTrxService.update(props);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.investmentsTrxService.remove(id);
  }
}
