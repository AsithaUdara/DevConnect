// src/components/landing/HeroSection.tsx
'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import SubtleGridPattern from '@/components/ui/SubtleGridPattern'; // Keep grid pattern if desired
import Image from 'next/image'; // Import Image directly here

// Animation Variants
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };
const visualVariants = { hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 } } };

// Button Styles
const primaryButtonClasses = "inline-flex items-center justify-center whitespace-nowrap bg-black text-white px-7 py-3 rounded-full text-base font-medium transition-colors duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 shadow hover:shadow-md transform active:scale-[0.98]";
const outlineButtonClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-medium transition-colors duration-200 ease-in-out border border-gray-300 bg-white text-black hover:bg-gray-100 px-7 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:scale-[0.98]";

const HeroSection = () => {
    return (
        <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 bg-white overflow-hidden">
             {/* Optional Grid pattern background */}
             <SubtleGridPattern className="absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]" />

             <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"> {/* Adjusted gap */}
                    {/* Text Content */}
                    <motion.div
                        className="text-center lg:text-left"
                        initial="hidden"
                        animate="visible"
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
                            <Link href="/auth/signup" className={primaryButtonClasses}>
                                Join DevConnect <ChevronRight className="ml-1.5 h-5 w-5" />
                            </Link>
                            <Link href="/#features" className={outlineButtonClasses}>
                                Explore Features
                            </Link>
                        </motion.div>
                    </motion.div>

                     {/* Direct SVG Visual Placement */}
                     <motion.div
                         className="relative mt-12 lg:mt-0 h-72 sm:h-96 lg:h-[500px] flex justify-center lg:justify-end items-center" // Adjusted height
                         initial="hidden"
                         animate="visible"
                         variants={visualVariants}
                     >
                        {/* The Image component for the SVG */}
                        <Image
                            src="/content-creator.svg" // Ensure this is in /public
                            alt="Developer collaboration and content creation illustration"
                            width={500} // Intrinsic width (adjust based on SVG)
                            height={450} // Intrinsic height (adjust based on SVG)
                            className="max-w-full h-auto lg:max-w-[500px] object-contain" // Responsive sizing
                            priority
                        />
                     </motion.div>
                </div>
            </div>
        </section>
    );
}
export default HeroSection;