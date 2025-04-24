
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Home, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserTypeSelect = () => {
  const [selectedType, setSelectedType] = useState<'renter' | 'landlord' | null>(null);

  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-bold text-center mb-8">I am a...</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => setSelectedType('renter')}
          className={cn(
            'border-2 rounded-xl p-6 h-64 flex flex-col items-center justify-center gap-4 transition-all',
            'hover:shadow-md',
            selectedType === 'renter'
              ? 'border-match-primary bg-match-primary/5'
              : 'border-gray-200 hover:border-match-primary/50'
          )}
        >
          <div className="h-20 w-20 rounded-full bg-match-primary/10 flex items-center justify-center">
            <User className="h-10 w-10 text-match-primary" />
          </div>
          <h3 className="text-xl font-semibold">Renter</h3>
          <p className="text-gray-500 text-center">
            I'm looking for the perfect place to call home
          </p>
        </button>

        <button
          onClick={() => setSelectedType('landlord')}
          className={cn(
            'border-2 rounded-xl p-6 h-64 flex flex-col items-center justify-center gap-4 transition-all',
            'hover:shadow-md',
            selectedType === 'landlord'
              ? 'border-match-primary bg-match-primary/5'
              : 'border-gray-200 hover:border-match-primary/50'
          )}
        >
          <div className="h-20 w-20 rounded-full bg-match-primary/10 flex items-center justify-center">
            <Home className="h-10 w-10 text-match-primary" />
          </div>
          <h3 className="text-xl font-semibold">Landlord</h3>
          <p className="text-gray-500 text-center">
            I have properties and looking for the right tenants
          </p>
        </button>
      </div>

      <div className="mt-8 flex justify-center">
        <Link to={selectedType ? "/onboarding" : "#"}>
          <Button 
            className="w-48 text-lg py-6"
            disabled={!selectedType}
            variant={selectedType ? "default" : "outline"}
          >
            Continue
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UserTypeSelect;
