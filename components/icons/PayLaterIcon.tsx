
import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const PayLaterIcon: React.FC<IconProps> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    {...props}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Z" />
    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
    <path d="M16.85 5.15 18 4l-1.42-1.42-1.13 1.13a8.97 8.97 0 0 0-10.6.01L3.72 2.58 2.3 4l1.15 1.15A8.956 8.956 0 0 0 12 21a8.958 8.958 0 0 0 8.28-6.15L21.7 16l1.42-1.42-1.13-1.13a8.973 8.973 0 0 0-5.14-8.3Z" opacity=".3"/>
  </svg>
);
