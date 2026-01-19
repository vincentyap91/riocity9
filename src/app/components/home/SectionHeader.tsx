import React from 'react';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';

interface SectionHeaderProps {
  title: React.ReactNode;
  icon: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeader({ title, icon, subtitle, action, className = "" }: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between mb-5 px-1 ${className}`}>
      <div className="flex items-center gap-3">
          {/* Icon Container */}
          <div className="relative shrink-0">
             {icon}
          </div>
          
          {/* Title & Subtitle */}
          <div className="flex flex-col justify-center">
              <h2 className="text-lg md:text-2xl font-black italic text-white uppercase tracking-tighter leading-none transform -skew-x-6">
                  {title}
              </h2>
              {subtitle && (
                <div className="mt-1 transform -skew-x-6">
                  {subtitle}
                </div>
              )}
          </div>
      </div>
      
      {/* Action Button */}
      {action !== undefined ? action : (
        <Button
          variant="ghost"
          className="hidden sm:flex text-muted-foreground hover:text-white group h-8 text-xs font-bold uppercase tracking-wider"
        >
          View All <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
        </Button>
      )}
    </div>
  );
}
