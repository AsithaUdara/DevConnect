// src/components/landing/TestimonialsSection.tsx
'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useRef, useEffect, useState, useCallback } from 'react'; // Added useRef, useState, useCallback

const testimonials = [
    { id: 1, quote: 'DevConnect is my go-to for non-distracting technical discussions. Highly recommended.', author: 'Sarah Chen', role: 'Lead Developer, TechCorp', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 2, quote: 'Found amazing collaborators for an open-source project here. The community is top-notch.', author: 'Michael B.', role: 'Senior Software Engineer', avatar: 'https://i.pravatar.cc/150?img=8' },
    { id: 3, quote: 'The project showcase feature helped me land my last freelance gig. Invaluable platform.', author: 'Anita Desai', role: 'Freelance Web Developer', avatar: 'https://i.pravatar.cc/150?img=9' },
    { id: 4, quote: 'Learning from experts and sharing my own journey has significantly boosted my confidence.', author: 'Kenji Tanaka', role: 'Junior Developer', avatar: 'https://i.pravatar.cc/150?img=8' },
    { id: 5, quote: 'A much-needed professional space focused purely on development topics. Excellent resource.', author: 'Fatima Rossi', role: 'Backend Engineer', avatar: 'https://i.pravatar.cc/150?img=5' },
];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } } };
const cardBgColor = 'white';
const gradientStartColor = 'white';
const gradientEndColor = 'blue-50';

const TestimonialsSection = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null); // To store interval ID

    const scrollAmount = 1; // Pixels to scroll each step
    const scrollInterval = 30; // Milliseconds between steps (adjust for speed)
    const pauseDuration = 3000; // Milliseconds to pause at the end before looping (adjust as needed)

    // Function to handle the scrolling logic
    const startScrolling = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current); // Clear existing interval

        intervalRef.current = setInterval(() => {
            if (scrollContainerRef.current && !isHovering) {
                const container = scrollContainerRef.current;
                const maxScrollLeft = container.scrollWidth - container.clientWidth;

                if (container.scrollLeft >= maxScrollLeft - 1) { // Check if near the end (allow for slight rounding)
                    // Pause at the end, then reset
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    setTimeout(() => {
                         if(container) container.scrollTo({ left: 0, behavior: 'smooth' });
                         // Restart scrolling after reset and pause
                         setTimeout(startScrolling, 500); // Small delay after smooth scroll reset
                    }, pauseDuration);
                } else {
                    container.scrollLeft += scrollAmount;
                }
            }
        }, scrollInterval);
    }, [isHovering, pauseDuration, scrollInterval, scrollAmount]); // Include dependencies

    // Effect to start/stop scrolling
    useEffect(() => {
        startScrolling(); // Initial start

        // Cleanup function to clear interval on component unmount
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [startScrolling]); // Rerun effect if startScrolling function changes (due to dependencies)

    return (
         <section id="testimonials" className={`py-24 sm:py-32 bg-gray-50/70`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div className="text-center mb-16 lg:mb-20" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={itemVariants}>
                    <h2 className="text-4xl sm:text-5xl font-bold text-black tracking-tight"> What Developers Are Saying </h2>
                </motion.div>

                {/* Horizontal Scroll Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex space-x-8 overflow-x-auto pb-8 scrollbar-hide cursor-grab active:cursor-grabbing" // Added cursor styles
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    {/* Duplicate testimonials for seamless loop illusion (optional but smoother) */}
                    {[...testimonials, ...testimonials].map((testimonial, index) => ( // Map over doubled array
                        <motion.div
                            // Use a unique key combining id and index for duplicates
                            key={`${testimonial.id}-${index}`}
                            // variants={itemVariants} // Optional: Animate individual cards on load if desired
                            className={`${cardBgColor} rounded-2xl shadow-lg border border-gray-100 p-7 w-80 sm:w-96 flex-shrink-0 flex flex-col transition-shadow duration-300 ease-out hover:shadow-xl`} // Removed snap-center as auto-scroll handles positioning
                        >
                            <div className="flex mb-4"> {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />)} </div>
                            <blockquote className="text-gray-700 text-base mb-6 flex-grow leading-relaxed">
                                "{testimonial.quote}"
                            </blockquote>
                            <div className="flex items-center mt-auto pt-5 border-t border-gray-100">
                                <Image className="h-10 w-10 rounded-full mr-3 object-cover flex-shrink-0 ring-1 ring-gray-200" src={testimonial.avatar} alt={testimonial.author} width={40} height={40} unoptimized />
                                <div className="flex-grow">
                                    <p className="text-sm font-semibold text-black">{testimonial.author}</p>
                                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {/* No need for padding element if duplicating items */}
                </div>
            </div>
        </section>
    );
}
export default TestimonialsSection;