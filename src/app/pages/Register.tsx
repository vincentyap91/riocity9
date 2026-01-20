import React, { useState, useRef, useEffect } from 'react';
import { Eye, EyeOff, X, Gift, Check, AlertCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { FlagMY } from '../components/figma/FlagMY';

// New Assets from design
import imgPromo from '@/assets/e9d8d4a61ac559bba1f577d68aca956ecbcccdee.png';

// Import Assets
// I'll keep the existing assets imports just in case, but they seem to be replaced.

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [captchaValue] = useState('3 9 0 0'); // Mock captcha
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [agreeBonus, setAgreeBonus] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showVerifyDialog, setShowVerifyDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const [successCountdown, setSuccessCountdown] = useState(5);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { register, checkAvailability } = useAuth();
  const navigate = useNavigate();

  // Validation errors
  const [errors, setErrors] = useState<{
    username?: string;
    mobile?: string;
    password?: string;
    captcha?: string;
    terms?: string;
    general?: string;
  }>({});

  // Validation function
  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    // Username validation
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (username.length > 20) {
      newErrors.username = 'Username cannot exceed 20 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      newErrors.username = 'Username can only contain letters, numbers and underscore';
    }
    
    // Mobile validation
    if (!mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{9,12}$/.test(mobile.replace(/\s/g, ''))) {
      newErrors.mobile = 'Please enter a valid mobile number (9-12 digits)';
    }
    
    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (password.length > 30) {
      newErrors.password = 'Password cannot exceed 30 characters';
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
      newErrors.password = 'Password must contain both letters and numbers';
    }
    
    // Captcha validation
    if (!captcha.trim()) {
      newErrors.captcha = 'Captcha is required';
    } else if (captcha !== captchaValue.replace(/\s/g, '')) {
      newErrors.captcha = 'Invalid captcha code';
    }
    
    // Terms validation
    if (!agreeTerms) {
      newErrors.terms = 'You must agree to the Terms & Conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Clear error when user types
  const clearError = (field: keyof typeof errors) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Countdown timer for verification code
  useEffect(() => {
    if (showVerifyDialog && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [showVerifyDialog, countdown]);

  // Success dialog countdown - auto redirect after 5 seconds
  useEffect(() => {
    if (showSuccessDialog && successCountdown > 0) {
      const timer = setTimeout(() => setSuccessCountdown(successCountdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (showSuccessDialog && successCountdown === 0) {
      setShowSuccessDialog(false);
      navigate('/');
    }
  }, [showSuccessDialog, successCountdown, navigate]);

  // Reset success countdown when dialog opens
  useEffect(() => {
    if (showSuccessDialog) {
      setSuccessCountdown(5);
    }
  }, [showSuccessDialog]);

  // Auto-focus first input when dialog opens
  useEffect(() => {
    if (showVerifyDialog) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [showVerifyDialog]);

  // Auto-focus next input when typing
  const handleCodeChange = (index: number, value: string) => {
    // Only allow numeric input
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length === 0) {
      // Clear current input if empty
      const newCode = [...verificationCode];
      newCode[index] = '';
      setVerificationCode(newCode);
      return;
    }
    
    // Only take the first digit
    const digit = numericValue.slice(-1);
    const newCode = [...verificationCode];
    newCode[index] = digit;
    setVerificationCode(newCode);

    // Auto-focus next input immediately after typing
    if (digit && index < 4) {
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
      }, 0);
    }

    // If all fields are filled, verify automatically
    if (newCode.every(d => d !== '') && newCode.join('').length === 5) {
      setTimeout(() => {
        handleVerifyCode(newCode.join(''));
      }, 100);
    }
  };

  // Handle backspace and arrow keys
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!verificationCode[index] && index > 0) {
        // If current is empty, go to previous and clear it
        const newCode = [...verificationCode];
        newCode[index - 1] = '';
        setVerificationCode(newCode);
        inputRefs.current[index - 1]?.focus();
      } else if (verificationCode[index]) {
        // If current has value, clear it
        const newCode = [...verificationCode];
        newCode[index] = '';
        setVerificationCode(newCode);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 5);
    const newCode = [...verificationCode];
    for (let i = 0; i < pastedData.length && i < 5; i++) {
      newCode[i] = pastedData[i];
    }
    setVerificationCode(newCode);
    if (pastedData.length === 5) {
      handleVerifyCode(pastedData);
    } else {
      inputRefs.current[Math.min(pastedData.length, 4)]?.focus();
    }
  };

  const handleVerifyCode = async (code: string) => {
    // Mock verification - in real app, this would call an API
    if (code === '12345') {
      setIsLoading(true);
      try {
        const success = await register(username, password, mobile, referralCode);
        if (success) {
          setShowVerifyDialog(false);
          setShowSuccessDialog(true);
        }
      } catch (error) {
        console.error('Register error:', error);
        // Map common error messages to the UI
        const errorMsg = error instanceof Error ? error.message : 'Registration failed';
        
        if (errorMsg.toLowerCase().includes('username')) {
          setErrors(prev => ({ ...prev, username: errorMsg }));
          setShowVerifyDialog(false);
        } else if (errorMsg.toLowerCase().includes('mobile')) {
          setErrors(prev => ({ ...prev, mobile: errorMsg }));
          setShowVerifyDialog(false);
        } else {
          alert(errorMsg);
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('验证码错误，请重新输入');
      setVerificationCode(['', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleSuccessOk = () => {
    setShowSuccessDialog(false);
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center py-[4%] font-sans text-white relative overflow-hidden bg-[#0a0f19]">
      {/* Background Ambience (matched to design) */}
      <div className="absolute inset-0 z-0">
          {/* Top Left Green/Purple mix */}
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[rgba(0,79,59,0.3)] rounded-full blur-[150px]"></div>
          {/* Bottom Right Green/Purple mix */}
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[rgba(0,79,59,0.3)] rounded-full blur-[150px]"></div>
      </div>

      {/* Main Card Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl bg-[#131b29] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/5"
      >
        
        {/* Close Button */}
        <Link to="/" className="absolute top-4 right-4 z-20 text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
        </Link>

        {/* Left Side - Promo (Design from RiocityNewTemplate) */}
        <div className="w-full md:w-[45%] bg-gradient-to-b from-[#062d1b] to-[#026d2f] relative overflow-hidden flex flex-col p-8 md:p-12">
            {/* Background Image/Gradient Layers */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>
            
            {/* Yellow Star Icon (Top Left) */}
            <motion.div 
                initial={{ rotate: -45, scale: 0.5, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative z-20 mb-12"
            >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FFDF20]">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </motion.div>

            {/* Exclusive Bonus Offer Badge */}
            <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="relative z-10 self-start bg-white/10 border border-white/20 rounded-full px-4 py-1.5 backdrop-blur-md mb-6"
            >
                <div className="flex items-center gap-2">
                    <Gift className="w-3 h-3 text-white" />
                    <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-wider">Exclusive Bonus Offer</span>
                </div>
            </motion.div>

            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative z-10 space-y-2 mb-8 text-left"
            >
                <h2 className="text-5xl md:text-6xl font-black text-white drop-shadow-lg leading-[0.9]">
                    125% UP TO <br/>
                    <span className="text-[#FFDF20]">$100</span>
                </h2>
                <div className="text-xl md:text-2xl font-bold text-white/90 tracking-wide mt-2">
                    + 180 FREE SPINS
                </div>
                <div className="text-sm font-medium text-white/60">
                    (30 ON SIGN UP)
                </div>
            </motion.div>
            
            {/* Main Image (Bottom Right) */}
            <motion.div 
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute right-[-5%] bottom-[0%] w-[100%] h-[100%] pointer-events-none z-0"
            >
                 <img src={imgPromo} alt="Promo" className="w-full h-full object-contain object-bottom" />
            </motion.div>

        </div>

        {/* Right Side - Register Form */}
        <div className="w-full md:w-[55%] bg-[#1a2230] p-6 md:p-10 flex flex-col justify-center">
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 text-center md:text-left"
          >
              <h3 className="text-xl font-bold text-white">Sign up to RioCity9</h3>
          </motion.div>

          <form 
            className="space-y-[10px]" 
            onSubmit={async (e) => {
              e.preventDefault();
              
              // Validate all fields
              if (!validateForm()) {
                return;
              }

              setIsLoading(true);
              setErrors({});
              try {
                // Check if username or mobile is already taken BEFORE showing verification
                const { usernameAvailable, mobileAvailable } = await checkAvailability(username, mobile);
                
                if (!usernameAvailable || !mobileAvailable) {
                  const newErrors: any = {};
                  if (!usernameAvailable) newErrors.username = 'Username already exists. Please choose another.';
                  if (!mobileAvailable) newErrors.mobile = 'Mobile number already registered. Please use another.';
                  setErrors(newErrors);
                  return;
                }

                // If available, show verification dialog
                setShowVerifyDialog(true);
                setCountdown(60);
                setVerificationCode(['', '', '', '', '']);
                // Focus first input after dialog opens
                setTimeout(() => inputRefs.current[0]?.focus(), 100);
              } catch (error) {
                console.error('Check availability error:', error);
                setErrors({ general: 'Validation failed. Please try again later.' });
              } finally {
                setIsLoading(false);
              }
            }}
          >
            
            {/* General Error Message */}
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span className="text-red-400 text-sm">{errors.general}</span>
              </motion.div>
            )}
            
            {/* Username Field */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="space-y-1.5">
                <Label htmlFor="username" className="text-sm font-medium text-gray-300">Username</Label>
                <Input 
                  id="username" 
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); clearError('username'); }}
                  disabled={isLoading}
                  className={`h-11 bg-[#0f151f] rounded-xl text-white placeholder:text-gray-500 focus-visible:ring-1 transition-all pl-4 ${
                    errors.username 
                      ? 'border-red-500 border-2 focus-visible:ring-red-500' 
                      : 'border border-white/10 focus-visible:ring-emerald-500'
                  }`}
                />
                {errors.username && (
                  <p className="text-red-400 text-xs flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.username}
                  </p>
                )}
              </div>
            </motion.div>
            
            {/* Mobile Field */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <div className="space-y-1.5">
                <Label htmlFor="mobile" className="text-sm font-medium text-gray-300">Mobile Number</Label>
                <div className="flex gap-2">
                  {/* Country Code Selector with Flag */}
                  <div className={`h-11 bg-[#0f151f] rounded-xl flex items-center gap-2 px-3 min-w-[100px] text-gray-300 font-medium cursor-pointer hover:bg-white/5 transition-colors ${
                    errors.mobile ? 'border-red-500 border-2' : 'border border-white/10'
                  }`}>
                     <FlagMY className="w-6 h-6 shrink-0" />
                     <span className="text-sm font-bold text-white">+60</span>
                     <ChevronDown className="w-4 h-4 text-gray-500 ml-auto" />
                  </div>
                  <div className="flex-1 relative">
                      <Input 
                      id="mobile" 
                      placeholder="Enter your mobile number"
                      value={mobile}
                      onChange={(e) => { setMobile(e.target.value); clearError('mobile'); }}
                        disabled={isLoading}
                        className={`h-11 bg-[#0f151f] rounded-xl text-white placeholder:text-gray-500 focus-visible:ring-1 flex-1 transition-all ${
                          errors.mobile 
                            ? 'border-red-500 border-2 focus-visible:ring-red-500' 
                            : 'border border-white/10 focus-visible:ring-emerald-500'
                        }`}
                      />
                  </div>
                </div>
                {errors.mobile && (
                  <p className="text-red-400 text-xs flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.mobile}
                  </p>
                )}
              </div>
            </motion.div>
            
            {/* Password Field */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-medium text-gray-300">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); clearError('password'); }}
                    disabled={isLoading}
                    className={`h-11 bg-[#0f151f] rounded-xl text-white placeholder:text-gray-500 focus-visible:ring-1 pr-10 transition-all ${
                      errors.password 
                        ? 'border-red-500 border-2 focus-visible:ring-red-500' 
                        : 'border border-white/10 focus-visible:ring-emerald-500'
                    }`}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors disabled:opacity-50"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.password}
                  </p>
                )}
              </div>
            </motion.div>
            
            {/* Referral Code Field */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <div className="space-y-1.5">
                <Label htmlFor="referral" className="text-sm font-medium text-gray-300">Referral Code <span className="text-gray-500">(Optional)</span></Label>
                <Input 
                  id="referral" 
                  placeholder="Enter referral code"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  disabled={isLoading}
                  className="h-11 bg-[#0f151f] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-emerald-500 transition-all" 
                />
              </div>
            </motion.div>
            
            {/* Captcha Field */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              <div className="space-y-1.5">
                <Label htmlFor="captcha" className="text-sm font-medium text-gray-300">Captcha</Label>
                <div className="grid grid-cols-[1fr_auto] gap-2">
                     <Input 
                        id="captcha"
                        placeholder="Enter captcha"
                        value={captcha}
                        onChange={(e) => { setCaptcha(e.target.value.replace(/\s/g, '')); clearError('captcha'); }}
                        disabled={isLoading}
                        className={`h-11 bg-[#0f151f] rounded-xl text-white placeholder:text-gray-500 focus-visible:ring-1 transition-all ${
                          errors.captcha 
                            ? 'border-red-500 border-2 focus-visible:ring-red-500' 
                            : 'border border-white/10 focus-visible:ring-emerald-500'
                        }`}
                     />
                     <div className="h-11 px-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white text-lg font-black italic tracking-widest select-none min-w-[100px]">
                         {captchaValue}
                     </div>
                </div>
                {errors.captcha && (
                  <p className="text-red-400 text-xs flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.captcha}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Terms & Conditions Checkboxes */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.8 }}
                className="space-y-2 pt-1"
            >
                <label className={`flex items-start gap-2 cursor-pointer group ${errors.terms ? 'text-red-400' : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={agreeTerms}
                      onChange={(e) => { setAgreeTerms(e.target.checked); clearError('terms'); }}
                      disabled={isLoading}
                      className={`w-4 h-4 rounded bg-[#0f151f] focus:ring-offset-0 disabled:opacity-50 ${
                        errors.terms 
                          ? 'border-red-500 border-2 text-red-500 focus:ring-red-500' 
                          : 'border-gray-600 text-emerald-500 focus:ring-emerald-500'
                      }`}
                    />
                    <span className={`text-xs transition-colors ${errors.terms ? 'text-red-400' : 'text-gray-400 group-hover:text-gray-300'}`}>
                        I agree to the <span className={`font-bold ${errors.terms ? 'text-red-400' : 'text-gray-300'}`}>Terms & Conditions</span> and <span className={`font-bold ${errors.terms ? 'text-red-400' : 'text-gray-300'}`}>Privacy Policy</span>
                    </span>
                </label>
                {errors.terms && (
                  <p className="text-red-400 text-xs flex items-center gap-1 ml-6">
                    <AlertCircle className="w-3 h-3" />
                    {errors.terms}
                  </p>
                )}
                <label className="flex items-start gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={agreeBonus}
                      onChange={(e) => setAgreeBonus(e.target.checked)}
                      disabled={isLoading}
                      className="w-4 h-4 rounded border-gray-600 bg-[#0f151f] text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0 disabled:opacity-50" 
                    />
                    <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                        I want to receive free bonuses every week. 🔥💰
                    </span>
                </label>
            </motion.div>

            {/* Submit Button */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.9 }}
                className="pt-2"
            >
                <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold text-base rounded-xl shadow-[0px_10px_15px_-3px_rgba(97,95,255,0.2)] transition-all hover:translate-y-[-1px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? '注册中...' : 'Sign Up'}
                </Button>
            </motion.div>

            {/* Divider */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.0 }}
                className="relative py-2"
            >
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#1a2230] px-2 text-gray-500">or</span>
                </div>
            </motion.div>

            {/* Social / WhatsApp Register */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 1.1 }}
            >
                <Button 
                    variant="outline"
                    className="w-full h-12 bg-[rgba(37,211,102,0.1)] border-[rgba(37,211,102,0.3)] hover:bg-[rgba(37,211,102,0.2)] text-[#25d366] hover:text-[#25d366] font-bold text-sm rounded-xl border-solid transition-all flex items-center justify-center gap-2"
                >
                     <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                     </svg>
                     Continue with WhatsApp
                </Button>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.2 }}
                className="text-center text-xs text-gray-500 mt-4 flex flex-col gap-2"
            >
                <div>
                    Already have an account? <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-bold hover:underline">Log In</Link>
                </div>
                <button 
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    Forgot Password?
                </button>
            </motion.div>

          </form>
        </div>

      </motion.div>

      {/* Verify Your Number Dialog */}
      <Dialog open={showVerifyDialog} onOpenChange={setShowVerifyDialog}>
        <DialogContent className="bg-[#131b29] border border-white/10 rounded-3xl p-8 max-w-[400px] [&>button]:hidden flex flex-col items-center text-center">
          <button
            onClick={() => setShowVerifyDialog(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Header Icon */}
          <div className="mb-6 relative">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <svg className="w-10 h-10 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full -z-10"></div>
          </div>

          <DialogHeader className="text-center mb-6">
            <DialogTitle className="text-2xl font-black text-white mb-3 tracking-tight text-center">
              Verify Your Number
            </DialogTitle>
            <p className="text-gray-400 text-sm leading-relaxed">
              Enter the 5-digit verification code sent to <br/>
              <span className="text-emerald-400 font-bold">*******{mobile.slice(-4) || '5147'}</span>
            </p>
          </DialogHeader>

          {/* Verification Code Inputs */}
          <div className="flex justify-center gap-2 md:gap-3 mb-6 w-full">
            {verificationCode.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                onFocus={(e) => e.target.select()}
                className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl md:text-3xl font-black bg-[#0f151f] border-2 border-white/10 text-white rounded-xl focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 transition-all hover:border-emerald-500/30"
              />
            ))}
          </div>

          {/* Countdown Timer */}
          <div className="text-center mb-6">
            <p className="text-emerald-400/80 text-sm font-bold tracking-wide">
              TAC Code Sent. {countdown}s
            </p>
          </div>

          {/* Verify Button */}
          <Button
            onClick={() => handleVerifyCode(verificationCode.join(''))}
            disabled={verificationCode.some(digit => !digit)}
            className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 text-[#0a0f19] font-black text-base rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all hover:scale-[1.02] active:scale-95"
          >
            Verify Now
          </Button>
        </DialogContent>
      </Dialog>

      {/* Registration Successful Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="bg-[#131b29] border border-white/10 rounded-3xl p-8 max-w-[400px] [&>button]:hidden flex flex-col items-center text-center">
          {/* Success Icon */}
          <div className="mb-6 relative">
            <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)] z-10">
              <Check className="w-10 h-10 text-[#0a0f19]" strokeWidth={4} />
            </div>
            <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full -z-10"></div>
          </div>

          <DialogHeader className="text-center mb-4">
            <DialogTitle className="text-2xl font-black text-white tracking-tight text-center">
              Registration Successful
            </DialogTitle>
          </DialogHeader>

          {/* Success Message */}
          <p className="text-gray-400 text-sm leading-relaxed mb-6 px-2">
            Welcome to <span className="text-white font-bold tracking-tight">Rio<span className="text-emerald-500">City9</span></span>. Your account is ready!
          </p>

          {/* Countdown */}
          <div className="mb-6">
            <p className="text-emerald-400/80 text-sm font-bold tracking-wide">
              Redirecting to Home in <span className="text-emerald-400">{successCountdown}s</span>
            </p>
          </div>

          {/* Get Started Button */}
          <Button
            onClick={handleSuccessOk}
            className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 text-[#0a0f19] font-black text-base rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all hover:scale-[1.02] active:scale-95"
          >
            Get Started Now
          </Button>
        </DialogContent>
      </Dialog>

      {/* Forgot Password Modal */}
      <Dialog open={showForgotModal} onOpenChange={setShowForgotModal}>
        <DialogContent className="bg-[#131b29] border border-white/10 rounded-3xl p-8 max-w-[400px] flex flex-col items-center text-center">
          {/* Header Icon */}
          <div className="mb-6 relative">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <AlertCircle className="w-10 h-10 text-emerald-500" />
            </div>
            <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full -z-10"></div>
          </div>

          {/* Text Content */}
          <div className="space-y-3 mb-8">
            <h3 className="text-2xl font-black text-white tracking-tight">Forgot Password?</h3>
            <p className="text-gray-400 text-sm leading-relaxed px-2">
              For your account security, please contact our <span className="text-emerald-400 font-bold">24/7 Live Support</span> to assist you with password recovery.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-3 w-full">
            <Button
              onClick={() => {
                // Dispatch custom event to open live chat with forgot password context
                window.dispatchEvent(new CustomEvent('openLiveChat', { detail: { reason: 'forgot-password' } }));
                setShowForgotModal(false);
              }}
              className="h-12 bg-emerald-500 hover:bg-emerald-400 text-[#0a0f19] font-black text-base rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
            >
              Contact Support Now
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowForgotModal(false)}
              className="h-12 text-gray-400 hover:text-white hover:bg-white/5 font-bold text-sm rounded-xl transition-colors"
            >
              Maybe Later
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
