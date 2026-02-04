import React, { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { InsidePageHero } from '../components/shared/InsidePageHero';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb';
import { useLanguage } from '../contexts/LanguageContext';
import { NotFound } from './NotFound';
import imgImagePromo from "@/assets/dba5dfffa741345e0ad70e36cafba5ab8b533760.png";
import imgImageAdventuresOfCaramelo from "@/assets/Adventures-Of-Caramelo.jpg";
import imgImageGatesOfOlympus from "@/assets/8fb99beace6c78475545798f7458eacaad6bea25.png";
import imgImageFortuneOx from "@/assets/8e1075cfac0bd1d05382c5095edcd2f1a5bd507a.png";
import imgImageMoneyBooster from "@/assets/ce19eb21819d0b440f45198fa31d716e1e6360c4.png";
import imgImageLeBandit from "@/assets/4edf617eacdcd51770b6d345d3b9d62c067fb39e.png";
import imgImageSweetBonanza from "@/assets/b6552c9dab008f009bad47f48fa007ccef169c4a.png";
import imgImageGates1000 from "@/assets/e7fb1cf0de54bfef4c5b040e789790c437112a46.png";

const gameDetailConfig = [
  {
    slug: 'adventures-of-caramelo',
    title: 'Adventures Of Caramelo',
    provider: 'NAGA Game Slots',
    rtp: '96.95%',
    image: imgImageAdventuresOfCaramelo,
    iframeSrc: 'https://staging-adventures-of-caramelo.topplatform.asia/?playerToken=7e0e88ad-0bd1-4d86-bfe7-0c1803647041&groupCode=oooo&brandCode=9teo&language=en',
    description: 'Run wild with Caramelo in this colorful action slot packed with bonus surprises, rapid reels, and a vibrant street-art vibe.',
  },
];

export function GameDetailPage() {
  const { t } = useLanguage();
  const { slug } = useParams();
  const game = gameDetailConfig.find((item) => item.slug === slug);
  const [activeTab, setActiveTab] = useState<'ranking' | 'description'>('ranking');
  const iframeContainerRef = useRef<HTMLDivElement | null>(null);

  if (!game) {
    return <NotFound />;
  }

  const rankingRows = [
    { rank: 1, username: '*********3', date: '19-Jan-2026', bet: '3.50', payout: '35.70', win: '32.20' },
    { rank: 2, username: '*********3', date: '19-Jan-2026', bet: '3.50', payout: '21.00', win: '17.50' },
    { rank: 3, username: '*********3', date: '19-Jan-2026', bet: '3.50', payout: '21.00', win: '17.50' },
  ];

  const latestBets = [
    { id: '160428', username: '*********3', date: '19-Jan-2026 04:02:08 PM', amount: '3.50' },
    { id: '160427', username: '*********3', date: '19-Jan-2026 04:02:07 PM', amount: '3.50' },
    { id: '160426', username: '*********3', date: '19-Jan-2026 04:02:06 PM', amount: '3.50' },
    { id: '160425', username: '*********3', date: '19-Jan-2026 04:02:05 PM', amount: '3.50' },
    { id: '160424', username: '*********3', date: '19-Jan-2026 04:02:04 PM', amount: '3.50' },
    { id: '160423', username: '*********3', date: '19-Jan-2026 04:02:01 PM', amount: '3.50' },
    { id: '160422', username: '*********3', date: '19-Jan-2026 04:02:00 PM', amount: '3.50' },
    { id: '160421', username: '*********3', date: '19-Jan-2026 04:01:09 PM', amount: '3.50' },
    { id: '160420', username: '*********3', date: '19-Jan-2026 04:01:08 PM', amount: '3.50' },
    { id: '160419', username: '*********3', date: '19-Jan-2026 04:01:07 PM', amount: '3.50' },
  ];

  const recommendedGames = [
    { title: 'Gates of Olympus', image: imgImageGatesOfOlympus },
    { title: 'Pyramid King', image: imgImageFortuneOx },
    { title: 'Bubble Pop', image: imgImageMoneyBooster },
    { title: '5 Lions Dance', image: imgImageLeBandit },
    { title: 'Treasure Mine', image: imgImageSweetBonanza },
    { title: "Thor's Vengeance", image: imgImageGates1000 },
  ];

  return (
    <div className="flex flex-col flex-1 bg-[#02040a] min-h-screen overflow-x-hidden">

      <div className="container mx-auto max-w-[1200px] px-4 relative z-10 py-6 pb-20 flex flex-col items-center">
        <div className="w-full max-w-5xl flex flex-col gap-4">
          <Breadcrumb>
            <BreadcrumbList className="text-xs text-white/60">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/slots">{t('slots')}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/slots">{game.provider}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-emerald-400">{game.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="w-full rounded-xl bg-[#1a1f2a] border border-white/5 overflow-hidden">
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img src={game.image} alt={game.title} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex flex-col">
                  <h2 className="text-white font-semibold text-sm md:text-base">{game.title}</h2>
                  <span className="text-emerald-400 text-xs font-semibold">RTP {game.rtp}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={async () => {
                  const el = iframeContainerRef.current;
                  if (!el) {
                    return;
                  }
                  if (document.fullscreenElement) {
                    await document.exitFullscreen();
                    return;
                  }
                  await el.requestFullscreen();
                }}
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white/80 flex items-center justify-center"
                aria-label="Fullscreen"
                title="Fullscreen"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="stroke-current">
                  <path d="M7 3H3v4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17 3h4v4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 17v4h-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 17v4h4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <div ref={iframeContainerRef} className="relative w-full h-[360px] sm:h-[420px] md:h-[520px] lg:h-[560px] bg-[#0f1923] rounded-xl overflow-hidden">
                <img src={game.image} alt={game.title} className="absolute inset-0 w-full h-full object-cover blur-sm scale-110 opacity-40 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60 pointer-events-none"></div>
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <div className="h-full w-auto max-w-full aspect-[9/16] bg-[#0b111b] overflow-hidden shadow-[0_0_40px_-10px_rgba(0,0,0,0.6)] pointer-events-auto">
                    <iframe
                      id="game-iframe"
                      className="game-iframe w-full h-full"
                      src={game.iframeSrc}
                      allowFullScreen>
                    </iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full rounded-xl bg-[#1a1f2a] border border-white/5 overflow-hidden">
            <div className="px-4 py-3 border-b border-white/10">
              <div className="text-white text-sm font-semibold">{game.title} by {game.provider}</div>
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('ranking')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'ranking' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-white/5 text-white/60 border border-white/10'}`}
                >
                  Ranking
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('description')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'description' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-white/5 text-white/60 border border-white/10'}`}
                >
                  Game Description
                </button>
              </div>
            </div>
            <div className="p-4">
              {activeTab === 'ranking' ? (
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[720px] rounded-lg border border-white/5 overflow-hidden">
                    <div className="grid grid-cols-[120px_1.2fr_1fr_1fr_1fr_1fr] bg-[#222833] text-[11px] font-semibold text-white/70">
                      <div className="px-4 py-2">Rank</div>
                      <div className="px-4 py-2">Username</div>
                      <div className="px-4 py-2">Date</div>
                      <div className="px-4 py-2">Bet Amount</div>
                      <div className="px-4 py-2">Payout</div>
                      <div className="px-4 py-2 text-right">Win Amount</div>
                    </div>
                    {rankingRows.map((row) => (
                      <div key={row.rank} className="grid grid-cols-[120px_1.2fr_1fr_1fr_1fr_1fr] bg-emerald-500/15 text-[11px] text-white/80 border-t border-white/5">
                        <div className="px-4 py-2 font-semibold">#{row.rank}</div>
                        <div className="px-4 py-2">{row.username}</div>
                        <div className="px-4 py-2">{row.date}</div>
                        <div className="px-4 py-2">{row.bet}</div>
                        <div className="px-4 py-2">{row.payout}</div>
                        <div className="px-4 py-2 text-right text-emerald-300 font-semibold">{row.win}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-sm text-white/70 leading-relaxed">
                  {game.description}
                </div>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold text-sm">Recommended Games</h3>
              <button className="text-xs font-semibold text-white/70 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">More Games</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {recommendedGames.map((rec) => (
                <div key={rec.title} className="flex flex-col items-center gap-2">
                  <div className="w-full aspect-square rounded-xl overflow-hidden ring-1 ring-white/10 bg-[#121a24]">
                    <img src={rec.image} alt={rec.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-[11px] text-white/70 text-center">{rec.title}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full rounded-xl bg-[#1a1f2a] border border-white/5 overflow-hidden">
            <div className="px-4 py-3 border-b border-white/10 text-white text-sm font-semibold">Latest Bets</div>
            <div className="max-h-[320px] overflow-y-auto">
              <div className="grid grid-cols-[120px_1.2fr_1.5fr_1fr] bg-[#222833] text-[11px] font-semibold text-white/70">
                <div className="px-4 py-2">Bet ID</div>
                <div className="px-4 py-2">Username</div>
                <div className="px-4 py-2">Date/Time</div>
                <div className="px-4 py-2 text-right">Bet Amount</div>
              </div>
              {latestBets.map((bet) => (
                <div key={bet.id} className="grid grid-cols-[120px_1.2fr_1.5fr_1fr] bg-emerald-500/15 text-[11px] text-white/80 border-t border-white/5">
                  <div className="px-4 py-2">{bet.id}</div>
                  <div className="px-4 py-2">{bet.username}</div>
                  <div className="px-4 py-2">{bet.date}</div>
                  <div className="px-4 py-2 text-right text-emerald-300 font-semibold">{bet.amount}</div>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-white/10 flex justify-center">
              <button className="text-xs font-semibold text-white/70 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">Show More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
