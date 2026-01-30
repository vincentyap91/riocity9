import React from 'react';
import { AnnouncementBar } from '../components/home/AnnouncementBar';
import { HeroSection } from '../components/home/HeroSection';
import { JackpotBoard } from '../components/home/JackpotBoard';
import { Dices, Gamepad2, Trophy } from 'lucide-react';
import { GameCarousel } from '../components/home/GameCarousel';
import { GameCategoryWithRTP } from '../components/home/GameCategoryWithRTP';
import { HotProviders } from '../components/home/HotProviders';
import { LiveSports } from '../components/home/LiveSports';
import { RecentBigWins } from '../components/home/RecentBigWins';
import { RecentPayout } from '../components/home/RecentPayout';
import { LiveTransactions } from '../components/home/LiveTransactions';
import { ReferralBanner } from '../components/home/ReferralBanner';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { HOME_PAGE, MOBILE, PAGE_ACCENT } from '../config/themeTokens';

// Assets
import imgSuperSpeed from "@/assets/2947d765690866fed806f4ef749e66c8f9d99118.png";
import imgDragonTiger from "@/assets/a96a529a33b6ec94623485790da7169f56c3044d.png";
import imgBlackjack from "@/assets/1bceafa1502f0c6f06db1585621af18d071c3b23.png";
import imgBaccarat from "@/assets/731c6f7d6f3611c15e0b8149d28318531aa77714.png";
import imgRoulette from "@/assets/a377db17ea4b9e413c7fb6188421f55d33805d63.png";
import imgSweetBonanza from "@/assets/a71c22e4bc27d3cc5d67a7af4384335c51dd5b85.png";
import imgWheelBet from "@/assets/5178d318128485e665722ceeea818fb4a45b2b57.png";
import imgPoker from "@/assets/d5759991b69649977f1159bbb9695f6ae9e0763f.png";
import imgAndarBahar from "@/assets/503cfb05d1a155be959b3f997e27b2862a529e0d.png";
import imgSpeedBaccarat from "@/assets/a1128c1d89eeb2036928194d54dcad28038b9309.png";
import imgChickenPirate from "@/assets/9a1b3e7518d73d110198647fb78496c68bf98989.png";
import imgBuffalo from "@/assets/629fdd2d06dafd1c18da8fd06e5d99dcb7ac926d.png";
import imgMahjong from "@/assets/3a902e1749abe1ea5759865d8bc6107590a81eff.png";
import imgSerengeti from "@/assets/d574af8ba2fd8b7ecf5979e71152932b8e202392.png";
import imgLeBandit from "@/assets/4edf617eacdcd51770b6d345d3b9d62c067fb39e.png";
import imgSteeplechase from "@/assets/3b695b068a5947c9b9e9e464172e6875dc7c75b4.png";
import imgPenalty from "@/assets/c96fbcac154c4fae4616df00e996cfac084bab4f.png";
import imgGreyhound from "@/assets/19ff699655c54c49d3898d7c6a00300378108dd0.png";
import imgForce1 from "@/assets/3f96597a5ba9cc630f68d2a30fd05e607197447c.png";
import imgHorseRacing from "@/assets/97f18b2da3f6144002fc0ab1bbccd80d7e30817f.png";
import imgFantasticLeague from "@/assets/08df4e8b4526646e986f9e4d2bac3c7252c04c81.png";
import imgDarts from "@/assets/9188c97e03575d5bbdace5f4c4a1435d7d7c559a.png";

// Data placeholders
const liveCasinoGames = [
  { id: 1, title: "Super Speed Baccarat", provider: "Evolution Asia", image: imgSuperSpeed, tag: "Live" },
  { id: 2, title: "Dragon Tiger", provider: "Winfinity", image: imgDragonTiger },
  { id: 3, title: "BlackJack Atrium C", provider: "CreedRoomz", image: imgBlackjack, tag: "Private" },
  { id: 4, title: "Shangrila Baccarat 6", provider: "Winfinity", image: imgBaccarat },
  { id: 5, title: "Roulette", provider: "Evolution", image: imgRoulette, tag: "Hot" },
];

const sportsEvents = [
  { id: 1, title: "Steeplechase", provider: "Virtual Sports", image: imgSteeplechase, tag: "Live" },
  { id: 2, title: "Penalty Shootout", provider: "Instant Games", image: imgPenalty, tag: "Hot" },
  { id: 3, title: "Greyhound Racing", provider: "Virtual Sports", image: imgGreyhound },
  { id: 4, title: "Force 1 Racing", provider: "Virtual Sports", image: imgForce1, tag: "New" },
  { id: 5, title: "Horse Racing", provider: "Virtual Sports", image: imgHorseRacing },
  { id: 6, title: "Fantastic League", provider: "Virtual Soccer", image: imgFantasticLeague, tag: "Popular" },
  { id: 7, title: "Darts", provider: "Instant Games", image: imgDarts },
];

const slotGames = [
  { id: 1, title: "Chicken Pirate", provider: "GameArt", image: imgChickenPirate, tag: "Jackpot" },
  { id: 2, title: "Buffalo Gold", provider: "Pragmatic Play", image: imgBuffalo },
  { id: 3, title: "Mahjong Ways", provider: "PG Soft", image: imgMahjong, tag: "Popular" },
  { id: 4, title: "Serengeti Sunrise", provider: "Relax Gaming", image: imgSerengeti },
  { id: 5, title: "Le Bandit", provider: "Hacksaw", image: imgLeBandit },
];

export function Home() {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const liveCasinoAccent = PAGE_ACCENT.liveCasino;
  const sportsAccent = PAGE_ACCENT.sports;
  const slotsAccent = PAGE_ACCENT.slots;

  return (
    <div className="flex flex-col flex-1 overflow-x-hidden">
      {/* Top Section: Hero, Announcement, Jackpot – design system padding & gap */}
      <div className={`container mx-auto ${HOME_PAGE.maxWidth} ${HOME_PAGE.topBlockPadding} flex flex-col ${HOME_PAGE.sectionGap}`}>
        <HeroSection />
        <AnnouncementBar />
        <JackpotBoard />
      </div>

      {/* Dark Section: Game sections – design system gap-6/gap-8, single container */}
      <div className={`bg-[#02040a] flex-1 w-full pt-6 md:pt-8 flex flex-col ${HOME_PAGE.sectionGap} ${HOME_PAGE.bottomPadding}`}>
        <div className={`container mx-auto ${HOME_PAGE.maxWidth} ${HOME_PAGE.containerPx} flex flex-col ${HOME_PAGE.sectionGap}`}>
          <section>
            <GameCategoryWithRTP />
          </section>

          <section>
            <GameCarousel
              title={
                <span>
                  {(() => {
                    const text = t("liveCasinoTitle");
                    const parts = text.split(" ");
                    if (parts.length > 1) {
                      return <>{parts[0]} <span className={liveCasinoAccent.sectionHeaderAccentClass}>{parts.slice(1).join(" ")}</span></>;
                    }
                    return <span className={liveCasinoAccent.sectionHeaderAccentClass}>{text}</span>;
                  })()}
                </span>
              }
              icon={
                <div className={liveCasinoAccent.sectionHeaderIconBoxClass}>
                  <Dices className={liveCasinoAccent.sectionHeaderIconClass} />
                </div>
              }
              items={liveCasinoGames}
            />
          </section>

          <section>
            <HotProviders />
          </section>

          <section>
            <LiveSports />
          </section>

          <section>
            <GameCarousel
              title={
                <span>
                  {(() => {
                    const text = t("latestSports");
                    const parts = text.split(" ");
                    if (parts.length > 1) {
                      return <>{parts[0]} <span className={sportsAccent.sectionHeaderAccentClass}>{parts.slice(1).join(" ")}</span></>;
                    }
                    return <span className={sportsAccent.sectionHeaderAccentClass}>{text}</span>;
                  })()}
                </span>
              }
              slidesToShow={5}
              aspectRatio="aspect-square"
              icon={
                <div className={sportsAccent.sectionHeaderIconBoxClass}>
                  <Trophy className={sportsAccent.sectionHeaderIconClass} />
                </div>
              }
              items={sportsEvents}
            />
          </section>

          <section>
            <div className={`grid grid-cols-1 xl:grid-cols-2 ${MOBILE.gap}`}>
              <div className="h-[400px]">
                <RecentBigWins />
              </div>
              <div className="h-[400px]">
                <RecentPayout />
              </div>
            </div>
          </section>

          <section>
            <GameCarousel
              title={
                <span>
                  {(() => {
                    const text = t("popularSlots");
                    const parts = text.split(" ");
                    if (parts.length > 1) {
                      return <>{parts[0]} <span className={slotsAccent.sectionHeaderAccentClass}>{parts.slice(1).join(" ")}</span></>;
                    }
                    return <span className={slotsAccent.sectionHeaderAccentClass}>{text}</span>;
                  })()}
                </span>
              }
              icon={
                <div className={slotsAccent.sectionHeaderIconBoxClass}>
                  <Gamepad2 className={slotsAccent.sectionHeaderIconClass} />
                </div>
              }
              items={slotGames}
            />
          </section>

          {isAuthenticated && (
            <section>
              <ReferralBanner />
            </section>
          )}

          <section>
            <LiveTransactions />
          </section>
        </div>
      </div>
    </div>
  );
}
