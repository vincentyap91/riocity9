import React from 'react';
import {
    FileText,
    Shield,
    Users,
    Info,
    Lock,
    Eye,
    CreditCard,
    Gift,
    Trophy,
    HelpCircle
} from 'lucide-react';
import { PageSidebar, type PageSidebarItem } from './PageSidebar';
import { useNavigate, useLocation } from 'react-router-dom';

const HELP_CENTER_ITEMS: PageSidebarItem[] = [
    { id: 'terms', label: 'Riocity9 T&Cs', icon: FileText, path: '/information-center?tab=terms' },
    { id: 'bonus-terms', label: 'Bonus T&Cs', icon: Gift, path: '/information-center?tab=bonus-terms' },
    { id: 'sports-terms', label: 'Sports Betting T&Cs', icon: Trophy, path: '/information-center?tab=sports-terms' },
    { id: 'payment-terms', label: 'Payment T&Cs', icon: CreditCard, path: '/information-center?tab=payment-terms' },
    { id: 'aml', label: 'AML Policy', icon: Shield, path: '/information-center?tab=aml' },
    { id: 'kyc', label: 'KYC Policy', icon: FileText, path: '/information-center?tab=kyc' },
    { id: 'privacy', label: 'Privacy Policy', icon: Eye, path: '/information-center?tab=privacy' },
    { id: 'minors', label: 'Protection Of Minors Policy', icon: Users, path: '/information-center?tab=minors' },
    { id: 'responsible', label: 'Responsible Gaming Principles', icon: Users, path: '/information-center?tab=responsible' },
    { id: 'authenticator', label: 'Riocity9 Authenticator', icon: Lock, path: '/information-center?tab=authenticator' },
    { id: 'affiliate', label: 'Affiliate Program', icon: Users, path: '/information-center?tab=affiliate' },
    { id: 'help', label: 'Help Center', icon: HelpCircle, path: '/information-center?tab=help' },
    { id: 'contact', label: 'Contact Us', icon: Info, path: '/information-center?tab=contact' },
];

interface HelpCenterSidebarProps {
    activeId?: string;
    onSelect?: (id: string) => void;
}

export function HelpCenterSidebar({ activeId, onSelect }: HelpCenterSidebarProps) {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine active ID from URL if not provided
    const currentActiveId = activeId || new URLSearchParams(location.search).get('tab') || 'privacy';

    const handleSelect = (id: string) => {
        const item = HELP_CENTER_ITEMS.find(i => i.id === id);
        if (item?.path) {
            navigate(item.path);
        }
        if (onSelect) {
            onSelect(id);
        }
    };

    return (
        <PageSidebar
            items={HELP_CENTER_ITEMS}
            activeId={currentActiveId}
            onSelect={handleSelect}
        />
    );
}

export { HELP_CENTER_ITEMS };
