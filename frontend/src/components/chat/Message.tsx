import React from "react";

interface Message {
    text: string;
    isUser: boolean;
    isTyping?: boolean;
    id?: number;
  }
  export type {Message};

interface MessageProps {
  text: string;
  isUser: boolean;
  isTyping?: boolean;
  id?: number;
  onEndTyping: (id: number) => void;
}

//const Message: React.FC<MessageProps> = ({ text, isUser, isTyping, id, onEndTyping }) => (
const MessageContents: React.FC<MessageProps> = ({ text, isUser, isTyping, id, onEndTyping }) => (
  <div className={isUser ? "user-message" : "ai-message"}>
    {isTyping ? (
      <p>
        <b>TITI(상담사)</b>: {text}
      </p>
    ) : (
      <p>
        <b>{isUser ? "사용자" : "TITI(상담사)"}</b>: {text}
      </p>
    )}
  </div>
);

export default MessageContents;