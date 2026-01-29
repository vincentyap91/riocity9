import React, { useState } from 'react';
import { Info, Users, Gift } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { EmptyState } from '../components/shared/EmptyState';
import { MOBILE } from '../config/themeTokens';
import { SegmentTabs, type SegmentTabsItem } from '../components/shared/SegmentTabs';

// Mock data for bonus history
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

export function MyRewards() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeHistoryTab, setActiveHistoryTab] = useState<'commission' | 'deposit'>('deposit');

  // Mock data - replace with actual data from API/context
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
    <div className="flex flex-col min-h-screen text-white relative overflow-x-hidden pb-20 md:pb-0">
      
      {/* Top Tab Navigation – same design as Profile / Referral */}
      <div className={`container mx-auto max-w-[1200px] 2xl:max-w-[1536px] ${MOBILE.container}`}>
        <SegmentTabs
          items={[
            { id: 'referral', label: 'Referral Info', icon: Users },
            { id: 'rewards', label: 'My Rewards', icon: Gift },
          ] as SegmentTabsItem[]}
          activeId="rewards"
          onSelect={(id) => id === 'referral' && navigate('/referral')}
          maxWidth="max-w-[350px]"
        />
      </div>

      {/* Main Content */}
      <div className={`container mx-auto max-w-[1200px] 2xl:max-w-[1536px] px-4 pb-4 md:pb-6`}>
        {/* Bonus Summary Cards */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 ${MOBILE.gap} ${MOBILE.sectionMb}`}>
          {/* Referral Commission Bonus Card */}
          <div className={`bg-[#1a2230] border border-white/5 rounded-xl ${MOBILE.cardPadding} shadow-xl`}>
            <div className={`flex items-center ${MOBILE.gapSm} ${MOBILE.sectionMb}`}>
              <h3 className={`${MOBILE.title} text-white`}>Referral Commission Bonus</h3>
              <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Info className="w-3.5 h-3.5 text-gray-400" />
              </div>
            </div>

            {/* Summary Stats */}
            <div className={`${MOBILE.spaceYSection} ${MOBILE.sectionMb}`}>
              <div className="flex justify-between items-center">
                <span className={`text-gray-300 ${MOBILE.body}`}>Today:</span>
                <span className={`text-[#FFD700] ${MOBILE.body} font-bold`}>PKR {commissionBonus.today}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-gray-300 ${MOBILE.body}`}>This Month:</span>
                <span className={`text-[#FFD700] ${MOBILE.body} font-bold`}>PKR {commissionBonus.thisMonth}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-gray-300 ${MOBILE.body}`}>Total Claimed:</span>
                <span className={`text-[#FFD700] ${MOBILE.body} font-bold`}>PKR {commissionBonus.totalClaimed}</span>
              </div>
            </div>

            {/* Unclaimed Amount */}
            <div className={`${MOBILE.sectionMb} pt-3 md:pt-4 border-t border-white/10`}>
              <div className={`flex justify-between items-center mb-3 ${MOBILE.sectionMb}`}>
                <span className={`text-white ${MOBILE.label}`}>Unclaimed Amount:</span>
                <span className="text-[#FFD700] text-lg md:text-xl font-black">PKR {commissionBonus.unclaimed}</span>
              </div>
              <Button
                className="w-full bg-[#FFD700] text-[#1a1a00] font-black h-11 md:h-12 rounded-xl shadow-[0_4px_14px_rgba(255,215,0,0.4)] hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={parseFloat(commissionBonus.unclaimed) === 0}
              >
                Claim
              </Button>
            </div>

            {/* Info Note */}
            <div className={`flex items-start ${MOBILE.gapSm} pt-3 md:pt-4 border-t border-white/10`}>
              <div className="w-5 h-5 rounded-full bg-[#00bc7d]/20 flex items-center justify-center shrink-0 mt-0.5">
                <Info className="w-3.5 h-3.5 text-[#00bc7d]" />
              </div>
              <p className={`text-white ${MOBILE.caption} leading-relaxed`}>Bonus will be credited to Main Wallet.</p>
            </div>
          </div>

          {/* Referral Deposit Bonus Card */}
          <div className={`bg-[#1a2230] border border-white/5 rounded-xl ${MOBILE.cardPadding} shadow-xl`}>
            <div className={`flex items-center ${MOBILE.gapSm} ${MOBILE.sectionMb}`}>
              <h3 className={`${MOBILE.title} text-white`}>Referral Deposit Bonus</h3>
              <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Info className="w-3.5 h-3.5 text-gray-400" />
              </div>
            </div>

            {/* Summary Stats */}
            <div className={`${MOBILE.spaceYSection} ${MOBILE.sectionMb}`}>
              <div className="flex justify-between items-center">
                <span className={`text-gray-300 ${MOBILE.body}`}>Today:</span>
                <span className={`text-[#FFD700] ${MOBILE.body} font-bold`}>PKR {depositBonus.today}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-gray-300 ${MOBILE.body}`}>This Month:</span>
                <span className={`text-[#FFD700] ${MOBILE.body} font-bold`}>PKR {depositBonus.thisMonth}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-gray-300 ${MOBILE.body}`}>Total Claimed:</span>
                <span className={`text-[#FFD700] ${MOBILE.body} font-bold`}>PKR {depositBonus.totalClaimed}</span>
              </div>
            </div>

            {/* Unclaimed Amount */}
            <div className={`${MOBILE.sectionMb} pt-3 md:pt-4 border-t border-white/10`}>
              <div className={`flex justify-between items-center mb-3 ${MOBILE.sectionMb}`}>
                <span className={`text-white ${MOBILE.label}`}>Unclaimed Amount:</span>
                <span className="text-[#FFD700] text-lg md:text-xl font-black">PKR {depositBonus.unclaimed}</span>
              </div>
              <Button
                className="w-full bg-[#FFD700] text-[#1a1a00] font-black h-11 md:h-12 rounded-xl shadow-[0_4px_14px_rgba(255,215,0,0.4)] hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={parseFloat(depositBonus.unclaimed) === 0}
              >
                Claim
              </Button>
            </div>

            {/* Info Note */}
            <div className={`flex items-start ${MOBILE.gapSm} pt-3 md:pt-4 border-t border-white/10`}>
              <div className="w-5 h-5 rounded-full bg-[#00bc7d]/20 flex items-center justify-center shrink-0 mt-0.5">
                <Info className="w-3.5 h-3.5 text-[#00bc7d]" />
              </div>
              <p className={`text-white ${MOBILE.caption} leading-relaxed`}>Bonus will be credited to Bonus Wallet (Coin).</p>
            </div>
          </div>
        </div>

        {/* Bonus History Table */}
        <div className={`bg-[#1a2230] border border-white/5 rounded-xl ${MOBILE.cardPadding} shadow-xl`}>
          <div className={`flex justify-start ${MOBILE.sectionMb} overflow-x-auto no-scrollbar`}>
            <div className="flex bg-[#0f151f] p-1 rounded-xl border border-white/5 w-full min-w-0 max-w-[600px]">
              <button
                onClick={() => setActiveHistoryTab('commission')}
                className={`flex-1 min-w-0 px-4 md:px-8 py-3 rounded-lg ${MOBILE.label} transition-all whitespace-nowrap ${
                  activeHistoryTab === 'commission'
                    ? 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 hover:brightness-110 hover:shadow-[0_2px_12px_rgba(16,185,129,0.35)] text-black shadow-[0_2px_10px_rgba(16,185,129,0.3)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Commission Bonus
              </button>
              <button
                onClick={() => setActiveHistoryTab('deposit')}
                className={`flex-1 min-w-0 px-4 md:px-8 py-3 rounded-lg ${MOBILE.label} transition-all whitespace-nowrap ${
                  activeHistoryTab === 'deposit'
                    ? 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 hover:brightness-110 hover:shadow-[0_2px_12px_rgba(16,185,129,0.35)] text-black shadow-[0_2px_10px_rgba(16,185,129,0.3)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Deposit Bonus
              </button>
            </div>
          </div>

          <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
            <table className="w-full min-w-[480px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className={`text-left py-3 px-3 md:py-4 md:px-4 text-white font-bold ${MOBILE.label}`}>Date</th>
                  <th className={`text-left py-3 px-3 md:py-4 md:px-4 text-white font-bold ${MOBILE.label}`}>Amount</th>
                  <th className={`text-left py-3 px-3 md:py-4 md:px-4 text-white font-bold ${MOBILE.label}`}>Status</th>
                  <th className={`text-left py-3 px-3 md:py-4 md:px-4 text-white font-bold ${MOBILE.label}`}>Claimed</th>
                </tr>
              </thead>
              <tbody>
                {(activeHistoryTab === 'commission' ? commissionBonusHistory : depositBonusHistory).length > 0 ? (
                  (activeHistoryTab === 'commission' ? commissionBonusHistory : depositBonusHistory).map((item) => (
                    <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className={`py-3 px-3 md:py-4 md:px-4 text-white ${MOBILE.body}`}>{item.date}</td>
                      <td className={`py-3 px-3 md:py-4 md:px-4 text-white ${MOBILE.body} font-bold`}>{item.amount}</td>
                      <td className="py-3 px-3 md:py-4 md:px-4">
                        <span className={`${MOBILE.label} ${item.status === 'Unclaimed' ? 'text-red-500' : 'text-[#00bc7d]'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className={`py-3 px-3 md:py-4 md:px-4 text-gray-400 ${MOBILE.body}`}>{item.claimedTime || '-'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-6 px-4 text-center">
                      <EmptyState message="No history available" compact />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
