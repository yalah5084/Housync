
import React from 'react';
import { Button } from '@/components/ui/button';
import { Lock, Unlock } from 'lucide-react';

interface LockedChatViewProps {
  handleUnlock: () => void;
  canUnlock: boolean;
  hasFilledPreferences: boolean;
  otherUserHasFilledPreferences: boolean;
  userType: 'renter' | 'landlord';
}

const LockedChatView = ({ 
  handleUnlock, 
  canUnlock, 
  hasFilledPreferences, 
  otherUserHasFilledPreferences,
  userType 
}: LockedChatViewProps) => {
  return (
    <div className="p-6 h-80 flex flex-col items-center justify-center">
      <div className="bg-gray-50 p-6 rounded-lg text-center max-w-xs">
        <div className="mx-auto w-12 h-12 rounded-full bg-match-primary/10 flex items-center justify-center mb-4">
          <Lock className="h-6 w-6 text-match-primary" />
        </div>
        <h4 className="font-semibold text-lg mb-2">Chat is Locked</h4>
        <p className="text-gray-500 mb-4">
          {!hasFilledPreferences ? (
            userType === 'renter' ? 
              "Please fill your preferences in your profile to unlock this chat and earn 5 tokens." : 
              "Please complete your property description and preferences to unlock this chat and earn 5 tokens."
          ) : !otherUserHasFilledPreferences ? (
            "The other user hasn't completed their profile yet. Chat will be available when they do."
          ) : (
            "Unlock this chat to start a conversation and earn tokens."
          )}
        </p>
        <Button 
          onClick={handleUnlock}
          className="bg-match-primary hover:bg-match-primary/90 w-full gap-2"
          disabled={!canUnlock}
        >
          <Unlock className="h-4 w-4" />
          {canUnlock ? "Unlock Chat & Earn 5 Tokens" : "Cannot Unlock Yet"}
        </Button>
      </div>
    </div>
  );
};

export default LockedChatView;
