import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  DollarSign, 
  Home, 
  MapPin,
  Calendar, 
  Check, 
  X,
  Bed,
  Bath,
  User,
  Wifi,
  Car,
  Dog,
  TreeDeciduous,
  Dumbbell,
  Wrench,
  Tv,
  WashingMachine,
  Droplets,
  LampCeiling,
  AirVent
} from 'lucide-react';

interface RenterPreferences {
  moveInDate: string;
  budget: number;
  locations: string[];
  bedrooms: number;
  bathrooms: number;
  preferences: string[];
}

interface LandlordPreferences {
  propertyName: string;
  propertyType: string;
  location: string;
  neighborhood: {
    type: string;
    description: string;
  };
  buildingFeatures: string[];
  petsAllowed: boolean;
  minIncome: number;
  preferredMoveInDate: string;
  leaseLength: string;
  tenantPreferences: string[];
}

interface PreferencesFormProps {
  userType: 'renter' | 'landlord';
  onComplete: (preferences: RenterPreferences | LandlordPreferences) => void;
}

const PreferencesForm = ({ userType, onComplete }: PreferencesFormProps) => {
  const [renterPrefs, setRenterPrefs] = useState<RenterPreferences>({
    moveInDate: 'Next month',
    budget: 2000,
    locations: [],
    bedrooms: 2,
    bathrooms: 1,
    preferences: []
  });
  
  const [landlordPrefs, setLandlordPrefs] = useState<LandlordPreferences>({
    propertyName: '',
    propertyType: 'Apartment',
    location: '',
    neighborhood: {
      type: 'Residential',
      description: ''
    },
    buildingFeatures: [],
    petsAllowed: true,
    minIncome: 60000,
    preferredMoveInDate: 'Flexible',
    leaseLength: '1 year',
    tenantPreferences: []
  });

  const neighborhoodTypes = [
    'Residential',
    'Urban',
    'Suburban',
    'Commercial',
    'Downtown',
    'College/University',
    'Rural',
    'Beach/Waterfront',
    'Historic',
    'Family-friendly',
    'Arts District',
    'Business District',
    'Up-and-coming',
    'Trendy/Hip'
  ];

  const commonPropertyPreferences = [
    'Pet-friendly',
    'Furnished',
    'Utilities included',
    'High-speed internet',
    'Parking available',
    'Garden/outdoor space',
    'Pool access',
    'Gym access',
    'Security system',
    'Smart home features',
    'Washer/dryer in unit',
    'Dishwasher',
    'Central air conditioning',
    'Hardwood floors',
    'Modern appliances',
    'Storage space',
    'Balcony/patio',
    'Good natural light',
    'Soundproof walls',
    'Open floor plan',
    'Walk-in closets',
    'Updated kitchen',
    'Updated bathroom',
    'Energy efficient',
    'Elevator in building',
    'Package receiving',
    'Maintenance included',
    'Close to public transit',
    'Close to shopping',
    'Close to parks',
    'Quiet neighborhood',
    'Safe neighborhood',
    'Family-friendly',
    'Professional community',
    'Student-friendly'
  ];

  const landlordSpecificPreferences = [
    'No smoking',
    'No parties',
    'Clean record',
    'Good credit score',
    'Income verification',
    'Employment verification',
    'References required',
    'Background check',
    'Rental history',
    'Long-term preferred',
    'Short-term acceptable',
    'Couples welcome',
    'Families welcome',
    'Students welcome',
    'Professionals preferred'
  ];

  const buildingFeatures = [
    'Elevator',
    'Parking garage',
    'Swimming pool',
    'Fitness center',
    'Package receiving',
    'Security system',
    'Rooftop deck',
    'Bike storage',
    'Storage units',
    'Laundry facility',
    'Business center',
    'Community room',
    'Outdoor space',
    'BBQ area',
    'Pet wash station',
    'Electric car charging',
    'Smart access control',
    'High-speed internet',
    'Central AC',
    'Heating system',
    'Water heater',
    'Trash chute',
    'Recycling',
    'Maintenance on site',
    'Property manager on site'
  ];

  const tenantRequirements = [
    'No smoking',
    'No pets',
    'No subletting',
    'Income verification required',
    'Credit check required',
    'Background check required',
    'References required',
    'Rental history required',
    'Employment verification',
    'Proof of insurance required',
    'Security deposit required',
    'First and last month rent',
    'Long-term lease preferred',
    'Professional/employed',
    'Student with guarantor',
    'No criminal history',
    'Clean rental history',
    'Good credit score',
    'Co-signer accepted',
    'Maximum occupants limit'
  ];

  const [newRenterPref, setNewRenterPref] = useState('');
  const [newLandlordPref, setNewLandlordPref] = useState('');

  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const locationOptions = ['Downtown', 'Midtown', 'Uptown', 'Suburbs', 'East Side', 'West Side'];
  const dateOptions = ['ASAP', 'Next month', '2-3 months', 'Flexible'];
  const occupationOptions = ['Professional', 'Student', 'Remote worker', 'Retired', 'Any'];
  const propertyTypes = ['Apartment', 'House', 'Townhouse', 'Condo', 'Studio'];
  const leaseOptions = ['6 months', '1 year', '2 years', 'Flexible'];

  const addRenterPreference = () => {
    if (newRenterPref && !renterPrefs.preferences.includes(newRenterPref)) {
      setRenterPrefs({
        ...renterPrefs,
        preferences: [...renterPrefs.preferences, newRenterPref]
      });
      setNewRenterPref('');
    }
  };

  const removeRenterPreference = (pref: string) => {
    setRenterPrefs({
      ...renterPrefs,
      preferences: renterPrefs.preferences.filter(p => p !== pref)
    });
  };

  const addLandlordPreference = () => {
    if (newLandlordPref && !landlordPrefs.tenantPreferences.includes(newLandlordPref)) {
      setLandlordPrefs({
        ...landlordPrefs,
        tenantPreferences: [...landlordPrefs.tenantPreferences, newLandlordPref]
      });
      setNewLandlordPref('');
    }
  };

  const removeLandlordPreference = (pref: string) => {
    setLandlordPrefs({
      ...landlordPrefs,
      tenantPreferences: landlordPrefs.tenantPreferences.filter(p => p !== pref)
    });
  };

  const toggleLocation = (location: string) => {
    if (renterPrefs.locations.includes(location)) {
      setRenterPrefs({
        ...renterPrefs,
        locations: renterPrefs.locations.filter(l => l !== location)
      });
    } else {
      setRenterPrefs({
        ...renterPrefs,
        locations: [...renterPrefs.locations, location]
      });
    }
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(userType === 'renter' ? renterPrefs : landlordPrefs);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    if (userType === 'renter') {
      return renderRenterStep();
    } else {
      return renderLandlordStep();
    }
  };

  const renderRenterStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Basic Requirements</h3>
            <p className="text-gray-500">Let's start with your basic housing needs.</p>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">When do you want to move in?</label>
                <Select 
                  value={renterPrefs.moveInDate}
                  onValueChange={(value) => setRenterPrefs({...renterPrefs, moveInDate: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select move-in timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    {dateOptions.map((date) => (
                      <SelectItem key={date} value={date}>{date}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">
                  What's your monthly budget? ${renterPrefs.budget}
                </label>
                <Slider
                  value={[renterPrefs.budget]}
                  min={500}
                  max={5000}
                  step={100}
                  onValueChange={(value) => setRenterPrefs({...renterPrefs, budget: value[0]})}
                  className="py-4"
                />
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Property Details</h3>
            <p className="text-gray-500">Tell us what you're looking for in a home.</p>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Preferred Locations</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {locationOptions.map((location) => (
                    <Badge
                      key={location}
                      onClick={() => toggleLocation(location)}
                      className={`cursor-pointer ${
                        renterPrefs.locations.includes(location)
                          ? "bg-match-primary hover:bg-match-primary/90"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {location}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Bedrooms</label>
                  <Select 
                    value={renterPrefs.bedrooms.toString()}
                    onValueChange={(value) => setRenterPrefs({...renterPrefs, bedrooms: parseInt(value)})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Bedrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'bedroom' : 'bedrooms'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Bathrooms</label>
                  <Select 
                    value={renterPrefs.bathrooms.toString()}
                    onValueChange={(value) => setRenterPrefs({...renterPrefs, bathrooms: parseFloat(value)})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Bathrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 1.5, 2, 2.5, 3].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'bathroom' : 'bathrooms'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Property Features</h3>
            <p className="text-gray-500">Select the amenities and features that are important to you.</p>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Selected Features:</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {renterPrefs.preferences.map((pref) => (
                    <Badge key={pref} className="bg-gray-100 text-gray-700 flex items-center gap-1">
                      {pref}
                      <button onClick={() => removeRenterPreference(pref)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    value={newRenterPref}
                    onChange={(e) => setNewRenterPref(e.target.value)}
                    placeholder="Add custom feature"
                    className="flex-1"
                    onKeyDown={(e) => e.key === 'Enter' && addRenterPreference()}
                  />
                  <Button 
                    onClick={addRenterPreference}
                    className="bg-match-primary hover:bg-match-primary/90"
                    disabled={!newRenterPref}
                  >
                    Add
                  </Button>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">Common features:</p>
                  <div className="flex flex-wrap gap-2">
                    {commonPropertyPreferences.map((pref) => (
                      !renterPrefs.preferences.includes(pref) && (
                        <Badge 
                          key={pref} 
                          className="bg-gray-100 text-gray-700 cursor-pointer hover:bg-gray-200"
                          onClick={() => {
                            setRenterPrefs({
                              ...renterPrefs,
                              preferences: [...renterPrefs.preferences, pref]
                            });
                          }}
                        >
                          + {pref}
                        </Badge>
                      )
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  const renderLandlordStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Property Information</h3>
            <p className="text-gray-500">Tell us about your property.</p>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Property Name</label>
                <Input 
                  value={landlordPrefs.propertyName}
                  onChange={(e) => setLandlordPrefs({...landlordPrefs, propertyName: e.target.value})}
                  placeholder="Enter property name"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Property Location</label>
                <Input 
                  value={landlordPrefs.location}
                  onChange={(e) => setLandlordPrefs({...landlordPrefs, location: e.target.value})}
                  placeholder="Enter property address"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Neighborhood Type</label>
                <Select 
                  value={landlordPrefs.neighborhood.type}
                  onValueChange={(value) => setLandlordPrefs({
                    ...landlordPrefs, 
                    neighborhood: { ...landlordPrefs.neighborhood, type: value }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select neighborhood type" />
                  </SelectTrigger>
                  <SelectContent>
                    {neighborhoodTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Neighborhood Description</label>
                <Input 
                  value={landlordPrefs.neighborhood.description}
                  onChange={(e) => setLandlordPrefs({
                    ...landlordPrefs, 
                    neighborhood: { ...landlordPrefs.neighborhood, description: e.target.value }
                  })}
                  placeholder="Describe the neighborhood (e.g., quiet, family-friendly, close to amenities)"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Property Type</label>
                <Select 
                  value={landlordPrefs.propertyType}
                  onValueChange={(value) => setLandlordPrefs({...landlordPrefs, propertyType: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    {['Apartment', 'House', 'Townhouse', 'Condo', 'Studio'].map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Building Features</label>
                <div className="grid grid-cols-2 gap-2">
                  {buildingFeatures.map((feature) => (
                    <div
                      key={feature}
                      className={`p-2 rounded border cursor-pointer ${
                        landlordPrefs.buildingFeatures.includes(feature)
                          ? 'bg-match-primary/10 border-match-primary'
                          : 'border-gray-200 hover:border-match-primary/50'
                      }`}
                      onClick={() => {
                        if (landlordPrefs.buildingFeatures.includes(feature)) {
                          setLandlordPrefs({
                            ...landlordPrefs,
                            buildingFeatures: landlordPrefs.buildingFeatures.filter(f => f !== feature)
                          });
                        } else {
                          setLandlordPrefs({
                            ...landlordPrefs,
                            buildingFeatures: [...landlordPrefs.buildingFeatures, feature]
                          });
                        }
                      }}
                    >
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Lease Requirements</h3>
            <p className="text-gray-500">Set your basic requirements for potential tenants.</p>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Minimum Annual Income: ${landlordPrefs.minIncome.toLocaleString()}
                </label>
                <Slider
                  value={[landlordPrefs.minIncome]}
                  min={30000}
                  max={150000}
                  step={5000}
                  onValueChange={(value) => setLandlordPrefs({...landlordPrefs, minIncome: value[0]})}
                  className="py-4"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Property Available From</label>
                  <Select 
                    value={landlordPrefs.preferredMoveInDate}
                    onValueChange={(value) => setLandlordPrefs({...landlordPrefs, preferredMoveInDate: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      {dateOptions.map((date) => (
                        <SelectItem key={date} value={date}>{date}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Preferred Lease Length</label>
                  <Select 
                    value={landlordPrefs.leaseLength}
                    onValueChange={(value) => setLandlordPrefs({...landlordPrefs, leaseLength: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select lease length" />
                    </SelectTrigger>
                    <SelectContent>
                      {leaseOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Tenant Requirements</h3>
            <p className="text-gray-500">Select your requirements for potential tenants.</p>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Selected Requirements:</label>
                <div className="grid grid-cols-2 gap-2">
                  {tenantRequirements.map((req) => (
                    <div
                      key={req}
                      className={`p-2 rounded border cursor-pointer ${
                        landlordPrefs.tenantPreferences.includes(req)
                          ? 'bg-match-primary/10 border-match-primary'
                          : 'border-gray-200 hover:border-match-primary/50'
                      }`}
                      onClick={() => {
                        if (landlordPrefs.tenantPreferences.includes(req)) {
                          setLandlordPrefs({
                            ...landlordPrefs,
                            tenantPreferences: landlordPrefs.tenantPreferences.filter(p => p !== req)
                          });
                        } else {
                          setLandlordPrefs({
                            ...landlordPrefs,
                            tenantPreferences: [...landlordPrefs.tenantPreferences, req]
                          });
                        }
                      }}
                    >
                      <span className="text-sm">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  const handleComplete = () => {
    const preferences = userType === 'renter' ? renterPrefs : landlordPrefs;
    localStorage.setItem('userType', userType);
    localStorage.setItem('preferences', JSON.stringify(preferences));
    onComplete(preferences);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {userType === 'renter' ? (
            <>
              <User className="h-5 w-5 text-match-primary" />
              Renter Preferences
            </>
          ) : (
            <>
              <Home className="h-5 w-5 text-match-primary" />
              Landlord Preferences
            </>
          )}
        </CardTitle>
        <CardDescription>
          Step {step} of {totalSteps}: {userType === 'renter' ? 
            ['About You', 'Property Details', 'Additional Preferences'][step - 1] :
            ['Property Information', 'Lease Requirements', 'Tenant Requirements'][step - 1]
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {renderStep()}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button 
          onClick={prevStep} 
          variant="outline"
          disabled={step === 1}
        >
          Back
        </Button>
        
        <Button 
          onClick={nextStep}
          className="bg-match-primary hover:bg-match-primary/90"
        >
          {step === totalSteps ? 'Complete' : 'Next'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PreferencesForm;
