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

import { InvestmentsService } from '@core/services/investments.service';
import {
  CreateInvestmentDto,
  UpdateInvestmentDto,
} from '../dtos/investment.dto';

@Controller('users/:userId/investments')
@UseGuards(AuthGuard('jwt'))
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
    @Param('id', new ParseUUIDPipe()) investmentId: string,
    @Body() updateInvestmentDto: UpdateInvestmentDto,
  ) {
    const props = {
      investmentId,
      ...updateInvestmentDto,
    };
    return this.investmentsService.update(props);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.investmentsService.remove(id);
  }
}
