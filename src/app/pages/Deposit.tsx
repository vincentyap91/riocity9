import React, { useEffect, useRef, useState } from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  ChevronDown,
  Info, 
  AlertCircle,
  Smartphone, 
  Banknote, 
  QrCode, 
  Copy, 
  Upload, 
  CreditCard,
  ShieldCheck, 
  Ticket,
  Wallet,
  Clock,
  Headphones,
  CheckCircle2,
  Check,
  Lock,
  Zap,
  DollarSign
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { MOBILE, PRIMARY_CTA_CLASS } from '../config/themeTokens';
import { SegmentTabs, type SegmentTabsItem } from '../components/shared/SegmentTabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { sanitizeTextInput, validateReceiptFile } from '../utils/security';
import maybankLogo from '@/assets/maybank.png';
import rhbLogo from '@/assets/rhb.png';
import jazzcashLogo from '@/assets/jzcash.png';
import usdtLogo from '@/assets/usdt.png';

// Mock Data for Payment Methods - Enhanced for Visual Variety
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
    name: 'RHB Bank',
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
    status: 'success',
    badgeColor: 'text-[#00bc7d] bg-[#00bc7d]/10',
    icon: Wallet
  },
  {
    id: 'Bank Transfer',
    name: 'Bank Transfer',
    category: 'Instant',
    processTime: '15 min',
    limit: '0 - 10.73 ml',
    status: 'success',
    badgeColor: 'text-[#00bc7d] bg-[#00bc7d]/10',
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
    badgeColor: 'text-[#00bc7d] bg-[#00bc7d]/10',
    icon: CheckCircle2
  }
];

const FILTERS = [
  { id: 'fastest', label: 'Fastest', icon: Zap },
  { id: 'nofees', label: 'No Fees', icon: null },
  { id: 'crypto', label: 'Crypto', icon: Lock },
  { id: 'others', label: 'Others', icon: null },
];

const DEPOSIT_APPROVAL_COUNTDOWN_SECONDS = 8 * 60 + 6;
const DEPOSIT_TAB_VALUES = ['deposit', 'withdrawal'] as const;
type DepositTabValue = (typeof DEPOSIT_TAB_VALUES)[number];
type BonusOption = {
  id: string;
  label: string;
  rollover: string;
  claim: string;
  minimumDeposit: string;
  percentageBonusReward: string;
  maximumBonus: string;
  gameProvider: string;
};

const BONUS_OPTIONS: BonusOption[] = [
  {
    id: 'welcome-slots-388',
    label: 'Welcome Bonus 388% (Slots)',
    rollover: '38x',
    claim: '1 Only',
    minimumDeposit: '50',
    percentageBonusReward: '388%',
    maximumBonus: '3880',
    gameProvider: 'Pragmatic Play, AdvantPlay, PlayTech Slots',
  },
  {
    id: 'reload-slots-120',
    label: 'Reload Bonus 120% (Slots)',
    rollover: '25x',
    claim: '1 / Day',
    minimumDeposit: '30',
    percentageBonusReward: '120%',
    maximumBonus: '1200',
    gameProvider: 'Pragmatic Play, AdvantPlay, PlayTech Slots',
  },
];

const BANK_TRANSFER_PROVIDERS = [
  'Alliance Bank',
  'AmBank',
  'Bank Islam',
  'CIMB Bank',
  'Maybank',
  'Public Bank',
  'RHB Bank',
];

const EWALLET_PROVIDERS = [
  'Boost',
  'GrabPay',
  "Touch n' Go",
  'ShopeePay',
  'JazzCash',
];

const CRYPTO_PROVIDERS = [
  'USDT',
  'BNB',
  'ETH',
];

function normalizeDepositTab(value: string | null | undefined): DepositTabValue {
  const normalized = (value || '').trim().toLowerCase();
  return DEPOSIT_TAB_VALUES.includes(normalized as DepositTabValue) ? (normalized as DepositTabValue) : 'deposit';
}

function resolveMethodType(method: { id?: string; name?: string; type?: string } | undefined): 'Bank Transfer' | 'E-Wallet' | 'Crypto' {
  if (!method) return 'Bank Transfer';
  if (method.type === 'Bank Transfer' || method.type === 'E-Wallet' || method.type === 'Crypto') {
    return method.type;
  }
  const token = `${method.id ?? ''} ${method.name ?? ''}`.toLowerCase();
  if (token.includes('crypto') || token.includes('usdt')) return 'Crypto';
  if (token.includes('wallet') || token.includes('grabpay') || token.includes('jazzcash')) return 'E-Wallet';
  return 'Bank Transfer';
}

export function Deposit() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useLanguage();
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1=Select, 2=Amount, 3=Transfer
  const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [referenceId, setReferenceId] = useState('');
  const [wantsBonus, setWantsBonus] = useState(false);
  const [selectedBonus, setSelectedBonus] = useState('none');
  const [pauseAutoAdvance, setPauseAutoAdvance] = useState(false);
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdrawal'>('deposit');
  const receiptInputRef = useRef<HTMLInputElement | null>(null);
  const [receiptFileName, setReceiptFileName] = useState<string>('');
  const [receiptError, setReceiptError] = useState<string>('');
  const [showDepositVerificationModal, setShowDepositVerificationModal] = useState(false);
  const [approvalSecondsLeft, setApprovalSecondsLeft] = useState<number | null>(null);
  const isDepositLocked = approvalSecondsLeft !== null && approvalSecondsLeft > 0;
  const normalizedAmount = Number(amount);
  const isValidAmount = Number.isFinite(normalizedAmount) && normalizedAmount > 0;
  const hasValidBonusSelection = !wantsBonus || selectedBonus !== 'none';

  const handleTabChange = (tab: 'deposit' | 'withdrawal') => {
    setActiveTab(tab);
    if (tab === 'withdrawal') {
      navigate('/withdraw?tab=withdrawal');
      return;
    }
    const next = new URLSearchParams(searchParams);
    next.set('tab', 'deposit');
    setSearchParams(next);
  };

  const handleMethodSelect = (id: string) => {
    if (isDepositLocked) {
      return;
    }
    setPauseAutoAdvance(false);
    setSelectedMethodId(id);
    const method = [...POPULAR_METHODS, ...OTHER_METHODS].find((item) => item.id === id);
    const methodType = resolveMethodType(method);
    if (methodType === 'Bank Transfer') {
      if (selectedMethodId === id && selectedProvider && BANK_TRANSFER_PROVIDERS.includes(selectedProvider)) {
        return;
      }
      setSelectedProvider(BANK_TRANSFER_PROVIDERS.includes(method?.name ?? '') ? (method?.name ?? '') : '');
      return;
    }
    if (methodType === 'E-Wallet') {
      if (selectedMethodId === id && selectedProvider && EWALLET_PROVIDERS.includes(selectedProvider)) {
        return;
      }
      setSelectedProvider(EWALLET_PROVIDERS.includes(method?.name ?? '') ? (method?.name ?? '') : '');
      return;
    }
    if (methodType === 'Crypto') {
      if (selectedMethodId === id && selectedProvider && CRYPTO_PROVIDERS.includes(selectedProvider)) {
        return;
      }
      setSelectedProvider(CRYPTO_PROVIDERS.includes(method?.name ?? '') ? (method?.name ?? '') : '');
      return;
    }
    setSelectedProvider('');
    // In the new design, selecting usually just highlights, then click 'Continue'
    // But for better UX flow we can auto-highlight
  };

  const handleAmountSubmit = () => {
    if (isDepositLocked) {
      return;
    }
    if (requiresProviderSelection && !selectedProvider) {
      return;
    }
    if (!isValidAmount) return;
    setStep(3);
  };

  const handleBack = () => {
    if (step === 1) navigate(-1);
    else {
      if (step === 2) {
        setPauseAutoAdvance(true);
      }
      setStep((prev) => (prev - 1) as 1 | 2);
    }
  };

  const getSelectedMethod = () => {
    return [...POPULAR_METHODS, ...OTHER_METHODS].find(m => m.id === selectedMethodId);
  };

  const selectedMethod = getSelectedMethod();
  const selectedMethodType = resolveMethodType(selectedMethod);
  const providerOptions = selectedMethodType === 'Bank Transfer'
    ? BANK_TRANSFER_PROVIDERS
    : selectedMethodType === 'E-Wallet'
      ? EWALLET_PROVIDERS
      : selectedMethodType === 'Crypto'
        ? CRYPTO_PROVIDERS
        : [];
  const requiresProviderSelection = providerOptions.length > 0;
  const selectedProviderName = selectedProvider || selectedMethod?.name || '';
  const selectedMethodSummary =
    selectedProviderName && selectedProviderName.toLowerCase() !== selectedMethodType.toLowerCase()
      ? `${selectedMethodType} (${selectedProviderName})`
      : selectedMethodType;
  const selectedBonusInfo = BONUS_OPTIONS.find((bonus) => bonus.id === selectedBonus);

  const handleReceiptPick = () => {
    setReceiptError('');
    receiptInputRef.current?.click();
  };

  const handleReceiptChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const result = validateReceiptFile(e.target.files?.[0]);
    e.target.value = '';
    if (result.ok) {
      setReceiptFileName(result.file.name);
      setReceiptError('');
    } else {
      setReceiptFileName('');
      setReceiptError(result.error);
    }
  };

  const handleSubmitDeposit = () => {
    if (isDepositLocked) {
      return;
    }
    if (showDepositVerificationModal) {
      return;
    }
    setShowDepositVerificationModal(true);
  };

  const handleDepositVerificationConfirm = () => {
    if (!showDepositVerificationModal) {
      return;
    }
    setShowDepositVerificationModal(false);
    setStep(1);
    setSelectedMethodId(null);
    setSelectedProvider('');
    setAmount('');
    setReferenceId('');
    setWantsBonus(false);
    setSelectedBonus('none');
    setPauseAutoAdvance(false);
    setReceiptFileName('');
    setReceiptError('');
    setApprovalSecondsLeft(DEPOSIT_APPROVAL_COUNTDOWN_SECONDS);
  };

  useEffect(() => {
    const tab = normalizeDepositTab(searchParams.get('tab'));
    if (tab === 'withdrawal') {
      navigate('/withdraw?tab=withdrawal', { replace: true });
      return;
    }
    const normalizedTab: 'deposit' = 'deposit';
    if (searchParams.get('tab') !== normalizedTab) {
      const next = new URLSearchParams(searchParams);
      next.set('tab', normalizedTab);
      setSearchParams(next, { replace: true });
    }
    setActiveTab(normalizedTab);
  }, [navigate, searchParams, setSearchParams]);

  useEffect(() => {
    if (approvalSecondsLeft === null || approvalSecondsLeft <= 0) {
      return;
    }
    const timer = window.setInterval(() => {
      setApprovalSecondsLeft((previous) => {
        if (previous === null) {
          return null;
        }
        return Math.max(previous - 1, 0);
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [approvalSecondsLeft]);

  useEffect(() => {
    if (step !== 1 || isDepositLocked || pauseAutoAdvance) {
      return;
    }
    if (selectedMethodId && hasValidBonusSelection) {
      setStep(2);
    }
  }, [step, isDepositLocked, pauseAutoAdvance, selectedMethodId, hasValidBonusSelection]);

  const formatApprovalCountdown = (seconds: number) => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
    return `${minutes} minutes ${remainingSeconds} second(s)`;
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-4 font-sans text-white relative bg-[#0a0f19] overflow-x-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[rgba(0,79,59,0.3)] rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[rgba(0,79,59,0.3)] rounded-full blur-[150px]"></div>
      </div>

      {/* Main Wrapper */}
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
          <span className={`text-white ${MOBILE.pageTitle}`}>{t("settings")}</span>
        </div>

        {/* Main Card */}
        <div className="bg-[#1a2230] border border-white/5 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
          {/* Card Header */}
          <div className="p-6 pb-4 shrink-0 bg-[#1a2230]">
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
                <h1 className="text-xl font-bold text-white">
                  {step === 2 ? t("depositAmount") : t("confirmDeposit")}
                </h1>
              </div>
            )}
          </div>

          {/* Content Area */}
          <div className={`${MOBILE.cardPadding} pt-0`}>
          
          {/* STEP 1: SELECTION */}
          {step === 1 && (
            <div className="space-y-6">
                {isDepositLocked && (
                  <div className="rounded-xl border border-red-500/70 bg-[#331f23] px-4 py-3 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                    <p className="text-sm font-bold text-red-400">
                      Please wait {formatApprovalCountdown(approvalSecondsLeft ?? 0)} for deposit approval
                    </p>
                  </div>
                )}

                <div className={isDepositLocked ? 'hidden' : 'space-y-6'}>
                <div className="space-y-3">
                    <label className="flex items-center gap-3 text-sm text-gray-300 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            className="peer sr-only"
                            checked={wantsBonus}
                            onChange={(e) => {
                              const nextChecked = e.target.checked;
                              setPauseAutoAdvance(false);
                              setWantsBonus(nextChecked);
                              if (!nextChecked) {
                                setSelectedBonus('none');
                              }
                            }}
                        />
                        <span className="h-5 w-5 rounded-md border border-white/20 bg-[#0f151f] flex items-center justify-center text-transparent transition-all peer-checked:border-[#00bc7d] peer-checked:bg-[#00bc7d]/15 peer-checked:text-[#00bc7d] peer-focus-visible:ring-2 peer-focus-visible:ring-[#00bc7d]/30">
                          <Check className="h-3.5 w-3.5 text-current transition-colors" />
                        </span>
                        <span>Do you want to claim bonus?</span>
                    </label>

                    {wantsBonus && (
                      <div className="space-y-2">
                          <label className="text-gray-300 text-sm font-bold">Bonus</label>
                          <Select
                            value={selectedBonus}
                            onValueChange={(value) => {
                              setPauseAutoAdvance(false);
                              setSelectedBonus(value);
                            }}
                          >
                            <SelectTrigger className="!h-12 bg-[#0f151f] border-white/10 text-white rounded-xl px-4 py-0 data-[size=default]:!h-12 focus:border-[#00bc7d] focus-visible:ring-[#00bc7d]/20">
                              <SelectValue placeholder="Select Bonus" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#131b29] border-white/10 text-white">
                              <SelectItem value="none">Select Bonus</SelectItem>
                              {BONUS_OPTIONS.map((bonus) => (
                                <SelectItem key={bonus.id} value={bonus.id}>
                                  {bonus.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {selectedBonus === 'none' && (
                            <p className="text-xs font-bold text-red-400">Please select a bonus.</p>
                          )}
                          {selectedBonusInfo && (
                            <div className="rounded-xl border border-dashed border-[#00bc7d]/40 bg-[#0f151f]/60 p-4">
                              <div className="mb-3 flex items-center gap-2 text-[#00bc7d]">
                                <Info className="h-4 w-4" />
                                <span className="text-sm font-bold">Bonus Info</span>
                              </div>
                              <div className="space-y-1.5 text-sm text-gray-200">
                                <p>Rollover : {selectedBonusInfo.rollover}</p>
                                <p>Claim : {selectedBonusInfo.claim}</p>
                                <p>Minimum Deposit : {selectedBonusInfo.minimumDeposit}</p>
                                <p>Percentage Bonus Reward : {selectedBonusInfo.percentageBonusReward}</p>
                                <p>Maximum Bonus : {selectedBonusInfo.maximumBonus}</p>
                                <p>
                                  Game (Provider) : <span className="font-semibold text-white">{selectedBonusInfo.gameProvider}</span>
                                </p>
                              </div>
                            </div>
                          )}
                      </div>
                    )}
                </div>

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

                {/* Footer Info & Action */}
                <div className="pt-2 space-y-4">
                    {/* <div className="flex items-center justify-between px-2 py-3 border-t border-white/5">
                        <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-bold">
                            <ShieldCheck className="w-3 h-3" />
                            Secure
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-bold">
                            <Zap className="w-3 h-3" />
                            Fast Processing
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-bold">
                            <Headphones className="w-3 h-3" />
                            24/7 Support
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-bold">
                            <DollarSign className="w-3 h-3" />
                            No Fees
                        </div>
                    </div> */}

                </div>
                </div>
            </div>
          )}

          {/* STEP 2: Amount Input (Existing Logic) */}
          {step === 2 && selectedMethod && (
            <div className="space-y-6 animate-in slide-in-from-right-5 fade-in duration-300">
                
                {selectedBonusInfo && (
                  <div className="bg-[#0f151f] border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                    <span className="text-gray-400 font-bold">Bonus</span>
                    <span className="text-sm font-bold text-white">{selectedBonusInfo.label}</span>
                  </div>
                )}

                {/* Method Display Card */}
                <div className="bg-[#0f151f] border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${'bg' in selectedMethod ? selectedMethod.bg : 'bg-[#1a2230]'} flex items-center justify-center text-white border border-white/10 shadow-lg`}>
                            {'logo' in selectedMethod && selectedMethod.logo ? (
                              <img src={selectedMethod.logo} alt={selectedMethod.name} className="w-8 h-8 object-contain" />
                            ) : (
                              <selectedMethod.icon className={`w-6 h-6 ${'text' in selectedMethod ? selectedMethod.text : 'text-white'}`} />
                            )}
                        </div>
                        <div>
                            <div className="text-sm font-bold text-gray-400">{t("selectedMethod")}</div>
                            <div className="text-lg font-black text-white">{selectedMethodSummary}</div>
                        </div>
                    </div>
                    <Button variant="ghost" onClick={() => { setPauseAutoAdvance(true); setStep(1); }} className="text-[#00bc7d] hover:text-[#00a870] hover:bg-[#00bc7d]/10 h-auto py-1 px-3 text-base font-bold uppercase tracking-wider">
                        {t("change")}
                    </Button>
                </div>

                {requiresProviderSelection && (
                  <div className="bg-[#0f151f] border border-white/10 rounded-2xl p-6 space-y-1.5">
                    <label className="text-sm font-bold text-gray-300">
                      {selectedMethodType === 'E-Wallet' ? 'E-Wallet' : selectedMethodType === 'Crypto' ? 'Cryptocurrency' : 'Bank Transfer'}
                    </label>
                    <div className="relative">
                      <select
                        value={selectedProvider}
                        onChange={(e) => setSelectedProvider(e.target.value)}
                        className="w-full bg-[#0f151f] border border-white/10 rounded-xl px-4 pr-10 py-3.5 text-white focus:outline-none focus:border-[#00bc7d] transition-colors appearance-none cursor-pointer"
                      >
                        <option value="" disabled>
                          {selectedMethodType === 'E-Wallet' ? 'Select E-Wallet' : selectedMethodType === 'Crypto' ? 'Select Cryptocurrency' : 'Select Bank'}
                        </option>
                        {providerOptions.map((provider) => (
                          <option key={provider} value={provider}>
                            {provider}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                )}

                {/* Existing Step 2 Logic */}
               <div className="bg-[#0f151f] border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                     <span className="text-sm font-bold text-gray-300">{t("depositAmountLabel")}</span>
                  </div>

                  {/* Input */}
                  <div className="relative mb-6 group">
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
                         className="w-full bg-[#0f151f] border border-white/10 rounded-xl py-4 pl-16 pr-4 text-2xl font-black text-white focus:outline-none focus:border-[#00bc7d] transition-colors placeholder:text-gray-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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

              <Button 
                 onClick={handleAmountSubmit}
                 disabled={!isValidAmount || (requiresProviderSelection && !selectedProvider)}
                 className={`w-full h-12 rounded-xl text-base disabled:opacity-50 ${PRIMARY_CTA_CLASS}`}
               >
                 {t("confirmAndDeposit")}
               </Button>
            </div>
          )}

          {/* STEP 3: Transfer Details (Existing Logic) */}
          {step === 3 && selectedMethod && (
             <div className="space-y-4 animate-in slide-in-from-right-5 fade-in duration-300">
                {/* Summary Card */}
                <div className="bg-[#131b29] p-4 rounded-xl border border-white/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 font-bold">Bonus</span>
                    <span className="text-sm font-bold text-white">{selectedBonusInfo?.label ?? '-'}</span>
                  </div>
                </div>
                <div className="bg-[#131b29] p-4 rounded-xl border border-white/5 space-y-4">
                    
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg ${'bg' in selectedMethod ? selectedMethod.bg : 'bg-[#1a2230]'} flex items-center justify-center text-white border border-white/10`}>
                                {'logo' in selectedMethod && selectedMethod.logo ? (
                                  <img src={selectedMethod.logo} alt={selectedMethod.name} className="w-6 h-6 object-contain" />
                                ) : (
                                  <selectedMethod.icon className={`w-5 h-5 ${'text' in selectedMethod ? selectedMethod.text : 'text-white'}`} />
                                )}
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 font-bold uppercase">{t("paymentMethod")}</div>
                                <div className="text-sm font-bold text-white">{selectedProviderName || selectedMethod.name}</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-400 font-bold">{t("depositAmount")}</span>
                        <div className="flex items-center gap-1">
                            <span className="text-emerald-500 font-bold text-sm">MYR</span>
                            <span className="text-2xl font-black text-white">{(isValidAmount ? normalizedAmount : 0).toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl flex flex-col items-center shadow-xl">
                    <div className="bg-blue-400 text-white font-bold px-4 py-1 rounded-full mb-3 text-sm">{t("scanMe")}</div>
                    <div className="border-4 border-[#131b29] p-2 rounded-xl mb-2">
                        <QrCode className="w-40 h-40 text-black" />
                    </div>
                    <button className="text-xs font-bold text-blue-600 hover:underline">{t("downloadQrCode")}</button>
                </div>

                <div className="space-y-3">
                    <div className="bg-[#131b29] p-4 rounded-xl border border-white/5">
                        <div className="text-xs text-gray-500 font-bold uppercase mb-1">{t("bankName")}</div>
                        <div className="text-white font-bold">{selectedProviderName || selectedMethod.name}</div>
                    </div>

                    <div className="bg-[#131b29] p-4 rounded-xl border border-white/5 flex items-center justify-between group">
                        <div>
                            <div className="text-xs text-gray-500 font-bold uppercase mb-1">{t("accountNumber")}</div>
                            <div className="text-white font-bold tracking-wider">88779897778899</div>
                        </div>
                        <button className="p-2 hover:bg-white/10 rounded-lg text-gray-500 group-hover:text-emerald-500 transition-colors">
                            <Copy className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="bg-[#131b29] p-4 rounded-xl border border-white/5 flex items-center justify-between group">
                        <div>
                            <div className="text-xs text-gray-500 font-bold uppercase mb-1">{t("accountName")}</div>
                            <div className="text-white font-bold">RIO PAYMENTS SDN BHD</div>
                        </div>
                        <button className="p-2 hover:bg-white/10 rounded-lg text-gray-500 group-hover:text-emerald-500 transition-colors">
                            <Copy className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400">{t("referenceOptional")}</label>
                    <input 
                        type="text"
                        value={referenceId}
                        onChange={(e) => setReferenceId(sanitizeTextInput(e.target.value))}
                        className="w-full bg-[#0f151f] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00bc7d] transition-colors placeholder:text-gray-700"
                        placeholder={t("enterReferenceNumber")}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400">{t("uploadReceipt")}</label>
                    <input
                      ref={receiptInputRef}
                      type="file"
                      accept="image/jpeg,image/png,application/pdf"
                      className="hidden"
                      onChange={handleReceiptChange}
                    />
                    <div
                      onClick={handleReceiptPick}
                      className="border-2 border-dashed border-white/10 hover:border-emerald-500/50 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-[#0f151f]/50 hover:bg-[#0f151f]"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') handleReceiptPick();
                      }}
                      aria-label="Upload receipt (JPG, PNG, PDF only)"
                    >
                        <Upload className="w-8 h-8 text-gray-500 mb-2" />
                        <span className="text-sm font-bold text-gray-300">
                          {receiptFileName ? receiptFileName : t("tapToUpload")}
                        </span>
                        <span className="text-xs text-gray-600 mt-1">{t("supportedFiles")}</span>
                    </div>
                    {receiptError && (
                      <div className="text-xs font-bold text-red-400">{receiptError}</div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                    <Button 
                        variant="outline" 
                        onClick={() => setStep(2)}
                        className="h-12 border-white/10 hover:bg-white/5 text-gray-300 hover:text-white rounded-xl text-base font-bold"
                    >
                        {t("back")}
                    </Button>
                    <Button 
                        onClick={handleSubmitDeposit}
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

      {showDepositVerificationModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
            onClick={handleDepositVerificationConfirm}
            aria-hidden
          />
          <div className="relative w-full max-w-[520px] rounded-2xl bg-[#232529] border border-white/10 p-6 md:p-8 flex flex-col items-center gap-6">
            <div className="w-[92px] h-[92px] rounded-full bg-[#2b3130] flex items-center justify-center shadow-[0_0_0_8px_rgba(35,37,41,0.8)]">
              <div className="w-[74px] h-[74px] rounded-full bg-[#67d61f] flex items-center justify-center shadow-[0_10px_20px_rgba(103,214,31,0.35)]">
                <Check className="w-10 h-10 text-white" strokeWidth={3.5} />
              </div>
            </div>
            <p className="text-white text-center text-[22px] leading-tight max-w-[430px]">
              We are verifying your payment. Once we received the money, your account balance will be updated
            </p>
            <button
              type="button"
              onClick={handleDepositVerificationConfirm}
              className="w-full max-w-[185px] h-11 rounded-md bg-[#43ea8a] text-black text-base font-bold hover:bg-[#58f29a] transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
