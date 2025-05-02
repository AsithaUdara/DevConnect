// src/components/landing/StatsSection.tsx
'use client';
import { useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const stats = [
    { value: '0.5', label: 'Developers Active', target: 50 },
    { value: '0.1', label: 'Posts Shared Monthly', target: 100 },
    { value: '0.2+', label: 'Projects Showcased', target: 20 },
    { value: '92%', label: 'User Satisfaction', target: 92 },
];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }; // Just stagger
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } } };

interface AnimatedStatProps { target: number; label: string; duration?: number; }
function AnimatedStatNumber({ target, label, duration = 1.5 }: AnimatedStatProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px 0px -50px 0px" });
    useEffect(() => {
        if (isInView && ref.current) {
            animate(0, target, {
                duration: duration, ease: "easeOut",
                onUpdate(latest) {
                    if (ref.current) {
                        const formattedNumber = Math.round(latest).toLocaleString();
                        const suffix = label === '%' ? '%' : (label.includes('K') ? 'K+' : (label.includes('+') ? '+' : ''));
                        ref.current.textContent = formattedNumber + suffix;
                    }
                }
            });
        }
    }, [isInView, target, duration, label]);
    const initialSuffix = label === '%' ? '%' : (label.includes('K') ? 'K+' : (label.includes('+') ? '+' : ''));
    return <span ref={ref}>0{initialSuffix}</span>;
}

const StatsSection = () => {
    const sectionRef = useRef(null);
    const isSectionInView = useInView(sectionRef, { once: true, amount: 0.3 });

    return (
         // Cleaner background, more padding
         <section ref={sectionRef} className="py-20 sm:py-28 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
                    initial="hidden"
                    animate={isSectionInView ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    {stats.map((stat, index) => (
                        <motion.div key={stat.label + index} variants={itemVariants}>
                            <div className="text-4xl sm:text-5xl font-bold text-blue-600"> {/* Accent color for number */}
                                <AnimatedStatNumber target={stat.target} label={stat.value.includes('%') ? '%' : (stat.value.includes('K') ? 'K+' : '+')} />
                            </div>
                            <div className="mt-2 text-sm text-gray-500 tracking-wide">{stat.label}</div> {/* Simpler label */}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
export default StatsSection;