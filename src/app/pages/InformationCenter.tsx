import { InnerPageLayout } from "../components/shared/InnerPageLayout";
import { HelpCenterSidebar } from '../components/shared/HelpCenterSidebar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

const PRIVACY_CONTENT = [
    {
        title: 'Privacy',
        content: 'RioCity9 is committed to protecting your personal data using high security standards.'
    },
    {
        title: 'Information Collected',
        content: 'We collect information you provide directly to us, such as when you create an account, make a deposit, or contact support.'
    },
    {
        title: 'Means Of Collecting And Processing Data',
        content: 'Data is collected via cookies, log files, and direct input forms on our website.'
    },
    {
        title: 'Information Use',
        content: 'We use the information to provide, maintain, and improve our services, and to protect our users.'
    },
    {
        title: 'Certain Excluded Disclosures',
        content: 'We may disclose information if required by law or to protect our rights.'
    },
    {
        title: 'Access',
        content: 'You have the right to access, correct, or delete your personal information.'
    },
    {
        title: 'Cookies',
        content: 'We use cookies to improve your experience and analyze site traffic.'
    },
    {
        title: 'Consent To Security Review',
        content: 'By using our services, you consent to security reviews to validate your identity and age.'
    },
    {
        title: 'Security',
        content: 'We implement SSL encryption and other security measures to safeguard your data.'
    },
    {
        title: 'Protection Of Minors',
        content: 'Our services are strictly for users aged 18 and over.'
    },
    {
        title: 'International transfers',
        content: 'Your information may be transferred to and processed in countries other than your own.'
    },
    {
        title: 'Third-Party Practices',
        content: 'We are not responsible for the privacy practices of third-party websites linked to our site.'
    },
    {
        title: 'Legal Disclaimer',
        content: 'We are not liable for any errors or omissions in the content of this site.'
    },
    {
        title: 'Consent To Privacy Policy',
        content: 'By using our site, you agree to the terms of this Privacy Policy.'
    },
    {
        title: 'Other Websites',
        content: 'This policy applies only to RioCity9 and not to other websites you may access from here.'
    },
];

export function InformationCenter() {
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
                        <Accordion type="single" collapsible className="w-full space-y-2">
                            {PRIVACY_CONTENT.map((item, index) => (
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
