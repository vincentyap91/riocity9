import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, X, Calendar, Dices, Wallet, Users, HandCoins, Megaphone
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { useLanguage } from '../contexts/LanguageContext';
import { InnerPageLayout } from "../components/shared/InnerPageLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const SIDEBAR_ITEMS = [
  { id: 'transaction', label: 'Transaction History', icon: Wallet, path: '/history' },
  { id: 'bet', label: 'Bet Record', icon: Dices, path: '/history/bet' },
  { id: 'commission', label: 'Commission Record', icon: Users, path: '/history/commission' },
  { id: 'rebate', label: 'Rebate Record', icon: HandCoins, path: '/history/rebate' },
  { id: 'promotion', label: 'Promotion Record', icon: Megaphone, path: '/history' },
];

const QUICK_DATE_BUTTONS = [
  { id: 'today', label: 'Today' },
  { id: 'yesterday', label: 'Yesterday' },
  { id: 'thisWeek', label: 'This Week' },
  { id: 'lastWeek', label: 'Last Week' },
  { id: 'thisMonth', label: 'This Month' },
  { id: 'lastMonth', label: 'Last Month' },
];

// Mock bet history data
const betHistoryData = [
  { id: 1, game: 'Gaogashou', date: '2026-01-27', betAmount: '68.00', netProfit: '-23.50' },
  { id: 2, game: 'Kimochiii', date: '2026-01-27', betAmount: '2.61', netProfit: '-0.95' },
];

export function BetHistory() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const [recordType, setRecordType] = useState('bet');
  const [statistics, setStatistics] = useState('all');
  const [activeDateButton, setActiveDateButton] = useState('thisWeek');
  const [startDate, setStartDate] = useState('26-01-2026');
  const [endDate, setEndDate] = useState('27-01-2026');
  
  // Determine active sidebar tab based on current route
  const getActiveTab = () => {
    if (location.pathname === '/history/bet') return 'bet';
    if (location.pathname === '/history/commission') return 'commission';
    if (location.pathname === '/history/rebate') return 'rebate';
    return 'transaction';
  };
  
  const [activeSidebarTab, setActiveSidebarTab] = useState(getActiveTab());
  
  useEffect(() => {
    setActiveSidebarTab(getActiveTab());
  }, [location.pathname]);

  const handleRecordTypeChange = (value: string) => {
    setRecordType(value);
    if (value === 'commission') {
      navigate('/history/commission');
    } else if (value === 'rebate') {
      navigate('/history/rebate');
    }
  };

  return (
    <InnerPageLayout className="overflow-hidden">
      <div className="container mx-auto px-4 py-12 max-w-[1024px]">
        
        {/* Navigation Header */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute left-0 flex items-center gap-3">
            <button
              onClick={() => navigate('/settings')}
              className="h-10 w-10 rounded-full bg-black/20 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <span className="text-white font-bold text-base">{t("settings")}</span>
          </div>
        </div>

        {/* Mobile/Tablet: Horizontal Scrollable Sidebar */}
        <div className="lg:hidden mb-6">
          <div className="w-full bg-[#1a2230] rounded-2xl border border-white/5 p-3 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-3 min-w-max">
              {SIDEBAR_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSidebarTab(item.id);
                    if (item.path) {
                      navigate(item.path);
                    }
                  }}
                  className={`px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex items-center gap-3 group shrink-0 ${
                    activeSidebarTab === item.id
                      ? 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 text-black shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className={`w-5 h-5 shrink-0 transition-colors ${
                    activeSidebarTab === item.id ? 'text-black' : 'text-gray-500 group-hover:text-white'
                  }`} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* Desktop: Vertical Sidebar */}
          <div className="hidden lg:flex w-[280px] bg-[#1a2230] rounded-2xl border border-white/5 p-4 flex-col gap-2 shrink-0">
            {SIDEBAR_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSidebarTab(item.id);
                  if (item.path) {
                    navigate(item.path);
                  }
                }}
                className={`w-full px-5 py-4 rounded-xl text-sm font-bold text-left transition-all flex items-center gap-4 group ${
                  activeSidebarTab === item.id
                    ? 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 text-black shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-5 h-5 transition-colors ${
                  activeSidebarTab === item.id ? 'text-black' : 'text-gray-500 group-hover:text-white'
                }`} />
                {item.label}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 w-full bg-[#1a2230] rounded-2xl border border-white/5 p-6 flex flex-col">
            {/* Title inside card (match Transaction History) */}
            <div className="flex items-center justify-start gap-3 pb-4">
              <div className="h-10 w-10 rounded-xl bg-black/25 border border-white/10 flex items-center justify-center">
                <Dices className="w-5 h-5 text-white/90" />
              </div>
              <span className="text-white font-bold text-base">Bet Record</span>
            </div>

            {/* Record Type Selection */}
            <div className="space-y-2 mb-6">
              <label className="text-white font-bold text-sm">Record Type</label>
              <Select value={recordType} onValueChange={handleRecordTypeChange}>
                <SelectTrigger className="w-full bg-[#0f151f] border-white/10 text-white h-12 rounded-xl focus:border-emerald-500">
                  <SelectValue placeholder="Select record type" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a2230] border-white/10">
                  <SelectItem value="bet" className="text-white focus:bg-emerald-500/20">Bet Record</SelectItem>
                  <SelectItem value="commission" className="text-white focus:bg-emerald-500/20">Commission Record</SelectItem>
                  <SelectItem value="rebate" className="text-white focus:bg-emerald-500/20">Rebate Record</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Statistics Selection */}
            <div className="space-y-2 mb-6">
              <label className="text-white font-bold text-sm">Statistics</label>
              <Select value={statistics} onValueChange={setStatistics}>
                <SelectTrigger className="w-full bg-[#0f151f] border-white/10 text-white h-12 rounded-xl focus:border-emerald-500">
                  <SelectValue placeholder="Select statistics" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a2230] border-white/10">
                  <SelectItem value="all" className="text-white focus:bg-emerald-500/20">All</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-white font-bold text-sm">Start Date</label>
                <div className="relative group">
                  <Input
                    type="text"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
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
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-[#0f151f] border-white/10 text-white h-12 rounded-xl px-4 focus:border-emerald-500 focus-visible:ring-emerald-500/20 pr-10"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Quick Date Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              {QUICK_DATE_BUTTONS.map((button) => (
                <button
                  key={button.id}
                  onClick={() => setActiveDateButton(button.id)}
                  className={`px-6 h-10 rounded-xl text-xs font-bold transition-all border ${
                    activeDateButton === button.id
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                      : 'border-white/5 bg-[#0f151f] text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {button.label}
                </button>
              ))}
            </div>

          {/* Data Table */}
          <div className="flex-1 flex flex-col bg-[#0f151f] rounded-2xl border border-white/5 overflow-hidden shadow-inner">
            <div className="overflow-x-auto custom-scrollbar">
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
            </div>
          </div>

          </div>
        </div>

      </div>
    </InnerPageLayout>
  );
}
