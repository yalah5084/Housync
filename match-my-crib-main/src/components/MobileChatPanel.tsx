import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import ChatPreview from '@/components/chat/ChatPreview';

interface MobileChatPanelProps {
  selectedItemName: string;
  onClose: () => void;
  propertyId?: string;
  profileId?: string;
  avatarUrl?: string;
  userType?: 'renter' | 'landlord';
  hasFilledPreferences?: boolean;
  otherUserHasFilledPreferences?: boolean;
}

const MobileChatPanel = ({ 
  selectedItemName, 
  onClose,
  propertyId,
  profileId,
  avatarUrl,
  userType = 'renter',
  hasFilledPreferences = false,
  otherUserHasFilledPreferences = false
}: MobileChatPanelProps) => {
  const isUnlocked = hasFilledPreferences && otherUserHasFilledPreferences;
  
  return (
    <div className="fixed inset-0 z-50 xl:hidden bg-white animate-fade-in">
      <div className="flex flex-col h-full">
        <div className="border-b border-gray-200 p-4 flex items-center">
          <Button 
            variant="ghost" 
            className="mr-2"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
          <h2 className="font-semibold">{selectedItemName}</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ChatPreview 
            name={selectedItemName} 
            isUnlocked={isUnlocked}
            propertyId={propertyId}
            profileId={profileId}
            avatarUrl={avatarUrl}
            userType={userType}
            hasFilledPreferences={hasFilledPreferences}
            otherUserHasFilledPreferences={otherUserHasFilledPreferences}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileChatPanel;
