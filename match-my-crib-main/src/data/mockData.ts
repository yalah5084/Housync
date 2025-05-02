
import { PropertyProps, ProfileProps } from '@/types/property';

export const properties: PropertyProps[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    price: 1850,
    location: 'Downtown, New York',
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 950,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    matchPercentage: 95,
  },
  {
    id: '2',
    title: 'Spacious Garden Townhouse',
    price: 2200,
    location: 'Uptown, New York',
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1250,
    imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    matchPercentage: 88,
  },
  {
    id: '3',
    title: 'Cozy Studio Near Park',
    price: 1500,
    location: 'Midtown, New York',
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 650,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    matchPercentage: 79,
  },
];

export const profiles: ProfileProps[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    location: 'New York, NY',
    occupation: 'Software Engineer',
    moveInDate: 'Next month',
    preferences: ['Pet-friendly', 'Near transit', 'Gym'],
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    matchPercentage: 92,
  },
  {
    id: '2',
    name: 'Samantha Lee',
    location: 'New York, NY',
    occupation: 'Graphic Designer',
    moveInDate: 'ASAP',
    preferences: ['Furnished', 'Utilities included', 'Quiet'],
    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    matchPercentage: 87,
  },
  {
    id: '3',
    name: 'Michael Rivera',
    location: 'New York, NY',
    occupation: 'Marketing Manager',
    moveInDate: '2-3 months',
    preferences: ['Outdoor space', 'Modern', 'Parking'],
    avatarUrl: 'https://randomuser.me/api/portraits/men/67.jpg',
    matchPercentage: 76,
  },
];
