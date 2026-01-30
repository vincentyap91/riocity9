import React from 'react';
import { Button } from '../ui/button';
import { useLanguage } from '../../contexts/LanguageContext';
import { MOBILE } from '../../config/themeTokens';

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
    <div className={`flex items-center justify-between ${MOBILE.sectionMb} px-1 ${className}`}>
      <div className={`flex items-center ${MOBILE.gapSm}`}>
        <div className="relative shrink-0">{icon}</div>
        <div className="flex flex-col justify-center">
          <h2 className={`${MOBILE.title} text-white uppercase tracking-tighter leading-none`}>
            {title}
          </h2>
          {subtitle && <div className="mt-1">{subtitle}</div>}
        </div>
      </div>
      {action !== undefined ? action : (
        <Button
          variant="ghost"
          size="sm"
          className="hidden sm:flex h-9 text-xs font-bold uppercase text-gray-400 hover:text-[#00bc7d] hover:bg-[#00bc7d]/10 border border-white/10 rounded-xl transition-all"
        >
          {t("viewAll")}
        </Button>
      )}
    </div>
  );
}
