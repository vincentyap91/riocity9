import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Check, AlertCircle, X, Gift, Loader2, RefreshCw, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { sanitizeTextInput, sanitizeUsername, sanitizeMobileNumber } from '../utils/security';
import { CountryCodeSelector } from '../components/shared/CountryCodeSelector';

// New Assets from design
import imgPromo from '@/assets/e9d8d4a61ac559bba1f577d68aca956ecbcccdee.png';
// I'll keep the existing assets imports just in case, but they seem to be replaced.

function getPostAuthRedirect(): string {
  const storedPath = sessionStorage.getItem('redirectAfterLogin');
  sessionStorage.removeItem('redirectAfterLogin');
  if (storedPath && storedPath.startsWith('/') && !storedPath.startsWith('//')) {
    return storedPath;
  }
  return '/';
}

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [countryCode, setCountryCode] = useState('+60'); // Default to Malaysia
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [showReferralCode, setShowReferralCode] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [agreeBonus, setAgreeBonus] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Generate random captcha on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Function to generate random 4-digit captcha
  const generateCaptcha = () => {
    const digits = [];
    for (let i = 0; i < 4; i++) {
      digits.push(Math.floor(Math.random() * 10));
    }
    // Format with spaces: "3 9 0 0"
    const formatted = digits.join(' ');
    setCaptchaValue(formatted);
    // Clear the input field when captcha changes
    setCaptcha('');
  };
  
  // Validation errors
  const [errors, setErrors] = useState<{
    username?: string;
    mobile?: string;
    password?: string;
    captcha?: string;
    terms?: string;
    general?: string;
  }>({});
  
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to home if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate(getPostAuthRedirect(), { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Validation function
  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    // Username validation
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (username.length > 10) {
      newErrors.username = 'Username cannot exceed 10 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      newErrors.username = 'Username can only contain letters, numbers and underscore';
    }
    
    // Mobile validation
    if (!mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{2,10}$/.test(mobile.replace(/\s/g, ''))) {
      newErrors.mobile = 'Please enter a valid mobile number (2-10 digits)';
    }
    
    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (password.length > 100) {
      newErrors.password = 'Password cannot exceed 100 characters';
    } else if (!/^[a-zA-Z0-9]+$/.test(password)) {
      newErrors.password = 'Password can only contain letters and numbers';
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

  return (
    <div className="flex items-center justify-center lg:py-[4%] p-4 font-sans text-white relative overflow-hidden bg-[#0a0f19]">
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
        <div className="hidden md:flex md:w-[45%] bg-gradient-to-b from-[#062d1b] to-[#026d2f] relative overflow-hidden flex-col p-8 md:p-12">
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
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Exclusive Bonus Offer</span>
                </div>
            </motion.div>

            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative z-10 space-y-2 mb-8 text-left"
            >
                <h2 className="text-4xl font-bold tracking-tight text-white leading-tight">
                    125% UP TO <br/>
                    <span className="text-[#FFDF20]">$100</span>
                </h2>
                <div className="text-xl md:text-2xl font-black text-white/90 tracking-wide mt-2">
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
          
          <div className="mb-6 text-center md:text-left">
              <h3 className="text-xl font-bold text-white">Sign up to RioCity9</h3>
          </div>

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
                await register(username, password, mobile, countryCode);
              } catch (error) {
                console.error('Register error:', error);
                const errorMsg = error instanceof Error ? error.message : 'Registration failed';
                const normalized = errorMsg.toLowerCase();
                if (normalized.includes('username')) {
                  setErrors(prev => ({
                    ...prev,
                    username: 'Username is not available. Please choose another.',
                    general: undefined,
                  }));
                } else if (normalized.includes('mobile')) {
                  setErrors(prev => ({
                    ...prev,
                    mobile: 'Mobile number is not available. Try a different number.',
                    general: undefined,
                  }));
                } else if (normalized.includes('password')) {
                  setErrors(prev => ({
                    ...prev,
                    password: 'Password must be at least 6 characters.',
                    general: errorMsg,
                  }));
                } else {
                  setErrors(prev => ({ ...prev, general: errorMsg }));
                }
              } finally {
                setIsLoading(false);
              }
            }}
          >
            
            {/* General Error Message */}
            {errors.general && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span className="text-red-400 text-sm">{errors.general}</span>
              </div>
            )}
            
            {/* Username Field */}
            <div>
              <div className="space-y-1.5">
                <Label htmlFor="username" className="text-sm font-medium text-gray-300">Username</Label>
                <Input 
                  id="username" 
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => { 
                    const sanitized = sanitizeUsername(e.target.value).slice(0, 10);
                    setUsername(sanitized); 
                    clearError('username'); 
                  }}
                  disabled={isLoading}
                  maxLength={10}
                  className={`h-12 bg-[#0f151f] rounded-xl text-white placeholder:text-gray-500 focus-visible:ring-1 transition-all pl-4 ${
                    errors.username 
                      ? 'border-red-500 border-2 focus-visible:ring-red-500' 
                      : 'border border-white/10 focus-visible:ring-[#00bc7d]'
                  }`}
                />
                {errors.username && (
                  <p className="text-red-400 text-xs flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.username}
                  </p>
                )}
              </div>
            </div>
            
            {/* Mobile Number Field */}
            <div>
              <div className="space-y-1.5">
                <Label htmlFor="mobile" className="text-sm font-medium text-gray-300">Mobile Number</Label>
                <div className="flex gap-2">
                  <CountryCodeSelector
                    value={countryCode}
                    onChange={setCountryCode}
                    disabled={isLoading}
                    error={!!errors.mobile}
                  />
                  <Input 
                    id="mobile" 
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Enter your mobile number"
                    value={mobile}
                    onChange={(e) => { 
                      const sanitized = sanitizeMobileNumber(e.target.value).slice(0, 10);
                      setMobile(sanitized); 
                      clearError('mobile'); 
                    }}
                    disabled={isLoading}
                    maxLength={10}
                    className={`h-12 bg-[#0f151f] rounded-xl text-white placeholder:text-gray-500 focus-visible:ring-1 flex-1 transition-all ${
                      errors.mobile 
                        ? 'border-red-500 border-2 focus-visible:ring-red-500' 
                        : 'border border-white/10 focus-visible:ring-[#00bc7d]'
                    }`}
                  />
                </div>
                {errors.mobile && (
                  <p className="text-red-400 text-xs flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.mobile}
                  </p>
                )}
              </div>
            </div>
            
            {/* Password Field */}
            <div>
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-medium text-gray-300">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => { 
                      const sanitized = sanitizeTextInput(e.target.value)
                        .replace(/[^a-zA-Z0-9]/g, '')
                        .slice(0, 100);
                      setPassword(sanitized);
                      clearError('password'); 
                    }}
                    disabled={isLoading}
                    maxLength={100}
                    className={`h-12 bg-[#0f151f] rounded-xl text-white placeholder:text-gray-500 focus-visible:ring-1 pr-10 transition-all ${
                      errors.password 
                        ? 'border-red-500 border-2 focus-visible:ring-red-500' 
                        : 'border border-white/10 focus-visible:ring-[#00bc7d]'
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
            </div>

            {/* Captcha Field */}
            <div>
              <div className="space-y-1.5">
                <Label htmlFor="captcha" className="text-sm font-medium text-gray-300">Captcha</Label>
                <div className="grid grid-cols-[1fr_auto] gap-2">
                     <Input 
                        id="captcha"
                        placeholder="Enter captcha"
                        value={captcha}
                        onChange={(e) => { 
                          const sanitized = sanitizeTextInput(e.target.value.replace(/\s/g, ''));
                          setCaptcha(sanitized); 
                          clearError('captcha'); 
                        }}
                        disabled={isLoading}
                        className={`h-12 bg-[#0f151f] rounded-xl text-white placeholder:text-gray-500 focus-visible:ring-1 transition-all ${
                          errors.captcha 
                            ? 'border-red-500 border-2 focus-visible:ring-red-500' 
                            : 'border border-white/10 focus-visible:ring-[#00bc7d]'
                        }`}
                     />
                     <div className="flex gap-2">
                       <div
                         data-testid="captcha-display"
                         className="h-12 px-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white text-lg font-black italic tracking-widest select-none min-w-[100px]"
                       >
                           {captchaValue}
                       </div>
                       <button
                         type="button"
                         onClick={generateCaptcha}
                         disabled={isLoading}
                         className="h-12 w-12 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/50 rounded-xl flex items-center justify-center text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                         title="Refresh captcha"
                       >
                         <RefreshCw className="w-4 h-4" />
                       </button>
                     </div>
                </div>
                {errors.captcha && (
                  <p className="text-red-400 text-xs flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.captcha}
                  </p>
                )}
              </div>
            </div>

            {/* Referral Code Toggle */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setShowReferralCode((prev) => !prev)}
                className="w-full h-8 px-1 flex items-center justify-center gap-2 text-gray-200 hover:text-white transition-colors"
              >
                <span className="text-sm font-semibold">Got a Referral Code?</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showReferralCode ? 'rotate-180' : ''}`} />
              </button>
              {showReferralCode && (
                <Input
                  id="referralCode"
                  placeholder="Enter referral code"
                  value={referralCode}
                  onChange={(e) => setReferralCode(sanitizeTextInput(e.target.value).slice(0, 32))}
                  disabled={isLoading}
                  maxLength={32}
                  className="h-12 bg-[#0f151f] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-[#00bc7d]"
                />
              )}
            </div>

            {/* Terms & Conditions Checkboxes */}
            <div className="space-y-2 pt-1">
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
            </div>

            {/* Submit Button */}
            <div className="pt-2">
                <Button 
                    data-testid="register-submit"
                    type="submit"
                    disabled={isLoading}
                className="w-full h-12 bg-[#00ff88] hover:bg-[#00a870] text-black font-black text-base rounded-xl shadow-[0_0_20px_-5px_rgba(16,185,129,0.6)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Signing up...</span>
                        </div>
                    ) : (
                        'Sign Up'
                    )}
                </Button>
            </div>

            <div className="text-center text-xs text-gray-500 mt-4">
                Already have an account? <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-bold hover:underline">Log In</Link>
            </div>

          </form>
        </div>

      </motion.div>
    </div>
  );
}
