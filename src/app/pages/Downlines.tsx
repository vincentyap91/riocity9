import React, { useEffect, useState } from 'react';
import {
  ArrowLeft, Users, Calendar, Search,
  ChevronUp, ChevronDown, X, UserCheck, UserX, BarChart3
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useLanguage } from '../contexts/LanguageContext';
import { InnerPageLayout } from "../components/shared/InnerPageLayout";
import { PageSidebar, type PageSidebarItem } from '../components/shared/PageSidebar';
import { MOBILE } from '../config/themeTokens';
import { sanitizeTextInput } from '../utils/security';
import { UsersThree } from '../components/icons/UsersThree';
import { FilterTabs } from '../components/shared/FilterTabs';

const DOWNLINE_SIDEBAR_ITEMS: PageSidebarItem[] = [
  { id: 'summary', label: 'Downline Summary', icon: UsersThree },
  { id: 'kpis', label: 'Downlines KPIs', icon: BarChart3 },
];

const QUICK_DATE_FILTERS = [
  { id: 'today', label: 'Today' },
  { id: '7days', label: 'Last 7 Days' },
  { id: '30days', label: 'Last 30 Days' },
  { id: '60days', label: 'Last 60 Days' },
];

const DOWNLINE_TABS = ['summary', 'kpis'] as const;
type DownlineTab = (typeof DOWNLINE_TABS)[number];
const STATUS_TABS = ['active', 'inactive'] as const;
type StatusTab = (typeof STATUS_TABS)[number];
const DATE_TABS = QUICK_DATE_FILTERS.map((item) => item.id);

function normalizeDownlineTab(value: string | null | undefined): DownlineTab {
  const normalized = (value || '').trim().toLowerCase();
  return DOWNLINE_TABS.includes(normalized as DownlineTab) ? (normalized as DownlineTab) : 'summary';
}

function normalizeStatusTab(value: string | null | undefined): StatusTab {
  const normalized = (value || '').trim().toLowerCase();
  return STATUS_TABS.includes(normalized as StatusTab) ? (normalized as StatusTab) : 'active';
}

function normalizeDateTab(value: string | null | undefined): string {
  const normalized = (value || '').trim().toLowerCase();
  return DATE_TABS.includes(normalized) ? normalized : 'today';
}

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
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'summary' | 'kpis'>(() => normalizeDownlineTab(searchParams.get('tab')));
  const [activeDateFilter, setActiveDateFilter] = useState(() => normalizeDateTab(searchParams.get('dateTab')));
  const [activeStatusTab, setActiveStatusTab] = useState<'active' | 'inactive'>(() => normalizeStatusTab(searchParams.get('statusTab')));
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'deposit' | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const updateQuery = (updates: Record<string, string>) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => next.set(key, value));
    setSearchParams(next);
  };

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

  useEffect(() => {
    const currentTab = searchParams.get('tab');
    const currentDateTab = searchParams.get('dateTab');
    const currentStatusTab = searchParams.get('statusTab');

    const normalizedTab = normalizeDownlineTab(currentTab);
    const normalizedDateTab = normalizeDateTab(currentDateTab);
    const normalizedStatusTab = normalizeStatusTab(currentStatusTab);

    setActiveTab(normalizedTab);
    setActiveDateFilter(normalizedDateTab);
    setActiveStatusTab(normalizedStatusTab);

    if (currentTab !== normalizedTab || currentDateTab !== normalizedDateTab || currentStatusTab !== normalizedStatusTab) {
      const next = new URLSearchParams(searchParams);
      next.set('tab', normalizedTab);
      next.set('dateTab', normalizedDateTab);
      next.set('statusTab', normalizedStatusTab);
      setSearchParams(next, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return (
    <InnerPageLayout className="overflow-hidden">
      <div className={`container mx-auto max-w-[1024px] ${MOBILE.settingsPageContainer}`}>

        {/* Navigation Header – same gap below as on all inner pages */}
        <div className={`relative flex items-center justify-between ${MOBILE.headerMb}`}>
          <div className={`flex items-center ${MOBILE.gapSm}`}>
            <button
              onClick={() => navigate('/settings')}
              className="h-10 w-10 rounded-full bg-black/20 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <span className={`text-white ${MOBILE.pageTitle}`}>{t("settings")}</span>
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
            items={DOWNLINE_SIDEBAR_ITEMS}
            activeId={activeTab}
            onSelect={(id) => {
              const tabId = normalizeDownlineTab(id);
              setActiveTab(tabId);
              updateQuery({ tab: tabId });
            }}
          />

          {/* Main Content Area */}
          <div className={`flex-1 w-full bg-[#1a2230] rounded-2xl border border-white/5 ${MOBILE.cardPadding} flex flex-col`}>
            {/* Title - icon matches active sidebar item */}
            <div className={`flex items-center justify-between ${MOBILE.sectionMb}`}>
              <div className={`flex items-center ${MOBILE.gapSm}`}>
                <div className="h-10 w-10 rounded-xl bg-black/25 border border-white/10 flex items-center justify-center">
                  {(() => {
                    const TitleIcon = DOWNLINE_SIDEBAR_ITEMS.find((i) => i.id === activeTab)?.icon ?? UsersThree;
                    return <TitleIcon className="w-5 h-5 text-white" />;
                  })()}
                </div>
                <span className="text-white font-bold text-base">
                  {activeTab === 'summary' ? 'Downline Summary' : 'Downlines KPIs'}
                </span>
              </div>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'summary' ? (
              <>
                {/* Date Selection */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 ${MOBILE.gap} ${MOBILE.sectionMb}`}>
                  <div className={MOBILE.spaceY}>
                    <label className={`text-white ${MOBILE.label}`}>Start Date</label>
                    <div className="relative group">
                      <Input
                        type="text"
                        defaultValue="19-01-2026"
                        className="bg-[#0f151f] border-white/10 text-white h-12 rounded-xl px-4 focus:border-[#00bc7d] focus-visible:ring-[#00bc7d]/20 pr-10"
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  <div className={MOBILE.spaceY}>
                    <label className={`text-white ${MOBILE.label}`}>End Date</label>
                    <div className="relative group">
                      <Input
                        type="text"
                        defaultValue="23-01-2026"
                        className="bg-[#0f151f] border-white/10 text-white h-12 rounded-xl px-4 focus:border-[#00bc7d] focus-visible:ring-[#00bc7d]/20 pr-10"
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Quick Date Filters (Today / Last 7/30/60 Days) */}
                <div className="mb-6">
                  <FilterTabs
                    items={QUICK_DATE_FILTERS}
                    activeId={activeDateFilter}
                    onSelect={(id) => {
                      setActiveDateFilter(id);
                      updateQuery({ dateTab: id });
                    }}
                    scrollable
                  />
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
                  <div className="flex justify-start mb-4 px-1">
                    <div className="flex flex-nowrap bg-[#0f151f] p-1 rounded-lg md:rounded-xl border border-white/5 w-full max-w-[400px]">
                      <button
                        onClick={() => {
                          setActiveStatusTab('active');
                          updateQuery({ statusTab: 'active' });
                        }}
                        className={`flex-1 min-w-0 px-3 py-2 md:px-6 md:py-3 rounded-md md:rounded-lg text-xs md:text-sm font-bold transition-all whitespace-nowrap ${activeStatusTab === 'active'
                          ? 'bg-[#00bc7d] hover:bg-[#00a870] text-black'
                          : 'text-gray-400 hover:text-white'
                          }`}
                      >
                        <span className="flex items-center justify-center gap-1.5 md:gap-2">
                          <UserCheck className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
                          Active Downlines
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          setActiveStatusTab('inactive');
                          updateQuery({ statusTab: 'inactive' });
                        }}
                        className={`flex-1 min-w-0 px-3 py-2 md:px-6 md:py-3 rounded-md md:rounded-lg text-xs md:text-sm font-bold transition-all whitespace-nowrap ${activeStatusTab === 'inactive'
                          ? 'bg-[#00bc7d] hover:bg-[#00a870] text-black'
                          : 'text-gray-400 hover:text-white'
                          }`}
                      >
                        <span className="flex items-center justify-center gap-1.5 md:gap-2">
                          <UserX className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
                          Inactive Downlines
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <Input
                      type="text"
                      value={searchQuery}
                      onChange={(e) =>
                        setSearchQuery(sanitizeTextInput(e.target.value).slice(0, 50))
                      }
                      maxLength={50}
                      placeholder="Search downline username"
                      className="bg-[#0f151f] border-white/10 text-white h-12 rounded-xl pl-12 pr-4 focus:border-[#00bc7d] focus-visible:ring-[#00bc7d]/20 placeholder:text-gray-600"
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
