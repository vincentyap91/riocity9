import React, { useState } from 'react';
import { 
  ArrowLeft, UsersRound, Calendar, Search, 
  ChevronUp, ChevronDown, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useLanguage } from '../contexts/LanguageContext';
import { InnerPageLayout } from "../components/shared/InnerPageLayout";

const QUICK_DATE_FILTERS = [
  { id: 'today', label: 'Today' },
  { id: 'yesterday', label: 'Yesterday' },
  { id: 'thisWeek', label: 'This Week' },
  { id: 'lastWeek', label: 'Last Week' },
  { id: 'thisMonth', label: 'This Month' },
  { id: 'lastMonth', label: 'Last Month' },
];

// Mock data for Downline Summary
const summaryData = {
  newDownlineL1: 0,
  newAllDownlines: 0,
  totalDownlineL1: 2,
  totalAllDownlines: 2,
  numberOfDownlines: 1,
};

// Mock data for Downlines KPIs
const kpiData = {
  totalActive: 1,
  totalInactive: 1,
};

// Mock data for downlines list
const downlinesList = [
  {
    id: 1,
    username: 'damrefer',
    contact: '********112',
    registerDate: '2025-10-15 08:32:00',
    deposit: '500.00',
    status: 'active',
  },
];

export function Downlines() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'summary' | 'kpis'>('summary');
  const [activeDateFilter, setActiveDateFilter] = useState('thisWeek');
  const [activeStatusTab, setActiveStatusTab] = useState<'active' | 'inactive'>('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'deposit' | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: 'deposit') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const filteredDownlines = downlinesList.filter(downline =>
    downline.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        {/* Mobile/Tablet: Horizontal Scrollable Sidebar */}
        <div className="lg:hidden mb-6">
          <div className="w-full bg-[#1a2230] rounded-2xl border border-white/5 p-3 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-3 min-w-max">
              <button
                onClick={() => setActiveTab('summary')}
                className={`px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex items-center gap-3 group shrink-0 ${
                  activeTab === 'summary'
                    ? 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 text-black shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <UsersRound className={`w-5 h-5 shrink-0 transition-colors ${
                  activeTab === 'summary' ? 'text-black' : 'text-gray-500 group-hover:text-white'
                }`} />
                Downline Summary
              </button>
              <button
                onClick={() => setActiveTab('kpis')}
                className={`px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex items-center gap-3 group shrink-0 ${
                  activeTab === 'kpis'
                    ? 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 text-black shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <UsersRound className={`w-5 h-5 shrink-0 transition-colors ${
                  activeTab === 'kpis' ? 'text-black' : 'text-gray-500 group-hover:text-white'
                }`} />
                Downlines KPIs
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* Desktop: Vertical Sidebar */}
          <div className="hidden lg:flex w-[280px] bg-[#1a2230] rounded-2xl border border-white/5 p-4 flex-col gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('summary')}
              className={`w-full px-5 py-4 rounded-xl text-sm font-bold text-left transition-all flex items-center gap-4 group ${
                activeTab === 'summary'
                  ? 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 text-black shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <UsersRound className={`w-5 h-5 ${activeTab === 'summary' ? 'text-black' : 'text-gray-500 group-hover:text-white'} transition-colors`} />
              Downline Summary
            </button>
            <button
              onClick={() => setActiveTab('kpis')}
              className={`w-full px-5 py-4 rounded-xl text-sm font-bold text-left transition-all flex items-center gap-4 group ${
                activeTab === 'kpis'
                  ? 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 text-black shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <UsersRound className={`w-5 h-5 ${activeTab === 'kpis' ? 'text-black' : 'text-gray-500 group-hover:text-white'} transition-colors`} />
              Downlines KPIs
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 w-full bg-[#1a2230] rounded-2xl border border-white/5 p-6 flex flex-col">
            {/* Title */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-black/25 border border-white/10 flex items-center justify-center">
                  <UsersRound className="w-5 h-5 text-emerald-500" />
                </div>
                <span className="text-emerald-500 font-bold text-lg">
                  {activeTab === 'summary' ? 'Downline Summary' : 'Downlines KPIs'}
                </span>
              </div>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'summary' ? (
              <>
                {/* Date Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <label className="text-emerald-500 font-bold text-sm">Start Date</label>
                    <div className="relative group">
                      <Input
                        type="text"
                        defaultValue="19-01-2026"
                        className="bg-white border-white/10 text-black h-12 rounded-xl px-4 focus:border-emerald-500 focus-visible:ring-emerald-500/20 pr-10"
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-emerald-500 font-bold text-sm">End Date</label>
                    <div className="relative group">
                      <Input
                        type="text"
                        defaultValue="23-01-2026"
                        className="bg-white border-white/10 text-black h-12 rounded-xl px-4 focus:border-emerald-500 focus-visible:ring-emerald-500/20 pr-10"
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Quick Date Filters */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {QUICK_DATE_FILTERS.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveDateFilter(filter.id)}
                      className={`px-6 h-10 rounded-xl text-xs font-bold transition-all border ${
                        activeDateFilter === filter.id
                          ? 'border-emerald-500 bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                          : 'border-white/5 bg-[#0f151f] text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                {/* Summary Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#0f151f] rounded-xl border border-white/5 p-4">
                    <div className="text-gray-400 text-sm font-bold mb-2">New Downline L1</div>
                    <div className="text-white text-2xl font-black">{summaryData.newDownlineL1}</div>
                  </div>
                  <div className="bg-[#0f151f] rounded-xl border border-white/5 p-4">
                    <div className="text-gray-400 text-sm font-bold mb-2">New All Downlines</div>
                    <div className="text-white text-2xl font-black">{summaryData.newAllDownlines}</div>
                  </div>
                </div>

                {/* Up To Now Section */}
                <div className="mb-4">
                  <h3 className="text-white font-bold text-base mb-4">Up To Now</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="bg-[#0f151f] rounded-xl border border-white/5 p-4">
                      <div className="text-gray-400 text-sm font-bold mb-2">Total Downline L1</div>
                      <div className="text-white text-2xl font-black">{summaryData.totalDownlineL1}</div>
                    </div>
                    <div className="bg-[#0f151f] rounded-xl border border-white/5 p-4">
                      <div className="text-gray-400 text-sm font-bold mb-2">Total All Downlines</div>
                      <div className="text-white text-2xl font-black">{summaryData.totalAllDownlines}</div>
                    </div>
                  </div>
                  <div className="bg-[#0f151f] rounded-xl border border-white/5 p-4">
                    <div className="text-gray-400 text-sm font-bold mb-2">Number of Downlines</div>
                    <div className="text-white text-2xl font-black">{summaryData.numberOfDownlines}</div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* KPIs Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#0f151f] rounded-xl border border-white/5 p-4">
                    <div className="text-gray-400 text-sm font-bold mb-2">Total Active Downlines</div>
                    <div className="text-white text-2xl font-black">{kpiData.totalActive}</div>
                  </div>
                  <div className="bg-[#0f151f] rounded-xl border border-white/5 p-4">
                    <div className="text-gray-400 text-sm font-bold mb-2">Total Inactive Downlines</div>
                    <div className="text-white text-2xl font-black">{kpiData.totalInactive}</div>
                  </div>
                </div>

                {/* Downline L1 KPIs Section */}
                <div className="mb-6">
                  <h3 className="text-white font-bold text-base mb-4">Downline L1 KPIs</h3>
                  
                  {/* Status Tabs */}
                  <div className="flex justify-center mb-4">
                    <div className="flex bg-[#0f151f] p-1 rounded-xl border border-white/5 w-full max-w-[400px]">
                      <button
                        onClick={() => setActiveStatusTab('active')}
                        className={`flex-1 px-8 py-3 rounded-lg text-sm font-bold transition-all ${
                          activeStatusTab === 'active'
                            ? 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 text-black shadow-lg'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        Active Downlines
                      </button>
                      <button
                        onClick={() => setActiveStatusTab('inactive')}
                        className={`flex-1 px-8 py-3 rounded-lg text-sm font-bold transition-all ${
                          activeStatusTab === 'inactive'
                            ? 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 text-black shadow-lg'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        Inactive Downlines
                      </button>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <Input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search downline username"
                      className="bg-[#0f151f] border-white/10 text-white h-12 rounded-xl pl-12 pr-4 focus:border-emerald-500 focus-visible:ring-emerald-500/20 placeholder:text-gray-600"
                    />
                  </div>

                  {/* Downlines Table */}
                  <div className="bg-[#0f151f] rounded-2xl border border-white/5 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                          <tr className="bg-[#1a2230]/80 border-b border-white/5">
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Username</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Contact</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Register Date</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                              <button
                                onClick={() => handleSort('deposit')}
                                className="flex items-center gap-2 hover:text-emerald-500 transition-colors"
                              >
                                Deposit
                                {sortBy === 'deposit' ? (
                                  sortOrder === 'asc' ? (
                                    <ChevronUp className="w-4 h-4" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4" />
                                  )
                                ) : (
                                  <div className="w-4 h-4 flex flex-col">
                                    <ChevronUp className="w-2 h-2 text-gray-600" />
                                    <ChevronDown className="w-2 h-2 text-gray-600 -mt-1" />
                                  </div>
                                )}
                              </button>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {filteredDownlines
                            .filter(d => activeStatusTab === 'active' ? d.status === 'active' : d.status === 'inactive')
                            .map((downline) => (
                              <tr key={downline.id} className="hover:bg-white/5 transition-all group">
                                <td className="px-6 py-5">
                                  <span className="text-sm font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors">
                                    {downline.username}
                                  </span>
                                </td>
                                <td className="px-6 py-5">
                                  <span className="text-sm text-white font-medium">{downline.contact}</span>
                                </td>
                                <td className="px-6 py-5">
                                  <span className="text-sm text-white font-medium">{downline.registerDate}</span>
                                </td>
                                <td className="px-6 py-5">
                                  <span className="text-sm font-black text-white">{downline.deposit}</span>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </InnerPageLayout>
  );
}
