import React from "react";
import { useNavigate } from "react-router-dom";

import girl1 from "@/assets/girl-1.png";
import girl2 from "@/assets/girl-2.png";
import girl3 from "@/assets/girl-3.png";
import girl4 from "@/assets/girl-4.png";

const promotions = [
  {
    id: "weekly-fix",
    title: ["Get a Weekly Fix", "Up to PKR 1,700"],
    image: girl1,
    imageAlt: "Weekly Fix promotion",
  },
  {
    id: "welcome-bonus",
    title: ["Claim 250%", "Welcome Bonus"],
    image: girl2,
    imageAlt: "Welcome Bonus promotion",
  },
  {
    id: "birthday-bonus",
    title: ["Get up to PKR 7.5K", "Every Birthday"],
    image: girl3,
    imageAlt: "Birthday promotion",
  },
  {
    id: "annual-bonus",
    title: ["Get up to PKR 5k", "Every Single Year"],
    image: girl4,
    imageAlt: "Annual promotion",
  },
];

export function Promotions() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen text-white overflow-hidden pb-32">

        <div className="relative z-10 container mx-auto px-4 pt-16 pb-6 max-w-[1200px]">
          <h1 className="text-center text-4xl font-bold tracking-tight text-white mb-20">
            Promotions
          </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-6 md:gap-x-8 lg:gap-x-12 gap-y-12 md:gap-y-16 lg:gap-y-20">
          {promotions.map((item, index) => (
            <div
              key={item.id}
              className="group relative flex items-center justify-between min-h-[180px] md:min-h-[200px] lg:min-h-[220px]"
            >
              {/* Left Content */}
              <div className="relative z-10 flex flex-col items-start space-y-4 md:space-y-5 lg:space-y-6 w-1/2">
                <h2 className="text-4xl font-bold tracking-tight leading-tight text-white">
                  <span className="block">{item.title[0]}</span>
                  <span className="block">{item.title[1]}</span>
                </h2>
                
                <button 
                  onClick={() => navigate(`/promotions/${item.id}`)}
                  className="flex items-center gap-2 px-6 py-2 md:px-7 md:py-2.5 lg:px-8 lg:py-2.5 h-12 rounded-xl bg-[#00bc7d] hover:bg-[#00a870] text-black font-black text-xs md:text-sm shadow-[0_0_20px_-5px_rgba(16,185,129,0.6)] transition-all hover:scale-[1.02]"
                >
                  View More <span className="text-base md:text-lg">→</span>
                </button>
              </div>

              {/* Right Image with specific glow per girl */}
              <div 
                className="relative w-1/2 flex justify-center items-center cursor-pointer"
                onClick={() => navigate(`/promotions/${item.id}`)}
              >
                {/* Golden/Glow background behind girl */}
                <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(212,165,32,0.3)_0%,_transparent_70%)] blur-2xl transform scale-125" />
                
                {/* Specific decorative elements for each girl could go here, but a general high-quality glow is best */}
                <div className="absolute w-[150px] h-[150px] md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px] bg-amber-500/20 rounded-full blur-[80px] animate-pulse" />
                
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="relative z-10 w-full max-w-[200px] md:max-w-[240px] lg:max-w-[280px] h-auto object-contain transform transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button - Pill style from screenshot */}
        <div className="mt-24 flex justify-center">
          <button className="px-10 py-2.5 rounded-full border border-emerald-500/20 bg-[#061a14] text-emerald-500/80 text-xs font-bold uppercase tracking-[0.2em] hover:bg-emerald-500/10 hover:text-emerald-400 transition-all shadow-[0_0_20px_rgba(0,188,125,0.05)]">
            Load More
          </button>
        </div>
        </div>
    </div>
  );
}
