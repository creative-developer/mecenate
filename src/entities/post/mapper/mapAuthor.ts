import { toSafeNumber } from '@shared/helpers';

import { AuthorModel } from '../types';
import { AuthorRaw } from './types';

export const mapAuthor = (raw: AuthorRaw | null | undefined): AuthorModel | null => {
  if (!raw) {
    return null;
  }

  return {
    id: raw.id ?? null,
    username: raw.username ?? null,
    displayName: raw.displayName ?? null,
    avatarUrl: raw.avatarUrl ?? null,
    bio: raw.bio ?? null,
    subscribersCount: toSafeNumber(raw.subscribersCount) ?? null,
    isVerified: raw.isVerified ?? null,
  };
};
