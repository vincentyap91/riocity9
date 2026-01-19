import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  Info, 
  Smartphone, 
  Banknote, 
  QrCode, 
  Copy, 
  Upload, 
  ShieldCheck, 
  MessageSquare,
  Ticket,
  Search,
  Wallet,
  Clock,
  Headphones,
  CheckCircle2,
  Lock,
  Zap,
  DollarSign
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

// Mock Data for Payment Methods - Enhanced for Visual Variety
const POPULAR_METHODS = [
  {
    id: 'maybank',
    name: 'Maybank',
    limit: '1-10K',
    bg: 'bg-[#ffc800]', // Yellowish
    text: 'text-black',
    icon: Banknote
  },
  {
    id: 'rhb-red',
    name: 'RHB',
    limit: '2-60K',
    bg: 'bg-[#d63447]', // Red
    text: 'text-white',
    icon: Banknote
  },
  {
    id: 'rhb-blue',
    name: 'RHB',
    limit: '2-60K',
    bg: 'bg-[#2b6cb0]', // Blue
    text: 'text-white',
    icon: Banknote
  },
  {
    id: 'grabpay',
    name: 'GrabPay',
    limit: '3-40K',
    bg: 'bg-[#00b14f]', // Green
    text: 'text-white',
    icon: Smartphone
  },
];

const OTHER_METHODS = [
  {
    id: 'ewallet',
    name: 'E-Wallet',
    category: 'Verified',
    processTime: '17 min',
    limit: '1947.9 +619',
    status: 'success',
    badgeColor: 'text-emerald-400 bg-emerald-400/10',
    icon: Wallet
  },
  {
    id: 'rhb-instant',
    name: 'RHB',
    category: 'Instant',
    processTime: '15 min',
    limit: '0 - 10.73 ml',
    status: 'success',
    badgeColor: 'text-emerald-400 bg-emerald-400/10',
    icon: Banknote
  },
  {
    id: 'crypto',
    name: 'Cryptocurrency',
    category: 'Manual',
    processTime: '10 min',
    limit: '0 - 10.22 ml',
    status: 'default',
    badgeColor: 'text-gray-400 bg-gray-400/10',
    icon: Lock
  },
  {
    id: 'marspay',
    name: 'MarsPay',
    category: 'Instant',
    processTime: '20 min',
    limit: '111.1 - 10.2 ml',
    status: 'warning',
    badgeColor: 'text-orange-400 bg-orange-400/10',
    isHot: true, // Red background one
    icon: Ticket
  },
  {
    id: 'bdpay',
    name: 'BD Pay',
    category: 'Instant',
    processTime: '11 min',
    limit: '1947.5 - 15.13 ml',
    status: 'success',
    badgeColor: 'text-emerald-400 bg-emerald-400/10',
    icon: CheckCircle2
  }
];

const FILTERS = [
  { id: 'fastest', label: 'Fastest', icon: Zap },
  { id: 'nofees', label: 'No Fees', icon: null },
  { id: 'crypto', label: 'Crypto', icon: Lock },
  { id: 'others', label: 'Others', icon: null },
];

export function Deposit() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1=Select, 2=Amount, 3=Transfer
  const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [referenceId, setReferenceId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdrawal'>('deposit');

  const handleTabChange = (tab: 'deposit' | 'withdrawal') => {
    setActiveTab(tab);
    if (tab === 'withdrawal') {
      navigate('/withdraw');
    }
  };

  const handleMethodSelect = (id: string) => {
    setSelectedMethodId(id);
    // In the new design, selecting usually just highlights, then click 'Continue'
    // But for better UX flow we can auto-highlight
  };

  const handleContinue = () => {
    if (selectedMethodId) {
      setStep(2);
    }
  };

  const handleAmountSubmit = () => {
    if (!amount) return;
    setStep(3);
  };

  const handleBack = () => {
    if (step === 1) navigate(-1);
    else setStep((prev) => (prev - 1) as 1 | 2);
  };

  const getSelectedMethod = () => {
    return [...POPULAR_METHODS, ...OTHER_METHODS].find(m => m.id === selectedMethodId);
  };

  const selectedMethod = getSelectedMethod();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans text-white relative bg-[#0a0f19] overflow-x-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[rgba(0,79,59,0.3)] rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[rgba(0,79,59,0.3)] rounded-full blur-[150px]"></div>
      </div>

      {/* Main Wrapper */}
      <div className="relative z-10 w-full max-w-lg">
        {/* Top Header (outside card) */}
        <div className="flex items-center gap-3 mb-4 px-2">
          <button
            onClick={() => {
              if (step > 1) handleBack();
              else navigate('/settings');
            }}
            className="h-10 w-10 rounded-full bg-black/20 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            aria-label="Back to Settings"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <span className="text-white font-bold text-base">Settings</span>
        </div>

        {/* Main Card */}
        <div className="bg-[#1a2230] border border-white/5 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
          {/* Card Header */}
          <div className="p-6 pb-4 shrink-0 bg-[#1a2230]">
            {step === 1 ? (
              <div className="flex justify-center">
                <div className="flex bg-[#0f151f] p-1 rounded-xl border border-white/5 w-full max-w-[313px]">
                  <button 
                      onClick={() => handleTabChange('deposit')}
                      className={`flex-1 px-8 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'deposit' ? 'bg-emerald-500 text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                  >
                      <span className="flex items-center justify-center gap-2">
                          <Banknote className="w-4 h-4" />
                          Deposit
                      </span>
                  </button>
                  <button 
                      onClick={() => handleTabChange('withdrawal')}
                      className={`flex-1 px-8 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'withdrawal' ? 'bg-emerald-500 text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                  >
                      <span className="flex items-center justify-center gap-2">
                          <Wallet className="w-4 h-4" />
                          Withdrawal
                      </span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <h1 className="text-xl font-bold text-white">
                  {step === 2 ? 'Deposit Amount' : 'Confirm Deposit'}
                </h1>
              </div>
            )}
          </div>

          {/* Content Area */}
          <div className="p-6 pt-0">
          
          {/* STEP 1: SELECTION */}
          {step === 1 && (
            <div className="space-y-6">
                <div className="text-gray-400 text-sm">Select a reload option from the available options.</div>

                {/* Search & Filters */}
                <div className="space-y-3">
                    <div className="relative">
                        <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                        <input 
                            type="text" 
                            placeholder="Search" 
                            className="w-full bg-[#0f151f] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-gray-600"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    
                    {/* <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                        {FILTERS.map(filter => (
                            <button key={filter.id} className="flex items-center gap-1.5 bg-[#0f151f] border border-white/10 hover:border-emerald-500/50 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 whitespace-nowrap transition-colors">
                                {filter.icon && <filter.icon className="w-3 h-3 text-emerald-500" />}
                                {filter.label}
                            </button>
                        ))}
                    </div> */}
                </div>

                {/* Popular Methods Grid */}
                <div>
                    <h3 className="text-sm font-bold text-gray-300 mb-3">Popular/Recent Methods</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {POPULAR_METHODS.map(method => (
                            <button 
                                key={method.id}
                                onClick={() => handleMethodSelect(method.id)}
                                className={`relative overflow-hidden rounded-xl p-3 text-left transition-all ${selectedMethodId === method.id ? 'ring-2 ring-emerald-500 scale-[0.98]' : 'hover:scale-[0.98]'} ${method.bg}`}
                            >
                                <div className="relative z-10 flex flex-col h-full justify-between min-h-[80px]">
                                    <div className={`flex items-start justify-between ${method.text}`}>
                                        <method.icon className="w-6 h-6 opacity-80" />
                                        <span className="font-bold text-sm">{method.name}</span>
                                    </div>
                                    <div className={`text-xs font-medium opacity-80 ${method.text} mt-2`}>
                                        {method.limit}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Other Methods List */}
                <div>
                    <h3 className="text-sm font-bold text-gray-300 mb-3">Other Methods</h3>
                    <div className="space-y-2">
                        {OTHER_METHODS.map(method => (
                            <button 
                                key={method.id}
                                onClick={() => handleMethodSelect(method.id)}
                                className={`w-full group bg-[#0f151f] border ${method.isHot ? 'border-red-500/30 bg-gradient-to-r from-red-900/20 to-transparent' : 'border-white/5'} ${selectedMethodId === method.id ? 'border-emerald-500 bg-emerald-500/5' : 'hover:border-emerald-500/30'} rounded-xl p-4 transition-all flex items-center justify-between`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg ${method.isHot ? 'bg-red-500' : 'bg-[#1a2230]'} flex items-center justify-center text-white border border-white/10`}>
                                        <method.icon className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-white text-sm">{method.name}</span>
                                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${method.badgeColor}`}>
                                                {method.category}
                                            </span>
                                        </div>
                                        <div className="text-[10px] text-gray-500 mt-0.5">
                                            Process Time: <span className="text-gray-300">{method.processTime}</span>
                                        </div>
                                        <div className="text-[10px] text-gray-600 font-mono">
                                            {method.limit}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                     <ChevronRight className={`w-5 h-5 ${selectedMethodId === method.id ? 'text-emerald-500' : 'text-gray-600'} group-hover:text-emerald-500 transition-colors`} />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer Info & Action */}
                <div className="pt-2 space-y-4">
                    {/* <div className="flex items-center justify-between px-2 py-3 border-t border-white/5">
                        <div className="flex items-center gap-1.5 text-[10px] text-emerald-500 font-bold">
                            <ShieldCheck className="w-3 h-3" />
                            Secure
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-emerald-500 font-bold">
                            <Zap className="w-3 h-3" />
                            Fast Processing
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold">
                            <Headphones className="w-3 h-3" />
                            24/7 Support
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold">
                            <DollarSign className="w-3 h-3" />
                            No Fees
                        </div>
                    </div> */}

                    <Button 
                        onClick={handleContinue}
                        disabled={!selectedMethodId}
                        className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-base rounded-xl shadow-[0px_0px_20px_-5px_rgba(16,185,129,0.4)] transition-all hover:translate-y-[-1px] disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                        Continue to Deposit 
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                </div>
            </div>
          )}

          {/* STEP 2: Amount Input (Existing Logic) */}
          {step === 2 && selectedMethod && (
            <div className="space-y-6 animate-in slide-in-from-right-5 fade-in duration-300">
                {/* Method Display Card */}
                <div className="bg-[#0f151f] border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${'bg' in selectedMethod ? selectedMethod.bg : 'bg-[#1a2230]'} flex items-center justify-center text-white border border-white/10 shadow-lg`}>
                            <selectedMethod.icon className={`w-6 h-6 ${'text' in selectedMethod ? selectedMethod.text : 'text-white'}`} />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-gray-400">Selected Method</div>
                            <div className="text-lg font-bold text-white">{selectedMethod.name}</div>
                        </div>
                    </div>
                    <Button variant="ghost" onClick={() => setStep(1)} className="text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10 h-auto py-1 px-3 text-xs font-bold uppercase tracking-wider">
                        Change
                    </Button>
                </div>

                {/* Existing Step 2 Logic */}
               <div className="bg-[#0f151f] border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                     <span className="text-sm font-bold text-gray-300">Deposit amount</span>
                  </div>

                  {/* Input */}
                  <div className="relative mb-6 group">
                     <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                         <span className="text-gray-500 font-bold">MYR</span>
                     </div>
                     <input 
                         type="number"
                         value={amount}
                         onChange={(e) => setAmount(e.target.value)}
                         placeholder="0.00"
                         className="w-full bg-[#0f151f] border border-white/10 rounded-xl py-4 pl-16 pr-4 text-2xl font-black text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-gray-700"
                     />
                  </div>

                  {/* Pills */}
                  <div className="grid grid-cols-3 gap-3">
                     <button onClick={() => setAmount('30')} className="relative border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 rounded-xl p-3 flex flex-col items-center gap-1 transition-all group bg-[#1a2230]">
                         <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#0f151f] text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-500/30">Min</span>
                         <span className="text-xs text-gray-500 group-hover:text-emerald-400">MYR</span>
                         <span className="font-bold text-white">30</span>
                     </button>
                     <button onClick={() => setAmount('100')} className="relative border-2 border-white/80 hover:border-emerald-400 bg-white/5 rounded-xl p-3 flex flex-col items-center gap-1 transition-all group shadow-[0_0_15px_-5px_rgba(255,255,255,0.2)]">
                         <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg">Hot</span>
                         <span className="text-xs text-gray-400 group-hover:text-emerald-400">MYR</span>
                         <span className="font-bold text-white text-lg">100</span>
                     </button>
                     <button onClick={() => setAmount('1000')} className="relative border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 rounded-xl p-3 flex flex-col items-center gap-1 transition-all group bg-[#1a2230]">
                         <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#0f151f] text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-500/30">Max</span>
                         <span className="text-xs text-gray-500 group-hover:text-emerald-400">MYR</span>
                         <span className="font-bold text-white">1,000</span>
                     </button>
                  </div>
               </div>

               <Button 
                 onClick={handleAmountSubmit}
                 disabled={!amount}
                 className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-base rounded-xl shadow-[0px_10px_15px_-3px_rgba(16,185,129,0.2)] transition-all hover:translate-y-[-1px] disabled:opacity-50 disabled:hover:translate-y-0"
               >
                 Confirm & Deposit
               </Button>
            </div>
          )}

          {/* STEP 3: Transfer Details (Existing Logic) */}
          {step === 3 && selectedMethod && (
             <div className="space-y-6 animate-in slide-in-from-right-5 fade-in duration-300">
                {/* Summary Card */}
                <div className="bg-[#131b29] p-4 rounded-xl border border-white/5 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg ${'bg' in selectedMethod ? selectedMethod.bg : 'bg-[#1a2230]'} flex items-center justify-center text-white border border-white/10`}>
                                <selectedMethod.icon className={`w-5 h-5 ${'text' in selectedMethod ? selectedMethod.text : 'text-white'}`} />
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 font-bold uppercase">Payment Method</div>
                                <div className="text-sm font-bold text-white">{selectedMethod.name}</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-400 font-bold">Deposit Amount</span>
                        <div className="flex items-center gap-1">
                            <span className="text-emerald-500 font-bold text-sm">MYR</span>
                            <span className="text-2xl font-black text-white">{parseFloat(amount).toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl flex flex-col items-center shadow-xl">
                    <div className="bg-blue-400 text-white font-bold px-4 py-1 rounded-full mb-3 text-sm">SCAN ME</div>
                    <div className="border-4 border-[#131b29] p-2 rounded-xl mb-2">
                        <QrCode className="w-40 h-40 text-black" />
                    </div>
                    <button className="text-xs font-bold text-blue-600 hover:underline">Download QR Code</button>
                </div>

                <div className="space-y-3">
                    <div className="bg-[#131b29] p-4 rounded-xl border border-white/5">
                        <div className="text-xs text-gray-500 font-bold uppercase mb-1">Bank Name</div>
                        <div className="text-white font-bold">Public Bank Berhad</div>
                    </div>

                    <div className="bg-[#131b29] p-4 rounded-xl border border-white/5 flex items-center justify-between group">
                        <div>
                            <div className="text-xs text-gray-500 font-bold uppercase mb-1">Account Number</div>
                            <div className="text-white font-bold tracking-wider">88779897778899</div>
                        </div>
                        <button className="p-2 hover:bg-white/10 rounded-lg text-gray-500 group-hover:text-emerald-500 transition-colors">
                            <Copy className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="bg-[#131b29] p-4 rounded-xl border border-white/5 flex items-center justify-between group">
                        <div>
                            <div className="text-xs text-gray-500 font-bold uppercase mb-1">Account Name</div>
                            <div className="text-white font-bold">RIO PAYMENTS SDN BHD</div>
                        </div>
                        <button className="p-2 hover:bg-white/10 rounded-lg text-gray-500 group-hover:text-emerald-500 transition-colors">
                            <Copy className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400">Reference / Transaction ID (Optional)</label>
                    <input 
                        type="text"
                        value={referenceId}
                        onChange={(e) => setReferenceId(e.target.value)}
                        className="w-full bg-[#0f151f] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-gray-700"
                        placeholder="Enter reference number"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400">Upload Receipt *</label>
                    <div className="border-2 border-dashed border-white/10 hover:border-emerald-500/50 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-[#0f151f]/50 hover:bg-[#0f151f]">
                        <Upload className="w-8 h-8 text-gray-500 mb-2" />
                        <span className="text-sm font-bold text-gray-300">Tap to upload file</span>
                        <span className="text-xs text-gray-600 mt-1">Supported: JPG, PNG, PDF</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                    <Button 
                        variant="outline" 
                        onClick={() => setStep(2)}
                        className="h-12 border-white/10 hover:bg-white/5 text-gray-300 hover:text-white rounded-xl"
                    >
                        Back
                    </Button>
                    <Button 
                        className="h-12 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl shadow-[0px_10px_15px_-3px_rgba(16,185,129,0.2)]"
                    >
                        Submit
                    </Button>
                </div>
             </div>
          )}

          </div>
        </div>
      </div>
    </div>
  );
}
