import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThumbsUp, DollarSign, Fish, Dices, Gift, Spade, Gamepad2, Trophy } from "lucide-react";
import { MOBILE } from "../config/themeTokens";
import { FilterTabs } from "../components/shared/FilterTabs";
import { PROMOTIONS } from "../config/promotionsData";

// import girl1 from "@/assets/girl-1.png";
// import girl2 from "@/assets/girl-2.png";
// import girl3 from "@/assets/girl-3.png";
// import girl4 from "@/assets/girl-4.png";
const categories = [
  { id: "all", label: "All", icon: null },
  { id: "deposit", label: "Deposit", icon: DollarSign },
  { id: "fishing", label: "Fishing", icon: Fish },
  { id: "live-casino", label: "Live Casino", icon: Dices },
  { id: "newbie", label: "Newbie", icon: Gift },
  { id: "other", label: "Other", icon: Gift },
  { id: "poker", label: "Poker", icon: Spade },
  { id: "slots", label: "Slots", icon: Gamepad2 },
  { id: "sports", label: "Sports", icon: Trophy },
];

interface PromotionCardProps {
  promotion: Promotion;
  onNavigate: (id: string) => void;
  isFirst?: boolean;
}

function PromotionCard({ promotion, onNavigate, isFirst = false }: PromotionCardProps) {
  return (
    <div
      onClick={() => onNavigate(promotion.id)}
      className="group relative flex flex-col overflow-hidden transition-all duration-300 cursor-pointer bg-[#0b1218] rounded-xl border border-white/5 shadow-md hover:shadow-xl hover:scale-[1.02]"
    >
      {/* Top Image - Flush with top, rounded corners match card */}
      <div className="relative mb-4 md:mb-5 lg:mb-6">
        <div className="relative w-full aspect-[29/16] overflow-hidden rounded-t-xl">
          <img
            src={promotion.image}
            alt={promotion.imageAlt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Bottom Content Area */}
      <div className="flex flex-col px-4 md:px-5 lg:px-6 pb-4 md:pb-5 lg:pb-6 pt-0">
        {/* First Text Block: Badges */}
        <div className="flex items-center gap-1.5 md:gap-2 flex-wrap mb-2 md:mb-4">
          <span className="px-1.5 py-0.5 md:px-2 md:py-1 text-[10px] md:text-xs font-bold rounded border text-[#00bc7d] bg-[#00bc7d]/10 border-[#00bc7d]/20">
            {promotion.category}
          </span>
          <span className="px-1.5 py-0.5 md:px-2 md:py-1 text-[10px] md:text-xs font-bold rounded flex items-center gap-1 border border-white/10 text-white/70 bg-white/5 md:text-white/80">
            <ThumbsUp className="w-2.5 h-2.5 md:w-3 md:h-3 shrink-0" />
            {promotion.badge}
          </span>
        </div>

        {/* Second Text Block: Title */}
        <h2 className="font-bold tracking-tight leading-tight text-white mb-2 md:mb-3 text-xl md:text-2xl">
          {promotion.title}
        </h2>

        {/* Third Text Block: Description */}
        <p className="text-sm text-gray-400 line-clamp-2">
          {promotion.description}
        </p>
      </div>
    </div>
  );
}

export function Promotions() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [itemsToShow, setItemsToShow] = useState(8);

  const handleNavigate = (id: string) => {
    navigate(`/promotions/${id}`);
  };

  const filteredPromotions = activeCategory === "all"
    ? PROMOTIONS
    : PROMOTIONS.filter(p => p.category.toLowerCase() === activeCategory);

  const displayedPromotions = filteredPromotions.slice(0, itemsToShow);
  const hasMoreItems = filteredPromotions.length > itemsToShow;

  const handleLoadMore = () => {
    setItemsToShow(filteredPromotions.length);
  };

  // Reset items to show when category changes
  useEffect(() => {
    setItemsToShow(8);
  }, [activeCategory]);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,_rgba(0,188,125,0.1)_0%,_rgba(0,188,125,0.05)_40%,_transparent_70%)] pointer-events-none" />

      <div className={`relative z-10 container mx-auto max-w-[1400px] ${MOBILE.settingsPageContainer}`}>
        <h1 className="text-center text-4xl font-bold tracking-tight text-white mb-8">
          Promotions
        </h1>

        {/* Category Filters */}
        <div className="mb-8">
          <FilterTabs
            items={categories.map((category) => ({ id: category.id, label: category.label }))}
            activeId={activeCategory}
            onSelect={setActiveCategory}
            scrollable
          />
        </div>

        {/* Promotion Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayedPromotions.map((promotion, index) => (
            <PromotionCard
              key={promotion.id}
              promotion={promotion}
              onNavigate={handleNavigate}
              isFirst={index === 0}
            />
          ))}
        </div>

        {/* Load More Button */}
        {hasMoreItems && (
          <div className="mt-6 flex justify-center">
            <button 
              onClick={handleLoadMore}
              className="px-10 py-2.5 rounded-full border border-[#00bc7d]/20 bg-[#061a14] text-[#00bc7d]/80 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#00bc7d]/10 hover:text-[#00bc7d] transition-all"
            >
              View More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
