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

export interface GetUserDetailsProps {
  userId: string;
}

export interface GetUserDetailsResponse {
  data: UserProps;
}

export interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  data: UserProps;
}

export interface SignInProps {
  email: string;
  password: string;
}

export interface SignInResponse {
  data: {
    message: string;
    accessToken: string;
    user: Omit<UserProps, "password">;
  };
}
