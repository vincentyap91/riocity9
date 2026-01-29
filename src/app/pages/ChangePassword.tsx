import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Eye, EyeOff, Lock, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useLanguage } from '../contexts/LanguageContext';
import { InnerPageLayout } from "../components/shared/InnerPageLayout";
import { MOBILE } from "../config/themeTokens";
import { sanitizeTextInput } from '../utils/security';
import { auth } from '../config/firebase';

export function ChangePassword() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    current?: string;
    new?: string;
    confirm?: string;
  }>({});

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!currentPassword) {
      newErrors.current = 'Please enter your current password';
    }
    
    if (!newPassword) {
      newErrors.new = 'Please enter a new password';
    } else if (newPassword.length < 8) {
      newErrors.new = 'Include at least 8 characters';
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(newPassword)) {
      newErrors.new = 'Must contain both letters and numbers';
    }
    
    if (!confirmPassword) {
      newErrors.confirm = 'Please confirm your new password';
    } else if (confirmPassword !== newPassword) {
      newErrors.confirm = 'New passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    try {
      const user = auth.currentUser;
      if (!user?.email) {
        setErrors({ current: 'You must be signed in to change password.' });
        return;
      }
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      navigate('/settings');
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setErrors({ current: 'Current password is incorrect.' });
      } else if (code === 'auth/weak-password') {
        setErrors({ new: 'New password is too weak.' });
      } else {
        setErrors({ current: 'Failed to change password. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const requirements = [
    { text: 'Include at least 8 characters, containing both a letter and a number, with no symbols allowed.', met: newPassword.length >= 8 && /^(?=.*[A-Za-z])(?=.*\d)/.test(newPassword) },
    { text: 'Only letters (A-Z, a-z) and numbers (0-9).', met: /^[A-Za-z0-9]*$/.test(newPassword) && newPassword.length > 0 },
    { text: 'No special characters / symbols.', met: !/[^A-Za-z0-9]/.test(newPassword) && newPassword.length > 0 },
  ];

  return (
    <InnerPageLayout className="overflow-hidden">
      <div className={`container mx-auto max-w-[640px] ${MOBILE.container} pb-20 md:pb-0`}>
        {/* Navigation Header */}
        <div className={`relative flex items-center justify-center ${MOBILE.headerMb}`}>
          <div className={`absolute left-0 flex items-center ${MOBILE.gapSm}`}>
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

        {/* Change Password Card (match Profile style) */}
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1a2230] rounded-2xl shadow-xl border border-white/5 overflow-hidden"
        >
            {/* Title inside card (match Profile style) */}
            <div className="flex items-center justify-center gap-3 p-6 pb-4">
                <div className="h-10 w-10 rounded-xl bg-black/25 border border-white/10 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-white/90" />
                </div>
                <span className="text-white font-bold text-base">{t("changePassword")}</span>
            </div>

            <div className={`${MOBILE.cardPadding} pt-4`}>
                <form onSubmit={handleSave} className={MOBILE.spaceYSection}>
                    {/* Current Password */}
                    <div className={MOBILE.spaceY}>
                        <Label htmlFor="currentPassword" className="text-white font-bold text-sm flex items-center gap-1">
                            Current Password <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                            <Input 
                                id="currentPassword"
                                type={showCurrentPassword ? "text" : "password"}
                                placeholder="Enter Your Current Password"
                                value={currentPassword}
                                onChange={(e) => { 
                                  const sanitized = sanitizeTextInput(e.target.value);
                                  setCurrentPassword(sanitized); 
                                  if(errors.current) setErrors({...errors, current: undefined}); 
                                }}
                                className={`bg-[#0f151f] border-white/10 text-white h-12 rounded-xl px-4 focus:border-[#00bc7d] focus-visible:ring-[#00bc7d]/20 pr-12 transition-all ${
                                    errors.current ? 'border-red-500 border-2' : 'border-white/10'
                                }`}
                            />
                            <button 
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                            >
                                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.current && (
                            <p className="text-red-400 text-xs flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {errors.current}
                            </p>
                        )}
                    </div>

                    {/* New Password */}
                    <div className={MOBILE.spaceY}>
                        <Label htmlFor="newPassword" className={`text-white ${MOBILE.label} flex items-center ${MOBILE.gapXs}`}>
                            New Password <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                            <Input 
                                id="newPassword"
                                type={showNewPassword ? "text" : "password"}
                                placeholder="Enter New Password"
                                value={newPassword}
                                onChange={(e) => { 
                                  const sanitized = sanitizeTextInput(e.target.value);
                                  setNewPassword(sanitized); 
                                  if(errors.new) setErrors({...errors, new: undefined}); 
                                }}
                                className={`bg-[#0f151f] border-white/10 text-white h-12 rounded-xl px-4 focus:border-[#00bc7d] focus-visible:ring-[#00bc7d]/20 pr-12 transition-all ${
                                    errors.new ? 'border-red-500 border-2' : 'border-white/10'
                                }`}
                            />
                            <button 
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                            >
                                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.new && (
                            <p className="text-red-400 text-xs flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {errors.new}
                            </p>
                        )}
                    </div>

                    {/* Confirm New Password */}
                    <div className={MOBILE.spaceY}>
                        <Label htmlFor="confirmPassword" className={`text-white ${MOBILE.label} flex items-center ${MOBILE.gapXs}`}>
                            Confirm New Password <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                            <Input 
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => { 
                                  const sanitized = sanitizeTextInput(e.target.value);
                                  setConfirmPassword(sanitized); 
                                  if(errors.confirm) setErrors({...errors, confirm: undefined}); 
                                }}
                                className={`bg-[#0f151f] border-white/10 text-white h-12 rounded-xl px-4 focus:border-[#00bc7d] focus-visible:ring-[#00bc7d]/20 pr-12 transition-all ${
                                    errors.confirm ? 'border-red-500 border-2' : 'border-white/10'
                                }`}
                            />
                            <button 
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.confirm && (
                            <p className="text-red-400 text-xs flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {errors.confirm}
                            </p>
                        )}
                    </div>

                    {/* Requirements List (styled to fit the card) */}
                    <div className="space-y-2.5 pt-2 bg-black/20 p-4 rounded-xl border border-white/5">
                        {requirements.map((req, idx) => (
                            <div key={idx} className={`flex items-start gap-2.5 text-[12px] transition-colors duration-300 ${req.met ? 'text-emerald-400 font-bold' : 'text-gray-500'}`}>
                                <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 transition-transform duration-300 ${req.met ? 'scale-110' : 'scale-100 opacity-30'}`} strokeWidth={3} />
                                <span className="leading-tight">{req.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* Save Button (match Profile) */}
                    <div className="flex justify-center mt-8 pt-6 border-t border-white/10">
                        <Button 
                            type="submit"
                            disabled={isLoading}
                            className="bg-[#00bc7d] hover:bg-[#00a870] text-black font-bold h-12 px-12 rounded-xl text-base shadow-[0_0_15px_-3px_rgba(0,188,125,0.4)] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                                    Saving...
                                </div>
                            ) : (
                                "Save"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </motion.div>
      </div>
    </InnerPageLayout>
  );
}

