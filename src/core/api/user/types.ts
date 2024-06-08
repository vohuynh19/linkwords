import { Prisma } from '@prisma/client';

export interface IUser extends Prisma.UserCreateInput {
  id: number;
}

export interface IUserCreateInput extends Prisma.UserCreateInput {}

export interface IUserUpdateInput extends Prisma.UserUpdateInput {}
