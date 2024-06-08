import { StateStorage } from 'zustand/middleware';
import { mvkvInstance } from './instance';

export class LocalStorage implements StateStorage {
  constructor() {
    this.getItem = (name: string) => {
      return mvkvInstance.getString(name) || null;
    };
    this.setItem = (name: string, value: string) => {
      return mvkvInstance.set(name, value);
    };
    this.removeItem = (name: string) => {
      return mvkvInstance.delete(name);
    };
  }

  getItem: (name: string) => string | Promise<string | null> | null;

  setItem: (name: string, value: string) => unknown;

  removeItem: (name: string) => unknown;
}
