import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@shared/api/query-client';

import { addComment } from './api';
import { commentQueryKeys } from './consts';
import { AddCommentDto } from './dto';

export const useAddCommentMutation = () => {
  return useMutation({
    mutationKey: [commentQueryKeys.addComment],
    mutationFn: (data: AddCommentDto) => {
      return addComment(data);
    },
    onSuccess: (_, form) => {
      queryClient.invalidateQueries({ queryKey: [commentQueryKeys.commentsList, form.postId] });
    },
  });
};
