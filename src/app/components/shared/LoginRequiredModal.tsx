import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from '../ui/dialog';
import { Button } from '../ui/button';

interface LoginRequiredModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginRequiredModal({ isOpen, onOpenChange }: LoginRequiredModalProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#131b29] border border-white/10 rounded-2xl p-6 max-w-[380px] flex flex-col items-center text-center text-white">
        <div className="text-base font-semibold">You are not logged in. Please login to continue.</div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => {
              sessionStorage.setItem('redirectAfterLogin', `${location.pathname}${location.search}`);
              onOpenChange(false);
              navigate('/login');
            }}
            className="h-10 px-4 bg-[#00bc7d] hover:bg-[#00a870] text-black font-bold rounded-xl"
          >
            Login
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-10 px-4 border-white/10 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
