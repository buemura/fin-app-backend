import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';

import {
  CreateInvestmentTrxDto,
  UpdateInvestmentTrxDto,
} from '@core/dtos/investment-trx.dto';
import { InvestmentsTrxService } from '@core/services/investments-trx.service';

@Controller('users/:userId/investments-trx')
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
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateInvestmentTrxDto: UpdateInvestmentTrxDto,
  ) {
    return this.investmentsTrxService.update(id, updateInvestmentTrxDto);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.investmentsTrxService.remove(id);
  }
}
