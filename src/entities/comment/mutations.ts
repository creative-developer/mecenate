import { useMutation, useQueryClient } from '@tanstack/react-query';

import { commentsApi } from './api';
import { commentQueryKeys } from './consts';
import { AddCommentDto } from './dto';
import { mapCommentCreatedModel } from './mapper';

export function useAddCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: AddCommentDto) => {
      const response = await commentsApi.addComment(params);

      return mapCommentCreatedModel(response);
    },
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: commentQueryKeys.listRoot(variables.id),
        }),
        queryClient.invalidateQueries({
          queryKey: commentQueryKeys.infiniteListRoot(variables.id),
        }),
      ]);
    },
  });
}
