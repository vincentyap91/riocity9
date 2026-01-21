import React from 'react';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface SectionHeaderProps {
  title: React.ReactNode;
  icon: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeader({ title, icon, subtitle, action, className = "" }: SectionHeaderProps) {
  const { t } = useLanguage();
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
          size="sm"
          className="hidden sm:flex h-8 text-[11px] uppercase font-bold text-[rgb(148,163,184)] hover:text-emerald-400 hover:bg-emerald-500/10 border border-[rgb(148,163,184,0.3)] rounded-full transition-all"
        >
          {t("viewAll")}
        </Button>
      )}
    </div>
  );
}
