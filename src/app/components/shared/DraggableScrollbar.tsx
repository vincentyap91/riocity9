import React, { useRef, useEffect } from 'react';

interface DraggableScrollbarProps {
    containerRef: React.RefObject<HTMLDivElement | null>;
    minThumbWidth?: number;
    className?: string;
    trackWidth?: string;
    children?: React.ReactNode;
}

/**
 * A sleek, high-performance scrollbar that spans the container width.
 * Perfectly synced with any horizontal scrollable container.
 */
export const DraggableScrollbar: React.FC<DraggableScrollbarProps> = ({
    containerRef,
    minThumbWidth = 30,
    className = "",
    trackWidth = "w-full", // Default changed to full width
    children
}) => {
    const thumbRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const startScrollLeftRef = useRef(0);

    const updateThumbPosition = (scrollLeft: number, scrollWidth: number, clientWidth: number) => {
        if (!thumbRef.current || !trackRef.current) return;

        const trackWidthPx = trackRef.current.clientWidth;
        const maxScroll = scrollWidth - clientWidth;

        // Calculate thumb width based on visible ratio
        const thumbWidth = scrollWidth > clientWidth
            ? Math.max(minThumbWidth, (clientWidth / scrollWidth) * trackWidthPx)
            : trackWidthPx;

        thumbRef.current.style.width = `${thumbWidth}px`;

        if (maxScroll > 0) {
            const progress = scrollLeft / maxScroll;
            const leftPos = progress * (trackWidthPx - thumbWidth);
            thumbRef.current.style.left = `${leftPos}px`;
        } else {
            thumbRef.current.style.left = '0px';
        }
    };

    const handleSync = () => {
        const el = containerRef.current;
        if (el && !isDraggingRef.current) {
            updateThumbPosition(el.scrollLeft, el.scrollWidth, el.clientWidth);
        }
    };

    const setupDragListeners = (e: React.PointerEvent) => {
        const el = containerRef.current;
        const track = trackRef.current;
        const thumb = thumbRef.current;
        if (!el || !track || !thumb) return;

        isDraggingRef.current = true;
        startXRef.current = e.clientX;
        startScrollLeftRef.current = el.scrollLeft;

        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'grabbing';

        const trackWidthPx = track.clientWidth;
        const thumbWidth = thumb.clientWidth;
        const maxScroll = el.scrollWidth - el.clientWidth;
        const thumbTravel = trackWidthPx - thumbWidth;

        const onPointerMove = (ev: PointerEvent) => {
            if (!isDraggingRef.current) return;

            const deltaX = ev.clientX - startXRef.current;

            if (thumbTravel > 0) {
                const scrollRatio = maxScroll / thumbTravel;
                const targetScroll = startScrollLeftRef.current + (deltaX * scrollRatio);

                // Update scroll position immediately
                el.scrollLeft = targetScroll;

                // Update thumb visual IMMEDIATELY for zero lag
                updateThumbPosition(el.scrollLeft, el.scrollWidth, el.clientWidth);
            }
        };

        const onPointerUp = () => {
            isDraggingRef.current = false;
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
            window.removeEventListener('pointercancel', onPointerUp);
        };

        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);
    };

    const onTrackPointerDown = (e: React.PointerEvent) => {
        if (!containerRef.current || !trackRef.current || !thumbRef.current) return;
        if (e.target === thumbRef.current) return;

        const trackRect = trackRef.current.getBoundingClientRect();
        const clickX = e.clientX - trackRect.left;
        const thumbWidth = thumbRef.current.clientWidth;
        const trackWidthPx = trackRef.current.clientWidth;
        const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth;
        const thumbTravel = trackWidthPx - thumbWidth;

        if (thumbTravel > 0 && maxScroll > 0) {
            const targetThumbLeft = Math.max(0, Math.min(clickX - thumbWidth / 2, thumbTravel));
            const targetScrollLeft = (targetThumbLeft / thumbTravel) * maxScroll;

            containerRef.current.scrollLeft = targetScrollLeft;
            updateThumbPosition(containerRef.current.scrollLeft, containerRef.current.scrollWidth, containerRef.current.clientWidth);
            setupDragListeners(e);
        }
    };

    const onThumbPointerDown = (e: React.PointerEvent) => {
        e.stopPropagation();
        setupDragListeners(e);
    };

    useEffect(() => {
        const el = containerRef.current;
        if (el) {
            el.addEventListener('scroll', handleSync, { passive: true });
            window.addEventListener('resize', handleSync);
            // Initial sync
            setTimeout(handleSync, 50);
        }

        return () => {
            if (el) el.removeEventListener('scroll', handleSync);
            window.removeEventListener('resize', handleSync);
        };
    }, [containerRef]);

    // Re-sync when categories or data might change
    useEffect(() => {
        handleSync();
    });

    return (
        <div className={`w-full flex items-center gap-2 px-2 md:hidden ${className}`}>
            {children ? (
                <React.Fragment>
                    {React.Children.map(children, (child, index) => {
                        if (index === 0) {
                            return (
                                <React.Fragment key={index}>
                                    {child}
                                    <div
                                        ref={trackRef}
                                        onPointerDown={onTrackPointerDown}
                                        className="flex-1 h-1.5 bg-[#0f172a] rounded-full relative overflow-hidden cursor-pointer"
                                        style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)' }}
                                    >
                                        <div
                                            ref={thumbRef}
                                            onPointerDown={onThumbPointerDown}
                                            className="absolute top-0 bottom-0 bg-[#4b5563] rounded-full cursor-grab active:cursor-grabbing active:bg-[#00e588] transition-colors duration-200"
                                            style={{ width: `${minThumbWidth}px`, left: '0px' }}
                                        />
                                    </div>
                                </React.Fragment>
                            );
                        }
                        return child;
                    })}
                </React.Fragment>
            ) : (
                <div
                    ref={trackRef}
                    onPointerDown={onTrackPointerDown}
                    className={`${trackWidth} h-1.5 bg-[#0f172a] rounded-full relative overflow-hidden cursor-pointer`}
                    style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)' }}
                >
                    <div
                        ref={thumbRef}
                        onPointerDown={onThumbPointerDown}
                        className="absolute top-0 bottom-0 bg-[#4b5563] rounded-full cursor-grab active:cursor-grabbing active:bg-[#00e588] transition-colors duration-200"
                        style={{ width: `${minThumbWidth}px`, left: '0px' }}
                    />
                </div>
            )}
        </div>
    );
};
