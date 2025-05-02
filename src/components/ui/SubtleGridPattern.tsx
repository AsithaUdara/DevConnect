// src/components/ui/SubtleGridPattern.tsx
import React from 'react';

interface SubtleGridPatternProps {
  className?: string;
}

const SubtleGridPattern: React.FC<SubtleGridPatternProps> = ({ className }) => {
  return (
    <svg
      aria-hidden="true"
      // Make sure className prop is merged correctly if passed
      className={`pointer-events-none absolute inset-0 h-full w-full stroke-gray-200/80 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] ${className || ''}`}
    >
      <defs>
        <pattern
          id="subtle-grid" // Keep this ID unique if using multiple patterns on one page
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
          // Removed x/y positioning from pattern itself
        >
          {/* Simplified path for grid lines */}
          <path d="M0 60V0h60" fill="none" />
        </pattern>
      </defs>
      {/* Main rectangle filling the SVG with the pattern */}
      <rect width="100%" height="100%" strokeWidth={0} fill="url(#subtle-grid)" />

      {/* The nested SVG block that was causing the artifact has been removed */}

    </svg>
  );
};

export default SubtleGridPattern;