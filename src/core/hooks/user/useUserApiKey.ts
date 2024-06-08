import { useMemo } from 'react';

export const useUserApiKey = () => {
  return useMemo(
    () => ({
      getUserKey: (id: number) => ['user', id],
      createUserKey: () => ['user'],
      updateUser: () => ['user'],
    }),
    [],
  );
};
