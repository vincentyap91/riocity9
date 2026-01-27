import React, { useState } from 'react';
import { Info, Users, Gift } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';

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
    <div className="flex flex-col min-h-screen text-white relative overflow-hidden pb-20 md:pb-0">
      
      {/* Top Tab Navigation */}
      <div className="container mx-auto max-w-[1200px] 2xl:max-w-[1536px] px-4 pt-6 pb-6">
        <div className="flex justify-center">
          <div className="flex bg-[#0f151f] p-1 rounded-xl border border-white/5 w-full max-w-[350px]">
            <button
              onClick={() => navigate('/referral')}
              className="flex-1 px-8 py-3 rounded-lg text-sm font-bold transition-all text-gray-400 hover:text-white"
            >
              <span className="flex items-center justify-center gap-2">
                <Users className="w-4 h-4" />
                Referral Info
              </span>
            </button>
            <button
              className="flex-1 px-8 py-3 rounded-lg text-sm font-bold transition-all bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 text-black shadow-lg"
            >
              <span className="flex items-center justify-center gap-2">
                <Gift className="w-4 h-4" />
                My Rewards
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-[1200px] 2xl:max-w-[1536px] px-4 pb-12">
        
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
    </div>
  );
}
