import React, { useEffect, useRef, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { SectionHeader } from './SectionHeader';
import { useLanguage } from '../../contexts/LanguageContext';
import { SmallOverlayTag } from '../shared/SmallOverlayTag';
import { SlotsGameHoverOverlay } from '../shared/SlotsGameHoverOverlay';

interface GameItem {
  id: string | number;
  title: string;
  provider: string;
  image: string;
  tag?: string;
  link?: string;
}

interface GameCarouselProps {
  title: React.ReactNode;
  icon: React.ReactNode;
  items: GameItem[];
  className?: string;
  slidesToShow?: number;
  aspectRatio?: string;
  mobileSlidesToShow?: number;
  viewAllPath?: string;
}

export function GameCarousel({ title, icon, items, className, slidesToShow = 4, aspectRatio = "aspect-[16/10]", mobileSlidesToShow = 1, viewAllPath }: GameCarouselProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const sliderRef = useRef<Slider>(null);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1280
  );

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const resolvedSlidesToShow =
    viewportWidth < 768
      ? mobileSlidesToShow
      : viewportWidth < 1024
        ? Math.min(slidesToShow, 3)
        : viewportWidth < 1280
          ? Math.min(slidesToShow, 4)
          : slidesToShow;

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: resolvedSlidesToShow,
    slidesToScroll: 1,
    arrows: false, // We use custom arrows
    swipeToSlide: true,
    adaptiveHeight: true,
    focusOnSelect: false,
  };

  const next = () => {
    sliderRef.current?.slickNext();
  };

  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Header */}
      <SectionHeader
        title={title}
        icon={icon}
        action={
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => viewAllPath && navigate(viewAllPath)}
              className="hidden sm:flex h-9 text-xs font-bold uppercase text-gray-400 hover:text-[#00bc7d] hover:bg-[#00bc7d]/10 border border-white/10 rounded-xl transition-all mr-2"
            >
              {t("viewAll")}
            </Button>
            <div className="flex gap-1">
              <Button
                onClick={previous}
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full bg-secondary/50 hover:bg-secondary text-white border border-white/10"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                onClick={next}
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full bg-secondary/50 hover:bg-secondary text-white border border-white/10"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        }
      />

      {/* Slider */}
      <div className="overflow-hidden px-0 sm:px-2">
        <Slider ref={sliderRef} {...settings}>
          {items.map((item) => (
            <div key={item.id} className="px-2 pb-4">
              <div
                className={`group relative flex flex-col gap-3 ${item.link ? 'cursor-pointer' : ''}`}
                onClick={() => item.link && navigate(item.link)}
              >
                {/* Image Container */}
                <div className={`relative ${aspectRatio} overflow-hidden rounded-xl border border-white/5 bg-[#0f1923] transition-all duration-300 hover:border-[#39ff88]/30`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <SlotsGameHoverOverlay />

                  {/* Provider Logo / Tag Overlay (Optional) */}
                  {item.tag && (
                    <SmallOverlayTag label={item.tag} />
                  )}
                </div>

                {/* Text Content */}
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-sm font-bold text-white transition-colors truncate group-hover:text-[#39ff88]">
                    {item.title}
                  </h3>
                  <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider truncate">
                    {item.provider}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
