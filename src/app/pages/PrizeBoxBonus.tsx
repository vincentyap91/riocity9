import React, { useState } from 'react';
import { 
  ArrowLeft, Box, X, Wallet, Clock, RefreshCw, Dices, Ticket
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { InnerPageLayout } from "../components/shared/InnerPageLayout";
import { ClaimRecordModal } from '../components/shared/ClaimRecordModal';

const BONUS_SIDEBAR_ITEMS = [
  { id: 'wheel', label: 'Spin Wheel Bonus', icon: Dices, path: '/bonus/wheel' },
  { id: 'scratch', label: 'Voucher Scratch Bonus', icon: Ticket, path: '/bonus/scratch' },
  { id: 'prize', label: 'Prize Box Bonus', icon: Box, path: '/bonus/prize' },
];

// Mock reward data
const rewards = [
  { id: 4416, campaign: 'VW Shiro Test', expiresIn: 'No Expiry' },
  { id: 3914, campaign: 'VW Shiro Test', expiresIn: 'No Expiry' },
  { id: 3913, campaign: 'VW Shiro Test', expiresIn: 'No Expiry' },
  { id: 3912, campaign: 'VW Shiro Test', expiresIn: 'No Expiry' },
  { id: 3443, campaign: 'VW Shiro Test', expiresIn: 'No Expiry' },
];

export function PrizeBoxBonus() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [walletBalance] = useState('990.69');
  const [recordModalOpen, setRecordModalOpen] = useState(false);

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
                    item.id === 'prize'
                      ? 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 text-black shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className={`w-5 h-5 shrink-0 transition-colors ${
                    item.id === 'prize' ? 'text-black' : 'text-gray-500 group-hover:text-white'
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
                  item.id === 'prize'
                    ? 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 text-black shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-5 h-5 transition-colors ${
                  item.id === 'prize' ? 'text-black' : 'text-gray-500 group-hover:text-white'
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
                  <Box className="w-5 h-5 text-emerald-500" />
                </div>
                <span className="text-emerald-500 font-bold text-lg">{t("prizeBoxBonus")}</span>
              </div>
            </div>

            {/* Wallet Balance Section */}
            <div className="bg-[#0f151f] rounded-xl border border-white/5 p-4 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <div className="text-gray-400 text-sm font-bold mb-1">Wallet Balance:</div>
                  <div className="text-emerald-500 text-2xl font-black">{walletBalance}</div>
                </div>
              </div>
              <Button
                onClick={() => setRecordModalOpen(true)}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-2 rounded-xl flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Record
              </Button>
            </div>

            {/* Warning Message */}
            <div className="flex items-center gap-2 mb-6 text-gray-400 text-sm">
              <Clock className="w-4 h-4 text-orange-400" />
              <span>Rewards must be completed before the token's expiry date.</span>
            </div>

            {/* Rewards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {rewards.map((reward) => (
                <div key={reward.id} className="bg-[#0f151f] rounded-xl border border-white/5 p-5 flex flex-col">
                  <div className="text-emerald-500 font-bold text-sm mb-2">Reward #{reward.id}</div>
                  <div className="text-gray-400 text-xs mb-3">Campaign: {reward.campaign}</div>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-3 h-3 text-gray-500" />
                    <span className="text-gray-400 text-xs">Expires in:</span>
                    <span className="text-orange-400 text-xs font-bold">{reward.expiresIn}</span>
                  </div>
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-xl">
                    Claim Now
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Shared Claim Record Modal – opens with Prize Box selected; Type can switch to Spin Wheel / Voucher Scratch */}
      <ClaimRecordModal
        open={recordModalOpen}
        onOpenChange={setRecordModalOpen}
        initialType="prize"
      />
    </InnerPageLayout>
  );
}
