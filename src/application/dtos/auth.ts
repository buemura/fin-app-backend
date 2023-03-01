export interface RegisterAuthDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginAuthDto {
  email: string;
  password: string;
}
