
import React from 'react';

interface ChatMessageProps {
  id: string;
  content: string;
  is_mine: boolean;
}

const ChatMessage = ({ id, content, is_mine }: ChatMessageProps) => {
  return (
    <div key={id} className={`flex justify-${is_mine ? 'end' : 'start'}`}>
      <div className={`${is_mine ? 'bg-match-primary/10 text-match-dark' : 'bg-gray-100'} rounded-lg rounded-${is_mine ? 'tr' : 'tl'}-none p-3 max-w-[80%]`}>
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
