import React from 'react';
import { 
  User, 
  History, 
  Users, 
  Globe, 
  Lock, 
  ChevronRight, 
  Copy, 
  CreditCard, 
  ArrowRightLeft, 
  UsersRound,
  LogOut,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import avatarImage from '@/assets/0f3f46f95c98dde76fdee83e12826e9f278a1efe.png';
import imgBronze1 from "@/assets/711e7c00068ea0ecd513e2e0c1cc723c6de60e76.png";

export function Settings() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: User, label: 'My Profile', path: '/profile' },
    { icon: CreditCard, label: 'Deposit', path: '/deposit' },
    { icon: ArrowRightLeft, label: 'Withdrawal', path: '/withdrawal' },
    { icon: History, label: 'History Record', path: '/history' },
    { icon: Users, label: 'Referral', path: '/referral' },
    { icon: UsersRound, label: 'Downlines', path: '/downlines' },
    { icon: Globe, label: 'Change Language', path: '/language' },
    { icon: Lock, label: 'Change Password', path: '/security' },
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden font-sans">
      {/* Background from Design */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#042f1f] via-[#031a15] to-[#02040a]"></div>
      
      {/* Decorative Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
         <div className="absolute top-[-20%] left-[10%] w-[60%] h-[60%] bg-[rgba(0,79,59,0.2)] rounded-full blur-[100px]"></div>
         <div className="absolute top-[10%] right-[10%] w-[60%] h-[60%] bg-[rgba(0,96,69,0.2)] rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-[640px]">
        
        {/* User Profile Header Card */}
        <div className="bg-gradient-to-b from-[#1a2230] to-[#131b29] rounded-[16px] p-6 mb-4 shadow-xl border border-white/5 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Avatar Section */}
            <div className="relative shrink-0">
               <div className="w-24 h-24 rounded-full border-2 border-[#D4AF37] p-1 shadow-[0_0_15px_-3px_rgba(212,175,55,0.3)] bg-black/40 relative z-10">
                 <img 
                   src={imgBronze1} 
                   alt="Bronze Badge" 
                   className="w-full h-full object-cover rounded-full"
                 />
               </div>
               {/* User Avatar Overlay or separate? The design shows 'bronze 1' image in a circle. I'll use that. */}
            </div>

            {/* User Info Section */}
            <div className="flex-1 flex flex-col justify-center space-y-3 w-full">
              <div className="flex flex-wrap items-center justify-between sm:justify-start gap-x-4 gap-y-1">
                <h2 className="text-2xl font-black text-white tracking-tight">{user?.username || 'Guest'}</h2>
                <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full border border-white/5">
                   <span className="text-xs text-gray-400 font-mono tracking-wide">880123456789</span>
                   <button className="text-gray-500 hover:text-white transition-colors">
                     <Copy className="w-3 h-3" />
                   </button>
                </div>
              </div>

              {/* VIP Status */}
              <div className="space-y-2">
                 <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-[#CD7F32]">Bronze</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                        Deposit <span className="text-[#FFD700] font-bold">3,682</span> to become <span className="text-gray-300 font-bold">Silver!</span>
                    </span>
                 </div>
                 {/* Custom Progress Bar */}
                 <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full w-[8%] bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-[#1a2230] border border-white/5 rounded-[16px] p-6 mb-6 flex items-center justify-between gap-4 shadow-lg h-[110px]">
            <div className="flex flex-col justify-center h-full">
                <div className="text-sm font-bold text-[#00bc7d] mb-1 uppercase tracking-wider">Total Balance</div>
                <div className="flex items-start text-white">
                    <span className="text-2xl font-black mr-1 mt-1">$</span>
                    <span className="text-3xl font-black tracking-tight">980.69</span>
                </div>
            </div>
            <Button 
                onClick={() => navigate('/deposit')} 
                className="bg-[#00ff88] hover:bg-[#00dd76] text-black font-black text-base rounded-[14px] px-8 h-12 shadow-[0_0_20px_-5px_rgba(0,255,136,0.3)] transition-all hover:scale-105"
            >
                Deposit
            </Button>
        </div>

        {/* Menu List */}
        <div className="bg-[#1a2230] rounded-[16px] overflow-hidden shadow-lg border border-white/5">
            <div className="flex flex-col">
                {menuItems.map((item, index) => (
                    <button 
                        key={index}
                        className="flex items-center justify-between px-6 py-5 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 group w-full text-left"
                        onClick={() => navigate(item.path)}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-[10px] bg-black/40 flex items-center justify-center text-[#99A1AF] group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-all">
                                <item.icon className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-[#e5e7eb] group-hover:text-white transition-colors text-base">{item.label}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-[#4A5565] group-hover:text-emerald-500 transition-colors" />
                    </button>
                ))}
            </div>
        </div>

        {/* Logout Button (Floating or at bottom) */}
        <div className="flex justify-center mt-8">
            <Button 
                variant="outline" 
                onClick={() => {
                    logout();
                    navigate('/');
                }}
                className="gap-2 border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white w-48 h-12 rounded-[14px] font-bold transition-all"
            >
                <LogOut className="w-4 h-4" />
                Logout
            </Button>
        </div>

      </div>
    </div>
  );
}
