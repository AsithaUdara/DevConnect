// src/components/layout/Navbar.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut } from 'lucide-react';
// Remove Modal imports from here, they belong in page.tsx
// import Modal from '@/components/ui/Modal';
// import LoginModalContent from '@/components/auth/LoginModalContent';
// import SignupModalContent from '@/components/auth/SignupModalContent';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

// Define Props
interface NavbarProps {
    onOpenLoginModal: () => void;
    onOpenSignupModal: () => void;
}

// Use Props
export default function Navbar({ onOpenLoginModal, onOpenSignupModal }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        setIsMobileMenuOpen(false);
        try { await signOut(auth); router.push('/'); }
        catch (error) { console.error("Logout Error:", error); }
    };

    const navbarClasses = `fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg transition-all duration-300 ${isScrolled ? 'shadow-sm border-b border-gray-100 py-3' : 'py-4 border-b border-transparent'}`;
    const primaryButtonClasses = "inline-flex items-center justify-center whitespace-nowrap bg-black text-white px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2";
    const textLinkClasses = "text-sm font-medium text-gray-700 hover:text-black transition-colors duration-150 ease-in-out cursor-pointer";
    const logoutButtonClasses = "text-sm font-medium text-gray-700 hover:text-red-600 transition-colors duration-150 ease-in-out cursor-pointer";

    const triggerLoginModal = () => { setIsMobileMenuOpen(false); onOpenLoginModal(); }
    const triggerSignupModal = () => { setIsMobileMenuOpen(false); onOpenSignupModal(); }

    // --- Wrap return in Fragment ---
    return (
        <> {/* <-- START FRAGMENT WRAPPER */}
            <header className={navbarClasses}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14">
                        <Link href="/" className="flex items-center flex-shrink-0" aria-label="DevConnect Home">
                            <span className="text-xl font-bold text-black tracking-tight"> DevConnect </span>
                        </Link>
                        <nav className="hidden md:flex items-center space-x-8">
                            <Link href="/#features" className={textLinkClasses}> Features </Link>
                            <Link href="/#testimonials" className={textLinkClasses}> Testimonials </Link>
                            {!loading && !user && (
                                <>
                                    <button onClick={onOpenLoginModal} className={textLinkClasses}> Login </button>
                                    <button onClick={onOpenSignupModal} className={primaryButtonClasses}> Sign Up </button>
                                </>
                            )}
                            {!loading && user && (
                                 <>
                                    <Link href="/dashboard" className={textLinkClasses}> Dashboard </Link>
                                    <button onClick={handleLogout} className={logoutButtonClasses}> <LogOut className="inline h-4 w-4 mr-1" /> Logout </button>
                                 </>
                            )}
                             {loading && <span className="text-sm text-gray-500 animate-pulse">Loading...</span>}
                        </nav>
                        <div className="md:hidden">
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu" className="text-black focus:outline-none p-1 -mr-1">
                                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </div>
                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div key="mobile-menu" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="md:hidden absolute top-full left-0 right-0 bg-white border-y border-gray-100 shadow-lg overflow-hidden">
                             <div className="flex flex-col px-4 pt-3 pb-4 space-y-2">
                                <Link href="/#features" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md" onClick={() => setIsMobileMenuOpen(false)}> Features </Link>
                                <Link href="/#testimonials" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md" onClick={() => setIsMobileMenuOpen(false)}> Testimonials </Link>
                                {!loading && !user && (
                                     <>
                                        <button onClick={triggerLoginModal} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"> Login </button>
                                        <button onClick={triggerSignupModal} className={`${primaryButtonClasses} w-full mt-3 text-center`}> Sign Up </button>
                                     </>
                                )}
                                 {!loading && user && (
                                     <>
                                         <Link href="/dashboard" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md" onClick={() => setIsMobileMenuOpen(false)}> Dashboard </Link>
                                         <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md"> Logout </button>
                                     </>
                                 )}
                                  {loading && <span className="block px-3 py-2 text-base font-medium text-gray-500">Loading...</span>}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            

        </> 
    );
}