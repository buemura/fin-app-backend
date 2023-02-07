import { Account } from "@prisma/client";

export interface AccountProps extends Account {}

export interface CreateAccountProps {
  userId: string;
  name: string;
  balance?: number;
  icon?: string;
}

export interface UpdateAccountProps {
  name?: string;
  balance?: number;
  icon?: string;
}
