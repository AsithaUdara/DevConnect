// src/lib/firebaseAdmin.ts
import * as admin from 'firebase-admin';
import { getAuth, Auth } from 'firebase-admin/auth'; // Import getAuth and Auth type

// Read environment variables
const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = (process.env.FIREBASE_PRIVATE_KEY ?? '').replace(/\\n/g, '\n');

let initialized = false;
let authInstance: Auth | null = null; // Variable to hold the auth instance

if (!projectId || !clientEmail || !privateKey) {
    console.error('CRITICAL: Firebase Admin SDK configuration missing in environment variables. Firebase Admin features WILL NOT WORK.');
    // No point initializing if config is missing
} else {
    // Initialize only if not already done
    if (!admin.apps.length) {
        try {
            console.log('Initializing Firebase Admin SDK...');
            admin.initializeApp({
                credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
            });
            initialized = true;
            console.log('🔥 Firebase Admin SDK initialized successfully.');
        } catch (error: any) {
            console.error('🔥 Firebase Admin SDK initialization error:', error.stack || error);
            // If init fails, features depending on it will fail later
        }
    } else {
        // Already initialized (e.g., due to hot reloading)
        initialized = true;
        console.log('🔥 Firebase Admin SDK already initialized.');
    }
}

// Get the auth instance IF initialization was successful
if (initialized && admin.apps[0]) {
    try {
        authInstance = getAuth(admin.apps[0]);
        console.log('🔑 Firebase Auth service obtained.');
    } catch(error) {
         console.error('🔥 Error getting Firebase Auth service:', error);
    }
} else {
     console.error('🔑 Could not obtain Firebase Auth service because Admin SDK did not initialize.');
}

// Export the auth instance directly (or null if init failed)
export const adminAuth = authInstance;
// Optionally export the raw admin object if needed elsewhere, but prefer exporting specific services
// export { admin };