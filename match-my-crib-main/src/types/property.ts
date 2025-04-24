
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
  budget: number;
  preferences: string[];
  avatarUrl: string;
  matchPercentage: number;
}
