import { Investment } from "@prisma/client";
import {
  PaginationMetadataProps,
  PaginationMetadataResponse,
} from "./pagination";

export interface InvestmentProps extends Investment {}

export interface CreateInvestmentProps {
  userId: string;
  accountId: string;
  category: string;
  ticker: string;
  type: string | null;
}

export interface UpdateInvestmentProps {
  id: string;
  accountId?: string;
  category?: string;
  ticker?: string;
  type?: string | null;
  pricePerQuantity?: number;
  totalQuantity?: number;
  totalPaidPrice?: number;
  totalPrice?: number;
  allocation?: number;
}

export interface DeleteInvestmentProps {
  id: string;
}

export interface FindInvestmentsByUserIdProps {
  pagination: PaginationMetadataProps;
  userId: string;
}

export interface FindInvestmentsByUserIdResponse {
  metadata: PaginationMetadataResponse;
  data: InvestmentProps[];
}
