import React, { useState } from 'react';
import { InnerPageLayout } from "../components/shared/InnerPageLayout";

const membershipLevels = [
  {
    id: 'normal',
    name: 'Normal',
    image: 'https://pksoftcdn.azureedge.net/media/vip-bg-normal-202312131325415154-202411051515230463.png',
    active: true,
    claimable: false,
  },
  {
    id: 'bronze',
    name: 'Bronze',
    image: 'https://pksoftcdn.azureedge.net/media/vip-bg-bronze-202312131338287192-202407150909595015-202411221548278644.png',
    active: false,
    claimable: true,
  },
  {
    id: 'silver',
    name: 'Silver',
    image: 'https://riocity-cdn.azureedge.net/riocity/vip-bg-silver-202312131338569764.png',
    active: false,
    claimable: true,
  },
  {
    id: 'gold',
    name: 'Gold',
    image: 'https://riocity-cdn.azureedge.net/riocity/vip-bg-gold-202312131339144404.png',
    active: false,
    claimable: true,
  },
  {
    id: 'platinum',
    name: 'Platinum',
    image: 'https://riocity-cdn.azureedge.net/riocity/vip-bg-platinum-202312131340192820.png',
    active: false,
    claimable: true,
  },
  {
    id: 'diamond',
    name: 'Diamond',
    image: 'https://riocity-cdn.azureedge.net/riocity/vip-bg-diamond-202312131340458457.png',
    active: false,
    claimable: true,
  },
  {
    id: 'ruby',
    name: 'Ruby',
    image: 'https://pksoftcdn.azureedge.net/media/vip-bg-diamond-202312131340458457-202502180835558646.png',
    active: false,
    claimable: false,
  },
  {
    id: 'diamond2',
    name: 'Diamond II',
    image: 'https://pksoftcdn.azureedge.net/media/vip-bg-diamond-202312131340458457-202502180835558646-202503110926197286-202510021728564762.png',
    active: false,
    claimable: false,
  },
];

const membershipBenefits = [
  { label: 'Deposits and Withdrawals', value: 'High Priority' },
  { label: 'Daily Withdrawal Limitation', value: 'No Limit' },
  { label: 'Weekly Rescue Bonus', value: '1%' },
  { label: 'Birthday Bonus', value: '1' },
  { label: 'Upgrade Bonus', value: '0' },
];

const memberRebates = [
  { category: 'Sport', rebate: '0.1%' },
  { category: 'Live Casino', rebate: '1%' },
  { category: 'Slot', rebate: '0.1%' },
  { category: 'Fish Hunt', rebate: '0.8%' },
  { category: 'Lottery', rebate: '0.5%' },
  { category: 'Crash', rebate: '0%' },
  { category: 'Exchange', rebate: '0%' },
  { category: 'RNG', rebate: '1%' },
  { category: 'Poker', rebate: '1%' },
];

export function Membership() {
  return (
    <InnerPageLayout className="overflow-hidden">
      <div className="flex flex-col min-h-screen text-white relative overflow-hidden pb-20 md:pb-0">
        {/* Main Content */}
        <div className="container mx-auto max-w-[1200px] 2xl:max-w-[1536px] px-4 py-6 md:py-12">
        
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-white mb-6">Our Membership Program</h1>
        </div>

        {/* Membership Levels */}
        <div className="mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-3">
            {membershipLevels.map((level) => (
              <div
                key={level.id}
                className={`relative bg-[#1a2230] border border-white/5 rounded-[16px] p-2 md:p-3 shadow-xl flex flex-col items-center ${
                  level.active ? 'ring-2 ring-[#00bc7d] bg-[#00bc7d]/10' : ''
                }`}
              >
                <div className="w-full min-h-[40px] md:min-h-[50px] mb-2 flex items-center justify-center">
                  <img
                    src={level.image}
                    alt={`lvl-${level.name}`}
                    className="w-full h-auto object-contain max-h-[40px] md:max-h-[50px]"
                  />
                </div>
                <h4 className="text-white font-bold text-xs md:text-sm mb-1 md:mb-2">{level.name}</h4>
                {level.claimable && (
                  <button className="w-full bg-gradient-to-r from-[#f1c24f] to-[#d59b25] text-[#5c3a00] px-2 md:px-4 py-1 md:py-2 rounded-lg font-bold text-xs hover:brightness-110 transition-all shadow-[0_4px_15px_rgba(212,165,33,0.35)]">
                    Claim
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Membership Benefits */}
          <div>
            <h2 className="text-2xl font-black text-white mb-4">Membership Benefits</h2>
            <div className="bg-[#1a2230] border border-white/5 rounded-[16px] p-6 shadow-xl">
              <div className="space-y-4">
                {membershipBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-white/10 pb-4 last:border-0 last:pb-0">
                    <span className="text-gray-300 text-sm">{benefit.label}</span>
                    <span className="text-white font-bold text-sm">{benefit.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Member Rebates */}
          <div>
            <h2 className="text-2xl font-black text-white mb-4">Member Rebates</h2>
            <div className="bg-[#1a2230] border border-white/5 rounded-[16px] p-6 shadow-xl">
              <div className="space-y-4">
                {memberRebates.map((rebate, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-white/10 pb-4 last:border-0 last:pb-0">
                    <span className="text-gray-300 text-sm">{rebate.category}</span>
                    <span className="text-white font-bold text-sm">{rebate.rebate}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Monthly Level Upgrade Requirement */}
          <div>
            <h2 className="text-2xl font-black text-white mb-4">Monthly Level Upgrade Requirement</h2>
            <div className="bg-[#1a2230] border border-white/5 rounded-[16px] p-6 shadow-xl">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Progressive Deposit</span>
                <span className="text-white font-bold text-sm">-</span>
              </div>
            </div>
          </div>

          {/* Monthly Level Retention Requirement */}
          <div>
            <h2 className="text-2xl font-black text-white mb-4">Monthly Level Retention Requirement</h2>
            <div className="bg-[#1a2230] border border-white/5 rounded-[16px] p-6 shadow-xl">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Past 3 Months Accumulated Deposit</span>
                <span className="text-white font-bold text-sm">-</span>
              </div>
            </div>
          </div>
        </div>

        {/* Membership Renewal */}
        <div className="mt-8">
          <h2 className="text-2xl font-black text-white mb-4">Membership Renewal</h2>
          <div className="bg-[#1a2230] border border-white/5 rounded-[16px] p-6 shadow-xl">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">Membership Renewal</span>
              <span className="text-white font-bold text-sm">Lifetime</span>
            </div>
          </div>
        </div>

        </div>
      </div>
    </InnerPageLayout>
  );
}
