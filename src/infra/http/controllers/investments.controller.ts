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
  CreateInvestmentDto,
  UpdateInvestmentDto,
} from '@core/dtos/investment.dto';
import { InvestmentsService } from '@core/services/investments.service';

@Controller('users/:userId/investments')
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {}

  @Post()
  async create(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body() createInvestmentDto: CreateInvestmentDto,
  ) {
    const props = {
      userId,
      ...createInvestmentDto,
    };
    return this.investmentsService.create(props);
  }

  @Get()
  async findByUserId(@Param('userId', new ParseUUIDPipe()) userId: string) {
    return this.investmentsService.findByUserId(userId);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.investmentsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateInvestmentDto: UpdateInvestmentDto,
  ) {
    return this.investmentsService.update(id, updateInvestmentDto);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.investmentsService.remove(id);
  }
}
