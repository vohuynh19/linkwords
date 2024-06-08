import { useQuery } from '@tanstack/react-query';

import { useUserApi } from './useUserApi';
import { useUserApiKey } from './useUserApiKey';

export const useGetUser = (userId: string) => {
  const userApi = useUserApi();
  const userApiKey = useUserApiKey();

  return useQuery({
    queryKey: userApiKey.getUserKey(userId),
    queryFn: () => userApi.getUser(userId),
    enabled: Boolean(userId),
  });
};
