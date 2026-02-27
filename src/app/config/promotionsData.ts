import React from 'react';
import { Trophy, Gamepad2 } from 'lucide-react';
import imgBanner01 from "@/assets/banner01.jpg"; // Updated Banner 01 Image
import imgBanner02 from "@/assets/banner02.jpg"; // Updated Banner 02 Image
import imgBanner03 from "@/assets/banner03.jpg"; // Updated Banner 03 Image
import imgDepositBanner from "@/assets/deposit-banner.jpg";
import imgUnlimitedBanner from "@/assets/unlimited-bonus.jpg";

export type PromotionSection = {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  items: string[];
};

export type PromotionItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  badge: string;
  image: string;
  imageAlt: string;
  subtitle?: string;
  actionText?: string;
  sections?: PromotionSection[];
  terms?: string[];
  important?: string[];
};

export const PROMOTIONS: PromotionItem[] = [
  {
    id: "weekly-fix",
    title: "Free RM200 EVERYDAY",
    description: "Claim your daily bonus and boost your gaming experience",
    category: "All",
    badge: "DAILY",
    image: imgBanner01,
    imageAlt: "Weekly Fix promotion",
    subtitle: "Weekly Reload Bonus",
    actionText: "Play Eligible Games",
    sections: [
      {
        title: "Join the action like this:",
        items: [
          "Play 3 eligible Live Casino games with PKR 350+ bets each week",
          "Rack up turnover to climb the leaderboard",
          "Top 100 weekly players win prizes"
        ]
      },
      {
        title: "Prize Overview",
        icon: Trophy,
        items: [
          "1st Place: PKR 6,888",
          "2nd Place: PKR 2,888",
          "3rd Place: PKR 1,358",
          "4th - 5th Place: PKR 598",
          "6th - 10th Place: PKR 568",
          "11th - 20th Place: PKR 188",
          "21st - 50th Place: PKR 68",
          "51st - 100th Place: PKR 28"
        ]
      },
      {
        title: "Week 1 Gem x Winfinity Games",
        icon: Gamepad2,
        items: [
          "Shangrila Baccarat 6",
          "Bar Roulette 2k",
          "Tao Yuan Baccarat 8"
        ]
      }
    ],
    terms: [
      "First tournament runs from 15 Jan 2026, 00:00 MYT until 21 Jan 2026, 23:59 MYT",
      "Check your leaderboard standing within the games",
      "Your prize will be on the Bonus page 48 hours after each tournament",
      "You have 7 days to claim your prize",
      "Use your prize on Sports, Slots, and Live Casino",
      "All prizes come with an 8x turnover requirement"
    ],
    important: [
      "Activated bonuses are used before real money",
      "General RioCity9 T&Cs apply",
      "Read Bonus T&Cs for full terms"
    ]
  },
  {
    id: "welcome-bonus",
    title: "50% Welcome Bonus",
    description: "Claim 50% bonus on your welcome deposit.",
    category: "All",
    badge: "HOT",
    image: imgBanner02,
    imageAlt: "Welcome Bonus promotion",
    subtitle: "New Member Exclusive",
    actionText: "Claim 50% Bonus",
    sections: [
      {
        title: "How to claim:",
        items: [
          "Register and complete account verification",
          "Make your first qualifying deposit",
          "Bonus is credited after successful deposit"
        ]
      }
    ],
    terms: [
      "One claim per eligible new account",
      "Minimum deposit requirement applies",
      "Wagering requirement applies before withdrawal",
      "Campaign limits and duration may change without notice"
    ]
  },
  {
    id: "30-welcome-bonus",
    title: "30% Welcome Bonus",
    description: "Claim 30% bonus on your welcome deposit.",
    category: "All",
    badge: "HOT",
    image: imgBanner03,
    imageAlt: "30% Welcome Bonus promotion",
    subtitle: "New Member Exclusive",
    actionText: "Claim 30% Bonus",
    sections: [
      {
        title: "How to claim:",
        items: [
          "Register and complete account verification",
          "Make your first qualifying deposit",
          "Bonus is credited after successful deposit"
        ]
      }
    ],
    terms: [
      "One claim per eligible new account",
      "Minimum deposit requirement applies",
      "Wagering requirement applies before withdrawal",
      "Campaign limits and duration may change without notice"
    ]
  },
  {
    id: "birthday-bonus",
    title: "Get up to PKR 7.5K Every Birthday",
    description: "Celebrate your special day with exclusive birthday rewards",
    category: "All",
    badge: "DAILY",
    image: imgBanner01,
    imageAlt: "Birthday promotion",
    subtitle: "Happy Birthday from RioCity9",
    actionText: "Check My Gift",
    sections: [
      {
        title: "How to claim:",
        items: [
          "Ensure your birthday is correctly set in your profile",
          "Login during your birthday month",
          "Check your inbox for the celebration gift link"
        ]
      }
    ],
    terms: [
      "User must have been active for at least 3 months",
      "Birthday must be verified via KYC",
      "Bonus amount based on VIP level",
      "No wagering requirement for VIP Gold and above"
    ]
  },
  {
    id: "annual-bonus",
    title: "Get up to PKR 5k Every Single Year",
    description: "Loyalty rewards for our dedicated members annually",
    category: "All",
    badge: "DAILY",
    image: imgBanner01,
    imageAlt: "Annual promotion",
    subtitle: "Annual Anniversary Bonus",
    actionText: "Claim Anniversary Gift",
    sections: [
      {
        title: "Your milestone rewards:",
        items: [
          "Reach your one-year milestone with us",
          "Wait for the anniversary notification",
          "Claim your loyalty reward from the rewards center"
        ]
      }
    ],
    terms: [
      "Awarded on the anniversary of your registration",
      "Must have made at least 10 deposits in the past year",
      "5x wagering requirement",
      "Bonus valid for 14 days"
    ]
  },
  {
    id: "deposit-bonus",
    title: "Deposit BRL8 Get BRL1",
    description: "Top up and receive an instant extra BRL1 reward.",
    category: "Deposit",
    badge: "DAILY",
    image: imgDepositBanner,
    imageAlt: "Deposit bonus promotion",
    subtitle: "Quick Deposit Reward",
    actionText: "Deposit Now",
  },
  {
    id: "unlimited-bonus",
    title: "5% Unlimited Bonus",
    description: "Get an extra 5% bonus on qualifying deposits.",
    category: "All",
    badge: "DAILY",
    image: imgUnlimitedBanner,
    imageAlt: "Unlimited bonus promotion",
    subtitle: "Unlimited Daily Reward",
    actionText: "Claim 5% Bonus",
    sections: [
      {
        title: "How to get started:",
        items: [
          "Make a qualifying deposit",
          "Bonus is credited as 5% of the deposit amount",
          "Use bonus on eligible games"
        ]
      }
    ],
    terms: [
      "Available to eligible members only",
      "Wagering requirement applies before withdrawal",
      "Bonus amount and limits follow campaign rules",
      "General RioCity9 bonus terms apply"
    ]
  },
  {
    id: "fishing-bonus",
    title: "Fishing Game Mega Bonus",
    description: "Up to PKR 10,000",
    category: "Fishing",
    badge: "NEW",
    image: imgBanner01,
    imageAlt: "Fishing bonus promotion",
    actionText: "Claim"
  },
  {
    id: "live-casino-bonus",
    title: "Live Casino Weekly Reload",
    description: "Get 50% bonus every week",
    category: "Live Casino",
    badge: "WEEKLY",
    image: imgBanner01,
    imageAlt: "Live casino bonus promotion",
    actionText: "Claim"
  },
  {
    id: "slots-bonus",
    title: "Slots Free Spins Package",
    description: "100 free spins daily",
    category: "Slots",
    badge: "DAILY",
    image: imgBanner01,
    imageAlt: "Slots bonus promotion",
    actionText: "Claim"
  },
  {
    id: "poker-bonus",
    title: "Poker Tournament Bonus",
    description: "Join and win big prizes",
    category: "Poker",
    badge: "TOURNAMENT",
    image: imgBanner01,
    imageAlt: "Poker bonus promotion",
    actionText: "Claim"
  },
  {
    id: "sports-bonus",
    title: "Sports Betting Cashback",
    description: "10% cashback on losses",
    category: "Sports",
    badge: "CASHBACK",
    image: imgBanner01,
    imageAlt: "Sports bonus promotion",
    actionText: "Claim"
  },
  {
    id: "newbie-bonus",
    title: "New Player Special Package",
    description: "Exclusive for new members",
    category: "Newbie",
    badge: "EXCLUSIVE",
    image: imgBanner01,
    imageAlt: "Newbie bonus promotion",
    actionText: "Claim"
  },
  {
    id: "vip-bonus",
    title: "VIP Member Exclusive Rewards",
    description: "Premium benefits for VIP",
    category: "Other",
    badge: "VIP",
    image: imgBanner01,
    imageAlt: "VIP bonus promotion",
    actionText: "Claim"
  },
];
