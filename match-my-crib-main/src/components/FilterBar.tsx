
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Filter, MapPin, DollarSign, Bed, Calendar, X } from 'lucide-react';

interface FilterBarProps {
  userType: 'renter' | 'landlord';
}

const FilterBar = ({ userType }: FilterBarProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([1000, 3000]);
  const [location, setLocation] = useState<string[]>([]);
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [moveInDate, setMoveInDate] = useState<string | null>(null);
  
  const locationOptions = ['Downtown', 'Midtown', 'Uptown', 'Suburbs', 'East Side', 'West Side'];
  const bedroomOptions = [1, 2, 3, 4, 5];
  const dateOptions = ['ASAP', 'Next month', '2-3 months', 'Flexible'];
  
  const handleLocationToggle = (loc: string) => {
    if (location.includes(loc)) {
      setLocation(location.filter(l => l !== loc));
    } else {
      setLocation([...location, loc]);
    }
  };
  
  const handleClearFilters = () => {
    setPriceRange([1000, 3000]);
    setLocation([]);
    setBedrooms(null);
    setMoveInDate(null);
  };
  
  const activeFilterCount = [
    location.length > 0,
    bedrooms !== null,
    moveInDate !== null,
    true, // Always count price range as a filter
  ].filter(Boolean).length;

  return (
    <div className="w-full py-4 px-4 bg-white border-b border-gray-200 sticky top-[72px] z-10">
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2 bg-white">
                <Filter className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center bg-match-primary text-white">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-sm flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Price Range
                    </h4>
                    <p className="text-sm text-gray-500">
                      ${priceRange[0]} - ${priceRange[1]}
                    </p>
                  </div>
                  <Slider
                    defaultValue={priceRange}
                    min={500}
                    max={5000}
                    step={100}
                    onValueChange={setPriceRange}
                    className="my-4"
                  />
                </div>
                
                <div>
                  <h4 className="font-medium text-sm flex items-center mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    Location
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {locationOptions.map((loc) => (
                      <Badge
                        key={loc}
                        className={cn(
                          "cursor-pointer",
                          location.includes(loc)
                            ? "bg-match-primary hover:bg-match-primary/90"
                            : "bg-muted hover:bg-muted/80 text-foreground"
                        )}
                        onClick={() => handleLocationToggle(loc)}
                      >
                        {loc}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm flex items-center mb-2">
                    <Bed className="h-4 w-4 mr-1" />
                    Bedrooms
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {bedroomOptions.map((num) => (
                      <Badge
                        key={num}
                        className={cn(
                          "cursor-pointer",
                          bedrooms === num
                            ? "bg-match-primary hover:bg-match-primary/90"
                            : "bg-muted hover:bg-muted/80 text-foreground"
                        )}
                        onClick={() => setBedrooms(bedrooms === num ? null : num)}
                      >
                        {num} {num === 1 ? 'bedroom' : 'bedrooms'}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm flex items-center mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    Move-in Date
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {dateOptions.map((date) => (
                      <Badge
                        key={date}
                        className={cn(
                          "cursor-pointer",
                          moveInDate === date
                            ? "bg-match-primary hover:bg-match-primary/90"
                            : "bg-muted hover:bg-muted/80 text-foreground"
                        )}
                        onClick={() => setMoveInDate(moveInDate === date ? null : date)}
                      >
                        {date}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="pt-2 flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-gray-500"
                    onClick={handleClearFilters}
                  >
                    Clear All
                  </Button>
                  <Button
                    size="sm"
                    className="bg-match-primary hover:bg-match-primary/90"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {location.length > 0 && (
            <Badge 
              variant="outline" 
              className="flex items-center gap-1 cursor-pointer hover:bg-gray-100"
              onClick={() => setLocation([])}
            >
              <MapPin className="h-3 w-3" />
              {location.length === 1 ? location[0] : `${location.length} locations`}
              <X className="h-3 w-3" />
            </Badge>
          )}
          
          {bedrooms !== null && (
            <Badge 
              variant="outline" 
              className="flex items-center gap-1 cursor-pointer hover:bg-gray-100"
              onClick={() => setBedrooms(null)}
            >
              <Bed className="h-3 w-3" />
              {bedrooms} {bedrooms === 1 ? 'bedroom' : 'bedrooms'}
              <X className="h-3 w-3" />
            </Badge>
          )}
          
          {moveInDate && (
            <Badge 
              variant="outline" 
              className="flex items-center gap-1 cursor-pointer hover:bg-gray-100"
              onClick={() => setMoveInDate(null)}
            >
              <Calendar className="h-3 w-3" />
              {moveInDate}
              <X className="h-3 w-3" />
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            className="hidden sm:flex"
          >
            Reset
          </Button>
          <Button className="bg-match-primary hover:bg-match-primary/90">
            {userType === 'renter' ? 'Find Properties' : 'Find Renters'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
