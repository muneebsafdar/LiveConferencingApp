'use client';

import { useEffect, useState } from 'react';
import {
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-sdk';
import { useUser, useAuth } from '@clerk/nextjs';
import { ReactNode } from 'react';
import { TokenProvider } from '@/actions/stream.actions';
import Loader from '@/app/(root)/_components/Loader';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;


export const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
 
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const {user,isLoaded} = useUser();

  useEffect(()=>{

    if(!apiKey) return 
    if (!user || !isLoaded) return;

    const client= new StreamVideoClient({
      apiKey,
      user: {
        id: user.id,
        name: user?.firstName || user?.username || user?.id || "Anonymous User",
        image: user?.imageUrl,
      },
      tokenProvider:TokenProvider
    })

    setVideoClient(client)
  },[user,isLoaded])

  if (!videoClient) {
    return "";
  }
  return (
    <StreamVideo client={videoClient}>
      {children}
    </StreamVideo>
  )
};
