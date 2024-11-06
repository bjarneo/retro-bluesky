export interface BlueskyCreator {
  did: string;
  handle: string;
  displayName: string;
  avatar: string;
  description: string;
  createdAt: string;
  indexedAt: string;
}

export interface BlueskyFeedData {
  uri: string;
  cid: string;
  did: string;
  creator: BlueskyCreator;
  displayName: string;
  description: string;
  avatar: string;
  likeCount: number;
  indexedAt: string;
  isOnline: boolean;
  isValid: boolean;
}

export interface PostRecord {
  text: string;
  createdAt: string;
  // Add other post fields as needed
}

export interface PostAuthor {
  did: string;
  handle: string;
  displayName?: string;
  avatar?: string;
}

export interface FeedViewPost {
  post: {
    uri: string;
    cid: string;
    author: PostAuthor;
    record: PostRecord;
    indexedAt: string;
    likeCount: number;
    repostCount: number;
    replyCount: number;
  };
  reply?: {
    parent: FeedViewPost;
    root: FeedViewPost;
  };
  reason?: {
    by: PostAuthor;
    indexedAt: string;
  };
}

export interface FeedResponse {
  cursor?: string;
  feed: FeedViewPost[];
}
