
import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const StarIcon: React.FC<IconProps> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor" 
    {...props}
  >
    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.39-3.464 3.025.942 4.849 4.142 2.515 2.387 4.435 4.486-1.714 4.486 1.714 2.387-4.435 4.142-2.515.942-4.849-3.464-3.025-4.753-.39-1.83-4.401Z" clipRule="evenodd" />
  </svg>
);
