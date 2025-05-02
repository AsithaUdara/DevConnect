// src/models/User.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/lib/sequelize'; // Import the DEFAULT export instance
import Post from './Post'; // Import Post for association definition later

// Attributes interface
interface UserAttributes {
  id: number;
  firebaseUid: string; // Firebase Auth User ID (REQUIRED & UNIQUE)
  email: string;       // Email (REQUIRED & UNIQUE)
  name?: string;        // Optional: Name provided during signup
  profileImage?: string; // Optional
  createdAt?: Date;
  updatedAt?: Date;
}

// Creation attributes interface (some fields are optional during creation)
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'name' | 'profileImage' | 'createdAt' | 'updatedAt'> {}

// Sequelize Model definition
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public firebaseUid!: string;
  public email!: string;
  public name?: string;
  public profileImage?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define association property (for TypeScript IntelliSense)
  public readonly posts?: Post[]; // Array of Posts
}

// Initialize the Model
User.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  firebaseUid: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  name: { type: DataTypes.STRING, allowNull: true },
  profileImage: { type: DataTypes.STRING, allowNull: true, validate: { isUrl: true } },
}, {
  sequelize, // Pass the imported connection instance
  tableName: 'users', // Explicit table name
  // schema: 'public', // Explicit schema usually not needed if it's the default
  timestamps: true, // Enable createdAt/updatedAt
  underscored: true, // Use snake_case (e.g., firebase_uid, created_at) in DB
});

// Associations are defined in Post.ts after both models are initialized

export default User;