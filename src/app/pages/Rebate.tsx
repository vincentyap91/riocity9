import React from 'react';
import { Gamepad2, Dices, Trophy, Fish, Ticket, Zap, Club, Monitor } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Button } from '../components/ui/button';

// Rebate data based on screenshot
const rebateCategories = [
  {
    category: "Slots",
    icon: Gamepad2,
    items: [
      { provider: "Pragmatic Play Slot", rebate: "3%" },
      { provider: "PGSoft", rebate: "5%" },
      { provider: "FaChal Slot", rebate: "5%" },
      { provider: "PlayTech Slots", rebate: "0%" },
      { provider: "RedTiger", rebate: "5%" },
      { provider: "CrowdPlay", rebate: "5%" },
      { provider: "888King", rebate: "5%" },
      { provider: "Wazdan", rebate: "5%" },
      { provider: "EVO888", rebate: "5%" },
      { provider: "Nextspin", rebate: "5%" },
      { provider: "KA Gaming Slot", rebate: "5%" },
      { provider: "Booongo", rebate: "5%" },
      { provider: "RichGaming", rebate: "5%" },
      { provider: "Funky Games", rebate: "5%" },
      { provider: "FastSpin Slots", rebate: "5%" },
      { provider: "AFB Gaming Slot", rebate: "5%" },
      { provider: "AdvantPlay", rebate: "5%" },
      { provider: "Hacksaw", rebate: "5%" },
      { provider: "Mario Club Slot", rebate: "5%" },
      { provider: "VPowerSlot", rebate: "5%" },
      { provider: "Q Tech Games", rebate: "5%" },
      { provider: "Joker Slot", rebate: "5%" },
      { provider: "Push Gaming", rebate: "5%" },
      { provider: "NetEnt", rebate: "5%" },
      { provider: "No Limit City", rebate: "5%" },
      { provider: "Play'n Go", rebate: "5%" },
      { provider: "Big Time Gaming", rebate: "5%" },
      { provider: "Apollo Games", rebate: "5%" },
      { provider: "Pegasus", rebate: "5%" },
      { provider: "GM", rebate: "5%" },
      { provider: "JILI Slot", rebate: "9%" },
      { provider: "LGD Gaming", rebate: "5%" },
      { provider: "Rich 88", rebate: "5%" },
      { provider: "CQ9 Slot", rebate: "5%" },
      { provider: "JDB Slot", rebate: "5%" },
      { provider: "Play Star", rebate: "5%" },
      { provider: "Spade Gaming Slot", rebate: "5%" },
      { provider: "King Maker Slot", rebate: "5%" },
      { provider: "Mega888 H5", rebate: "5%" },
      { provider: "Micro Gaming Slot", rebate: "5%" },
      { provider: "AceWin", rebate: "5%" },
      { provider: "Live22", rebate: "5%" },
      { provider: "ILOVEU Gaming", rebate: "5%" },
      { provider: "Dragoon Soft", rebate: "5%" },
      { provider: "EpicWin", rebate: "5%" },
      { provider: "BigPot Gaming", rebate: "5%" },
      { provider: "UU Slots", rebate: "5%" },
      { provider: "918Kiss H5", rebate: "5%" },
      { provider: "Booongo", rebate: "5%" },
      { provider: "Ameba", rebate: "5%" },
      { provider: "Habanero Slots", rebate: "5%" },
      { provider: "NAGA Game Slots", rebate: "5%" },
      { provider: "918Kiss", rebate: "5%" },
      { provider: "BT Gaming", rebate: "1%" },
      { provider: "Clot Play", rebate: "0%" },
      { provider: "VPlus", rebate: "0%" },
      { provider: "918 Kaya", rebate: "0%" },
      { provider: "Pussy888", rebate: "1.95%" },
      { provider: "Mega888", rebate: "0%" },
      { provider: "GamePlay Slot", rebate: "0%" },
      { provider: "Wow Gaming", rebate: "0%" },
    ]
  },
  { category: "Live Casino", icon: Dices, items: [] },
  { category: "Fish Hunt", icon: Fish, items: [] },
  { category: "Sports", icon: Trophy, items: [] },
  { category: "Lottery", icon: Ticket, items: [] },
  { category: "All", icon: Gamepad2, items: [] },
  { category: "E-Games", icon: Monitor, items: [] },
  { category: "Poker", icon: Club, items: [] },
  { category: "Crash", icon: Zap, items: [] },
];

export function Rebate() {
  return (
    <div className="flex flex-col min-h-screen text-white relative overflow-hidden pb-20 md:pb-0">
      {/* Background from Settings */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#042f1f] via-[#031a15] to-[#02040a]"></div>
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto max-w-[1200px] 2xl:max-w-[1536px] px-4 py-6 md:py-12">
        
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Rebate System</h1>
          
          {/* Claimable Rebate Card */}
          <div className="bg-[#1a2230] rounded-[16px] p-5 border border-white/5 shadow-xl flex items-center justify-between mb-6">
            <div>
              <span className="text-gray-300 text-sm mb-1 block">Claimable Rebate</span>
              <div className="flex items-center">
                <span className="text-[#d4c766] text-sm mr-2">PKR</span>
                <span className="text-[#d4c766] text-2xl font-bold">13.246</span>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-[#f1c24f] to-[#d59b25] text-[#5c3a00] px-6 py-2.5 rounded-lg font-bold text-base hover:brightness-110 transition-all shadow-[0_4px_15px_rgba(212,165,33,0.35)]">
              Claim Now
            </Button>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.6fr] gap-8">
          
          {/* Left Column */}
          <div className="space-y-4 md:space-y-6">
            
            {/* My Rebate & Sales */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">My Rebate & Sales</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#1a2230] border border-white/5 rounded-[16px] p-6 shadow-xl">
                  <p className="text-gray-300 text-sm mb-1">Total Lifetime Rebate</p>
                  <div className="flex items-center">
                    <span className="text-[#d4c766] text-sm mr-2">PKR</span>
                    <span className="text-[#d4c766] text-2xl font-bold">10.743</span>
                  </div>
                </div>
                <div className="bg-[#1a2230] border border-white/5 rounded-[16px] p-6 shadow-xl">
                  <p className="text-gray-300 text-sm mb-1">My Individual Sales</p>
                  <div className="flex items-center">
                    <span className="text-[#d4c766] text-sm mr-2">PKR</span>
                    <span className="text-[#d4c766] text-2xl font-bold">2,081.910</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Guaranteed Rebate */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Guaranteed Rebate</h2>
              
              <div className="bg-[#1a2230] border border-white/5 rounded-[16px] p-8 shadow-xl">
                <div className="flex flex-col gap-4">
                  <Accordion type="single" collapsible defaultValue="Slots" className="w-full">
                    {rebateCategories.map((cat, idx) => {
                      const IconComponent = cat.icon;
                      return (
                        <AccordionItem key={idx} value={cat.category} className="!border-b-0 border border-white/10 rounded-md overflow-hidden bg-[#0f151f] mb-4 last:mb-0">
                          <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-white/5 transition-colors text-white bg-[#1d2d49] [&>svg]:text-white">
                            <div className="flex items-center gap-3">
                              <IconComponent className="w-5 h-5 text-[#d4c766]" />
                              <span className="text-lg font-bold">{cat.category}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="bg-[#0f151f] px-0 py-0">
                            {cat.items.length > 0 ? (
                              <div className="w-full">
                                {/* Table Header */}
                                <div className="grid grid-cols-2 gap-4 px-6 py-3 border-b border-[#d4c766] bg-[#131b29] text-[#d4c766] font-bold text-sm">
                                  <div className="text-center">Provider</div>
                                  <div className="text-center">Rebate</div>
                                </div>
                                {/* Table Body */}
                                {cat.items.map((item, i) => (
                                  <div key={i} className="grid grid-cols-2 gap-4 px-6 py-4 border-b border-white/10 last:border-0 text-sm font-medium text-white hover:bg-white/5">
                                    <div className="text-center">{item.provider}</div>
                                    <div className="text-center">{item.rebate}</div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="p-6 text-center text-gray-500">No data available for this category yet.</div>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Illustration */}
          <div className="hidden lg:block relative">
            <div className="sticky top-8">
              <div className="relative w-full h-[600px] rounded-xl overflow-hidden">
                <img 
                  src="https://staging.riocity9.com/static/media/rebate-img.535f6983.png" 
                  alt="Rebate Illustration" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
