import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { InsidePageHero } from '../components/shared/InsidePageHero';
import { Trophy } from 'lucide-react';
import { GameCarousel } from '../components/home/GameCarousel';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { NotFound } from './NotFound';
import imgImagePromo from "@/assets/dba5dfffa741345e0ad70e36cafba5ab8b533760.png";
import imgImageEzugiCasino from "@/assets/ezugi_live casino-202601301129516752.png";
import imgImageGameplayCasino from "@/assets/1b526547f23589a0effd96c6158392e2d6fb3935.png";
import imgImageAdventuresOfCaramelo from "@/assets/Adventures-Of-Caramelo.jpg";
import imgImageGatesOfOlympus from "@/assets/8fb99beace6c78475545798f7458eacaad6bea25.png";
import imgImageFortuneOx from "@/assets/8e1075cfac0bd1d05382c5095edcd2f1a5bd507a.png";
import imgImageMoneyBooster from "@/assets/ce19eb21819d0b440f45198fa31d716e1e6360c4.png";
import imgImageLeBandit from "@/assets/4edf617eacdcd51770b6d345d3b9d62c067fb39e.png";
import imgImageSweetBonanza from "@/assets/b6552c9dab008f009bad47f48fa007ccef169c4a.png";
import imgImageGates1000 from "@/assets/e7fb1cf0de54bfef4c5b040e789790c437112a46.png";
import { PAGE_ACCENT } from '../config/themeTokens';
import { FilterTabs } from '../components/shared/FilterTabs';
import { EmptyState } from '../components/shared/EmptyState';
import { RegistrationFailedModal } from '../components/shared/RegistrationFailedModal';

const DEFAULT_REGISTRATION_FAILED_MESSAGE = 'Registration Failed';
const SERVICE_UNAVAILABLE_MESSAGE = 'Please contact Customer Service, Thank you.';
const IFRAME_FAILURE_KEYWORDS = ['error', 'unavailable', '503', 'nginx', 'service temporarily unavailable'];
const GAME_DETAIL_TABS = ['ranking', 'description'] as const;
type GameDetailTab = (typeof GAME_DETAIL_TABS)[number];

function normalizeGameDetailTab(value: string | null | undefined): GameDetailTab {
  const normalized = (value || '').trim().toLowerCase();
  return GAME_DETAIL_TABS.includes(normalized as GameDetailTab) ? (normalized as GameDetailTab) : 'ranking';
}

function normalizeUrlForComparison(url: string) {
  try {
    const parsed = new URL(url);
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return url.split('?')[0];
  }
}

const gameDetailConfig = [
  {
    slug: 'adventures-of-caramelo',
    title: 'Adventures Of Caramelo',
    provider: 'NAGA Game Slots',
    rtp: '96.95%',
    image: imgImageAdventuresOfCaramelo,
    iframeSrc: 'https://staging-adventures-of-caramelo.topplatform.asia/?playerToken=7e0e88ad-0bd1-4d86-bfe7-0c1803647041&groupCode=oooo&brandCode=9teo&language=en',
    description: 'Run wild with Caramelo in this colorful action slot packed with bonus surprises, rapid reels, and a vibrant street-art vibe.',
    categoryLabel: 'Slots',
    categoryPath: '/slots',
    providerPath: '/slots',
    status: 'available',
  },
  {
    slug: 'ezugi-casino',
    title: 'Ezugi',
    provider: 'Ezugi',
    rtp: '95.00%',
    image: imgImageEzugiCasino,
    iframeSrc: 'https://staging-adventures-of-caramelo.topplatform.asia/?playerToken=7e0e88ad-0bd1-4d86-bfe7-0c1803647041&groupCode=oooo&brandCode=9teo&language=en',
    description: 'Ezugi live casino experience with classic table action and real-time gameplay.',
    categoryLabel: 'Live Casino',
    categoryPath: '/live-casino',
    providerPath: '/live-casino',
    status: 'unavailable',
  },
  {
    slug: 'gameplay-casino',
    title: 'GamePlay Casino',
    provider: 'GamePlay Casino',
    rtp: '95.00%',
    image: imgImageGameplayCasino,
    iframeSrc: 'https://staging-adventures-of-caramelo.topplatform.asia/?playerToken=7e0e88ad-0bd1-4d86-bfe7-0c1803647041&groupCode=oooo&brandCode=9teo&language=en',
    description: 'GamePlay Casino live experience with classic table action and real-time gameplay.',
    categoryLabel: 'Live Casino',
    categoryPath: '/live-casino',
    providerPath: '/live-casino',
    status: 'unavailable',
  },
  {
    slug: 'fb-sport',
    title: 'FB Sport',
    provider: 'FB Sport',
    rtp: '95.00%',
    image: 'https://pksoftcdn.azureedge.net/media/fbsports_sports-202601130904031723.png',
    iframeSrc: 'https://staging-adventures-of-caramelo.topplatform.asia/?playerToken=7e0e88ad-0bd1-4d86-bfe7-0c1803647041&groupCode=oooo&brandCode=9teo&language=en',
    description: 'FB Sport live sportsbook experience with real-time odds and event coverage.',
    categoryLabel: 'Sports',
    categoryPath: '/sports',
    providerPath: '/sports',
    status: 'unavailable',
  },
];

export function GameDetailPage() {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();
  const game = gameDetailConfig.find((item) => item.slug === slug);
  const [activeTab, setActiveTab] = useState<'ranking' | 'description'>(() => normalizeGameDetailTab(searchParams.get('tab')));
  const iframeContainerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const requestedPlayRef = useRef(false);
  const [showRegistrationFailedModal, setShowRegistrationFailedModal] = useState(game.status === 'unavailable');
  const [registrationFailedMessage, setRegistrationFailedMessage] = useState(DEFAULT_REGISTRATION_FAILED_MESSAGE);
  const gameIframeUrlRef = useRef(game.iframeSrc);

  if (!game) {
    return <NotFound />;
  }

  useEffect(() => {
    const tab = searchParams.get('tab');
    const normalizedTab = normalizeGameDetailTab(tab);
    setActiveTab(normalizedTab);
    if (tab !== normalizedTab) {
      const next = new URLSearchParams(searchParams);
      next.set('tab', normalizedTab);
      setSearchParams(next, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const pending = sessionStorage.getItem('pendingGamePlay');
    if (isAuthenticated && pending === '1') {
      sessionStorage.removeItem('pendingGamePlay');
      window.location.reload();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setShowRegistrationFailedModal(game.status === 'unavailable');
    setRegistrationFailedMessage(DEFAULT_REGISTRATION_FAILED_MESSAGE);
    gameIframeUrlRef.current = game.iframeSrc;
  }, [game.status, game.slug]);

  const openRegistrationFailedModal = ({ is503 = false }: { is503?: boolean } = {}) => {
    const showServiceMessage = game.slug === 'adventures-of-caramelo' && is503;
    setRegistrationFailedMessage(showServiceMessage ? SERVICE_UNAVAILABLE_MESSAGE : DEFAULT_REGISTRATION_FAILED_MESSAGE);
    setShowRegistrationFailedModal(true);
  };

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
  const isGameUnavailable = game.status === 'unavailable';
  const rankingRowsData = isGameUnavailable ? [] : rankingRows;
  const latestBetsData = isGameUnavailable ? [] : latestBets;

  const recommendedGames = [
    { title: 'Gates of Olympus', image: imgImageGatesOfOlympus },
    { title: 'Pyramid King', image: imgImageFortuneOx },
    { title: 'Bubble Pop', image: imgImageMoneyBooster },
    { title: '5 Lions Dance', image: imgImageLeBandit },
    { title: 'Treasure Mine', image: imgImageSweetBonanza },
    { title: "Thor's Vengeance", image: imgImageGates1000 },
  ];
  const sportsAccent = PAGE_ACCENT.sports;
  const recommendedItems = recommendedGames.map((rec, index) => ({
    id: `${rec.title}-${index}`,
    title: rec.title,
    provider: game.provider,
    image: rec.image,
  }));

  return (
    <div className="flex flex-col flex-1 bg-[#02040a] min-h-screen overflow-x-hidden">

      <div className="container mx-auto max-w-[1200px] px-4 relative z-10 py-6 pb-20 flex flex-col items-center">
        <div className="w-full max-w-5xl flex flex-col gap-4">
          <Breadcrumb>
            <BreadcrumbList className="text-xs text-white/60">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={game.categoryPath || '/slots'}>{game.categoryLabel || t('slots')}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={game.providerPath || '/slots'}>{game.provider}</Link>
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
                  {game.categoryLabel === 'Slots' && (
                    <span className="text-emerald-400 text-xs font-semibold">RTP {game.rtp}</span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={async () => {
                  if (showRegistrationFailedModal || isGameUnavailable) {
                    return;
                  }
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
                  {showRegistrationFailedModal ? (
                    <RegistrationFailedModal
                      isOpen={showRegistrationFailedModal}
                      message={registrationFailedMessage}
                      onBackHome={() => navigate('/')}
                      onMoreGames={() => navigate(game.categoryPath || '/live-casino')}
                    />
                  ) : (
                    <div className="h-full w-auto max-w-full aspect-[9/16] bg-[#0b111b] overflow-hidden shadow-[0_0_40px_-10px_rgba(0,0,0,0.6)] pointer-events-auto">
                      <iframe
                        id="game-iframe"
                        ref={iframeRef}
                        className="game-iframe w-full h-full"
                        src={game.iframeSrc}
                        onError={() => openRegistrationFailedModal()}
                        onLoad={() => {
                          const iframe = iframeRef.current;
                          if (!iframe) {
                            return;
                          }

                          const checkForFrameFailure = () => {
                            try {
                              const frameDoc = iframe.contentDocument || iframe.contentWindow?.document;
                              const frameSignals = `${frameDoc?.title || ''} ${frameDoc?.body?.innerText || ''}`.toLowerCase();
                              if (IFRAME_FAILURE_KEYWORDS.some((keyword) => frameSignals.includes(keyword))) {
                                const is503FrameSignal =
                                  frameSignals.includes('503') ||
                                  frameSignals.includes('service temporarily unavailable') ||
                                  frameSignals.includes('nginx');
                                openRegistrationFailedModal({ is503: is503FrameSignal });
                                return;
                              }
                            } catch {
                              // Cross-origin iframe content may be blocked.
                            }

                            if (typeof window !== 'undefined' && typeof window.performance !== 'undefined') {
                              const currentIframeUrl = normalizeUrlForComparison(gameIframeUrlRef.current);
                              const resourceEntries = window.performance.getEntriesByType('resource') as PerformanceResourceTiming[];
                              const latestIframeEntry = [...resourceEntries].reverse().find((entry) => {
                                if (entry.initiatorType !== 'iframe') {
                                  return false;
                                }
                                const entryUrl = normalizeUrlForComparison(entry.name);
                                return entryUrl === currentIframeUrl || entryUrl.startsWith(currentIframeUrl);
                              });
                              const responseStatus = (latestIframeEntry as PerformanceResourceTiming & { responseStatus?: number } | undefined)?.responseStatus;
                              if (typeof responseStatus === 'number' && responseStatus >= 400) {
                                openRegistrationFailedModal({ is503: responseStatus === 503 });
                              }
                            }
                          };

                          checkForFrameFailure();
                          window.setTimeout(checkForFrameFailure, 350);
                          window.setTimeout(checkForFrameFailure, 1200);
                        }}
                        allowFullScreen>
                      </iframe>
                      {!isAuthenticated && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/70 text-white text-sm px-4 text-center">
                          <div className="font-semibold">{t('login')}</div>
                          <button
                            type="button"
                            className="px-3 py-2 rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-colors"
                            onClick={() => {
                              requestedPlayRef.current = true;
                              sessionStorage.setItem('pendingGamePlay', '1');
                              navigate('/login');
                            }}
                          >
                            {t('login')}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full rounded-2xl bg-[#1a2230] mb-4 border border-white/5 overflow-hidden">
            <div className="px-4 py-3 border-b border-white/10">
              <div className="text-white text-sm font-semibold">{game.title} by {game.provider}</div>
              <div className="mt-3">
                <FilterTabs
                  items={[
                    { id: 'ranking', label: 'Ranking' },
                    { id: 'description', label: 'Game Description' },
                  ]}
                  activeId={activeTab}
                  onSelect={(id) => {
                    const tabId = normalizeGameDetailTab(id);
                    setActiveTab(tabId);
                    const next = new URLSearchParams(searchParams);
                    next.set('tab', tabId);
                    setSearchParams(next);
                  }}
                  scrollable
                />
              </div>
            </div>
            <div className="p-4">
              {activeTab === 'ranking' ? (
                <div className="flex-1 flex flex-col bg-[#0f151f] rounded-2xl border border-white/5 overflow-hidden shadow-inner">
                  <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="bg-[#1a2230]/80 border-b border-white/5">
                          <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Rank</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Username</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Bet Amount</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Payout</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Win Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {rankingRowsData.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-6 py-8">
                              <EmptyState message="No Data Found" compact />
                            </td>
                          </tr>
                        ) : (
                          rankingRowsData.map((row) => (
                            <tr key={row.rank} className="hover:bg-white/5 transition-all group">
                              <td className="px-6 py-5">
                                <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">#{row.rank}</span>
                              </td>
                              <td className="px-6 py-5">
                                <span className="text-sm text-gray-300 font-medium">{row.username}</span>
                              </td>
                              <td className="px-6 py-5">
                                <span className="text-sm text-white font-medium">{row.date}</span>
                              </td>
                              <td className="px-6 py-5 text-center">
                                <span className="text-sm text-white font-medium">{row.bet}</span>
                              </td>
                              <td className="px-6 py-5 text-center">
                                <span className="text-sm text-white font-medium">{row.payout}</span>
                              </td>
                              <td className="px-6 py-5 text-center">
                                <span className="text-sm font-bold text-emerald-400">{row.win}</span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col bg-[#0f151f] rounded-2xl border border-white/5 overflow-hidden shadow-inner">
                  <div className="p-6 text-sm text-gray-400 leading-relaxed">
                  {game.description}
                  </div>
                </div>
              )}
            </div>
          </div>

          <section>
            <GameCarousel
              title={
                <span>
                  Recommended <span className={sportsAccent.sectionHeaderAccentClass}>Games</span>
                </span>
              }
              icon={
                <div className={sportsAccent.sectionHeaderIconBoxClass}>
                  <Trophy className={sportsAccent.sectionHeaderIconClass} />
                </div>
              }
              slidesToShow={5}
              aspectRatio="aspect-square"
              items={recommendedItems}
            />
          </section>

          <div className="w-full rounded-2xl bg-[#1a2230] border border-white/5 overflow-hidden">
            <div className="px-4 py-3 border-b border-white/10 text-white text-sm font-semibold">Latest Bets</div>
            <div className="flex-1 flex flex-col bg-[#0f151f] border border-white/5 overflow-hidden shadow-inner">
              <div className="overflow-x-auto custom-scrollbar max-h-[320px]">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-[#1a2230]/80 border-b border-white/5">
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Bet ID</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Username</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Date/Time</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Bet Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {latestBetsData.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-8">
                          <EmptyState message="No Data Found" compact />
                        </td>
                      </tr>
                    ) : (
                      latestBetsData.map((bet) => (
                        <tr key={bet.id} className="hover:bg-white/5 transition-all group">
                          <td className="px-6 py-5">
                            <span className="text-sm text-white font-medium">{bet.id}</span>
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-sm text-white font-medium">{bet.username}</span>
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-sm text-gray-400 font-medium">{bet.date}</span>
                          </td>
                          <td className="px-6 py-5 text-right">
                            <span className="text-sm font-bold text-emerald-400">{bet.amount}</span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-white/5 flex justify-center">
                <button className="px-3 py-1 rounded-lg bg-white/5 text-gray-500 text-xs font-bold">Show More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
