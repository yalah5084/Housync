
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ChatMessage {
  id: string;
  content: string;
  sender_id: string;
  is_mine: boolean;
}

interface UseChatProps {
  propertyId?: string;
  profileId?: string;
  isUnlocked?: boolean;
  userType?: 'renter' | 'landlord';
  hasFilledPreferences?: boolean;
  otherUserHasFilledPreferences?: boolean;
}

export const useChat = ({
  propertyId,
  profileId,
  isUnlocked = false,
  userType = 'renter',
  hasFilledPreferences = false,
  otherUserHasFilledPreferences = false,
}: UseChatProps) => {
  const [message, setMessage] = useState('');
  const [unlocked, setUnlocked] = useState(isUnlocked);
  const [tokens, setTokens] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [canUnlock, setCanUnlock] = useState(false);
  
  useEffect(() => {
    const checkUnlockEligibility = () => {
      // A user can unlock chat if they have filled their preferences
      setCanUnlock(hasFilledPreferences && otherUserHasFilledPreferences);
    };
    
    checkUnlockEligibility();
  }, [hasFilledPreferences, otherUserHasFilledPreferences]);
  
  useEffect(() => {
    const fetchUserTokens = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        
        const response = await fetch('https://zoahrthruljrxniasldg.supabase.co/functions/v1/chat-tokens', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'get_tokens',
            user_id: user.id
          }),
        });
        
        const data = await response.json();
        setTokens(data.tokens || 0);
        setTotalEarned(data.total_earned || 0);
      } catch (error) {
        console.error('Error fetching tokens:', error);
      }
    };
    
    const initializeChat = async () => {
      try {
        // Mock chat initialization
        setChatId("mock-chat-id");
        // In a real implementation, this would create or fetch an actual chat
        
        // Mock messages
        setMessages([
          {
            id: '1',
            content: 'Hi there! I\'m interested in learning more about this property.',
            sender_id: 'other-user',
            is_mine: false
          },
          {
            id: '2',
            content: 'Hello! I\'d be happy to answer any questions you have about it.',
            sender_id: 'current-user',
            is_mine: true
          },
          {
            id: '3',
            content: 'Is the property available for a viewing this weekend?',
            sender_id: 'other-user',
            is_mine: false
          }
        ]);
      } catch (error) {
        console.error('Error initializing chat:', error);
      }
    };
    
    fetchUserTokens();
    
    if (unlocked) {
      initializeChat();
    }
  }, [unlocked]);
  
  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("You must be logged in to send messages");
        return;
      }
      
      // Add message to UI first for better UX
      const newMessage = {
        id: Date.now().toString(),
        content: message,
        sender_id: user.id,
        is_mine: true
      };
      
      setMessages(prev => [...prev, newMessage]);
      
      // In a real app, save the message to the database here
      
      // Add a token for the user if the other user has replied
      // We'll assume there's a reply for demo purposes
      const hasReply = messages.some(msg => !msg.is_mine);
      
      if (hasReply) {
        const response = await fetch('https://zoahrthruljrxniasldg.supabase.co/functions/v1/chat-tokens', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'add_message_token',
            user_id: user.id,
            chat_id: chatId
          }),
        });
        
        const data = await response.json();
        
        if (data.success) {
          // Update local token count
          setTokens(prev => prev + 1);
          setTotalEarned(prev => prev + 1);
          toast.success("You earned 1 token for engaging in conversation!");
        }
      }
      
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };
  
  const handleUnlock = async () => {
    try {
      if (!hasFilledPreferences) {
        if (userType === 'renter') {
          toast.error("Please fill your renter preferences before unlocking chat");
        } else {
          toast.error("Please fill your property description and preferences before unlocking chat");
        }
        return;
      }
      
      if (!otherUserHasFilledPreferences) {
        toast.error("The other user hasn't completed their profile yet. Chat will be available when they do.");
        return;
      }
      
      // In a real app, you'd create the chat in the database
      setUnlocked(true);
      
      // Award 5 tokens for unlocking the chat
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const response = await fetch('https://zoahrthruljrxniasldg.supabase.co/functions/v1/chat-tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'unlock_chat',
          user_id: user.id
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Update local token count
        setTokens(prev => prev + 5);
        setTotalEarned(prev => prev + 5);
        toast.success("Chat unlocked! You earned 5 tokens for completing your preferences.");
      }
    } catch (error) {
      console.error('Error unlocking chat:', error);
      toast.error("Failed to unlock chat");
    }
  };
  
  const unlockFeature = async (feature: string, cost: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("You must be logged in to unlock features");
        return false;
      }
      
      if (tokens < cost) {
        toast.error(`Not enough tokens. You need ${cost} tokens to unlock this feature.`);
        return false;
      }
      
      const response = await fetch('https://zoahrthruljrxniasldg.supabase.co/functions/v1/chat-tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'use_tokens',
          user_id: user.id,
          property_id: propertyId,
          profile_id: profileId,
          feature,
          amount: cost
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setTokens(data.remaining_tokens);
        toast.success(`Successfully unlocked ${feature}!`);
        return true;
      } else {
        toast.error(data.message || "Failed to unlock feature");
        return false;
      }
    } catch (error) {
      console.error('Error unlocking feature:', error);
      toast.error("Failed to unlock feature");
      return false;
    }
  };

  return {
    message,
    setMessage,
    unlocked,
    tokens,
    totalEarned,
    chatId,
    messages,
    loading,
    canUnlock,
    handleSendMessage,
    handleUnlock,
    unlockFeature
  };
};
