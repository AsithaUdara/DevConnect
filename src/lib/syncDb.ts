// src/lib/syncDb.ts
// IMPORTANT: Run this MANUALLY during development ONLY (npm run db:sync)

// *** Import the initialized Sequelize instance ***
import sequelize from './sequelize'; // Correctly imports the default export from sequelize.ts

// Import models to ensure they are registered with Sequelize before syncing
import User from '@/models/User';
import Post from '@/models/Post';

const syncDatabase = async () => {
  // --- NODE_ENV CHECK (Temporarily Commented Out for Manual Run) ---
  /*
  if (process.env.NODE_ENV !== 'development') {
    console.warn('⚠️ Database sync is disabled outside the "development" environment.');
    console.warn('If you need to run this again, temporarily remove this check or set NODE_ENV=development.');
    return; // Exit if not development
  }
  */
  // --- END NODE_ENV CHECK ---

  console.log(`🔄 Attempting sync for database specified in DATABASE_URL...`);
  console.log(`   (Using URL: ${process.env.DATABASE_URL})`);
  // *** Use force: true ONLY FOR THIS TEST RUN ***
  console.log('   Using Sequelize sync({ force: true }) -- CAUTION: DROPS EXISTING TABLES --');

  try {
    // Test connection using the imported instance
    await sequelize.authenticate();
    console.log('   Connection verified before sync.');

    // Use the imported instance for sync
    await sequelize.sync({
      force: true, // Drops tables first! Use with caution.
      logging: (sql: string, timing?: number) => { // Added types for parameters
        console.log(`[SYNC SQL] (${timing ?? '?'}ms) ${sql}`); // Use ?? for optional timing
      }
     });

    console.log('✅ Database FORCED synchronized successfully via Sequelize sync.');

  } catch (error) {
    console.error('❌ Error synchronizing database via Sequelize sync:', error);
    if (error instanceof Error && 'original' in error) {
        console.error('   Original Error:', (error as any).original);
    }
  } finally {
    // console.log('Closing database connection...');
    // await sequelize.close();
  }
};

// Call the async function
syncDatabase();