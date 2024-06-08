import { Variant } from '@/types/theme/config';
import { StateCreator } from 'zustand';

export interface IAppSlice {
  theme: Variant;
  setTheme: (theme: Variant) => void;
}

export const createAppSlice: StateCreator<IAppSlice> = (set) => ({
  theme: 'default',
  setTheme: (theme) => set({ theme }),
});
