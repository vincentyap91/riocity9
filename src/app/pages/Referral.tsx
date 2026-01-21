import React from 'react';
import { Copy, Users, ChevronRight, Info, Link2, DollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

// Assets
const imgHeroBg = "/src/assets/referral-bg.jpg";

const commissionRates = [
    {
        category: "Slots",
        items: [
            { provider: "Pragmatic Play Slot", l1: "0.99", l2: "0.6", l3: "0.4" },
            { provider: "PGSOFT", l1: "0.7", l2: "0.6", l3: "0.4" },
            { provider: "FaChai Slot", l1: "0.7", l2: "0.6", l3: "0.4" },
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

export function Referral() {
  return (
    <div className="flex flex-col min-h-screen bg-[#02040a] text-white relative overflow-hidden pb-20 md:pb-0">
      
      {/* Hero Section with Form & Total Earnings */}
      <div className="relative pb-14" style={{ paddingTop: `clamp(8%, 100vw, 6%)` }}>
        <div className="absolute inset-0">
          <img
            src={imgHeroBg}
            alt="Referral Hero Background"
            className="w-full h-full object-cover object-top"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1510]/40 via-transparent to-[#02040a]"></div>
        </div>
        <div className="container mx-auto max-w-[1200px] 2xl:max-w-[1536px] px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-end">
            
            {/* Left: Title & Form */}
            <div className="space-y-6">
              {/* Title */}
              <div className="space-y-3">
                <h1 className="text-[32px] md:text-[48px] font-bold leading-tight tracking-tight">
                  <span className="block text-white">Invite Friends,</span>
                  <span className="block bg-gradient-to-r from-[#f7e08b] to-[#eab84b] bg-clip-text text-transparent">
                    Earn Passive Income!
                  </span>
                </h1>
                <p className="text-[13px] md:text-sm text-white/80 leading-relaxed max-w-lg">
                  Invite your friends using your unique link or referral code,<br className="hidden md:block" />
                  and earn lifetime commissions from their deposits & bets.
                </p>
              </div>

              {/* Referral Code & Link - Single Row */}
              <div className="bg-gradient-to-r from-[#1c221d] to-[#121612] border border-[#2f362f] rounded-xl inline-flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#2f362f] shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
                {/* My Referral Code */}
                <div className="flex items-center gap-3 px-5 py-3.5">
                  <span className="text-[11px] font-bold text-[#d4c766] uppercase tracking-wider">My Referral Code</span>
                  <span className="text-white font-mono font-bold text-sm">589092</span>
                  <button className="w-6 h-6 rounded bg-[#2a302c] text-white/70 flex items-center justify-center hover:text-white transition-colors">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                {/* My Referral Link */}
                <div className="flex items-center gap-3 px-5 py-3.5">
                  <span className="text-[11px] font-bold text-[#d4c766] uppercase tracking-wider">My Referral Link</span>
                  <span className="text-white/70 text-[11px] truncate max-w-[120px] md:max-w-[180px]">https://staging.riocity9.co...</span>
                  <button className="w-6 h-6 rounded bg-[#2a302c] text-white/70 flex items-center justify-center hover:text-white transition-colors">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Share via social Media */}
              <div className="flex items-center gap-3 py-1">
                <span className="text-white/80 text-[11px] font-bold uppercase tracking-wide">Share via social Media</span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#1877F2] flex items-center justify-center cursor-pointer hover:brightness-110 transition-all">
                    <svg className="w-3.5 h-3.5 text-white fill-current" viewBox="0 0 24 24"><path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" /></svg>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#2AABEE] flex items-center justify-center cursor-pointer hover:brightness-110 transition-all">
                    <svg className="w-3.5 h-3.5 text-white fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 8.8C16.49 10.38 15.82 14.22 15.48 15.66C15.34 16.27 15.06 16.47 14.79 16.5C14.2 16.56 13.75 16.11 13.18 15.74C12.29 15.16 11.78 14.79 10.92 14.22C9.92 13.56 10.57 13.2 11.14 12.61C11.29 12.46 13.85 10.13 13.9 9.92C13.91 9.89 13.91 9.78 13.84 9.72C13.77 9.66 13.67 9.68 13.59 9.7C12.56 10.34 7.27 13.67 6.2 14.12C5.68 14.33 5.23 14.33 4.85 14.22C4.43 14.09 3.64 13.87 3.05 13.68C2.33 13.45 2.87 13.06 3.37 12.86C6.1 11.79 11.27 9.66 13.43 8.76C15.42 7.93 16.94 7.57 16.64 8.8Z" /></svg>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center cursor-pointer hover:brightness-110 transition-all">
                    <svg className="w-3.5 h-3.5 text-white fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382C17.312 14.302 16.519 13.912 16.371 13.852C16.223 13.792 16.115 13.762 16.007 13.922C15.899 14.082 15.589 14.442 15.495 14.552C15.401 14.662 15.307 14.672 15.147 14.592C14.987 14.512 14.473 14.344 13.864 13.801C13.385 13.374 13.062 12.847 12.968 12.687C12.874 12.527 12.958 12.44 13.038 12.361C13.11 12.29 13.198 12.176 13.278 12.083C13.358 11.99 13.388 11.92 13.442 11.81C13.496 11.7 13.469 11.61 13.429 11.53C13.389 11.45 13.079 10.688 12.951 10.378C12.822 10.078 12.695 10.118 12.607 10.118C12.525 10.118 12.431 10.118 12.337 10.118C12.243 10.118 12.091 10.153 11.963 10.293C11.835 10.433 11.472 10.773 11.472 11.463C11.472 12.153 11.975 12.82 12.043 12.91C12.111 13 13.037 14.43 14.457 15.044C15.632 15.553 15.872 15.473 16.128 15.45C16.384 15.426 16.953 15.113 17.071 14.787C17.189 14.461 17.189 14.182 17.154 14.123C17.119 14.065 17.026 14.03 17.472 14.382ZM12.049 2C6.527 2 2.049 6.478 2.049 12C2.049 13.766 2.508 15.429 3.324 16.906L2 22L7.23 20.65C8.654 21.465 10.292 21.933 12.049 21.933C17.571 21.933 22.049 17.455 22.049 11.933C22.049 6.411 17.571 2 12.049 2Z" /></svg>
                  </div>
                </div>
              </div>

              {/* Steps in Hero */}
              <div className="space-y-5 pt-2">
                <h2 className="text-xl md:text-[22px] font-bold text-white tracking-tight">Invite Your Friends to Earn Passive Income</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Step 1 */}
                  <div className="relative bg-gradient-to-br from-[#1f251f] to-[#141916] rounded-xl p-6 border border-[#2f362f] flex flex-col items-center justify-center min-h-[160px] shadow-[0_6px_20px_rgba(0,0,0,0.35)]">
                    <div className="absolute left-3 top-3 w-6 h-6 rounded-full bg-[#3a453b] text-white/80 text-[11px] font-bold flex items-center justify-center">1</div>
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-[#d4a521] flex items-center justify-center shadow-[0_0_18px_rgba(212,165,33,0.35)]">
                        <Link2 className="w-5 h-5 text-[#1a1a1a]" />
                      </div>
                      <p className="text-[12px] font-semibold leading-tight text-white/90">Share your Link or<br/>Referral Code</p>
                    </div>
                  </div>
                  {/* Step 2 */}
                  <div className="relative bg-gradient-to-br from-[#1f251f] to-[#141916] rounded-xl p-6 border border-[#2f362f] flex flex-col items-center justify-center min-h-[160px] shadow-[0_6px_20px_rgba(0,0,0,0.35)]">
                    <div className="absolute left-3 top-3 w-6 h-6 rounded-full bg-[#3a453b] text-white/80 text-[11px] font-bold flex items-center justify-center">2</div>
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-[#d4a521] flex items-center justify-center shadow-[0_0_18px_rgba(212,165,33,0.35)]">
                        <Users className="w-5 h-5 text-[#1a1a1a]" />
                      </div>
                      <p className="text-[12px] font-semibold leading-tight text-white/90">Friends Registered<br/>Successfully</p>
                    </div>
                  </div>
                  {/* Step 3 */}
                  <div className="relative bg-gradient-to-br from-[#1f251f] to-[#141916] rounded-xl p-6 border border-[#2f362f] flex flex-col items-center justify-center min-h-[160px] shadow-[0_6px_20px_rgba(0,0,0,0.35)]">
                    <div className="absolute left-3 top-3 w-6 h-6 rounded-full bg-[#3a453b] text-white/80 text-[11px] font-bold flex items-center justify-center">3</div>
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-[#d4a521] flex items-center justify-center shadow-[0_0_18px_rgba(212,165,33,0.35)]">
                        <DollarSign className="w-5 h-5 text-[#1a1a1a]" />
                      </div>
                      <p className="text-[12px] font-semibold leading-tight text-white/90">Earn Bonus from<br/>Your Downlines</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Total Earnings Card with Coins */}
            <div className="relative lg:mt-8">
              {/* Referral Bonus Card */}
              <div className="relative z-10 bg-gradient-to-br from-[#1b1b1a] to-[#171716] rounded-xl p-5 border border-[#2a2a28] shadow-2xl">
                <h2 className="text-xl font-bold mb-4">Referral <span className="text-[#6fa85d]">Bonus</span></h2>
                
                {/* Stats */}
                <div className="space-y-0 rounded-lg overflow-hidden border border-[#333330]">
                  <div className="bg-gradient-to-r from-[#232323] to-[#1b1b1b] border-b border-[#5a5a46] p-4">
                    <p className="text-gray-300 text-xs mb-1">Total Referral Commission Bonus</p>
                    <div className="flex items-center">
                      <span className="text-[#d4c766] text-xs mr-2">PKR</span>
                      <span className="text-[#d4c766] text-2xl font-bold">75,000</span>
                      <span className="ml-auto w-6 h-6 rounded-full bg-[#2a2a28] text-[#808080] flex items-center justify-center">
                        <Info className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-[#232323] to-[#1b1b1b] p-4">
                    <p className="text-gray-300 text-xs mb-1">Total Referral Deposit Bonus</p>
                    <div className="flex items-center">
                      <span className="text-[#d4c766] text-xs mr-2">PKR</span>
                      <span className="text-[#d4c766] text-2xl font-bold">875,000</span>
                      <span className="ml-auto w-6 h-6 rounded-full bg-[#2a2a28] text-[#808080] flex items-center justify-center">
                        <Info className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Downlines Button */}
                <button className="mt-4 w-full bg-gradient-to-r from-[#f1c24f] to-[#d59b25] text-[#5c3a00] px-6 py-2.5 rounded-lg font-bold text-base flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-[0_4px_15px_rgba(212,165,33,0.35)]">
                  Downlines <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="container mx-auto max-w-[1200px] 2xl:max-w-[1536px] px-4">
        <div className="h-[3px] bg-gradient-to-r from-transparent via-gray-700 to-transparent my-8"></div>
      </div>

      {/* Deposit Commission Rate */}
      <div className="container mx-auto max-w-[1200px] 2xl:max-w-[1536px] px-4 mb-12">
        <div className="relative bg-[#1b1b1a] border-[3px] border-white/10 rounded-2xl p-8 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_55%,rgba(123,166,73,0.25),transparent_65%)] pointer-events-none"></div>
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(18,22,18,0.9),rgba(10,12,10,0.95))] pointer-events-none"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
                <h2 className="text-[32px] font-bold text-white mb-2">Deposit Commission Rate</h2>
                <p className="text-[#d4c766] text-[26px] font-bold mb-10">Minimum Deposit PRK 30.00</p>
            </div>

            {/* Tiers Image */}
            <div className="flex items-end justify-end pb-2">
              <img
                src="/src/assets/tier.png"
                alt="Deposit commission tiers"
                className="w-full max-w-[720px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Gaming Commission Rate */}
      <div className="container mx-auto max-w-[1200px] 2xl:max-w-[1536px] px-4 mb-12">
        <div className="bg-[#1b1b1a] border-[3px] border-white/10 rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-4">Gaming Commission Rate</h2>
          <p className="text-gray-400 mb-8 text-lg">Listing of commission rates you earn from your downlines' bets by game type and provider.</p>

          <div className="bg-[#242424] rounded-xl overflow-hidden border border-white/10">
            <Accordion type="single" collapsible defaultValue="Slots" className="w-full">
              {commissionRates.map((cat, idx) => (
                <AccordionItem key={idx} value={cat.category} className="border-b border-white/10 last:border-0">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-white/5 transition-colors text-white [&>svg]:text-[#d4c766]">
                    <span className="text-lg font-bold">{cat.category}</span>
                  </AccordionTrigger>
                  <AccordionContent className="bg-[#1a1a1a] px-0 py-0">
                    {cat.items.length > 0 ? (
                      <div className="w-full">
                        {/* Table Header */}
                        <div className="grid grid-cols-4 gap-4 px-6 py-3 border-b border-white/10 bg-[#2a2a2a] text-[#d4c766] font-bold text-sm text-center">
                          <div className="text-left">Provider</div>
                          <div>Downlines L1</div>
                          <div>Downlines L2</div>
                          <div>Downlines L3</div>
                        </div>
                        {/* Table Body */}
                        {cat.items.map((item, i) => (
                          <div key={i} className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-white/10 last:border-0 text-center text-sm font-medium hover:bg-white/5">
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
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto max-w-[1200px] 2xl:max-w-[1536px] px-4 mb-12">
        <div className="bg-[#1b1b1a] border-[3px] border-white/10 rounded-2xl p-6 md:p-8">
          {/* FAQ Header */}
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="flex items-center gap-4 mb-6 border border-white/10 rounded-lg px-3 py-2 bg-[#191a19]">
            <div className="bg-[#222523] px-3 py-1 rounded border border-[#3b9c42] text-[#3b9c42] font-bold text-xs">FAQ</div>
            <span className="text-white text-sm font-semibold">Terms & Conditions</span>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border border-white/10 rounded-xl bg-[#201f20] px-6">
                <AccordionTrigger className="hover:no-underline text-left font-bold text-base py-4 text-white [&>svg]:text-[#d4c766]">
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
