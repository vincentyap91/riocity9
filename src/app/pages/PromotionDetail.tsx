import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Info, CheckCircle2, Calendar, ShieldCheck, Users, MessageCircle, Trophy, Gamepad2, ListChecks } from "lucide-react";
import { Button } from "../components/ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { InnerPageLayout } from "../components/shared/InnerPageLayout";

import girl1 from "@/assets/girl-1.png";
import girl2 from "@/assets/girl-2.png";
import girl3 from "@/assets/girl-3.png";
import girl4 from "@/assets/girl-4.png";

export function PromotionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const promotionData: Record<string, any> = useMemo(() => ({
    "weekly-fix": {
      title: "Bag a Cut of PKR 1,700 on Xlusive Gem Tables",
      subtitle: "Weekly Reload Bonus",
      image: girl1,
      description: "We've been cooking up something big with Winfinity – and it's finally time to serve. This epic collab brings you 6 exclusive GemBet live casino games with over PKR 1,700 across two tournaments!\n\nDon't forget – every hand you play can land you an Unlimited Daily Jackpot with our New Year, New Jackpot promo!",
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
    "welcome-bonus": {
      title: "Claim 250% Welcome Bonus Up to PKR 50,000",
      subtitle: "New Member Exclusive",
      image: girl2,
      description: "New to RioCity9? We welcome you with an massive 250% boost on your first three deposits. Start your journey with a big win and explore our vast range of games!",
      actionText: "Claim Now",
      sections: [
        {
          title: "How to get started:",
          items: [
            "Complete your registration and verify your account",
            "Make your first deposit (Min PKR 1,000)",
            "Bonus is automatically credited after successful deposit"
          ]
        }
      ],
      terms: [
        "Only for newly registered users",
        "Wagering requirement: 25x (Deposit + Bonus)",
        "Maximum bonus amount: PKR 50,000",
        "Bonus expires in 30 days if not cleared"
      ]
    },
    "birthday-bonus": {
      title: "Celebrate Your Birthday with PKR 7.5K Reward",
      subtitle: "Happy Birthday from RioCity9",
      image: girl3,
      description: "It's your special day! Let RioCity9 make it even better with a personalized birthday reward. We value our loyal players and want to celebrate with you.",
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
    "annual-bonus": {
      title: "Loyalty Pays Off: Get up to PKR 5k Every Year",
      subtitle: "Annual Anniversary Bonus",
      image: girl4,
      description: "Loyalty pays off! Receive an annual bonus as a thank you for being a part of the RioCity9 family. Every year you stay with us, we reward your dedication.",
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
    }
  }), []);

  const promo = useMemo(() => {
    return promotionData[id || ""] || promotionData["welcome-bonus"];
  }, [id, promotionData]);

  if (!promo) {
    return (
      <InnerPageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">{t("loading")}</div>
        </div>
      </InnerPageLayout>
    );
  }

  return (
    <InnerPageLayout className="overflow-hidden">
      <div className="relative min-h-screen text-white pb-32 overflow-x-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,_rgba(0,188,125,0.1)_0%,_rgba(0,188,125,0.05)_40%,_transparent_70%)] pointer-events-none" />

        <div className="relative z-10 container mx-auto px-4 pt-8 md:pt-12 max-w-[900px]">
        {/* Back Button */}
        <button 
          onClick={() => navigate("/promotions")}
          className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/20 transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm">{t("backToPromotions")}</span>
        </button>

        {/* Hero Card - Follows screenshot layout */}
        <div className="relative bg-[#0b1218] rounded-[32px] overflow-hidden border border-white/5 shadow-2xl mb-12 min-h-[300px] md:min-h-[400px] flex flex-col md:flex-row items-center p-8 md:p-12 gap-8">
           {/* Glow behind girl */}
           <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
           
           <div className="relative z-10 flex-1 space-y-6 text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight text-white max-w-md">
                {promo.title}
              </h1>
              <div className="pt-4">
                <Button 
                  onClick={() => navigate("/deposit")}
                  className="h-14 px-10 rounded-full bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 text-black font-black text-lg shadow-[0_8px_25px_rgba(16,185,129,0.3)] hover:brightness-110 active:scale-95 transition-all border-none"
                >
                  {promo.actionText || t("joinDepositNow")}
                </Button>
              </div>
           </div>

           <div className="relative z-10 w-full md:w-[45%] flex justify-center items-end">
              <img 
                src={promo.image} 
                alt={promo.title}
                className="w-full max-w-[320px] md:max-w-[450px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-700"
              />
           </div>
        </div>

        {/* Content Body - Centered like screenshot */}
        <div className="space-y-12 max-w-[800px] mx-auto">
           {/* Description */}
           <div className="text-center md:text-left space-y-6">
              <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-line font-medium opacity-90">
                {promo.description}
              </div>
              
              <div className="flex justify-center py-4">
                <Button 
                  onClick={() => navigate("/deposit")}
                  className="h-12 px-12 rounded-full bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 text-black font-black text-base shadow-[0_5px_15px_rgba(16,185,129,0.2)] hover:brightness-110 active:scale-95 transition-all border-none"
                >
                  {promo.actionText || t("joinDepositNow")}
                </Button>
              </div>
           </div>

           {/* Sections (Prize Overview, etc.) */}
           {promo.sections?.map((section: any, idx: number) => (
             <div key={idx} className="space-y-6">
                <h2 className="text-2xl font-black flex items-center gap-3 text-white">
                   {section.icon && <section.icon className="w-6 h-6 text-emerald-500" />}
                   {section.title}
                </h2>
                <ul className="space-y-3">
                   {section.items.map((item: string, i: number) => (
                     <li key={i} className="flex items-start gap-3 text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 shrink-0" />
                        <span className="text-base font-semibold">{item}</span>
                     </li>
                   ))}
                </ul>
             </div>
           ))}

           {/* Terms & Conditions */}
           <div className="space-y-6 pt-8 border-t border-white/5">
              <h2 className="text-2xl font-black text-white">Terms & Conditions</h2>
              <ul className="space-y-3">
                 {promo.terms.map((term: string, idx: number) => (
                   <li key={idx} className="flex items-start gap-3 text-gray-400 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/30 mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{term}</span>
                   </li>
                 ))}
              </ul>
           </div>

           {/* More Important Stuff */}
           {promo.important && (
             <div className="space-y-6">
                <h2 className="text-2xl font-black text-white">More Important Stuff</h2>
                <ul className="space-y-3">
                   {promo.important.map((item: string, idx: number) => (
                     <li key={idx} className="flex items-start gap-3 text-gray-400 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/30 mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                     </li>
                   ))}
                </ul>
             </div>
           )}

           {/* Bottom Action Button */}
           <div className="flex flex-col sm:flex-row gap-4 pt-12">
               <Button 
                onClick={() => navigate("/deposit")}
                className="flex-1 h-14 rounded-2xl bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 text-black font-black text-lg shadow-[0_8px_25px_rgba(16,185,129,0.3)] hover:brightness-110 active:scale-95 transition-all border-none"
               >
                 {t("joinDepositNow")}
               </Button>
               <Button 
                variant="outline"
                className="flex-1 h-14 rounded-2xl border-white/10 bg-white/5 text-white font-bold hover:bg-white/10 transition-all"
               >
                 <MessageCircle className="w-5 h-5 mr-2" />
                 {t("liveSupport")}
               </Button>
            </div>
        </div>
        </div>
      </div>
    </InnerPageLayout>
  );
}