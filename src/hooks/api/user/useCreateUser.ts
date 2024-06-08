import { useMutation, useQueryClient } from '@tanstack/react-query';
import ky from 'ky';

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  //   return useMutation({
  //     mutationFn: () => {
  //       return ky ;
  //     },
  //     onSuccess: (result: {}) => {
  //       queryClient.invalidateQueries({
  //         queryKey: ['subscriptions', 'active-subscriptions', space?.id],
  //       });

  //       return result?.data;
  //     },
  //   });
};
