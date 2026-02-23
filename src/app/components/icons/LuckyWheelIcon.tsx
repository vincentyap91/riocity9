import React from 'react';

export function LuckyWheelIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <defs>
                <mask id="wheelMask">
                    <rect x="0" y="0" width="24" height="24" fill="white" />
                    <path d="M12 7.5 L9.5 3 A3 3 0 0 1 14.5 3 Z" fill="black" stroke="black" strokeWidth="2" strokeLinejoin="round" />
                </mask>
            </defs>

            <g mask="url(#wheelMask)">
                {/* Outer wheel */}
                <circle cx="12" cy="12" r="10" />
                {/* Inner wheel rim */}
                <circle cx="12" cy="12" r="7.2" />
                {/* Center hub */}
                <circle cx="12" cy="12" r="2.5" />
                <circle cx="12" cy="12" r="0.5" />

                {/* Spokes (from r=2.5 to r=7.2) */}
                {/* 2.5: 12+/-2.5,  7.2: 12+/-7.2 */}
                <line x1="12" y1="19.2" x2="12" y2="14.5" />
                <line x1="12" y1="9.5" x2="12" y2="4.8" />

                <line x1="19.2" y1="12" x2="14.5" y2="12" />
                <line x1="4.8" y1="12" x2="9.5" y2="12" />

                {/* 45 degree diagonals - 2.5*.707 = 1.768, 7.2*.707 = 5.090 */}
                {/* 12 + 1.768 = 13.768, 12 + 5.090 = 17.090 */}
                <line x1="13.768" y1="10.232" x2="17.090" y2="6.910" />
                <line x1="10.232" y1="13.768" x2="6.910" y2="17.090" />

                <line x1="13.768" y1="13.768" x2="17.090" y2="17.090" />
                <line x1="10.232" y1="10.232" x2="6.910" y2="6.910" />
            </g>

            {/* Marker / Pointer (Outline) */}
            <path d="M12 6.5 L10.2 3.5 A2.2 2.2 0 1 1 13.8 3.5 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <circle cx="12" cy="2.3" r="1" fill="currentColor" stroke="none" />
        </svg>
    );
}
