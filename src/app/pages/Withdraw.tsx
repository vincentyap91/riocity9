import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  ChevronDown,
  Banknote, 
  Wallet,
  CreditCard,
  Ticket,
  CheckCircle2,
  Lock,
  Zap,
  Info
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { MOBILE, PRIMARY_CTA_CLASS } from '../config/themeTokens';
import { SegmentTabs, type SegmentTabsItem } from '../components/shared/SegmentTabs';
import { sanitizeTextInput } from '../utils/security';
import maybankLogo from '@/assets/maybank.png';
import rhbLogo from '@/assets/rhb.png';
import jazzcashLogo from '@/assets/jzcash.png';
import usdtLogo from '@/assets/usdt.png';

// Mock Data for Withdraw Methods
const POPULAR_METHODS = [
  {
    id: 'maybank',
    name: 'Maybank',
    limit: '1-10K',
    bg: 'bg-[#ffc800]', // Yellow
    text: 'text-black',
    icon: Banknote,
    logo: maybankLogo,
    type: 'Bank Transfer'
  },
  {
    id: 'jazzcash',
    name: 'JazzCash',
    limit: '2-60K',
    bg: 'bg-[#ed2327]', // Red
    text: 'text-white',
    icon: Wallet,
    logo: jazzcashLogo,
    type: 'E-Wallet'
  },
  {
    id: 'rhb',
    name: 'RHB',
    limit: '2-60K',
    bg: 'bg-[#2b6cb0]', // Blue
    text: 'text-white',
    icon: Banknote,
    logo: rhbLogo,
    type: 'Bank Transfer'
  },
  {
    id: 'usdt',
    name: 'USDT',
    limit: '3-40K',
    bg: 'bg-[#00b14f]', // Green
    text: 'text-white',
    icon: CreditCard, // Using generic card icon for USDT
    logo: usdtLogo,
    type: 'Crypto'
  },
];

const OTHER_METHODS = [
  {
    id: 'ewallet',
    name: 'E-Wallet',
    category: 'Verified',
    processTime: '17 min',
    limit: '1947.9 +619',
    badgeColor: 'text-[#00bc7d] bg-[#00bc7d]/10',
    icon: Wallet
  },
  {
    id: 'rhb-instant',
    name: 'RHB',
    category: 'Instant',
    processTime: '15 min',
    limit: '0 - 10.73 ml',
    badgeColor: 'text-[#00bc7d] bg-[#00bc7d]/10',
    icon: Banknote
  },
  {
    id: 'crypto',
    name: 'Cryptocurrency',
    category: 'Manual',
    processTime: '10 min',
    limit: '0 - 10.22 ml',
    badgeColor: 'text-gray-400 bg-gray-400/10',
    icon: Lock
  },
  {
    id: 'marspay',
    name: 'MarsPay',
    category: 'Instant',
    processTime: '20 min',
    limit: '111.1 - 10.2 ml',
    badgeColor: 'text-orange-400 bg-orange-400/10',
    isHot: true, 
    icon: Ticket
  },
  {
    id: 'bdpay',
    name: 'BD Pay',
    category: 'Instant',
    processTime: '11 min',
    limit: '1947.5 - 15.13 ml',
    badgeColor: 'text-[#00bc7d] bg-[#00bc7d]/10',
    icon: CheckCircle2
  }
];
const WITHDRAW_TAB_VALUES = ['deposit', 'withdrawal'] as const;
type WithdrawTabValue = (typeof WITHDRAW_TAB_VALUES)[number];

function normalizeWithdrawTab(value: string | null | undefined): WithdrawTabValue {
  const normalized = (value || '').trim().toLowerCase();
  return WITHDRAW_TAB_VALUES.includes(normalized as WithdrawTabValue) ? (normalized as WithdrawTabValue) : 'withdrawal';
}

export function Withdraw() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useLanguage();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null);
  const [pauseAutoAdvance, setPauseAutoAdvance] = useState(false);
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdrawal'>('withdrawal');
  
  // Step 2 Form State
  const [amount, setAmount] = useState<string>('100');
  const [bankName, setBankName] = useState('');
  const [accountName, setAccountName] = useState('RIO PAYMENTS SDN BHD');
  const [accountNumber, setAccountNumber] = useState('88779897778899');
  const [referenceId, setReferenceId] = useState('');

  const handleTabChange = (tab: 'deposit' | 'withdrawal') => {
    setActiveTab(tab);
    if (tab === 'deposit') {
      navigate('/deposit?tab=deposit');
      return;
    }
    const next = new URLSearchParams(searchParams);
    next.set('tab', 'withdrawal');
    setSearchParams(next);
  };

  const handleMethodSelect = (id: string) => {
    setPauseAutoAdvance(false);
    setSelectedMethodId(id);
  };

  const handleBack = () => {
    if (step === 1) navigate(-1);
    else {
      setPauseAutoAdvance(true);
      setStep(1);
    }
  };

  const getSelectedMethod = () => {
    return [...POPULAR_METHODS, ...OTHER_METHODS].find(m => m.id === selectedMethodId);
  };

  const selectedMethod = getSelectedMethod();
  const selectedMethodType = selectedMethod && 'type' in selectedMethod ? selectedMethod.type : 'Bank Transfer';

  React.useEffect(() => {
    const tab = normalizeWithdrawTab(searchParams.get('tab'));
    if (tab === 'deposit') {
      navigate('/deposit?tab=deposit', { replace: true });
      return;
    }
    const normalizedTab: 'withdrawal' = 'withdrawal';
    if (searchParams.get('tab') !== normalizedTab) {
      const next = new URLSearchParams(searchParams);
      next.set('tab', normalizedTab);
      setSearchParams(next, { replace: true });
    }
    setActiveTab(normalizedTab);
  }, [navigate, searchParams, setSearchParams]);

  React.useEffect(() => {
    if (step !== 1 || pauseAutoAdvance) {
      return;
    }
    if (selectedMethodId) {
      setStep(2);
    }
  }, [step, pauseAutoAdvance, selectedMethodId]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans text-white relative bg-[#0a0f19] overflow-x-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[rgba(0,79,59,0.3)] rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[rgba(0,79,59,0.3)] rounded-full blur-[150px]"></div>
      </div>

      {/* Main Wrapper (header outside card, like screenshot) */}
      <div className="relative z-10 w-full max-w-lg">
        {/* Top Header (outside card) - gap below for inner pages with back button */}
        <div className={`flex items-center ${MOBILE.gapSm} ${MOBILE.headerMb} px-2`}>
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
          <span className="text-white font-bold text-base">{t("settings")}</span>
        </div>

        {/* Main Card */}
        <div className="bg-[#1a2230] border border-white/5 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
          {/* Card Header */}
          <div className={`${MOBILE.cardPadding} pb-4 shrink-0 bg-[#1a2230]`}>
            {step === 1 ? (
              <SegmentTabs
                items={[
                  { id: 'deposit', label: t('deposit'), icon: Banknote },
                  { id: 'withdrawal', label: t('withdrawal'), icon: Wallet },
                ] as SegmentTabsItem[]}
                activeId={activeTab}
                onSelect={(id) => handleTabChange(id as 'deposit' | 'withdrawal')}
                className="!px-1 !pb-0"
                maxWidth="max-w-[313px]"
              />
            ) : (
              <div className="flex items-center justify-center">
                <h1 className="text-2xl font-black text-white">{t("confirmWithdraw")}</h1>
              </div>
            )}
          </div>

          {/* Content Area */}
          <div className={`${MOBILE.cardPadding} pt-0`}>
          
          {/* STEP 1: SELECTION */}
          {step === 1 && (
            <div className="space-y-6">
                {/* Popular Methods Grid */}
                <div>
                    <h3 className="text-sm font-bold text-gray-300 mb-3">{t("popularRecentMethods")}</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {POPULAR_METHODS.map((method) => {
                            const isSelected = selectedMethodId === method.id;
                            return (
                                <button
                                    key={method.id}
                                    onClick={() => handleMethodSelect(method.id)}
                                    aria-pressed={isSelected}
                                    className={`relative overflow-hidden rounded-xl p-3 text-left border transform transition-all duration-200 ${
                                      isSelected
                                        ? 'border-white/90 ring-2 ring-emerald-400/90 shadow-[0_0_0_2px_rgba(16,185,129,0.35),0_18px_35px_-12px_rgba(16,185,129,0.75)] scale-[1.02]'
                                        : 'border-transparent hover:border-emerald-500/50 hover:shadow-[0_0_12px_rgba(16,185,129,0.12)]'
                                    } ${method.bg}`}
                                >
                                    {isSelected && (
                                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/70 border border-white/40 flex items-center justify-center z-20">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                                      </div>
                                    )}
                                    <div className="relative z-10 flex flex-col h-full justify-between min-h-[80px]">
                                        <div className={`flex items-start justify-between ${method.text}`}>
                                            {method.logo ? (
                                              <img src={method.logo} alt={method.name} className="w-6 h-6 object-contain" />
                                            ) : (
                                              <method.icon className="w-6 h-6 opacity-80" />
                                            )}
                                            <span className="font-bold text-sm">{method.name}</span>
                                        </div>
                                        <div className={`text-xs font-medium opacity-80 ${method.text} mt-2`}>
                                            {method.limit}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Other Methods List */}
                <div>
                    <h3 className="text-sm font-bold text-gray-300 mb-3">{t("otherMethods")}</h3>
                    <div className="space-y-2">
                        {OTHER_METHODS.map(method => (
                            <button 
                                key={method.id}
                                onClick={() => handleMethodSelect(method.id)}
                                className={`w-full group rounded-xl p-4 transition-all flex items-center justify-between border ${
                                  selectedMethodId === method.id
                                    ? method.isHot
                                      ? 'border-red-500/50 bg-red-500/10 shadow-[0_0_12px_rgba(239,68,68,0.12)]'
                                      : 'border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_12px_rgba(16,185,129,0.12)]'
                                    : method.isHot
                                      ? 'border-red-500/30 bg-gradient-to-r from-red-900/20 to-transparent hover:border-red-500/50 hover:bg-red-500/10 hover:shadow-[0_0_12px_rgba(239,68,68,0.12)]'
                                      : 'border-white/10 bg-[#0f151f] hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:shadow-[0_0_12px_rgba(16,185,129,0.12)]'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg ${method.isHot ? 'bg-red-600/70 border-red-500/30' : 'bg-[#1a2230] border-white/10'} flex items-center justify-center text-white border`}>
                                        <method.icon className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-white text-sm">{method.name}</span>
                                            <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${method.badgeColor}`}>
                                                {method.category}
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-0.5">
                                            {t("processTime")} <span className="text-gray-300">{method.processTime}</span>
                                        </div>
                                        <div className="text-xs text-gray-600 font-mono">
                                            {method.limit}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                     <ChevronRight className={`w-5 h-5 shrink-0 transition-colors ${selectedMethodId === method.id ? 'text-emerald-400' : 'text-gray-500 group-hover:text-emerald-400'}`} />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

            </div>
          )}

          {/* STEP 2: CONFIRMATION FORM */}
          {step === 2 && selectedMethod && (
            <div className="space-y-6 animate-in slide-in-from-right-5 fade-in duration-300">
                
                {/* Selected Method Display */}
                <div className="bg-[#131b29] border border-white/5 rounded-xl p-4 flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg ${'bg' in selectedMethod ? selectedMethod.bg : 'bg-[#1a2230]'} flex items-center justify-center text-white border border-white/10 shrink-0`}>
                        {'logo' in selectedMethod && selectedMethod.logo ? (
                          <img src={selectedMethod.logo} alt={selectedMethod.name} className="w-6 h-6 object-contain" />
                        ) : (
                          <selectedMethod.icon className={`w-5 h-5 ${'text' in selectedMethod ? selectedMethod.text : 'text-white'}`} />
                        )}
                    </div>
                    <div className="flex-1">
                        <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">{t("paymentMethod")}</div>
                        <div className="text-sm font-bold text-white">{selectedMethodType}</div>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-400 pl-1">{t("bankName")}</label>
                        <div className="relative">
                            <select 
                                value={bankName}
                                onChange={(e) => setBankName(sanitizeTextInput(e.target.value))}
                                className="w-full bg-[#0f151f] border border-white/10 rounded-xl px-4 pr-10 py-3.5 text-white focus:outline-none focus:border-[#00bc7d] transition-colors appearance-none cursor-pointer"
                            >
                                <option value="" disabled>{t("pleaseSelectBank")}</option>
                                <option value="maybank">Maybank</option>
                                <option value="cimb">CIMB Bank</option>
                                <option value="public">Public Bank</option>
                                <option value="rhb">RHB Bank</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-400 pl-1">{t("accountName")}</label>
                        <input 
                            type="text"
                            value={accountName}
                            onChange={(e) => setAccountName(sanitizeTextInput(e.target.value))}
                            className="w-full bg-[#0f151f] border border-white/10 rounded-xl px-4 py-3.5 text-white font-bold focus:outline-none focus:border-[#00bc7d] transition-colors"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-400 pl-1">{t("accountNumber")}</label>
                        <input 
                            type="text"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(sanitizeTextInput(e.target.value))}
                            className="w-full bg-[#0f151f] border border-white/10 rounded-xl px-4 py-3.5 text-white font-bold tracking-wide focus:outline-none focus:border-[#00bc7d] transition-colors"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-400 pl-1">{t("referenceOptional")}</label>
                        <input 
                            type="text"
                            value={referenceId}
                            onChange={(e) => setReferenceId(sanitizeTextInput(e.target.value))}
                            placeholder={t("enterReferenceNumber")}
                            className="w-full bg-[#0f151f] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#00bc7d] transition-colors placeholder:text-gray-600"
                        />
                    </div>
                </div>

                {/* Amount Section */}
                <div className="bg-[#0f151f] border border-white/10 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-300">{t("withdrawAmountLabel")}</span>
                    </div>

                    {/* Input */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <span className="text-gray-500 font-bold">MYR</span>
                        </div>
                        <input 
                            type="number"
                            value={amount}
                            onChange={(e) => {
                              // Only allow numbers and decimal point
                              const sanitized = e.target.value.replace(/[^0-9.]/g, '');
                              // Prevent multiple decimal points
                              const parts = sanitized.split('.');
                              const finalValue = parts.length > 2 
                                ? parts[0] + '.' + parts.slice(1).join('')
                                : sanitized;
                              setAmount(finalValue);
                            }}
                            placeholder="0.00"
                            className="w-full bg-[#0f151f] border border-white/10 rounded-xl py-4 pl-16 pr-4 text-2xl font-black text-white focus:outline-none focus:border-[#00bc7d] transition-colors placeholder:text-gray-700"
                        />
                    </div>

                    {/* Pills */}
                    <div className="grid grid-cols-3 gap-3">
                        <button onClick={() => setAmount('30')} className="relative border border-white/10 hover:border-[#00bc7d]/50 hover:bg-[#00bc7d]/10 rounded-xl p-3 flex flex-col items-center gap-1 transition-all group bg-[#1a2230]">
                            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#0f151f] text-blue-400 text-xs font-bold px-2 py-0.5 rounded border border-blue-500/30">Min</span>
                            <span className="text-xs text-gray-500 group-hover:text-emerald-400">MYR</span>
                            <span className="font-bold text-white">30</span>
                        </button>
                        <button onClick={() => setAmount('100')} className="relative border-2 border-white/80 hover:border-emerald-400 bg-white/5 rounded-xl p-3 flex flex-col items-center gap-1 transition-all group">
                            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded shadow-lg">Hot</span>
                            <span className="text-xs text-gray-400 group-hover:text-emerald-400">MYR</span>
                            <span className="font-bold text-white text-lg">100</span>
                        </button>
                        <button onClick={() => setAmount('1000')} className="relative border border-white/10 hover:border-[#00bc7d]/50 hover:bg-[#00bc7d]/10 rounded-xl p-3 flex flex-col items-center gap-1 transition-all group bg-[#1a2230]">
                            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#0f151f] text-blue-400 text-xs font-bold px-2 py-0.5 rounded border border-blue-500/30">Max</span>
                            <span className="text-xs text-gray-500 group-hover:text-emerald-400">MYR</span>
                            <span className="font-bold text-white">1,000</span>
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4">
                    <Button 
                        variant="outline" 
                        onClick={handleBack}
                        className="h-12 border-white/10 hover:bg-white/5 text-gray-300 hover:text-white rounded-xl bg-[#02040a] text-base font-bold"
                    >
                        {t("back")}
                    </Button>
                    <Button 
                        className={`h-12 rounded-xl text-base transition-all ${PRIMARY_CTA_CLASS}`}
                    >
                        {t("submit")}
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
