// src/components/auth/SignupModalContent.tsx
'use client';
import Link from 'next/link';
import { UserPlus, KeyRound, Mail, User, Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { auth } from '@/lib/firebase'; // Import auth
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; // Import functions

interface SignupModalContentProps {
    onSwitchToLogin: () => void;
    onSignupSuccess: () => void; // Just closes the modal
}

const SignupModalContent: React.FC<SignupModalContentProps> = ({ onSwitchToLogin, onSignupSuccess }) => {
    const [signupMessage, setSignupMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); // Add state for name
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);


    const primaryButtonClasses = "w-full inline-flex items-center justify-center whitespace-nowrap bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium ring-offset-background transition-colors duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 shadow-sm hover:shadow disabled:opacity-50";
    const googleButtonClasses = "w-full inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 border border-gray-300 bg-white text-black hover:bg-gray-100 px-5 py-2.5 shadow-sm hover:shadow disabled:opacity-50";

    // --- Handle Email/Password Signup ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSignupMessage(null);
        setLoading(true);

        // Basic password validation example (add more as needed)
        if (password.length < 6) {
            setError("Password should be at least 6 characters.");
            setLoading(false);
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // TODO: Optionally update the user's profile with the name immediately after signup if desired
            // await updateProfile(auth.currentUser, { displayName: name });

            console.log('Signup successful');
            setSignupMessage("Account created! You can now log in.");
            // Clear form? Optionally: setName(''); setEmail(''); setPassword('');
            setTimeout(() => {
                onSignupSuccess(); // Close modal after showing message
                // Do NOT automatically switch to login, let user click
            }, 2500);

        } catch (err: any) {
            console.error("Signup Error:", err);
             if (err.code === 'auth/email-already-in-use') {
                setError('This email address is already registered.');
            } else if (err.code === 'auth/invalid-email') {
                 setError('Please enter a valid email address.');
            } else if (err.code === 'auth/weak-password') {
                setError('Password is too weak (should be at least 6 characters).');
            } else {
                setError('Signup failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    // --- Handle Google Sign Up/In ---
    const handleGoogleSignIn = async () => {
         setError(null);
         setSignupMessage(null);
         setLoading(true);
         const provider = new GoogleAuthProvider();
         try {
             await signInWithPopup(auth, provider);
             console.log('Google Sign-up/in successful');
             // On success, the AuthProvider listener will handle the user state update
             // and the Navbar will update, so we just need to close the modal.
             onSignupSuccess(); // Close the signup modal
         } catch (err: any) {
             console.error("Google Sign-up/in Error:", err);
              if (err.code !== 'auth/popup-closed-by-user') {
                setError('Google Sign-up failed. Please try again.');
             }
         } finally {
             setLoading(false);
         }
    }

    return (
        <div className="space-y-6">
            {/* Message Area */}
             {error && <p className="text-sm text-center py-2 px-3 rounded-md bg-red-100 text-red-700">{error}</p>}
             {signupMessage && <p className="text-sm text-center py-2 px-3 rounded-md bg-green-100 text-green-700">{signupMessage}</p>}

            <form className="space-y-5" onSubmit={handleSubmit}>
                 {/* Name Input */}
                 <div>
                    <div className="relative mt-1">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                            <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input id="signup-name" name="name" type="text" required value={name} onChange={e => setName(e.target.value)}
                               className="block w-full rounded-lg border-gray-300 pl-10 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3"
                               placeholder="Full Name" disabled={loading}/>
                    </div>
                </div>
                 {/* Email Input */}
                 <div>
                    <div className="relative mt-1">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input id="signup-email" name="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)}
                               className="block w-full rounded-lg border-gray-300 pl-10 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3"
                               placeholder="Email address" disabled={loading}/>
                    </div>
                </div>
                 {/* Password Input */}
                 <div>
                   <div className="relative mt-1">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                            <KeyRound className="h-5 w-5 text-gray-400" />
                        </div>
                        <input id="signup-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" required value={password} onChange={e => setPassword(e.target.value)}
                               className="block w-full rounded-lg border-gray-300 pl-10 pr-10 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3"
                               placeholder="Create Password" disabled={loading}/>
                        <button type="button" onClick={() => setShowPassword(!showPassword)} disabled={loading}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 cursor-pointer focus:outline-none disabled:cursor-not-allowed"
                            aria-label={showPassword ? "Hide password" : "Show password"}>
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
                {/* Submit Button */}
                <button type="submit" className={primaryButtonClasses} disabled={loading}>
                    {loading ? 'Creating Account...' : <><UserPlus className="mr-2 h-4 w-4" /> Create Account</>}
                </button>
            </form>

            {/* Divider */}
            <div className="relative my-5">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
                <div className="relative flex justify-center text-xs"><span className="bg-white px-2 text-gray-500 uppercase">Or sign up with</span></div>
            </div>

            {/* Google Sign Up */}
             <button type="button" onClick={handleGoogleSignIn} className={googleButtonClasses} disabled={loading}>
                <svg className="mr-2" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '20px', width: '20px' }}><g fill="none" fillRule="nonzero"><path d="m31.36 16.36368c0-1.13456-.10176-2.22544-.29088-3.2728h-15.06912v6.18912h8.61088c-.37088 2-1.49808 3.69456-3.19264 4.82912v4.01456h5.17088c3.02544-2.78544 4.77088-6.88736 4.77088-11.76z" fill="#4285f4"></path><path d="m16 32c4.32 0 7.94176-1.4328 10.58896-3.87632l-5.17088-4.01456c-1.43264.96-3.26544 1.5272-5.41808 1.5272-4.16736 0-7.69456-2.81456-8.9528-6.59632h-5.34544v4.14544c2.6328 5.22912 8.04368 8.81456 14.29824 8.81456z" fill="#34a853"></path><path d="m7.0472 19.04c-.32-.96-.50176-1.98544-.50176-3.04s.18176-2.08.50176-3.04v-4.14544h-5.34544c-1.08352 2.16-1.70176 4.60368-1.70176 7.18544s.61824 5.02544 1.70176 7.18544z" fill="#fbbc04"></path><path d="m16 6.36368c2.34896 0 4.45808.8072 6.11632 2.39264l4.58912-4.58912c-2.77088-2.58176-6.3928-4.1672-10.70544-4.1672-6.25456 0-11.66544 3.58544-14.29824 8.81456l5.34544 4.14544c1.25824-3.78176 4.78544-6.59632 8.9528-6.59632z" fill="#e94235"></path></g></svg>
                {loading ? 'Signing up...' : 'Sign up with Google'}
            </button>

            {/* Switch to Log In */}
            <p className="mt-6 text-center text-xs text-gray-500">
                Already have an account?{' '}
                <button onClick={onSwitchToLogin} disabled={loading} className="font-medium text-blue-600 hover:text-blue-700 hover:underline focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed">
                    Log in
                </button>
            </p>
        </div>
    );
}
export default SignupModalContent;