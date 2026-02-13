import React, { useMemo, useState } from 'react';
import { 
  ArrowLeft, History, Wallet, Dices, 
  Users, HandCoins, Megaphone,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '../components/ui/DatePicker';
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
import {
  RECORD_PAGE_ICON_BOX_CLASS,
  RECORD_PAGE_ICON_CLASS,
  RECORD_PAGE_TITLE_CLASS,
  MOBILE,
} from '../config/themeTokens';
import { EmptyState } from '../components/shared/EmptyState';
import { FilterTabs } from '../components/shared/FilterTabs';
import { MobileRecordCardList } from '../components/shared/MobileRecordCardList';
import { MobileRecordFilterPanel } from '../components/shared/MobileRecordFilterPanel';

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

const TRANSACTION_QUICK_FILTERS = [
  { id: 'today', label: 'Today' },
  { id: 'yesterday', label: 'Yesterday' },
  { id: 'thisWeek', label: 'This Week' },
  { id: 'lastWeek', label: 'Last Week' },
];

interface TransactionRow {
  id: string;
  date: string;
  amount: string;
  status: string;
  description: string;
}

function parseLocalDateInput(value: string): Date | null {
  const match = value.trim().match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (!match) return null;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

function parseTransactionDateTime(value: string): Date | null {
  const match = value.trim().match(
    /^(\d{2})-(\d{2})-(\d{4})(?:\s+(\d{2}):(\d{2})(?::(\d{2}))?)?$/,
  );
  if (!match) return null;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const hour = Number(match[4] ?? '0');
  const minute = Number(match[5] ?? '0');
  const second = Number(match[6] ?? '0');

  const date = new Date(year, month - 1, day, hour, minute, second, 0);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
}

function endOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}

function formatLocalDate(date: Date): string {
  const day = `${date.getDate()}`.padStart(2, '0');
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

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

const promotionData: any[] = [];

export function HistoryRecord() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [activeSidebarTab, setActiveSidebarTab] = useState<'transaction' | 'bet' | 'commission' | 'rebate' | 'promotion'>('transaction');
  const [activeTypeTab, setActiveTypeTab] = useState<'deposits' | 'withdrawals'>('deposits');
  const [activeFilter, setActiveFilter] = useState('today');
  const [transactionQuickRange, setTransactionQuickRange] = useState('');
  const [transactionStartDate, setTransactionStartDate] = useState('');
  const [transactionEndDate, setTransactionEndDate] = useState('');
  
  // Bet Record state
  const [statistics, setStatistics] = useState('all');
  const [betStartDate, setBetStartDate] = useState('26-01-2026');
  const [betEndDate, setBetEndDate] = useState('27-01-2026');
  
  // Commission/Rebate Record state
  const [commissionStartDate, setCommissionStartDate] = useState('25-01-2026');
  const [commissionEndDate, setCommissionEndDate] = useState('31-01-2026');
  const [rebateStartDate, setRebateStartDate] = useState('25-01-2026');
  const [rebateEndDate, setRebateEndDate] = useState('31-01-2026');
  const [promotionStartDate, setPromotionStartDate] = useState('');
  const [promotionEndDate, setPromotionEndDate] = useState('');

  const currentData = activeTypeTab === 'deposits' ? depositData : withdrawalData;

  const applyTransactionQuickRange = (rangeId: string) => {
    const now = new Date();
    let rangeStart = now;
    let rangeEnd = now;

    if (rangeId === 'today') {
      rangeStart = startOfDay(now);
      rangeEnd = endOfDay(now);
    } else if (rangeId === 'yesterday') {
      const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
      rangeStart = startOfDay(yesterday);
      rangeEnd = endOfDay(yesterday);
    } else if (rangeId === 'thisWeek') {
      const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
      rangeStart = startOfDay(weekStart);
      rangeEnd = now;
    } else if (rangeId === 'lastWeek') {
      const currentWeekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
      const lastWeekStart = new Date(currentWeekStart.getFullYear(), currentWeekStart.getMonth(), currentWeekStart.getDate() - 7);
      const lastWeekEnd = new Date(currentWeekStart.getFullYear(), currentWeekStart.getMonth(), currentWeekStart.getDate() - 1);
      rangeStart = startOfDay(lastWeekStart);
      rangeEnd = endOfDay(lastWeekEnd);
    } else {
      return;
    }

    setTransactionQuickRange(rangeId);
    setTransactionStartDate(formatLocalDate(rangeStart));
    setTransactionEndDate(formatLocalDate(rangeEnd));
  };

  const currentStartDate =
    activeSidebarTab === 'transaction' ? transactionStartDate :
    activeSidebarTab === 'bet' ? betStartDate :
    activeSidebarTab === 'commission' ? commissionStartDate :
    activeSidebarTab === 'rebate' ? rebateStartDate :
    '01/14/2026';
  const currentEndDate =
    activeSidebarTab === 'transaction' ? transactionEndDate :
    activeSidebarTab === 'bet' ? betEndDate :
    activeSidebarTab === 'commission' ? commissionEndDate :
    activeSidebarTab === 'rebate' ? rebateEndDate :
    '01/14/2026';
  const currentMobileStartDate =
    activeSidebarTab === 'transaction' ? transactionStartDate :
    activeSidebarTab === 'bet' ? betStartDate :
    activeSidebarTab === 'commission' ? commissionStartDate :
    activeSidebarTab === 'rebate' ? rebateStartDate :
    promotionStartDate;
  const currentMobileEndDate =
    activeSidebarTab === 'transaction' ? transactionEndDate :
    activeSidebarTab === 'bet' ? betEndDate :
    activeSidebarTab === 'commission' ? commissionEndDate :
    activeSidebarTab === 'rebate' ? rebateEndDate :
    promotionEndDate;

  const updateStartDateByTab = (nextValue: Date | string) => {
    const value = String(nextValue);
    if (activeSidebarTab === 'transaction') {
      setTransactionStartDate(value);
      setTransactionQuickRange('');
    }
    else if (activeSidebarTab === 'bet') setBetStartDate(value);
    else if (activeSidebarTab === 'commission') setCommissionStartDate(value);
    else if (activeSidebarTab === 'rebate') setRebateStartDate(value);
    else setPromotionStartDate(value);
  };

  const updateEndDateByTab = (nextValue: Date | string) => {
    const value = String(nextValue);
    if (activeSidebarTab === 'transaction') {
      setTransactionEndDate(value);
      setTransactionQuickRange('');
    }
    else if (activeSidebarTab === 'bet') setBetEndDate(value);
    else if (activeSidebarTab === 'commission') setCommissionEndDate(value);
    else if (activeSidebarTab === 'rebate') setRebateEndDate(value);
    else setPromotionEndDate(value);
  };

  const transactionDateRangeError = useMemo(() => {
    const parsedStart = parseLocalDateInput(transactionStartDate);
    const parsedEnd = parseLocalDateInput(transactionEndDate);
    if (!parsedStart || !parsedEnd) return '';
    if (parsedStart.getTime() > parsedEnd.getTime()) {
      return 'Start Date cannot be later than End Date';
    }
    return '';
  }, [transactionStartDate, transactionEndDate]);

  const filteredTransactionData = useMemo(() => {
    const sourceData = currentData as TransactionRow[];
    const parsedStart = parseLocalDateInput(transactionStartDate);
    const parsedEnd = parseLocalDateInput(transactionEndDate);

    if (!parsedStart && !parsedEnd) return sourceData;
    if (parsedStart && parsedEnd && parsedStart.getTime() > parsedEnd.getTime()) return [];

    const startBoundary = parsedStart ? startOfDay(parsedStart).getTime() : Number.NEGATIVE_INFINITY;
    const endBoundary = parsedEnd
      ? (
        transactionQuickRange === 'thisWeek'
          ? new Date().getTime()
          : endOfDay(parsedEnd).getTime()
      )
      : Number.POSITIVE_INFINITY;

    return sourceData.filter((row) => {
      const rowDate = parseTransactionDateTime(row.date);
      if (!rowDate) return false;
      const timestamp = rowDate.getTime();
      return timestamp >= startBoundary && timestamp <= endBoundary;
    });
  }, [currentData, transactionEndDate, transactionQuickRange, transactionStartDate]);

  const renderStatusBadge = (status: string) => (
    <span className={`px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-widest border ${
      status === 'Approved' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
      status === 'Pending' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' :
      status === 'Completed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
      status === 'Rejected' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
      'bg-gray-500/10 border-gray-500/20 text-gray-300'
    }`}>
      {status}
    </span>
  );

  const filterInputs = (
    <>
      {activeSidebarTab === 'transaction' && (
        <div className={`${MOBILE.spaceY} ${MOBILE.sectionMb}`}>
          <label className={`text-white ${MOBILE.label}`}>Type</label>
          <Select value={activeTypeTab} onValueChange={(v) => setActiveTypeTab(v as 'deposits' | 'withdrawals')}>
            <SelectTrigger className="w-full bg-[#0f151f] border-white/10 text-white !h-12 rounded-xl px-4 py-0 data-[size=default]:!h-12 focus:border-[#00bc7d] focus-visible:ring-[#00bc7d]/20">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a2230] border-white/10">
              <SelectItem value="deposits" className="text-white focus:bg-[#00bc7d]/20">
                {t("deposit")}
              </SelectItem>
              <SelectItem value="withdrawals" className="text-white focus:bg-[#00bc7d]/20">
                {t("withdrawals")}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {activeSidebarTab === 'bet' && (
        <div className="space-y-2 mb-6">
          <label className="text-white font-bold text-sm">Statistics</label>
          <Select value={statistics} onValueChange={setStatistics}>
            <SelectTrigger className="w-full bg-[#0f151f] border-white/10 text-white !h-12 rounded-xl px-4 py-0 data-[size=default]:!h-12 focus:border-[#00bc7d] focus-visible:ring-[#00bc7d]/20">
              <SelectValue placeholder="Select statistics" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a2230] border-white/10">
              <SelectItem value="all" className="text-white focus:bg-[#00bc7d]/20">All</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <label className="text-white font-bold text-sm">Start Date</label>
          <div className="relative group">
            <DatePicker
              value={currentStartDate}
              onChange={(nextValue) => {
                const v = String(nextValue);
                if (activeSidebarTab === 'transaction') {
                  setTransactionStartDate(v);
                  setTransactionQuickRange('');
                } else if (activeSidebarTab === 'bet') setBetStartDate(v);
                else if (activeSidebarTab === 'commission') setCommissionStartDate(v);
                else if (activeSidebarTab === 'rebate') setRebateStartDate(v);
              }}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-white font-bold text-sm">End Date</label>
          <div className="relative group">
            <DatePicker
              value={currentEndDate}
              onChange={(nextValue) => {
                const v = String(nextValue);
                if (activeSidebarTab === 'transaction') {
                  setTransactionEndDate(v);
                  setTransactionQuickRange('');
                } else if (activeSidebarTab === 'bet') setBetEndDate(v);
                else if (activeSidebarTab === 'commission') setCommissionEndDate(v);
                else if (activeSidebarTab === 'rebate') setRebateEndDate(v);
              }}
            />
          </div>
        </div>
      </div>
      {activeSidebarTab === 'transaction' && transactionDateRangeError ? (
        <p className="text-xs text-red-400 -mt-4 mb-5">{transactionDateRangeError}</p>
      ) : null}
    </>
  );

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
      <div className={`container mx-auto max-w-[1024px] ${MOBILE.settingsPageContainer}`}>
        {/* Navigation Header */}
        <div className={`relative flex items-center justify-between ${MOBILE.headerMb}`}>
          <div className={`flex items-center ${MOBILE.gapSm}`}>
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

        <div className={`flex flex-col lg:flex-row ${MOBILE.gap} items-start`}>
          <PageSidebar
            items={SIDEBAR_ITEMS}
            activeId={activeSidebarTab}
            onSelect={(id) => setActiveSidebarTab(id as 'transaction' | 'bet' | 'commission' | 'rebate' | 'promotion')}
          />

          {/* Main Content Area */}
          <div className={`flex-1 w-full bg-[#1a2230] rounded-2xl border border-white/5 ${MOBILE.cardPadding} flex flex-col`}>
            {/* Title inside card */}
            <div className={`flex items-center justify-start ${MOBILE.gapSm} pb-4`}>
              <div className={RECORD_PAGE_ICON_BOX_CLASS}>
                <TitleIcon className={RECORD_PAGE_ICON_CLASS} />
              </div>
              <span className={RECORD_PAGE_TITLE_CLASS}>{title}</span>
            </div>

            {/* Transaction History: Type dropdown – same style as Bet Record Statistics */}
            <div className="hidden md:block">
              {filterInputs}
            </div>

            <div className="hidden md:block mb-6">
              <FilterTabs
                items={activeSidebarTab === 'transaction' ? TRANSACTION_QUICK_FILTERS : QUICK_FILTERS}
                activeId={activeSidebarTab === 'transaction' ? transactionQuickRange : activeFilter}
                onSelect={(id) => {
                  if (activeSidebarTab === 'transaction') {
                    applyTransactionQuickRange(id);
                  } else {
                    setActiveFilter(id);
                  }
                }}
                scrollable
              />
            </div>

            <MobileRecordFilterPanel
              primaryLabel={
                activeSidebarTab === 'transaction'
                  ? 'Record Type'
                  : activeSidebarTab === 'bet'
                    ? 'Statistics'
                    : undefined
              }
              primaryControl={
                activeSidebarTab === 'transaction' ? (
                  <Select value={activeTypeTab} onValueChange={(v) => setActiveTypeTab(v as 'deposits' | 'withdrawals')}>
                    <SelectTrigger className="w-full bg-[#0f151f] border-white/10 text-white !h-12 rounded-xl px-4 py-0 data-[size=default]:!h-12 focus:border-[#00bc7d] focus-visible:ring-[#00bc7d]/20">
                      <SelectValue placeholder="Transaction Record" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a2230] border-white/10">
                      <SelectItem value="deposits" className="text-white focus:bg-[#00bc7d]/20">
                        {t("deposit")}
                      </SelectItem>
                      <SelectItem value="withdrawals" className="text-white focus:bg-[#00bc7d]/20">
                        {t("withdrawals")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                ) : activeSidebarTab === 'bet' ? (
                  <Select value={statistics} onValueChange={setStatistics}>
                    <SelectTrigger className="w-full bg-[#0f151f] border-white/10 text-white !h-12 rounded-xl px-4 py-0 data-[size=default]:!h-12 focus:border-[#00bc7d] focus-visible:ring-[#00bc7d]/20">
                      <SelectValue placeholder="Select statistics" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a2230] border-white/10">
                      <SelectItem value="all" className="text-white focus:bg-[#00bc7d]/20">All</SelectItem>
                    </SelectContent>
                  </Select>
                ) : undefined
              }
              startDate={currentMobileStartDate}
              endDate={currentMobileEndDate}
              onStartDateChange={updateStartDateByTab}
              onEndDateChange={updateEndDateByTab}
              tabs={activeSidebarTab === 'transaction' ? TRANSACTION_QUICK_FILTERS : QUICK_FILTERS}
              activeTabId={activeSidebarTab === 'transaction' ? transactionQuickRange : activeFilter}
              onSelectTab={(id) => {
                if (activeSidebarTab === 'transaction') {
                  applyTransactionQuickRange(id);
                } else {
                  setActiveFilter(id);
                }
              }}
              errorMessage={activeSidebarTab === 'transaction' ? transactionDateRangeError : undefined}
            />

            {/* Table Container */}
            <div className="flex-1 flex flex-col bg-[#0f151f] rounded-2xl border border-white/5 overflow-hidden shadow-inner">
              <div className="md:hidden p-4">
                {activeSidebarTab === 'transaction' && (
                  <MobileRecordCardList
                    data={filteredTransactionData}
                    rowKey={(row) => row.id}
                    renderHeader={(row) => (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white">{row.date}</span>
                        {renderStatusBadge(row.status)}
                      </div>
                    )}
                    fieldGridClassName="grid grid-cols-[100px_1fr] gap-x-3 gap-y-2 text-xs"
                    fields={(row) => [
                      { label: 'ID', value: row.id, valueClassName: 'text-gray-200 font-mono' },
                      { label: 'Description', value: row.description, valueClassName: 'text-gray-200 font-medium' },
                      {
                        label: 'Amount',
                        value: `${activeTypeTab === 'deposits' ? '+' : '-'}${row.amount}`,
                        valueClassName: `font-bold ${activeTypeTab === 'deposits' ? 'text-emerald-400' : 'text-orange-400'}`,
                      },
                    ]}
                    emptyState={
                      <div className="py-8">
                        <EmptyState message="No Data Found" compact />
                      </div>
                    }
                  />
                )}

                {activeSidebarTab === 'bet' && (
                  <MobileRecordCardList
                    data={betHistoryData}
                    rowKey={(row) => row.id}
                    renderHeader={(row) => <div className="text-sm font-bold text-white">{row.game}</div>}
                    fieldGridClassName="grid grid-cols-[100px_1fr] gap-x-3 gap-y-2 text-xs"
                    fields={(row) => [
                      { label: 'Date', value: row.date, valueClassName: 'text-orange-400 font-medium' },
                      { label: 'Bet Amount', value: row.betAmount, valueClassName: 'text-white font-medium' },
                      {
                        label: 'Net Profit',
                        value: row.netProfit,
                        valueClassName: `font-bold ${row.netProfit.startsWith('-') ? 'text-red-500' : 'text-emerald-400'}`,
                      },
                    ]}
                  />
                )}

                {activeSidebarTab === 'commission' && (
                  <MobileRecordCardList
                    data={commissionData}
                    rowKey={(_, index) => `commission-${index}`}
                    fieldGridClassName="grid grid-cols-[100px_1fr] gap-x-3 gap-y-2 text-xs"
                    fields={(row: any) => [
                      { label: 'Date', value: row.date },
                      { label: 'Rebate', value: row.rebate },
                      { label: 'Sales', value: row.sales },
                      { label: 'Remark', value: row.remark },
                    ]}
                    emptyState={
                      <div className="py-8">
                        <EmptyState message="No Data Found" compact />
                      </div>
                    }
                  />
                )}

                {activeSidebarTab === 'rebate' && (
                  <MobileRecordCardList
                    data={rebateData}
                    rowKey={(_, index) => `rebate-${index}`}
                    fieldGridClassName="grid grid-cols-[100px_1fr] gap-x-3 gap-y-2 text-xs"
                    fields={(row: any) => [
                      { label: 'Date', value: row.date },
                      { label: 'Rebate', value: row.rebate },
                      { label: 'Sales', value: row.sales },
                      { label: 'Remark', value: row.remark },
                    ]}
                    emptyState={
                      <div className="py-8">
                        <EmptyState message="No Data Found" compact />
                      </div>
                    }
                  />
                )}

                {activeSidebarTab === 'promotion' && (
                  <MobileRecordCardList
                    data={promotionData}
                    rowKey={(_, index) => `promotion-${index}`}
                    renderHeader={(row: any) => (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white">{row.promotionTitle}</span>
                        {renderStatusBadge(row.status)}
                      </div>
                    )}
                    fields={(row: any) => [
                      { label: 'Date', value: row.date },
                      { label: 'Bonus Received', value: row.bonusReceived },
                      { label: 'Completed Time', value: row.completedTime || '-', valueClassName: 'text-gray-400 font-medium' },
                    ]}
                    emptyState={
                      <div className="py-8">
                        <EmptyState message="No Data Found" compact />
                      </div>
                    }
                  />
                )}
              </div>

              <div className="hidden md:block overflow-x-auto custom-scrollbar">
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
                      {filteredTransactionData.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center">
                            <EmptyState message="No Data Found" compact />
                          </td>
                        </tr>
                      ) : (
                        filteredTransactionData.map((row, index) => (
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
                        ))
                      )}
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
                            <EmptyState message="No Data Found" compact />
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
                            <EmptyState message="No Data Found" compact />
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
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-[#1a2230]/80 border-b border-white/5">
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Promotion Title</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Bonus Received</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Completed Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {promotionData.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center">
                            <EmptyState message="No Data Found" compact />
                          </td>
                        </tr>
                      ) : (
                        promotionData.map((row, index) => (
                          <tr key={index} className="hover:bg-white/5 transition-all group">
                            <td className="px-6 py-5">
                              <span className="text-sm text-white font-medium">{row.date}</span>
                            </td>
                            <td className="px-6 py-5">
                              <span className="text-sm text-white font-medium">{row.promotionTitle}</span>
                            </td>
                            <td className="px-6 py-5 text-center">
                              <span className={`text-sm font-medium ${
                                row.status === 'Completed' ? 'text-emerald-400' :
                                row.status === 'Pending' ? 'text-yellow-500' :
                                'text-gray-400'
                              }`}>
                                {row.status}
                              </span>
                            </td>
                            <td className="px-6 py-5 text-center">
                              <span className="text-sm text-white font-medium">{row.bonusReceived}</span>
                            </td>
                            <td className="px-6 py-5 text-center">
                              <span className="text-sm text-gray-400 font-medium">{row.completedTime || '-'}</span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}
              </div>
              
              {/* Pagination Placeholder */}
              {(activeSidebarTab === 'transaction' || activeSidebarTab === 'bet') && (
                <div className="hidden md:flex p-4 mt-auto border-t border-white/5 items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {activeSidebarTab === 'transaction' 
                      ? `Showing ${filteredTransactionData.length === 0 ? 0 : 1}-${filteredTransactionData.length} of ${filteredTransactionData.length} records`
                      : `Showing 1-${betHistoryData.length} of ${betHistoryData.length} records`
                    }
                  </span>
                  <div className="flex items-center gap-2">
                     <button className="px-3 py-1 rounded-lg bg-white/5 text-gray-500 text-xs disabled:opacity-50">Prev</button>
                     <button className="px-3 py-1 rounded-lg bg-[#00bc7d]/20 text-[#00bc7d] text-xs font-bold border border-[#00bc7d]/30">1</button>
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

