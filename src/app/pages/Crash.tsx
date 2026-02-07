import React, { useState } from 'react';
import { InsidePageHero } from '../components/shared/InsidePageHero';
import { RefreshCw, DollarSign, Zap, Play } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { PAGE_ACCENT, SECTION_HEADER_TITLE_CLASS } from '../config/themeTokens';
import { GameSearchBar } from '../components/shared/GameSearchBar';

const CRASH_BANNER = 'https://pksoftcdn.azureedge.net/media/crash-202502241407547974.jpg';

const CDN = 'https://pksoftcdn.azureedge.net/media';
const KING_MAKER = `${CDN}/KingMaker`;
const PLACEHOLDER_IMG = `${CDN}/placeholder_riocity-202408050928489215.jpg`;

const PROVIDER_1_IMG = `${CDN}/kingmidas-logo-white_vector-202502101209571936-202503240727584214.png`;
const PROVIDER_2_IMG = `${CDN}/17-202411050948577988-202502100800181374.png`;

const providers = [
  { id: 1, name: 'King Midas', image: PROVIDER_1_IMG, active: true },
  { id: 2, name: '17', image: PROVIDER_2_IMG },
];

const crashGames = [
  { id: 1, title: '32 Cards', image: `${KING_MAKER}/Game_KMQM_32_Cards_520x520.png` },
  { id: 2, title: '5 Card Poker', image: `${KING_MAKER}/Game_KMQM_5_Card_Poker_520x520.png` },
  { id: 3, title: '7 Up 7 Down', image: `${KING_MAKER}/Game_KMQM_7_Up_7_Down_520x520.png` },
  { id: 4, title: '7 Up 7 Down Rush', image: PLACEHOLDER_IMG },
  { id: 5, title: 'Andar Bahar', image: `${KING_MAKER}/Game_KMQM_Andar_Bahar_520x520.png` },
  { id: 6, title: 'Baccarat', image: `${KING_MAKER}/Game_KMQM_Baccarat_520x520.png` },
  { id: 7, title: 'Bai Buu', image: `${KING_MAKER}/Game_KMQM_Bai_Buu_520x520.png` },
  { id: 8, title: 'Bai Cao', image: `${KING_MAKER}/Game_KMQM_Bai_Cao_520x520.png` },
  { id: 9, title: 'Bai Cao Black & Red', image: PLACEHOLDER_IMG },
  { id: 10, title: 'Bai Cao Mystic Four', image: PLACEHOLDER_IMG },
  { id: 11, title: 'Belangkai 2', image: `${KING_MAKER}/Game_KMQM_Belangkai_2_520x520.png` },
  { id: 12, title: 'Bicho', image: PLACEHOLDER_IMG },
  { id: 13, title: 'KM Power Ball', image: `${KING_MAKER}/Game_KMQM_Bingo_Roll_520x520.png` },
  { id: 14, title: 'Blackjack', image: `${KING_MAKER}/Game_KMQM_Blackjack_520x520.png` },
  { id: 15, title: 'Bola Golek', image: `${KING_MAKER}/Game_KMQM_Bola_Golek_520x520.png` },
  { id: 16, title: 'Bola Tangkas', image: `${KING_MAKER}/Game_KMQM_Bola_Tangkas_520x520.png` },
  { id: 17, title: 'Bonus Dice', image: `${KING_MAKER}/Game_KMQM_Bonus_Dice_520x520.png` },
  { id: 18, title: 'Burmese Six Animals', image: PLACEHOLDER_IMG },
  { id: 19, title: 'Cards Hi Lo', image: `${KING_MAKER}/Game_KMQM_Cards_Hi_Lo_520x520.png` },
  { id: 20, title: 'Cash Rocket', image: `${KING_MAKER}/Game_KMQM_Cash_Rocket_520x520.png` },
  { id: 21, title: 'Chicken Crossy', image: PLACEHOLDER_IMG },
  { id: 22, title: 'Cockfighting Arena', image: `${KING_MAKER}/Game_KMQM_Cockfighting_Arena_520x520.png` },
  { id: 23, title: 'Coin Pusher', image: `${KING_MAKER}/Game_KMQM_Coin_Pusher_520x520.png` },
  { id: 24, title: 'Coin Toss', image: `${KING_MAKER}/Game_KMQM_Coin_Toss_520x520.png` },
];

export function Crash() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [walletBalance] = useState('966.24');
  const [guaranteedRebate] = useState('5.00%');
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const activeProviderName = providers.find((provider) => provider.active)?.name ?? '';
  const filteredCrashGames = crashGames.filter((game) =>
    game.title.toLowerCase().includes(normalizedSearch) ||
    activeProviderName.toLowerCase().includes(normalizedSearch)
  );

  return (
    <div className="flex flex-col flex-1 bg-[#02040a] min-h-screen overflow-x-hidden">
      <InsidePageHero image={CRASH_BANNER} />

      <div className="mt-[-20px] relative z-20 w-full flex flex-col items-center gap-6 py-6">
        <h2 className={PAGE_ACCENT.crash.pageTitleClass}>
          {t('crash')}
        </h2>
      </div>

      <div className="container mx-auto max-w-[1200px] px-4 relative z-10 pb-20 flex flex-col items-center">
        {/* 3. Provider Navigation */}
        <div className="w-full max-w-5xl bg-[#0f1923]/80 backdrop-blur-md border border-white/5 rounded-xl p-2.5 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {providers.map((p) => (
              <div
                key={p.id}
                className={`
                  relative shrink-0 h-[60px] w-[140px] rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300
                  ${p.active
                    ? 'bg-amber-500/10 border border-amber-500'
                    : 'bg-[#16202c] border border-transparent hover:bg-[#1e2a38]'
                  }
                `}
              >
                <img src={p.image} alt={p.name} className="h-8 w-auto object-contain max-w-[80%]" />
              </div>
            ))}
          </div>
        </div>

        {/* 4. Wallet + Guaranteed Rebate */}
        <div className="w-full max-w-5xl mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl bg-[#16202c] border border-white/5 px-4 py-3 min-w-0 flex items-center justify-between gap-3">
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-[#ffbb33] text-xs font-bold uppercase tracking-wide">Wallet</span>
              <span className="text-white text-xl md:text-2xl font-black tabular-nums leading-tight">{walletBalance}</span>
            </div>
            <button
              type="button"
              className="w-10 h-10 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Refresh wallet"
            >
              <RefreshCw className="w-5 h-5 text-white" />
            </button>
          </div>
          <div className="rounded-xl bg-[#16202c] border border-white/5 px-4 py-3 min-w-0 flex items-center justify-between gap-3">
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-[#ffbb33] text-xs font-bold uppercase tracking-wide">Guaranteed Rebate</span>
              <span className="text-white text-xl md:text-2xl font-black tabular-nums leading-tight">{guaranteedRebate}</span>
            </div>
            <button
              type="button"
              className="w-10 h-10 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Rebate details"
            >
              <DollarSign className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Search Bar - below wallet + rebate */}
        <GameSearchBar value={searchQuery} onChange={setSearchQuery} accent="amber" className="mb-12" />

        {/* 5. Section Header + 6. Game Grid */}
        <div className="w-full flex flex-col gap-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className={PAGE_ACCENT.crash.sectionHeaderIconBoxClass}>
              <Zap className={PAGE_ACCENT.crash.sectionHeaderIconClass} />
            </div>
            <h2 className={SECTION_HEADER_TITLE_CLASS}>
              {t('crash')} <span className={PAGE_ACCENT.crash.sectionHeaderAccentClass}>GAME</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6 justify-items-center">
            {filteredCrashGames.map((game) => (
                <div key={game.id} className="flex flex-col items-start gap-2 md:gap-3 group cursor-pointer w-full max-w-[214px]">
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden ring-1 ring-white/10 transition-all duration-500 bg-[#1a2536] group-hover:ring-emerald-500/30 group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)]">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#00bc7d] flex items-center justify-center shadow-[0_0_20px_rgba(0,188,125,0.4)] transform scale-50 group-hover:scale-100 transition-transform duration-300">
                        <Play className="w-6 h-6 text-black fill-black stroke-black stroke-[3]" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-white group-hover:text-emerald-500 font-bold text-xs md:text-sm lg:text-base transition-colors w-full px-0.5">
                    {game.title}
                  </h3>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
