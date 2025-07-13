import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const SteeringWheelIcon: React.FC<IconProps> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor" 
    {...props}
  >
    <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16ZM8.823 13.918a.75.75 0 0 1-1.06-1.06L9.172 11.45v-2.9l-1.409-1.41a.75.75 0 0 1 1.06-1.06l1.677 1.677a.75.75 0 0 1 0 1.06l-1.677 1.677-.001.001ZM11.177 6.082a.75.75 0 0 1 1.06 1.06L10.828 8.55v2.9l1.409 1.41a.75.75 0 0 1-1.06 1.06L9.172 12.243a.75.75 0 0 1 0-1.06l1.677-1.677 1.328-1.328Z" />
    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-1.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z" clipRule="evenodd" />
  </svg>
);
