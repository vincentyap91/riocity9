import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from './components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './components/ui/sheet';
import { Search, Menu, MessageCircle, X, Languages, CircleHelp, ChevronDown, ChevronUp, Home as HomeIcon, Gamepad2, Dices, Fish, Ticket, Star, Smartphone, Gift, User, Eye, EyeOff, Target, Trash2, Info, RefreshCw, Wallet } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";

import { Footer } from './components/home/Footer';
import { CategoryNav } from './components/home/CategoryNav';
import { MobileBottomNav } from './components/home/MobileBottomNav';
import { SidebarMenu } from './components/shared/SidebarMenu';
import { Home } from './pages/Home';
import { Slots } from './pages/Slots';
import { ProviderPage } from './pages/ProviderPage';
import { GameDetailPage } from './pages/GameDetailPage';
import { LiveCasino } from './pages/LiveCasino';
import { Sports } from './pages/Sports';
import { Fishing } from './pages/Fishing';
import { Lottery } from './pages/Lottery';
import { Poker } from './pages/Poker';
import { Exchange } from './pages/Exchange';
import { RecentGame } from './pages/RecentGame';
import { AllGame } from './pages/AllGame';
import { HotGame } from './pages/HotGame';
import { Crash } from './pages/Crash';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Settings } from './pages/Settings';
import { Deposit } from './pages/Deposit';
import { Withdraw } from './pages/Withdraw';
import { Referral } from './pages/Referral';
import { Rebate } from './pages/Rebate';
import { Membership } from './pages/Membership';
import { Profile } from './pages/Profile';
import { HistoryRecord } from './pages/HistoryRecord';
import { ChangePassword } from './pages/ChangePassword';
import { ComingSoon } from './pages/ComingSoon';
import { Bonus } from './pages/Bonus';
import { NotFound } from './pages/NotFound';
import { Promotions } from './pages/Promotions';
import { PromotionDetail } from './pages/PromotionDetail';
import { Downlines } from './pages/Downlines';
import { InformationCenter } from './pages/InformationCenter';
import { FloatingRewardWidget } from './components/shared/FloatingRewardWidget';
import { FilterTabs } from './components/shared/FilterTabs';
import { FootballIcon } from './components/icons/FootballIcon';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SessionProvider } from './contexts/SessionContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ActivePromoProvider, useActivePromo } from './contexts/ActivePromoContext';
import { sanitizeTextInput } from './utils/security';
import { HOME_PAGE, MOBILE, PRIMARY_CTA_CLASS } from './config/themeTokens';
import { Analytics } from '@vercel/analytics/react';

const categories = [
  { id: 'lobby', labelKey: 'home', icon: HomeIcon, path: '/' },
  { id: 'slots', labelKey: 'slots', icon: Gamepad2, path: '/slots' },
  { id: 'live', labelKey: 'liveCasino', icon: Dices, path: '/live-casino' },
  { id: 'sports', labelKey: 'sports', icon: FootballIcon, path: '/sports' },
  { id: 'fish', labelKey: 'fishing', icon: Fish, path: '/fishing' },
  { id: 'lottery', labelKey: 'lottery', icon: Ticket, path: '/lottery' },
  { id: 'vip', labelKey: 'vipClub', icon: Star, path: '/membership', color: 'text-yellow-400' },
  { id: 'promotions', labelKey: 'promotions', icon: Gift, path: '/promotions', color: 'text-pink-400' },
  { id: 'app', labelKey: 'app', icon: Smartphone, path: '/app', color: 'text-[#00bc7d]' },
];

import logoSrc from "@/assets/a03f3822b9d12864ad14bfc82b6125e4be8a8d49.png";

// Assets for Search
import imgSuperSpeed from "@/assets/2947d765690866fed806f4ef749e66c8f9d99118.png";
import imgDragonTiger from "@/assets/a96a529a33b6ec94623485790da7169f56c3044d.png";
import imgBlackjack from "@/assets/1bceafa1502f0c6f06db1585621af18d071c3b23.png";
import imgBaccarat from "@/assets/731c6f7d6f3611c15e0b8149d28318531aa77714.png";
import imgRoulette from "@/assets/a377db17ea4b9e413c7fb6188421f55d33805d63.png";
import providerEvo from "@/assets/885a36e12393d74bacab6db0538d96fd87ba9438.png";
import providerPragmatic from "@/assets/e5f97a30e079a67954a7c40846213b9264282f81.png";
import providerEzugi from "@/assets/b4b31fea5716ada81ba321332263920c00921c42.png";
import imgSweetBonanza from "@/assets/a71c22e4bc27d3cc5d67a7af4384335c51dd5b85.png";
import imgMahjong from "@/assets/3a902e1749abe1ea5759865d8bc6107590a81eff.png";
import imgBuffalo from "@/assets/629fdd2d06dafd1c18da8fd06e5d99dcb7ac926d.png";

// Internal App Component that uses Auth
function AppContent() {
  // Main App Component with Routes and Navigation
  const { activePromo } = useActivePromo();
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [showSuggestedMessages, setShowSuggestedMessages] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [isRolloverOpen, setIsRolloverOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSearchCategory, setSelectedSearchCategory] = useState('All');
  const [recentSearches, setRecentSearches] = useState<string[]>(['evolution', 'roulette']);
  const { isAuthenticated, user, logout } = useAuth();
  const { currentLang, setCurrentLang, languages, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const wasAuthenticatedRef = useRef<boolean | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const backToTopAnimRef = useRef<number | null>(null);
  const languageDropdownTriggerRef = useRef<HTMLDivElement | null>(null);
  const languageDropdownContentRef = useRef<HTMLElement | null>(null);
  const updateLanguageDropdownOpen = useCallback((open: boolean) => {
    setIsLanguageDropdownOpen((prev) => (prev === open ? prev : open));
  }, []);
  const searchCategories = [
    { value: "All", labelKey: "all" },
    { value: "Sports", labelKey: "sports" },
    { value: "Slots", labelKey: "slots" },
    { value: "Live Casino", labelKey: "liveCasino" },
    { value: "Fishing", labelKey: "fishing" },
    { value: "Lottery", labelKey: "lottery" },
  ];
  const getSearchCategoryLabel = (value: string) =>
    searchCategories.find((cat) => cat.value === value)?.labelKey ?? value;

  const searchItems = useMemo(() => ([
    { id: 'provider-evolution', type: 'provider', name: 'Evolution', image: providerEvo, category: 'Live Casino' },
    { id: 'provider-ezugi', type: 'provider', name: 'Ezugi', image: providerEzugi, category: 'Live Casino' },
    { id: 'provider-pragmatic', type: 'provider', name: 'Pragmatic Play', image: providerPragmatic, category: 'Slots' },
    { id: 'provider-playtech', type: 'provider', name: 'Playtech', category: 'Live Casino' },
    { id: 'game-roulette', type: 'game', name: 'Evolution Roulette', provider: 'Evolution', image: imgRoulette, category: 'Live Casino' },
    { id: 'game-blackjack', type: 'game', name: 'Speed Blackjack', provider: 'Evolution', image: imgBlackjack, category: 'Live Casino' },
    { id: 'game-baccarat', type: 'game', name: 'Baccarat Squeeze', provider: 'Ezugi', image: imgBaccarat, category: 'Live Casino' },
    { id: 'game-dragon-tiger', type: 'game', name: 'Dragon Tiger', provider: 'Pragmatic Play', image: imgDragonTiger, category: 'Slots' },
    { id: 'game-superspeed', type: 'game', name: 'Super Speed Baccarat', provider: 'Evolution Asia', image: imgSuperSpeed, category: 'Live Casino' },
    { id: 'game-sweet-bonanza', type: 'game', name: 'Sweet Bonanza', provider: 'Pragmatic Play', image: imgSweetBonanza, category: 'Slots' },
    { id: 'game-mahjong-ways', type: 'game', name: 'Mahjong Ways', provider: 'PG Soft', image: imgMahjong, category: 'Slots' },
    { id: 'game-buffalo', type: 'game', name: 'Buffalo Gold', provider: 'Pragmatic Play', image: imgBuffalo, category: 'Slots' },
    { id: 'game-fishing-1', type: 'game', name: 'Ocean King', provider: 'JDB', category: 'Fishing' },
    { id: 'game-fishing-2', type: 'game', name: 'Fishing War', provider: 'Spadegaming', category: 'Fishing' },
    { id: 'game-lottery-1', type: 'game', name: '4D Lottery', provider: 'Magnum', category: 'Lottery' },
    { id: 'game-sports-1', type: 'game', name: 'Premier League', provider: 'Saba Sports', category: 'Sports' },
  ]), []);

  const filteredResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return searchItems.filter((item) => {
      const matchesQuery = !query || item.name.toLowerCase().includes(query);
      const matchesCategory = selectedSearchCategory === 'All' || item.category === selectedSearchCategory;
      return matchesQuery && matchesCategory;
    });
  }, [searchItems, searchQuery, selectedSearchCategory]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  // Close search modal on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) handleCloseSearch();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isSearchOpen]);

  // When not logged in: restore "before login" state (close overlays, redirect away from auth-only pages)
  useEffect(() => {
    if (!isAuthenticated) {
      setIsMenuOpen(false);
      setIsLiveChatOpen(false);
      setIsSearchOpen(false);
      setIsRolloverOpen(false);
      // If user was previously logged in and now isn't (logout/session expired), go home
      if (wasAuthenticatedRef.current === true) {
        const authOnlyPaths = ['/settings', '/profile', '/deposit', '/withdraw', '/history', '/downlines', '/security'];
        if (authOnlyPaths.some((p) => location.pathname.startsWith(p))) {
          navigate('/', { replace: true });
        }
      }
      wasAuthenticatedRef.current = false;
    } else {
      wasAuthenticatedRef.current = true;
    }
  }, [isAuthenticated, location.pathname, navigate]);

  const handleOpenSearch = () => {
    if (!isAuthenticated) return;
    setSelectedSearchCategory('All');
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  const handleOpenLanguage = () => {
    setIsLanguageOpen(true);
  };

  const handleCloseLanguage = () => {
    setIsLanguageOpen(false);
  };

  // Listen for language modal open event
  useEffect(() => {
    const handleOpenLanguageEvent = () => {
      setIsLanguageOpen(true);
    };
    window.addEventListener('openLanguageModal', handleOpenLanguageEvent);
    return () => {
      window.removeEventListener('openLanguageModal', handleOpenLanguageEvent);
    };
  }, []);

  const handleItemClick = (item: any) => {
    // Navigate based on type and category
    if (item.category === 'Live Casino') {
      navigate('/live-casino');
    } else if (item.category === 'Slots') {
      navigate('/slots');
    } else if (item.category === 'Sports') {
      navigate('/sports');
    } else if (item.category === 'Fishing') {
      navigate('/fishing');
    } else if (item.category === 'Lottery') {
      navigate('/lottery');
    }
    handleCloseSearch();
  };

  const handleSubmitSearch = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setRecentSearches((prev) => {
      const next = [trimmed, ...prev.filter((item) => item.toLowerCase() !== trimmed.toLowerCase())];
      return next.slice(0, 4);
    });
  };

  // Suggested messages for live chat
  const suggestedMessages = [
    "I'm New Here",
    "Forgot Username/Password",
    "Account Verification Issue",
    "怎样充值",
    "Hi"
  ];

  // Initial loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1500); // 1.5s loading time
    return () => clearTimeout(timer);
  }, []);

  // Listen for openLiveChat event from other components
  useEffect(() => {
    const handleOpenLiveChat = (event: CustomEvent) => {
      setIsLiveChatOpen(true);
      setShowSuggestedMessages(true);
      // If opened from forgot password, we can optionally pre-fill or highlight specific message
      if (event.detail?.reason === 'forgot-password') {
        // Focus on forgot password option
        setChatMessage('');
      }
    };

    window.addEventListener('openLiveChat', handleOpenLiveChat as EventListener);
    return () => window.removeEventListener('openLiveChat', handleOpenLiveChat as EventListener);
  }, []);

  // Scroll to top on route change (instant - standard web behavior)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Scroll listener to toggle header background opacity
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      setShowBackToTop(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackToTop = useCallback(() => {
    // Fallback custom smooth scroll since native smooth scroll can be disabled/ignored.
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
    if (prefersReducedMotion) {
      window.scrollTo(0, 0);
      return;
    }

    const startY =
      window.scrollY ||
      document.scrollingElement?.scrollTop ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (startY <= 0) return;

    if (backToTopAnimRef.current != null) {
      window.cancelAnimationFrame(backToTopAnimRef.current);
      backToTopAnimRef.current = null;
    }

    const durationMs = Math.min(900, Math.max(350, Math.round(startY * 0.6)));
    const startTime = performance.now();
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / durationMs);
      const nextY = Math.round(startY * (1 - easeOutCubic(t)));

      // Scroll both window + scrolling element so this works even if the app uses a custom scroll container.
      window.scrollTo(0, nextY);
      if (document.scrollingElement) document.scrollingElement.scrollTop = nextY;
      document.documentElement.scrollTop = nextY;
      document.body.scrollTop = nextY;

      if (t < 1 && nextY > 0) {
        backToTopAnimRef.current = window.requestAnimationFrame(step);
      } else {
        backToTopAnimRef.current = null;
      }
    };

    backToTopAnimRef.current = window.requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    return () => {
      if (backToTopAnimRef.current != null) {
        window.cancelAnimationFrame(backToTopAnimRef.current);
      }
    };
  }, []);

  // When any header dropdown opens, close the others (only one active at a time)
  useEffect(() => {
    if (isWalletDropdownOpen) {
      setIsRolloverOpen(false);
      updateLanguageDropdownOpen(false);
    }
  }, [isWalletDropdownOpen, updateLanguageDropdownOpen]);

  useEffect(() => {
    if (isRolloverOpen) {
      setIsWalletDropdownOpen(false);
      updateLanguageDropdownOpen(false);
    }
  }, [isRolloverOpen, updateLanguageDropdownOpen]);

  useEffect(() => {
    if (isLanguageDropdownOpen) {
      setIsWalletDropdownOpen(false);
      setIsRolloverOpen(false);
    }
  }, [isLanguageDropdownOpen]);

  useEffect(() => {
    if (!isLanguageDropdownOpen) {
      languageDropdownContentRef.current = null;
      return;
    }

    const raf = window.requestAnimationFrame(() => {
      languageDropdownContentRef.current = document.querySelector<HTMLElement>('[data-language-dropdown-content]');
    });

    return () => window.cancelAnimationFrame(raf);
  }, [isLanguageDropdownOpen]);

  // Use one pointerdown listener + ref containment so trigger clicks don't immediately close the menu.
  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const insideWallet = target.closest('[data-wallet-dropdown]');
      const insideRollover = target.closest('[data-rollover-dropdown]');
      const insideLanguageTrigger =
        !!languageDropdownTriggerRef.current && languageDropdownTriggerRef.current.contains(target);
      const insideLanguageContent =
        !!languageDropdownContentRef.current && languageDropdownContentRef.current.contains(target);
      if (!insideWallet && !insideRollover && !insideLanguageTrigger && !insideLanguageContent) {
        setIsWalletDropdownOpen(false);
        setIsRolloverOpen(false);
        updateLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, [updateLanguageDropdownOpen]);

  return (
    <>
      {isInitialLoading && (
        <div className="fixed inset-0 z-[9999] bg-[#02040a] flex flex-col items-center justify-center">
          {/* Logo in Loader */}
          <div className="relative mb-8 animate-pulse">
            <img src={logoSrc} alt="RioCity9 Logo" className="h-16 w-auto relative z-10" />
            <div className="absolute inset-0 bg-emerald-500/30 blur-2xl rounded-full"></div>
          </div>

          {/* Spinning Loader */}
          <div className="w-12 h-12 border-4 border-white/5 border-t-emerald-500 rounded-full animate-spin mb-4"></div>

          {/* Loading Text */}
          <div className="text-[#00bc7d] font-black tracking-[0.2em] text-sm uppercase animate-pulse">
            {t("loading")}
          </div>

          {/* Optional: Progress Bar Style */}
          <div className="w-48 h-1 bg-white/5 rounded-full mt-8 overflow-hidden">
            <div className="h-full bg-emerald-500 animate-[loading_2s_ease-in-out_infinite]"></div>
          </div>
          <style>{`
                @keyframes loading {
                    0% { width: 0%; transform: translateX(-100%); }
                    50% { width: 100%; transform: translateX(0%); }
                    100% { width: 0%; transform: translateX(100%); }
                }
            `}</style>
        </div>
      )}
      <div className="min-h-screen text-foreground font-sans selection:bg-[#00bc7d]/30 selection:text-[#00bc7d] flex flex-col">
        {/* Background Ambience */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Primary Top Glow - More Intensity */}
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-emerald-600/15 rounded-[100%] blur-[100px]"></div>

          {/* Secondary Accent Glows for depth */}
          <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] bg-emerald-900/20 rounded-full blur-[80px] opacity-60"></div>
          <div className="absolute top-[10%] right-[10%] w-[30%] h-[30%] bg-emerald-800/20 rounded-full blur-[80px] opacity-60"></div>
        </div>

        {/* Navbar */}
        <header
          className={`sticky top-0 z-50 w-full border-b transition-all duration-300 shadow-lg ${isScrolled
            ? 'bg-[#02040a]/95 backdrop-blur-xl border-white/10'
            : 'bg-[#02040a]/60 backdrop-blur-md border-white/5'
            }`}
        >
          <div className={`container mx-auto ${HOME_PAGE.maxWidth} px-4 h-20 flex items-center justify-between`}>
            <div className="flex items-center gap-2 xl:gap-3">
              {/* Desktop Menu Trigger */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#00bc7d] hover:text-[#00bc7d] hover:bg-white/10 hover:border-[#00bc7d]/50 transition-all duration-300 group"
              >
                <Menu className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>

              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 group shrink-0">
                <div className="relative flex items-center justify-center">
                  {/* Subtle centered glow behind icon */}
                  <div className="absolute w-8 h-8 bg-emerald-500/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <img
                    src={logoSrc}
                    alt="RioCity9 Logo"
                    className="h-10 w-auto relative z-10 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <span className="text-2xl font-black tracking-tight text-white hidden xl:block">
                  Rio<span className="text-emerald-400 transition-colors duration-300 group-hover:text-emerald-400">City9</span>
                </span>
              </Link>

              {/* Spacer */}
              <div className="flex-1"></div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-4">

              {/* Auth Section - Conditional rendering based on auth state */}
              <div className="flex items-center gap-2 sm:gap-3">
                {isAuthenticated ? (
                  <div className="flex items-center gap-2 sm:gap-3">
                    {/* Combined Balance & Deposit Pill */}
                    <div className="hidden sm:flex items-center bg-[#131b29]/60 border border-white/10 rounded-[10px] pl-4 pr-1 h-11 transition-all hover:border-[#00bc7d]/30 shadow-lg">
                      {/* Balance Section with dropdown */}
                      <div className="flex items-center gap-2.5 mr-2" data-wallet-dropdown>
                        <button
                          onClick={() => setShowBalance(!showBalance)}
                          className="text-gray-500 hover:text-white transition-colors shrink-0"
                          aria-label={showBalance ? "Hide balance" : "Show balance"}
                        >
                          {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                        <div className="relative flex items-center gap-1.5 min-w-0">
                          <span className="text-[13px] font-black text-white tracking-wide shrink-0">MYR</span>
                          <span className="text-[14px] font-black text-white tracking-tight tabular-nums truncate">{showBalance ? "980.96" : "******"}</span>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setIsWalletDropdownOpen((o) => !o); }}
                            className="shrink-0 ml-2 w-8 h-8 rounded-[10px] bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all"
                            aria-label="Toggle wallet details"
                            aria-expanded={isWalletDropdownOpen}
                          >
                            <ChevronDown size={16} className={`transition-transform duration-200 ${isWalletDropdownOpen ? "rotate-180" : ""}`} />
                          </button>
                          {/* Wallet details dropdown - same design as rollover status dropdown */}
                          <AnimatePresence>
                            {isWalletDropdownOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 top-full mt-2.5 w-[320px] min-w-[320px] z-50 bg-[#1a2230] rounded-2xl shadow-2xl border border-white/5 overflow-hidden animate-in slide-in-from-top-2 fade-in duration-300"
                              >
                                {/* Header Section - same as rollover */}
                                <div className="flex items-center gap-3 p-4 border-b border-white/5">
                                  <div className="h-10 w-10 rounded-xl bg-black/25 border border-white/10 flex items-center justify-center shrink-0">
                                    <Wallet className="w-5 h-5 text-[#00bc7d]" strokeWidth={2.5} />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-white font-bold text-base leading-tight">{t("totalBalance")}</span>
                                    <span className="text-amber-400 text-[10px] font-black uppercase tracking-wider tabular-nums">{showBalance ? "980.96 MYR" : "******"}</span>
                                  </div>
                                </div>
                                {/* Content Section - same structure as rollover */}
                                <div className="p-4">
                                  <div className="bg-[#0f151f] rounded-xl p-4 border border-white/5 space-y-3">
                                    <div className="flex items-center justify-between gap-2">
                                      <span className="text-gray-400 text-xs font-bold">Main Wallet</span>
                                      <span className="text-amber-400 text-xs font-black tabular-nums shrink-0">{showBalance ? "960.96" : "******"}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                      <div className="flex items-center gap-1.5 min-w-0">
                                        <Info className="w-3.5 h-3.5 text-gray-400 shrink-0" aria-hidden />
                                        <span className="text-gray-400 text-xs font-bold">Game Wallet</span>
                                      </div>
                                      <div className="flex items-center gap-2 shrink-0">
                                        <span className="text-amber-400 text-xs font-black tabular-nums">{showBalance ? "20.00" : "******"}</span>
                                        <button type="button" className="text-white hover:text-[#00bc7d] transition-colors p-1 rounded" aria-label="Refresh balances">
                                          <RefreshCw size={14} />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Deposit Button - Pill Style inside (compact) */}
                      <Button
                        asChild
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap py-2 px-4 h-[34px] rounded-[10px] text-[13px] bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 hover:brightness-110 text-black font-black transition-all border-none"
                      >
                        <Link to="/deposit">{t("deposit")}</Link>
                      </Button>
                    </div>

                    {/* Rollover Target Button */}
                    <div className="relative" data-rollover-dropdown>
                      <button
                        onClick={() => setIsRolloverOpen(!isRolloverOpen)}
                        className="w-10 h-10 rounded-xl bg-[#e65c00] hover:bg-[#cc5200] flex items-center justify-center text-white transition-all hover:scale-105"
                      >
                        <Target size={20} />
                      </button>

                      {/* Rollover Dropdown - centered on mobile, right-aligned on desktop */}
                      {isRolloverOpen && (
                        <div className="fixed left-1/2 -translate-x-1/2 top-20 w-[min(320px,calc(100vw-2rem))] md:absolute md:left-auto md:right-0 md:top-14 md:translate-x-0 md:w-[320px] bg-[#1a2230] rounded-2xl shadow-2xl border border-white/5 overflow-hidden animate-in slide-in-from-top-2 fade-in duration-300 z-50">
                          {/* Header Section – same as wallet dropdown: icon + title + subtitle */}
                          <div className="flex items-center gap-3 p-4 border-b border-white/5">
                            <div className="h-10 w-10 rounded-xl bg-black/25 border border-white/10 flex items-center justify-center shrink-0">
                              <Target className="w-5 h-5 text-[#00bc7d]" strokeWidth={2.5} />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-white font-bold text-base leading-tight">{t("rolloverStatus")}</span>
                              <span className="text-[#00bc7d] text-[10px] font-black uppercase tracking-wider truncate mt-0.5">
                                {activePromo ? activePromo.name : t("completed")}
                              </span>
                            </div>
                          </div>

                          {/* Content – same structure as wallet / deposit rollover: single card */}
                          {activePromo ? (
                            <div className="p-4">
                              <div className="bg-[#0f151f] rounded-xl p-4 border border-white/5 space-y-3">
                                {/* Promo Rollover row – same label/value style as deposit rollover */}
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-gray-400 text-xs font-bold">{t("promoRollover")}</span>
                                    <span className="text-amber-400 font-black text-xs tabular-nums">
                                      {activePromo.promoRolloverCurrent.toFixed(2)} / {activePromo.promoRolloverTarget.toFixed(2)}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="flex-1 h-2 bg-black/40 rounded-full overflow-hidden border border-white/5 p-[0.5px]">
                                      <div
                                        className="h-full bg-[#00bc7d] rounded-full transition-all"
                                        style={{ width: `${Math.min(100, (activePromo.promoRolloverCurrent / activePromo.promoRolloverTarget) * 100)}%` }}
                                      />
                                    </div>
                                    <span className="text-white font-black text-[10px] tabular-nums shrink-0">
                                      {activePromo.promoRolloverTarget > 0
                                        ? ((activePromo.promoRolloverCurrent / activePromo.promoRolloverTarget) * 100).toFixed(1)
                                        : 0}%
                                    </span>
                                  </div>
                                </div>
                                {/* Target row */}
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-gray-400 text-xs font-bold">{t("target")}</span>
                                    <span className="text-amber-400 font-black text-xs tabular-nums">
                                      {activePromo.targetCurrent.toFixed(2)} / {activePromo.targetTarget.toFixed(2)}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="flex-1 h-2 bg-black/40 rounded-full overflow-hidden border border-white/5 p-[0.5px]">
                                      <div
                                        className="h-full bg-[#00bc7d] rounded-full transition-all"
                                        style={{ width: `${activePromo.targetTarget > 0 ? Math.min(100, (activePromo.targetCurrent / activePromo.targetTarget) * 100) : 0}%` }}
                                      />
                                    </div>
                                    <span className="text-white font-black text-[10px] tabular-nums shrink-0">
                                      {activePromo.targetTarget > 0
                                        ? ((activePromo.targetCurrent / activePromo.targetTarget) * 100).toFixed(0)
                                        : 0}%
                                    </span>
                                  </div>
                                </div>
                                {/* Info row – same pattern as wallet Game Wallet row */}
                                <div className="flex items-start gap-2 pt-1 border-t border-white/5">
                                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <Info className="w-3 h-3 text-gray-400" />
                                  </div>
                                  <p className="text-gray-400 text-[11px] leading-relaxed">{t("gameWalletPromoInfo")}</p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            /* No active promo: show Deposit Rollover (completed) */
                            <div className="p-4">
                              <div className="bg-[#0f151f] rounded-xl p-4 border border-white/5 space-y-3">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-gray-400 text-xs font-bold">{t("depositRollover")}</span>
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-white font-black text-xs">436</span>
                                      <span className="text-gray-600 text-[10px]">/</span>
                                      <span className="text-[#00bc7d] font-black text-xs">436</span>
                                    </div>
                                  </div>
                                  <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 p-[0.5px]">
                                    <div className="h-full w-full bg-[#00bc7d] rounded-full relative">
                                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]"></div>
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center pt-1">
                                    <span className="text-[#00bc7d] text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                                      <div className="w-1.5 h-1.5 rounded-full bg-[#00bc7d] shadow-[0_0_8px_rgba(0,188,125,0.8)] animate-pulse"></div>
                                      Verified
                                    </span>
                                    <span className="text-white font-black text-[10px] tracking-tighter bg-[#00bc7d]/10 px-2 py-0.5 rounded">100% DONE</span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-500 text-[11px] leading-relaxed mt-3 px-1 text-center font-medium">
                                Your requirement is completed. <br />You can now proceed with your withdrawal.
                              </p>
                            </div>
                          )}
                          <style>{`
                                  @keyframes shimmer {
                                    0% { transform: translateX(-100%); }
                                    100% { transform: translateX(100%); }
                                  }
                                `}</style>
                        </div>
                      )}
                    </div>

                    {/* Account Utilities */}
                    <div className="flex items-center gap-2">
                      {/* Search Icon */}
                      <button
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all"
                        onClick={handleOpenSearch}
                      >
                        <Search size={18} />
                      </button>

                      {/* Profile Icon */}
                      <Link
                        to="/settings"
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all"
                      >
                        <User size={18} />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <Button
                      asChild
                      variant="ghost"
                      className="text-gray-300 hover:text-white font-bold text-xs sm:text-sm tracking-wide hover:bg-transparent px-2 sm:px-4"
                    >
                      <Link to="/login">{t("login")}</Link>
                    </Button>
                    <Button
                      asChild
                      className="bg-[#00ff88] hover:bg-[#00dd76] text-black font-extrabold rounded-full px-4 sm:px-6 py-2 h-8 sm:h-9 text-[10px] sm:text-sm tracking-wider transition-all hover:scale-105"
                    >
                      <Link to="/register">{t("joinNow")}</Link>
                    </Button>
                  </>
                )}
              </div>

              {/* Vertical Divider - Only show when NOT authenticated and on desktop */}
              {!isAuthenticated && (
                <div className="h-8 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden sm:block"></div>
              )}

              {/* Language: Pill Glass Selector with Dropdown (controlled - only one header dropdown open at a time) */}
              <div data-language-dropdown ref={languageDropdownTriggerRef}>
                <DropdownMenu open={isLanguageDropdownOpen} onOpenChange={updateLanguageDropdownOpen}>
                  <DropdownMenuTrigger asChild>
                    <button
                      data-language-dropdown-trigger
                      className="h-10 px-2 sm:px-2.5 rounded-[10px] bg-white/5 border border-white/10 flex items-center justify-center gap-1.5 text-gray-300 hover:text-white hover:bg-white/10 hover:border-[#00bc7d]/50 transition-all duration-300 group outline-none"
                    >
                      <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center shrink-0 overflow-hidden rounded-full border border-white/10 bg-[#0a0a0a] shadow-lg relative">
                        <currentLang.icon className="w-full h-full object-cover object-center" />
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-full pointer-events-none"></div>
                      </div>
                      <ChevronDown className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    data-language-dropdown-content
                    className="w-56 bg-[#1a2230]/98 backdrop-blur-2xl border border-white/10 text-white rounded-[20px] shadow-[0_25px_70px_rgba(0,0,0,0.7),0_0_30px_rgba(0,255,136,0.03)] p-2 z-[101]"
                  >
                    <div className="flex flex-col gap-1">
                      {languages.map((lang) => (
                        <DropdownMenuItem
                          key={lang.id}
                          onClick={() => {
                            setCurrentLang(lang);
                            updateLanguageDropdownOpen(false);
                          }}
                          className={`group flex items-center gap-3.5 px-4 py-3.5 rounded-[14px] cursor-pointer transition-all duration-300 outline-none ${currentLang.id === lang.id
                            ? 'bg-gradient-to-r from-[#00bc7d]/10 to-transparent text-[#00ff88] shadow-[inset_0_0_20px_rgba(0,255,136,0.02)]'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                            }`}
                        >
                          <div className={`w-8 h-8 flex items-center justify-center shrink-0 overflow-hidden rounded-full border transition-all duration-500 ${currentLang.id === lang.id ? 'border-[#00ff88]/40 scale-110 shadow-[0_0_15px_rgba(0,255,136,0.2)]' : 'border-white/10 group-hover:border-white/20'
                            }`}>
                            <lang.icon className="w-full h-full object-cover object-center" />
                          </div>

                          <span className={`font-bold text-[15px] tracking-tight transition-colors duration-300 ${currentLang.id === lang.id ? 'text-[#00ff88]' : 'group-hover:text-white'}`}>
                            {lang.label}
                          </span>

                          {currentLang.id === lang.id && (
                            <div className="ml-auto relative flex items-center justify-center w-1.5 h-6">
                              {/* Glowing Background for the line */}
                              <div className="absolute inset-0 bg-[#00ff88] blur-[6px] opacity-40 animate-pulse"></div>
                              {/* Main vertical line with rounded ends (pill shape) */}
                              <div className="relative w-1 h-full bg-[#00ff88] rounded-full shadow-[0_0_15px_rgba(0,255,136,0.8)]"></div>
                            </div>
                          )}
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

            </div>

            {/* Mobile Menu Sheet - Controlled State */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetContent side="left" className="w-[320px] bg-[#02040a] border-none p-0 overflow-hidden flex flex-col">
                <SheetHeader className="p-6 pb-4 border-none shrink-0 bg-transparent relative text-left items-start flex flex-col">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <img src={logoSrc} alt="RioCity9 Logo" className="h-10 w-auto relative z-10" />
                    </div>
                    <SheetTitle className="text-xl font-black tracking-tight text-white flex items-center">
                      Rio<span className="text-[#00ff88] ml-0.5">City9</span>
                    </SheetTitle>
                  </div>
                  <SheetDescription className="text-xs text-white/40 text-left mt-2">
                    Your Premium Gaming Destination.
                  </SheetDescription>
                </SheetHeader>

                {/* Updated Menu Component */}
                <div className="flex-1 overflow-hidden">
                  <SidebarMenu onItemClick={() => setIsMenuOpen(false)} />
                </div>

              </SheetContent>
            </Sheet>
          </div>
        </header>

        {/* Navigation */}
        <CategoryNav />

        {/* Main Content */}
        <main className="relative z-10 flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex-1 flex flex-col"
            >
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/slots" element={<Slots />} />
                <Route path="/providers/:providerId" element={<ProviderPage />} />
                <Route path="/slots/:slug" element={<GameDetailPage />} />
                <Route path="/live-casino" element={<LiveCasino />} />
                <Route path="/live-casino/:slug" element={<GameDetailPage />} />
                <Route path="/sports" element={<Sports />} />
                <Route path="/sports/:slug" element={<GameDetailPage />} />
                <Route path="/fishing" element={<Fishing />} />
                <Route path="/lottery" element={<Lottery />} />
                <Route path="/poker" element={<Poker />} />
                <Route path="/recent-games" element={<RecentGame />} />
                <Route path="/crash" element={<Crash />} />
                <Route path="/hot" element={<HotGame />} />
                <Route path="/all" element={<AllGame />} />
                <Route path="/exchange" element={<Exchange />} />
                <Route path="/rebate" element={<Rebate />} />
                <Route path="/membership" element={<Membership />} />
                <Route path="/promotions" element={<Promotions />} />
                <Route path="/promotions/:id" element={<PromotionDetail />} />
                <Route path="/app" element={<ComingSoon title="App" backTo="/" backLabel="Home" />} />
                <Route path="/downlines" element={<Downlines />} />
                <Route path="/security" element={<ChangePassword />} />
                <Route path="/bonus" element={<Bonus />} />
                <Route path="/bonus/:bonusType" element={<Bonus />} />
                <Route path="/register" element={<Register />} />
                <Route path="/referral" element={<Referral />} />
                <Route path="/login" element={<Login />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/history" element={<HistoryRecord />} />
                <Route path="/deposit" element={<Deposit />} />
                <Route path="/withdraw" element={<Withdraw />} />
                <Route path="/information-center" element={<InformationCenter />} />
                {/* Fallback for other routes using Home temporarily or a placeholder */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>

        <AnimatePresence>
          {isAuthenticated && isSearchOpen && (
            <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 py-8 md:py-12 sm:py-16" role="dialog" aria-modal="true" aria-labelledby="search-modal-title">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={handleCloseSearch}
              />
              <motion.div
                initial={{ opacity: 0, y: -16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative w-full max-w-2xl bg-[#1a2230] rounded-2xl border border-white/5 shadow-2xl overflow-hidden z-[101]"
              >
                {/* Header - match wallet/rollover dropdown */}
                <div className={`flex items-center justify-between ${MOBILE.cardPadding} border-b border-white/5`}>
                  <div className={`flex items-center ${MOBILE.gapSm}`}>
                    <div className="h-10 w-10 rounded-xl bg-black/25 border border-white/10 flex items-center justify-center shrink-0">
                      <Search className="w-5 h-5 text-[#00bc7d]" strokeWidth={2.5} aria-hidden />
                    </div>
                    <h2 id="search-modal-title" className={`text-white ${MOBILE.pageTitle} leading-tight`}>{t("searchHeader")}</h2>
                  </div>
                  <button
                    type="button"
                    onClick={handleCloseSearch}
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00bc7d]/50"
                    aria-label={t("cancel")}
                  >
                    <X size={20} strokeWidth={2} />
                  </button>
                </div>

                <div className={`${MOBILE.cardPadding} flex flex-col max-h-[70vh] overflow-y-auto custom-scrollbar`}>
                  {/* Search Input - match History Record (sectionMb like Bet Record) */}
                  <div className={`relative group ${MOBILE.sectionMb}`}>
                    <input
                      ref={inputRef}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(sanitizeTextInput(e.target.value))}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSubmitSearch(searchQuery);
                      }}
                      placeholder={t("searchPlaceholder")}
                      className="w-full h-12 bg-[#0f151f] border border-white/10 text-white rounded-xl pl-12 pr-12 focus:border-[#00bc7d] focus-visible:ring-2 focus-visible:ring-[#00bc7d]/20 placeholder:text-gray-500 outline-none transition-all"
                      aria-label={t("searchPlaceholder")}
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00bc7d] transition-colors pointer-events-none">
                      <Search className="w-5 h-5" strokeWidth={2} aria-hidden />
                    </div>
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00bc7d]/50"
                        aria-label={t("clear")}
                      >
                        <X size={18} strokeWidth={2} />
                      </button>
                    )}
                  </div>

                  {/* Category Tabs - match History Record Quick Filters (gap-3 mb-6) */}
                  <div className={MOBILE.sectionMb}>
                    <FilterTabs
                      items={searchCategories.map((item) => ({
                        id: item.value,
                        label: t(item.labelKey as any),
                      }))}
                      activeId={selectedSearchCategory}
                      onSelect={setSelectedSearchCategory}
                      scrollable
                      buttonRole="tab"
                      useAriaSelected
                      activeClassName="border-[#00bc7d] bg-[#00bc7d]/10 text-[#00bc7d] shadow-[0_0_15px_rgba(0,188,125,0.2)]"
                    />
                  </div>

                  {/* Recent Searches */}
                  <div className={`${MOBILE.spaceY} ${MOBILE.sectionMb}`}>
                    <div className={`flex items-center justify-between ${MOBILE.caption} font-bold uppercase tracking-wider`}>
                      <span>{t("recentSearches")}</span>
                      {recentSearches.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setRecentSearches([])}
                          className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00bc7d]/50 rounded"
                        >
                          {t("clear")}
                          <Trash2 size={14} strokeWidth={2} className="hover:text-red-400 transition-colors" />
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.length === 0 ? (
                        <span className="text-gray-500 text-xs italic">{t("noRecentActivity")}</span>
                      ) : (
                        recentSearches.map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setSearchQuery(item)}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/5 bg-[#0f151f] text-xs font-medium text-gray-400 hover:border-[#00bc7d]/30 hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00bc7d]/50"
                          >
                            {item}
                          </button>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Results Section */}
                  <div className={MOBILE.spaceY}>
                    <p className={`${MOBILE.caption} font-bold uppercase tracking-wider`}>
                      {searchQuery
                        ? `${t("searchResults")} (${filteredResults.length})`
                        : `${t(getSearchCategoryLabel(selectedSearchCategory) as any)} ${t("items")}`}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {filteredResults.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleItemClick(item)}
                          className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#0f151f] p-3 text-left hover:border-[#00bc7d]/30 hover:bg-[#131b29] transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00bc7d]/50"
                        >
                          <div className="h-10 w-10 rounded-xl bg-[#1a2230] border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className={`w-full h-full ${item.type === 'provider' ? 'object-contain p-1' : 'object-cover'}`}
                              />
                            ) : (
                              <span className="text-[#00bc7d] font-black text-xs uppercase">
                                {item.type === 'provider' ? 'P' : 'G'}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className={`text-white ${MOBILE.body} font-bold tracking-tight truncate`}>{item.name}</span>
                            <span className="text-gray-500 text-xs font-medium uppercase tracking-tighter">
                              {item.type === 'provider' ? t("provider") : item.provider}
                            </span>
                          </div>
                        </button>
                      ))}

                      {/* Empty / no results state */}
                      {searchQuery && filteredResults.length === 0 && (
                        <div className="col-span-full py-10 flex flex-col items-center justify-center text-center space-y-4">
                          <div className="w-14 h-14 rounded-xl bg-[#0f151f] border border-white/10 flex items-center justify-center text-gray-500">
                            <Search className="w-7 h-7" strokeWidth={2} aria-hidden />
                          </div>
                          <div className="space-y-1">
                            <p className={`text-white ${MOBILE.body} font-bold`}>{t("noResultsFor")} &quot;{searchQuery}&quot;</p>
                            <p className={`${MOBILE.caption}`}>{t("tryDifferentKeywords")}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Language Modal */}
        {isLanguageOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 py-12 md:py-20">
            <div
              className="absolute inset-0 bg-black/10 backdrop-blur-xs transition-opacity duration-300"
              onClick={handleCloseLanguage}
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-[#0f1923] rounded-[24px] border border-white/10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)] overflow-hidden z-[101]"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00bc7d]/10 border border-[#00bc7d]/20 flex items-center justify-center">
                    <Languages className="w-4 h-4 text-[#00bc7d]" />
                  </div>
                  <h3 className="text-white font-black text-lg uppercase tracking-tighter">{t("changeLanguage")}</h3>
                </div>
                <button
                  type="button"
                  onClick={handleCloseLanguage}
                  className="h-9 w-9 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="px-6 pb-6 pt-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="space-y-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => {
                        setCurrentLang(lang);
                        handleCloseLanguage();
                      }}
                      className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-[14px] cursor-pointer transition-all duration-300 outline-none ${currentLang.id === lang.id
                        ? 'bg-gradient-to-r from-[#00bc7d]/10 to-transparent text-[#00ff88] shadow-[inset_0_0_20px_rgba(0,255,136,0.02)] border border-[#00bc7d]/30'
                        : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                        }`}
                    >
                      <div className={`w-8 h-8 flex items-center justify-center shrink-0 overflow-hidden rounded-full border transition-all duration-500 ${currentLang.id === lang.id ? 'border-[#00ff88]/40 scale-110 shadow-[0_0_15px_rgba(0,255,136,0.2)]' : 'border-white/10'
                        }`}>
                        <lang.icon className="w-full h-full object-cover object-center" />
                      </div>

                      <span className={`font-bold text-[15px] tracking-tight transition-colors duration-300 ${currentLang.id === lang.id ? 'text-[#00ff88]' : ''}`}>
                        {lang.label}
                      </span>

                      {currentLang.id === lang.id && (
                        <div className="ml-auto relative flex items-center justify-center w-1.5 h-6">
                          <div className="absolute inset-0 bg-[#00ff88] rounded-full blur-[2px] opacity-60"></div>
                          <div className="relative w-full h-full bg-[#00ff88] rounded-full"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        <MobileBottomNav onMenuClick={() => setIsMenuOpen(true)} />

        {/* Footer */}
        <Footer />

        {/* Floating Reward Widget */}
        <FloatingRewardWidget />

        <AnimatePresence>
          {showBackToTop && (
            <motion.div
              key="back-to-top"
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="hidden md:block fixed bottom-64 md:bottom-45 right-8 z-40"
            >
              <Button
                type="button"
                size="icon"
                aria-label="Back to top"
                onClick={handleBackToTop}
                className="h-12 w-12 rounded-full border border-white/10 bg-[#1a2230] text-white shadow-lg transition-all duration-300 hover:bg-[#252f40] hover:border-[#00bc7d]/50 hover:text-[#00bc7d]"
              >
                <ChevronUp className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Live Chat Button - on mobile above bottom nav, stays right so gift widget can sit left */}
        <div className="fixed bottom-24 md:bottom-6 right-6 z-50 flex flex-col items-end gap-4">

          {/* Sitemap Navigation FAB - Temporarily Hidden */}
          {/* <div className="relative">
             {isNavMenuOpen && (
                 <div className="absolute bottom-16 right-0 w-64 bg-[#131b29] border border-white/10 rounded-xl shadow-2xl p-2 animate-in slide-in-from-bottom-5 fade-in duration-200 overflow-hidden z-50">
                     <div className="text-xs font-bold text-gray-500 px-3 py-2 uppercase tracking-wider border-b border-white/5 mb-1">
                        {t("navigationMap")}
                     </div>
                     <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                        {categories.map((cat) => (
                             <Link 
                                key={cat.id} 
                                to={cat.path}
                                onClick={() => setIsNavMenuOpen(false)}
                                className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                             >
                                <cat.icon className="w-4 h-4 text-[#00bc7d]" />
                                <span>{t(cat.labelKey as any)}</span>
                             </Link>
                        ))}
                        <div className="h-px bg-white/5 my-1"></div>
                        <Link to="/settings" onClick={() => setIsNavMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                            <span className="w-4 h-4 flex items-center justify-center font-bold text-[#00bc7d]">⚙️</span>
                            <span>{t("settings")}</span>
                        </Link>
                        <Link to="/deposit" onClick={() => setIsNavMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                            <span className="w-4 h-4 flex items-center justify-center font-bold text-[#00bc7d]">💳</span>
                            <span>{t("deposit")}</span>
                        </Link>
                        <Link to="/withdraw" onClick={() => setIsNavMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                            <span className="w-4 h-4 flex items-center justify-center font-bold text-[#00bc7d]">🏧</span>
                            <span>{t("withdraw")}</span>
                        </Link>
                        <Link to="/register" onClick={() => setIsNavMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                            <span className="w-4 h-4 flex items-center justify-center font-bold text-[#00bc7d]">📝</span>
                            <span>{t("register")}</span>
                        </Link>
                        <Link to="/login" onClick={() => setIsNavMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                            <span className="w-4 h-4 flex items-center justify-center font-bold text-[#00bc7d]">🔐</span>
                            <span>{t("login")}</span>
                        </Link>
                       <Link to="/referral" onClick={() => setIsNavMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                            <span className="w-4 h-4 flex items-center justify-center font-bold text-[#00bc7d]">🔐</span>
                            <span>{t("referral")}</span>
                        </Link>
                     </div>
                 </div>
             )}
             <Button 
                onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
                className={`h-12 w-12 rounded-full border border-white/10 transition-all duration-300 ${isNavMenuOpen ? 'bg-gray-700 hover:bg-gray-600' : 'bg-[#1a2230] hover:bg-[#252f40]'} text-white`}
               title={t("allPages")}
             >
                 {isNavMenuOpen ? <X className="h-5 w-5" /> : <Map className="h-5 w-5" />}
             </Button>
          </div> */}

          {/* Live Chat FAB */}
          <div className="relative">
            <Button
              onClick={() => setIsLiveChatOpen(!isLiveChatOpen)}
              className={`h-14 w-14 rounded-full transition-all duration-300 ${isLiveChatOpen ? 'bg-red-500 hover:bg-red-600 rotate-90' : 'bg-[#00bc7d] hover:bg-[#00a870] hover:scale-110 animate-bounce'}`}
            >
              {isLiveChatOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-7 w-7" />}
            </Button>

            {/* Chat Window (Mockup) */}
            {isLiveChatOpen && (
              <div className="absolute bottom-20 right-0 w-[350px] h-[500px] bg-[#0f1923] border border-[#00bc7d]/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 z-50">
                <div className="bg-emerald-600 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <CircleHelp className="text-white w-6 h-6" />
                      </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#00bc7d]"></div>
                    </div>
                    <div>
                      <div className="font-bold text-white">RioCity9 Support</div>
                      <div className="text-xs text-white/90">Typically replies in 2m</div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 bg-[#0a0f19] p-4 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
                  <div className="bg-[#1a2536] p-3 rounded-xl rounded-tl-none self-start max-w-[80%] text-sm text-gray-300">
                    Hello! Welcome to RioCity9. How can we help you today?
                  </div>
                  <div className="text-center text-xs text-gray-600 my-2">Today 10:23 AM</div>

                  {/* User message if sent */}
                  {chatMessage && (
                    <div className="bg-emerald-600 p-3 rounded-xl rounded-tr-none self-end max-w-[80%] text-sm text-white">
                      {chatMessage}
                    </div>
                  )}
                </div>

                {/* Suggested Messages Section */}
                {showSuggestedMessages && (
                  <div className="px-3 py-2 border-t border-white/10 bg-[#0f1923]">
                    <div className="text-xs font-bold text-[#d4a520] mb-2">Suggested Messages</div>
                    <div className="flex flex-wrap gap-2">
                      {suggestedMessages.map((msg, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setChatMessage(sanitizeTextInput(msg).slice(0, 500));
                            setShowSuggestedMessages(false);
                          }}
                          className="px-3 py-1.5 bg-white text-[#0f1923] text-xs font-medium rounded-full hover:bg-gray-100 transition-colors border border-gray-200"
                        >
                          {msg}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-3 border-t border-white/10 bg-[#0f1923] flex items-center gap-2">
                  <button className="text-gray-500 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                  </button>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(sanitizeTextInput(e.target.value).slice(0, 500))}
                    maxLength={500}
                    onFocus={() => setShowSuggestedMessages(true)}
                    className="flex-1 bg-[#1a2536] border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00bc7d]/50"
                  />
                  <button className="text-gray-500 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </>
  );
}

// Main App with Auth Provider
export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ActivePromoProvider>
          <BrowserRouter>
            <SessionProvider>
              <AppContent />
              <Analytics />
            </SessionProvider>
          </BrowserRouter>
        </ActivePromoProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
