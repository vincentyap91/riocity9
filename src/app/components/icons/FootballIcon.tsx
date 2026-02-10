import React from 'react';
import footballIcon from '@/assets/football.svg';

type FootballIconProps = {
  className?: string;
};

export function FootballIcon({ className = '' }: FootballIconProps) {
  return <img src={footballIcon} alt="Football" className={className} />;
}
