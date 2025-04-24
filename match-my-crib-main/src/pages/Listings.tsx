
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import FilterBar from '@/components/FilterBar';
import PropertyCard, { PropertyProps } from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { MessageCircle, X } from 'lucide-react';
import ChatPreview from '@/components/ChatPreview';

const Listings = () => {
  const [showChat, setShowChat] = useState(false);
  const [selectedItemName, setSelectedItemName] = useState('');
  const userType = localStorage.getItem('userType') as 'renter' | 'landlord' || 'renter';
  
  // Mock data - in a real app, this would come from an API
  const properties: PropertyProps[] = [
    {
      id: '1',
      title: 'Modern Downtown Apartment',
      price: 1850,
      location: 'Downtown, New York',
      bedrooms: 2,
      bathrooms: 1,
      squareFeet: 950,
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
      matchPercentage: 95,
    },
    {
      id: '2',
      title: 'Spacious Garden Townhouse',
      price: 2200,
      location: 'Uptown, New York',
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1250,
      imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
      matchPercentage: 88,
    },
    {
      id: '3',
      title: 'Cozy Studio Near Park',
      price: 1500,
      location: 'Midtown, New York',
      bedrooms: 1,
      bathrooms: 1,
      squareFeet: 650,
      imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
      matchPercentage: 79,
    },
  ];
  
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
            <h1 className="text-2xl font-bold text-match-dark">Available Properties</h1>
            <p className="text-gray-500">Browse properties that match your preferences</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div 
                  key={property.id} 
                  onClick={() => handleChatOpen(property.title)}
                  className="cursor-pointer"
                >
                  <PropertyCard {...property} />
                </div>
              ))}
            </div>
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
                <p className="text-gray-500 mb-4">Click on a property to unlock the chat</p>
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
          <div className="fixed inset-0 z-50 xl:hidden bg-white animate-fade-in">
            <div className="flex flex-col h-full">
              <div className="border-b border-gray-200 p-4 flex items-center">
                <Button 
                  variant="ghost" 
                  className="mr-2"
                  onClick={() => setShowChat(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
                <h2 className="font-semibold">{selectedItemName}</h2>
              </div>
              <div className="flex-1">
                <ChatPreview 
                  name={selectedItemName} 
                  isUnlocked={true}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Listings;
