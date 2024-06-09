import { StateCreator } from 'zustand';

export interface IAppSlice {
  completedOnboarding: boolean;
  setCompletedOnboarding: (completedOnboarding: boolean) => void;
}

export const createAppSlice: StateCreator<IAppSlice> = (set) => ({
  completedOnboarding: false,
  setCompletedOnboarding: (completedOnboarding) => set({ completedOnboarding }),
});
