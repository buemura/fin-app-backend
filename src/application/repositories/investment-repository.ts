import {
  CreateInvestmentDto,
  UpdateInvestmentDto,
} from "../dtos/investment-dto";
import { Investment } from "../entities/investment";

export abstract class InvestmentRepository {
  abstract findMany(): Promise<Investment[]>;
  abstract findById(id: string): Promise<Investment | null>;
  abstract findByUserId(userId: string): Promise<Investment[]>;
  abstract findByTicker(ticker: string): Promise<Investment | null>;
  abstract create(data: CreateInvestmentDto): Promise<Investment>;
  abstract update(data: UpdateInvestmentDto): Promise<Investment | null>;
  abstract delete(id: string): Promise<Investment | null>;
}
