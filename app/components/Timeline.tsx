'use client'
import React, { useState  } from 'react'
import { User, Moon, Sun } from 'lucide-react'
import { FeedInfo } from '@/app/components/FeedInfo';
import { BlueskyFeedData } from '@/lib/types';
import BlueskyLogo from './BlueskyLogo'


export default function Timeline({ data, feed }: { data: BlueskyFeedData, feed: any[] }) {

  const { creator, displayName, description, avatar, likeCount, isOnline } = data;
    
  const [darkMode, setDarkMode] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const toggleProfile = () => {
    setShowProfile(!showProfile)
  }

  return (
    <div className={`flex flex-col justify-center items-center min-h-screen ${darkMode ? 'bg-[#000033]' : 'bg-[#0055aa]'} p-4`}>
      {/* Logo Section */}
      <div className="mb-8">
        <BlueskyLogo className="w-20 h-20 [&>path]:fill-white" />
      </div>

      <div className={`w-full max-w-md ${darkMode ? 'bg-[#000066] text-[#ffffff]' : 'bg-[#fff]'} border-4 border-[#000] shadow-[8px_8px_0_#000]`}>
        <div className={`${darkMode ? 'bg-[#000033]' : 'bg-[#0055aa]'} text-white p-2 font-bold border-b-4 border-[#000] flex justify-between items-center`}>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-white border-2 border-[#000] mr-2"></div>
            <span className="retro-font">Retro Bluesky</span>
          </div>
          <div className="flex">
            <button onClick={toggleProfile} className="mr-2">
              <User size={16} />
            </button>
            <button onClick={toggleDarkMode}>
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
        {showProfile && (
          <div className={`p-4 ${darkMode ? 'bg-[#000066] text-[#ffffff]' : 'bg-[#dedede]'} border-b-4 border-[#000]`}>
            <h2 className="retro-font text-lg mb-2">Creator of this page</h2>
            <p className="retro-font">
              <a href="https://dothash.win" 
                 className="hover:underline" 
                 target="_blank" 
                 rel="noopener noreferrer">
                Display Name: dothash
              </a>
            </p>
            <p className="retro-font">Handle: @dothash.win</p>
          </div>
        )}
        <div className="p-4">
            <FeedInfo
            creator={creator}
            displayName={displayName}
            description={description}
            avatar={avatar}
            likeCount={likeCount}
            isOnline={isOnline}
          />
          
          {feed.map((post) => (
        <div key={post.post.uri} className="border-2 border-[#000] shadow-[4px_4px_0_#000] p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div>
              <div className="font-bold">{post.post.author.displayName}</div>
              <div className="text-sm">
                <a 
                  href={`https://bsky.app/profile/${post.post.author.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  @{post.post.author.handle}
                </a>
              </div>
            </div>
          </div>
          <p className="mb-2 break-words whitespace-pre-wrap">
            {post.post.record.text}
          </p>
        </div>
      ))}
      </div>
      </div>
      <style jsx global>{`
        @font-face {
          font-family: 'RetroTopaz';
          src: url('https://fonts.cdnfonts.com/s/66846/Topaz_a500.woff') format('woff');
        }
        .retro-font {
          font-family: 'RetroTopaz', monospace;
          font-smooth: never;
          -webkit-font-smoothing: none;
        }
      `}</style>
    </div>
  )
}