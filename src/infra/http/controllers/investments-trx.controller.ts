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

@Controller('users/:userId/investments-trx')
export class InvestmentsTrxController {
  constructor(private readonly investmentsTrxService: InvestmentsTrxService) {}

  @Post()
  async create(
    @Param('userId') userId: string,
    @Body() createInvestmentTrxDto: CreateInvestmentTrxDto,
  ) {
    const props = {
      userId,
      ...createInvestmentTrxDto,
    };
    return this.investmentsTrxService.create(props);
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
