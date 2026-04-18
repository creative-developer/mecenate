import { toNullableString, toSafeNumber, toSafeString } from '@shared/helpers';

import { AuthorModel } from '../types';
import { AuthorRaw } from './types';

export const mapAuthor = (raw: AuthorRaw | null | undefined): AuthorModel | null => {
  if (!raw) {
    return null;
  }

  return {
    id: toSafeString(raw.id),
    username: toSafeString(raw.username),
    displayName: toSafeString(raw.displayName),
    avatarUrl: toNullableString(raw.avatarUrl),
    bio: toNullableString(raw.bio),
    subscribersCount: toSafeNumber(raw.subscribersCount),
    isVerified: Boolean(raw.isVerified),
  };
};
