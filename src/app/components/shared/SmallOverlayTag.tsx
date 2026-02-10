import React from 'react';

interface SmallOverlayTagProps {
  label: string;
  className?: string;
}

export function SmallOverlayTag({ label, className = '' }: SmallOverlayTagProps) {
  return (
    <div
      className={`absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[11px] font-bold uppercase tracking-wider text-white border border-white/10 ${className}`}
    >
      {label}
    </div>
  );
}
