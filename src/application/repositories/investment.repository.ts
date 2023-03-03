import {
  CreateInvestmentDto,
  UpdateInvestmentDto,
} from '../dtos/investment.dto';
import { Investment } from '../entities/investment.entity';

export abstract class InvestmentRepository {
  abstract findById(id: string): Promise<Investment | null>;
  abstract findByTicker(ticjer: string): Promise<Investment | null>;
  abstract findByUserId(userId: string): Promise<Investment[]>;
  abstract create(data: CreateInvestmentDto): Promise<Investment>;
  abstract update(data: UpdateInvestmentDto): Promise<Investment | null>;
  abstract remove(id: string): Promise<void>;
}
