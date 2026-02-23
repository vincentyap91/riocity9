import React from 'react';
import {
    FileText,
    HelpCircle,
    Video
} from 'lucide-react';
import { PageSidebar, type PageSidebarItem } from './PageSidebar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const HELP_CENTER_ITEMS: Omit<PageSidebarItem, 'label'>[] = [
    { id: 'rules', icon: FileText, path: '/information-center?tab=rules' },
    { id: 'faq', icon: HelpCircle, path: '/information-center?tab=faq' },
    { id: 'video', icon: Video, path: '/information-center?tab=video' },
];

interface HelpCenterSidebarProps {
    activeId?: string;
    onSelect?: (id: string) => void;
}

function normalizeHelpCenterTab(value: string | null | undefined): string {
    const normalized = (value || '').trim().toLowerCase();
    return HELP_CENTER_ITEMS.some((item) => item.id === normalized) ? normalized : 'rules';
}

export function HelpCenterSidebar({ activeId, onSelect }: HelpCenterSidebarProps) {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();
    const items: PageSidebarItem[] = [
        { ...HELP_CENTER_ITEMS[0], label: t('footerRulesAndRegulation') },
        { ...HELP_CENTER_ITEMS[1], label: t('footerFaq') },
        { ...HELP_CENTER_ITEMS[2], label: t('footerVideoGuide') },
    ];

    // Determine active ID from URL if not provided
    const currentActiveId = normalizeHelpCenterTab(activeId || new URLSearchParams(location.search).get('tab'));

    const handleSelect = (id: string) => {
        const normalizedId = normalizeHelpCenterTab(id);
        const item = items.find(i => i.id === normalizedId);
        if (item?.path) {
            navigate(item.path);
        }
        if (onSelect) {
            onSelect(normalizedId);
        }
    };

    return (
        <PageSidebar
            items={items}
            activeId={currentActiveId}
            onSelect={handleSelect}
        />
    );
}

export { HELP_CENTER_ITEMS };
