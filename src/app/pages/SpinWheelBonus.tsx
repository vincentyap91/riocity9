import React, { useState } from 'react';
import { ArrowLeft, Dices, X, Wallet, RefreshCw, Ticket, Box, Clock } from 'lucide-react';
import { LuckyWheelIcon } from '../components/icons/LuckyWheelIcon';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { InnerPageLayout } from "../components/shared/InnerPageLayout";
import { PageSidebar, type PageSidebarItem } from '../components/shared/PageSidebar';
import { ClaimRecordModal } from '../components/shared/ClaimRecordModal';
import {
  RECORD_PAGE_ICON_BOX_CLASS,
  RECORD_PAGE_ICON_CLASS,
  RECORD_PAGE_TITLE_CLASS,
  MOBILE,
  PRIMARY_CTA_CLASS,
} from '../config/themeTokens';

const BONUS_SIDEBAR_ITEMS: PageSidebarItem[] = [
  { id: 'wheel', label: 'Spin Wheel Bonus', icon: LuckyWheelIcon },
  { id: 'scratch', label: 'Voucher Scratch Bonus', icon: Ticket },
  { id: 'prize', label: 'Prize Box Bonus', icon: Box },
];

// Mock reward data (matches screenshot)
const rewards = [
  { id: 4416, campaign: 'VW Shiro Test', expiresIn: 'No Expiry' },
  { id: 3914, campaign: 'VW Shiro Test', expiresIn: 'No Expiry' },
  { id: 3913, campaign: 'VW Shiro Test', expiresIn: 'No Expiry' },
  { id: 3912, campaign: 'VW Shiro Test', expiresIn: 'No Expiry' },
  { id: 3443, campaign: 'VW Shiro Test', expiresIn: 'No Expiry' },
];

export function SpinWheelBonus() {
  const navigate = useNavigate();
  const { bonusType } = useParams();
  const { t } = useLanguage();
  const [walletBalance] = useState('990.69');
  const [recordModalOpen, setRecordModalOpen] = useState(false);
  const activeId = bonusType ?? 'wheel';

  return (
    <InnerPageLayout className="overflow-x-hidden">
      <div className={`container mx-auto max-w-[1024px] ${MOBILE.container} pb-20 md:pb-8`}>
        {/* Top Header – same layout and gap as Profile */}
        <div className={`flex items-center ${MOBILE.gapSm} ${MOBILE.headerMb} px-2`}>
          <button
            onClick={() => navigate('/')}
            className="h-10 w-10 rounded-full bg-black/20 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <span className={`text-white ${MOBILE.pageTitle}`}>{t("rewardCentre")}</span>
          <button
            onClick={() => navigate('/')}
            className="ml-auto h-10 w-10 rounded-full bg-black/20 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-start">
          <PageSidebar
            items={BONUS_SIDEBAR_ITEMS}
            activeId={activeId}
            onSelect={(id) => navigate(`/bonus?tab=${id}`)}
          />

          {/* Main Content Area - mobile friendly padding */}
          <div className="flex-1 w-full min-w-0 bg-[#1a2230] rounded-2xl border border-white/5 p-4 md:p-6 flex flex-col">
            {/* Title – same tokens as History Record */}
            <div className="flex items-center justify-start gap-3 pb-3 md:pb-4">
              <div className={RECORD_PAGE_ICON_BOX_CLASS}>
                <LuckyWheelIcon className={RECORD_PAGE_ICON_CLASS} />
              </div>
              <span className={RECORD_PAGE_TITLE_CLASS}>{t("spinWheelBonus")}</span>
            </div>

            {/* Wallet Balance Section - stack on mobile */}
            <div className="bg-[#0f151f] rounded-xl border border-white/5 p-4 mb-4 md:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                  <Wallet className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-gray-400 text-xs md:text-sm font-bold mb-0.5">Wallet Balance:</div>
                  <div className="text-emerald-500 text-xl md:text-2xl font-black truncate">{walletBalance}</div>
                </div>
              </div>
              <Button
                onClick={() => setRecordModalOpen(true)}
                className={`px-4 md:px-6 py-2 rounded-xl flex items-center justify-center gap-2 w-full sm:w-auto shrink-0 font-black ${PRIMARY_CTA_CLASS}`}
              >
                <RefreshCw className="w-4 h-4" />
                Record
              </Button>
            </div>

            {/* Warning Message */}
            <div className="flex items-center gap-2 mb-4 md:mb-6 text-gray-400 text-xs md:text-sm">
              <Clock className="w-4 h-4 text-orange-400" />
              <span>Rewards must be completed before the token's expiry date.</span>
            </div>

            {/* Reward cards grid - single column on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {rewards.map((reward) => (
                <div key={reward.id} className="bg-[#0f151f] rounded-xl border border-white/5 p-4 md:p-5 flex flex-col">
                  <div className="text-emerald-500 font-bold text-sm mb-2">Reward #{reward.id}</div>
                  <div className="text-gray-400 text-xs mb-3">Campaign: {reward.campaign}</div>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-3 h-3 text-gray-500" />
                    <span className="text-gray-400 text-xs">Expires in:</span>
                    <span className="text-orange-400 text-xs font-bold">{reward.expiresIn}</span>
                  </div>
                  <Button className={`w-full py-3 rounded-xl font-black ${PRIMARY_CTA_CLASS}`}>
                    Claim Now
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Shared Claim Record Modal – Type dropdown switches Spin Wheel / Voucher Scratch / Prize Box */}
      <ClaimRecordModal
        open={recordModalOpen}
        onOpenChange={setRecordModalOpen}
        initialType="spinwheel"
      />
    </InnerPageLayout>
  );
}
