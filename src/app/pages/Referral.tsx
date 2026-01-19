import React, { useState } from 'react';
import { Copy, Users, DollarSign, Share2, ChevronDown, ChevronUp, ChevronRight, HelpCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

// Assets
import imgHeroBg from "@/assets/6a7a361241e7b1f30cd0c1a8abdeee75362715a0.png"; // Hero Image
import imgBgTexture from "@/assets/bf1b0ea3eb47f7c38ede69db9b93450b735daebc.png"; // Background Texture

// Icons (Simulated with Lucide where possible, or custom SVGs if needed)
// Using standard icons for clarity and performance unless specific assets are critical for the look (like the tiers).

const faqs = [
    {
        question: "How does our Referral Program work?",
        answer: "You can earn cash rewards up to three referral tiers when you refer your friends. Invite your friends to join together and be entitled for lifetime cash rewards each time your friends Deposit."
    },
    {
        question: "What Should You Do?",
        answer: "Simply share your referral link or code with friends. Once they register and start depositing/playing, you automatically start earning commissions based on their activity."
    }
];

const commissionRates = [
    {
        category: "Slots",
        items: [
            { provider: "Pragmatic Play Slot", l1: "0.99%", l2: "0.6%", l3: "0.4%" },
            { provider: "PGSOFT", l1: "0.7%", l2: "0.6%", l3: "0.4%" },
            { provider: "FaChai Slot", l1: "0.7%", l2: "0.6%", l3: "0.4%" },
        ]
    },
    { category: "Live Casino", items: [] },
    { category: "Fish Hunt", items: [] },
    { category: "Sports", items: [] },
    { category: "Lottery", items: [] },
    { category: "All", items: [] },
    { category: "E-Games", items: [] },
    { category: "Poker", items: [] },
    { category: "Crash", items: [] },
];

export function Referral() {
  return (
    <div className="flex flex-col min-h-screen bg-[#02040a] text-white relative overflow-hidden">
      
      {/* Global Background Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <img src={imgBgTexture} alt="texture" className="w-full h-full object-cover" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 pt-12 pb-20">
        <div className="container mx-auto max-w-[1200px] 2xl:max-w-[1536px] px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Text Content */}
                <div className="flex-1 text-center lg:text-left z-20">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                        <span className="block text-white">Invite Friends,</span>
                        <span className="block bg-gradient-to-r from-white to-[#efbb4b] bg-clip-text text-transparent">
                            Earn Passive Income!
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                        Invite your friends using your unique link or referral code,
                        and earn lifetime commissions from their deposits & bets.
                    </p>
                </div>

                {/* Hero Image */}
                <div className="flex-1 relative h-[400px] md:h-[500px] w-full">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-transparent z-10"></div>
                    <img src={imgHeroBg} alt="Referral Hero" className="w-full h-full object-contain lg:object-right mask-image-b-gradient" />
                </div>
            </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto max-w-[1200px] 2xl:max-w-[1536px] px-4 relative z-20 flex flex-col gap-16 md:gap-24 pb-24">
        
        {/* Referral Tools Section */}
        <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left: Code & Link & Socials */}
            <div className="flex-1 flex flex-col gap-6">
                
                {/* Code & Link Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Code */}
                    <div className="bg-[#1b1b1a] border border-white/10 rounded-xl p-4 flex flex-col gap-2">
                        <span className="text-[#d4c766] font-bold text-sm">My Referral Code</span>
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-mono text-white">589092</span>
                            <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white">
                                <Copy className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Link */}
                    <div className="bg-[#1b1b1a] border border-white/10 rounded-xl p-4 flex flex-col gap-2">
                        <span className="text-[#d4c766] font-bold text-sm">My Referral Link</span>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-300 truncate mr-2">https://staging.riocity9.com/en/reg...</span>
                            <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white shrink-0">
                                <Copy className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Social Share */}
                <div className="bg-[#1b1b1a] border border-white/10 rounded-xl p-4 flex items-center justify-between">
                    <span className="text-white font-bold">Share via social Media</span>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                            <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24"><path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" /></svg>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#2AABEE] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                            <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 8.8C16.49 10.38 15.82 14.22 15.48 15.66C15.34 16.27 15.06 16.47 14.79 16.5C14.2 16.56 13.75 16.11 13.18 15.74C12.29 15.16 11.78 14.79 10.92 14.22C9.92 13.56 10.57 13.2 11.14 12.61C11.29 12.46 13.85 10.13 13.9 9.92C13.91 9.89 13.91 9.78 13.84 9.72C13.77 9.66 13.67 9.68 13.59 9.7C12.56 10.34 7.27 13.67 6.2 14.12C5.68 14.33 5.23 14.33 4.85 14.22C4.43 14.09 3.64 13.87 3.05 13.68C2.33 13.45 2.87 13.06 3.37 12.86C6.1 11.79 11.27 9.66 13.43 8.76C15.42 7.93 16.94 7.57 16.64 8.8Z" /></svg>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                            <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382C17.312 14.302 16.519 13.912 16.371 13.852C16.223 13.792 16.115 13.762 16.007 13.922C15.899 14.082 15.589 14.442 15.495 14.552C15.401 14.662 15.307 14.672 15.147 14.592C14.987 14.512 14.473 14.344 13.864 13.801C13.385 13.374 13.062 12.847 12.968 12.687C12.874 12.527 12.958 12.44 13.038 12.361C13.11 12.29 13.198 12.176 13.278 12.083C13.358 11.99 13.388 11.92 13.442 11.81C13.496 11.7 13.469 11.61 13.429 11.53C13.389 11.45 13.079 10.688 12.951 10.378C12.822 10.078 12.695 10.118 12.607 10.118C12.525 10.118 12.431 10.118 12.337 10.118C12.243 10.118 12.091 10.153 11.963 10.293C11.835 10.433 11.472 10.773 11.472 11.463C11.472 12.153 11.975 12.82 12.043 12.91C12.111 13 13.037 14.43 14.457 15.044C15.632 15.553 15.872 15.473 16.128 15.45C16.384 15.426 16.953 15.113 17.071 14.787C17.189 14.461 17.189 14.182 17.154 14.123C17.119 14.065 17.026 14.03 17.472 14.382ZM12.049 2C6.527 2 2.049 6.478 2.049 12C2.049 13.766 2.508 15.429 3.324 16.906L2 22L7.23 20.65C8.654 21.465 10.292 21.933 12.049 21.933C17.571 21.933 22.049 17.455 22.049 11.933C22.049 6.411 17.571 2 12.049 2Z" /></svg>
                        </div>
                    </div>
                </div>

                {/* Steps Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Step 1 */}
                    <div className="relative bg-gradient-to-br from-[#333523] to-[#1b1f1d] rounded-xl p-6 border border-white/10 flex flex-col items-center gap-4 text-center overflow-hidden">
                        <div className="w-10 h-10 rounded-full bg-[#526647] flex items-center justify-center text-white font-bold text-lg mb-2 z-10">1</div>
                        <div className="w-12 h-12 flex items-center justify-center bg-yellow-500/20 rounded-full mb-2 z-10">
                            <Share2 className="w-6 h-6 text-yellow-500" />
                        </div>
                        <p className="font-bold text-sm z-10">Share your Link or<br/>Referral Code</p>
                    </div>

                    {/* Step 2 */}
                    <div className="relative bg-gradient-to-br from-[#333523] to-[#1b1f1d] rounded-xl p-6 border border-white/10 flex flex-col items-center gap-4 text-center overflow-hidden">
                        <div className="w-10 h-10 rounded-full bg-[#526647] flex items-center justify-center text-white font-bold text-lg mb-2 z-10">2</div>
                        <div className="w-12 h-12 flex items-center justify-center bg-yellow-500/20 rounded-full mb-2 z-10">
                            <Users className="w-6 h-6 text-yellow-500" />
                        </div>
                        <p className="font-bold text-sm z-10">Friends Registered<br/>Successfully</p>
                    </div>

                    {/* Step 3 */}
                    <div className="relative bg-gradient-to-br from-[#333523] to-[#1b1f1d] rounded-xl p-6 border border-white/10 flex flex-col items-center gap-4 text-center overflow-hidden">
                        <div className="w-10 h-10 rounded-full bg-[#526647] flex items-center justify-center text-white font-bold text-lg mb-2 z-10">3</div>
                        <div className="w-12 h-12 flex items-center justify-center bg-yellow-500/20 rounded-full mb-2 z-10">
                            <DollarSign className="w-6 h-6 text-yellow-500" />
                        </div>
                        <p className="font-bold text-sm z-10">Earn Bonus from<br/>Your Downlines</p>
                    </div>
                </div>

            </div>

            {/* Right: Bonus Dashboard */}
            <div className="w-full lg:w-[40%] bg-gradient-to-br from-[#181818] to-[#2b271e] rounded-xl p-6 border-2 border-[#343433] relative overflow-hidden flex flex-col justify-between">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-8 relative z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Referral <span className="text-[#78ac69]">Bonus</span></h2>
                    </div>
                    {/* Downlines Button */}
                    <button className="bg-gradient-to-r from-[#de9411] to-[#b87a0e] text-[#723e10] px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:brightness-110 transition-all shadow-lg">
                        Downlines <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="space-y-4 relative z-10">
                    <div className="bg-[#212020] border-b-2 border-[#343433] rounded-t-lg p-4">
                        <p className="text-white font-bold mb-1">Total Referral Commission Bonus</p>
                        <div className="flex items-baseline gap-2 text-[#d4c766]">
                            <span className="text-sm font-normal">PKR</span>
                            <span className="text-3xl font-bold">75,000</span>
                        </div>
                    </div>

                    <div className="bg-[#212020] border-b-2 border-[#343433] p-4">
                        <p className="text-white font-bold mb-1">Total Referral Deposit Bonus</p>
                        <div className="flex items-baseline gap-2 text-[#d4c766]">
                            <span className="text-sm font-normal">PKR</span>
                            <span className="text-3xl font-bold">875,000</span>
                        </div>
                    </div>
                </div>

                {/* Decorative Coins (Simulated) */}
                <div className="absolute right-[-20px] bottom-[-20px] opacity-20 pointer-events-none">
                    <div className="w-48 h-48 rounded-full bg-yellow-500 blur-[60px]"></div>
                </div>
            </div>
        </div>

        {/* Deposit Commission Rate - Tiers */}
        <div className="bg-[#1b1b1a] border-[3px] border-white/5 rounded-xl p-6 lg:p-10 relative overflow-hidden">
            <h2 className="text-3xl font-bold mb-2">Deposit Commission Rate</h2>
            <p className="text-[#d4c766] text-xl font-bold mb-12">Minimum Deposit PRK 30.00</p>

            {/* Steps Container */}
            <div className="flex flex-wrap items-end justify-center lg:justify-between gap-4 mt-8">
                
                {/* Tier 1 */}
                <div className="flex flex-col items-center w-[120px]">
                    <span className="font-bold text-xl mb-2">Tier 1</span>
                    <span className="text-[#d4c766] font-bold text-lg mb-2">PKR 2</span>
                    <div className="w-full h-[80px] bg-gradient-to-b from-[#456a3d] to-[#17211c] rounded-t-lg border-t border-x border-white/10 relative">
                        <div className="absolute bottom-0 w-full h-8 bg-[#1d201c] border-t border-white/10 flex items-center justify-center">
                            <span className="font-bold">3%</span>
                        </div>
                    </div>
                </div>

                {/* Tier 2 */}
                <div className="flex flex-col items-center w-[120px]">
                    <span className="font-bold text-xl mb-2">Tier 2</span>
                    <span className="text-[#d4c766] font-bold text-lg mb-2">3%</span>
                    <div className="w-full h-[110px] bg-gradient-to-b from-[#456a3d] to-[#17211c] rounded-t-lg border-t border-x border-white/10 relative">
                        <div className="absolute bottom-0 w-full h-12 bg-[#1d201c] border-t border-white/10 flex items-center justify-center">
                            <span className="font-bold">3%</span>
                        </div>
                    </div>
                </div>

                {/* Tier 3 */}
                <div className="flex flex-col items-center w-[120px]">
                    <span className="font-bold text-xl mb-2">Tier 3</span>
                    <span className="text-[#d4c766] font-bold text-lg mb-2">4%</span>
                    <div className="w-full h-[140px] bg-gradient-to-b from-[#456a3d] to-[#17211c] rounded-t-lg border-t border-x border-white/10 relative">
                        <div className="absolute bottom-0 w-full h-16 bg-[#1d201c] border-t border-white/10 flex items-center justify-center">
                            <span className="font-bold">4%</span>
                        </div>
                    </div>
                </div>

                {/* Tier 4 */}
                <div className="flex flex-col items-center w-[120px]">
                    <span className="font-bold text-xl mb-2">Tier 4</span>
                    <span className="text-[#d4c766] font-bold text-lg mb-2">PKR 5</span>
                    <div className="w-full h-[180px] bg-gradient-to-b from-[#456a3d] to-[#17211c] rounded-t-lg border-t border-x border-white/10 relative">
                        <div className="absolute bottom-0 w-full h-20 bg-[#1d201c] border-t border-white/10 flex items-center justify-center">
                            <span className="font-bold">7%</span>
                        </div>
                    </div>
                </div>

                {/* Tier 5 */}
                <div className="flex flex-col items-center w-[120px]">
                    <span className="font-bold text-xl mb-2">Tier 5</span>
                    <span className="text-[#d4c766] font-bold text-lg mb-2">PKR 6</span>
                    <div className="w-full h-[220px] bg-gradient-to-b from-[#456a3d] to-[#17211c] rounded-t-lg border-t border-x border-white/10 relative">
                        <div className="absolute bottom-0 w-full h-24 bg-[#1d201c] border-t border-white/10 flex items-center justify-center">
                            <span className="font-bold">7%</span>
                        </div>
                    </div>
                </div>

                {/* Tier 6 */}
                <div className="flex flex-col items-center w-[120px]">
                    <span className="font-bold text-xl mb-2">Tier 6</span>
                    <span className="text-[#d4c766] font-bold text-lg mb-2">7%</span>
                    <div className="w-full h-[260px] bg-gradient-to-b from-[#456a3d] to-[#17211c] rounded-t-lg border-t border-x border-white/10 relative">
                        <div className="absolute bottom-0 w-full h-28 bg-[#1d201c] border-t border-white/10 flex items-center justify-center">
                            <span className="font-bold">7%</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        {/* Gaming Commission Rate */}
        <div className="bg-[#1b1b1a] border-[3px] border-white/5 rounded-xl p-6 lg:p-10">
            <h2 className="text-3xl font-bold mb-4">Gaming Commission Rate</h2>
            <p className="text-gray-400 mb-8 text-lg">Listing of commission rates you earn from your downlines' bets by game type and provider.</p>

            <div className="bg-[#242424] rounded-xl overflow-hidden border border-white/5">
                <Accordion type="single" collapsible defaultValue="Slots" className="w-full">
                    {commissionRates.map((cat, idx) => (
                        <AccordionItem key={idx} value={cat.category} className="border-b border-white/5 last:border-0">
                            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-white/5 transition-colors">
                                <span className="text-lg font-bold">{cat.category}</span>
                            </AccordionTrigger>
                            <AccordionContent className="bg-[#1a1a1a] px-0 py-0">
                                {cat.items.length > 0 ? (
                                    <div className="w-full">
                                        {/* Table Header */}
                                        <div className="grid grid-cols-4 gap-4 px-6 py-3 border-b border-white/5 bg-[#2a2a2a] text-[#d4c766] font-bold text-sm text-center">
                                            <div className="text-left">Provider</div>
                                            <div>Downlines L1</div>
                                            <div>Downlines L2</div>
                                            <div>Downlines L3</div>
                                        </div>
                                        {/* Table Body */}
                                        {cat.items.map((item, i) => (
                                            <div key={i} className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-white/5 last:border-0 text-center text-sm font-medium hover:bg-white/5">
                                                <div className="text-left text-white">{item.provider}</div>
                                                <div className="text-white">{item.l1}</div>
                                                <div className="text-white">{item.l2}</div>
                                                <div className="text-white">{item.l3}</div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-6 text-center text-gray-500">No data available for this category yet.</div>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-[#1b1b1a] border-[3px] border-white/5 rounded-xl p-6 lg:p-10 mb-8">
            {/* FAQ Header */}
            <div className="flex items-center gap-4 mb-6">
                <div className="bg-[#222523] px-3 py-1 rounded border border-[#3b9c42] text-[#3b9c42] font-bold">FAQ</div>
                <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`} className="border border-white/10 rounded-lg bg-[#201f20] px-4">
                        <AccordionTrigger className="hover:no-underline text-left font-bold text-lg py-4">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-400 text-base pb-4">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>

      </div>
    </div>
  );
}
