
export interface PropertyProps {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  imageUrl: string;
  matchPercentage: number;
}

export interface ProfileProps {
  id: string;
  name: string;
  location: string;
  occupation: string;
  moveInDate: string;
  preferences: string[];
  avatarUrl: string;
  matchPercentage: number;
}

export interface MatchResult {
  id: string;
  renter_id: string;
  landlord_id: string;
  compatibility_score: number;
  created_at: string;
}

export interface LandlordPreference {
  id: string;
  user_id: string;
  property_name: string;
  property_type: string;
  location: string;
  neighborhood_type: string;
  building_features: string[];
  preferred_move_in_date: string;
  lease_length: string;
  tenant_preferences: string[];
  created_at: string;
  updated_at: string;
  neighborhood_description: string | null;
  pets_allowed: boolean;
}

export interface RenterPreference {
  id: string;
  user_id: string;
  bedrooms: number;
  bathrooms: number;
  locations: string[];
  move_in_date: string;
  preferences: string[];
  created_at: string;
  updated_at: string;
}
