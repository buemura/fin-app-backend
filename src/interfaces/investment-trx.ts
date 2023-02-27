import { InvestmentTransaction } from "@prisma/client";
import {
  PaginationMetadataProps,
  PaginationMetadataResponse,
} from "./pagination";

export interface InvestmentTrxProps extends InvestmentTransaction {}

export interface CreateInvestmentTrxProps {
  userId: string;
  investmentId: string;
  pricePerQuantity: number;
  quantity: number;
}

export interface UpdateInvestmentTrxProps {
  id: string;
  investmentId?: string;
  pricePerQuantity?: number;
  quantity?: number;
}

export interface DeleteInvestmentTrxProps {
  id: string;
}

export interface FindInvestmentsTrxByUserIdProps {
  pagination: PaginationMetadataProps;
  userId: string;
}

export interface FindInvestmentsTrxByUserIdResponse {
  metadata: PaginationMetadataResponse;
  data: InvestmentTrxProps[];
}

export interface GetTotalDetailsReponse {
  totalPaidPrice: number;
  totalQuantity: number;
}
