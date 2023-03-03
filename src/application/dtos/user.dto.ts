export interface CreateUserDto {
  name: string;
  email: string;
  password?: string;
  externalId?: string;
  isExternal: boolean;
  imageUrl?: string;
}

export interface UpdateUserDto {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}

export interface UpdateUserPasswordDto {
  id: string;
  email?: string;
  password?: string;
}
