import React, { useState } from 'react';
import { Eye, EyeOff, X, Gift } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

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
  const { register } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans text-white relative overflow-hidden bg-[#0a0f19]">
      {/* Background Ambience (matched to design) */}
      <div className="absolute inset-0 z-0">
          {/* Top Left Green/Purple mix */}
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[rgba(0,79,59,0.3)] rounded-full blur-[150px]"></div>
          {/* Bottom Right Green/Purple mix */}
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[rgba(0,79,59,0.3)] rounded-full blur-[150px]"></div>
      </div>

      {/* Main Card Container */}
      <div className="relative z-10 w-full max-w-5xl bg-[#131b29] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/5">
        
        {/* Close Button */}
        <Link to="/" className="absolute top-4 right-4 z-20 text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
        </Link>

        {/* Left Side - Promo (Design from RiocityNewTemplate) */}
        <div className="w-full md:w-[45%] bg-gradient-to-b from-[#062d1b] to-[#026d2f] relative overflow-hidden flex flex-col p-8 md:p-12">
            {/* Background Image/Gradient Layers */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>
            
            {/* Yellow Star Icon (Top Left) */}
            <div className="relative z-20 mb-12">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FFDF20]">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>

            {/* Exclusive Bonus Offer Badge */}
            <div className="relative z-10 self-start bg-white/10 border border-white/20 rounded-full px-4 py-1.5 backdrop-blur-md mb-6">
                <div className="flex items-center gap-2">
                    <Gift className="w-3 h-3 text-white" />
                    <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-wider">Exclusive Bonus Offer</span>
                </div>
            </div>

            <div className="relative z-10 space-y-2 mb-8 text-left">
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
            </div>
            
            {/* Main Image (Bottom Right) */}
            <div className="absolute right-[-5%] bottom-[0%] w-[100%] h-[100%] pointer-events-none z-0">
                 <img src={imgPromo} alt="Promo" className="w-full h-full object-contain object-bottom" />
            </div>

            {/* Decorative Floating Coins/Elements (Adjusted position) */}
            <div className="absolute bottom-20 left-10 opacity-80 pointer-events-none">
                 {/* Dice or other elements can go here if needed, keeping it clean for now as image has them */}
            </div>

        </div>

        {/* Right Side - Register Form */}
        <div className="w-full md:w-[55%] bg-[#1a2230] p-6 md:p-10 flex flex-col justify-center">
          
          <div className="mb-6 text-center md:text-left">
              <h3 className="text-xl font-bold text-white">Sign up to RioCity9</h3>
          </div>

          <form 
            className="space-y-4" 
            onSubmit={async (e) => {
              e.preventDefault();
              
              // 验证 Captcha
              if (captcha !== captchaValue.replace(/\s/g, '')) {
                alert('验证码错误，请重新输入');
                return;
              }

              // 验证同意条款
              if (!agreeTerms) {
                alert('请同意条款和隐私政策');
                return;
              }

              setIsLoading(true);
              try {
                const success = await register(username, password, mobile, referralCode);
                if (success) {
                  navigate('/');
                }
              } catch (error) {
                console.error('Register error:', error);
                alert('注册失败，请稍后重试');
              } finally {
                setIsLoading(false);
              }
            }}
          >
            
            {/* Username */}
            <div className="space-y-1.5 relative">
              <Input 
                id="username" 
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                className="h-11 bg-[#0f151f] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 transition-all pl-4" 
              />
              <Label htmlFor="username" className="absolute -top-6 left-0 text-[#6a7282] text-sm hidden">Username</Label>
            </div>

            {/* Mobile Number */}
            <div className="space-y-1.5">
              <div className="flex gap-2">
                <div className="h-11 bg-[#0f151f] border border-white/10 rounded-xl flex items-center px-3 min-w-[70px] text-gray-300 font-medium justify-between cursor-pointer hover:bg-white/5 transition-colors">
                   <span className="text-sm">+60</span>
                </div>
                <div className="flex-1 relative">
                    <Input 
                    id="mobile" 
                    placeholder="Mobile Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    disabled={isLoading}
                    className="h-11 bg-[#0f151f] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 flex-1 transition-all" 
                    />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="h-11 bg-[#0f151f] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 pr-10 transition-all" 
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
            </div>

            {/* Referral Code (Optional) */}
            <div className="space-y-1.5">
              <Input 
                id="referral" 
                placeholder="Referral Code (Optional)"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                disabled={isLoading}
                className="h-11 bg-[#0f151f] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 transition-all" 
              />
            </div>

            {/* Captcha */}
            <div className="grid grid-cols-[1fr_auto] gap-2">
                 <Input 
                    placeholder="Captcha"
                    value={captcha}
                    onChange={(e) => setCaptcha(e.target.value.replace(/\s/g, ''))}
                    disabled={isLoading}
                    className="h-11 bg-[#0f151f] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 transition-all"
                 />
                 <div className="h-11 px-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white text-lg font-black italic tracking-widest select-none min-w-[100px]">
                     {captchaValue}
                 </div>
            </div>

            {/* Terms & Conditions Checkboxes */}
            <div className="space-y-2 pt-1">
                <label className="flex items-start gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      disabled={isLoading}
                      className="mt-1 w-4 h-4 rounded border-gray-600 bg-[#0f151f] text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0 disabled:opacity-50" 
                    />
                    <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                        I agree to the <span className="font-bold text-gray-300">Terms & Conditions</span> and <span className="font-bold text-gray-300">Privacy Policy</span>
                    </span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={agreeBonus}
                      onChange={(e) => setAgreeBonus(e.target.checked)}
                      disabled={isLoading}
                      className="mt-1 w-4 h-4 rounded border-gray-600 bg-[#0f151f] text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0 disabled:opacity-50" 
                    />
                    <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                        I want to receive free bonuses every week. 🔥💰
                    </span>
                </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
                <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold text-base rounded-xl shadow-[0px_10px_15px_-3px_rgba(97,95,255,0.2)] transition-all hover:translate-y-[-1px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? '注册中...' : 'Sign Up'}
                </Button>
            </div>

            {/* Divider */}
            <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#1a2230] px-2 text-gray-500">or</span>
                </div>
            </div>

            {/* Social / WhatsApp Register */}
            <Button 
                variant="outline"
                className="w-full h-12 bg-[rgba(37,211,102,0.1)] border-[rgba(37,211,102,0.3)] hover:bg-[rgba(37,211,102,0.2)] text-[#25d366] hover:text-[#25d366] font-bold text-sm rounded-xl border-solid transition-all flex items-center justify-center gap-2"
            >
                 <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                 </svg>
                 Continue with WhatsApp
            </Button>

            <div className="text-center text-xs text-gray-500 mt-4">
                Already have an account? <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-bold hover:underline">Log In</Link>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
