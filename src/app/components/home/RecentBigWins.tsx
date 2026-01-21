import React from 'react';
import { Trophy, Clock, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { SectionHeader } from './SectionHeader';
import { useLanguage } from '../../contexts/LanguageContext';

const wins = [
  {
    provider: 'Pragmatic Play',
    game: 'Gates of Olympus',
    user: 'LadyLuck99',
    amount: 'PKR 141,500.00',
    image: 'https://images.unsplash.com/photo-1566563255308-753861417000?w=300&q=80',
    time: '2m ago',
    multiplier: '500x'
  },
  {
    provider: 'Evolution',
    game: 'Crazy Time',
    user: 'HighRoller_X',
    amount: 'PKR 85,200.00',
    image: 'https://images.unsplash.com/photo-1509478861672-91e9a2f90c04?w=300&q=80',
    time: '5m ago',
    multiplier: '120x'
  },
  {
    provider: 'PG Soft',
    game: 'Mahjong Ways 2',
    user: 'Winner888',
    amount: 'PKR 63,000.00',
    image: 'https://images.unsplash.com/photo-1749527175486-d37418187116?w=300&q=80',
    time: '12m ago',
    multiplier: '88x'
  },
  {
    provider: 'Habanero',
    game: 'Koi Gate',
    user: 'DragonMaster',
    amount: 'PKR 42,150.00',
    image: 'https://images.unsplash.com/photo-1657883888456-5db6947fa574?w=300&q=80',
    time: '15m ago',
    multiplier: '55x'
  },
  {
    provider: 'Pragmatic Play',
    game: 'Sweet Bonanza',
    user: 'SugarRush',
    amount: 'PKR 38,900.00',
    image: 'https://images.unsplash.com/photo-1566563255308-753861417000?w=300&q=80',
    time: '22m ago',
    multiplier: '42x'
  },
  {
    provider: 'Playtech',
    game: 'Buffalo Blitz',
    user: 'WildWest',
    amount: 'PKR 35,000.00',
    image: 'https://images.unsplash.com/photo-1509478861672-91e9a2f90c04?w=300&q=80',
    time: '28m ago',
    multiplier: '35x'
  },
  {
    provider: 'Spadegaming',
    game: 'Fiery Sevens',
    user: 'Lucky777',
    amount: 'PKR 29,500.00',
    image: 'https://images.unsplash.com/photo-1657883888456-5db6947fa574?w=300&q=80',
    time: '35m ago',
    multiplier: '25x'
  },
  {
    provider: 'Jili',
    game: 'Golden Empire',
    user: 'KingMidas',
    amount: 'PKR 25,000.00',
    image: 'https://images.unsplash.com/photo-1749527175486-d37418187116?w=300&q=80',
    time: '42m ago',
    multiplier: '20x'
  }
];

export function RecentBigWins() {
  const { t } = useLanguage();
  return (
    <section className="w-full h-full flex flex-col">
      {/* Header */}
      <SectionHeader
        title={
          <span>
            {t("bigWins").split(" ").map((word, idx) => 
              idx === 0 ? word + " " : <span key={idx} className="text-[#ffdf20]">{word}</span>
            )}
          </span>
        }
        subtitle={null}
        icon={
            <div className="relative">
                <div className="absolute inset-0 bg-yellow-500/20 blur-lg rounded-full"></div>
                <div className="relative p-2 bg-gradient-to-br from-yellow-500/20 to-yellow-900/20 rounded-xl border border-yellow-500/30 shadow-[0_0_15px_-5px_rgba(234,179,8,0.3)]">
                    <Trophy className="text-yellow-400 w-5 h-5" />
                </div>
            </div>
        }
        action={null}
      />

      {/* Main Container */}
      <div className="relative flex-1 bg-[#0a0f19] rounded-2xl border border-white/5 overflow-hidden group/container shadow-xl">
        {/* Background Texture */}
        <div 
            className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
            style={{ 
                backgroundImage: `url('https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?w=800&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        ></div>
        
        {/* Top Gradient Mesh for Fade Out */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#0a0f19] to-transparent z-20 pointer-events-none"></div>
        {/* Bottom Gradient Mesh for Fade Out */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0f19] to-transparent z-20 pointer-events-none"></div>

        <div className="relative z-10 h-full overflow-hidden">
            <motion.div 
                className="flex flex-col gap-3 p-4"
                animate={{ y: "-50%" }}
                transition={{ 
                    duration: 40, 
                    ease: "linear", 
                    repeat: Infinity,
                    repeatType: "loop"
                }}
                whileHover={{ animationPlayState: "paused" }} // Note: Framer Motion handles hover differently, but for continuous loop we might need to use a control.
                // Simpler for now: just let it scroll. Hover pause is harder with pure generic animate prop without variants/controls. 
                // We can use onHoverStart/End to set specific controls, but standard CSS 'pause-on-hover' won't work on the motion transform easily.
                // Let's stick to the basic scroll first.
            >
                {/* Original List */}
                {wins.map((win, i) => (
                    <WinCard key={`original-${i}`} win={win} />
                ))}
                {/* Duplicated List for Seamless Loop */}
                {wins.map((win, i) => (
                     <WinCard key={`duplicate-${i}`} win={win} />
                ))}
            </motion.div>
        </div>
      </div>
    </section>
  );
}

function WinCard({ win }: { win: any }) {
    return (
        <div className="relative flex items-center gap-4 bg-[#131b29]/80 backdrop-blur-md rounded-xl p-2.5 border border-white/5 hover:border-yellow-500/30 hover:bg-[#1a2536] transition-all duration-300 group cursor-pointer shrink-0">
            {/* Image */}
            <div className="relative w-12 h-12 shrink-0 rounded-lg overflow-hidden border border-white/10 shadow-lg group-hover:shadow-yellow-500/20 transition-all">
                <img 
                    src={win.image} 
                    alt={win.game} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                {/* Multiplier Badge - Matching Payout Template */}
                <div className="absolute bottom-0 right-0 bg-black/80 backdrop-blur text-xs font-bold text-yellow-400 px-1.5 py-0.5 rounded-tl-md border-t border-l border-yellow-500/20">
                    {win.multiplier}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                <div className="flex justify-between items-center pr-2">
                    <h3 className="text-base font-bold text-white truncate group-hover:text-yellow-400 transition-colors">
                        {win.game}
                    </h3>
                    <TrendingUp className="w-4 h-4 text-yellow-500/50" />
                </div>
                
                <div className="flex items-center gap-2">
                    <div className="text-sm text-white/60 truncate max-w-[100px]">{win.user}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-0.5">
                        <Clock className="w-3.5 h-3.5" /> {win.time}
                    </div>
                </div>

                <div className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500">
                    {win.amount}
                </div>
            </div>
            
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] pointer-events-none"></div>
        </div>
    )
}
