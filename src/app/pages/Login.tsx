import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, X, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Dialog,
  DialogContent,
} from '../components/ui/dialog';
import { sanitizeTextInput, sanitizeUsername } from '../utils/security';

// Assets
import imgLoginPromo from '@/assets/7b5397e1e0b3ef00aac3ed749d986cb7304ad993.png';

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  
  // Validation errors
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    general?: string;
  }>({});
  
  const { login, error: authError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to home if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Validation function
  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    // Username validation
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.length < 2) {
      newErrors.username = 'Username must be at least 2 characters';
    } else if (username.length > 10) {
      newErrors.username = 'Username cannot exceed 10 characters';
    }
    
    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 2) {
      newErrors.password = 'Password must be at least 2 characters';
    } else if (password.length > 100) {
      newErrors.password = 'Password cannot exceed 100 characters';
    } else if (!/^[a-zA-Z0-9]+$/.test(password)) {
      newErrors.password = 'Password can only contain letters and numbers';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Clear error when user types
  const handleUsernameChange = (value: string) => {
    const sanitized = sanitizeUsername(value).slice(0, 10);
    setUsername(sanitized);
    if (errors.username) {
      setErrors(prev => ({ ...prev, username: undefined }));
    }
  };

  const handlePasswordChange = (value: string) => {
    const sanitized = sanitizeTextInput(value)
      .replace(/[^a-zA-Z0-9]/g, '')
      .slice(0, 100);
    setPassword(sanitized);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: undefined }));
    }
  };

  return (
    <div className="flex items-center justify-center py-[4%] font-sans text-white relative overflow-hidden bg-[#0a0f19]">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[rgba(89,22,139,0.2)] rounded-full blur-[150px]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[rgba(0,79,59,0.2)] rounded-full blur-[150px]"></div>
      </div>

      {/* Main Card Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl bg-[#131b29] rounded-3xl shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col md:flex-row border border-white/5"
      >
        
        {/* Close Button */}
        <Link to="/" className="absolute top-4 right-4 z-20 text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
        </Link>

        {/* Left Side - Promo (Image from design) */}
        <div className="w-full md:w-[50%] bg-[#4f46e5] relative overflow-hidden flex flex-col items-center justify-center p-8">
            <div className="absolute inset-0 z-0">
 
                 {/* Decorative background circle */}
                 <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.3 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="absolute h-[150%] w-[150%] left-[-25%] top-[-25%] rounded-full border-[60px] border-white/5 pointer-events-none"
                 ></motion.div>
            </div>
            
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute z-11 text-center top-12"
            >
                 <div className="mb-0">
                    <h2 className="text-4xl font-bold tracking-tight text-white mb-2">Join Us</h2>
                 </div>
                 <p className="text-white font-bold text-lg leading-tight max-w-xs mx-auto">
                     Play free Daily Spins for a chance to win one of the Jackpots!
                 </p>
            </motion.div>
            
            {/* Promo Image */}
            <div className="absolute z-10 w-full h-[100%] md:h-[100%] flex items-center justify-center">
                 <img 
                    src={imgLoginPromo} 
                    alt="Join Us" 
                    className="w-[120%] max-w-none h-full object-cover object-center"
                 />
            </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-[50%] bg-[#1a2230] p-8 md:p-12 flex flex-col justify-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 text-center md:text-left"
          >
              <h3 className="text-2xl font-black text-white">Log in</h3>
          </motion.div>

          <form 
            className="space-y-[10px]" 
            onSubmit={async (e) => {
              e.preventDefault();
              
              // Validate before submit
              if (!validateForm()) {
                return;
              }
              
              setIsLoading(true);
              setErrors({});
              try {
                await login(username, password);
                navigate('/');
              } catch (error) {
                console.error('Login error:', error);
                setErrors({ general: authError || 'Login failed. Please try again later.' });
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
            
            {/* Username */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="space-y-1.5"
            >
              <Label htmlFor="username" className="text-sm font-medium text-gray-300">Username</Label>
              <Input 
                id="username" 
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
                disabled={isLoading}
                maxLength={10}
                className={`h-12 bg-[#0f151f] rounded-xl text-white placeholder:text-gray-500 focus-visible:ring-1 transition-all text-sm px-4 shadow-sm ${
                  errors.username 
                    ? 'border-red-500 border-2 focus-visible:ring-red-500 focus-visible:border-red-500' 
                    : 'border border-white/10 focus-visible:ring-[#00bc7d] focus-visible:border-[#00bc7d]'
                }`}
              />
              {errors.username && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.username}
                </p>
              )}
            </motion.div>

            {/* Password */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="space-y-1.5"
            >
              <Label htmlFor="password" className="text-sm font-medium text-gray-300">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  disabled={isLoading}
                  maxLength={100}
                  className={`h-12 bg-[#0f151f] rounded-xl text-white placeholder:text-gray-500 focus-visible:ring-1 pr-12 transition-all text-sm px-4 shadow-sm ${
                    errors.password 
                      ? 'border-red-500 border-2 focus-visible:ring-red-500 focus-visible:border-red-500' 
                      : 'border border-white/10 focus-visible:ring-[#00bc7d] focus-visible:border-[#00bc7d]'
                  }`}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors disabled:opacity-50"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password}
                </p>
              )}
            </motion.div>

            {/* Remember Me */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="flex items-center space-x-2"
            >
                <label className="flex items-start gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      disabled={isLoading}
                      className="mt-0.5 w-4 h-4 rounded border-gray-600 bg-[#0f151f] text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0 disabled:opacity-50" 
                    />
                    <span className="text-sm font-bold text-[#4ADE80] group-hover:text-emerald-400 transition-colors cursor-pointer select-none">
                        Remember Me
                    </span>
                </label>
            </motion.div>

            {/* Buttons Row */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="grid grid-cols-2 gap-4 pt-2"
            >
                <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-[#00bc7d] hover:bg-[#00a870] text-black font-black text-base rounded-xl shadow-[0_0_20px_-5px_rgba(16,185,129,0.6)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Logging in...</span>
                        </div>
                    ) : (
                        'Log In'
                    )}
                </Button>
                <Button 
                    type="button"
                    variant="outline"
                    disabled={isLoading}
                    onClick={() => setShowForgotModal(true)}
                    className="w-full h-12 bg-transparent border-white/10 hover:bg-white/5 text-gray-300 hover:text-white font-bold text-base rounded-xl shadow-sm transition-transform  disabled:opacity-50"
                >
                    Forgot Password
                </Button>
            </motion.div>

            {/* Footer Link */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.7 }}
                className="text-center pt-4"
            >
                <span className="text-white text-sm md:text-sm mr-2">Do not have an account yet?</span>
                <Link to="/register" className="text-[#FDC700] hover:text-yellow-300 font-bold text-sm md:text-sm underline decoration-solid decoration-2 underline-offset-4 transition-colors">
                    Register Now!
                </Link>
            </motion.div>


          </form>
        </div>

      </motion.div>

      {/* Forgot Password Modal */}
      <Dialog open={showForgotModal} onOpenChange={setShowForgotModal}>
        <DialogContent className="bg-[#131b29] border border-white/10 rounded-3xl p-8 max-w-[400px] flex flex-col items-center text-center">
          {/* Header Icon */}
          <div className="mb-6 relative">
            <div className="w-20 h-20 rounded-full bg-[#00bc7d]/10 flex items-center justify-center border border-[#00bc7d]/20">
              <AlertCircle className="w-10 h-10 text-emerald-500" />
            </div>
            <div className="absolute inset-0 bg-[#00bc7d]/20 blur-2xl rounded-full -z-10"></div>
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
              className="h-12 bg-[#00bc7d] hover:bg-[#00a870] text-[#0a0f19] font-black text-base rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(0,188,125,0.2)]"
            >
              Contact Support Now
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowForgotModal(false)}
              className="h-12 text-gray-400 hover:text-white hover:bg-white/5 font-bold text-base rounded-xl transition-colors"
            >
              Maybe Later
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
