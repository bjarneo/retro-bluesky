import { BskyAgent } from '@atproto/api';
import { BlueskyFeedData, FeedResponse } from './types';

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

class BlueskyClient {
  private static instance: BlueskyClient;
  private agent: BskyAgent | null = null;
  private cache: Map<string, CacheItem<any>> = new Map();
  private readonly CACHE_DURATION = 10000; // 10 seconds

  private constructor() {}

  static getInstance(): BlueskyClient {
    if (!BlueskyClient.instance) {
      BlueskyClient.instance = new BlueskyClient();
    }
    return BlueskyClient.instance;
  }

  private async getAgent(): Promise<BskyAgent> {
    if (!this.agent) {
      this.agent = new BskyAgent({
        service: 'https://bsky.social'
      });
      
      try {
        await this.agent.login({
          identifier: process.env.BLUESKY_USERNAME!,
          password: process.env.BLUESKY_PASSWORD!
        });
      } catch (error) {
        console.error('Failed to login to Bluesky:', error);
        throw new Error('Authentication failed');
      }
    }
    return this.agent;
  }

  private getCachedData<T>(key: string): T | null {
    const cached = this.cache.get(key);
    const currentTime = Date.now();

    if (cached && currentTime - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    return null;
  }

  private setCachedData<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  async getFeedData(): Promise<BlueskyFeedData> {
    const CACHE_KEY = 'feed_generator';
    const cachedData = this.getCachedData<BlueskyFeedData>(CACHE_KEY);
    
    if (cachedData) {
      return cachedData;
    }

    try {
      const agent = await this.getAgent();
      const { data } = await agent.app.bsky.feed.getFeedGenerator({
        feed: "at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/whats-hot",
      });

      const feedData = data.view as BlueskyFeedData;
      this.setCachedData(CACHE_KEY, feedData);
      
      return feedData;
    } catch (error) {
      console.error('Failed to fetch feed data:', error);
      throw new Error('Failed to fetch feed data');
    }
  }

  async getFeedPosts(feedUri: string): Promise<FeedResponse> {
    const CACHE_KEY = `feed_posts_${feedUri}`;
    const cachedData = this.getCachedData<FeedResponse>(CACHE_KEY);
    
    if (cachedData) {
      return cachedData;
    }

    try {
      const agent = await this.getAgent();
      const { data } = await agent.app.bsky.feed.getFeed({
        feed: feedUri,
        limit: 15
      });

      const response: FeedResponse = {
        cursor: data.cursor,
        feed: data.feed
      };

      this.setCachedData(CACHE_KEY, response);
      
      return response;
    } catch (error) {
      console.error('Failed to fetch feed posts:', error);
      throw new Error('Failed to fetch feed posts');
    }
  }

  clearCache(): void {
    this.cache.clear();
  }
}

// Export singleton instance methods
const blueskyClient = BlueskyClient.getInstance();

export const getFeedData = () => blueskyClient.getFeedData();
export const getFeedPosts = (feedUri: string) => blueskyClient.getFeedPosts(feedUri);
export const clearCache = () => blueskyClient.clearCache();