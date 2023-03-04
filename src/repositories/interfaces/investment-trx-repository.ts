import {
  CreateInvestmentTrxProps,
  GetTotalDetailsReponse,
  InvestmentTrxProps,
  UpdateInvestmentTrxProps,
} from "../../interfaces/investment-trx";

export abstract class InvestmentTrxRepository {
  abstract findMany(): Promise<InvestmentTrxProps[]>;
  abstract findById(id: string): Promise<InvestmentTrxProps | null>;
  abstract findByUserId(userId: string): Promise<InvestmentTrxProps[]>;
  abstract create(data: CreateInvestmentTrxProps): Promise<InvestmentTrxProps>;
  abstract update(
    data: UpdateInvestmentTrxProps
  ): Promise<InvestmentTrxProps | null>;
  abstract delete(id: string): Promise<InvestmentTrxProps | null>;
  abstract getTotalDetails(
    investmentId: string
  ): Promise<GetTotalDetailsReponse>;
}
