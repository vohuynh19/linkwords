import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IUser, IUserUpdateInput } from '@/core/api';

import { useUserApi } from './useUserApi';
import { useUserApiKey } from './useUserApiKey';

export const useUpdateUser = () => {
  const userApi = useUserApi();
  const userApiKey = useUserApiKey();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: userApiKey.updateUser(),
    mutationFn: (user: IUserUpdateInput & { id: number }) => {
      return userApi.updateUser(user.id, user);
    },
    onMutate: async (newUser: IUserUpdateInput & { id: number }) => {
      const queryKey = userApiKey.getUserKey(newUser.id);

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
          userApiKey.getUserKey(context.newUser.id),
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
