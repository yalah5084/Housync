
import React from 'react';
import ChatMessage from './ChatMessage';

interface Message {
  id: string;
  content: string;
  sender_id: string;
  is_mine: boolean;
}

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
    <div className="flex-1 overflow-y-auto space-y-4 mb-4">
      {messages.map((msg) => (
        <ChatMessage 
          key={msg.id}
          id={msg.id}
          content={msg.content}
          is_mine={msg.is_mine}
        />
      ))}
    </div>
  );
};

export default ChatMessages;
