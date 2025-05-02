// src/app/page.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CtaSection from "@/components/landing/CtaSection";

// Optional: Metadata for SEO
// export const metadata = { title: 'DevConnect - Connect, Code, Create', description: '...' }

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}