import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
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

// Assets
import imgLoginPromo from '@/assets/7b5397e1e0b3ef00aac3ed749d986cb7304ad993.png';

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  
  // Validation errors
  const [errors, setErrors] = useState<{
    general?: string;
  }>({});
  
  const { login, error: authError } = useAuth();
  const navigate = useNavigate();

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
                    <h2 className="text-4xl font-bold text-white drop-shadow-md mb-2">Join Us</h2>
                 </div>
                 <p className="text-white font-bold text-lg leading-tight max-w-xs mx-auto drop-shadow-sm">
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
              
              setIsLoading(true);
              setErrors({});
              try {
                await login();
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
            
            {/* Login Button */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="pt-2"
            >
                <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold text-base rounded-xl shadow-[0px_10px_15px_-3px_rgba(97,95,255,0.2)] transition-all hover:translate-y-[-1px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Signing in...' : 'Continue as Guest'}
                </Button>
            </motion.div>


          </form>
        </div>

      </motion.div>

    </div>
  );
}
