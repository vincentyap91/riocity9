import React, { useState } from 'react';
import { 
  ArrowLeft, Ticket, X, Wallet, RefreshCw, Dices, Box, Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { InnerPageLayout } from "../components/shared/InnerPageLayout";

const BONUS_SIDEBAR_ITEMS = [
  { id: 'wheel', label: 'Spin Wheel Bonus', icon: Dices, path: '/bonus/wheel' },
  { id: 'scratch', label: 'Voucher Scratch Bonus', icon: Ticket, path: '/bonus/scratch' },
  { id: 'prize', label: 'Prize Box Bonus', icon: Box, path: '/bonus/prize' },
];

// Mock voucher data
const vouchers = [
  { id: 'VCH001', amount: '50.00', status: 'unscratched' },
  { id: 'VCH002', amount: '100.00', status: 'unscratched' },
  { id: 'VCH003', amount: '25.00', status: 'unscratched' },
  { id: 'VCH004', amount: '75.00', status: 'unscratched' },
];

export function VoucherScratchBonus() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [walletBalance] = useState('990.69');

  return (
    <InnerPageLayout className="overflow-hidden">
      <div className="container mx-auto px-4 py-12 max-w-[1024px]">
        
        {/* Navigation Header */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute left-0 flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="h-10 w-10 rounded-full bg-black/20 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <span className="text-white font-bold text-base">{t("rewardCentre")}</span>
          </div>
          <button
            onClick={() => navigate('/')}
            className="absolute right-0 h-10 w-10 rounded-full bg-black/20 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Mobile/Tablet: Horizontal Scrollable Sidebar */}
        <div className="lg:hidden mb-6">
          <div className="w-full bg-[#1a2230] rounded-2xl border border-white/5 p-3 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-3 min-w-max">
              {BONUS_SIDEBAR_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex items-center gap-3 group shrink-0 ${
                    item.id === 'scratch'
                      ? 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 text-black shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className={`w-5 h-5 shrink-0 transition-colors ${
                    item.id === 'scratch' ? 'text-black' : 'text-gray-500 group-hover:text-white'
                  }`} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* Desktop: Vertical Sidebar */}
          <div className="hidden lg:flex w-[280px] bg-[#1a2230] rounded-2xl border border-white/5 p-4 flex-col gap-2 shrink-0">
            {BONUS_SIDEBAR_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full px-5 py-4 rounded-xl text-sm font-bold text-left transition-all flex items-center gap-4 group ${
                  item.id === 'scratch'
                    ? 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 text-black shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-5 h-5 transition-colors ${
                  item.id === 'scratch' ? 'text-black' : 'text-gray-500 group-hover:text-white'
                }`} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 w-full bg-[#1a2230] rounded-2xl border border-white/5 p-6 flex flex-col">
            {/* Title */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-black/25 border border-white/10 flex items-center justify-center">
                  <Ticket className="w-5 h-5 text-emerald-500" />
                </div>
                <span className="text-emerald-500 font-bold text-lg">{t("voucherScratchBonus")}</span>
              </div>
            </div>

            {/* Wallet Balance Section */}
            <div className="bg-[#0f151f] rounded-xl border border-white/5 p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <div className="text-gray-400 text-sm font-bold mb-1">Wallet Balance:</div>
                  <div className="text-emerald-500 text-2xl font-black">{walletBalance}</div>
                </div>
              </div>
              <Button className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-2 rounded-xl flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Record
              </Button>
            </div>

            {/* Warning Message */}
            <div className="flex items-center gap-2 mb-6 text-gray-400 text-sm">
              <Clock className="w-4 h-4 text-orange-400" />
              <span>Rewards must be completed before the token's expiry date.</span>
            </div>

            {/* Vouchers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vouchers.map((voucher) => (
                <div key={voucher.id} className="bg-[#0f151f] rounded-xl border border-white/5 p-6 flex flex-col items-center">
                  <div className="text-gray-400 text-xs font-bold mb-2">Voucher #{voucher.id}</div>
                  <div className="w-full h-32 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg mb-4 flex items-center justify-center border-2 border-dashed border-yellow-500/30 cursor-pointer hover:border-yellow-500/50 transition-colors">
                    <Ticket className="w-16 h-16 text-yellow-400/60" />
                  </div>
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-xl">
                    Scratch Now
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </InnerPageLayout>
  );
}
