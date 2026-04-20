import { useCallback, useMemo, useState } from 'react';

import type { PostModel } from '@entities/post';

const COLLAPSE_THRESHOLD = 120;

export const usePostExpandable = (post: PostModel) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { collapsedText, expandedText, canExpand } = useMemo(() => {
    const collapsed = post.preview || post.body;
    const expanded = post.body || post.preview;

    return {
      collapsedText: collapsed,
      expandedText: expanded,
      canExpand: (expanded?.length ?? 0) > COLLAPSE_THRESHOLD && expanded !== collapsed,
    };
  }, [post.body, post.preview]);

  const textToRender = isExpanded || !canExpand ? expandedText : collapsedText;

  const expand = useCallback(() => {
    setIsExpanded(true);
  }, []);

  return {
    isExpanded,
    canExpand,
    textToRender,
    expand,
  };
};
