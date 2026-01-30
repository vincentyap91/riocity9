import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ActivePromo {
  id: string;
  name: string;
  promoRolloverCurrent: number;
  promoRolloverTarget: number;
  targetCurrent: number;
  targetTarget: number;
}

interface ActivePromoContextType {
  activePromo: ActivePromo | null;
  setActivePromo: (promo: ActivePromo | null) => void;
}

const ActivePromoContext = createContext<ActivePromoContextType | undefined>(undefined);

export function ActivePromoProvider({ children }: { children: ReactNode }) {
  const [activePromo, setActivePromo] = useState<ActivePromo | null>(null);
  return (
    <ActivePromoContext.Provider value={{ activePromo, setActivePromo }}>
      {children}
    </ActivePromoContext.Provider>
  );
}

export function useActivePromo() {
  const ctx = useContext(ActivePromoContext);
  if (ctx === undefined) throw new Error('useActivePromo must be used within ActivePromoProvider');
  return ctx;
}
