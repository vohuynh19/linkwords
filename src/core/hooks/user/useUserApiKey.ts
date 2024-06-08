import { useMemo } from 'react';

export const useUserApiKey = () => {
  return useMemo(
    () => ({
      getUserKey: (id: string) => ['user', id],
      createUserKey: () => ['user'],
    }),
    [],
  );
};
