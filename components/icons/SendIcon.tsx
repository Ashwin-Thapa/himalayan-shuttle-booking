
import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const SendIcon: React.FC<IconProps> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor"
    {...props}
  >
    <path d="M3.105 3.105a1.5 1.5 0 012.05-.273l11.982 6.012a1.5 1.5 0 010 2.518l-11.982 6.012a1.5 1.5 0 01-2.05-.273A1.503 1.503 0 012 16.035V3.965c0-.65.416-1.2.986-1.428.1-.044.204-.078.319-.102z" />
    <path d="M4.153 6.942a.75.75 0 01.127.027l7.516 3.76a.75.75 0 010 1.246l-7.516 3.76a.75.75 0 01-.989-.623V7.593a.75.75 0 01.862-.65z" />
  </svg>
);