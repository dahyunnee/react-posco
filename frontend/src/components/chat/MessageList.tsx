import React from "react";
import MessageContents from "./Message";
import type {Message} from "./Message";


interface MessageListProps {
  messages: Message[];
  onEndTyping: (id: number) => void;
}

const MessageList: React.FC<MessageListProps> = ({ messages, onEndTyping }) => (
  <div className="messages-list">
    {messages.map((message, index) => (
      <MessageContents
        key={index}
        {...message}
        onEndTyping={onEndTyping}
      />
    ))}
  </div>
);

export default MessageList;