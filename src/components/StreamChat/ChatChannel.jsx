import {
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import { EmojiPicker } from "stream-chat-react/emojis";

import { init, SearchIndex } from "emoji-mart";
import data from "@emoji-mart/data";

const ChatChannel = ({ show }) => {
  return (
    <div className={`w-full h-full ${show ? "block" : "hidden"}`}>
      <Channel EmojiPicker={EmojiPicker} emojiSearchIndex={SearchIndex}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </div>
  );
};

export default ChatChannel;
