import React, { useState } from 'react';
import { Eye, EyeOff, Check, AlertCircle, X, Gift, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// New Assets from design
import imgPromo from '@/assets/e9d8d4a61ac559bba1f577d68aca956ecbcccdee.png';
// I'll keep the existing assets imports just in case, but they seem to be replaced.

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaValue] = useState('3 9 0 0');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [agreeBonus, setAgreeBonus] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Validation errors
  const [errors, setErrors] = useState<{
    username?: string;
    mobile?: string;
    password?: string;
    captcha?: string;
    terms?: string;
    general?: string;
  }>({});
  
  const { login, error: authError } = useAuth();
  const navigate = useNavigate();

  // Validation function - simplified for anonymous auth
  // Form fields are optional for profile data collection
  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    // Only validate terms agreement (required)
    if (!agreeTerms) {
      newErrors.terms = 'You must agree to the Terms & Conditions';
    }
    
    // Optional: Validate captcha if you want to keep it
    if (!captcha.trim()) {
      newErrors.captcha = 'Captcha is required';
    } else if (captcha !== captchaValue.replace(/\s/g, '')) {
      newErrors.captcha = 'Invalid captcha code';
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
                // With anonymous auth, we just sign in anonymously
                // Form fields (username, mobile) can be collected for profile purposes but aren't required for auth
                await login();
                navigate('/');
              } catch (error) {
                console.error('Register error:', error);
                const errorMsg = error instanceof Error ? error.message : 'Registration failed';
                setErrors(prev => ({ ...prev, general: errorMsg }));
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
            
            {/* Mobile Number Field */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <div className="space-y-1.5">
                <Label htmlFor="mobile" className="text-sm font-medium text-gray-300">Mobile Number</Label>
                <div className="flex gap-2">
                  <div className={`h-11 bg-[#0f151f] rounded-xl flex items-center gap-2 px-3 min-w-[120px] text-gray-300 font-medium cursor-pointer hover:bg-white/5 transition-colors ${
                    errors.mobile ? 'border-red-500 border-2' : 'border border-white/10'
                  }`}>
                    <img 
                      src="https://flagcdn.com/w20/my.png" 
                      alt="Malaysia" 
                      className="w-5 h-4 object-cover rounded-sm"
                    />
                    <span className="text-sm font-bold text-white">+60</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
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

            {/* Captcha Field */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
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
                transition={{ duration: 0.3, delay: 0.7 }}
                className="pt-2"
            >
                <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold text-base rounded-xl shadow-[0px_10px_15px_-3px_rgba(97,95,255,0.2)] transition-all hover:translate-y-[-1px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Sign Up...' : 'Sign Up'}
                </Button>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.8 }}
                className="text-center text-xs text-gray-500 mt-4"
            >
                Already have an account? <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-bold hover:underline">Log In</Link>
            </motion.div>

          </form>
        </div>

      </motion.div>
    </div>
  );
}
