import React, { useState } from 'react';
import { 
  ArrowLeft, History, Calendar, Wallet, Dices, 
  Users, HandCoins, Megaphone,
  Search, Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const SIDEBAR_ITEMS = [
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

export function HistoryRecord() {
  const navigate = useNavigate();
  const [activeSidebarTab, setActiveSidebarTab] = useState('transaction');
  const [activeTypeTab, setActiveTypeTab] = useState<'deposits' | 'withdrawals'>('deposits');
  const [activeFilter, setActiveFilter] = useState('today');

  const depositData = [
    { id: 'TXN102938', date: '05-03-2023 01:58:00', amount: '50.00', status: 'Approved', description: 'Deposit via Bank Transfer' },
    { id: 'TXN102939', date: '05-03-2023 04:12:00', amount: '120.00', status: 'Approved', description: 'Deposit via USDT' },
  ];

  const withdrawalData = [
    { id: 'TXN202940', date: '05-03-2023 10:20:00', amount: '30.00', status: 'Pending', description: 'Withdrawal to Bank' },
    { id: 'TXN202941', date: '04-03-2023 15:45:00', amount: '200.00', status: 'Rejected', description: 'Withdrawal to USDT' },
  ];

  const currentData = activeTypeTab === 'deposits' ? depositData : withdrawalData;

  return (
    <div className="min-h-screen w-full relative overflow-hidden font-sans">
      {/* Background from Design */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#042f1f] via-[#031a15] to-[#02040a]"></div>
      
      {/* Decorative Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[10%] w-[60%] h-[60%] bg-[rgba(0,79,59,0.2)] rounded-full blur-[100px]"></div>
        <div className="absolute top-[10%] right-[10%] w-[60%] h-[60%] bg-[rgba(0,96,69,0.2)] rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-[1024px]">
        
        {/* Navigation Header (Settings left) */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute left-0 flex items-center gap-3">
            <button
              onClick={() => navigate('/settings')}
              className="h-10 w-10 rounded-full bg-black/20 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <span className="text-white font-bold text-base">Settings</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* Sidebar Menu */}
          <div className="w-full lg:w-[280px] bg-[#1a2230] rounded-[16px] border border-white/5 p-4 flex flex-col gap-2 shrink-0">
            {SIDEBAR_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSidebarTab(item.id)}
                className={`w-full px-5 py-4 rounded-xl text-sm font-bold text-left transition-all flex items-center gap-4 group ${
                  activeSidebarTab === item.id
                    ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)]'
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
          <div className="flex-1 w-full bg-[#1a2230] rounded-[16px] border border-white/5 p-6 flex flex-col">
            {/* Title inside card (match Profile behavior) */}
            <div className="flex items-center justify-start gap-3 pb-4">
              <div className="h-10 w-10 rounded-xl bg-black/25 border border-white/10 flex items-center justify-center">
                <History className="w-5 h-5 text-white/90" />
              </div>
              <span className="text-white font-bold text-base">Transaction History</span>
            </div>
            
            {/* Top Controls: Tabs */}
            <div className="flex flex-col md:flex-row items-center justify-start gap-6 mb-6">
              {/* Deposits/Withdrawals Tabs */}
              <div className="w-full max-w-[320px] flex bg-[#0f151f] p-1 rounded-xl border border-white/5">
                <button
                  onClick={() => setActiveTypeTab('deposits')}
                  className={`flex-1 h-10 rounded-lg text-xs font-bold transition-all ${
                    activeTypeTab === 'deposits'
                      ? 'bg-emerald-500 text-black shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Deposits
                </button>
                <button
                  onClick={() => setActiveTypeTab('withdrawals')}
                  className={`flex-1 h-10 rounded-lg text-xs font-bold transition-all ${
                    activeTypeTab === 'withdrawals'
                      ? 'bg-emerald-500 text-black shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Withdrawals
                </button>
              </div>
            </div>

            {/* Date Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-white font-bold text-sm">Start Date</label>
                <div className="relative group">
                  <Input
                    type="text"
                    defaultValue="01/14/2026"
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
                    defaultValue="01/14/2026"
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

            {/* History Table Container */}
            <div className="flex-1 flex flex-col bg-[#0f151f] rounded-2xl border border-white/5 overflow-hidden shadow-inner">
              <div className="overflow-x-auto custom-scrollbar">
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
                            <span className="text-[10px] font-mono text-gray-500">{row.id}</span>
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
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
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
              </div>
              
              {/* Pagination Placeholder */}
              <div className="p-4 mt-auto border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-gray-500">Showing 1-2 of 2 records</span>
                <div className="flex items-center gap-2">
                   <button className="px-3 py-1 rounded-lg bg-white/5 text-gray-500 text-xs disabled:opacity-50">Prev</button>
                   <button className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-500 text-xs font-bold border border-emerald-500/30">1</button>
                   <button className="px-3 py-1 rounded-lg bg-white/5 text-gray-500 text-xs disabled:opacity-50">Next</button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
