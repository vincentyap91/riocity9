import React from 'react';
import {
    FileText,
    HelpCircle,
    Video
} from 'lucide-react';
import { PageSidebar, type PageSidebarItem } from './PageSidebar';
import { useNavigate, useLocation } from 'react-router-dom';

const HELP_CENTER_ITEMS: PageSidebarItem[] = [
    { id: 'rules', label: 'Rules and Regulation', icon: FileText, path: '/information-center?tab=rules' },
    { id: 'faq', label: 'FAQ', icon: HelpCircle, path: '/information-center?tab=faq' },
    { id: 'video', label: 'Video Guide', icon: Video, path: '/information-center?tab=video' },
];

interface HelpCenterSidebarProps {
    activeId?: string;
    onSelect?: (id: string) => void;
}

export function HelpCenterSidebar({ activeId, onSelect }: HelpCenterSidebarProps) {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine active ID from URL if not provided
    const currentActiveId = activeId || new URLSearchParams(location.search).get('tab') || 'rules';

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
