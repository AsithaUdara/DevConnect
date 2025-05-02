'use client'; 

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar'; // Re-use Navbar
import Footer from '@/components/layout/Footer'; // Re-use Footer
import { Users, Target, Lightbulb, Handshake, ChevronRight } from 'lucide-react';

// --- Animation Variants ---
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

// --- Placeholder Data ---
const teamMembers = [
    { id: 1, name: "Alice Johnson", role: "Founder & CEO", img: "https://ui-avatars.com/api/?name=Alice+J&background=000&color=fff&size=256" },
    { id: 2, name: "Bob Williams", role: "Lead Developer", img: "https://ui-avatars.com/api/?name=Bob+W&background=eee&color=000&size=256" },
    { id: 3, name: "Charlie Brown", role: "Product Designer", img: "https://ui-avatars.com/api/?name=Charlie+B&background=000&color=fff&size=256" },
    { id: 4, name: "Diana Davis", role: "Community Manager", img: "https://ui-avatars.com/api/?name=Diana+D&background=eee&color=000&size=256" },
];

const values = [
    { icon: <Target className="h-8 w-8 text-blue-600" />, title: "Developer Focused", description: "Building tools and community specifically for the needs and aspirations of developers." },
    { icon: <Lightbulb className="h-8 w-8 text-green-600" />, title: "Knowledge Sharing", description: "Fostering an environment where insights, solutions, and learning are openly exchanged." },
    { icon: <Users className="h-8 w-8 text-purple-600" />, title: "Meaningful Connections", description: "Facilitating genuine networking, collaboration, and mentorship opportunities." },
    { icon: <Handshake className="h-8 w-8 text-red-600" />, title: "Professional Growth", description: "Empowering developers to advance their skills, careers, and impact on the tech world." },
]

// --- Page Component ---
export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white text-black">
            <Navbar /> {/* Render the shared navbar */}

            <main className="pt-20 sm:pt-24"> {/* Add padding to offset fixed navbar */}

                {/* ===== Page Header Section ===== */}
                <motion.section
                    className="py-20 sm:py-28 bg-gradient-to-b from-white to-gray-50 text-center"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                >
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.h1
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black tracking-tight"
                            variants={fadeInUp}
                        >
                            About DevConnect
                        </motion.h1>
                        <motion.p
                            className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
                            variants={fadeInUp}
                        >
                            Connecting the global developer community through shared knowledge and professional growth.
                        </motion.p>
                    </div>
                </motion.section>

                {/* ===== Mission & Vision Section ===== */}
                <section className="py-16 sm:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            {/* Image Placeholder */}
                            <motion.div
                                className="aspect-video lg:aspect-square bg-gray-100 rounded-xl shadow-lg border border-gray-100 flex items-center justify-center"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                {/* Replace with a relevant high-quality image */}
                                 <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600" // Example Unsplash image
                                    alt="Team Collaboration"
                                    width={600} height={600}
                                    className="object-cover rounded-xl w-full h-full"
                                    unoptimized // Remove if using domain in next.config.js
                                />
                            </motion.div>

                            {/* Text Content */}
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={staggerContainer}
                            >
                                <motion.h2
                                    className="text-3xl sm:text-4xl font-bold text-black tracking-tight mb-5"
                                    variants={fadeInUp}
                                >
                                    Our Mission
                                </motion.h2>
                                <motion.p
                                    className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8"
                                    variants={fadeInUp}
                                >
                                    To empower developers worldwide by providing a dedicated, professional platform for sharing knowledge, showcasing work, fostering collaboration, and accelerating career growth within a supportive community.
                                </motion.p>
                                <motion.h3
                                    className="text-2xl sm:text-3xl font-semibold text-black tracking-tight mb-4"
                                    variants={fadeInUp}
                                >
                                    Our Vision
                                </motion.h3>
                                <motion.p
                                    className="text-base sm:text-lg text-gray-700 leading-relaxed"
                                    variants={fadeInUp}
                                >
                                    To be the essential global network where developers connect, learn, build, and lead the future of technology together.
                                </motion.p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ===== Our Values Section ===== */}
                <section className="py-16 sm:py-24 bg-gray-50/80 border-y border-gray-100">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="text-center mb-12 lg:mb-16"
                            initial="hidden" whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight">Our Core Values</h2>
                        </motion.div>
                        <motion.div
                             className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
                             initial="hidden" whileInView="visible"
                             viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}
                        >
                            {values.map((value, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    className="text-center p-6 bg-white rounded-lg border border-gray-100 shadow-sm"
                                >
                                    <div className="mb-4 inline-flex p-3 rounded-full bg-blue-100/70">
                                        {value.icon}
                                    </div>
                                    <h4 className="text-lg font-semibold text-black mb-2">{value.title}</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                 {/* ===== Team Section (Optional) ===== */}
                 <section className="py-16 sm:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="text-center mb-12 lg:mb-16"
                            initial="hidden" whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight">Meet the Team</h2>
                             <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">The minds behind DevConnect.</p>
                        </motion.div>
                        <motion.div
                             className="grid grid-cols-2 sm:grid-cols-4 gap-8"
                             initial="hidden" whileInView="visible"
                             viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}
                        >
                            {teamMembers.map((member) => (
                                <motion.div key={member.id} variants={fadeInUp} className="text-center group">
                                     <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4 rounded-full overflow-hidden ring-1 ring-gray-200 group-hover:ring-blue-500 transition-shadow duration-300 shadow-sm group-hover:shadow-lg">
                                         <Image src={member.img} alt={member.name} layout="fill" objectFit="cover" unoptimized/>
                                    </div>
                                    <h4 className="text-base sm:text-lg font-semibold text-black">{member.name}</h4>
                                    <p className="text-sm text-blue-600">{member.role}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ===== Join Us CTA (Similar to Landing Page CTA) ===== */}
                 <section className="py-20 sm:py-24 bg-black text-white text-center">
                     <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                          <motion.h2
                              className="text-3xl sm:text-4xl font-bold mb-6"
                              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }} transition={{ duration: 0.5 }}
                            >
                              Become Part of Our Story
                            </motion.h2>
                          <motion.p
                              className="text-lg text-gray-300 mb-8 max-w-xl mx-auto"
                              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                            >
                              Join DevConnect today and help shape the future of developer collaboration.
                            </motion.p>
                          <motion.div
                              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
                            >
                               <Link href="/auth/signup" className="inline-flex items-center justify-center bg-white text-black px-7 py-3 rounded-full text-base font-semibold transition duration-200 ease-in-out shadow-md hover:shadow-lg hover:bg-gray-200 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-black">
                                   Sign Up Now <ChevronRight className="ml-1.5 h-5 w-5" />
                               </Link>
                           </motion.div>
                     </div>
                </section>

            </main>

            <Footer /> {/* Render the shared footer */}
        </div>
    );
}