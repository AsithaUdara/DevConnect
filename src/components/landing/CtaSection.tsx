// src/components/landing/CtaSection.tsx
'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const itemVariants = { /* ... */ };

// --- NEW: Define Props ---
interface CtaSectionProps {
    onOpenSignupModal: () => void;
}

const CtaSection: React.FC<CtaSectionProps> = ({ onOpenSignupModal }) => { // Use prop
    const primaryButtonClasses = `inline-flex items-center justify-center bg-white text-black px-8 py-3 rounded-full text-lg font-semibold transition duration-200 ease-in-out shadow-lg hover:shadow-xl hover:bg-gray-200 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-black active:scale-[0.98]`;

    return (
         <section className="py-24 sm:py-32 bg-black text-white relative overflow-hidden">
            {/* ... (SVG background grid) ... */}
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <motion.div className="text-center max-w-2xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={itemVariants}>
                    <h2 className="text-4xl sm:text-5xl font-bold tracking-tight"> Join the DevConnect Community </h2>
                    <p className="mt-6 text-lg text-gray-300 leading-relaxed"> Sign up for free and start connecting with thousands of developers worldwide. Elevate your network and career. </p>
                    <div className="mt-10">
                        {/* Use button and onClick handler */}
                        <button onClick={onOpenSignupModal} className={primaryButtonClasses}>
                            Get Started for Free <ChevronRight className="inline ml-2 h-5 w-5" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
export default CtaSection;