import { useMutation } from '@tanstack/react-query';
import { IUserCreateInput } from '@/core/api';

import { useUserApi } from './useUserApi';
import { useUserApiKey } from './useUserApiKey';

export const useCreateUser = () => {
  const userApi = useUserApi();
  const userApiKey = useUserApiKey();

  return useMutation({
    mutationKey: userApiKey.createUserKey(),
    mutationFn: (user: IUserCreateInput) => userApi.createUser(user),
  });
};
