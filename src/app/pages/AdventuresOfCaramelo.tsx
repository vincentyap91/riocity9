import React from 'react';
import { Link } from 'react-router-dom';
import { InsidePageHero } from '../components/shared/InsidePageHero';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb';
import { useLanguage } from '../contexts/LanguageContext';
import imgImagePromo from "@/assets/dba5dfffa741345e0ad70e36cafba5ab8b533760.png";

export function AdventuresOfCaramelo() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col flex-1 bg-[#02040a] min-h-screen overflow-x-hidden">
      <InsidePageHero image={imgImagePromo} />

      <div className="container mx-auto max-w-[1200px] px-4 relative z-10 pb-20 flex flex-col items-center">
        <div className="w-full max-w-5xl flex flex-col gap-4">
          <Breadcrumb>
            <BreadcrumbList className="text-xs text-white/60">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/slots">{t('slots')}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/slots">NAGA Game Slots</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-emerald-400">Adventures Of Caramelo</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="w-full rounded-xl bg-[#1a1f2a] border border-white/5 overflow-hidden">
            <div className="px-4 py-3 border-b border-white/10">
              <h2 className="text-white font-semibold text-sm md:text-base">Adventures Of Caramelo</h2>
            </div>
            <div className="p-4">
              <div className="w-full max-w-[420px] mx-auto aspect-[9/16] bg-[#0f1923] rounded-xl overflow-hidden">
                <iframe
                  id="game-iframe"
                  className="game-iframe w-full h-full"
                  src="https://staging-adventures-of-caramelo.topplatform.asia/?playerToken=7e0e88ad-0bd1-4d86-bfe7-0c1803647041&groupCode=oooo&brandCode=9teo&language=en"
                  allowFullScreen>
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
