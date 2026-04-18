import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@shared/api/query-client';

import { togglePostLike } from './api';
import { postQueryKeys } from './consts';
import { TogglePostLikeDto } from './dto';

export const useTogglePostLikeMutation = () => {
  return useMutation({
    mutationKey: [postQueryKeys.togglePostLike],
    mutationFn: (data: TogglePostLikeDto) => {
      return togglePostLike(data);
    },
    onSuccess: (_, form) => {
      queryClient.invalidateQueries({ queryKey: [postQueryKeys.postsFeed] });
      queryClient.invalidateQueries({ queryKey: [postQueryKeys.postById, form.postId] });
    },
  });
};
