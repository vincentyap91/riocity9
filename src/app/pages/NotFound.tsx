import img404 from "@/assets/img_404.png";
import { Link } from "react-router-dom";
import { InnerPageLayout } from "../components/shared/InnerPageLayout";

export function NotFound() {
  return (
    <InnerPageLayout className="overflow-hidden">
      {/* Background Glow from Promotions Page */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,_rgba(0,188,125,0.1)_0%,_rgba(0,188,125,0.05)_40%,_transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 min-h-[70vh] flex flex-col items-center justify-center relative z-10">
        <div className="max-w-2xl w-full flex flex-col items-center text-center space-y-6">
          {/* 404 Image */}
          <div className="w-full max-w-[500px]">
            <img
              src={img404}
              alt="404 Page Not Found"
              className="w-full h-auto object-contain drop-shadow-2xl"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-white font-black text-3xl md:text-4xl tracking-tight">
              Page Not Found
            </h1>
            <p className="text-gray-400 text-sm md:text-base font-medium">
              Sorry, the page you are looking for does not exist.
            </p>
          </div>

          <div className="pt-4">
            <Link
              to="/"
              className="inline-flex h-[42px] px-8 items-center justify-center bg-[#00bc7d] hover:bg-[#00a870] hover:shadow-[0_0_20px_rgba(0,188,125,0.4)] text-black font-black text-sm rounded-[10px] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Back To Home
            </Link>
          </div>
        </div>
      </div>
    </InnerPageLayout>
  );
}

