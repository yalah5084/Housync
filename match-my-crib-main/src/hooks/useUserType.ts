
import { useState } from 'react';

export type UserType = 'renter' | 'landlord';

export const useUserType = () => {
  const [userType, setUserType] = useState<UserType>(() => {
    return localStorage.getItem('userType') as UserType || 'renter';
  });

  return { userType, setUserType };
};
