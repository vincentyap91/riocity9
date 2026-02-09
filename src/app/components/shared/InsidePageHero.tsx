import React from 'react';
import { Button } from '../ui/button';
import { motion } from 'motion/react';
import bannerImg from '@/assets/38718709542c908902b4f65a1d44177ac7dd6a90.png';

import { cn } from '../ui/utils';

interface InsidePageHeroProps {
  image?: string;
  promoText?: React.ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
  glowClassName?: string;
}

export function InsidePageHero({ 
  image = bannerImg,
  promoText = <>Get Free MYR 40 <br/> & 250% Bonus</>,
  buttonText = "Join Now",
  onButtonClick,
  className,
  glowClassName
}: InsidePageHeroProps) {
  return (
    <div className={cn("relative w-full flex flex-col items-center justify-center min-h-[107px] md:min-h-[400px] overflow-hidden", className)}>
      
      {/* Background Glows - Adjusted to be subtle like the screenshot */}
      <div className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#1a2c5a]/30 rounded-full blur-[120px] pointer-events-none", glowClassName)}></div>

      <div className="container relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-0 py-0">
        
        

        {/* Right Content (Image) */}
        <div className="relative w-full max-h-[500px] max-w-[500px] md:max-w-[100%] flex justify-center md:justify-end">
             <img 
                src={image} 
                alt="Promo" 
                className="w-full h-auto object-contain animate-in fade-in duration-1000"
             />

            {/* Gradient Overlay for blending */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#02040a]"></div>
        </div>

      </div>
      <div className="hidden md:block">
      {/* Left-right gradient overlay for blending with page */}
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background:
              "linear-gradient(to right, #02040a 9%, transparent 30%, transparent 85%, #02040a 100%)",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background:
              "linear-gradient(to left, #02040a 9%, transparent 30%, transparent 85%, #02040a 100%)",
          }}
          aria-hidden
        />
      </div>
    </div>
  );
}
