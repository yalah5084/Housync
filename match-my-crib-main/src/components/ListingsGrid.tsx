
import PropertyCard from '@/components/PropertyCard';
import ProfileCard from '@/components/ProfileCard';
import { UserType } from '@/hooks/useUserType';
import { properties, profiles } from '@/data/mockData';

interface ListingsGridProps {
  userType: UserType;
  onItemClick: (name: string) => void;
}

const ListingsGrid = ({ userType, onItemClick }: ListingsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {userType === 'renter' ? (
        properties.map((property) => (
          <div 
            key={property.id} 
            onClick={() => onItemClick(property.title)}
            className="cursor-pointer"
          >
            <PropertyCard {...property} />
          </div>
        ))
      ) : (
        profiles.map((profile) => (
          <div 
            key={profile.id} 
            onClick={() => onItemClick(profile.name)}
            className="cursor-pointer"
          >
            <ProfileCard {...profile} />
          </div>
        ))
      )}
    </div>
  );
};

export default ListingsGrid;
