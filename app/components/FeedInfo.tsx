import Image from 'next/image';
import { BlueskyCreator } from '@/lib/types';

interface FeedInfoProps {
    creator: BlueskyCreator;
    displayName: string;
    description: string;
    avatar: string;
    likeCount: number;
    isOnline: boolean;
}

const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
};

export function FeedInfo({
    creator,
    displayName,
    description,
    avatar,
    likeCount,
    isOnline,
}: FeedInfoProps) {
    return (
        <div className={`p-4 border-2 border-[#000] shadow-[4px_4px_0_#000] mb-4`}>
            <div className="flex items-center gap-4">
                {avatar && (
                    <Image
                        src={avatar}
                        alt={displayName}
                        width={48}
                        height={48}
                        className="rounded-full border-2 border-[#000]"
                    />
                )}
                <div>
                    <h2 className="retro-font text-lg font-bold">{displayName}</h2>
                    <div className="flex items-center gap-2">
                        <p className="retro-font text-sm">@{creator.handle}</p>
                        {isOnline && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
                    </div>
                </div>
            </div>
            <p className="retro-font mt-2">{description}</p>
            <div className="retro-font mt-2 text-sm flex items-center justify-between">
                <span>Likes: {likeCount}</span>
                <span className="text-xs">Created: {formatDate(new Date(creator.createdAt))}</span>
            </div>
        </div>
    );
}
