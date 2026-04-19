import { useCallback } from 'react';

import type { PostModel } from '@entities/post';

export const useOpenPostComments = () => {
  const openPostComments = useCallback((_post: PostModel) => {
    // TODO: открытие ленты комментариев поста реализуется в отдельном флоу
  }, []);

  return { openPostComments };
};
