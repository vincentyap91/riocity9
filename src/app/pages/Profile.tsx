import React, { useState } from 'react';
import { ArrowLeft, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
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
  const [activeTab, setActiveTab] = useState<'personal' | 'address'>('personal');
  
  // Form state for Personal tab
  const [formData, setFormData] = useState({
    username: user?.username || 'Elon',
    email: user?.email || 'elonmusk@gmail.com',
    registrationDate: '08/01/2025',
    currency: 'MYR',
    fullName: 'Elon Musk',
    dateOfBirth: '08/01/1991',
    gender: 'Male',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    alert('Profile saved successfully!');
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden font-sans">
      {/* Background from Design */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#042f1f] via-[#031a15] to-[#02040a]"></div>
      
      {/* Decorative Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[10%] w-[60%] h-[60%] bg-[rgba(0,79,59,0.2)] rounded-full blur-[100px]"></div>
        <div className="absolute top-[10%] right-[10%] w-[60%] h-[60%] bg-[rgba(0,96,69,0.2)] rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-[1024px]">
        {/* Navigation Header (match screenshot: Settings left, My Profile centered) */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute left-0 flex items-center gap-3">
            <button
              onClick={() => navigate('/settings')}
              className="h-10 w-10 rounded-full bg-black/20 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Back to Settings"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <span className="text-white font-bold text-base">Settings</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-black/25 border border-white/10 flex items-center justify-center">
              <User className="w-5 h-5 text-white/90" />
            </div>
            <span className="text-white font-bold text-base">My Profile</span>
          </div>
        </div>

        {/* Main Content Card (centered, large, rounded like screenshot) */}
        <div className="bg-[#1a2230] rounded-[16px] shadow-xl border border-white/5 overflow-hidden">
          {/* Tabs (pill, centered) */}
          <div className="flex justify-center p-6 pb-4">
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
                Address
              </button>
            </div>
          </div>

          <div className="p-6 pt-4">
            {activeTab === 'personal' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {/* Left Column */}
                <div className="space-y-4">
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

                  {/* Right Column */}
                  <div className="space-y-4">
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
                        <SelectTrigger className="bg-[#0f151f] border-white/10 text-white h-12 rounded-xl px-4 focus:border-emerald-500 focus-visible:ring-emerald-500/20">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#131b29] border-white/10 text-white">
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center text-gray-400 py-12">
                  <p className="text-sm font-bold">Address information coming soon</p>
                </div>
              )}

              {/* Save Button (wide + glow, bottom centered) */}
              <div className="flex justify-center mt-8 pt-6 border-t border-white/10">
                <Button
                  onClick={handleSave}
                  className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-12 px-12 rounded-xl text-base shadow-[0_0_15px_-3px_rgba(16,185,129,0.4)] transition-all"
                >
                  Save
                </Button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
