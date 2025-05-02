// src/components/landing/FeaturesSection.tsx
'use client';
import { motion } from 'framer-motion';
import { MessageSquareQuote, Share2, UsersRound, Rocket } from 'lucide-react'; // New icons
import SubtleGridPattern from '@/components/ui/SubtleGridPattern';

const features = [
    { icon: <MessageSquareQuote className="h-6 w-6 text-blue-600" />, title: 'Share Insights', description: 'Post technical articles, tutorials, and discoveries with a focused audience.' },
    { icon: <Share2 className="h-6 w-6 text-green-600" />, title: 'Showcase Projects', description: 'Get feedback and visibility on your latest work, from side projects to open source.' },
    { icon: <UsersRound className="h-6 w-6 text-purple-600" />, title: 'Network Effectively', description: 'Connect with peers, mentors, and potential collaborators in a professional setting.' },
    { icon: <Rocket className="h-6 w-6 text-red-600" />, title: 'Accelerate Growth', description: 'Stay updated on trends, learn from others, and advance your development career.' },
];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } } };

const FeaturesSection = () => {
    return (
        <section id="features" className="py-24 sm:py-32 bg-gray-50/70 relative overflow-hidden">
            {/* Grid pattern subtle in background */}
            <SubtleGridPattern className="absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,white,transparent)]" />

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
                {/* Section Header */}
                <motion.div className="text-center mb-16 lg:mb-20" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={itemVariants}>
                    <h2 className="text-4xl sm:text-5xl font-bold text-black tracking-tight"> Why DevConnect? </h2>
                    <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"> A platform built with the developer workflow in mind. </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                    {features.map((feature, index) => (
                        <motion.div key={feature.title + index} variants={itemVariants}
                            className="group relative bg-white rounded-xl p-6 border border-gray-100 shadow-sm transition-shadow duration-300 ease-out hover:shadow-lg"
                        >
                             {/* Icon Area */}
                             <div className={`mb-5 inline-flex items-center justify-center p-3 rounded-lg bg-opacity-10 ${ // Determine color based on icon
                                feature.icon.props.className.includes('text-blue-600') ? 'bg-blue-100' :
                                feature.icon.props.className.includes('text-green-600') ? 'bg-green-100' :
                                feature.icon.props.className.includes('text-purple-600') ? 'bg-purple-100' :
                                'bg-red-100' // Default for Rocket
                             }`}>
                                {feature.icon}
                            </div>
                            {/* Text Content */}
                            <h3 className="text-base font-semibold text-black mb-1.5">{feature.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
export default FeaturesSection;