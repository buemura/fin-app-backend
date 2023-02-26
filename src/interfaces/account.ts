import { type Account } from "@prisma/client";
import {
  PaginationMetadataProps,
  PaginationMetadataResponse,
} from "./pagination";

export interface AccountProps extends Account {}

export interface GetAccountsByIdProps {
  id: string;
}

export interface GetAccountsByUserIdProps {
  pagination: PaginationMetadataProps;
  userId: string;
}

export interface GetAccountsByUserIdResponse {
  metadata: PaginationMetadataResponse;
  data: {
    accounts: AccountProps[];
    totalBalance: number;
    metricsData: Array<{
      name: string;
      balance: number;
    }>;
  };
}

export interface CreateAccountProps {
  userId: string;
  name: string;
  balance: number;
  icon?: string;
}

export interface UpdateAccountProps {
  id: string;
  name?: string;
  balance?: number;
  icon?: string;
}

export interface DeleteAccountProps {
  id: string;
}
