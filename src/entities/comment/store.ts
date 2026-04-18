import { makeAutoObservable } from 'mobx';

class CommentsStore {
  activePostId: string | null = null;
  draftsByPostId = new Map<string, string>();

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setActivePostId(postId: string | null) {
    this.activePostId = postId;
  }

  setDraft(postId: string, text: string) {
    this.draftsByPostId.set(postId, text);
  }

  clearDraft(postId: string) {
    this.draftsByPostId.delete(postId);
  }

  getDraft(postId: string) {
    return this.draftsByPostId.get(postId) ?? '';
  }
}

export const commentsStore = new CommentsStore();
