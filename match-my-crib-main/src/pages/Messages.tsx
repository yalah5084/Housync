
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ChatPreview from '@/components/chat/ChatPreview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MessageCircle, Gift } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import MobileChatPanel from '@/components/MobileChatPanel';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface ChatContact {
  id: string;
  name: string;
  avatarUrl?: string;
  isProperty: boolean; // true if property, false if person
  lastMessage?: string;
  unreadCount?: number;
  matchPercentage?: number;
  isUnlocked: boolean;
}

const Messages = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [chatFilter, setChatFilter] = useState<'all' | 'properties' | 'renters'>('all');
  const [tokens, setTokens] = useState(0);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [selectedMobileChat, setSelectedMobileChat] = useState<ChatContact | null>(null);

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
      } catch (error) {
        console.error('Error fetching tokens:', error);
      }
    };
    
    fetchUserTokens();
  }, []);

  // Mock chat data - in a real app, this would come from an API
  const chats: ChatContact[] = [
    {
      id: '1',
      name: 'Modern Downtown Apartment',
      isProperty: true,
      lastMessage: 'Is this apartment still available?',
      unreadCount: 2,
      matchPercentage: 95,
      isUnlocked: true,
      avatarUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3'
    },
    {
      id: '2',
      name: 'Alex Johnson',
      isProperty: false,
      lastMessage: 'I\'m interested in scheduling a viewing.',
      matchPercentage: 92,
      isUnlocked: true,
      avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: '3',
      name: 'Spacious Garden Townhouse',
      isProperty: true,
      lastMessage: 'When can I move in?',
      matchPercentage: 88,
      isUnlocked: true,
      avatarUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3'
    },
    {
      id: '4',
      name: 'Samantha Lee',
      isProperty: false,
      lastMessage: null,
      matchPercentage: 87,
      isUnlocked: false,
      avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: '5',
      name: 'Cozy Studio Near Park',
      isProperty: true,
      lastMessage: null,
      matchPercentage: 79,
      isUnlocked: false,
      avatarUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3'
    },
  ];

  // Filter chats based on search query and type filter
  const filteredChats = chats.filter((chat) => {
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (chatFilter === 'all') {
      return matchesSearch;
    } else if (chatFilter === 'properties') {
      return matchesSearch && chat.isProperty;
    } else {
      return matchesSearch && !chat.isProperty;
    }
  });

  const handleChatClick = (chatId: string, chat: ChatContact) => {
    setActiveChat(chatId);
    
    // For mobile devices, show the mobile chat panel
    if (window.innerWidth < 1024) {
      setSelectedMobileChat(chat);
      setShowMobileChat(true);
    }
  };

  const handleCloseMobileChat = () => {
    setShowMobileChat(false);
    setSelectedMobileChat(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-match-dark">Messages</h1>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Gift className="h-3 w-3" />
                <span>{tokens} tokens</span>
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                className="text-xs"
                onClick={() => toast.info("Earn tokens by sending messages to your matches!")}
              >
                How to earn tokens?
              </Button>
              
              <Tabs 
                defaultValue="all" 
                onValueChange={(value) => setChatFilter(value as 'all' | 'properties' | 'renters')}
                className="w-fit"
              >
                <TabsList className="bg-gray-100">
                  <TabsTrigger value="all" className="data-[state=active]:bg-match-primary data-[state=active]:text-white">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="properties" className="data-[state=active]:bg-match-primary data-[state=active]:text-white">
                    Properties
                  </TabsTrigger>
                  <TabsTrigger value="renters" className="data-[state=active]:bg-match-primary data-[state=active]:text-white">
                    People
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-3 border-b border-gray-200">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search conversations..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="divide-y divide-gray-100 max-h-[calc(100vh-250px)] overflow-y-auto">
                  {filteredChats.length > 0 ? (
                    filteredChats.map((chat) => (
                      <div
                        key={chat.id}
                        onClick={() => handleChatClick(chat.id, chat)}
                        className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                          activeChat === chat.id ? 'bg-gray-50' : ''
                        }`}
                      >
                        {chat.avatarUrl ? (
                          <img 
                            src={chat.avatarUrl} 
                            alt={chat.name}
                            className="h-12 w-12 rounded-full object-cover mr-3"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-match-primary/10 flex items-center justify-center mr-3">
                            <MessageCircle className="h-6 w-6 text-match-primary" />
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-medium truncate">{chat.name}</h3>
                            {chat.matchPercentage && (
                              <span className="text-xs font-medium text-match-primary">
                                {chat.matchPercentage}% Match
                              </span>
                            )}
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-500 truncate">
                              {chat.lastMessage ? chat.lastMessage : chat.isUnlocked ? "Start a conversation" : "Unlock chat"}
                            </p>
                            
                            {chat.unreadCount && (
                              <span className="bg-match-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {chat.unreadCount}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center">
                      <p className="text-gray-500">No conversations found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Chat Content - Hidden on mobile when a chat is selected */}
            <div className={`lg:col-span-2 ${showMobileChat ? 'hidden lg:block' : ''}`}>
              {activeChat ? (
                <ChatPreview 
                  name={chats.find(c => c.id === activeChat)?.name || ''}
                  avatarUrl={chats.find(c => c.id === activeChat)?.avatarUrl}
                  isUnlocked={chats.find(c => c.id === activeChat)?.isUnlocked || false}
                  propertyId={chats.find(c => c.id === activeChat)?.isProperty ? activeChat : undefined}
                  profileId={!chats.find(c => c.id === activeChat)?.isProperty ? activeChat : undefined}
                />
              ) : (
                <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden bg-white h-[500px] flex flex-col items-center justify-center">
                  <div className="bg-match-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <MessageCircle className="h-8 w-8 text-match-primary" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Your Messages</h2>
                  <p className="text-gray-500 mb-4 text-center max-w-md">
                    Select a conversation from the list or unlock new chats with your top matches.
                  </p>
                  <div className="flex flex-col items-center gap-3">
                    <Button 
                      onClick={() => window.location.href = '/dashboard'} 
                      className="bg-match-primary hover:bg-match-primary/90"
                    >
                      Find New Matches
                    </Button>
                    <div className="flex items-center gap-1 mt-4 bg-gray-100 p-2 rounded-md">
                      <Gift className="h-4 w-4 text-match-primary" />
                      <p className="text-sm"><strong>Pro Tip:</strong> Earn tokens by engaging in meaningful conversations!</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Chat Panel */}
      {showMobileChat && selectedMobileChat && (
        <MobileChatPanel 
          selectedItemName={selectedMobileChat.name}
          onClose={handleCloseMobileChat}
        />
      )}
    </div>
  );
};

export default Messages;
