
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import FilterBar from '@/components/FilterBar';
import ChatPreview from '@/components/ChatPreview';
import ListingsGrid from '@/components/ListingsGrid';
import MobileChatPanel from '@/components/MobileChatPanel';
import { useUserType } from '@/hooks/useUserType';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { MessageCircle, Home, Users } from 'lucide-react';

const Dashboard = () => {
  const { userType, setUserType } = useUserType();
  const [showChat, setShowChat] = useState(false);
  const [selectedItemName, setSelectedItemName] = useState('');
  
  const [preferences] = useState(() => {
    const savedPrefs = localStorage.getItem('userPreferences');
    return savedPrefs ? JSON.parse(savedPrefs) : null;
  });
  
  const handleChatOpen = (name: string) => {
    setSelectedItemName(name);
    setShowChat(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <FilterBar userType={userType} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-match-dark">Find Your Match</h1>
            <p className="text-gray-500">Browse matches based on your preferences</p>
          </div>
          
          <div className="flex items-center">
            <Tabs 
              defaultValue={userType} 
              onValueChange={(value) => setUserType(value as 'renter' | 'landlord')}
              className="w-fit"
            >
              <TabsList className="bg-gray-100">
                <TabsTrigger value="renter" className="data-[state=active]:bg-match-primary data-[state=active]:text-white">
                  <Home className="h-4 w-4 mr-2" />
                  I'm a Renter
                </TabsTrigger>
                <TabsTrigger value="landlord" className="data-[state=active]:bg-match-primary data-[state=active]:text-white">
                  <Users className="h-4 w-4 mr-2" />
                  I'm a Landlord
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <ListingsGrid userType={userType} onItemClick={handleChatOpen} />
          </div>
          
          <div className="hidden xl:block">
            {showChat ? (
              <ChatPreview 
                name={selectedItemName} 
                isUnlocked={false}
              />
            ) : (
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center h-80 flex flex-col items-center justify-center">
                <div className="bg-match-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="h-8 w-8 text-match-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Start a Conversation</h3>
                <p className="text-gray-500 mb-4">Click on a match to unlock the chat</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile Chat Button */}
        <div className="fixed bottom-6 right-6 xl:hidden">
          <Button 
            onClick={() => setShowChat(!showChat)}
            className="h-14 w-14 rounded-full bg-match-primary hover:bg-match-primary/90 shadow-lg"
            size="icon"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>
        
        {/* Mobile Chat Panel */}
        {showChat && (
          <MobileChatPanel 
            selectedItemName={selectedItemName}
            onClose={() => setShowChat(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
