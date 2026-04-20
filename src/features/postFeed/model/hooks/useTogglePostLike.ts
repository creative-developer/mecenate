import { useCallback } from 'react';

import { useTogglePostLikeMutation } from '@entities/post';

export const useTogglePostLike = () => {
  const mutation = useTogglePostLikeMutation();

  const togglePostLike = useCallback(
    (postId: string) => {
      if (mutation.isPending) {
        return;
      }

      mutation.mutate({ postId });
    },
    [mutation],
  );

  return {
    togglePostLike,
    isLoading: mutation.isPending,
  };
};
