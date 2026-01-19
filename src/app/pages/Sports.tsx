import React from 'react';
import { InsidePageHero } from '../components/shared/InsidePageHero';
import { InsidePageHeader, PageNavItem } from '../components/shared/InsidePageHeader';
import { Trophy, Activity, Target, Gamepad2, Grid } from 'lucide-react';
import { GameCarousel } from '../components/home/GameCarousel';

// New Banner
import imgSportsBanner from "@/assets/e807beb4ab61c26c4afaecc32f24c795ff679981.png";

// Re-using some assets for mockup
import imgFantasticLeague from "@/assets/08df4e8b4526646e986f9e4d2bac3c7252c04c81.png";
import imgSteeplechase from "@/assets/3b695b068a5947c9b9e9e464172e6875dc7c75b4.png";
import imgPenalty from "@/assets/c96fbcac154c4fae4616df00e996cfac084bab4f.png";

const sportsNavItems: PageNavItem[] = [
    { id: 'all', label: 'All Sports', icon: Grid, isActive: true },
    { id: 'football', label: 'Football', icon: Trophy },
    { id: 'basketball', label: 'Basketball', icon: Activity },
    { id: 'tennis', label: 'Tennis', icon: Target },
    { id: 'esports', label: 'E-Sports', icon: Gamepad2 },
];

const sportsHighlights = [
  { id: 1, title: "Fantastic League", provider: "Virtual Soccer", image: imgFantasticLeague, tag: "Live" },
  { id: 2, title: "Steeplechase", provider: "Virtual Sports", image: imgSteeplechase, tag: "Hot" },
  { id: 3, title: "Penalty Shootout", provider: "Instant Games", image: imgPenalty },
];

export function Sports() {
  return (
    <div className="flex flex-col gap-8 pb-24 flex-1 overflow-x-hidden bg-[#02040a]">
        
        {/* Hero Section */}
        <InsidePageHero image={imgSportsBanner} />

        {/* Header & Nav */}
        <div className="mt-[-20px] relative z-20">
            <InsidePageHeader title="Sports Betting" navItems={sportsNavItems} iconColor="text-orange-500" />
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-[1200px] 2xl:max-w-[1536px] px-4 mt-4">
            <GameCarousel 
                title="Live Highlights" 
                icon={<Trophy className="text-orange-400 w-5 h-5" />}
                items={sportsHighlights}
                aspectRatio="aspect-video"
            />
            
            <div className="mt-12 text-center text-gray-500 py-20 border border-white/5 rounded-2xl bg-white/5">
                <h3 className="text-xl font-bold text-white mb-2">Sportsbook Coming Soon</h3>
                <p>We are integrating the best odds provider for you.</p>
            </div>
        </div>
    </div>
  );
}
