import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postsApi } from './api';
import { postQueryKeys } from './consts';
import { TogglePostLikeDto } from './dto';
import { mapLikeModel } from './mapper';

export function useTogglePostLikeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: TogglePostLikeDto) => {
      const response = await postsApi.togglePostLike(params);

      return mapLikeModel(response);
    },
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: postQueryKeys.listRoot,
        }),
        queryClient.invalidateQueries({
          queryKey: postQueryKeys.infiniteListRoot,
        }),
        queryClient.invalidateQueries({
          queryKey: postQueryKeys.detail(variables.id),
        }),
      ]);
    },
  });
}
