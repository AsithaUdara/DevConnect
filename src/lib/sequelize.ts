// src/lib/sequelize.ts - REVERTED TO DIRECT EXPORT
import { Sequelize } from 'sequelize';
import pg from 'pg'; // Keep driver import

const databaseUrl = process.env.DATABASE_URL; // Reads from .env.local

if (!databaseUrl) {
  console.error("❌ DATABASE_URL environment variable is not set.");
  throw new Error("Database configuration error.");
}

const requiresSsl = !databaseUrl.includes('localhost');
console.log(`Attempting to connect to database... (SSL ${requiresSsl ? 'Enabled' : 'Disabled'})`);

// Create the instance directly
const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  dialectModule: pg, // Keep explicit driver
  logging: process.env.NODE_ENV === 'development' ? (sql, timing) => {
     console.log(`SQL (${timing}ms): ${sql.substring(0, 500)}${sql.length > 500 ? '...' : ''}`);
  } : false,
  dialectOptions: requiresSsl ? {
    ssl: { require: true, rejectUnauthorized: false }
  } : {},
  pool: { max: 5, min: 0, acquire: 30000, idle: 10000 } // Optional pooling
});

// Define the test function
const testDbConnection = async () => {
  try {
    // Use the globally defined sequelize instance
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    if (requiresSsl && error instanceof Error && error.message.includes('SSL')) {
       console.error('💡 Hint: Check SSL configuration for cloud database.');
    }
  }
};

// Call the test function
testDbConnection();

// Export the instance as default again
export default sequelize;