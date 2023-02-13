import { type User } from "@prisma/client";

export interface UserProps extends User {}

export interface CreateUserProps {
  name: string;
  email: string;
  password?: string;
  externalId?: string;
  isExternal: boolean;
  imageUrl?: string;
}

export interface UpdateUserProps {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}
