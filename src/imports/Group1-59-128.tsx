import imgAllGame from "@/assets/c5d7ae504f95f8e3f47d55213831742c459d7099.png";
import imgArcade from "@/assets/53263ca9a54426b4a32aa17d809b8b008ea9c4e8.png";
import imgBingo from "@/assets/b18479f8e5e33aa224b895a9f36e7daacafa6f8b.png";
import imgCrash from "@/assets/00362ab24b6306e2f3da1919c3c0e9b0646e8a4a.png";
import imgESport from "@/assets/6cee240212e15098616465e7ecddb8e1a9fc8b8c.png";
import imgExchangeCricketSport from "@/assets/c1c7eb6add6359393460fac872be1cf830b83342.png";
import imgFish from "@/assets/71667b097dc0233c71967c40c7e2dc37f4fa9f8c.png";
import imgLiveCasino from "@/assets/03eddcf1c2f25160add74dab60888b5e1fbcbf0c.png";
import imgLottery from "@/assets/af677f51763a7d30421eaa9d516d2530e6c1b60c.png";
import imgPoker from "@/assets/39e95f9e755928013b35ccb3b0a3be872530bc77.png";
import imgPromotion from "@/assets/f469b87ddf2576bda24df34b84c1167e741e6b8c.png";
import imgSlot from "@/assets/dba5dfffa741345e0ad70e36cafba5ab8b533760.png";
import imgSport from "@/assets/e807beb4ab61c26c4afaecc32f24c795ff679981.png";

export default function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute h-[450px] left-0 top-0 w-[1630px]" data-name="ALL-GAME">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgAllGame} />
      </div>
      <div className="absolute h-[450px] left-[1670px] top-0 w-[1630px]" data-name="Arcade">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgArcade} />
      </div>
      <div className="absolute h-[450px] left-[3340px] top-0 w-[1630px]" data-name="BINGO">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgBingo} />
      </div>
      <div className="absolute h-[450px] left-[5010px] top-0 w-[1630px]" data-name="Crash">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgCrash} />
      </div>
      <div className="absolute h-[450px] left-0 top-[490px] w-[1630px]" data-name="E-Sport">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgESport} />
      </div>
      <div className="absolute h-[450px] left-[1670px] top-[490px] w-[1630px]" data-name="EXCHANGE_CricketSport">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgExchangeCricketSport} />
      </div>
      <div className="absolute h-[450px] left-[3340px] top-[490px] w-[1630px]" data-name="FISH">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFish} />
      </div>
      <div className="absolute h-[450px] left-[5010px] top-[490px] w-[1630px]" data-name="Live-Casino">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgLiveCasino} />
      </div>
      <div className="absolute h-[450px] left-0 top-[980px] w-[1630px]" data-name="LOTTERY">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgLottery} />
      </div>
      <div className="absolute h-[450px] left-[1670px] top-[980px] w-[1630px]" data-name="Poker_">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgPoker} />
      </div>
      <div className="absolute h-[450px] left-[3340px] top-[980px] w-[1630px]" data-name="PROMOTION">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgPromotion} />
      </div>
      <div className="absolute h-[450px] left-[5010px] top-[980px] w-[1630px]" data-name="SLOT">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgSlot} />
      </div>
      <div className="absolute h-[450px] left-0 top-[1470px] w-[1630px]" data-name="SPORT">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgSport} />
      </div>
    </div>
  );
}
