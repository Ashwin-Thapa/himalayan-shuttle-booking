
import React from 'react';

interface LoadingSpinnerProps {
  size?: string; // Tailwind CSS size classes, e.g., 'h-8 w-8'
  color?: string; // Tailwind CSS text color class, e.g., 'text-blue-500'
  className?: string; // Additional classes for the SVG element
  ariaLabel?: string; // Accessibility label
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'h-8 w-8', // Default size
  color = 'text-[rgb(240,45,85)]', // Default color, matching app theme
  className = '',
  ariaLabel = 'Loading...', // Default ARIA label
}) => {
  return (
    <svg
      className={`animate-spin ${size} ${color} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};