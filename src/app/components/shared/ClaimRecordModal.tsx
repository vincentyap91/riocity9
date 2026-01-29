import React, { useState, useEffect } from 'react';
import { Wallet, ChevronLeft, Calendar } from 'lucide-react';
import { Input } from '../ui/input';
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

// Mock records per type – table updates when Type dropdown changes
const ALL_CLAIM_RECORDS: ClaimRecordRow[] = [
  // Spin Wheel
  { id: 3910, type: 'spinwheel', campaign: 'Test1', createdDate: '22-12-2025 10:41:53', status: 'Completed', claimedDate: '22-12-2025 14:33:07', reward: 'USD 18' },
  { id: 3909, type: 'spinwheel', campaign: 'Test1', createdDate: '22-12-2025 10:41:53', status: 'Expired', claimedDate: '-', reward: '-' },
  { id: 3440, type: 'spinwheel', campaign: 'Test1', createdDate: '02-12-2025 10:46:04', status: 'Expired', claimedDate: '-', reward: '-' },
  { id: 3439, type: 'spinwheel', campaign: 'Test1', createdDate: '02-12-2025 10:46:04', status: 'Expired', claimedDate: '-', reward: '-' },
  // Voucher Scratch (from screenshot)
  { id: 4415, type: 'scratch', campaign: 'Voucher test 2', createdDate: '23-01-2026 14:18:37', status: 'Available', claimedDate: '-', reward: '-' },
  { id: 4414, type: 'scratch', campaign: 'Voucher test 2', createdDate: '23-01-2026 12:00:00', status: 'Completed', claimedDate: '23-01-2026 15:00:00', reward: 'USD 10' },
  // Prize Box
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
  const [recordStatus, setRecordStatus] = useState('all');
  const [startDate, setStartDate] = useState('01-12-2025');
  const [endDate, setEndDate] = useState('31-12-2025');
  const [activeDatePreset, setActiveDatePreset] = useState('lastMonth');

  // When modal opens, set Type to the page that opened it (Spin Wheel / Voucher Scratch / Prize Box)
  useEffect(() => {
    if (open) {
      setRecordType(initialType);
    }
  }, [open, initialType]);

  const filteredRecords = ALL_CLAIM_RECORDS.filter((r) => r.type === recordType);

  const getStatusClass = (status: RecordStatus) => {
    if (status === 'Completed' || status === 'Available') return 'text-emerald-500 font-bold';
    return 'text-red-400 font-bold';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1a2230] border border-white/5 rounded-2xl p-0 gap-0 max-w-[calc(100vw-2rem)] sm:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-hidden flex flex-col text-white [&>button]:text-white [&>button]:top-4 [&>button]:right-4">
        {/* Header: back + title (Bet Record style) */}
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

        <div className="overflow-y-auto flex-1 p-6 flex flex-col">
          {/* Wallet Balance */}
          <div className="bg-[#0f151f] rounded-xl border border-white/5 p-4 flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
              <Wallet className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <div className="text-gray-400 text-sm font-bold">Wallet Balance:</div>
              <div className="text-emerald-500 text-2xl font-black">{recordWalletBalance}</div>
            </div>
          </div>

          {/* Reward Record title (Bet Record style) */}
          <div className="flex items-center justify-start gap-3 pb-4">
            <span className="text-white font-bold text-base">Reward Record</span>
          </div>

          {/* Type & Status (Bet Record style – label + select) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-white font-bold text-sm">Type</label>
              <Select value={recordType} onValueChange={(v) => setRecordType(v as ClaimRecordType)}>
                <SelectTrigger className="w-full bg-[#0f151f] border-white/10 text-white !h-12 rounded-xl px-4 py-0 data-[size=default]:!h-12 focus:border-emerald-500 focus-visible:ring-emerald-500/20">
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
                <SelectTrigger className="w-full bg-[#0f151f] border-white/10 text-white !h-12 rounded-xl px-4 py-0 data-[size=default]:!h-12 focus:border-emerald-500 focus-visible:ring-emerald-500/20">
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

          {/* Date Selection (Bet Record style) */}
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
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
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
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Quick Filters (Bet Record style) */}
          <div className="flex flex-wrap gap-3 mb-6">
            {QUICK_DATE_OPTIONS.map((preset) => {
              const isActive = activeDatePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => setActiveDatePreset(preset.id)}
                  className={`px-6 h-10 rounded-xl text-sm font-bold transition-all border ${
                    isActive
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                      : 'border-white/5 bg-[#0f151f] text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          {/* Table Container (Bet Record style) */}
          <div className="flex-1 flex flex-col bg-[#0f151f] rounded-2xl border border-white/5 overflow-hidden shadow-inner">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-[#1a2230]/80 border-b border-white/5">
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">ID</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Campaign</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Created Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Claimed Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Reward</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredRecords.map((row) => (
                    <tr key={`${row.type}-${row.id}`} className="hover:bg-white/5 transition-all group">
                      <td className="px-6 py-5">
                        <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{row.id}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm text-gray-300 font-medium">{row.campaign}</span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="text-sm text-orange-400 font-medium">{row.createdDate}</span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className={getStatusClass(row.status)}>{row.status}</span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="text-sm text-white font-medium">{row.claimedDate}</span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="text-sm font-bold text-emerald-400">{row.reward}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination (Bet Record style) */}
            <div className="p-4 mt-auto border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Showing 1-{filteredRecords.length} of {filteredRecords.length} records
              </span>
              <div className="flex items-center gap-2">
                <button type="button" className="px-3 py-1 rounded-lg bg-white/5 text-gray-500 text-xs disabled:opacity-50">Prev</button>
                <button type="button" className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-500 text-xs font-bold border border-emerald-500/30">1</button>
                <button type="button" className="px-3 py-1 rounded-lg bg-white/5 text-gray-500 text-xs disabled:opacity-50">Next</button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
