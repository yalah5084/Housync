
import { useState } from 'react';
import { Heart, MapPin, Maximize, Bed, Bath, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface PropertyProps {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  imageUrl: string;
  matchPercentage?: number;
}

const PropertyCard = ({
  id,
  title,
  price,
  location,
  bedrooms,
  bathrooms,
  squareFeet,
  imageUrl,
  matchPercentage,
}: PropertyProps) => {
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
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="w-full h-48 object-cover"
        />
        
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
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
          <p className="font-bold text-match-dark">${price.toLocaleString()}/mo</p>
        </div>
        
        <div className="flex items-center text-gray-500 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <p className="text-sm line-clamp-1">{location}</p>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex items-center justify-center p-2 bg-gray-50 rounded-md">
            <Bed className="h-4 w-4 mr-1 text-gray-600" />
            <span className="text-sm">{bedrooms} bd</span>
          </div>
          <div className="flex items-center justify-center p-2 bg-gray-50 rounded-md">
            <Bath className="h-4 w-4 mr-1 text-gray-600" />
            <span className="text-sm">{bathrooms} ba</span>
          </div>
          <div className="flex items-center justify-center p-2 bg-gray-50 rounded-md">
            <Maximize className="h-4 w-4 mr-1 text-gray-600" />
            <span className="text-sm">{squareFeet} ft²</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="default" 
            className="w-full bg-match-primary hover:bg-match-primary/90"
          >
            View Details
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

export default PropertyCard;
