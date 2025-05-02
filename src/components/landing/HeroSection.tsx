// src/components/landing/HeroSection.tsx
'use client';
import Link from 'next/link'; // Keep Link for Explore Features
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import SubtleGridPattern from '@/components/ui/SubtleGridPattern';
import Image from 'next/image';

// Animation Variants (Keep as before)
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };
const visualVariants = { hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 } } };

// Button Styles (Keep as before)
// Primary button will be used for "Join DevConnect" (triggers Signup)
const primaryButtonClasses = "inline-flex items-center justify-center whitespace-nowrap bg-black text-white px-7 py-3 rounded-full text-base font-medium transition-colors duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 shadow hover:shadow-md transform active:scale-[0.98]";
// Outline button will be used for "Explore Features" (links internally)
const outlineButtonClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-medium transition-colors duration-200 ease-in-out border border-gray-300 bg-white text-black hover:bg-gray-100 px-7 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:scale-[0.98]";

// Props for triggering modals - Only Signup needed from Hero now
interface HeroSectionProps {
    // onOpenLoginModal: () => void; // Remove if login isn't triggered from here
    onOpenSignupModal: () => void; // Keep signup trigger
}

// Use updated props
const HeroSection: React.FC<HeroSectionProps> = ({ onOpenSignupModal }) => {
    return (
        <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 bg-white overflow-hidden">
             <SubtleGridPattern className="absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]" />

             <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Text Content */}
                    <motion.div
                        className="text-center lg:text-left"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={containerVariants}
                    >
                        <motion.h1
                            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-black tracking-tighter leading-none sm:leading-tight"
                            variants={itemVariants}
                        >
                            Where Developers Connect<span className="text-blue-600">.</span>
                        </motion.h1>
                        <motion.p
                            className="mt-6 text-lg sm:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                            variants={itemVariants}
                        >
                            Share insights, showcase projects, and build your professional network on a platform designed for tech professionals.
                        </motion.p>
                        <motion.div
                            className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
                            variants={itemVariants}
                        >
                             {/* --- UPDATED BUTTONS --- */}
                             {/* Primary button now "Join DevConnect", triggers SIGNUP modal */}
                            <button onClick={onOpenSignupModal} className={primaryButtonClasses}>
                                Join DevConnect <ChevronRight className="ml-1.5 h-5 w-5" />
                            </button>
                             {/* Secondary button links to features section */}
                            <Link href="/#features" className={outlineButtonClasses}>
                                Explore Features
                            </Link>
                            {/* Removed the Login button from here */}
                        </motion.div>
                    </motion.div>

                     {/* Direct SVG Visual Placement */}
                     <motion.div
                         className="relative mt-12 lg:mt-0 h-72 sm:h-96 lg:h-[500px] flex justify-center lg:justify-end items-center"
                         initial="hidden"
                         whileInView="visible"
                         viewport={{ once: true, amount: 0.3 }}
                         variants={visualVariants}
                     >
                        <Image
                            src="/content-creator.svg"
                            alt="Developer collaboration illustration"
                            width={500}
                            height={450}
                            className="max-w-full h-auto lg:max-w-[500px] object-contain"
                            priority
                        />
                     </motion.div>
                </div>
            </div>
        </section>
    );
}
export default HeroSection;