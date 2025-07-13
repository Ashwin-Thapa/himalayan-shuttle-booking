import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const PaperClipIcon: React.FC<IconProps> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3.375 3.375 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.687 7.687a1.125 1.125 0 0 1-1.591-1.591l7.687-7.687a1.125 1.125 0 0 1 1.591 1.59Z" 
    />
  </svg>
);