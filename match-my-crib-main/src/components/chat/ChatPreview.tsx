
import React from 'react';
import { useChat } from '@/hooks/useChat';
import ChatHeader from './ChatHeader';
import LockedChatView from './LockedChatView';
import ChatMessages from './ChatMessages';
import PremiumFeatures from './PremiumFeatures';
import ChatInput from './ChatInput';

interface ChatPreviewProps {
  propertyId?: string;
  profileId?: string;
  name: string;
  avatarUrl?: string;
  isUnlocked?: boolean;
  userType?: 'renter' | 'landlord';
  hasFilledPreferences?: boolean;
  otherUserHasFilledPreferences?: boolean;
}

const ChatPreview = ({
  propertyId,
  profileId,
  name,
  avatarUrl,
  isUnlocked = false,
  userType = 'renter',
  hasFilledPreferences = false,
  otherUserHasFilledPreferences = false,
}: ChatPreviewProps) => {
  const {
    message,
    setMessage,
    unlocked,
    tokens,
    totalEarned,
    messages,
    loading,
    canUnlock,
    handleSendMessage,
    handleUnlock,
    unlockFeature
  } = useChat({
    propertyId,
    profileId,
    isUnlocked,
    userType,
    hasFilledPreferences,
    otherUserHasFilledPreferences
  });

  return (
    <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden bg-white">
      <ChatHeader 
        name={name} 
        avatarUrl={avatarUrl} 
        unlocked={unlocked} 
        tokens={tokens} 
      />
      
      {unlocked ? (
        <div className="p-4 h-80 flex flex-col">
          <ChatMessages messages={messages} />
          
          <PremiumFeatures 
            totalEarned={totalEarned} 
            unlockFeature={unlockFeature} 
          />
          
          <ChatInput 
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
            loading={loading}
          />
        </div>
      ) : (
        <LockedChatView 
          handleUnlock={handleUnlock}
          canUnlock={canUnlock}
          hasFilledPreferences={hasFilledPreferences}
          otherUserHasFilledPreferences={otherUserHasFilledPreferences}
          userType={userType}
        />
      )}
    </div>
  );
};

export default ChatPreview;
