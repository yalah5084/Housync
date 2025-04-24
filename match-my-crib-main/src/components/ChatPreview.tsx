
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { MessageCircle, Lock, Send, Unlock } from 'lucide-react';

interface ChatPreviewProps {
  propertyId?: string;
  profileId?: string;
  name: string;
  avatarUrl?: string;
  isUnlocked?: boolean;
}

const ChatPreview = ({
  propertyId,
  profileId,
  name,
  avatarUrl,
  isUnlocked = false,
}: ChatPreviewProps) => {
  const [message, setMessage] = useState('');
  const [unlocked, setUnlocked] = useState(isUnlocked);
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    console.log('Sending message:', message);
    setMessage('');
  };
  
  const handleUnlock = () => {
    setUnlocked(true);
  };

  return (
    <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden bg-white">
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
      </div>
      
      {unlocked ? (
        <div className="p-4 h-80 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg rounded-tl-none p-3 max-w-[80%]">
                <p className="text-sm">Hi there! I'm interested in learning more about this property.</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-match-primary/10 text-match-dark rounded-lg rounded-tr-none p-3 max-w-[80%]">
                <p className="text-sm">Hello! I'd be happy to answer any questions you have about it.</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg rounded-tl-none p-3 max-w-[80%]">
                <p className="text-sm">Is the property available for a viewing this weekend?</p>
              </div>
            </div>
          </div>
          
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
            />
            <Button 
              onClick={handleSendMessage}
              className="bg-match-primary hover:bg-match-primary/90"
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-6 h-80 flex flex-col items-center justify-center">
          <div className="bg-gray-50 p-6 rounded-lg text-center max-w-xs">
            <div className="mx-auto w-12 h-12 rounded-full bg-match-primary/10 flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-match-primary" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Chat is Locked</h4>
            <p className="text-gray-500 mb-4">
              Unlock this chat to start a conversation and schedule a viewing.
            </p>
            <Button 
              onClick={handleUnlock}
              className="bg-match-primary hover:bg-match-primary/90 w-full gap-2"
            >
              <Unlock className="h-4 w-4" />
              Unlock Chat
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPreview;
