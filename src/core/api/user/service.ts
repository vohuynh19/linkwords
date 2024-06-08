import { KyInstance } from 'ky';
import { IUser, IUserCreateInput, IUserUpdateInput } from './types';

export class UserService {
  private baseUrl: string;

  constructor(private ky: KyInstance) {
    this.baseUrl = 'api/users';
  }

  async getUser(id: number): Promise<IUser> {
    return this.ky.get(`${this.baseUrl}/${id}`).json<IUser>();
  }

  async createUser(data: IUserCreateInput): Promise<IUser> {
    return this.ky
      .post(this.baseUrl, {
        json: {
          ...data,
        },
      })
      .json<IUser>();
  }

  async updateUser(id: number, data: IUserUpdateInput): Promise<IUser> {
    return this.ky
      .put(`${this.baseUrl}/${id}`, {
        json: {
          ...data,
        },
      })
      .json<IUser>();
  }
}
