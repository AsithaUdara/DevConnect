// src/components/landing/HeroVisual.tsx
'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const visualVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 } }
};

// Animation for the background grid lines
const gridLineVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
        pathLength: 1,
        opacity: [0, 0.3, 0], // Fade in and out
        transition: {
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 2 // Delay between repetitions
        }
    }
};

const HeroVisual = () => {
    return (
        <motion.div
            className="relative w-full max-w-md lg:max-w-lg aspect-[5/4] lg:aspect-square"
            initial="hidden"
            animate="visible"
            variants={visualVariants}
        >
            {/* Base Background Shape */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-50 via-white to-blue-100/60 opacity-70 shadow-xl border border-gray-100/80 overflow-hidden">

                {/* Animated Grid Background */}
                <svg width="100%" height="100%" className="absolute inset-0 opacity-80">
                    <defs>
                        <pattern id="animatedGrid" patternUnits="userSpaceOnUse" width="60" height="60" patternTransform="scale(1) rotate(0)">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(200, 210, 230, 0.2)" strokeWidth="1"/>
                            {/* Animated Line 1 */}
                            <motion.path
                                d="M 0 10 l 60 0"
                                stroke="rgba(150, 180, 230, 0.4)"
                                strokeWidth="1"
                                variants={gridLineVariants}
                                initial="initial"
                                animate="animate"
                            />
                             {/* Animated Line 2 (Corrected Transition) */}
                             <motion.path
                                d="M 15 0 l 0 60"
                                stroke="rgba(150, 180, 230, 0.3)"
                                strokeWidth="1"
                                variants={gridLineVariants} // Apply base variants
                                initial="initial"
                                animate="animate"
                                transition={{ // Override transition directly
                                    duration: 3,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                    repeatDelay: 2,
                                    delay: 1.5 // Specific delay for this line
                                }}
                            />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#animatedGrid)" />
                </svg>

                {/* Content Area with SVG Image */}
                <div className="absolute inset-0 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
                    <motion.div
                        className="relative w-full h-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                    >
                        <Image
                            src="/content-creator.svg"
                            alt="Content creator illustration for DevConnect"
                            fill
                            style={{ objectFit: 'contain' }}
                            priority
                        />
                     </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
export default HeroVisual;