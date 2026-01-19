import React, { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Assets
import imgLoginPromo from '@/assets/7b5397e1e0b3ef00aac3ed749d986cb7304ad993.png';

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans text-white relative overflow-hidden bg-[#0a0f19]">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[rgba(89,22,139,0.2)] rounded-full blur-[150px]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[rgba(0,79,59,0.2)] rounded-full blur-[150px]"></div>
      </div>

      {/* Main Card Container */}
      <div className="relative z-10 w-full max-w-5xl bg-[#131b29] rounded-3xl shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col md:flex-row border border-white/5">
        
        {/* Close Button */}
        <Link to="/" className="absolute top-4 right-4 z-20 text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
        </Link>

        {/* Left Side - Promo (Image from design) */}
        <div className="w-full md:w-[50%] bg-[#4f46e5] relative overflow-hidden flex flex-col items-center justify-center p-8">
            <div className="absolute inset-0 z-0">
 
                 {/* Decorative background circle */}
                 <div className="absolute h-[150%] w-[150%] left-[-25%] top-[-25%] opacity-30 rounded-full border-[60px] border-white/5 pointer-events-none"></div>
            </div>
            
            <div className="absolute z-11 text-center top-12">
                 <div className="mb-0">
                    <h2 className="text-5xl font-black text-white drop-shadow-md">Join Us</h2>
                 </div>
                 <p className="text-white font-bold text-lg leading-tight max-w-xs mx-auto drop-shadow-sm">
                     Play free Daily Spins for a chance to win one of the Jackpots!
                 </p>
            </div>
            
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
          
          <div className="mb-8 text-center md:text-left">
              <h3 className="text-2xl font-black text-white">Log in</h3>
          </div>

          <form 
            className="space-y-6" 
            onSubmit={async (e) => {
              e.preventDefault();
              setIsLoading(true);
              try {
                const success = await login(username, password);
                if (success) {
                  navigate('/');
                }
              } catch (error) {
                console.error('Login error:', error);
                alert('登录失败，请稍后重试');
              } finally {
                setIsLoading(false);
              }
            }}
          >
            
            {/* Username */}
            <div className="space-y-2 relative">
              <Input 
                id="username" 
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                className="h-12 bg-[#0f151f] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 transition-all text-sm px-4 shadow-sm" 
              />
              <Label htmlFor="username" className="absolute -top-6 left-0 text-[#6a7282] text-sm hidden">Enter Username</Label>
            </div>

            {/* Password */}
            <div className="space-y-2 relative">
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="h-12 bg-[#0f151f] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 pr-12 transition-all text-sm px-4 shadow-sm" 
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
               <Label htmlFor="password" className="absolute -top-6 left-0 text-[#6a7282] text-sm hidden">Enter Password</Label>
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2">
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
            </div>

            {/* Buttons Row */}
            <div className="grid grid-cols-2 gap-4 pt-2">
                <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold text-lg rounded-xl shadow-[0px_10px_15px_-3px_rgba(97,95,255,0.2)] transition-all hover:translate-y-[-1px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? '登录中...' : 'Log In'}
                </Button>
                <Button 
                    type="button"
                    variant="outline"
                    disabled={isLoading}
                    className="w-full h-14 bg-transparent border-white/10 hover:bg-white/5 text-gray-300 hover:text-white font-bold text-lg rounded-xl shadow-sm transition-transform hover:scale-[1.02] disabled:opacity-50"
                >
                    Forgot Password
                </Button>
            </div>

            {/* Footer Link */}
            <div className="text-center pt-4">
                <span className="text-white font-bold text-sm md:text-base mr-2">Do not have an account yet?</span>
                <Link to="/register" className="text-[#FDC700] hover:text-yellow-300 font-bold text-sm md:text-base underline decoration-solid decoration-2 underline-offset-4 transition-colors">
                    Register Now!
                </Link>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
