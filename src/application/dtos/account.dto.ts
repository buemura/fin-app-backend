export interface CreateAccountDto {
  userId: string;
  name: string;
  balance?: number;
  icon?: string;
}

export interface UpdateAccountDto {
  name?: string;
  balance?: number;
  icon?: string;
}
