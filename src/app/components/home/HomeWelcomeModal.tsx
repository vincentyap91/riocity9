import React, { useEffect, useRef, useState } from 'react';
import { XIcon } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '../ui/dialog';
import { Checkbox } from '../ui/checkbox';
import bannerPhoto from '@/assets/photo-banner.jpg';

interface HomeWelcomeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: (suppressForOneHour: boolean) => void;
}

export function HomeWelcomeModal({ open, onOpenChange, onClose }: HomeWelcomeModalProps) {
  const [doNotShowForHour, setDoNotShowForHour] = useState(false);
  const scrollYRef = useRef(0);
  const bodyStyleRef = useRef({
    position: '',
    top: '',
    left: '',
    right: '',
    width: '',
    overflow: '',
  });

  useEffect(() => {
    if (open) {
      setDoNotShowForHour(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const body = document.body;
    scrollYRef.current = window.scrollY;
    bodyStyleRef.current = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    body.style.position = 'fixed';
    body.style.top = `-${scrollYRef.current}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';

    return () => {
      body.style.position = bodyStyleRef.current.position;
      body.style.top = bodyStyleRef.current.top;
      body.style.left = bodyStyleRef.current.left;
      body.style.right = bodyStyleRef.current.right;
      body.style.width = bodyStyleRef.current.width;
      body.style.overflow = bodyStyleRef.current.overflow;
      window.scrollTo(0, scrollYRef.current);
    };
  }, [open]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && open) {
      onClose(doNotShowForHour);
    }
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        overlayClassName="z-[120] bg-black/60 backdrop-blur-sm"
        className="fixed inset-0 top-0 left-0 z-[121] w-screen h-screen max-w-none translate-x-0 translate-y-0 p-0 border-0 bg-transparent shadow-none rounded-none overflow-y-auto overscroll-contain [&>button]:hidden"
      >
        <div
          className="w-full min-h-full"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              handleOpenChange(false);
            }
          }}
          onWheelCapture={(e) => e.stopPropagation()}
          onTouchMoveCapture={(e) => e.stopPropagation()}
        >
          <div
            className="relative my-8 mx-auto w-[calc(100vw-1.25rem)] max-w-[460px] bg-[#1a2230] border border-white/5 rounded-2xl text-white shadow-[0_28px_70px_rgba(0,0,0,0.72)]"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <DialogClose
              className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
              aria-label="Close"
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </DialogClose>
            <div className="p-4 sm:p-5">
              <div className="space-y-1.5">
                <DialogTitle className="text-base sm:text-sm font-bold text-white">
                  {"\u{1F381} Welcome to RIoCity9!"}
                </DialogTitle>
                <p className="text-sm sm:text-sm leading-tight text-white">
                  Claim your <span className="font-black">50% Welcome Bonus</span> on your first deposit.
                </p>
                <p className="text-sm sm:text-sm leading-tight text-white">
                  Plus, enjoy daily rewards, free spins & exclusive events!
                </p>
              </div>

              <div className="mt-4 overflow-hidden rounded-sm bg-black">
                <img src={bannerPhoto} alt="Welcome promo banner" className="w-full h-auto object-contain" />
              </div>

              <div className="mt-4 space-y-3">
                <label className="flex items-center gap-2.5 text-sm sm:text-base text-white/90 cursor-pointer select-none">
                  <Checkbox
                    checked={doNotShowForHour}
                    onCheckedChange={(checked) => setDoNotShowForHour(checked === true)}
                    className="h-4 w-4 rounded-[3px] border-white/35 bg-transparent data-[state=checked]:bg-[#00bc7d] data-[state=checked]:border-[#00bc7d] data-[state=checked]:text-black"
                  />
                  <span>Do not show again for the next hour</span>
                </label>

                <button
                  type="button"
                  onClick={() => handleOpenChange(false)}
                  className="w-full h-12 rounded-lg bg-[#45e882] hover:bg-[#39dd76] text-black font-bold text-[16px] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
