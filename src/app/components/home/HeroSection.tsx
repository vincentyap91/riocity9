import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from '../ui/button';
import { ArrowRight, MessageCircle, Wallet, Sparkles, Zap } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

// Imported Assets
import img30Bonus from "@/assets/6b79fcd825e505f8172a2d0ba7c9e3799a10c8b3.png";
import img50Bonus from "@/assets/c15e00d9b1be9da4f11d6d0feffdb780317f68d1.png";
import imgDeposit from "@/assets/a89549a47117579171a3acb01660952b44ae0f67.png"; // Updated Deposit Image
import imgUnlimitedBonus from "@/assets/d101476c8661ced83614d896975cc0524f0ec119.png"; // New 5% Bonus Image
import imgLive from "@/assets/f470efce5aa86066c1a4369e61fdae1d4ff30b86.png"; // Updated Main Live Image

export function HeroSection() {
  const { t } = useLanguage();
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    fade: true, 
    cssEase: 'linear',
    appendDots: (dots: any) => (
        <div style={{ bottom: "20px" }}>
            <ul style={{ margin: "0px", padding: "0" }}> {dots} </ul>
        </div>
    ),
    customPaging: (i: number) => (
        <div className="rounded-full bg-white/40 hover:bg-[#00bc7d] transition-all cursor-pointer backdrop-blur-sm" />
    )
  };

  // Main Slider Content (Brand & Welcome Bonuses)
  const slides = [
    { 
        id: 1, 
        image: imgLive, 
        alt: "RioCity9 Is Now Live",
        action: t("playNow"),
        showButton: false // The image has "RioCity9" text, button might obscure it.
    },
    { 
        id: 2, 
        image: img50Bonus, 
        alt: "50% Welcome Bonus",
        action: t("claim50Bonus"),
        showButton: true
    },
    { 
        id: 3, 
        image: img30Bonus, 
        alt: "30% Welcome Bonus",
        action: t("claim30Bonus"),
        showButton: true
    }
  ];

  return (
    <section className="relative w-full">
      {/* Layout: ~950px main and ~530px side. Ratio is approx 64% / 36% */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-auto lg:h-[400px] xl:h-[525px]">
        
        {/* Main Banner Slider (Large) */}
        <div className="lg:col-span-8 relative rounded-3xl overflow-hidden group border border-white/10 shadow-2xl leading-[0]">
             <Slider {...settings} className="h-full w-full hero-slider">
                {slides.map((slide) => (
                    <div key={slide.id} className="relative w-full h-[200px] md:h-[380px] lg:h-full outline-none">
                        <img 
                            src={slide.image} 
                            alt={slide.alt} 
                            className="w-full h-full object-cover block transition-transform duration-[2000ms] hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                        
                        {/* Action Button - Floating Call to Action */}
                        {slide.showButton && (
                            <div className="absolute bottom-8 right-8 z-20 hidden md:block">
                                <Button className="h-12 px-8 bg-[#00bc7d] hover:bg-[#00a870] text-black font-black text-lg uppercase rounded-xl shadow-[0_0_20px_-5px_rgba(16,185,129,0.6)] transition-all hover:scale-105 hover:-translate-y-1 ring-2 ring-[#00bc7d]/50 ring-offset-2 ring-offset-black">
                                    {slide.action} <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </div>
                        )}
                    </div>
                ))}
             </Slider>
        </div>

        {/* Side Banners (Stacked) */}
        <div className="lg:col-span-4 h-full">
            {/* Desktop: Stacked Layout */}
            <div className="hidden lg:flex flex-col gap-4 h-full">
                {/* Top Side Banner: Deposit Now */}
                <div className="relative flex-1 rounded-3xl overflow-hidden group cursor-pointer border border-white/10 shadow-xl bg-[#02040a]">
                    <img 
                        src={imgDeposit} 
                        alt="Deposit BRL8 Get BRL1" 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300"></div>
                </div>

                {/* Bottom Side Banner: 5% Unlimited Bonus */}
                <div className="relative flex-1 rounded-3xl overflow-hidden group cursor-pointer border border-white/10 shadow-xl bg-[#02040a]">
                     <img 
                        src={imgUnlimitedBonus} 
                        alt="5% Unlimited Bonus" 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300"></div>
                </div>
            </div>

            {/* Mobile/Tablet: Slider Layout */}
            <div className="block hidden h-[220px]">
                <Slider {...settings} slidesToShow={1} slidesToScroll={1} arrows={false} autoplay={true} autoplaySpeed={3000} dots={true} className="h-full w-full side-banner-slider">
                    {/* Slide 1: Deposit */}
                    <div className="h-[220px] px-1">
                        <div className="relative w-full h-full rounded-3xl overflow-hidden group cursor-pointer border border-white/10 shadow-xl bg-[#02040a]">
                            <img 
                                src={imgDeposit} 
                                alt="Deposit" 
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    {/* Slide 2: Bonus */}
                    <div className="h-[220px] px-1">
                        <div className="relative w-full h-full rounded-3xl overflow-hidden group cursor-pointer border border-white/10 shadow-xl bg-[#02040a]">
                            <img 
                                src={imgUnlimitedBonus} 
                                alt="Bonus" 
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
      </div>
      
      {/* Custom Styles for Slider Dots */}
      <style>{`
        .hero-slider,
        .hero-slider .slick-list,
        .hero-slider .slick-track {
            height: 100%;
        }
        .hero-slider .slick-slide {
            height: 100%;
        }
        .hero-slider .slick-slide > div {
            height: 100%;
            display: flex;
        }
        .hero-slider .slick-dots {
            bottom: 15px;
            z-index: 20;
            display: flex !important;
            align-items: center;
            justify-content: center;
        }
        .hero-slider .slick-dots li {
            width: auto;
            margin: 0 4px;
            height: auto;
        }
        .hero-slider .slick-dots li div {
            width: 8px;
            height: 8px;
            border-radius: 9999px;
            background: rgba(255,255,255,0.4);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .hero-slider .slick-dots li.slick-active div {
            background: #00bc7d;
            width: 28px;
            box-shadow: 0 0 12px rgba(0,188,125,0.6);
        }
      `}</style>
    </section>
  );
}
