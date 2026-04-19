import { useCallback } from 'react';

import type { PostModel } from '@entities/post';

import { useOpenPostComments } from '../model/useOpenPostComments';
import { PostActionButton } from './PostActionButton';

export type PostCommentButtonProps = {
  post: PostModel;
};

export function PostCommentButton({ post }: PostCommentButtonProps) {
  const { openPostComments } = useOpenPostComments();

  const handlePress = useCallback(() => {
    openPostComments(post);
  }, [post, openPostComments]);

  return <PostActionButton type="comment" count={post.commentsCount} onPress={handlePress} />;
}
