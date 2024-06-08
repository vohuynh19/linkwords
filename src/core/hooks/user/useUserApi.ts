import { userApi } from '@/core/di';
import { useMemo } from 'react';

export const useUserApi = () => {
  return useMemo(() => userApi, []);
};
