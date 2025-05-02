// src/components/layout/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Use App Router navigation
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth'; // Firebase function
import { auth } from '@/lib/firebase'; // Your initialized Firebase auth instance
import { useAuth } from '@/context/AuthContext'; // Your Auth context hook
import Modal from '@/components/ui/Modal'; // Your Modal component
import LoginModalContent from '@/components/auth/LoginModalContent'; // Your Login form
import SignupModalContent from '@/components/auth/SignupModalContent'; // Your Signup form

export default function Navbar() {
    // --- State Hooks ---
    const [isScrolled, setIsScrolled] = useState(false); // Tracks scroll position for styling
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Toggles mobile menu visibility
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // Toggles login modal visibility
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false); // Toggles signup modal visibility

    // --- Context & Router ---
    const { user, loading } = useAuth(); // Get authentication status and user data
    const router = useRouter(); // For navigation after actions like logout

    // --- Effects ---
    // Effect to handle navbar style change on scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        // Cleanup listener on component unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // --- Modal Control Functions ---
    const openLoginModal = () => {
        setIsSignupModalOpen(false); // Ensure signup is closed
        setIsLoginModalOpen(true);
        setIsMobileMenuOpen(false); // Close mobile menu if open
    };
    const closeLoginModal = () => setIsLoginModalOpen(false);

    const openSignupModal = () => {
        setIsLoginModalOpen(false); // Ensure login is closed
        setIsSignupModalOpen(true);
        setIsMobileMenuOpen(false); // Close mobile menu if open
    };
    const closeSignupModal = () => setIsSignupModalOpen(false);

    // Switch between modals with a slight delay for smoother transition
    const switchToLogin = () => {
        closeSignupModal();
        setTimeout(openLoginModal, 150);
    };
    const switchToSignup = () => {
        closeLoginModal();
        setTimeout(openSignupModal, 150);
    };

    // --- Action Handlers ---
    // Called from LoginModalContent on successful Firebase login
    const handleLoginSuccess = () => {
        closeLoginModal();
        // Redirect is usually handled by monitoring 'user' state change from AuthProvider
        // Optionally, force redirect here if needed: router.push('/dashboard');
    };

    // Called from SignupModalContent on successful Firebase signup
    const handleSignupSuccess = () => {
        closeSignupModal();
        // User needs to manually log in after signup
    };

    // Handles Firebase signout
    const handleLogout = async () => {
        setIsMobileMenuOpen(false);
        try {
            await signOut(auth);
            console.log('Logout successful');
            router.push('/'); // Redirect to homepage after logout
        } catch (error) {
            console.error("Logout Error:", error);
            // TODO: Implement user-facing error notification (e.g., toast)
        }
    };

    // --- Style Definitions ---
    // Dynamic classes for the header based on scroll position
    const navbarClasses = `fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg transition-all duration-300 ease-out ${
        isScrolled ? 'shadow-sm border-b border-gray-100 py-3' : 'py-4 border-b border-transparent'
    }`;

    // Reusable button/link styles for consistency
    const primaryButtonClasses = "inline-flex items-center justify-center whitespace-nowrap bg-black text-white px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2";
    const textLinkClasses = "text-sm font-medium text-gray-700 hover:text-black transition-colors duration-150 ease-in-out cursor-pointer";
    const logoutButtonClasses = "text-sm font-medium text-gray-700 hover:text-red-600 transition-colors duration-150 ease-in-out cursor-pointer";

    // --- Render Logic ---
    return (
        <> {/* Fragment allows rendering Navbar and Modals as siblings */}
            <header className={navbarClasses}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14"> {/* Consistent height */}

                        {/* Logo */}
                        <Link href="/" className="flex items-center flex-shrink-0" aria-label="DevConnect Home">
                            {/* Optional: Replace with SVG Logo */}
                            <span className="text-xl font-bold text-black tracking-tight"> DevConnect </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            <Link href="/about" className={textLinkClasses}> About </Link>
                            <Link href="/#features" className={textLinkClasses}> Features </Link>
                            <Link href="/#testimonials" className={textLinkClasses}> Testimonials </Link>

                            {/* Conditional Auth Links/Buttons */}
                            {loading ? (
                                <span className="text-sm text-gray-400 animate-pulse">Loading...</span>
                            ) : user ? (
                                // Logged In State
                                <>
                                    <Link href="/dashboard" className={textLinkClasses}> Dashboard </Link>
                                    <button onClick={handleLogout} className={logoutButtonClasses} aria-label="Logout">
                                        <LogOut className="inline h-4 w-4 mr-1" /> Logout
                                    </button>
                                </>
                            ) : (
                                // Logged Out State
                                <>
                                    <button onClick={openLoginModal} className={textLinkClasses}> Login </button>
                                    <button onClick={openSignupModal} className={primaryButtonClasses}> Sign Up </button>
                                </>
                            )}
                        </nav>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label="Toggle mobile menu"
                                className="text-black focus:outline-none p-1 -mr-1" // Ensure adequate tap target
                            >
                                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Menu (Animated) */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            key="mobile-menu"
                            initial={{ opacity: 0, y: -10 }} // Start slightly above
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            // Position absolutely below the header
                            className="md:hidden absolute top-full left-0 right-0 bg-white border-y border-gray-100 shadow-lg overflow-hidden"
                        >
                            <div className="flex flex-col px-4 pt-3 pb-4 space-y-2">
                                <Link href="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md" onClick={() => setIsMobileMenuOpen(false)}> About </Link>
                                <Link href="/#features" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md" onClick={() => setIsMobileMenuOpen(false)}> Features </Link>
                                <Link href="/#testimonials" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md" onClick={() => setIsMobileMenuOpen(false)}> Testimonials </Link>

                                {/* Conditional Auth Links/Buttons for Mobile */}
                                {loading ? (
                                     <span className="block px-3 py-2 text-base font-medium text-gray-400">Loading...</span>
                                ) : user ? (
                                    // Logged In State (Mobile)
                                    <>
                                        <Link href="/dashboard" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md" onClick={() => setIsMobileMenuOpen(false)}> Dashboard </Link>
                                        <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md"> Logout </button>
                                    </>
                                ) : (
                                    // Logged Out State (Mobile)
                                    <>
                                        <button onClick={openLoginModal} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"> Login </button>
                                        <button onClick={openSignupModal} className={`${primaryButtonClasses} w-full mt-3 text-center`}> Sign Up </button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* --- Render Modals --- */}
            {/* These live outside the header but are controlled by its state */}
            <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal} title="Log in to DevConnect">
                <LoginModalContent onSwitchToSignup={switchToSignup} onLoginSuccess={handleLoginSuccess} />
            </Modal>

            <Modal isOpen={isSignupModalOpen} onClose={closeSignupModal} title="Create your DevConnect Account">
                <SignupModalContent onSwitchToLogin={switchToLogin} onSignupSuccess={handleSignupSuccess} />
            </Modal>
        </>
    );
}