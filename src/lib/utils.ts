import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const mockDoctors = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    specialty: 'Cardiologist',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&h=400&fit=crop',
    isOnline: true,
  },
  {
    id: 2,
    name: 'Dr. Michael Patel',
    specialty: 'Neurologist',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&h=400&fit=crop',
    isOnline: true,
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Dermatologist',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&h=400&fit=crop',
    isOnline: false,
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: 'Pediatrician',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&h=400&fit=crop',
    isOnline: true,
  },
  {
    id: 5,
    name: 'Dr. Lisa Thompson',
    specialty: 'Psychiatrist',
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=400&h=400&fit=crop',
    isOnline: false,
  }
];