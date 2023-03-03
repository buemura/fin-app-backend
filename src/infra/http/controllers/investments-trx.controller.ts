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
  CreateInvestmentTrxDto,
  UpdateInvestmentTrxDto,
} from '@application/dtos/investment-trx.dto';
import { InvestmentsTrxService } from '@application/services/investments-trx.service';

@Controller('users/:userId/investments')
export class InvestmentsTrxController {
  constructor(private readonly investmentsTrxService: InvestmentsTrxService) {}

  @Post()
  async create(@Body() createInvestmentTrxDto: CreateInvestmentTrxDto) {
    return this.investmentsTrxService.create(createInvestmentTrxDto);
  }

  @Get()
  async findByUserId(@Param('userId') userId: string) {
    return this.investmentsTrxService.findByUserId(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.investmentsTrxService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInvestmentTrxDto: UpdateInvestmentTrxDto,
  ) {
    return this.investmentsTrxService.update(id, updateInvestmentTrxDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.investmentsTrxService.remove(id);
  }
}
