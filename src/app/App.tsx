import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Button } from './components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from './components/ui/sheet';
import { Search, Menu, MessageCircle, X, Languages, CircleHelp, ChevronDown, Globe, Home as HomeIcon, Gamepad2, Dices, Trophy, Fish, Ticket, Star, Smartphone, Gift, Map, LogOut, User, Eye, EyeOff, Plus, LayoutDashboard } from 'lucide-react';
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
  const { isAuthenticated, user, logout } = useAuth();

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

  return (
    <BrowserRouter>
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
                          {/* Balance Display - Fixed width to prevent layout shift */}
                          <div className="hidden sm:flex items-center gap-2 h-10 px-3 bg-[#131b29]/60 border border-white/10 rounded-xl">
                              <button 
                                onClick={() => setShowBalance(!showBalance)}
                                className="text-gray-400 hover:text-white transition-colors"
                              >
                                {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
                              </button>
                              <div className="flex items-center gap-1 min-w-[80px]">
                                <span className="text-[13px] font-black text-white">MYR</span>
                                <span className="text-[13px] font-black text-white">{showBalance ? "0.00" : "****"}</span>
                              </div>
                              <ChevronDown size={14} className="text-gray-500" />
                          </div>

                          {/* Deposit Button - Yellow per screenshot */}
                          <Button
                            asChild
                            className="bg-[#fab005] hover:bg-[#e2a004] text-black font-black px-4 sm:px-6 h-10 rounded-xl text-sm transition-all hover:scale-105 shadow-[0_0_15px_-5px_rgba(250,176,5,0.4)]"
                          >
                            <Link to="/deposit">Deposit</Link>
                          </Button>

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
              <button className="h-10 w-10 sm:w-auto sm:pl-2 sm:pr-3 rounded-full bg-white/5 border border-white/10 flex items-center justify-center sm:justify-start gap-0 sm:gap-2 text-gray-300 hover:text-white hover:bg-white/10 hover:border-emerald-500/50 transition-all duration-300 group">
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
          <Routes>
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
            <Route path="/security" element={<ComingSoon title="Change Password" backTo="/settings" backLabel="Settings" />} />
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
                    </div>
                    <div className="p-3 border-t border-white/10 bg-[#0f1923]">
                        <input 
                            type="text" 
                            placeholder="Type a message..." 
                            className="w-full bg-[#1a2536] border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                        />
                    </div>
                </div>
            )}
          </div>
        </div>

      </div>
    </BrowserRouter>
  );
}

// Main App with Auth Provider
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
