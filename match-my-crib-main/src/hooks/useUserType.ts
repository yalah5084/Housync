
import { useState, useEffect } from 'react';

export type UserType = 'renter' | 'landlord';

export const useUserType = () => {
  const [userType, setUserType] = useState<UserType>(() => {
    const savedUserType = localStorage.getItem('userType');
    return (savedUserType as UserType) || 'renter';
  });

  useEffect(() => {
    localStorage.setItem('userType', userType);
  }, [userType]);

  return { userType, setUserType };
};
