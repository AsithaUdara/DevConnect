// src/types/index.ts
export interface Post {
  // Match the structure returned by your Sequelize model/API
  id: number;          // Usually a number from the DB
  title: string;
  description: string;
  userId: number;      // The ID of the user who created it
  createdAt: string;   // ISO date string (e.g., "2023-10-27T10:00:00.000Z")
  updatedAt: string;   // ISO date string
  // Optional: Include author details if your API provides them
  author?: {
      id: number;
      name?: string;
      email: string;
  };
}