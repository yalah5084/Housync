
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: () => void;
  loading: boolean;
}

const ChatInput = ({ message, setMessage, handleSendMessage, loading }: ChatInputProps) => {
  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage();
          }
        }}
        disabled={loading}
      />
      <Button 
        onClick={handleSendMessage}
        className="bg-match-primary hover:bg-match-primary/90"
        size="icon"
        disabled={loading}
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ChatInput;
