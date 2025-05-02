// src/models/Post.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/lib/sequelize'; // Import the DEFAULT export instance
import User from './User'; // Import User for association

// Attributes interface
interface PostAttributes {
  id: number;
  title: string;
  description: string;
  userId: number; // Foreign Key linking to User table's primary key (id)
  createdAt?: Date;
  updatedAt?: Date;
}

// Creation attributes interface
interface PostCreationAttributes extends Optional<PostAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// Sequelize Model definition
class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define association property (for TypeScript IntelliSense)
  public readonly author?: User;
}

// Initialize the Model
Post.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
  description: { type: DataTypes.TEXT, allowNull: false, validate: { notEmpty: true } },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Reference the User model directly
      key: 'id',     // The column in the User table to reference
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE', // If a User is deleted, their Posts are also deleted
  },
}, {
  sequelize, // Pass the imported connection instance
  tableName: 'posts', // Explicit table name
  // schema: 'public', // Explicit schema usually not needed
  timestamps: true, // Enable createdAt/updatedAt
  underscored: true, // Use user_id, created_at in DB
});

// --- Define Associations ---
// Place associations here, after both models are defined and initialized
User.hasMany(Post, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'posts',
});

Post.belongsTo(User, {
  targetKey: 'id',
  foreignKey: 'userId',
  as: 'author',
});
// --- End Associations ---

export default Post;