import { InnerPageLayout } from "../components/shared/InnerPageLayout";
import { HelpCenterSidebar } from '../components/shared/HelpCenterSidebar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { FilterTabs } from '../components/shared/FilterTabs';
import { useLocation, useNavigate } from 'react-router-dom';

const INFORMATION_SECTIONS = [
    {
        id: 'rules',
        tabs: [
            {
                id: 'slot',
                label: 'Slot',
                content: [
                    { title: 'Slot Fair Play', content: 'Slot games are governed by provider RNG systems and audited payout standards.' },
                    { title: 'Bet Limits', content: 'Each slot game has different minimum and maximum bet limits shown in-game.' },
                    { title: 'Session Rules', content: 'Disconnections may result in resumed rounds according to provider game recovery policy.' },
                ]
            },
            {
                id: 'poker',
                label: 'Poker',
                content: [
                    { title: 'Poker Table Rules', content: 'Poker gameplay follows table-specific rules published by each game provider.' },
                    { title: 'Chip & Stake Policy', content: 'Stake ranges and buy-in limits are defined by room and can change by table type.' },
                    { title: 'Game Integrity', content: 'Collusion, automation tools, and abusive behavior are prohibited and may trigger account action.' },
                ]
            },
            {
                id: 'live-casino',
                label: 'Live Casino',
                content: [
                    { title: 'Live Dealer Compliance', content: 'Live Casino sessions are operated under provider terms and real-time surveillance controls.' },
                    { title: 'Bet Settlement', content: 'Bet outcomes are settled based on the official game result from the live stream provider.' },
                    { title: 'Connection Handling', content: 'In unstable network conditions, unresolved rounds are handled by provider interruption rules.' },
                ]
            },
        ],
    },
    {
        id: 'faq',
        tabs: [
            {
                id: 'general',
                label: 'General',
                content: [
                    { title: 'How do I register an account?', content: 'Click Register, fill in your details, and complete account verification to activate your profile.' },
                    { title: 'How do I contact customer service?', content: 'Use Live Chat from the floating support button for immediate assistance from support.' },
                    { title: 'Why is a game unavailable?', content: 'Some games may be under maintenance or temporarily unavailable by provider/server status.' },
                ]
            },
            {
                id: 'payment',
                label: 'Payment',
                content: [
                    { title: 'How long does deposit approval take?', content: 'Most deposits are approved within minutes; some channels may require verification time.' },
                    { title: 'Why is my withdrawal pending?', content: 'Withdrawals may be pending due to account checks, promotion turnover, or payment channel delays.' },
                    { title: 'Are there transaction limits?', content: 'Yes, each payment method has minimum/maximum amounts that are shown before submission.' },
                ]
            },
        ],
    },
    {
        id: 'video',
        tabs: [
            {
                id: 'deposit',
                label: 'Deposit',
                content: [
                    { title: 'How To Deposit', content: 'Select your payment method, submit your amount, and follow the payment instructions shown.' },
                    { title: 'Deposit Guide Video', content: 'Step-by-step deposit guide video will be available in this section.' },
                ]
            },
            {
                id: 'withdrawal',
                label: 'Withdrawal',
                content: [
                    { title: 'How To Withdraw', content: 'Go to Withdrawal, select account details, enter amount, and confirm your request.' },
                    { title: 'Withdrawal Guide Video', content: 'Step-by-step withdrawal guide video will be available in this section.' },
                ]
            },
        ],
    },
] as const;

const DEFAULT_SECTION = 'rules';

export function InformationCenter() {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const sectionParam = params.get('tab') || DEFAULT_SECTION;
    const activeSection =
        INFORMATION_SECTIONS.find((section) => section.id === sectionParam) || INFORMATION_SECTIONS[0];
    const defaultSubtab = activeSection.tabs[0].id;
    const subtabParam = params.get('subtab') || defaultSubtab;
    const activeInnerTab =
        activeSection.tabs.find((tab) => tab.id === subtabParam) || activeSection.tabs[0];

    const handleSubtabChange = (tabId: string) => {
        const nextParams = new URLSearchParams(location.search);
        nextParams.set('tab', activeSection.id);
        nextParams.set('subtab', tabId);
        navigate({ pathname: location.pathname, search: `?${nextParams.toString()}` });
    };

    return (
        <InnerPageLayout contentClassName="container mx-auto px-4 py-8 max-w-[1480px]">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar */}
                <HelpCenterSidebar />

                {/* Main Content Card */}
                <div className="flex-1 bg-[#0f1923] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
                    {/* Header Banner with Geometric Background */}
                    <div className="relative h-32 md:h-40 flex items-center justify-center overflow-hidden">
                        {/* Dark Blue Geometric Background Approximation */}
                        <div className="absolute inset-0 bg-[#111827]">
                            <div className="absolute inset-0 opacity-10"
                                style={{
                                    backgroundImage: `linear-gradient(45deg, #1f2937 25%, transparent 25%), 
                                       linear-gradient(-45deg, #1f2937 25%, transparent 25%), 
                                       linear-gradient(45deg, transparent 75%, #1f2937 75%), 
                                       linear-gradient(-45deg, transparent 75%, #1f2937 75%)`,
                                    backgroundSize: '40px 40px',
                                    backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px'
                                }}>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0d1626] via-[#1a2c4e] to-[#0d1626] opacity-80"></div>
                            {/* Overlay shapes to mimic the polygons */}
                            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                        </div>

                        <h1 className="relative z-10 text-2xl md:text-3xl font-bold text-white tracking-wide">Information Center</h1>
                    </div>

                    {/* Accordion Content */}
                    <div className="p-4 md:p-6 bg-[#0f1923]">
                        <FilterTabs
                            items={activeSection.tabs.map((tab) => ({ id: tab.id, label: tab.label }))}
                            activeId={activeInnerTab.id}
                            onSelect={handleSubtabChange}
                            scrollable
                        />

                        <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-2 mt-4">
                            {activeInnerTab.content.map((item, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="bg-[#131b29] border border-white/5 data-[state=open]:border-white/10 rounded-xl px-4 transition-all duration-200"
                                >
                                    <AccordionTrigger className="text-sm md:text-base font-medium text-gray-200 hover:text-white py-4 [&[data-state=open]]:text-white hover:no-underline">
                                        {item.title}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-sm text-gray-400 pb-4 pt-1 leading-relaxed">
                                        {item.content}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    {/* Footer Text */}
                    <div className="px-6 py-6 text-center">
                        <p className="text-xs text-gray-500">
                            Please contact <span className="font-bold text-gray-300">Support</span> for further assistance.
                        </p>
                    </div>
                </div>
            </div>
        </InnerPageLayout>
    );
}
