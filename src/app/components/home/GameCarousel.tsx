import React, { useRef } from 'react';
import Slider, { Settings } from 'react-slick';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import { SectionHeader } from './SectionHeader';
import { useLanguage } from '../../contexts/LanguageContext';

interface GameItem {
  id: string | number;
  title: string;
  provider: string;
  image: string;
  tag?: string;
}

interface GameCarouselProps {
  title: React.ReactNode;
  icon: React.ReactNode;
  items: GameItem[];
  className?: string;
  slidesToShow?: number;
  aspectRatio?: string;
}

export function GameCarousel({ title, icon, items, className, slidesToShow = 4, aspectRatio = "aspect-[16/10]" }: GameCarouselProps) {
  const { t } = useLanguage();
  const sliderRef = useRef<Slider>(null);

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: false, // We use custom arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(slidesToShow, 3),
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPX: 40
        }
      }
    ]
  };

  const next = () => {
    sliderRef.current?.slickNext();
  };

  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Header */}
      <SectionHeader 
        title={title}
        icon={icon}
        action={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:flex h-8 text-[11px] uppercase font-bold text-[rgb(148,163,184)] hover:text-emerald-400 hover:bg-emerald-500/10 border border-[rgb(148,163,184,0.3)] rounded-full transition-all mr-2">
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
      <div className="-mx-2">
        <Slider ref={sliderRef} {...settings}>
          {items.map((item) => (
            <div key={item.id} className="px-2 pb-4">
              <div className="group relative flex flex-col gap-3 cursor-pointer">
                {/* Image Container */}
                <div className={`relative ${aspectRatio} overflow-hidden rounded-2xl ring-1 ring-white/10 bg-[#1a2536] transition-all duration-300`}>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] transform scale-50 group-hover:scale-100 transition-transform duration-300">
                      <ArrowRight className="w-6 h-6 text-black stroke-[3]" />
                    </div>
                  </div>
                  
                  {/* Provider Logo / Tag Overlay (Optional) */}
                  {item.tag && (
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[11px] font-bold uppercase tracking-wider text-white border border-white/10">
                      {item.tag}
                    </div>
                  )}
                </div>

                {/* Text Content */}
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-500 transition-colors truncate">
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
