import { useCallback } from 'react';

import type { PostModel } from '@entities/post';

export const useSendPostDonate = () => {
  const sendPostDonate = useCallback((_post: PostModel) => {
    // TODO: флоу отправки доната подключается позже
  }, []);

  return { sendPostDonate };
};
