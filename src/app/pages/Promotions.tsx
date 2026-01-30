import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThumbsUp, DollarSign, Fish, Dices, Gift, Spade, Gamepad2, Trophy } from "lucide-react";
import { MOBILE } from "../config/themeTokens";

// import girl1 from "@/assets/girl-1.png";
// import girl2 from "@/assets/girl-2.png";
// import girl3 from "@/assets/girl-3.png";
// import girl4 from "@/assets/girl-4.png";

// Placeholder banner image - using first promotion image as banner
// const bannerImage = girl1;

interface Promotion {
  id: string;
  title: string;
  description: string;
  category: string;
  badge: string;
  image: string;
  imageAlt: string;
}

const promotions: Promotion[] = [
  {
    id: "weekly-fix",
    title: "Free RM200 EVERYDAY",
    description: "Claim your daily bonus and boost your gaming experience",
    category: "All",
    badge: "DAILY",
    image: "https://pksoftcdn.azureedge.net/media/580x320_riocityisnowlive-202311171111434006-202311301531190440-202312141426186709-202512181502055463.png",
    imageAlt: "Weekly Fix promotion",
  },
  {
    id: "welcome-bonus",
    title: "We1Win - Unlimited Referral Bonus",
    description: "Invite friends and earn unlimited rewards from their activity",
    category: "All",
    badge: "DAILY",
    image: "https://pksoftcdn.azureedge.net/media/580x320_riocityisnowlive-202311171111434006-202311301531190440-202312141426186709-202512181502055463.png",
    imageAlt: "Welcome Bonus promotion",
  },
  {
    id: "birthday-bonus",
    title: "Get up to PKR 7.5K Every Birthday",
    description: "Celebrate your special day with exclusive birthday rewards",
    category: "All",
    badge: "DAILY",
    image: "https://pksoftcdn.azureedge.net/media/580x320_riocityisnowlive-202311171111434006-202311301531190440-202312141426186709-202512181502055463.png",
    imageAlt: "Birthday promotion",
  },
  {
    id: "annual-bonus",
    title: "Get up to PKR 5k Every Single Year",
    description: "Loyalty rewards for our dedicated members annually",
    category: "All",
    badge: "DAILY",
    image: "https://pksoftcdn.azureedge.net/media/580x320_riocityisnowlive-202311171111434006-202311301531190440-202312141426186709-202512181502055463.png",
    imageAlt: "Annual promotion",
  },
  {
    id: "deposit-bonus",
    title: "250% Welcome Deposit Bonus",
    description: "New member exclusive",
    category: "Deposit",
    badge: "HOT",
    image: "https://pksoftcdn.azureedge.net/media/580x320_riocityisnowlive-202311171111434006-202311301531190440-202312141426186709-202512181502055463.png",
    imageAlt: "Deposit bonus promotion",
  },
  {
    id: "fishing-bonus",
    title: "Fishing Game Mega Bonus",
    description: "Up to PKR 10,000",
    category: "Fishing",
    badge: "NEW",
    image: "https://pksoftcdn.azureedge.net/media/580x320_riocityisnowlive-202311171111434006-202311301531190440-202312141426186709-202512181502055463.png",
    imageAlt: "Fishing bonus promotion",
  },
  {
    id: "live-casino-bonus",
    title: "Live Casino Weekly Reload",
    description: "Get 50% bonus every week",
    category: "Live Casino",
    badge: "WEEKLY",
    image: "https://pksoftcdn.azureedge.net/media/580x320_riocityisnowlive-202311171111434006-202311301531190440-202312141426186709-202512181502055463.png",
    imageAlt: "Live casino bonus promotion",
  },
  {
    id: "slots-bonus",
    title: "Slots Free Spins Package",
    description: "100 free spins daily",
    category: "Slots",
    badge: "DAILY",
    image: "https://pksoftcdn.azureedge.net/media/580x320_riocityisnowlive-202311171111434006-202311301531190440-202312141426186709-202512181502055463.png",
    imageAlt: "Slots bonus promotion",
  },
  {
    id: "poker-bonus",
    title: "Poker Tournament Bonus",
    description: "Join and win big prizes",
    category: "Poker",
    badge: "TOURNAMENT",
    image: "https://pksoftcdn.azureedge.net/media/580x320_riocityisnowlive-202311171111434006-202311301531190440-202312141426186709-202512181502055463.png",
    imageAlt: "Poker bonus promotion",
  },
  {
    id: "sports-bonus",
    title: "Sports Betting Cashback",
    description: "10% cashback on losses",
    category: "Sports",
    badge: "CASHBACK",
    image: "https://pksoftcdn.azureedge.net/media/580x320_riocityisnowlive-202311171111434006-202311301531190440-202312141426186709-202512181502055463.png",
    imageAlt: "Sports bonus promotion",
  },
  {
    id: "newbie-bonus",
    title: "New Player Special Package",
    description: "Exclusive for new members",
    category: "Newbie",
    badge: "EXCLUSIVE",
    image: "https://pksoftcdn.azureedge.net/media/580x320_riocityisnowlive-202311171111434006-202311301531190440-202312141426186709-202512181502055463.png",
    imageAlt: "Newbie bonus promotion",
  },
  {
    id: "vip-bonus",
    title: "VIP Member Exclusive Rewards",
    description: "Premium benefits for VIP",
    category: "Other",
    badge: "VIP",
    image: "https://pksoftcdn.azureedge.net/media/580x320_riocityisnowlive-202311171111434006-202311301531190440-202312141426186709-202512181502055463.png",
    imageAlt: "VIP bonus promotion",
  },
];

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
        <div className="flex items-center gap-2 flex-wrap mb-3 md:mb-4">
          <span className="px-2 py-1 text-xs font-bold rounded border text-[#00bc7d] bg-[#00bc7d]/10 border-[#00bc7d]/20">
            {promotion.category}
          </span>
          <span className="px-2 py-1 text-xs font-bold rounded flex items-center gap-1 border text-white/80 bg-white/5 border-white/10">
            <ThumbsUp className="w-3 h-3" />
            {promotion.badge}
          </span>
        </div>

        {/* Second Text Block: Title */}
        <h2 className="font-bold tracking-tight leading-tight text-white mb-2 md:mb-3 text-xl md:text-2xl">
          {promotion.title}
        </h2>

        {/* Third Text Block: Description */}
        <p className="text-sm text-gray-400">
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
    ? promotions
    : promotions.filter(p => p.category.toLowerCase() === activeCategory);

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
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 h-10 rounded-xl text-sm font-bold transition-all border ${
                  isActive
                    ? "border-[#00bc7d] bg-[#00bc7d]/10 text-[#00bc7d]"
                    : "border-white/5 bg-[#0f151f] text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Promotion Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
