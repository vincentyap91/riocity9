import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Smartphone, Building2, Plus, CheckCircle2, Clock, Trash2, ShieldCheck, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { InnerPageLayout } from "../components/shared/InnerPageLayout";
import { sanitizeTextInput, sanitizeMobileNumber, sanitizeEmail, sanitizeUsername } from '../utils/security';
import { CountryCodeSelector } from '../components/shared/CountryCodeSelector';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

export function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'personal' | 'address'>('personal');
  const [eWalletAccounts, setEWalletAccounts] = useState([
    { id: 'ewallet-1', number: '60121344124', holder: 'Elon Musk', verified: true, provider: 'Touch n Go' },
    { id: 'ewallet-2', number: '60198765432', holder: 'Elon Musk', verified: false, provider: 'GrabPay' },
  ]);

  const [bankAccounts, setBankAccounts] = useState([
    { id: 'bank-1', accountNo: '1234567890', holder: 'Elon Musk', bankName: 'Maybank', verified: true },
  ]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [addDialogType, setAddDialogType] = useState<'ewallet' | 'bank'>('ewallet');
  const [newAccountName, setNewAccountName] = useState('');
  const [newAccountNumber, setNewAccountNumber] = useState('');
  const [newAccountProvider, setNewAccountProvider] = useState('');
  const [contactCountryCode, setContactCountryCode] = useState('+60'); // Default to Malaysia
  const [ewalletCountryCode, setEwalletCountryCode] = useState('+60'); // Default to Malaysia for e-wallet
  
  // Form state for Personal tab
  const [formData, setFormData] = useState({
    username: user?.username || 'Elon',
    email: user?.email || 'elonmusk@gmail.com',
    registrationDate: '08/01/2025',
    currency: 'MYR',
    fullName: 'Elon Musk',
    dateOfBirth: '08/01/1991',
    gender: 'Male',
    contactNumber: user?.mobile || '',
    bankOrWalletAccount: '',
  });

  // Sync contact number with user mobile when user data changes
  useEffect(() => {
    if (user?.mobile) {
      setFormData(prev => ({
        ...prev,
        contactNumber: user.mobile || '',
      }));
    }
  }, [user?.mobile]);

  const handleInputChange = (field: string, value: string) => {
    let sanitized = value;
    
    // Apply appropriate sanitization based on field type
    if (field === 'contactNumber' || field === 'mobile') {
      sanitized = sanitizeMobileNumber(value);
    } else if (field === 'email') {
      sanitized = sanitizeEmail(value);
    } else if (field === 'username') {
      sanitized = sanitizeUsername(value);
    } else {
      sanitized = sanitizeTextInput(value);
    }
    
    setFormData(prev => ({ ...prev, [field]: sanitized }));
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    alert('Profile saved successfully!');
  };

  const openAddDialog = (type: 'ewallet' | 'bank') => {
    setAddDialogType(type);
    setNewAccountName('');
    setNewAccountNumber('');
    setNewAccountProvider('');
    setEwalletCountryCode('+60'); // Reset to default
    setIsAddDialogOpen(true);
  };

  const handleAddAccount = () => {
    if (!newAccountName.trim() || !newAccountNumber.trim()) {
      return;
    }

    if (addDialogType === 'ewallet') {
      setEWalletAccounts(prev => [
        ...prev,
        {
          id: `ewallet-${Date.now()}`,
          number: newAccountNumber.trim(),
          holder: newAccountName.trim(),
          verified: false,
          provider: newAccountProvider.trim() || 'E-wallet',
        },
      ]);
    } else {
      setBankAccounts(prev => [
        ...prev,
        {
          id: `bank-${Date.now()}`,
          accountNo: newAccountNumber.trim(),
          holder: newAccountName.trim(),
          bankName: newAccountProvider.trim() || 'Bank',
          verified: true,
        },
      ]);
    }

    setIsAddDialogOpen(false);
  };

  const handleDeleteEwallet = (id: string) => {
    setEWalletAccounts(prev => prev.filter(account => account.id !== id));
  };

  const handleDeleteBank = (id: string) => {
    setBankAccounts(prev => prev.filter(account => account.id !== id));
  };

  return (
    <InnerPageLayout className="overflow-hidden">
      <div className="container mx-auto px-4 py-12 max-w-[1024px]">
        {/* Navigation Header (Settings left) */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute left-0 flex items-center gap-3">
            <button
              onClick={() => navigate('/settings')}
              className="h-10 w-10 rounded-full bg-black/20 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Back to Settings"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <span className="text-white font-bold text-base">{t("settings")}</span>
          </div>
        </div>

        {/* Main Content Card (centered, large, rounded like screenshot) */}
        <div className="bg-[#1a2230] rounded-[16px] shadow-xl border border-white/5 overflow-hidden">
          {/* Title inside card (match screenshot) */}
          <div className="flex items-center justify-center gap-3 p-6 pb-4">
            <div className="h-10 w-10 rounded-xl bg-black/25 border border-white/10 flex items-center justify-center">
              <User className="w-5 h-5 text-white/90" />
            </div>
            <span className="text-white font-bold text-base">{t("myProfile")}</span>
          </div>

          {/* Tabs (pill, centered) */}
          <div className="flex justify-center px-6 pb-4">
            <div className="w-full max-w-[420px] flex bg-[#0f151f] p-1 rounded-xl border border-white/5">
              <button
                onClick={() => setActiveTab('personal')}
                className={`flex-1 h-10 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'personal'
                    ? 'bg-emerald-500 text-black shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Personal
              </button>
              <button
                onClick={() => setActiveTab('address')}
                className={`flex-1 h-10 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'address'
                    ? 'bg-emerald-500 text-black shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Bank / E-wallet
              </button>
            </div>
          </div>

          <div className="p-6 pt-4">
            {activeTab === 'personal' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white font-bold text-sm">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className="bg-[#0f151f] border-white/10 text-white h-12 rounded-xl px-4 focus:border-emerald-500 focus-visible:ring-emerald-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-white font-bold text-sm">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="bg-[#0f151f] border-white/10 text-white h-12 rounded-xl px-4 focus:border-emerald-500 focus-visible:ring-emerald-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-bold text-sm">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-[#0f151f] border-white/10 text-white h-12 rounded-xl px-4 focus:border-emerald-500 focus-visible:ring-emerald-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactNumber" className="text-white font-bold text-sm">
                    Contact Number
                  </Label>
                  <div className="flex gap-2">
                    <CountryCodeSelector
                      value={contactCountryCode}
                      onChange={setContactCountryCode}
                      className="shrink-0"
                    />
                    <Input
                      id="contactNumber"
                      type="tel"
                      value={formData.contactNumber}
                      onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                      placeholder="Enter contact number"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      className="bg-[#0f151f] border-white/10 text-white h-12 rounded-xl px-4 focus:border-emerald-500 focus-visible:ring-emerald-500/20 flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registrationDate" className="text-white font-bold text-sm">
                    Registration Date
                  </Label>
                  <Input
                    id="registrationDate"
                    type="text"
                    value={formData.registrationDate}
                    onChange={(e) => handleInputChange('registrationDate', e.target.value)}
                    className="bg-[#0f151f] border-white/10 text-white h-12 rounded-xl px-4 focus:border-emerald-500 focus-visible:ring-emerald-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="text-white font-bold text-sm">
                    Date of Birth
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="text"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="bg-[#0f151f] border-white/10 text-white h-12 rounded-xl px-4 focus:border-emerald-500 focus-visible:ring-emerald-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-white font-bold text-sm">
                    Gender
                  </Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleInputChange('gender', value)}
                  >
                    <SelectTrigger className="!h-12 bg-[#0f151f] border-white/10 text-white rounded-xl px-4 py-0 data-[size=default]:!h-12 focus:border-emerald-500 focus-visible:ring-emerald-500/20">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#131b29] border-white/10 text-white">
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency" className="text-white font-bold text-sm">
                    Currency
                  </Label>
                  <Input
                    id="currency"
                    type="text"
                    value={formData.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    className="bg-[#0f151f] border-white/10 text-white h-12 rounded-xl px-4 focus:border-emerald-500 focus-visible:ring-emerald-500/20"
                  />
                </div>
              </div>
            ) : (
              <div className="max-w-[800px] mx-auto space-y-8 animate-in fade-in slide-in-from-right-5 duration-300">
                {/* E-wallet Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5 text-emerald-400" />
                      <h3 className="text-white font-black text-base uppercase tracking-tight">E-wallet Accounts</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => openAddDialog('ewallet')}
                      className="text-emerald-400 hover:text-emerald-300 text-xs font-black uppercase flex items-center gap-1 transition-colors"
                    >
                      <Plus size={14} strokeWidth={3} />
                      Add New
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {eWalletAccounts.map((account) => (
                      <div
                        key={account.id}
                        className="group flex items-center justify-between gap-4 bg-[#0f151f] hover:bg-[#141b29] rounded-2xl p-5 border border-white/5 transition-all duration-300 hover:shadow-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-[#1a2230] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Smartphone className="w-6 h-6 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-2">
                              <span className="text-white font-black text-sm tracking-wide">{account.number}</span>
                              {account.verified ? (
                                <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter">Verified</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 rounded-full px-2 py-0.5">
                                  <Clock className="w-3 h-3 text-amber-500" />
                                  <span className="text-[10px] font-black text-amber-500 uppercase tracking-tighter">Pending</span>
                                </div>
                              )}
                            </div>
                            <div className="text-gray-500 text-xs font-bold uppercase tracking-tight">
                              {account.provider} • {account.holder}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!account.verified && (
                            <button
                              type="button"
                              className="h-10 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-[11px] font-black uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/20"
                            >
                              Verify OTP
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteEwallet(account.id)}
                            className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 text-gray-500 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bank Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-blue-400" />
                      <h3 className="text-white font-black text-base uppercase tracking-tight">Bank Accounts</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => openAddDialog('bank')}
                      className="text-blue-400 hover:text-blue-300 text-xs font-black uppercase flex items-center gap-1 transition-colors"
                    >
                      <Plus size={14} strokeWidth={3} />
                      Add Bank
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {bankAccounts.length > 0 ? (
                      bankAccounts.map((account) => (
                        <div
                          key={account.id}
                          className="group flex items-center justify-between gap-4 bg-[#0f151f] hover:bg-[#141b29] rounded-2xl p-5 border border-white/5 transition-all duration-300 hover:shadow-lg"
                        >
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-[#1a2230] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Building2 className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <div className="flex items-center gap-2">
                                <span className="text-white font-black text-sm tracking-wide">{account.accountNo}</span>
                                <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">
                                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter">Linked</span>
                                </div>
                              </div>
                              <div className="text-gray-500 text-xs font-bold uppercase tracking-tight">
                                {account.bankName} • {account.holder}
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteBank(account.id)}
                            className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 text-gray-500 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="bg-[#0f151f]/50 border border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center">
                          <Building2 className="w-8 h-8 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-white font-black text-sm uppercase tracking-wider">No Bank Account Linked</p>
                          <p className="text-gray-500 text-xs mt-1 max-w-[240px] mx-auto">Please add your bank account for secure and faster withdrawals.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => openAddDialog('bank')}
                          className="h-10 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-black uppercase tracking-widest transition-all"
                        >
                          Link Account Now
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Save Button (wide + glow, bottom centered) - Only show in Personal tab */}
            {activeTab === 'personal' && (
              <div className="flex justify-center mt-8 pt-6 border-t border-white/10">
                <Button
                  onClick={handleSave}
                  className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-12 px-12 rounded-xl text-base shadow-[0_0_15px_-3px_rgba(16,185,129,0.4)] transition-all"
                >
                  Save
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-[#1a1a1a] border-white/10 text-white rounded-2xl">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-emerald-400 text-lg font-bold">
              {addDialogType === 'ewallet' ? 'Add Phone Number' : 'Add Bank Account'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-emerald-400 text-sm font-bold">
                Account Name
              </Label>
              <Input
                value={newAccountName}
                onChange={(e) => setNewAccountName(sanitizeTextInput(e.target.value))}
                placeholder="Enter account name"
                className="bg-white text-black h-11 rounded-xl border-transparent focus-visible:ring-emerald-500/30"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-emerald-400 text-sm font-bold">
                {addDialogType === 'ewallet' ? 'Mobile Number' : 'Account Number'}
              </Label>
              {addDialogType === 'ewallet' ? (
                <div className="flex gap-2">
                  <CountryCodeSelector
                    value={ewalletCountryCode}
                    onChange={setEwalletCountryCode}
                    className="shrink-0"
                  />
                  <Input
                    value={newAccountNumber}
                    onChange={(e) => {
                      const sanitized = sanitizeMobileNumber(e.target.value);
                      setNewAccountNumber(sanitized);
                    }}
                    placeholder="Enter mobile number"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="bg-white text-black h-11 rounded-xl border-transparent focus-visible:ring-emerald-500/30 flex-1"
                  />
                </div>
              ) : (
                <Input
                  value={newAccountNumber}
                  onChange={(e) => {
                    const sanitized = sanitizeTextInput(e.target.value);
                    setNewAccountNumber(sanitized);
                  }}
                  placeholder="Enter account number"
                  type="text"
                  className="bg-white text-black h-11 rounded-xl border-transparent focus-visible:ring-emerald-500/30"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-emerald-400 text-sm font-bold">
                {addDialogType === 'ewallet' ? 'E-wallet Provider' : 'Bank Name'}
              </Label>
              <Input
                value={newAccountProvider}
                onChange={(e) => setNewAccountProvider(sanitizeTextInput(e.target.value))}
                placeholder={addDialogType === 'ewallet' ? 'e.g. Touch n Go' : 'e.g. Maybank'}
                className="bg-white text-black h-11 rounded-xl border-transparent focus-visible:ring-emerald-500/30"
              />
            </div>

            <Button
              type="button"
              onClick={handleAddAccount}
              className="w-full h-11 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-base"
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </InnerPageLayout>
  );
}
