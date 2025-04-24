import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PreferencesForm from '@/components/PreferencesForm';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Home } from 'lucide-react';

const Onboarding = () => {
  const [userType, setUserType] = useState<'renter' | 'landlord'>('renter');
  const navigate = useNavigate();
  
  const handlePreferencesComplete = (preferences: any) => {
    // Store in localStorage for demo purposes
    localStorage.setItem('userType', userType);
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    
    // Navigate to the next step
    navigate('/onboarding/next');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white py-4 px-6 shadow-sm">
        <div className="container mx-auto">
          <div className="flex items-center">
            <Home className="h-6 w-6 text-match-primary mr-2" />
            <span className="text-xl font-bold text-match-dark">Housync</span>
          </div>
        </div>
      </header>
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Let's get to know you</h1>
          <p className="text-gray-600">Tell us your preferences so we can find your perfect match.</p>
        </div>
        
        <div className="max-w-md mx-auto mb-8">
          <Tabs 
            defaultValue={userType} 
            onValueChange={(value) => setUserType(value as 'renter' | 'landlord')}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="renter" className="flex items-center justify-center gap-2 py-3">
                <User className="h-5 w-5" />
                I'm a Renter
              </TabsTrigger>
              <TabsTrigger value="landlord" className="flex items-center justify-center gap-2 py-3">
                <Home className="h-5 w-5" />
                I'm a Landlord
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <PreferencesForm 
          userType={userType} 
          onComplete={handlePreferencesComplete} 
        />
      </div>
    </div>
  );
};

export default Onboarding;
