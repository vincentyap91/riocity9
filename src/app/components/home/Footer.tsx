import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, MessageCircle, ShieldCheck, Globe, CreditCard } from 'lucide-react';
import { Button } from '../ui/button';
import { FooterLogos } from './FooterLogos';
import footerImg from '@/assets/ab51aaf74198704deed553b4c904f3b833b221cb.png';
import { useLanguage } from '../../contexts/LanguageContext';
import { HOME_PAGE } from '../../config/themeTokens';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#02040a] border-t border-white/10 pt-8 pb-24 md:pb-8 text-sm">
      <div className={`container mx-auto ${HOME_PAGE.maxWidth} px-4`}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-15 gap-10 lg:gap-8 mb-16">

          {/* Column 1: Help Center */}
          <div className="flex flex-col gap-4 col-span-3">
            <h3 className="text-white font-bold text-lg mb-2">{t("footerInformationCenter")}</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="/information-center?tab=rules" className="hover:text-emerald-400 transition-colors">Rules and Regulation</a></li>
              <li><a href="/information-center?tab=faq" className="hover:text-emerald-400 transition-colors">{t("footerFaq")}</a></li>
              <li><a href="/information-center?tab=video" className="hover:text-emerald-400 transition-colors">Video Guide</a></li>
            </ul>
          </div>

          {/* Column 2: Payment Methods */}
          <div className="col-span-4">
            <h3 className="text-white font-bold text-lg mb-4">{t("footerPaymentMethods")}</h3>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/5 border border-white/10 rounded px-2 py-1 flex items-center gap-1 text-white text-xs font-bold">
                <CreditCard className="w-4 h-4" /> Online Banking
              </div>
              <div className="bg-white/5 border border-white/10 rounded px-2 py-1 flex items-center gap-1 text-white text-xs font-bold">
                <CreditCard className="w-4 h-4" /> Touch n Go
              </div>
              <div className="bg-white/5 border border-white/10 rounded px-2 py-1 flex items-center gap-1 text-white text-xs font-bold">
                <CreditCard className="w-4 h-4" /> DuitNow
              </div>
            </div>
          </div>

          {/* Column 3: Follow Us */}
          <div className="col-span-4">
            <h3 className="text-white font-bold text-lg mb-4">{t("footerFollowUs")}</h3>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/5 hover:bg-[#1DA1F2] hover:text-white transition-all">
                <Globe className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/5 hover:bg-black hover:text-white transition-all">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/5 hover:bg-[#1877F2] hover:text-white transition-all">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/5 hover:bg-[#E4405F] hover:text-white transition-all">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/5 hover:bg-[#FF0000] hover:text-white transition-all">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Column 4: Certifications */}
          <div className="col-span-4">
            <h3 className="text-white font-bold text-lg mb-4">{t("footerCertifications")}</h3>
            <div className="flex flex-wrap items-center gap-4 text-gray-400">
              <div className="border border-white/20 rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs">18+</div>
              <div className="flex items-center gap-1 font-bold text-white"><ShieldCheck className="w-4 h-4" /> OGS</div>
              <div className="font-bold text-lg tracking-tight text-white">BeGambleAware®</div>
            </div>
          </div>
        </div>

        {/* Footer Logos Marquee - Moved above the legal text for better hierarchy */}
        <FooterLogos />

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="text-xl font-black tracking-tight text-white">
                Rio<span className="text-emerald-500">City9</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block text-xs text-gray-600">
            {t("footerCopyright")}
          </div>
        </div>

        {/* Footer Logos Grid */}

      </div>
    </footer>
  );
}
