import img580X32030WelcomeBonus from "@/assets/6b79fcd825e505f8172a2d0ba7c9e3799a10c8b3.png";
import img580X32050WelcomeBonus from "@/assets/c15e00d9b1be9da4f11d6d0feffdb780317f68d1.png";
import img580X320DepositNow from "@/assets/0c2a750a5f0647e704e83e028361f56f3ae681c6.png";
import img580X320RiocityIsNowLive from "@/assets/3449dcb243b36e5fd6bb853a05716a8409a3f700.png";
import img580X320TelegramOfficial from "@/assets/c9e2d2fd42b28402d2cda98320c75fc4cd9e0033.png";

export default function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute h-[320px] left-0 top-0 w-[580px]" data-name="580x320_30_WelcomeBonus">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img580X32030WelcomeBonus} />
      </div>
      <div className="absolute h-[320px] left-[620px] top-0 w-[580px]" data-name="580x320_50WelcomeBonus">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img580X32050WelcomeBonus} />
      </div>
      <div className="absolute h-[320px] left-[1240px] top-0 w-[580px]" data-name="580x320_DepositNow">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img580X320DepositNow} />
      </div>
      <div className="absolute h-[320px] left-0 top-[360px] w-[580px]" data-name="580x320_RiocityIsNowLive">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img580X320RiocityIsNowLive} />
      </div>
      <div className="absolute h-[320px] left-[620px] top-[360px] w-[580px]" data-name="580x320_TelegramOfficial">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img580X320TelegramOfficial} />
      </div>
    </div>
  );
}
