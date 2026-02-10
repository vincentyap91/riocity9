import { Flame, Gamepad2, Trophy, Dices, Club, Fish, Plane, ArrowRightLeft } from 'lucide-react';

export const CAT_NAMES: Record<string, string> = {
    hotGames: 'Hot Games',
    allGames: 'All Games',
    sports: 'Sports',
    liveCasino: 'Live Casino',
    slots: 'Slots',
    fishHunt: 'Fish Hunt',
    lottery: 'Lottery',
    exchange: 'Exchange',
    poker: 'Poker',
    crash: 'Crash'
};

export const INITIAL_SLOTS = [
    { name: 'Fortune Thai', provider: 'Royal Slot Gaming', rtp: '94.97%', trend: 'up', providerLogo: 'https://pksoftcdn.azureedge.net/media/royalslotgaming_slot-202601270943159503.png', color: 'bg-blue-600', image: 'https://pksoftcdn.azureedge.net/games/RSG/FortuneThai.png' },
    { name: 'Rise of Samurai 4', provider: 'Pragmatic Play', rtp: '95.00%', trend: 'up', providerLogo: 'https://riocity-cdn.azureedge.net/riocity/1-202312201452295687 (1)-202404091259347153.png', color: 'bg-indigo-900', image: 'https://pksoftcdn.azureedge.net/games/RSG/FortuneThai.png' },
    { name: 'Bonus Train Bandits', provider: 'PlayTech', rtp: '95.00%', trend: 'down', providerLogo: 'https://pksoftcdn.azureedge.net/media/kh168_playtech_providericon_200x200px-202510131026033251.png', color: 'bg-zinc-800', image: 'https://riocity-cdn.azureedge.net/riocity/playtech/gpas_btbandit_pop.jpg' },
    { name: 'Forbidden Island', provider: 'NAGA', rtp: '94.89%', trend: 'up', providerLogo: 'https://pksoftcdn.azureedge.net/media/nagagames-202509081536239359.png', color: 'bg-blue-800', image: 'https://imagedelivery.net/kDjBdJu_wA1m_UDGfqI3og/595483dc-de24-43f2-984f-db04ceff3c3e.png/public' },
    { name: 'Pussy888', provider: 'PGSoft', rtp: '92.18%', trend: 'down', providerLogo: 'https://riocity-cdn.azureedge.net/riocity/pg-202401151452543063.png', color: 'bg-blue-600', image: 'https://imagedelivery.net/kDjBdJu_wA1m_UDGfqI3og/595483dc-de24-43f2-984f-db04ceff3c3e.png/public' },
    { name: 'Pussy888', provider: 'Pussy888', rtp: '94.25%', trend: 'up', providerLogo: 'https://pksoftcdn.azureedge.net/media/pussy888_slot-202512051029432232.png', color: 'bg-blue-700', image: 'https://pksoftcdn.azureedge.net/media/516bf741-86db-668a-1b27-7fd2c150e41f-202408291606256321-202410040758117373-202510311406514416.jpg' },
    { name: 'Striper Night', provider: '918 Kaya', rtp: '94.98%', trend: 'up', providerLogo: 'https://pksoftcdn.azureedge.net/media/200x200px_provider_icon_918kaya-202510310816424815.png', color: 'bg-purple-900', image: 'https://pksoftcdn.azureedge.net/media/placeholder_riocity-202408050928489215.jpg' },
];

export const MOCK_CATEGORIES: Record<string, any[]> = {
    liveCasino: [
        { name: 'Evolution Casino', provider: 'Evolution Gaming', providerLogo: 'https://pksoftcdn.azureedge.net/media/evolution_casino-202512051038235541.png', color: 'bg-indigo-900', image: 'https://riocity-cdn.azureedge.net/riocity/1-202312201452295687 (1)-202404091259347153.png' },
        { name: 'SA Gaming Live', provider: 'SA Gaming', providerLogo: 'https://pksoftcdn.azureedge.net/media/sa_gaming_casino-202512051039260548.png', color: 'bg-blue-900', image: 'https://pksoftcdn.azureedge.net/media/placeholder_riocity-202408050928489215.jpg' },
        { name: 'Sexy Baccarat', provider: 'Sexy Casino', providerLogo: 'https://pksoftcdn.azureedge.net/media/sexybaccarat_casino-202512051041235541.png', color: 'bg-pink-900', image: 'https://pksoftcdn.azureedge.net/media/placeholder_riocity-202408050928489215.jpg' },
        { name: 'AllBet Casino', provider: 'AllBet', providerLogo: 'https://pksoftcdn.azureedge.net/media/allbet_casino-202512051042235541.png', color: 'bg-zinc-800', image: 'https://pksoftcdn.azureedge.net/media/placeholder_riocity-202408050928489215.jpg' },
    ],
    sports: [
        { name: 'CMD Sports', provider: 'CMD368', providerLogo: 'https://pksoftcdn.azureedge.net/media/cmd368_sports-202512051045235541.png', color: 'bg-green-900', image: 'https://pksoftcdn.azureedge.net/media/placeholder_riocity-202408050928489215.jpg' },
        { name: 'SBO Sports', provider: 'SBOBET', providerLogo: 'https://pksoftcdn.azureedge.net/media/sbobet_sports-202512051046235541.png', color: 'bg-blue-700', image: 'https://pksoftcdn.azureedge.net/media/placeholder_riocity-202408050928489215.jpg' },
    ],
    fishHunt: [
        { name: 'Jili Fishing', provider: 'Jili Gaming', providerLogo: 'https://pksoftcdn.azureedge.net/media/jili_fishing-202512051050235541.png', color: 'bg-cyan-900', image: 'https://pksoftcdn.azureedge.net/media/placeholder_riocity-202408050928489215.jpg' },
    ],
    lottery: [
        { name: 'RioCity Lottery', provider: '4D Lottery', providerLogo: 'https://pksoftcdn.azureedge.net/media/riocity_lottery-202512051055235541.png', color: 'bg-purple-900', image: 'https://pksoftcdn.azureedge.net/media/placeholder_riocity-202408050928489215.jpg' },
    ],
    hotGames: INITIAL_SLOTS.slice(2, 6),
    allGames: [...INITIAL_SLOTS],
    exchange: [...INITIAL_SLOTS],
    poker: [...INITIAL_SLOTS],
    crash: [...INITIAL_SLOTS],
};

export const GAME_CATEGORIES = [
    { id: 'hotGames', nameKey: 'hotGames', icon: Flame },
    { id: 'allGames', nameKey: 'allGames', icon: Gamepad2 },
    { id: 'sports', nameKey: 'sports', icon: Trophy },
    { id: 'liveCasino', nameKey: 'liveCasino', icon: Dices },
    { id: 'slots', nameKey: 'slots', icon: Dices },
    { id: 'fishHunt', nameKey: 'fishHunt', icon: Fish },
    { id: 'lottery', nameKey: 'lottery', icon: Dices },
    { id: 'exchange', nameKey: 'exchange', icon: ArrowRightLeft },
    { id: 'poker', nameKey: 'poker', icon: Club },
    { id: 'crash', nameKey: 'crash', icon: Plane },
];
