import { useFeed } from '@/lib/hooks/useFeed';
import { FeedViewPost } from '@/lib/types';

interface FeedPostsProps {
  feedUri: string;
}

export function FeedPosts({ feedUri }: FeedPostsProps) {
  const { posts, isLoading, error, hasMore, loadMore } = useFeed(feedUri);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.post.uri} className="border-2 border-[#000] shadow-[4px_4px_0_#000] p-4">
          <div className="flex items-center gap-2 mb-2">
            {post.post.author.avatar && (
              <img
                src={post.post.author.avatar}
                alt={post.post.author.displayName || post.post.author.handle}
                className="w-8 h-8 rounded-full border-2 border-[#000]"
              />
            )}
            <div>
              <div className="font-bold">{post.post.author.displayName}</div>
              <div className="text-sm">@{post.post.author.handle}</div>
            </div>
          </div>
          <p className="mb-2">{post.post.record.text}</p>
          <div className="text-sm text-gray-500 flex gap-4">
            <span>🗣 {post.post.replyCount}</span>
            <span>🔁 {post.post.repostCount}</span>
            <span>❤️ {post.post.likeCount}</span>
          </div>
        </div>
      ))}
      
      {hasMore && (
        <button
          onClick={loadMore}
          disabled={isLoading}
          className="w-full p-2 border-2 border-[#000] shadow-[4px_4px_0_#000] hover:shadow-[2px_2px_0_#000] active:shadow-none transition-all"
        >
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
} 