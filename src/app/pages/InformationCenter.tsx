import React from 'react';
import { InnerPageLayout } from "../components/shared/InnerPageLayout";
import { HelpCenterSidebar } from '../components/shared/HelpCenterSidebar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { FilterTabs } from '../components/shared/FilterTabs';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const INFORMATION_SECTIONS_EN = [
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

const INFORMATION_SECTIONS_ZH_CN = [
    {
        id: 'rules',
        tabs: [
            {
                id: 'slot',
                label: '老虎机',
                content: [
                    { title: '老虎机公平规则', content: '老虎机游戏由供应商 RNG 系统与已审计的返奖标准管理。' },
                    { title: '投注限额', content: '每款老虎机游戏都有不同的最低与最高投注限制，详情请查看游戏内说明。' },
                    { title: '回合规则', content: '若发生断线，未完成回合将依照供应商的游戏恢复政策处理。' },
                ]
            },
            {
                id: 'poker',
                label: '扑克',
                content: [
                    { title: '扑克桌规则', content: '扑克玩法遵循各游戏供应商发布的牌桌规则。' },
                    { title: '筹码与注额政策', content: '注额区间与买入限制由房间设定，并可能因牌桌类型而调整。' },
                    { title: '游戏公平性', content: '禁止串通、外挂与恶意行为，违者可能触发账户处理。' },
                ]
            },
            {
                id: 'live-casino',
                label: '真人娱乐场',
                content: [
                    { title: '真人荷官合规', content: '真人娱乐场由供应商条款与实时监控机制运营。' },
                    { title: '注单结算', content: '注单结果以直播供应商提供的官方赛果为准。' },
                    { title: '网络异常处理', content: '网络不稳定时，未结算回合将按供应商中断规则处理。' },
                ]
            },
        ],
    },
    {
        id: 'faq',
        tabs: [
            {
                id: 'general',
                label: '常见问题',
                content: [
                    { title: '如何注册账号？', content: '点击注册，填写资料并完成账号验证后即可启用。' },
                    { title: '如何联系客服？', content: '可通过悬浮客服按钮进入在线客服获取即时协助。' },
                    { title: '为什么某些游戏无法进入？', content: '部分游戏可能因维护或供应商/服务器状态暂时不可用。' },
                ]
            },
            {
                id: 'payment',
                label: '支付',
                content: [
                    { title: '充值通常多久到账？', content: '大多数充值会在几分钟内到账，部分渠道可能需要额外审核。' },
                    { title: '为什么提现仍在处理中？', content: '提现可能因账户审核、优惠流水或支付通道延迟而待处理。' },
                    { title: '是否有交易限额？', content: '有的，不同支付方式会显示对应的最低与最高金额。' },
                ]
            },
        ],
    },
    {
        id: 'video',
        tabs: [
            {
                id: 'deposit',
                label: '充值',
                content: [
                    { title: '如何充值', content: '选择支付方式，输入金额，并按页面指示完成付款。' },
                    { title: '充值教学视频', content: '本区将提供逐步充值教学视频。' },
                ]
            },
            {
                id: 'withdrawal',
                label: '提现',
                content: [
                    { title: '如何提现', content: '进入提现页面，选择账户资料，输入金额并确认提交。' },
                    { title: '提现教学视频', content: '本区将提供逐步提现教学视频。' },
                ]
            },
        ],
    },
] as const;

const INFORMATION_SECTIONS_ZH_HK = [
    {
        id: 'rules',
        tabs: [
            {
                id: 'slot',
                label: '老虎機',
                content: [
                    { title: '老虎機公平規則', content: '老虎機遊戲由供應商 RNG 系統與已審核的派彩標準管理。' },
                    { title: '投注限額', content: '每款老虎機遊戲都有不同最低與最高投注限制，詳情請查看遊戲內說明。' },
                    { title: '回合規則', content: '若發生斷線，未完成回合將依供應商的遊戲恢復政策處理。' },
                ]
            },
            {
                id: 'poker',
                label: '撲克',
                content: [
                    { title: '撲克桌規則', content: '撲克玩法遵循各遊戲供應商發布的牌桌規則。' },
                    { title: '籌碼與注額政策', content: '注額區間與買入限制由房間設定，並可能因牌桌類型而調整。' },
                    { title: '遊戲公平性', content: '禁止串通、外掛與惡意行為，違者可能觸發帳戶處理。' },
                ]
            },
            {
                id: 'live-casino',
                label: '真人娛樂場',
                content: [
                    { title: '真人荷官合規', content: '真人娛樂場由供應商條款與即時監控機制營運。' },
                    { title: '注單結算', content: '注單結果以直播供應商提供的官方賽果為準。' },
                    { title: '網路異常處理', content: '網路不穩定時，未結算回合將按供應商中斷規則處理。' },
                ]
            },
        ],
    },
    {
        id: 'faq',
        tabs: [
            {
                id: 'general',
                label: '常見問題',
                content: [
                    { title: '如何註冊帳號？', content: '點擊註冊，填寫資料並完成帳號驗證後即可啟用。' },
                    { title: '如何聯絡客服？', content: '可透過浮動客服按鈕進入線上客服取得即時協助。' },
                    { title: '為什麼某些遊戲無法進入？', content: '部分遊戲可能因維護或供應商/伺服器狀態暫時不可用。' },
                ]
            },
            {
                id: 'payment',
                label: '支付',
                content: [
                    { title: '充值通常多久到帳？', content: '大多數充值會在幾分鐘內到帳，部分渠道可能需要額外審核。' },
                    { title: '為什麼提現仍在處理中？', content: '提現可能因帳戶審核、優惠流水或支付通道延遲而待處理。' },
                    { title: '是否有交易限額？', content: '有，不同支付方式會顯示對應的最低與最高金額。' },
                ]
            },
        ],
    },
    {
        id: 'video',
        tabs: [
            {
                id: 'deposit',
                label: '充值',
                content: [
                    { title: '如何充值', content: '選擇支付方式，輸入金額，並按頁面指示完成付款。' },
                    { title: '充值教學影片', content: '本區將提供逐步充值教學影片。' },
                ]
            },
            {
                id: 'withdrawal',
                label: '提現',
                content: [
                    { title: '如何提現', content: '進入提現頁面，選擇帳戶資料，輸入金額並確認提交。' },
                    { title: '提現教學影片', content: '本區將提供逐步提現教學影片。' },
                ]
            },
        ],
    },
] as const;

const DEFAULT_SECTION = 'rules';

function normalizeSectionTab(
    value: string | null | undefined,
    sections: readonly { id: string }[],
): string {
    const normalized = (value || '').trim().toLowerCase();
    return sections.some((section) => section.id === normalized) ? normalized : DEFAULT_SECTION;
}

function normalizeSubtab(
    value: string | null | undefined,
    sectionId: string,
    sections: readonly { id: string; tabs: readonly { id: string }[] }[],
): string {
    const normalized = (value || '').trim().toLowerCase();
    const section = sections.find((item) => item.id === sectionId) || sections[0];
    return section.tabs.some((tab) => tab.id === normalized) ? normalized : section.tabs[0].id;
}

export function InformationCenter() {
    const { currentLang, t } = useLanguage();
    const location = useLocation();
    const navigate = useNavigate();
    const informationSections =
        currentLang.id === 'zh-cn'
            ? INFORMATION_SECTIONS_ZH_CN
            : currentLang.id === 'zh-hk'
                ? INFORMATION_SECTIONS_ZH_HK
                : INFORMATION_SECTIONS_EN;
    const params = new URLSearchParams(location.search);
    const sectionParam = normalizeSectionTab(params.get('tab'), informationSections);
    const activeSection =
        informationSections.find((section) => section.id === sectionParam) || informationSections[0];
    const subtabParam = normalizeSubtab(params.get('subtab'), activeSection.id, informationSections);
    const activeInnerTab =
        activeSection.tabs.find((tab) => tab.id === subtabParam) || activeSection.tabs[0];
    const pageTitle = t('footerInformationCenter');
    const footerText = currentLang.id === 'zh-cn'
        ? '如需进一步协助，请联系'
        : currentLang.id === 'zh-hk'
            ? '如需進一步協助，請聯絡'
            : 'Please contact';
    const supportText = currentLang.id === 'zh-cn' ? '客服支持' : currentLang.id === 'zh-hk' ? '客服支援' : 'Support';
    const footerSuffix = currentLang.id === 'en' ? 'for further assistance.' : '。';

    React.useEffect(() => {
        const nextParams = new URLSearchParams(location.search);
        const normalizedTab = normalizeSectionTab(nextParams.get('tab'), informationSections);
        const normalizedSubtab = normalizeSubtab(nextParams.get('subtab'), normalizedTab, informationSections);

        if (nextParams.get('tab') !== normalizedTab || nextParams.get('subtab') !== normalizedSubtab) {
            nextParams.set('tab', normalizedTab);
            nextParams.set('subtab', normalizedSubtab);
            navigate({ pathname: location.pathname, search: `?${nextParams.toString()}` }, { replace: true });
        }
    }, [informationSections, location.pathname, location.search, navigate]);

    const handleSubtabChange = (tabId: string) => {
        const nextParams = new URLSearchParams(location.search);
        nextParams.set('tab', activeSection.id);
        nextParams.set('subtab', normalizeSubtab(tabId, activeSection.id, informationSections));
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

                        <h1 className="relative z-10 text-2xl md:text-3xl font-bold text-white tracking-wide">{pageTitle}</h1>
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
                            {footerText} <span className="font-bold text-gray-300">{supportText}</span>{footerSuffix}
                        </p>
                    </div>
                </div>
            </div>
        </InnerPageLayout>
    );
}
