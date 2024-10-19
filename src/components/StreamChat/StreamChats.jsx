"use client";

import { createToken } from "@/actions/Chataction";
import React, { useCallback, useEffect, useState } from "react";
import {
  useCreateChatClient,
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
  ChannelList,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

import { EmojiPicker } from "stream-chat-react/emojis";

import { init, SearchIndex } from "emoji-mart";
import data from "@emoji-mart/data";
import StreamSidebar from "./StreamSidebar";
import MenuBar from "./MenuBar";

const StreamChats = ({ userData }) => {
  const TokenProvider = useCallback(async () => {
    return await createToken(userData.id);
  }, [userData.id]);

  const client = useCreateChatClient({
    tokenOrProvider: TokenProvider,
    userData,
    apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY,
  });

  if (!client) return <div>Setting up client & connection...</div>;

  return (
    <div className="h-screen">
      <Chat client={client}>
        <div className="flex flex-row h-full">
          <div className="w-full max-w-[300px]">
            <MenuBar />
            <StreamSidebar userData={userData} />
          </div>
          <div className="w-full h-full">
            <Channel EmojiPicker={EmojiPicker} emojiSearchIndex={SearchIndex}>
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
              </Window>
              <Thread />
            </Channel>
          </div>
        </div>
      </Chat>
    </div>
  );
};

export default StreamChats;
