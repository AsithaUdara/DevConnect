// src/lib/mockData.ts
import { Post } from '@/types';

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Setting up Next.js with App Router',
    description: 'A quick guide on initializing a new Next.js project using the App Router and TypeScript.',
    createdAt: '2023-10-26T10:00:00Z',
    authorName: 'Alice Dev',
  },
  {
    id: '2',
    title: 'Elegant Styling with Tailwind CSS',
    description: 'Exploring utility-first CSS for creating professional and responsive user interfaces efficiently.',
    createdAt: '2023-10-25T14:30:00Z',
    authorName: 'Bob Coder',
  },
  {
    id: '3',
    title: 'Firebase Authentication Basics',
    description: 'Integrating email/password and Google Sign-In with Firebase in a web application.',
    createdAt: '2023-10-24T09:15:00Z',
    authorName: 'Charlie Stack',
  },
];