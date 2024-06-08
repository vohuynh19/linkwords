import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { localStorageInstance } from '@/di/storage';

import { createAppSlice, IAppSlice } from './appSlice';
import { createUserSlice, IUserSlice } from './userSlice';

interface IStore extends IAppSlice, IUserSlice {}

export const useStore = create<IStore>()(
  persist(
    (set, get, api) => ({
      ...createAppSlice(set, get, api),
      ...createUserSlice(set, get, api),
    }),
    {
      name: 'app-storage',
      getStorage: () => localStorageInstance,
    },
  ),
);
