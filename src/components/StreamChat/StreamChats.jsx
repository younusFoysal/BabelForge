"use client";

import { createToken } from "@/actions/Chataction";
import React, { useCallback, useEffect, useState } from "react";
import { useCreateChatClient, Chat } from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

import StreamSidebar from "./StreamSidebar";

import ChatChannel from "./ChatChannel";
import HomeLoadingSpinner from "../shared/HomeLoadingSpinner/HomeLoadingSpinner";
import { Menu, X } from "lucide-react";

const StreamChats = ({ userData }) => {
  const [Chatsidebaropen, setChatsidebaropen] = useState(false);
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
    <div className="h-screen">
      <Chat client={client}>
        <div className="md:hidden border-b border-b-[#DBDDE1] P-3 bg-white">
          <button onClick={() => setChatsidebaropen(!Chatsidebaropen)}>
            {!Chatsidebaropen ? (
              <Menu size={20} className="text-black" />
            ) : (
              <X size={20} className="text-black" />
            )}
          </button>
        </div>
        <div className="flex flex-row h-full">
          <StreamSidebar userData={userData} show={Chatsidebaropen} />
          <ChatChannel show={!Chatsidebaropen} />
        </div>
      </Chat>
    </div>
  );
};

export default StreamChats;
