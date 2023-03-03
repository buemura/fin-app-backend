import {
  CreateInvestmentTrxDto,
  UpdateInvestmentTrxDto,
} from '../dtos/investment-trx.dto';
import { InvestmentTrx } from '../entities/investment-trx.entity';

export abstract class InvestmentTrxRepository {
  abstract findById(id: string): Promise<InvestmentTrx | null>;
  abstract findByUserId(userId: string): Promise<InvestmentTrx[]>;
  abstract create(data: CreateInvestmentTrxDto): Promise<InvestmentTrx>;
  abstract update(data: UpdateInvestmentTrxDto): Promise<InvestmentTrx | null>;
  abstract remove(id: string): Promise<void>;
}
