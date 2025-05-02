// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
        // We'll primarily use default Tailwind colors (grays, black, white)
        // and maybe one accent like blue-600 directly in classes.
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Ensure Inter or similar clean font
      },
      // Example: Add custom animation for subtle slide-up-fade-in
      keyframes: {
          fadeInUp: {
              '0%': { opacity: '0', transform: 'translateY(15px)' },
              '100%': { opacity: '1', transform: 'translateY(0)' },
          }
      },
      animation: {
          fadeInUp: 'fadeInUp 0.8s ease-out forwards', // For elements without framer-motion
      }
    },
  },
  plugins: [],
};
export default config;