import React, { forwardRef } from 'react';
import { LucideProps } from 'lucide-react';

export const UsersThree = forwardRef<SVGSVGElement, LucideProps>(({ className, ...props }, ref) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            ref={ref}
            className={className}
            {...props}
        >
            {/* Left User - stylized as behind */}
            <path d="M5.5 14a3.5 3.5 0 0 1 0-7" /> {/* Head arc ( */}
            <path d="M2 21v-2a6 6 0 0 1 4.5-5.5" /> {/* Body arc */}

            {/* Right User - stylized as behind */}
            <path d="M18.5 7a3.5 3.5 0 0 1 0 7" /> {/* Head arc ) */}
            <path d="M22 21v-2a6 6 0 0 0-4.5-5.5" /> {/* Body arc */}

            {/* Center User */}
            <circle cx="12" cy="9" r="4" />
            <path d="M16 21v-2a4 4 0 0 0-8 0v2" />
        </svg>
    );
});

UsersThree.displayName = 'UsersThree';
