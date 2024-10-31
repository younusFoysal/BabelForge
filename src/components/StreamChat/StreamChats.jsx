'use client';

import { createToken } from '@/actions/Chataction';
import React, { useCallback, useEffect, useState } from 'react';
import { useCreateChatClient, Chat } from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';

import StreamSidebar from './StreamSidebar';
import ChatChannel from './ChatChannel';
import HomeLoadingSpinner from '../shared/HomeLoadingSpinner/HomeLoadingSpinner';
import { Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useWindowSize } from '@/hooks/useWindoSize';
import { mdBreakPoint } from '@/lib/tailwind';
import usePlan from '@/hooks/usePlan';
import { redirect } from 'next/navigation';

const StreamChats = ({ userData }) => {
  const [Chatsidebaropen, setChatsidebaropen] = useState(false);
  const { resolvedTheme } = useTheme();
  const windowSize = useWindowSize();
  const largeScreen = windowSize.width >= mdBreakPoint;

  const [plan] = usePlan();
  if (plan === 'Basic') redirect('/dashboard');

  useEffect(() => {
    if (windowSize.width >= mdBreakPoint) return setChatsidebaropen(false);
  }, [windowSize.width]);

  const handleClose = useCallback(() => {
    setChatsidebaropen(false);
  }, []);

  const TokenProvider = useCallback(async () => {
    return await createToken(userData.id);
  }, [userData.id]);

  const client = useCreateChatClient({
    tokenOrProvider: TokenProvider,
    userData,
    apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY,
  });

  if (!client)
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <HomeLoadingSpinner />
      </div>
    );

  return (
    <div className="max-w-full h-screen flex items-center mx-auto">
      <div className="h-[calc(100%-7rem)] md:mt-16 mx-6 md:mx-12 dark:bg-[#181024] md:overflow-hidden md:shadow-2xl w-full rounded-2xl md:border">
        <Chat client={client} theme={cn(resolvedTheme === 'dark' ? 'str-chat__theme-dark' : 'str-chat__theme-light')}>
          <div className="md:hidden rounded-tl-2xl rounded-tr-2xl pt-4 py-3 border-b border-b-[#DBDDE1] p-3 bg-white dark:bg-[#181024] dark:border-b-[#202327]">
            <button onClick={() => setChatsidebaropen(!Chatsidebaropen)}>
              {!Chatsidebaropen ? (
                <Menu size={25} className="text-black dark:text-white" />
              ) : (
                <X size={25} className="text-black dark:text-white" />
              )}
            </button>
          </div>
          <div className="flex py-4 h-full flex-row">
            <StreamSidebar userData={userData} show={largeScreen || Chatsidebaropen} onClose={handleClose} />
            <ChatChannel show={largeScreen || !Chatsidebaropen} showThread={!largeScreen} />
          </div>
        </Chat>
      </div>
    </div>
  );
};

export default StreamChats;
