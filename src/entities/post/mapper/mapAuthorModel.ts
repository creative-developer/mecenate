import { AuthorDto } from '../dto';
import { AuthorModel } from '../types';

export const mapAuthorModel = (dto: AuthorDto): AuthorModel => ({
  id: dto.id,
  username: dto.username,
  displayName: dto.displayName,
  avatarUrl: dto.avatarUrl,
  bio: dto.bio,
  subscribersCount: dto.subscribersCount,
  isVerified: dto.isVerified,
});
