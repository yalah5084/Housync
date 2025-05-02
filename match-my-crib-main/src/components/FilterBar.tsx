import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Filter, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { UserType } from '@/hooks/useUserType';

export interface FilterBarProps {
  onFilter?: (filters: FilterState) => void;
  className?: string;
  showReset?: boolean;
  userType?: UserType;
}

export interface FilterState {
  priceRange: [number, number];
  bedrooms: string[];
  location: string;
  amenities: string[];
}

const FilterBar = ({ onFilter = () => {}, className = '', showReset = true, userType = 'renter' }: FilterBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 3000]);
  const [bedrooms, setBedrooms] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [amenities, setAmenities] = useState<string[]>([]);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const resetFilters = () => {
    setPriceRange([1000, 3000]);
    setBedrooms([]);
    setLocation('');
    setAmenities([]);
    onFilter({
      priceRange: [1000, 3000],
      bedrooms: [],
      location: '',
      amenities: []
    });
  };
  
  const handleApplyFilters = () => {
    onFilter({
      priceRange,
      bedrooms,
      location,
      amenities
    });
    // On mobile, collapse the filter after applying
    if (window.innerWidth < 768) {
      setIsExpanded(false);
    }
  };
  
  const handleClearAll = () => {
    resetFilters();
  };
  
  const formatPrice = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      <div className="p-3 flex items-center justify-between border-b border-gray-200">
        <h2 className="font-semibold text-lg flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </h2>
        
        <div className="flex gap-2">
          {showReset && (
            <Button variant="ghost" size="sm" onClick={handleClearAll} className="h-8 text-sm">
              Clear All
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="sm" 
            className="md:hidden h-8" 
            onClick={toggleExpand}
          >
            {isExpanded ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      <div className={`${isExpanded ? 'block' : 'hidden md:block'} p-4 space-y-5`}>
        <div>
          <label className="text-sm font-medium mb-2 block">Price Range</label>
          <div className="pt-6 px-2">
            <Slider 
              defaultValue={[1000, 3000]} 
              min={500} 
              max={5000} 
              step={100} 
              value={priceRange}
              onValueChange={(values) => setPriceRange(values as [number, number])}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Bedrooms</label>
          <ToggleGroup 
            type="multiple" 
            variant="outline"
            value={bedrooms}
            onValueChange={setBedrooms}
            className="justify-start"
          >
            <ToggleGroupItem value="studio" className="text-xs">Studio</ToggleGroupItem>
            <ToggleGroupItem value="1" className="text-xs">1</ToggleGroupItem>
            <ToggleGroupItem value="2" className="text-xs">2</ToggleGroupItem>
            <ToggleGroupItem value="3" className="text-xs">3+</ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Location</label>
          <Input 
            placeholder="Enter neighborhood or city" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Amenities</label>
          <div className="flex flex-wrap gap-2">
            {['Pet-friendly', 'Parking', 'Gym', 'Pool', 'Furnished'].map(amenity => (
              <Badge 
                key={amenity} 
                variant={amenities.includes(amenity) ? "default" : "outline"} 
                className={`cursor-pointer ${amenities.includes(amenity) ? 'bg-match-primary hover:bg-match-primary/90' : 'hover:bg-gray-100'}`}
                onClick={() => {
                  if (amenities.includes(amenity)) {
                    setAmenities(amenities.filter(a => a !== amenity));
                  } else {
                    setAmenities([...amenities, amenity]);
                  }
                }}
              >
                {amenity}
              </Badge>
            ))}
          </div>
        </div>
        
        <Button 
          className="w-full bg-match-primary hover:bg-match-primary/90" 
          onClick={handleApplyFilters}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
