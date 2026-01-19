import React from 'react';
import { Zap, TrendingUp, History } from 'lucide-react';
import { motion } from 'motion/react';
import { SectionHeader } from './SectionHeader';

const payouts = [
  {
    game: 'Taco Truck Delight',
    user: 'c***2',
    amount: 'PKR 36.75',
    image: 'https://images.unsplash.com/photo-1626876657310-26bf46fd1d00?w=300&q=80',
    multiplier: '12x',
    time: 'Just now'
  },
  {
    game: 'Nomikai Fever',
    user: 'c***2',
    amount: 'PKR 5.60',
    image: 'https://images.unsplash.com/photo-1702877511782-0fb71bd34a47?w=300&q=80',
    multiplier: '2.5x',
    time: '1s ago'
  },
  {
    game: 'Blackjack A',
    user: 'c***4',
    amount: 'PKR 12.00',
    image: 'https://images.unsplash.com/photo-1618304925090-b68a8c744cbe?w=300&q=80',
    multiplier: '5x',
    time: '2s ago'
  },
  {
    game: 'Nomikai Fever',
    user: 'c***2',
    amount: 'PKR 7.20',
    image: 'https://images.unsplash.com/photo-1702877511782-0fb71bd34a47?w=300&q=80',
    multiplier: '3.1x',
    time: '4s ago'
  },
  {
    game: 'Roulette',
    user: 'c***2',
    amount: 'PKR 8.70',
    image: 'https://images.unsplash.com/photo-1592602944193-0848995f4b5a?w=300&q=80',
    multiplier: '8x',
    time: '5s ago'
  },
  {
    game: 'Nomikai Fever',
    user: 'c***3',
    amount: 'PKR 6.00',
    image: 'https://images.unsplash.com/photo-1702877511782-0fb71bd34a47?w=300&q=80',
    multiplier: '1.5x',
    time: '8s ago'
  },
  {
    game: 'Sweet Bonanza',
    user: 's***9',
    amount: 'PKR 150.00',
    image: 'https://images.unsplash.com/photo-1566563255308-753861417000?w=300&q=80',
    multiplier: '20x',
    time: '10s ago'
  },
  {
    game: 'Crazy Time',
    user: 'x***1',
    amount: 'PKR 500.00',
    image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&q=80',
    multiplier: '50x',
    time: '12s ago'
  },
  {
    game: 'Taco Truck Delight',
    user: 'c***2',
    amount: 'PKR 36.75',
    image: 'https://images.unsplash.com/photo-1626876657310-26bf46fd1d00?w=300&q=80',
    multiplier: '12x',
    time: '15s ago'
  },
  {
    game: 'Nomikai Fever',
    user: 'c***2',
    amount: 'PKR 5.60',
    image: 'https://images.unsplash.com/photo-1702877511782-0fb71bd34a47?w=300&q=80',
    multiplier: '2.5x',
    time: '18s ago'
  },
];

export function RecentPayout() {
  return (
    <section className="w-full h-full flex flex-col">
      {/* Header */}
      <SectionHeader
        title={<span>Live <span className="text-[#5ee9b5]">Payouts</span></span>}
        subtitle={null}
        icon={
            <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/20 blur-lg rounded-full"></div>
                <div className="relative p-2 bg-gradient-to-br from-emerald-500/20 to-emerald-900/20 rounded-xl border border-emerald-500/30 shadow-[0_0_15px_-5px_rgba(148,163,184,0.3)]">
                    <Zap className="text-emerald-400 w-5 h-5" />
                </div>
            </div>
        }
        action={null}
        className="text-[rgb(148,163,184)]"
      />

      {/* Main Container */}
      <div className="relative flex-1 bg-[#0a0f19] rounded-2xl border border-white/5 overflow-hidden group/container shadow-xl">
        {/* Background Texture */}
        <div 
            className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
            style={{ 
                backgroundImage: `url('https://images.unsplash.com/photo-1741704445331-83ed820f0214?w=800&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        ></div>
        
        {/* Top Gradient Mesh */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-emerald-500/5 to-transparent z-20 pointer-events-none"></div>
         {/* Bottom Gradient Mesh */}
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
            >
                 {/* Original List */}
                 {payouts.map((item, i) => (
                    <PayoutCard key={`original-${i}`} item={item} />
                 ))}
                 {/* Duplicated List */}
                 {payouts.map((item, i) => (
                    <PayoutCard key={`duplicate-${i}`} item={item} />
                 ))}
            </motion.div>
        </div>
      </div>
    </section>
  );
}

function PayoutCard({ item }: { item: any }) {
    return (
        <div className="relative flex items-center gap-4 bg-[#131b29]/80 backdrop-blur-md rounded-xl p-2.5 border border-white/5 hover:border-emerald-500/30 hover:bg-[#1a2536] transition-all duration-300 group cursor-pointer shrink-0">
            {/* Image */}
            <div className="relative w-12 h-12 shrink-0 rounded-lg overflow-hidden border border-white/10 shadow-lg group-hover:shadow-emerald-500/20 transition-all">
                <img 
                    src={item.image} 
                    alt={item.game} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                {/* Multiplier Badge */}
                <div className="absolute bottom-0 right-0 bg-black/80 backdrop-blur text-xs font-bold text-emerald-400 px-1.5 py-0.5 rounded-tl-md border-t border-l border-emerald-500/20">
                    {item.multiplier}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                <div className="flex justify-between items-center pr-2">
                    <h3 className="text-base font-bold text-white truncate group-hover:text-emerald-400 transition-colors">
                        {item.game}
                    </h3>
                    <TrendingUp className="w-4 h-4 text-emerald-500/50" />
                </div>
                
                <div className="flex items-center gap-2">
                    <div className="text-sm text-white/50">{item.user}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-0.5">
                        <History className="w-3.5 h-3.5" /> {item.time}
                    </div>
                </div>
                
                <div className="text-base font-bold text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.4)]">
                    {item.amount}
                </div>
            </div>
        </div>
    )
}
