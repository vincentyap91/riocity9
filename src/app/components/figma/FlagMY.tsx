import React from "react";

export function FlagMY({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-full ${className}`}>
      <svg viewBox="0 0 512 512" className="w-full h-full">
        {/* Background - Red and White stripes */}
        <rect width="512" height="512" fill="#CC0001"/>
        {/* White stripes */}
        <rect y="36.57" width="512" height="36.57" fill="white"/>
        <rect y="109.71" width="512" height="36.57" fill="white"/>
        <rect y="182.86" width="512" height="36.57" fill="white"/>
        <rect y="256" width="512" height="36.57" fill="white"/>
        <rect y="329.14" width="512" height="36.57" fill="white"/>
        <rect y="402.29" width="512" height="36.57" fill="white"/>
        <rect y="475.43" width="512" height="36.57" fill="white"/>
        
        {/* Blue canton */}
        <rect width="256" height="256" fill="#010066"/>
        
        {/* Yellow crescent */}
        <circle cx="115" cy="128" r="60" fill="#FFCC00"/>
        <circle cx="130" cy="128" r="48" fill="#010066"/>
        
        {/* Yellow star */}
        <polygon 
          points="195,128 205,155 235,155 212,175 220,205 195,185 170,205 178,175 155,155 185,155"
          fill="#FFCC00"
        />
      </svg>
    </div>
  );
}
