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

  const filters = { members: { $in: [userData.id] }, type: "messaging" };
  const sort = { last_updated: -1 };
  const options = { limit: 20 };

  return (
    <div className="flex mt-40">
      <Chat client={client}>
        <ChannelList filters={filters} sort={sort} options={options} />
        <Channel>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default StreamChats;
