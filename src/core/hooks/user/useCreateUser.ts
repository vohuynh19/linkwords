import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IUser, IUserCreateInput } from '@/core/api';

import { useUserApi } from './useUserApi';
import { useUserApiKey } from './useUserApiKey';

export const useCreateUser = () => {
  const userApi = useUserApi();
  const userApiKey = useUserApiKey();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: userApiKey.createUserKey(),
    mutationFn: (user: IUserCreateInput & { currentUserId?: number }) => {
      const createUser = { ...user };
      delete createUser.currentUserId;
      return userApi.createUser(createUser);
    },
    onMutate: async (
      newUser: IUserCreateInput & { currentUserId?: number },
    ) => {
      const userId = newUser.currentUserId || 0;

      const queryKey = userApiKey.getUserKey(userId);
      await queryClient.cancelQueries({
        queryKey,
      });

      const previousUser: IUser | undefined =
        queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, newUser);
      return { previousUser, newUser };
    },
    onError: (err, newUser, context) => {
      if (context) {
        queryClient.setQueryData(
          userApiKey.getUserKey(context.newUser.currentUserId || 0),
          context.previousUser,
        );
      }
    },
    onSettled: async (newUser) => {
      const queryKey = userApiKey.getUserKey(newUser?.id || 0);
      await queryClient.invalidateQueries({
        queryKey,
      });
    },
  });
};
