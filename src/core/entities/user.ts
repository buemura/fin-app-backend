export class User {
  id: string;
  name: string;
  email: string;
  password: string | null;
  isExternal: boolean;
  externalId: string | null;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}
