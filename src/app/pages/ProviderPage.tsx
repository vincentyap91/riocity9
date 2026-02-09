import React from 'react';
import { useParams } from 'react-router-dom';
import { Slots } from './Slots';
import { NotFound } from './NotFound';

const PROVIDER_PAGE_CONFIG: Record<string, { pageTitle: string; bannerImage: string; providerName: string }> = {
  'royal-slot-gaming': {
    pageTitle: 'Royal Slot Gaming',
    bannerImage: 'https://pksoftcdn.azureedge.net/media/royalslotgaming_cam88_providerbanner_1029pxx420px-202601270943180086.jpg',
    providerName: 'Royal Slot Game',
  },
  'naga-game-slots': {
    pageTitle: 'NAGA Game Slots',
    bannerImage: 'https://pksoftcdn.azureedge.net/media/1029x420_providerbanner_nagagames-202509081536259458.jpg',
    providerName: 'NAGA',
  },
  'playtech-slot': {
    pageTitle: 'PlayTech Slots',
    bannerImage: 'https://pksoftcdn.azureedge.net/media/kh168_playtech_providerbanner_200x200px-202510131026055329.jpg',
    providerName: 'PlayTech Slots',
  },
};

export function ProviderPage() {
  const { providerId = '' } = useParams();
  const config = PROVIDER_PAGE_CONFIG[providerId];

  if (!config) {
    return <NotFound />;
  }

  return (
    <Slots
      pageTitle={config.pageTitle}
      heroImage={config.bannerImage}
      defaultProviderName={config.providerName}
      lockedProviderName={config.providerName}
      hideProviderNav
    />
  );
}
