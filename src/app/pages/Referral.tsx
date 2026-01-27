import React, { useState } from 'react';
import { Copy, ChevronRight, Info, Users, Gift } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';

// Assets - using proper imports for local assets
import shareYourLinkIcon from '@/assets/share-your-link.svg';
import friendRegisterIcon from '@/assets/friend-register.svg';
import earnBonusIcon from '@/assets/earn-bonus.svg';
import imgHeroBg from '@/assets/referral-bg.jpg';
import tierBg from '@/assets/tier-bg.jpg';
import tierImg from '@/assets/tier.png';

const commissionRates = [
    {
        category: "Slots",
        items: [
            { provider: "Pragmatic Play Slot", l1: "0.99", l2: "0.6", l3: "0.4" },
            { provider: "PGSOFT", l1: "0.7", l2: "0.6", l3: "0.4" },
            { provider: "FaChai Slot", l1: "0.7", l2: "0.6", l3: "0.4" },
        ]
    },
    { category: "Live Casino", items: [] },
    { category: "Fish Hunt", items: [] },
    { category: "Sports", items: [] },
    { category: "Lottery", items: [] },
    { category: "All", items: [] },
    { category: "E-Games", items: [] },
    { category: "Poker", items: [] },
    { category: "Crash", items: [] },
];

const faqs = [
    {
        question: "How does our Referral Program work?",
        answer: "You can earn cash rewards up to three referral tiers when you refer your friends. Invite your friends to join together and be entitled for lifetime cash rewards each time your friends Deposit."
    },
    {
        question: "What Should You Do?",
        answer: "Simply share your referral link or code with friends. Once they register and start depositing/playing, you automatically start earning commissions based on their activity."
    }
];

export function Referral() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'referral' | 'myRewards'>('referral');
  const [faqTab, setFaqTab] = useState<'faq' | 'terms'>('faq');
  const [activeHistoryTab, setActiveHistoryTab] = useState<'commission' | 'deposit'>('deposit');

  const handleTabChange = (tab: 'referral' | 'myRewards') => {
    setActiveTab(tab);
  };

  // Mock data for My Rewards
  const commissionBonusHistory = [
    {
      id: 1,
      date: '15-10-2025 08:40:00',
      amount: '0.000',
      status: 'Claimed',
      claimedTime: '15-10-2025 08:45:00'
    },
  ];

  const depositBonusHistory = [
    {
      id: 1,
      date: '15-10-2025 08:40:00',
      amount: '2.000',
      status: 'Unclaimed',
      claimedTime: ''
    },
  ];

  const commissionBonus = {
    today: '0.000',
    thisMonth: '0.000',
    totalClaimed: '0.000',
    unclaimed: '0.000'
  };

  const depositBonus = {
    today: '0.000',
    thisMonth: '0.000',
    totalClaimed: '0.000',
    unclaimed: '2.000'
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#02040a] text-white relative overflow-hidden pb-20 md:pb-0">
      
      {/* Hero Section with Form & Total Earnings */}
      <div className="relative pt-6">
        <div className="absolute inset-0">
          <img
            src={imgHeroBg}
            alt="Referral Hero Background"
            className="w-full h-full object-cover object-top"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1510]/40 via-transparent to-[#02040a]"></div>
        </div>
        <div className="container mx-auto max-w-[1200px] 2xl:max-w-[1536px] px-4 relative z-10">
          {/* Tabs Navigation */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-[#0f151f] p-1 rounded-xl border border-white/5 w-full max-w-[350px]">
              <button 
                onClick={() => handleTabChange('referral')}
                className={`flex-1 px-8 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'referral' ? 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                <span className="flex items-center justify-center gap-2">
                  <Users className="w-4 h-4" />
                  Referral
                </span>
              </button>
              <button 
                onClick={() => handleTabChange('myRewards')}
                className={`flex-1 px-8 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'myRewards' ? 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                <span className="flex items-center justify-center gap-2">
                  <Gift className="w-4 h-4" />
                  My Rewards
                </span>
              </button>
            </div>
          </div>

          {/* Referral Tab Content */}
          {activeTab === 'referral' && (
            <>
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-end">
            
            {/* Left: Title & Form */}
            <div className="space-y-8">
              {/* Title */}
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight leading-tight">
                  <span className="block text-white">Invite Friends,</span>
                  <span className="block bg-gradient-to-r from-[#f7e08b] to-[#eab84b] bg-clip-text text-transparent">
                    Earn Passive Income!
                  </span>
                </h1>
                <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-xl">
                  Invite your friends using your unique link or referral code, and earn lifetime commissions from their deposits & bets.
                </p>
              </div>

              {/* Referral Link - Only show if logged in */}
              {isAuthenticated && (
                <div className="space-y-4">
                  {/* My Referral Link Section */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-[#d4c766] uppercase tracking-wider">My Referral Link</label>
                    <div className="bg-[#0f151f] border border-white/10 rounded-xl p-4 flex items-center gap-3 group hover:border-emerald-500/50 transition-colors">
                      <span className="flex-1 text-white text-sm md:text-base font-mono truncate pr-2">https://staging.riocity9.com/en/register?code=589092</span>
                      <button 
                        className="w-8 h-8 rounded-lg bg-white/5 text-white/70 flex items-center justify-center hover:bg-emerald-500/20 hover:text-emerald-400 transition-all active:scale-95 shrink-0"
                        title="Copy referral link"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Share via social Media */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
                    <span className="text-white/90 text-xs font-semibold uppercase tracking-wide whitespace-nowrap">Share via social Media</span>
                    <div className="flex items-center gap-3">
                      <button className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center cursor-pointer hover:brightness-110 hover:scale-110 transition-all active:scale-95">
                        <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" /></svg>
                      </button>
                      <button className="w-8 h-8 rounded-full bg-[#2AABEE] flex items-center justify-center cursor-pointer hover:brightness-110 hover:scale-110 transition-all active:scale-95">
                        <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 8.8C16.49 10.38 15.82 14.22 15.48 15.66C15.34 16.27 15.06 16.47 14.79 16.5C14.2 16.56 13.75 16.11 13.18 15.74C12.29 15.16 11.78 14.79 10.92 14.22C9.92 13.56 10.57 13.2 11.14 12.61C11.29 12.46 13.85 10.13 13.9 9.92C13.91 9.89 13.91 9.78 13.84 9.72C13.77 9.66 13.67 9.68 13.59 9.7C12.56 10.34 7.27 13.67 6.2 14.12C5.68 14.33 5.23 14.33 4.85 14.22C4.43 14.09 3.64 13.87 3.05 13.68C2.33 13.45 2.87 13.06 3.37 12.86C6.1 11.79 11.27 9.66 13.43 8.76C15.42 7.93 16.94 7.57 16.64 8.8Z" /></svg>
                      </button>
                      <button className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center cursor-pointer hover:brightness-110 hover:scale-110 transition-all active:scale-95">
                        <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382C17.312 14.302 16.519 13.912 16.371 13.852C16.223 13.792 16.115 13.762 16.007 13.922C15.899 14.082 15.589 14.442 15.495 14.552C15.401 14.662 15.307 14.672 15.147 14.592C14.987 14.512 14.473 14.344 13.864 13.801C13.385 13.374 13.062 12.847 12.968 12.687C12.874 12.527 12.958 12.44 13.038 12.361C13.11 12.29 13.198 12.176 13.278 12.083C13.358 11.99 13.388 11.92 13.442 11.81C13.496 11.7 13.469 11.61 13.429 11.53C13.389 11.45 13.079 10.688 12.951 10.378C12.822 10.078 12.695 10.118 12.607 10.118C12.525 10.118 12.431 10.118 12.337 10.118C12.243 10.118 12.091 10.153 11.963 10.293C11.835 10.433 11.472 10.773 11.472 11.463C11.472 12.153 11.975 12.82 12.043 12.91C12.111 13 13.037 14.43 14.457 15.044C15.632 15.553 15.872 15.473 16.128 15.45C16.384 15.426 16.953 15.113 17.071 14.787C17.189 14.461 17.189 14.182 17.154 14.123C17.119 14.065 17.026 14.03 17.472 14.382ZM12.049 2C6.527 2 2.049 6.478 2.049 12C2.049 13.766 2.508 15.429 3.324 16.906L2 22L7.23 20.65C8.654 21.465 10.292 21.933 12.049 21.933C17.571 21.933 22.049 17.455 22.049 11.933C22.049 6.411 17.571 2 12.049 2Z" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Steps in Hero */}
              <div className="space-y-5 pt-2">
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Invite Your Friends to Earn Passive Income</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Step 1 */}
                  <div className="relative bg-[#1A2230] rounded-xl p-6 border border-white/5 flex flex-col items-center justify-center min-h-[160px] shadow-xl">
                    <div className="absolute left-3 top-3 w-6 h-6 rounded-full bg-[#5A6D8E] text-white text-xs font-bold flex items-center justify-center">1</div>
                    <div className="flex flex-col items-center text-center gap-4">
                      <img src={shareYourLinkIcon} alt="Share your link" className="w-12 h-12" />
                      <p className="text-xs font-semibold leading-tight text-white">Share your Link or<br/>Referral Code</p>
                    </div>
                  </div>
                  {/* Step 2 */}
                  <div className="relative bg-[#1A2230] rounded-xl p-6 border border-white/5 flex flex-col items-center justify-center min-h-[160px] shadow-xl">
                    <div className="absolute left-3 top-3 w-6 h-6 rounded-full bg-[#5A6D8E] text-white text-xs font-bold flex items-center justify-center">2</div>
                    <div className="flex flex-col items-center text-center gap-4">
                      <img src={friendRegisterIcon} alt="Friend register" className="w-12 h-12" />
                      <p className="text-xs font-semibold leading-tight text-white">Friends Registered<br/>Successfully</p>
                    </div>
                  </div>
                  {/* Step 3 */}
                  <div className="relative bg-[#1A2230] rounded-xl p-6 border border-white/5 flex flex-col items-center justify-center min-h-[160px] shadow-xl">
                    <div className="absolute left-3 top-3 w-6 h-6 rounded-full bg-[#5A6D8E] text-white text-xs font-bold flex items-center justify-center">3</div>
                    <div className="flex flex-col items-center text-center gap-4">
                      <img src={earnBonusIcon} alt="Earn bonus" className="w-12 h-12" />
                      <p className="text-xs font-semibold leading-tight text-white">Earn Bonus from<br/>Your Downlines</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Total Earnings Card with Coins */}
            <div className="relative lg:mt-8">
              {/* Referral Bonus Card */}
              <div className="relative z-10 bg-[#1a2230] border border-white/5 rounded-xl p-5 shadow-xl">
                {isAuthenticated ? (
                  <>
                    <h2 className="text-2xl font-black mb-4">Referral <span className="text-[#6fa85d]">Bonus</span></h2>
                    
                    {/* Stats */}
                    <div className="space-y-0 rounded-xl overflow-hidden border border-white/10">
                      <div className="bg-[#0f151f] border-b border-white/10 p-4">
                        <p className="text-gray-300 text-sm mb-1">Total Referral Commission Bonus</p>
                        <div className="flex items-center">
                          <span className="text-[#d4c766] text-sm mr-2">PKR</span>
                          <span className="text-[#d4c766] text-2xl font-bold">75,000</span>
                          <span className="ml-auto w-6 h-6 rounded-full bg-[#1a2230] text-[#808080] flex items-center justify-center">
                            <Info className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                      <div className="bg-[#0f151f] p-4">
                        <p className="text-gray-300 text-sm mb-1">Total Referral Deposit Bonus</p>
                        <div className="flex items-center">
                          <span className="text-[#d4c766] text-sm mr-2">PKR</span>
                          <span className="text-[#d4c766] text-2xl font-bold">875,000</span>
                          <span className="ml-auto w-6 h-6 rounded-full bg-[#1a2230] text-[#808080] flex items-center justify-center">
                            <Info className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Downlines Button */}
                    <button className="mt-4 w-full bg-[#00bc7d] hover:bg-[#00a870] text-black font-black h-12 rounded-xl shadow-[0_0_20px_-5px_rgba(16,185,129,0.6)] transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                      Downlines <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <h2 className="text-2xl font-black mb-2 text-white">Log In to View Your Unique Referral Info</h2>
                    <p className="text-gray-400 text-sm mb-6">Sign in to access your referral code, link, and bonus details</p>
                    <Button
                      onClick={() => navigate('/login')}
                      className="bg-[#00bc7d] hover:bg-[#00a870] text-black font-black text-base rounded-xl px-8 h-12 shadow-[0_0_20px_-5px_rgba(16,185,129,0.6)] transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Login Now!
                    </Button>
                  </div>
                )}
              </div>
              </div>
            </div>
            </>
          )}

          {/* My Rewards Tab Content */}
          {activeTab === 'myRewards' && (
            <div className="w-full">
              {/* Bonus Summary Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                
                {/* Referral Commission Bonus Card */}
                <div className="bg-[#1a2230] border border-white/5 rounded-xl p-6 shadow-xl">
                  <div className="flex items-center gap-2 mb-6">
                    <h3 className="text-xl font-black text-white">Referral Commission Bonus</h3>
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                      <Info className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                  </div>

                  {/* Summary Stats */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Today:</span>
                      <span className="text-[#d4c766] text-base font-bold">PKR {commissionBonus.today}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">This Month:</span>
                      <span className="text-[#d4c766] text-base font-bold">PKR {commissionBonus.thisMonth}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Total Claimed:</span>
                      <span className="text-[#d4c766] text-base font-bold">PKR {commissionBonus.totalClaimed}</span>
                    </div>
                  </div>

                  {/* Unclaimed Amount */}
                  <div className="mb-6 pt-4 border-t border-white/10">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-white text-sm font-bold">Unclaimed Amount:</span>
                      <span className="text-[#d4c766] text-2xl font-black">PKR {commissionBonus.unclaimed}</span>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-[#f1c24f] to-[#d59b25] text-[#5c3a00] font-black h-12 rounded-xl shadow-[0_4px_15px_rgba(212,165,33,0.35)] hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={parseFloat(commissionBonus.unclaimed) === 0}
                    >
                      Claim
                    </Button>
                  </div>

                  {/* Info Note */}
                  <div className="flex items-start gap-2 pt-4 border-t border-white/10">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Info className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <p className="text-white text-xs leading-relaxed">Bonus will be credited to Main Wallet.</p>
                  </div>
                </div>

                {/* Referral Deposit Bonus Card */}
                <div className="bg-[#1a2230] border border-white/5 rounded-xl p-6 shadow-xl">
                  <div className="flex items-center gap-2 mb-6">
                    <h3 className="text-xl font-black text-white">Referral Deposit Bonus</h3>
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                      <Info className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                  </div>

                  {/* Summary Stats */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Today:</span>
                      <span className="text-[#d4c766] text-base font-bold">PKR {depositBonus.today}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">This Month:</span>
                      <span className="text-[#d4c766] text-base font-bold">PKR {depositBonus.thisMonth}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Total Claimed:</span>
                      <span className="text-[#d4c766] text-base font-bold">PKR {depositBonus.totalClaimed}</span>
                    </div>
                  </div>

                  {/* Unclaimed Amount */}
                  <div className="mb-6 pt-4 border-t border-white/10">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-white text-sm font-bold">Unclaimed Amount:</span>
                      <span className="text-[#d4c766] text-2xl font-black">PKR {depositBonus.unclaimed}</span>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-[#f1c24f] to-[#d59b25] text-[#5c3a00] font-black h-12 rounded-xl shadow-[0_4px_15px_rgba(212,165,33,0.35)] hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={parseFloat(depositBonus.unclaimed) === 0}
                    >
                      Claim
                    </Button>
                  </div>

                  {/* Info Note */}
                  <div className="flex items-start gap-2 pt-4 border-t border-white/10">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Info className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <p className="text-white text-xs leading-relaxed">Bonus will be credited to Bonus Wallet (Coin).</p>
                  </div>
                </div>
              </div>

              {/* Bonus History Table */}
              <div className="bg-[#1a2230] border border-white/5 rounded-xl p-6 shadow-xl">
                {/* History Tabs */}
                <div className="flex justify-start mb-6">
                  <div className="flex bg-[#0f151f] p-1 rounded-xl border border-white/5 w-full max-w-[600px]">
                    <button
                      onClick={() => setActiveHistoryTab('commission')}
                      className={`flex-1 px-8 py-3 rounded-lg text-sm font-bold transition-all ${
                        activeHistoryTab === 'commission'
                          ? 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 text-black shadow-lg'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Referral Commission Bonus
                    </button>
                    <button
                      onClick={() => setActiveHistoryTab('deposit')}
                      className={`flex-1 px-8 py-3 rounded-lg text-sm font-bold transition-all ${
                        activeHistoryTab === 'deposit'
                          ? 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 text-black shadow-lg'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Referral Deposit Bonus
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-4 px-4 text-white font-bold text-sm">Date</th>
                        <th className="text-left py-4 px-4 text-white font-bold text-sm">Bonus Amount</th>
                        <th className="text-left py-4 px-4 text-white font-bold text-sm">Status</th>
                        <th className="text-left py-4 px-4 text-white font-bold text-sm">Claimed Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(activeHistoryTab === 'commission' ? commissionBonusHistory : depositBonusHistory).length > 0 ? (
                        (activeHistoryTab === 'commission' ? commissionBonusHistory : depositBonusHistory).map((item) => (
                          <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-4 px-4 text-white text-sm">{item.date}</td>
                            <td className="py-4 px-4 text-white text-sm font-bold">{item.amount}</td>
                            <td className="py-4 px-4">
                              <span className={`text-sm font-bold ${
                                item.status === 'Unclaimed' ? 'text-red-500' : 'text-emerald-400'
                              }`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-gray-400 text-sm">{item.claimedTime || '-'}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="py-8 px-4 text-center text-gray-500 text-sm">
                            No history available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Referral Tab Only Sections */}
      {activeTab === 'referral' && (
        <>
          {/* Divider */}
          <div className="container mx-auto max-w-[1200px] 2xl:max-w-[1536px] px-4">
            <div className="h-[3px] bg-gradient-to-r from-transparent via-gray-700 to-transparent my-8"></div>
          </div>

          {/* Deposit Commission Rate */}
          <div className="container mx-auto max-w-[1200px] 2xl:max-w-[1536px] px-4 mb-12">
        <div className="relative bg-[#1a2230] border border-white/5 rounded-xl p-4 md:p-8 overflow-hidden shadow-xl">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={tierBg}
              alt="Deposit Commission Rate Background"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-shrink-0">
                <h2 className="text-2xl font-black text-white mb-2">Deposit Commission Rate</h2>
                <p className="text-[#d4c766] text-lg md:text-2xl font-black mb-4 md:mb-10">Minimum Deposit PRK 30.00</p>
            </div>

            {/* Tiers Image */}
            <div className="flex items-end justify-end pb-2 w-full md:w-auto">
              <img
                src={tierImg}
                alt="Deposit commission tiers"
                className="w-full max-w-full md:max-w-[520px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Gaming Commission Rate */}
      <div className="container mx-auto max-w-[1200px] 2xl:max-w-[1536px] px-4 mb-12">
        <div className="bg-[#1a2230] border border-white/5 rounded-xl p-8 shadow-xl">
          <h2 className="text-2xl font-black mb-4 text-white">Gaming Commission Rate</h2>
          <p className="text-gray-400 mb-8 text-lg">Listing of commission rates you earn from your downlines' bets by game type and provider.</p>

          <div className="flex flex-col gap-4">
            <Accordion type="single" collapsible defaultValue="Slots" className="w-full">
              {commissionRates.map((cat, idx) => (
                <AccordionItem key={idx} value={cat.category} className="!border-b-0 border border-white/5 rounded-xl overflow-hidden bg-[#0f151f] mb-4 last:mb-0">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-white/5 transition-colors text-white bg-[#1d2d49] [&>svg]:text-white">
                    <span className="text-lg font-black">{cat.category}</span>
                  </AccordionTrigger>
                  <AccordionContent className="bg-[#0f151f] px-0 py-0">
                    {cat.items.length > 0 ? (
                      <div className="w-full">
                        {/* Table Header */}
                        <div className="grid grid-cols-4 gap-4 px-6 py-3 border-b border-[#d4c766] bg-[#131b29] text-[#d4c766] font-bold text-sm">
                          <div className="text-center">Provider</div>
                          <div className="text-center">Downlines L1</div>
                          <div className="text-center">Downlines L2</div>
                          <div className="text-center">Downlines L3</div>
                        </div>
                        {/* Table Body */}
                        {cat.items.map((item, i) => (
                          <div key={i} className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-white/10 last:border-0 text-sm font-medium text-white hover:bg-white/5">
                            <div className="text-left">{item.provider}</div>
                            <div className="text-center">{item.l1}</div>
                            <div className="text-center">{item.l2}</div>
                            <div className="text-center">{item.l3}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 text-center text-gray-500">No data available for this category yet.</div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

          {/* FAQ Section */}
          <div className="container mx-auto max-w-[1200px] 2xl:max-w-[1536px] px-4 mb-12">
        <div className="bg-[#1a2230] border border-white/5 rounded-xl p-6 md:p-8 shadow-xl">
          {/* FAQ Header */}
          <h2 className="text-2xl font-black text-white mb-4">Frequently Asked Questions</h2>
          <div className="flex justify-start mb-6">
            <div className="flex bg-[#0f151f] p-1 rounded-xl border border-white/5 w-full max-w-[380px]">
              <button
                onClick={() => setFaqTab('faq')}
                className={`flex-1 px-8 py-3 rounded-lg text-sm font-bold transition-all ${
                  faqTab === 'faq'
                    ? 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 text-black shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                FAQ
              </button>
              <button
                onClick={() => setFaqTab('terms')}
                className={`flex-1 px-8 py-3 rounded-lg text-sm font-bold transition-all ${
                  faqTab === 'terms'
                    ? 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 text-black shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Terms & Conditions
              </button>
            </div>
          </div>

          <div className="rounded-none overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border border-white/5 rounded-xl mb-4 last:mb-0">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-white/5 transition-colors text-white bg-[#1d2d49] [&>svg]:text-[#d4c766]">
                    <span className="text-base font-bold text-left">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="bg-[#0f151f] px-6 py-4">
                    <p className="text-white text-base">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
        </>
      )}

    </div>
  );
}
