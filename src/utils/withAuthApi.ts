// src/utils/withAuthApi.ts
import 'dotenv/config'; // Ensure env vars are loaded
import { type NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebaseAdmin'; // Import the initialized auth service
import User from '@/models/User'; // Model definition needs access to the instance via its own import
import { getSequelizeInstance } from '@/lib/sequelize'; // Import the function to get instance
import type { DecodedIdToken } from 'firebase-admin/auth';

// Extend NextRequest interface
export interface NextRequestWithUser extends NextRequest {
    user: {
        firebaseUid: string;
        dbUserId: number;
        token: DecodedIdToken;
    }
}

type ApiHandler<T = any> = ( req: NextRequestWithUser, context?: T ) => Promise<NextResponse> | NextResponse;

export function withAuthApi<T = any>(handler: ApiHandler<T>) {
    return async (req: NextRequest, context?: T): Promise<NextResponse> => {

        // --- Get Sequelize Instance EARLY ---
        let sequelize; // Variable to hold the instance for this request
        try {
            // Call the function to get/create the instance for THIS request
            sequelize = await getSequelizeInstance();
            console.log("API Auth: Acquired valid Sequelize instance for request.");
        } catch (dbError) {
             console.error("API Auth: Failed to get valid Sequelize instance:", dbError);
             return NextResponse.json({ message: 'Database service unavailable' }, { status: 503 });
        }
        // --- END Sequelize Check ---


        const authorization = req.headers.get('Authorization');
        const idToken = authorization?.startsWith('Bearer ') ? authorization.split('Bearer ')[1] : null;

        if (!idToken) {
            console.warn('API Auth: Missing or invalid Authorization token.');
            return NextResponse.json({ message: 'Unauthorized: Missing or invalid token' }, { status: 401 });
        }


        try {
            // Check if Firebase Auth service is available
            if (!adminAuth) {
                 console.error("API Auth: Firebase Auth service is not available.");
                 return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
            }

            // Verify Firebase Token
            const decodedToken = await adminAuth.verifyIdToken(idToken);
            const firebaseUid = decodedToken.uid;
            const userEmail = decodedToken.email;

            if (!userEmail) {
                console.error(`API Auth: Email missing from token for user ${firebaseUid}.`);
                return NextResponse.json({ message: 'Unauthorized: User email information missing' }, { status: 403 });
            }

            // --- Logging before DB Call ---
            console.log(`API Auth: Attempting User.findOrCreate for firebaseUid: ${firebaseUid}`);
            console.log(`API Auth: User model table name from definition: ${User.getTableName()}`); // Use static method

            // --- Find or Create User in Your Database ---
            // User model implicitly uses the sequelize instance it was initialized with,
            // which should be stable now after getSequelizeInstance() resolved.
            const [dbUser, created] = await User.findOrCreate({
                where: { firebaseUid: firebaseUid },
                defaults: {
                    firebaseUid: firebaseUid,
                    email: userEmail,
                    // name: decodedToken.name || undefined
                },
                // logging: (sql, timing) => console.log(`API Auth SQL: ${sql} (${timing}ms)`) // Enable verbose SQL logging if needed
            });

            if (created) { console.log(`API Auth: Created user ${firebaseUid} in DB with ID ${dbUser.id}`); }
            else { /* ... email update check ... */
                if (dbUser.email !== userEmail) {
                    console.warn(`API Auth: Email mismatch for ${firebaseUid}. Updating DB.`);
                    await dbUser.update({ email: userEmail });
                 }
            }

            // --- Attach user info to the request ---
            (req as NextRequestWithUser).user = {
                firebaseUid: firebaseUid,
                dbUserId: dbUser.id, // Crucial: Use YOUR database user ID
                token: decodedToken
            };

            // --- Proceed to the actual API handler ---
            console.log(`API Auth: Authentication successful for user ${dbUser.id}, proceeding to handler...`);
            return handler(req as NextRequestWithUser, context);

        } catch (error: any) {
             // --- Enhanced Catch Block ---
             console.error('API Auth Error Name:', error.name);
             console.error('API Auth Error Code:', error.code);
             console.error('API Auth Error Message:', error.message);
             if (error.parent) console.error('API Auth Error Parent:', error.parent);
             if (error.original) console.error('API Auth Error Original:', error.original);
             if (error.sql) console.error('API Auth Error SQL:', error.sql);

             let status = 500;
             let message = 'An internal server error occurred during authentication.';

             if (error instanceof Error && error.message.includes('relation') && error.message.includes('does not exist')) { message = 'Database error: Required relation not found.'; }
             else if (error.name === 'SequelizeConnectionError' || error.message?.includes('connect ECONNREFUSED')) { message = 'Database connection failed.'; }
             else if (error.code === 'auth/id-token-expired') { status = 401; message = 'Authentication token expired.'; }
             else if (error.code?.startsWith('auth/')) { status = 401; message = 'Invalid authentication token.'; }

             return NextResponse.json({ message: message, detail: error.message }, { status }); // Include detail for debugging
        }
    };
}