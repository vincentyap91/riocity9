import React, { useEffect, useState } from 'react';
import { Trophy, Zap, Star, Gem, Crown } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { useLanguage } from '../../contexts/LanguageContext';

export function JackpotBoard() {
  const { t } = useLanguage();
  // Simulating live ticking numbers
  const [jackpots, setJackpots] = useState({
    grand: 482931200.50,
    major: 482931200.00,
    minor: 482931200.00,
    mini: 482931200.00
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setJackpots(prev => ({
        grand: prev.grand + Math.random() * 50,
        major: prev.major + Math.random() * 15,
        minor: prev.minor + Math.random() * 5,
        mini: prev.mini + Math.random()
      }));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[rgba(2,10,2,0.6)] border border-white/5 rounded-xl p-4 md:p-6 relative overflow-hidden group">
      
      <div className="relative z-10">
        <SectionHeader 
            title={
              <span>
                <span className="text-white">{t("liveJackpotPool").split(" ")[0]}</span>{" "}
                <span className="text-[#FFAA00]">{t("liveJackpotPool").split(" ").slice(1).join(" ")}</span>
              </span>
            }
            icon={
                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#FFAA00] rounded-lg flex items-center justify-center shadow-[0_0_15px_-3px_rgba(255,170,0,0.4)]">
                    <Trophy className="text-black w-5 h-5 md:w-6 md:h-6 stroke-[2px]" />
                </div>
            }
            action={null}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {/* Grand - Purple */}
            <JackpotCard 
                title={t("grand")} 
                amount={jackpots.grand} 
                icon={<Gem className="w-5 h-5 text-[#9D5CFF]" />}
                borderColor="border-[#9D5CFF]/30"
                iconBg="bg-[#9D5CFF]/10"
            />
            
            {/* Major - Red */}
            <JackpotCard 
                title={t("major")} 
                amount={jackpots.major} 
                icon={<Star className="w-5 h-5 text-[#FF3D57]" />}
                borderColor="border-[#FF3D57]/30"
                iconBg="bg-[#FF3D57]/10"
            />

            {/* Minor - Orange */}
            <JackpotCard 
                title={t("minor")} 
                amount={jackpots.minor} 
                icon={<Zap className="w-5 h-5 text-[#FF8F00]" />}
                borderColor="border-[#FF8F00]/30"
                iconBg="bg-[#FF8F00]/10"
            />

            {/* Mini - Green */}
            <JackpotCard 
                title={t("mini")} 
                amount={jackpots.mini} 
                icon={<Trophy className="w-5 h-5 text-[#00E676]" />}
                borderColor="border-[#00E676]/30"
                iconBg="bg-[#00E676]/10"
            />
        </div>
      </div>
    </div>
  );
}

function JackpotCard({ title, amount, icon, borderColor, iconBg }: any) {
    return (
        <div className={`relative bg-[#0d131c] border ${borderColor} rounded-xl p-3 md:p-4 flex items-center gap-3 md:gap-4 transition-all hover:bg-[#131b26]`}>
            {/* Icon */}
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
                {icon}
            </div>

            {/* Text Content */}
            <div className="flex flex-col min-w-0">
                <span className="text-xs md:text-sm lg:text-base font-bold text-gray-500 uppercase tracking-widest leading-none mb-1 md:mb-1.5">
                    {title}
                </span>
                <div className="font-black not-italic text-sm md:text-base lg:text-lg text-white tracking-tight tabular-nums truncate leading-none">
                    <span className="text-[18px] md:text-xs text-white mr-1.5 font-bold not-italic">PKR</span>
                    {amount.toLocaleString('en-PK', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </div>
            </div>
        </div>
    )
}
