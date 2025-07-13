
import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const UpiIcon: React.FC<IconProps> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        {...props}
    >
        <path d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Z" />
        <path fill="#fff" d="M11.25 15.375a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0Zm-3-3.375a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Z" />
    </svg>
);
