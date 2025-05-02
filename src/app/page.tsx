// src/app/page.tsx
'use client'; // Need client component for state and handlers

import { useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CtaSection from "@/components/landing/CtaSection";

// Import Modal components (assuming they are needed at this level)
import Modal from '@/components/ui/Modal';
import LoginModalContent from '@/components/auth/LoginModalContent';
import SignupModalContent from '@/components/auth/SignupModalContent';

import { useRouter } from 'next/navigation'; // Import router for navigation

export default function Home() {
    // --- State for Modals ---
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
    const router = useRouter();

    // --- Modal Control Functions ---
    const openLoginModal = () => { setIsSignupModalOpen(false); setIsLoginModalOpen(true); };
    const closeLoginModal = () => setIsLoginModalOpen(false);
    const openSignupModal = () => { setIsLoginModalOpen(false); setIsSignupModalOpen(true); };
    const closeSignupModal = () => setIsSignupModalOpen(false);

    // Handlers for switching between modals
    const switchToLogin = () => {
        closeSignupModal();
        setTimeout(openLoginModal, 150); // Small delay for smooth transition
    };
    const switchToSignup = () => {
        closeLoginModal();
        setTimeout(openSignupModal, 150);
    };

    // Handler for successful login (from LoginModalContent)
    const handleLoginSuccess = () => {
        closeLoginModal();
        router.push('/dashboard'); // Navigate to dashboard on successful login
    }

    // Handler for successful signup (from SignupModalContent)
    // Now just switches to login modal
    const handleSignupCompleteAndSwitch = () => {
        closeSignupModal();
        openLoginModal();
    }

    return (
        <> {/* Use Fragment to render page sections and modals */}
            <div className="min-h-screen bg-white text-black font-sans antialiased flex flex-col">
                 {/* Pass modal control functions to Navbar */}
                <Navbar
                    onOpenLoginModal={openLoginModal}
                    onOpenSignupModal={openSignupModal}
                 />
                <main className="flex-grow"> {/* Ensure main takes up space */}
                    {/* Pass modal control functions to HeroSection */}
                    <HeroSection
                        onOpenLoginModal={openLoginModal}
                        onOpenSignupModal={openSignupModal}
                     />
                    <StatsSection />
                    <FeaturesSection />
                    <TestimonialsSection />
                    {/* Pass signup modal control to CTA */}
                    <CtaSection onOpenSignupModal={openSignupModal}/>
                </main>
                <Footer />
            </div>

             {/* Render Modals globally controlled by this page's state */}
            <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal} title="Log in to DevConnect">
                <LoginModalContent onSwitchToSignup={switchToSignup} onLoginSuccess={handleLoginSuccess} />
            </Modal>

            <Modal isOpen={isSignupModalOpen} onClose={closeSignupModal} title="Create your DevConnect Account">
                <SignupModalContent onSwitchToLogin={switchToLogin} onSignupSuccess={handleSignupCompleteAndSwitch} />
            </Modal>
        </>
    );
}