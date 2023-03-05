export class CreateUserDto {
  name: string;
  email: string;
  password?: string;
  externalId?: string;
  isExternal: boolean;
  imageUrl?: string;
}

export class UpdateUserDto {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}

export class UpdateUserPasswordDto {
  id: string;
  email?: string;
  password?: string;
}
