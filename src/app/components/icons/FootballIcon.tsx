import React from 'react';
import footballIcon from '@/assets/football.svg';

type FootballIconProps = {
  className?: string;
};

export function FootballIcon({ className = '' }: FootballIconProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        WebkitMaskImage: `url(${footballIcon})`,
        maskImage: `url(${footballIcon})`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
      }}
    />
  );
}
