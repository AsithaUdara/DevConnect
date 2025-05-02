// src/components/landing/CtaSection.tsx
'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } } };
const primaryButtonClasses = "inline-flex items-center justify-center whitespace-nowrap bg-white text-black px-8 py-3 rounded-full text-base font-semibold transition duration-200 ease-in-out shadow-md hover:shadow-lg hover:bg-gray-200 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-black active:scale-[0.98]"; // Rounded full

const CtaSection = () => {
    return (
         <section className="py-24 sm:py-32 bg-black text-white relative overflow-hidden">
            {/* Optional: Subtle dark grid */}
            {/* <svg aria-hidden="true" className="absolute inset-0 h-full w-full stroke-white/10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"><defs><pattern id="dark-grid-cta" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M0 60V0h60" fill="none" strokeDasharray="4 2" /></pattern></defs><rect width="100%" height="100%" strokeWidth={0} fill="url(#dark-grid-cta)" /></svg> */}

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <motion.div className="text-center max-w-2xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={itemVariants}>
                    <h2 className="text-4xl sm:text-5xl font-bold tracking-tight"> Ready to Connect? </h2>
                    <p className="mt-6 text-lg text-gray-300 leading-relaxed"> Join thousands of developers building their network, sharing knowledge, and growing their careers on DevConnect. </p>
                    <div className="mt-10">
                        <Link href="/auth/signup" className={primaryButtonClasses}>
                            Sign Up For Free <ChevronRight className="ml-1.5 h-5 w-5" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
export default CtaSection;