
import { User, MapPin, Briefcase, Calendar, Heart, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export interface ProfileProps {
  id: string;
  name: string;
  location: string;
  occupation: string;
  moveInDate: string;
  preferences: string[];
  avatarUrl?: string;
  matchPercentage?: number;
}

const ProfileCard = ({
  id,
  name,
  location,
  occupation,
  moveInDate,
  preferences,
  avatarUrl,
  matchPercentage,
}: ProfileProps) => {
  const [liked, setLiked] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return null;
  }

  return (
    <div className={cn(
      "property-card bg-white rounded-lg overflow-hidden shadow-card w-full max-w-sm mx-auto",
      "animate-card-appear",
      dismissed && "hidden"
    )}>
      <div className="relative">
        <div className="bg-gradient-to-b from-match-primary/20 to-match-primary/10 h-24"></div>
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
          <div className="bg-white p-1 rounded-full">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={name}
                className="h-24 w-24 rounded-full object-cover"
              />
            ) : (
              <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </div>
        </div>
        
        {matchPercentage && (
          <Badge className="absolute top-2 left-2 bg-match-primary text-white font-medium">
            {matchPercentage}% Match
          </Badge>
        )}
        
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 flex items-center justify-center text-gray-600 hover:text-match-secondary transition-colors"
        >
          <Heart className={cn("h-5 w-5", liked && "fill-match-secondary text-match-secondary")} />
        </button>
      </div>
      
      <div className="pt-16 p-4">
        <h3 className="text-xl font-semibold text-center mb-1">{name}</h3>
        
        <div className="flex items-center justify-center text-gray-500 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <p className="text-sm">{location}</p>
        </div>
        
        <div className="grid grid-cols-1 gap-2 mb-4">
          <div className="flex items-center p-2 bg-gray-50 rounded-md">
            <Briefcase className="h-4 w-4 mr-2 text-gray-600" />
            <span className="text-sm text-gray-700">{occupation}</span>
          </div>
          <div className="flex items-center p-2 bg-gray-50 rounded-md">
            <Calendar className="h-4 w-4 mr-2 text-gray-600" />
            <span className="text-sm text-gray-700">Move in: {moveInDate}</span>
          </div>
          <div className="p-2 bg-gray-50 rounded-md">
            <div className="flex flex-wrap gap-1 mt-1">
              {preferences.map((pref, index) => (
                <Badge key={index} variant="outline" className="bg-white">
                  {pref}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="default" 
            className="w-full bg-match-primary hover:bg-match-primary/90"
          >
            View Profile
          </Button>
          <Button 
            variant="outline" 
            className="p-2 border-gray-200 hover:bg-gray-50 text-gray-500"
            onClick={() => setDismissed(true)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
