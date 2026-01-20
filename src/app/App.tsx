import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from './components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from './components/ui/sheet';
import { Search, Menu, MessageCircle, X, Languages, CircleHelp, ChevronDown, Globe, Home as HomeIcon, Gamepad2, Dices, Trophy, Fish, Ticket, Star, Smartphone, Gift, Map, LogOut, User, Eye, EyeOff, Plus, LayoutDashboard, Target } from 'lucide-react';
import { FlagUK } from './components/figma/FlagUK';

import { Footer } from './components/home/Footer';
import { CategoryNav } from './components/home/CategoryNav';
import { MobileBottomNav } from './components/home/MobileBottomNav';
import { SidebarMenu } from './components/shared/SidebarMenu';
import { Home } from './pages/Home';
import { Slots } from './pages/Slots';
import { LiveCasino } from './pages/LiveCasino';
import { Sports } from './pages/Sports';
import { Fishing } from './pages/Fishing';
import { Lottery } from './pages/Lottery';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Settings } from './pages/Settings';
import { Deposit } from './pages/Deposit';
import { Withdraw } from './pages/Withdraw';
import { Referral } from './pages/Referral';
import { Profile } from './pages/Profile';
import { HistoryRecord } from './pages/HistoryRecord';
import { ChangePassword } from './pages/ChangePassword';
import { ComingSoon } from './pages/ComingSoon';
import { Bonus } from './pages/Bonus';
import { NotFound } from './pages/NotFound';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const categories = [
  { id: 'lobby', label: 'Lobby', icon: HomeIcon, path: '/' },
  { id: 'slots', label: 'Slots', icon: Gamepad2, path: '/slots' },
  { id: 'live', label: 'Live Casino', icon: Dices, path: '/live-casino' },
  { id: 'sports', label: 'Sports', icon: Trophy, path: '/sports' },
  { id: 'fish', label: 'Fishing', icon: Fish, path: '/fishing' },
  { id: 'lottery', label: 'Lottery', icon: Ticket, path: '/lottery' },
  { id: 'vip', label: 'VIP Club', icon: Star, path: '/vip', color: 'text-yellow-400' },
  { id: 'promotions', label: 'Promotions', icon: Gift, path: '/promotions', color: 'text-pink-400' },
  { id: 'app', label: 'App', icon: Smartphone, path: '/app', color: 'text-emerald-400' },
];

const logoSrc = "/src/assets/a03f3822b9d12864ad14bfc82b6125e4be8a8d49.png";

// Internal App Component that uses Auth
function AppContent() {
  // Main App Component with Routes and Navigation
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [showSuggestedMessages, setShowSuggestedMessages] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [isRolloverOpen, setIsRolloverOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

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
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close rollover dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isRolloverOpen && !target.closest('[data-rollover-dropdown]')) {
        setIsRolloverOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isRolloverOpen]);

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
            <div className="text-emerald-500 font-black tracking-[0.2em] text-sm uppercase animate-pulse">
                Loading...
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
      <div className="min-h-screen text-foreground font-sans selection:bg-emerald-500/30 selection:text-emerald-400 flex flex-col">
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
            className={`sticky top-0 z-50 w-full border-b transition-all duration-300 shadow-lg ${
                isScrolled 
                ? 'bg-[#02040a]/95 backdrop-blur-xl border-white/10' 
                : 'bg-[#02040a]/60 backdrop-blur-md border-white/5'
            }`}
        >
          <div className="container mx-auto max-w-[1200px] 2xl:max-w-[1536px] px-4 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2 xl:gap-3">
              {/* Desktop Menu Trigger */}
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-emerald-500 hover:text-emerald-500 hover:bg-white/10 hover:border-emerald-500/50 transition-all duration-300 group"
              >
                  <Menu className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 group shrink-0">
                <div className="relative">
                  <img src={logoSrc} alt="RioCity9 Logo" className="h-10 w-auto relative z-10" />
                  <div className="absolute inset-0 bg-emerald-500/50 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-2xl font-black tracking-tight text-white hidden xl:block">
                  Rio<span className="text-emerald-500">City9</span>
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
                          <div className="hidden sm:flex items-center bg-[#131b29]/60 border border-white/10 rounded-[10px] pl-4 pr-1 h-11 transition-all hover:border-emerald-500/30 shadow-lg">
                              {/* Balance Section */}
                              <div className="flex items-center gap-2.5 mr-4">
                                  <button 
                                    onClick={() => setShowBalance(!showBalance)}
                                    className="text-gray-500 hover:text-white transition-colors"
                                  >
                                    {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
                                  </button>
                                  <div className="flex items-center gap-1.5 min-w-[80px]">
                                    <span className="text-[13px] font-black text-white tracking-wide">MYR</span>
                                    <span className="text-[14px] font-black text-white tracking-tight">{showBalance ? "0.00" : "****"}</span>
                                  </div>
                              </div>

                              {/* Deposit Button - Pill Style inside */}
                              <Button
                                asChild
                                className="bg-gradient-to-b from-[#f7e08b] via-[#eab84b] to-[#d4a520] hover:brightness-110 text-[#3d2b00] font-black px-6 h-[34px] rounded-[10px] text-[13px] transition-all shadow-[0_2px_10px_rgba(212,165,32,0.3)] border-none"
                              >
                                <Link to="/deposit">Deposit</Link>
                              </Button>
                          </div>

                          {/* Rollover Target Button */}
                          <div className="relative" data-rollover-dropdown>
                            <button
                              onClick={() => setIsRolloverOpen(!isRolloverOpen)}
                              className="w-10 h-10 rounded-xl bg-[#e65c00] hover:bg-[#cc5200] flex items-center justify-center text-white transition-all hover:scale-105 shadow-[0_0_15px_-5px_rgba(230,92,0,0.4)]"
                            >
                              <Target size={20} />
                            </button>

                            {/* Rollover Dropdown */}
                            {isRolloverOpen && (
                              <div className="absolute top-14 right-0 w-[300px] bg-[#1a2230] rounded-[16px] shadow-2xl border border-white/5 overflow-hidden animate-in slide-in-from-top-2 fade-in duration-300 z-50">
                                {/* Header Section - Match Profile Style */}
                                <div className="flex items-center gap-3 p-5 pb-4 border-b border-white/5">
                                  <div className="h-10 w-10 rounded-xl bg-black/25 border border-white/10 flex items-center justify-center shrink-0">
                                    <Target className="w-5 h-5 text-emerald-500" strokeWidth={2.5} />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-white font-bold text-base leading-tight">Rollover Status</span>
                                    <span className="text-emerald-500 text-[10px] font-black uppercase tracking-wider">Completed</span>
                                  </div>
                                </div>
                                
                                {/* Content Section */}
                                <div className="p-5">
                                  <div className="bg-[#0f151f] rounded-xl p-4 border border-white/5 space-y-4">
                                    <div className="space-y-2.5">
                                      <div className="flex items-center justify-between">
                                        <span className="text-gray-400 text-xs font-bold">Deposit Rollover</span>
                                        <div className="flex items-center gap-1.5">
                                          <span className="text-white font-black text-xs">436</span>
                                          <span className="text-gray-600 text-[10px]">/</span>
                                          <span className="text-emerald-400 font-black text-xs">436</span>
                                        </div>
                                      </div>
                                      
                                      {/* Glowing Progress Bar - Match Profile/Settings style */}
                                      <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 p-[0.5px]">
                                        <div className="h-full w-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full relative">
                                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]"></div>
                                        </div>
                                      </div>

                                      <div className="flex justify-between items-center pt-1">
                                        <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></div>
                                          Verified
                                        </span>
                                        <span className="text-white font-black text-xs tracking-tighter bg-emerald-500/10 px-2 py-0.5 rounded text-[10px]">100% DONE</span>
                                      </div>
                                    </div>
                                  </div>

                                  <p className="text-gray-500 text-[11px] leading-relaxed mt-4 px-1 text-center font-medium">
                                    Your requirement is completed. <br/>You can now proceed with your withdrawal.
                                  </p>
                                </div>
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
                                onClick={() => {/* Search toggle */}}
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
                            <Link to="/login">Log In</Link>
                          </Button>
                          <Button
                            asChild
                            className="bg-[#00ff88] hover:bg-[#00dd76] text-black font-extrabold rounded-full px-4 sm:px-6 py-2 h-8 sm:h-9 text-[10px] sm:text-sm tracking-wider shadow-[0_0_20px_-5px_rgba(0,255,136,0.3)] hover:shadow-[0_0_25px_-5px_rgba(0,255,136,0.5)] transition-all hover:scale-105"
                          >
                            <Link to="/register">JOIN NOW</Link>
                          </Button>
                      </>
                  )}
              </div>

              {/* Vertical Divider - Only show when NOT authenticated and on desktop */}
              {!isAuthenticated && (
                <div className="h-8 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden sm:block"></div>
              )}

              {/* Language: Pill Glass Selector */}
              <button className="h-10 w-10 sm:w-auto sm:pl-2 sm:pr-3 rounded-[10px] bg-white/5 border border-white/10 flex items-center justify-center sm:justify-start gap-0 sm:gap-2 text-gray-300 hover:text-white hover:bg-white/10 hover:border-emerald-500/50 transition-all duration-300 group">
                  <FlagUK className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-white/10 group-hover:border-white/30 transition-colors" />
                  <span className="hidden sm:block text-xs font-bold tracking-wide font-mono uppercase">EN</span>
                  <ChevronDown className="hidden sm:block w-3 h-3 text-gray-500 group-hover:text-white transition-colors" />
              </button>

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
                <Route path="/live-casino" element={<LiveCasino />} />
                <Route path="/sports" element={<Sports />} />
                <Route path="/fishing" element={<Fishing />} />
                <Route path="/lottery" element={<Lottery />} />
                <Route path="/poker" element={<ComingSoon title="Poker" backTo="/" backLabel="Home" />} />
                <Route path="/crash" element={<ComingSoon title="Crash" backTo="/" backLabel="Home" />} />
                <Route path="/hot" element={<ComingSoon title="Hot Games" backTo="/" backLabel="Home" />} />
                <Route path="/all" element={<ComingSoon title="All Games" backTo="/" backLabel="Home" />} />
                <Route path="/exchange" element={<ComingSoon title="Exchange" backTo="/" backLabel="Home" />} />
                <Route path="/rebate" element={<ComingSoon title="Rebate" backTo="/" backLabel="Home" />} />
                <Route path="/vip" element={<ComingSoon title="VIP Club" backTo="/" backLabel="Home" />} />
                <Route path="/promotions" element={<ComingSoon title="Promotions" backTo="/" backLabel="Home" />} />
                <Route path="/app" element={<ComingSoon title="App" backTo="/" backLabel="Home" />} />
                <Route path="/downlines" element={<ComingSoon title="Downlines" backTo="/settings" backLabel="Settings" />} />
                <Route path="/language" element={<ComingSoon title="Change Language" backTo="/settings" backLabel="Settings" />} />
                <Route path="/security" element={<ChangePassword />} />
                <Route path="/bonus/:bonusType" element={<Bonus />} />
                <Route path="/register" element={<Register />} />
                <Route path="/referral" element={<Referral />} />
                <Route path="/login" element={<Login />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/history" element={<HistoryRecord />} />
                <Route path="/deposit" element={<Deposit />} />
                <Route path="/withdraw" element={<Withdraw />} />
                {/* Fallback for other routes using Home temporarily or a placeholder */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
        
        <MobileBottomNav onMenuClick={() => setIsMenuOpen(true)} />
        
        {/* Footer */}
        <Footer />

        {/* Floating Live Chat Button */}
        <div className="fixed bottom-24 md:bottom-6 right-6 z-50 flex flex-col items-end gap-4">
          
          {/* Sitemap Navigation FAB */}
          <div className="relative">
             {isNavMenuOpen && (
                 <div className="absolute bottom-16 right-0 w-64 bg-[#131b29] border border-white/10 rounded-xl shadow-2xl p-2 animate-in slide-in-from-bottom-5 fade-in duration-200 overflow-hidden z-50">
                     <div className="text-xs font-bold text-gray-500 px-3 py-2 uppercase tracking-wider border-b border-white/5 mb-1">
                        Navigation Map
                     </div>
                     <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                        {categories.map((cat) => (
                             <Link 
                                key={cat.id} 
                                to={cat.path}
                                onClick={() => setIsNavMenuOpen(false)}
                                className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                             >
                                <cat.icon className="w-4 h-4 text-emerald-500" />
                                <span>{cat.label}</span>
                             </Link>
                        ))}
                        <div className="h-px bg-white/5 my-1"></div>
                        <Link to="/settings" onClick={() => setIsNavMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                            <span className="w-4 h-4 flex items-center justify-center font-bold text-emerald-500">⚙️</span>
                            <span>Settings</span>
                        </Link>
                        <Link to="/deposit" onClick={() => setIsNavMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                            <span className="w-4 h-4 flex items-center justify-center font-bold text-emerald-500">💳</span>
                            <span>Deposit</span>
                        </Link>
                        <Link to="/withdraw" onClick={() => setIsNavMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                            <span className="w-4 h-4 flex items-center justify-center font-bold text-emerald-500">🏧</span>
                            <span>Withdraw</span>
                        </Link>
                        <Link to="/register" onClick={() => setIsNavMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                            <span className="w-4 h-4 flex items-center justify-center font-bold text-emerald-500">📝</span>
                            <span>Register</span>
                        </Link>
                        <Link to="/login" onClick={() => setIsNavMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                            <span className="w-4 h-4 flex items-center justify-center font-bold text-emerald-500">🔐</span>
                            <span>Login</span>
                        </Link>
                       <Link to="/referral" onClick={() => setIsNavMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                            <span className="w-4 h-4 flex items-center justify-center font-bold text-emerald-500">🔐</span>
                            <span>Referral</span>
                        </Link>
                     </div>
                 </div>
             )}
             <Button 
                onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
                className={`h-12 w-12 rounded-full shadow-lg border border-white/10 transition-all duration-300 ${isNavMenuOpen ? 'bg-gray-700 hover:bg-gray-600' : 'bg-[#1a2230] hover:bg-[#252f40]'} text-white`}
                title="All Pages"
             >
                 {isNavMenuOpen ? <X className="h-5 w-5" /> : <Map className="h-5 w-5" />}
             </Button>
          </div>

          {/* Live Chat FAB */}
          <div className="relative">
            <Button 
                onClick={() => setIsLiveChatOpen(!isLiveChatOpen)}
                className={`h-14 w-14 rounded-full shadow-2xl transition-all duration-300 ${isLiveChatOpen ? 'bg-red-500 hover:bg-red-600 rotate-90' : 'bg-emerald-500 hover:bg-emerald-400 hover:scale-110 animate-bounce'}`}
            >
                {isLiveChatOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-7 w-7" />}
            </Button>
            
            {/* Chat Window (Mockup) */}
            {isLiveChatOpen && (
                <div className="absolute bottom-20 right-0 w-[350px] h-[500px] bg-[#0f1923] border border-emerald-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 z-50">
                    <div className="bg-emerald-600 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <CircleHelp className="text-white w-6 h-6" />
                                </div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-emerald-600"></div>
                            </div>
                            <div>
                                <div className="font-bold text-white">RioCity9 Support</div>
                                <div className="text-xs text-emerald-100">Typically replies in 2m</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-[#0a0f19] p-4 flex flex-col gap-4 overflow-y-auto">
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
                                            setChatMessage(msg);
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                        </button>
                        <input 
                            type="text" 
                            placeholder="Type a message..." 
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                            onFocus={() => setShowSuggestedMessages(true)}
                            className="flex-1 bg-[#1a2536] border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                        />
                        <button className="text-gray-500 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
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
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
