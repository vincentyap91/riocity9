import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { useLanguage } from '../../contexts/LanguageContext';

import img1 from "@/assets/885a36e12393d74bacab6db0538d96fd87ba9438.png";
import img2 from "@/assets/e5f97a30e079a67954a7c40846213b9264282f81.png";
import img3 from "@/assets/b4b31fea5716ada81ba321332263920c00921c42.png";
import img4 from "@/assets/221cab06066b632d65e966991e6a8a03e654c552.png";
import img5 from "@/assets/518665b3f9a37efd7b3220be2ae08bcddbdeef03.png";
import img6 from "@/assets/21713aae94d38a40c4ddf08b50d314e7ede97381.png";
import img7 from "@/assets/01161f9ee45e3ecb462523e6404b4a263da465c7.png";
import img8 from "@/assets/c1595c700540449ac4f84227f6ac7781542c44f0.png";
import img9 from "@/assets/1167d32ad1fd00717aa4ce79e41937b9631c5fd8.png";
import img10 from "@/assets/f5dba6427fc68600542606297323c24daeb918dd.png";
import img11 from "@/assets/04114dad5c4adbfe70881dd58886965dcf408076.png";
import img12 from "@/assets/db269bc165de28e457123814aec59c5c62248d10.png";
import img13 from "@/assets/66c03228c164b18b3c3467162ae4174e6cbe4226.png";
import img14 from "@/assets/206350387a250130cfb04ed67440399104615aba.png";
import img15 from "@/assets/f11e68ec241c3ab7e4efd2fc4eb41b45dbfdf1ed.png";
import img16 from "@/assets/9e64ac94f9dde0da752312d83ced30aa849adb5b.png";
import img17 from "@/assets/f4091a98d3b56d37ad156089724f1f35d6ebad8c.png";
import img18 from "@/assets/28233387cc0c6cef804dc40c24f5d00d586896b3.png";
import img19 from "@/assets/2a9e0b4cfd378127a0562b12cfb658391b6386f3.png";
import img20 from "@/assets/f8b9991e848fbd559b9bdb8e7f1ba530f5637794.png";
import img21 from "@/assets/aca0b69523c9e18e38fafdcb04b872aa634660f0.png";
import img22 from "@/assets/9956acd5fdab326a089d494779eed4aa0cb3134f.png";
import img23 from "@/assets/073cb7ff95dff89efd22ca5dace8edd3958e9611.png";
import img24 from "@/assets/beed9b73a227067255e9c9a1c83955194a865fbb.png";
import img25 from "@/assets/92666871fc063f7c25f5d020b4b59be454e40c83.png";
import img26 from "@/assets/383dc88e5e5bc9a19fe7f1c2bcd1dc1a0fe801a8.png";
import img27 from "@/assets/ee2f50f372d297d3da2e4c8421be89eb57dc8a16.png";
import img28 from "@/assets/15edbc6a0f6a322edc67ef867dfde211713da74d.png";
import img29 from "@/assets/0bda2150957ed9470c8858460ff4b62d197eeee5.png";
import img30 from "@/assets/fd7372a208da1622b2309af4f6887a131e950d12.png";
import img31 from "@/assets/a652adee03eebd658d0eb520464d06b12b6d2b64.png";
import img32 from "@/assets/400c9f116a394a5844c01090bd353900b144ec7f.png";
import img33 from "@/assets/13ea53a451b41f3e273a468c7892bf3d9477e98f.png";
import img34 from "@/assets/79aecc071b6c7cdfe4537d33d038e66b62dd8413.png";
import img35 from "@/assets/18e9555d03c729ff1a74c8b1217796a9ae3a7ed4.png";
import img36 from "@/assets/0dacc101167abef56660e90a2890a31087f9adc3.png";
import img37 from "@/assets/23dede49bd9aad768adc4a29a27c5016d2a0bf52.png";
import img38 from "@/assets/6040784854cc7da23b8fa4628c2f688f241ac3e1.png";
import img39 from "@/assets/b243b8095681e17478c2893b1fe183576c2ed857.png";
import img40 from "@/assets/c59f2205c7d55ba9093f0fa8090cfd42ed63b8bf.png";

// Select top 40 providers for the Hot list
const providers = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
  img21, img22, img23, img24, img25, img26, img27, img28, img29, img30,
  img31, img32, img33, img34, img35, img36, img37, img38, img39, img40
].map((img, index) => ({ id: index, logo: img }));

function CustomPrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className="absolute top-1/2 -left-4 -translate-y-1/2 z-10 cursor-pointer p-2 rounded-full bg-black/50 border border-white/10 text-white hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all backdrop-blur-sm"
      onClick={onClick}
    >
      <ChevronLeft className="w-5 h-5" />
    </div>
  );
}

function CustomNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className="absolute top-1/2 -right-4 -translate-y-1/2 z-10 cursor-pointer p-2 rounded-full bg-black/50 border border-white/10 text-white hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all backdrop-blur-sm"
      onClick={onClick}
    >
      <ChevronRight className="w-5 h-5" />
    </div>
  );
}

export function HotProviders() {
  const { t } = useLanguage();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <section className="w-full relative group/section">
      <SectionHeader
        title={
          <span>
            {t("hotProviders").split(" ").map((word, idx) => 
              idx === 0 ? word + " " : <span key={idx} className="text-[#00bc7d]">{word}</span>
            )}
          </span>
        }
        icon={
            <div className="p-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <Flame className="text-emerald-500 w-5 h-5" />
            </div>
        }
        action={null}
      />

      <div className="px-4 -mx-4">
        <Slider {...settings}>
          {providers.map((provider) => (
            <div key={provider.id} className="px-2">
              <div className="h-24 bg-[#0f1923] border border-white/5 hover:border-emerald-500/50 rounded-xl flex items-center justify-center group cursor-pointer transition-all hover:bg-white/5 hover:shadow-[0_0_15px_-5px_rgba(16,185,129,0.2)]">
                <div className="w-full h-full p-4 flex items-center justify-center opacity-100 group-hover:opacity-100 transition-all duration-300 group-hover:brightness-100 group-hover:invert-0">
                  <img 
                    src={provider.logo} 
                    alt={`Provider ${provider.id}`} 
                    className="max-h-full max-w-full object-contain" 
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
