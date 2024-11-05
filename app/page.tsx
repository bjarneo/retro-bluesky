'use server'

import React from 'react'
import { getFeedData, getFeedPosts } from '@/lib/bluesky';
import Timeline from '@/app/components/Timeline';


export default async function Component() {
  const data = await getFeedData();
  const feedUri = "at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/whats-hot";
  const { feed } = await getFeedPosts(feedUri);

  return (
    <Timeline data={data} feed={feed} />
  )
}