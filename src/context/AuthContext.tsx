// src/context/AuthContext.tsx
'use client'; // This context will be used in client components

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase'; // Import your initialized auth instance

// Define the shape of the context value
interface AuthContextType {
    user: FirebaseUser | null; // The Firebase user object or null
    loading: boolean;          // Loading state while checking auth status
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true, // Start in loading state
});

// Create the Provider component
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState(true); // Start loading

    useEffect(() => {
        // Subscribe to Firebase auth state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // console.log('Auth State Changed:', currentUser ? `User UID: ${currentUser.uid}` : 'No user');
            setUser(currentUser); // Update user state
            setLoading(false);   // Set loading to false once state is determined
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []); // Empty dependency array ensures this runs only once on mount

    const value = { user, loading };

    // Render children only after loading is complete to prevent flashes/layout shifts
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
            {/* Optionally show a loader while loading: */}
            {/* {loading && <GlobalLoader />} */}
        </AuthContext.Provider>
    );
};

// Custom hook to easily use the Auth context
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};