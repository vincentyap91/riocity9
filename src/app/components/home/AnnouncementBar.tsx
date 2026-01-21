import React from 'react';
import { Volume2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function AnnouncementBar() {
  const { t } = useLanguage();
  return (
    <div className="w-full bg-[#0a0f19]/60 backdrop-blur-md border-b border-white/5 h-10 flex items-center relative overflow-hidden">
      {/* Icon Area - Sticky Left */}
      <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center px-3 rounded-[5px] bg-emerald-600/80 backdrop-blur-md border-r border-white/5 shadow-[5px_0_20px_0px_rgba(0,0,0,0.5)]">
        <Volume2 className="text-white w-5 h-5 animate-pulse" />
      </div>

      {/* Marquee Content */}
      <div className="flex-1 overflow-hidden flex items-center pl-10 md:pl-12">
         <div className="animate-marquee whitespace-nowrap flex items-center gap-8 md:gap-16 text-[14px] md:text-[14px] font-medium text-white">
            <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                {t("maintenanceOngoing")}
            </span>
            <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {t("welcomeToRioCity9")}
            </span>
            <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                {t("newMembersBonus")}
            </span>
            <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                {t("liveCasinoTournament")}
            </span>
            {/* Duplicate for seamless loop */}
            <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                {t("maintenanceOngoing")}
            </span>
            <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {t("welcomeToRioCity9")}
            </span>
            <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                {t("newMembersBonus")}
            </span>
            <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                {t("liveCasinoTournament")}
            </span>
         </div>
      </div>

      {/* Custom Styles for Animation */}
      <style>{`
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
            animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
