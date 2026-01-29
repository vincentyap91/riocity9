import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy, Gamepad2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { InnerPageLayout } from "../components/shared/InnerPageLayout";

const PROMO_BANNER_URL =
  "https://pksoftcdn.azureedge.net/media/580x320_riocityisnowlive-202311171111434006-202311301531190440-202312141426186709-202512181502055463.png";

export function PromotionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const promotionData: Record<string, any> = useMemo(() => ({
    "weekly-fix": {
      title: "Bag a Cut of PKR 1,700 on Xlusive Gem Tables",
      subtitle: "Weekly Reload Bonus",
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

        <div className="relative z-10 container mx-auto px-4 pt-6 md:pt-8 max-w-[900px]">
        {/* Back Button - gap below for inner pages with back button */}
        <button 
          onClick={() => navigate("/promotions")}
          className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#00bc7d]/20 transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm">{t("backToPromotions")}</span>
        </button>

        {/* Hero Card - Banner image + title + CTA */}
        <div className="relative bg-[#0b1218] rounded-2xl overflow-hidden border border-white/5 shadow-xl mb-8">
           <div className="relative w-full aspect-[580/320] bg-white/5">
             <img
               src={PROMO_BANNER_URL}
               alt="RioCity is now live"
               className="w-full h-full object-cover object-center"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0b1218]/60 via-transparent to-transparent pointer-events-none" />
           </div>
           <div className="relative z-10 p-5 md:p-6 space-y-4 text-center md:text-left">
             {promo.subtitle && (
               <p className="text-emerald-400 font-bold text-xs uppercase tracking-wider">
                 {promo.subtitle}
               </p>
             )}
             <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight text-white">
               {promo.title}
             </h1>
             <div>
               <Button
                 onClick={() => navigate("/deposit")}
                 className="h-11 px-8 rounded-xl bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 hover:brightness-110 text-black font-black text-sm shadow-[0_2px_10px_rgba(16,185,129,0.3)] transition-all hover:scale-[1.02] border-none"
               >
                 Claim
               </Button>
             </div>
           </div>
        </div>

        {/* Content Body */}
        <div className="space-y-8 max-w-[800px] mx-auto">
           {/* Description */}
           <div className="text-center md:text-left">
              <div className="text-white/90 text-sm md:text-base leading-relaxed whitespace-pre-line font-medium">
                {promo.description}
              </div>
           </div>

           {/* Sections (Prize Overview, etc.) */}
           {promo.sections?.map((section: any, idx: number) => (
             <div key={idx} className="space-y-4">
                <h2 className="text-base font-bold flex items-center gap-2 text-white">
                   {section.icon && <section.icon className="w-5 h-5 text-emerald-500" />}
                   {section.title}
                </h2>
                <ul className="space-y-2">
                   {section.items.map((item: string, i: number) => (
                     <li key={i} className="flex items-start gap-2 text-white/90">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00bc7d] mt-2 shrink-0" />
                        <span className="text-sm font-medium leading-relaxed">{item}</span>
                     </li>
                   ))}
                </ul>
             </div>
           ))}

           {/* Terms & Conditions */}
           <div className="space-y-4 pt-6 border-t border-white/5">
              <h2 className="text-base font-bold text-white">Terms & Conditions</h2>
              <ul className="space-y-2">
                 {promo.terms.map((term: string, idx: number) => (
                   <li key={idx} className="flex items-start gap-2 text-white/70 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00bc7d]/30 mt-1.5 shrink-0" />
                      <span className="font-medium leading-relaxed">{term}</span>
                   </li>
                 ))}
              </ul>
           </div>

           {/* More Important Stuff */}
           {promo.important && (
             <div className="space-y-4">
                <h2 className="text-base font-bold text-white">More Important Stuff</h2>
                <ul className="space-y-2">
                   {promo.important.map((item: string, idx: number) => (
                     <li key={idx} className="flex items-start gap-2 text-white/70 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00bc7d]/30 mt-1.5 shrink-0" />
                        <span className="font-medium leading-relaxed">{item}</span>
                     </li>
                   ))}
                </ul>
             </div>
           )}

           {/* Bottom: Claim button only */}
           <div className="pt-8">
               <Button 
                onClick={() => navigate("/deposit")}
                className="w-full h-11 rounded-xl bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 hover:brightness-110 text-black font-black text-sm shadow-[0_2px_10px_rgba(16,185,129,0.3)] transition-all hover:scale-[1.02] border-none"
               >
                 Claim
               </Button>
            </div>
        </div>
        </div>
      </div>
    </InnerPageLayout>
  );
}