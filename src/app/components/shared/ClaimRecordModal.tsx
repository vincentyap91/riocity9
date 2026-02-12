import React, { useState, useEffect } from 'react';
import { Wallet, ChevronLeft } from 'lucide-react';
import { DatePicker } from '../ui/DatePicker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Dialog,
  DialogContent,
} from '../ui/dialog';
import { Sheet, SheetContent } from '../ui/sheet';
import { FilterTabs } from './FilterTabs';
import { HistoryTableSection, type HistoryColumn } from './HistoryTableSection';
import { MobileFilterBar } from './MobileFilterBar';
import { MobileRecordCardList } from './MobileRecordCardList';

export type ClaimRecordType = 'spinwheel' | 'scratch' | 'prize';

type RecordStatus = 'Completed' | 'Expired' | 'Available';

interface ClaimRecordRow {
  id: number;
  type: ClaimRecordType;
  campaign: string;
  createdDate: string;
  status: RecordStatus;
  claimedDate: string;
  reward: string;
}

const ALL_CLAIM_RECORDS: ClaimRecordRow[] = [
  { id: 3910, type: 'spinwheel', campaign: 'Test1', createdDate: '22-12-2025 10:41:53', status: 'Completed', claimedDate: '22-12-2025 14:33:07', reward: 'USD 18' },
  { id: 3909, type: 'spinwheel', campaign: 'Test1', createdDate: '22-12-2025 10:41:53', status: 'Expired', claimedDate: '-', reward: '-' },
  { id: 3440, type: 'spinwheel', campaign: 'Test1', createdDate: '02-12-2025 10:46:04', status: 'Expired', claimedDate: '-', reward: '-' },
  { id: 3439, type: 'spinwheel', campaign: 'Test1', createdDate: '02-12-2025 10:46:04', status: 'Expired', claimedDate: '-', reward: '-' },
  { id: 4415, type: 'scratch', campaign: 'Voucher test 2', createdDate: '23-01-2026 14:18:37', status: 'Available', claimedDate: '-', reward: '-' },
  { id: 4414, type: 'scratch', campaign: 'Voucher test 2', createdDate: '23-01-2026 12:00:00', status: 'Completed', claimedDate: '23-01-2026 15:00:00', reward: 'USD 10' },
  { id: 4416, type: 'prize', campaign: 'VW Shiro Test', createdDate: '20-01-2026 09:00:00', status: 'Completed', claimedDate: '20-01-2026 10:30:00', reward: 'USD 25' },
  { id: 3912, type: 'prize', campaign: 'VW Shiro Test', createdDate: '15-01-2026 08:00:00', status: 'Expired', claimedDate: '-', reward: '-' },
];

const QUICK_DATE_OPTIONS = [
  { id: 'today', label: 'Today' },
  { id: 'yesterday', label: 'Yesterday' },
  { id: 'thisWeek', label: 'This Week' },
  { id: 'lastWeek', label: 'Last Week' },
  { id: 'thisMonth', label: 'This Month' },
  { id: 'lastMonth', label: 'Last Month' },
];

const CLAIM_DEFAULTS = {
  status: 'all',
  startDate: '01-12-2025',
  endDate: '31-12-2025',
  preset: 'lastMonth',
} as const;

export interface ClaimRecordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialType?: ClaimRecordType;
}

export function ClaimRecordModal({
  open,
  onOpenChange,
  initialType = 'spinwheel',
}: ClaimRecordModalProps) {
  const [recordWalletBalance] = useState('966.24');
  const [recordType, setRecordType] = useState<ClaimRecordType>(initialType);
  const [recordStatus, setRecordStatus] = useState(CLAIM_DEFAULTS.status);
  const [startDate, setStartDate] = useState(CLAIM_DEFAULTS.startDate);
  const [endDate, setEndDate] = useState(CLAIM_DEFAULTS.endDate);
  const [activeDatePreset, setActiveDatePreset] = useState(CLAIM_DEFAULTS.preset);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setRecordType(initialType);
    }
  }, [open, initialType]);

  const filteredRecords = ALL_CLAIM_RECORDS.filter((record) => {
    if (record.type !== recordType) return false;
    if (recordStatus !== CLAIM_DEFAULTS.status && record.status.toLowerCase() !== recordStatus) return false;
    return true;
  });

  const typeLabelMap: Record<ClaimRecordType, string> = {
    spinwheel: 'Spin Wheel',
    scratch: 'Voucher Scratch',
    prize: 'Prize Box',
  };
  const statusLabelMap: Record<string, string> = {
    all: 'All',
    completed: 'Completed',
    expired: 'Expired',
    available: 'Available',
  };
  const activeDatePresetLabel =
    QUICK_DATE_OPTIONS.find((option) => option.id === activeDatePreset)?.label ?? '';
  const activeFilterChips = [
    `Type: ${typeLabelMap[recordType]}`,
    `Status: ${statusLabelMap[recordStatus] ?? 'All'}`,
    startDate ? `Start: ${startDate}` : '',
    endDate ? `End: ${endDate}` : '',
    activeDatePresetLabel ? `Range: ${activeDatePresetLabel}` : '',
  ].filter(Boolean);
  const activeFilterCount = [
    recordType !== initialType,
    recordStatus !== CLAIM_DEFAULTS.status,
    startDate !== CLAIM_DEFAULTS.startDate,
    endDate !== CLAIM_DEFAULTS.endDate,
    activeDatePreset !== CLAIM_DEFAULTS.preset,
  ].filter(Boolean).length;
  const hasActiveFilters = activeFilterCount > 0;
  const clearAllFilters = () => {
    setRecordType(initialType);
    setRecordStatus(CLAIM_DEFAULTS.status);
    setStartDate(CLAIM_DEFAULTS.startDate);
    setEndDate(CLAIM_DEFAULTS.endDate);
    setActiveDatePreset(CLAIM_DEFAULTS.preset);
  };

  const getStatusClass = (status: RecordStatus) => {
    if (status === 'Completed' || status === 'Available') return 'text-emerald-500 font-bold';
    return 'text-red-400 font-bold';
  };
  const getStatusBadgeClass = (status: RecordStatus) => {
    if (status === 'Completed' || status === 'Available') {
      return 'bg-emerald-500/15 text-emerald-500 border-emerald-500/25';
    }
    return 'bg-red-500/15 text-red-400 border-red-500/25';
  };

  const filterInputs = (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 md:mb-6">
        <div className="space-y-2">
          <label className="text-white font-bold text-sm">Type</label>
          <Select value={recordType} onValueChange={(value) => setRecordType(value as ClaimRecordType)}>
            <SelectTrigger className="w-full bg-[#0f151f] border-white/10 text-white !h-12 rounded-xl px-4 py-0 data-[size=default]:!h-12 focus:border-[#00bc7d] focus-visible:ring-[#00bc7d]/20">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a2230] border-white/10">
              <SelectItem value="spinwheel" className="text-white focus:bg-emerald-500/20">Spin Wheel</SelectItem>
              <SelectItem value="scratch" className="text-white focus:bg-emerald-500/20">Voucher Scratch</SelectItem>
              <SelectItem value="prize" className="text-white focus:bg-emerald-500/20">Prize Box</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-white font-bold text-sm">Status</label>
          <Select value={recordStatus} onValueChange={setRecordStatus}>
            <SelectTrigger className="w-full bg-[#0f151f] border-white/10 text-white !h-12 rounded-xl px-4 py-0 data-[size=default]:!h-12 focus:border-[#00bc7d] focus-visible:ring-[#00bc7d]/20">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a2230] border-white/10">
              <SelectItem value="all" className="text-white focus:bg-emerald-500/20">All</SelectItem>
              <SelectItem value="completed" className="text-white focus:bg-emerald-500/20">Completed</SelectItem>
              <SelectItem value="expired" className="text-white focus:bg-emerald-500/20">Expired</SelectItem>
              <SelectItem value="available" className="text-white focus:bg-emerald-500/20">Available</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 md:mb-6">
        <div className="space-y-2">
          <label className="text-white font-bold text-sm">Start Date</label>
          <div className="relative group">
            <DatePicker
              value={startDate}
              onChange={(nextValue) => setStartDate(String(nextValue))}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-white font-bold text-sm">End Date</label>
          <div className="relative group">
            <DatePicker
              value={endDate}
              onChange={(nextValue) => setEndDate(String(nextValue))}
            />
          </div>
        </div>
      </div>
    </>
  );

  const historyColumns: HistoryColumn<ClaimRecordRow>[] = [
    {
      key: 'id',
      label: 'ID',
      render: (row) => (
        <span className="text-sm font-bold text-white group-hover:text-[#00bc7d] transition-colors">{row.id}</span>
      ),
    },
    {
      key: 'campaign',
      label: 'Campaign',
      render: (row) => <span className="text-sm text-gray-300 font-medium">{row.campaign}</span>,
    },
    {
      key: 'createdDate',
      label: 'Created Date',
      align: 'center',
      render: (row) => <span className="text-sm text-orange-400 font-medium">{row.createdDate}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      align: 'center',
      render: (row) => <span className={getStatusClass(row.status)}>{row.status}</span>,
    },
    {
      key: 'claimedDate',
      label: 'Claimed Date',
      align: 'center',
      render: (row) => <span className="text-sm text-white font-medium">{row.claimedDate}</span>,
    },
    {
      key: 'reward',
      label: 'Reward',
      align: 'center',
      render: (row) => <span className="text-sm font-bold text-[#00bc7d]">{row.reward}</span>,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1a2230] border border-white/5 rounded-2xl p-0 gap-0 max-w-[calc(100vw-2rem)] sm:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-hidden flex flex-col text-white [&>button]:text-white [&>button]:top-4 [&>button]:right-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenChange(false)}
              className="h-10 w-10 rounded-full bg-black/20 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Back"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-black/25 border border-white/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-white/90" />
              </div>
              <span className="text-white font-bold text-base">Claim Record</span>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto custom-scrollbar flex-1 p-6 flex flex-col">
          <div className="bg-[#0f151f] rounded-xl border border-white/5 p-4 flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
              <Wallet className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <div className="text-gray-400 text-sm font-bold">Wallet Balance:</div>
              <div className="text-emerald-500 text-2xl font-black">{recordWalletBalance}</div>
            </div>
          </div>

          <div className="flex items-center justify-start gap-3 pb-4">
            <span className="text-white font-bold text-base">Reward Record</span>
          </div>
          <MobileFilterBar
            onOpenFilters={() => setIsFilterSheetOpen(true)}
            hasActiveFilters={hasActiveFilters}
            activeFilterCount={activeFilterCount}
            chips={activeFilterChips}
            onClearAll={clearAllFilters}
          />

          <div className="hidden md:block">
            {filterInputs}
          </div>

          <div className="mb-6">
            <FilterTabs
              items={QUICK_DATE_OPTIONS}
              activeId={activeDatePreset}
              onSelect={setActiveDatePreset}
              scrollable
              baseButtonClassName="shrink-0 px-4 h-10 rounded-xl text-sm font-bold transition-all border"
              activeClassName="border-[#00bc7d] bg-[#00bc7d]/10 text-[#00bc7d] shadow-[0_0_15px_rgba(0,188,125,0.2)]"
            />
          </div>

          <div className="md:hidden">
            <MobileRecordCardList
              data={filteredRecords}
              rowKey={(row) => `${row.type}-${row.id}`}
              cardClassName="bg-[#0f151f] rounded-2xl border border-white/5 p-4 shadow-inner"
              renderHeader={(row) => (
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold text-sm">#{row.id}</span>
                  <span className={`px-2.5 py-1 rounded-full border text-[11px] font-bold ${getStatusBadgeClass(row.status)}`}>
                    {row.status}
                  </span>
                </div>
              )}
              fields={(row) => [
                { label: 'Campaign', value: row.campaign, valueClassName: 'text-gray-200 font-medium' },
                { label: 'Created Date', value: row.createdDate, valueClassName: 'text-orange-400 font-medium' },
                { label: 'Claimed Date', value: row.claimedDate, valueClassName: 'text-white font-medium' },
                { label: 'Reward', value: row.reward, valueClassName: 'text-[#00bc7d] font-bold' },
              ]}
            />
          </div>

          <div className="hidden md:block">
            <HistoryTableSection
              title=""
              columns={historyColumns}
              data={filteredRecords}
              rowKey={(row) => `${row.type}-${row.id}`}
            />
          </div>
        </div>
      </DialogContent>

      <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
        <SheetContent
          side="bottom"
          className="bg-[#1a2230] border-white/10 rounded-t-2xl p-0 h-auto max-h-[85vh]"
        >
          <div className="p-4 overflow-y-auto custom-scrollbar">
            <div className="pb-3">
              <span className="text-white font-bold text-base">Filter</span>
            </div>
            {filterInputs}
            <button
              type="button"
              onClick={() => setIsFilterSheetOpen(false)}
              className="w-full h-11 rounded-xl bg-[#00bc7d] hover:bg-[#00a870] text-black font-bold"
            >
              Apply
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </Dialog>
  );
}
