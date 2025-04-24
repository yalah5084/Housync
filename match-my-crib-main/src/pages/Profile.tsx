
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  User, 
  Home, 
  Save, 
  Plus, 
  X,
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Bed,
  Bath,
} from 'lucide-react';

const Profile = () => {
  const [userType, setUserType] = useState<'renter' | 'landlord'>('renter');
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    location: 'New York, NY',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
  });
  
  // Renter preferences
  const [renterPrefs, setRenterPrefs] = useState({
    occupation: 'Software Engineer',
    moveInDate: 'Next month',
    budget: 2000,
    locations: ['Downtown', 'Midtown'],
    bedrooms: 2,
    bathrooms: 1,
    preferences: ['Pet-friendly', 'Near transit', 'Gym'],
  });
  
  // Landlord preferences
  const [landlordPrefs, setLandlordPrefs] = useState({
    propertyType: 'Apartment',
    occupationPreference: ['Professional', 'Student'],
    petsAllowed: true,
    minIncome: 60000,
    preferredMoveInDate: 'Flexible',
    leaseLength: '1 year',
  });
  
  // New preference input fields
  const [newRenterPref, setNewRenterPref] = useState('');
  const [newLandlordPref, setNewLandlordPref] = useState('');
  
  // Possible values
  const locationOptions = ['Downtown', 'Midtown', 'Uptown', 'Suburbs', 'East Side', 'West Side'];
  const dateOptions = ['ASAP', 'Next month', '2-3 months', 'Flexible'];
  const occupationOptions = ['Professional', 'Student', 'Remote worker', 'Any'];
  const leaseOptions = ['6 months', '1 year', '2 years', 'Flexible'];
  
  // Handle adding new preferences
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
    if (newLandlordPref && !landlordPrefs.occupationPreference.includes(newLandlordPref)) {
      setLandlordPrefs({
        ...landlordPrefs,
        occupationPreference: [...landlordPrefs.occupationPreference, newLandlordPref]
      });
      setNewLandlordPref('');
    }
  };
  
  const removeLandlordPreference = (pref: string) => {
    setLandlordPrefs({
      ...landlordPrefs,
      occupationPreference: landlordPrefs.occupationPreference.filter(p => p !== pref)
    });
  };
  
  // Update location preferences for renter
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
  
  // Mock save function - in a real app, this would save to a database
  const saveProfile = () => {
    alert('Profile preferences saved successfully!');
    // In a real app, this would make an API call to save the data
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="h-20 w-20 rounded-full overflow-hidden">
                    {profile.avatarUrl ? (
                      <img
                        src={profile.avatarUrl}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                        <User className="h-10 w-10 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-match-primary text-white rounded-full p-1">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <CardTitle className="text-2xl">{profile.name}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {profile.location}
                  </CardDescription>
                </div>
              </div>
              
              <Tabs 
                defaultValue={userType} 
                onValueChange={(value) => setUserType(value as 'renter' | 'landlord')}
              >
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="renter" className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    I'm a Renter
                  </TabsTrigger>
                  <TabsTrigger value="landlord" className="flex items-center gap-1">
                    <Home className="h-4 w-4" />
                    I'm a Landlord
                  </TabsTrigger>
                </TabsList>
                
                {/* Renter Tab */}
                <TabsContent value="renter" className="py-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Basic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Occupation</label>
                          <Input 
                            value={renterPrefs.occupation} 
                            onChange={(e) => setRenterPrefs({...renterPrefs, occupation: e.target.value})}
                            placeholder="Your occupation"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Preferred Move-in Date</label>
                          <Select 
                            value={renterPrefs.moveInDate}
                            onValueChange={(value) => setRenterPrefs({...renterPrefs, moveInDate: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select move-in date" />
                            </SelectTrigger>
                            <SelectContent>
                              {dateOptions.map((date) => (
                                <SelectItem key={date} value={date}>{date}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Housing Preferences</h3>
                      
                      <div className="mb-4">
                        <label className="text-sm font-medium mb-1 block">
                          Budget: ${renterPrefs.budget.toLocaleString()}/month
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
                      
                      <div className="mb-4">
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
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Bedrooms</label>
                          <Select 
                            value={renterPrefs.bedrooms.toString()}
                            onValueChange={(value) => setRenterPrefs({...renterPrefs, bedrooms: parseInt(value)})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select bedrooms" />
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
                            onValueChange={(value) => setRenterPrefs({...renterPrefs, bathrooms: parseInt(value)})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select bathrooms" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 1.5, 2, 2.5, 3, 3.5, 4].map((num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num} {num === 1 ? 'bathroom' : 'bathrooms'}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Additional Preferences</label>
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
                            placeholder="Add a preference"
                            className="flex-1"
                          />
                          <Button 
                            onClick={addRenterPreference}
                            className="bg-match-primary hover:bg-match-primary/90"
                            disabled={!newRenterPref}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Landlord Tab */}
                <TabsContent value="landlord" className="py-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Property Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          <label className="text-sm font-medium mb-1 block">Pets Allowed</label>
                          <Select 
                            value={landlordPrefs.petsAllowed ? "yes" : "no"}
                            onValueChange={(value) => setLandlordPrefs({...landlordPrefs, petsAllowed: value === "yes"})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Pets allowed?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Tenant Preferences</h3>
                      
                      <div className="mb-4">
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
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Preferred Move-in Date</label>
                          <Select 
                            value={landlordPrefs.preferredMoveInDate}
                            onValueChange={(value) => setLandlordPrefs({...landlordPrefs, preferredMoveInDate: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select move-in date" />
                            </SelectTrigger>
                            <SelectContent>
                              {dateOptions.map((date) => (
                                <SelectItem key={date} value={date}>{date}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Lease Length</label>
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
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Preferred Tenant Occupations</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {landlordPrefs.occupationPreference.map((pref) => (
                            <Badge key={pref} className="bg-gray-100 text-gray-700 flex items-center gap-1">
                              {pref}
                              <button onClick={() => removeLandlordPreference(pref)}>
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            value={newLandlordPref}
                            onChange={(e) => setNewLandlordPref(e.target.value)}
                            placeholder="Add preferred occupation"
                            className="flex-1"
                          />
                          <Button 
                            onClick={addLandlordPreference}
                            className="bg-match-primary hover:bg-match-primary/90"
                            disabled={!newLandlordPref}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardHeader>
            
            <CardFooter className="flex justify-end">
              <Button 
                onClick={saveProfile} 
                className="bg-match-primary hover:bg-match-primary/90 gap-2"
              >
                <Save className="h-4 w-4" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
