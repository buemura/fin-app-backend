export interface CreateAccountDto {
  userId: string;
  name: string;
  balance?: number;
  icon?: string;
}

export interface UpdateAccountDto {
  accountId: string;
  name?: string;
  balance?: number;
  icon?: string;
}
