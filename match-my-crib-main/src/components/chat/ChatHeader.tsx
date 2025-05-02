
import React from 'react';
import { MessageCircle, Gift } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ChatHeaderProps {
  name: string;
  avatarUrl?: string;
  unlocked: boolean;
  tokens?: number;
}

const ChatHeader = ({ name, avatarUrl, unlocked, tokens = 0 }: ChatHeaderProps) => {
  return (
    <div className="border-b border-gray-200 p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="h-10 w-10 rounded-full object-cover" />
        ) : (
          <div className="h-10 w-10 rounded-full bg-match-primary/10 flex items-center justify-center">
            <MessageCircle className="h-5 w-5 text-match-primary" />
          </div>
        )}
        <h3 className="font-medium">{name}</h3>
      </div>
      
      {unlocked && (
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Gift className="h-3 w-3" />
            <span>{tokens} tokens</span>
          </Badge>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
