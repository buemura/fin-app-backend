import {
  CreateInvestmentProps,
  InvestmentProps,
  UpdateInvestmentProps,
} from "@interfaces/investment";

export abstract class InvestmentRepository {
  abstract findMany(): Promise<InvestmentProps[]>;
  abstract findById(id: string): Promise<InvestmentProps | null>;
  abstract findByUserId(userId: string): Promise<InvestmentProps[]>;
  abstract create(data: CreateInvestmentProps): Promise<InvestmentProps>;
  abstract update(data: UpdateInvestmentProps): Promise<InvestmentProps | null>;
  abstract delete(id: string): Promise<InvestmentProps | null>;
}
