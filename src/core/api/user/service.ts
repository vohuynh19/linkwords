import { KyInstance } from 'ky';
import { IUser, IUserCreateInput } from './types';

export class UserService {
  private baseUrl: string;

  constructor(private ky: KyInstance) {
    this.baseUrl = '/api/user';
  }

  async getUser(id: string): Promise<IUser> {
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
}
