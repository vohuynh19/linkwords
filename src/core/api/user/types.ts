import { Prisma } from '@prisma/client';

export interface IUser extends Prisma.UserCreateInput {
  id: string;
}

export interface IUserCreateInput extends Prisma.UserCreateInput {}
