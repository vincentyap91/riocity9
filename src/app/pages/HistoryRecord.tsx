import React, { useState } from 'react';
import { 
  ArrowLeft, History, Calendar, Wallet, Dices, 
  Users, HandCoins, Megaphone,
  Search, Filter, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useLanguage } from '../contexts/LanguageContext';
import { InnerPageLayout } from "../components/shared/InnerPageLayout";
import { PageSidebar, type PageSidebarItem } from '../components/shared/PageSidebar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { sanitizeTextInput } from '../utils/security';

const SIDEBAR_ITEMS: PageSidebarItem[] = [
  { id: 'transaction', label: 'Transaction History', icon: Wallet },
  { id: 'bet', label: 'Bet Record', icon: Dices },
  { id: 'commission', label: 'Commission Record', icon: Users },
  { id: 'rebate', label: 'Rebate Record', icon: HandCoins },
  { id: 'promotion', label: 'Promotion Record', icon: Megaphone },
];

const QUICK_FILTERS = [
  { id: 'today', label: 'Today' },
  { id: '7days', label: 'Last 7 Days' },
  { id: '30days', label: 'Last 30 Days' },
  { id: '60days', label: 'Last 60 Days' },
];

// Mock data
const depositData = [
  { id: 'TXN102938', date: '05-03-2023 01:58:00', amount: '50.00', status: 'Approved', description: 'Deposit via Bank Transfer' },
  { id: 'TXN102939', date: '05-03-2023 04:12:00', amount: '120.00', status: 'Approved', description: 'Deposit via USDT' },
];

const withdrawalData = [
  { id: 'TXN202940', date: '05-03-2023 10:20:00', amount: '30.00', status: 'Pending', description: 'Withdrawal to Bank' },
  { id: 'TXN202941', date: '04-03-2023 15:45:00', amount: '200.00', status: 'Rejected', description: 'Withdrawal to USDT' },
];

const betHistoryData = [
  { id: 1, game: 'Gaogashou', date: '2026-01-27', betAmount: '68.00', netProfit: '-23.50' },
  { id: 2, game: 'Kimochiii', date: '2026-01-27', betAmount: '2.61', netProfit: '-0.95' },
];

const commissionData: any[] = [];
const rebateData: any[] = [];

export function HistoryRecord() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [activeSidebarTab, setActiveSidebarTab] = useState<'transaction' | 'bet' | 'commission' | 'rebate' | 'promotion'>('transaction');
  const [activeTypeTab, setActiveTypeTab] = useState<'deposits' | 'withdrawals'>('deposits');
  const [activeFilter, setActiveFilter] = useState('today');
  
  // Bet Record state
  const [statistics, setStatistics] = useState('all');
  const [betStartDate, setBetStartDate] = useState('26-01-2026');
  const [betEndDate, setBetEndDate] = useState('27-01-2026');
  
  // Commission/Rebate Record state
  const [commissionStartDate, setCommissionStartDate] = useState('25-01-2026');
  const [commissionEndDate, setCommissionEndDate] = useState('31-01-2026');
  const [rebateStartDate, setRebateStartDate] = useState('25-01-2026');
  const [rebateEndDate, setRebateEndDate] = useState('31-01-2026');

  const currentData = activeTypeTab === 'deposits' ? depositData : withdrawalData;
  
  // Get title and icon based on active tab
  const getTitleConfig = () => {
    switch (activeSidebarTab) {
      case 'bet':
        return { title: 'Bet Record', icon: Dices };
      case 'commission':
        return { title: 'Commission Record', icon: Users };
      case 'rebate':
        return { title: 'Rebate Record', icon: HandCoins };
      case 'promotion':
        return { title: 'Promotion Record', icon: Megaphone };
      default:
        return { title: 'Transaction History', icon: History };
    }
  };
  
  const { title, icon: TitleIcon } = getTitleConfig();

  return (
    <InnerPageLayout className="overflow-hidden">
      <div className="container mx-auto px-4 py-12 max-w-[1024px]">
        
        {/* Navigation Header */}
        <div className="relative flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/settings')}
              className="h-10 w-10 rounded-full bg-black/20 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <span className="text-white font-bold text-base">{t("settings")}</span>
          </div>
          <button
            onClick={() => navigate('/settings')}
            className="h-10 w-10 rounded-full bg-black/20 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <PageSidebar
            items={SIDEBAR_ITEMS}
            activeId={activeSidebarTab}
            onSelect={(id) => setActiveSidebarTab(id as 'transaction' | 'bet' | 'commission' | 'rebate' | 'promotion')}
          />

          {/* Main Content Area */}
          <div className="flex-1 w-full bg-[#1a2230] rounded-2xl border border-white/5 p-6 flex flex-col">
            {/* Title inside card */}
            <div className="flex items-center justify-start gap-3 pb-4">
              <div className="h-10 w-10 rounded-xl bg-black/25 border border-white/10 flex items-center justify-center">
                <TitleIcon className="w-5 h-5 text-white/90" />
              </div>
              <span className="text-white font-bold text-base">{title}</span>
            </div>
            
            {/* Transaction History: Deposits/Withdrawals Tabs */}
            {activeSidebarTab === 'transaction' && (
              <div className="flex flex-col md:flex-row items-center justify-start gap-6 mb-6">
                <div className="flex justify-center">
                  <div className="flex bg-[#0f151f] p-1 rounded-xl border border-white/5 w-full max-w-[313px]">
                    <button
                      onClick={() => setActiveTypeTab('deposits')}
                      className={`flex-1 px-8 py-3 rounded-lg text-sm font-bold transition-all ${
                        activeTypeTab === 'deposits'
                          ? 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 text-black shadow-lg'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {t("deposit")}
                    </button>
                    <button
                      onClick={() => setActiveTypeTab('withdrawals')}
                      className={`flex-1 px-8 py-3 rounded-lg text-sm font-bold transition-all ${
                        activeTypeTab === 'withdrawals'
                          ? 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 text-black shadow-lg'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {t("withdrawals")}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Bet Record: Statistics Selection */}
            {activeSidebarTab === 'bet' && (
              <div className="space-y-2 mb-6">
                <label className="text-white font-bold text-sm">Statistics</label>
                <Select value={statistics} onValueChange={setStatistics}>
                  <SelectTrigger className="w-full bg-[#0f151f] border-white/10 text-white !h-12 rounded-xl px-4 py-0 data-[size=default]:!h-12 focus:border-emerald-500 focus-visible:ring-emerald-500/20">
                    <SelectValue placeholder="Select statistics" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a2230] border-white/10">
                    <SelectItem value="all" className="text-white focus:bg-emerald-500/20">All</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Date Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-white font-bold text-sm">Start Date</label>
                <div className="relative group">
                  <Input
                    type="text"
                    value={
                      activeSidebarTab === 'bet' ? betStartDate :
                      activeSidebarTab === 'commission' ? commissionStartDate :
                      activeSidebarTab === 'rebate' ? rebateStartDate :
                      '01/14/2026'
                    }
                    onChange={(e) => {
                      const v = sanitizeTextInput(e.target.value);
                      if (activeSidebarTab === 'bet') setBetStartDate(v);
                      else if (activeSidebarTab === 'commission') setCommissionStartDate(v);
                      else if (activeSidebarTab === 'rebate') setRebateStartDate(v);
                    }}
                    className="bg-[#0f151f] border-white/10 text-white h-12 rounded-xl px-4 focus:border-emerald-500 focus-visible:ring-emerald-500/20 pr-10"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-white font-bold text-sm">End Date</label>
                <div className="relative group">
                  <Input
                    type="text"
                    value={
                      activeSidebarTab === 'bet' ? betEndDate :
                      activeSidebarTab === 'commission' ? commissionEndDate :
                      activeSidebarTab === 'rebate' ? rebateEndDate :
                      '01/14/2026'
                    }
                    onChange={(e) => {
                      const v = sanitizeTextInput(e.target.value);
                      if (activeSidebarTab === 'bet') setBetEndDate(v);
                      else if (activeSidebarTab === 'commission') setCommissionEndDate(v);
                      else if (activeSidebarTab === 'rebate') setRebateEndDate(v);
                    }}
                    className="bg-[#0f151f] border-white/10 text-white h-12 rounded-xl px-4 focus:border-emerald-500 focus-visible:ring-emerald-500/20 pr-10"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              {QUICK_FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-6 h-10 rounded-xl text-xs font-bold transition-all border ${
                    activeFilter === filter.id
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                      : 'border-white/5 bg-[#0f151f] text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Table Container */}
            <div className="flex-1 flex flex-col bg-[#0f151f] rounded-2xl border border-white/5 overflow-hidden shadow-inner">
              <div className="overflow-x-auto custom-scrollbar">
                {activeSidebarTab === 'transaction' && (
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-[#1a2230]/80 border-b border-white/5">
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Date / ID</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Description</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Amount</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {currentData.map((row, index) => (
                        <tr key={index} className="hover:bg-white/5 transition-all group">
                          <td className="px-6 py-5">
                            <div className="flex flex-col gap-1">
                              <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{row.date}</span>
                              <span className="text-xs font-mono text-gray-500">{row.id}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-sm text-gray-300 font-medium">{row.description}</span>
                          </td>
                          <td className="px-6 py-5 text-right">
                            <span className={`text-sm font-black ${
                              activeTypeTab === 'deposits' ? 'text-emerald-400' : 'text-orange-400'
                            }`}>
                              {activeTypeTab === 'deposits' ? '+' : '-'}{row.amount}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex justify-center">
                              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border ${
                                row.status === 'Approved' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
                                row.status === 'Pending' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' :
                                'bg-red-500/10 border-red-500/20 text-red-500'
                              }`}>
                                {row.status}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {activeSidebarTab === 'bet' && (
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-[#1a2230]/80 border-b border-white/5">
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Games</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Date</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Bet Amount</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Net Profit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {betHistoryData.map((row) => (
                        <tr key={row.id} className="hover:bg-white/5 transition-all group">
                          <td className="px-6 py-5">
                            <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{row.game}</span>
                          </td>
                          <td className="px-6 py-5 text-center">
                            <span className="text-sm text-orange-400 font-medium">{row.date}</span>
                          </td>
                          <td className="px-6 py-5 text-center">
                            <span className="text-sm text-white font-medium">{row.betAmount}</span>
                          </td>
                          <td className="px-6 py-5 text-center">
                            <span className="text-sm font-bold text-red-500">{row.netProfit}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {activeSidebarTab === 'commission' && (
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-[#1a2230]/80 border-b border-white/5">
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Rebate</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Sales</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Remark</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {commissionData.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center">
                            <span className="text-white text-sm">No Data Found</span>
                          </td>
                        </tr>
                      ) : (
                        commissionData.map((row, index) => (
                          <tr key={index} className="hover:bg-white/5 transition-all group">
                            <td className="px-6 py-5">
                              <span className="text-sm text-white font-medium">{row.date}</span>
                            </td>
                            <td className="px-6 py-5 text-center">
                              <span className="text-sm text-white font-medium">{row.rebate}</span>
                            </td>
                            <td className="px-6 py-5 text-center">
                              <span className="text-sm text-white font-medium">{row.sales}</span>
                            </td>
                            <td className="px-6 py-5 text-center">
                              <span className="text-sm text-white font-medium">{row.remark}</span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}

                {activeSidebarTab === 'rebate' && (
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-[#1a2230]/80 border-b border-white/5">
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Rebate</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Sales</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Remark</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {rebateData.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center">
                            <span className="text-white text-sm">No Data Found</span>
                          </td>
                        </tr>
                      ) : (
                        rebateData.map((row, index) => (
                          <tr key={index} className="hover:bg-white/5 transition-all group">
                            <td className="px-6 py-5">
                              <span className="text-sm text-white font-medium">{row.date}</span>
                            </td>
                            <td className="px-6 py-5 text-center">
                              <span className="text-sm text-white font-medium">{row.rebate}</span>
                            </td>
                            <td className="px-6 py-5 text-center">
                              <span className="text-sm text-white font-medium">{row.sales}</span>
                            </td>
                            <td className="px-6 py-5 text-center">
                              <span className="text-sm text-white font-medium">{row.remark}</span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}

                {activeSidebarTab === 'promotion' && (
                  <div className="px-6 py-12 text-center">
                    <span className="text-white text-sm">No Data Found</span>
                  </div>
                )}
              </div>
              
              {/* Pagination Placeholder */}
              {(activeSidebarTab === 'transaction' || activeSidebarTab === 'bet') && (
                <div className="p-4 mt-auto border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {activeSidebarTab === 'transaction' 
                      ? 'Showing 1-2 of 2 records'
                      : `Showing 1-${betHistoryData.length} of ${betHistoryData.length} records`
                    }
                  </span>
                  <div className="flex items-center gap-2">
                     <button className="px-3 py-1 rounded-lg bg-white/5 text-gray-500 text-xs disabled:opacity-50">Prev</button>
                     <button className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-500 text-xs font-bold border border-emerald-500/30">1</button>
                     <button className="px-3 py-1 rounded-lg bg-white/5 text-gray-500 text-xs disabled:opacity-50">Next</button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </InnerPageLayout>
  );
}
