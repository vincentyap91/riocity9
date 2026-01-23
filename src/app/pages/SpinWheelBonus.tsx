import React, { useState } from 'react';
import { 
  ArrowLeft, Dices, X, Wallet, RefreshCw, Ticket, Box, Clock
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

export function SpinWheelBonus() {
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

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* Sidebar Menu */}
          <div className="w-full lg:w-[280px] bg-[#1a2230] rounded-[16px] border border-white/5 p-4 flex flex-col gap-2 shrink-0">
            {BONUS_SIDEBAR_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full px-5 py-4 rounded-xl text-sm font-bold text-left transition-all flex items-center gap-4 group ${
                  item.id === 'wheel'
                    ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-5 h-5 transition-colors ${
                  item.id === 'wheel' ? 'text-black' : 'text-gray-500 group-hover:text-white'
                }`} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 w-full bg-[#1a2230] rounded-[16px] border border-white/5 p-6 flex flex-col">
            {/* Title */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-black/25 border border-white/10 flex items-center justify-center">
                  <Dices className="w-5 h-5 text-emerald-500" />
                </div>
                <span className="text-emerald-500 font-bold text-lg">{t("spinWheelBonus")}</span>
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

            {/* Spin Wheel Content */}
            <div className="flex-1 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-64 h-64 mx-auto mb-6 rounded-full border-4 border-emerald-500/30 bg-[#0f151f] flex items-center justify-center relative">
                  <Dices className="w-24 h-24 text-emerald-500/50" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white"></div>
                </div>
                <Button className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-4 rounded-xl text-lg">
                  Spin Now
                </Button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </InnerPageLayout>
  );
}
