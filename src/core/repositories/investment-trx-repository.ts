import {
  CreateInvestmentTrxDto,
  TotalDetailsReponse,
  UpdateInvestmentTrxDto,
} from "../dtos/investment-trx-dto";
import { InvestmentTrx } from "../entities/investment-trx";

export abstract class InvestmentTrxRepository {
  abstract findMany(): Promise<InvestmentTrx[]>;
  abstract findById(id: string): Promise<InvestmentTrx | null>;
  abstract findByUserId(userId: string): Promise<InvestmentTrx[]>;
  abstract create(data: CreateInvestmentTrxDto): Promise<InvestmentTrx>;
  abstract update(data: UpdateInvestmentTrxDto): Promise<InvestmentTrx>;
  abstract delete(id: string): Promise<InvestmentTrx>;
  abstract getTotalDetails(investmentId: string): Promise<TotalDetailsReponse>;
}
