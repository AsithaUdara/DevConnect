// src/app/layout.tsx - Check this file carefully!
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
    subsets: ["latin"],
    display: 'swap',
    variable: '--font-inter' // Make sure this is intended usage
});

export const metadata: Metadata = {
    title: "DevConnect",
    description: "The professional network for developers.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        // Check className here carefully
        <html lang="en" className={`${inter.variable} font-sans`}>
            <head>
                {/* Ensure nothing invalid is manually added here */}
            </head>
            {/* Check className here carefully */}
            <body className="bg-white text-black antialiased">
                {/* Ensure AuthProvider tag is correct */}
                <AuthProvider>
                    {children}
                </AuthProvider>
                {/* Ensure no stray characters after body closing tag */}
            </body>
        {/* Ensure no stray characters after html closing tag */}
        </html>
    );
}