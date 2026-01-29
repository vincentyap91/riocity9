import React from 'react';
import { Megaphone, Gift, ChevronRight } from 'lucide-react';

export function PromoBanners() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Announcement Banner */}
      <div className="relative h-24 md:h-32 rounded-xl overflow-hidden group cursor-pointer border border-white/5 hover:border-blue-500/50 transition-all shadow-lg">
        {/* Background */}
        <div className="absolute inset-0 bg-white">
             <img src="https://staging.riocity9.com/static/media/promo-announcement.jpg" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
        </div>

        <div className="relative z-10 h-full flex items-center p-4 md:p-6">
            <div className="mr-3 md:mr-4 p-2 md:p-3 bg-blue-600 rounded-full shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                <Megaphone className="w-4 h-4 md:w-5 md:h-5 text-white animate-pulse" />
            </div>
            <div>
                <h3 className="text-base md:text-xl font-black text-slate-900 uppercase tracking-tight">Big Announcement</h3>
                <p className="text-[10px] md:text-sm font-medium text-slate-600 max-w-[200px] md:max-w-[250px] leading-tight mt-1">
                    We've updated our withdrawal policy. Faster payouts for everyone!
                </p>
                <div className="mt-1 md:mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded border border-blue-200 uppercase tracking-wide">
                    Read More <ChevronRight className="w-2.5 h-2.5" />
                </div>
            </div>
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="relative h-24 md:h-32 rounded-xl overflow-hidden group cursor-pointer border border-white/5 hover:border-pink-500/50 transition-all shadow-lg">
        {/* Background */}
        <div className="absolute inset-0 bg-[#FF6B6B]">
             <img src="https://staging.riocity9.com/static/media/promo-welcome.jpg" className="w-full h-full object-cover mix-blend-overlay opacity-50" />
             <div className="absolute inset-0 bg-gradient-to-r from-[#ff4757] to-[#ff6b81] opacity-90"></div>
        </div>

        <div className="relative z-10 h-full flex items-center p-4 md:p-6">
            <div className="mr-3 md:mr-4 p-2 md:p-3 bg-white rounded-full shadow-lg shadow-pink-900/20 group-hover:scale-110 transition-transform">
                <Gift className="w-4 h-4 md:w-5 md:h-5 text-[#ff4757] animate-bounce" />
            </div>
            <div>
                <h3 className="text-base md:text-xl font-black text-white uppercase tracking-tight">Welcome to Our Platform!</h3>
                <p className="text-[10px] md:text-sm font-medium text-pink-100 max-w-[200px] md:max-w-[280px] leading-tight mt-1">
                    New here? Check out our beginner's guide to start winning today.
                </p>
                 <div className="mt-1 md:mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-pink-700 bg-white px-2 py-0.5 rounded border border-white/50 uppercase tracking-wide shadow-sm">
                    Start Guide <ChevronRight className="w-2.5 h-2.5" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
