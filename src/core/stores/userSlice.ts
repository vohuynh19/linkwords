import { StateCreator } from 'zustand';
import { IUser } from '../api';

export interface IUserSlice {
  user: IUser;
  setUser: (user: IUser) => void;
  resetUser: () => void;
}

export const createUserSlice: StateCreator<IUserSlice> = (set) => ({
  user: {
    id: 0,
    username: '',
  },
  setUser: (user: IUser) => set({ user }),
  resetUser: () =>
    set({
      user: {
        id: 0,
        username: '',
      },
    }),
});
