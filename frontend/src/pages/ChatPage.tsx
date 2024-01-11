import '../styles/ChatPage.css';
import React, { useState } from "react";
import { Message } from "../components/chat/Message";
import MessageList from "../components/chat/MessageList";
import MessageForm from "../components/chat/MessageForm";


const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const handleSendMessage = async (message: string) => {
    // User
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isUser: true },
    ]);
    await delay(1000);
    
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: "티티 응답입력중..", isUser: false, isTyping: true, id: Date.now() },
    ]);

  
    await delay(2000);

    setMessages((prevMessages) => [
      ...prevMessages.slice(0, -1),
      { text: `${message}`, isUser: false, isTyping: false, id: Date.now() },
    ]);
  };

  const handleEndTyping = (id: number) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, isTyping: false } : msg
      )
    );
  };

  return (
    <div className="app">
      <div className="chat-box">
        <h1>Chat App</h1>
        <MessageList messages={messages} onEndTyping={handleEndTyping} />
        <MessageForm onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatPage;
