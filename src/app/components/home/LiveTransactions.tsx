import React from 'react';
import { User, ArrowRightLeft } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { useLanguage } from '../../contexts/LanguageContext';

const transactions = [
  { user: '***12', amount: '1000.00', type: 'deposit', rank: 1 },
  { user: '***as', amount: '50.00', type: 'withdrawal', rank: 2 },
  { user: '***o2', amount: '50.00', type: 'deposit', rank: 2 },
  { user: '***jw', amount: '50.00', type: 'withdrawal', rank: 3 },
  { user: '*********12', amount: '50.00', type: 'deposit', rank: 2 },
  { user: '******n2', amount: '50.00', type: 'withdrawal', rank: 2 },
  { user: '***12', amount: '50.00', type: 'deposit', rank: 1 },
  { user: '*****on', amount: '1.00', type: 'withdrawal', rank: 2 },
  { user: '***99', amount: '250.00', type: 'deposit', rank: 1 },
  { user: '***xx', amount: '12.00', type: 'withdrawal', rank: 2 },
];

export function LiveTransactions() {
  const { t } = useLanguage();
  const deposits = transactions.filter(t => t.type === 'deposit').slice(0, 5);
  const withdrawals = transactions.filter(t => t.type === 'withdrawal').slice(0, 5);

  return (
    <section className="w-full">
      <SectionHeader
        title={
          <span>
            {t("liveTransactions").split(" ").map((word, idx) => 
              idx === 0 ? word + " " : <span key={idx} className="text-[#2b7fff]">{word}</span>
            )}
          </span>
        }
        icon={
            <div className="p-1.5 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <ArrowRightLeft className="text-blue-500 w-5 h-5" />
            </div>
        }
        action={null}
      />
      
      <div className="bg-[#0f1923] rounded-xl border border-white/5 overflow-hidden shadow-lg hover:shadow-blue-500/10 transition-shadow duration-300">
        <div className="rounded-lg overflow-hidden">
             {/* Header */}
            <div className="grid grid-cols-2 bg-[#16222d] border-b border-white/5">
                <div className="py-3 text-center flex items-center justify-center gap-2 border-r border-white/5">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse hidden md:block"></div>
                    <span className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-widest">
                        {t("lastDeposits")}
                    </span>
                </div>
                <div className="py-3 text-center flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#00bc7d] animate-pulse hidden md:block"></div>
                    <span className="text-[10px] md:text-xs font-bold text-emerald-400 uppercase tracking-widest">
                        {t("lastWithdrawals")}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-2 divide-x divide-white/5 bg-[#0a0f19]/50">
                {/* Deposits */}
                <div className="flex flex-col">
                    {deposits.map((t, i) => (
                    <div key={`dep-${i}`} className="relative flex items-center justify-between p-2 md:p-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                        {/* Mobile Optimized User Info */}
                        <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
                            <div className={`w-8 h-8 md:w-8 md:h-8 rounded-full flex items-center justify-center bg-gradient-to-br shadow-lg shrink-0 ${
                                t.rank === 1 
                                ? 'from-yellow-500 to-orange-600 text-black border border-yellow-400/50' 
                                : 'from-slate-700 to-slate-800 text-white border border-white/10'
                            }`}>
                                <User className="w-4 h-4 md:w-4 md:h-4" />
                            </div>
                            <span className="text-sm md:text-sm font-medium text-gray-400 group-hover:text-white transition-colors truncate max-w-[80px] md:max-w-none">{t.user}</span>
                        </div>
                        
                        {/* Amount */}
                        <div className="flex flex-col items-end">
                            <span className="font-bold text-white tabular-nums text-sm md:text-base tracking-tight">
                                <span className="text-blue-400">{t.amount}</span>
                            </span>
                        </div>
                    </div>
                    ))}
                </div>

                {/* Withdrawals */}
                <div className="flex flex-col">
                    {withdrawals.map((t, i) => (
                    <div key={`with-${i}`} className="relative flex items-center justify-between p-2 md:p-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                        {/* Mobile Optimized User Info */}
                        <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
                             <div className={`w-8 h-8 md:w-8 md:h-8 rounded-full flex items-center justify-center bg-gradient-to-br shadow-lg shrink-0 ${
                                t.rank === 1 
                                ? 'from-yellow-500 to-orange-600 text-black border border-yellow-400/50' 
                                : 'from-slate-700 to-slate-800 text-white border border-white/10'
                            }`}>
                                <User className="w-4 h-4 md:w-4 md:h-4" />
                            </div>
                            <span className="text-sm md:text-sm font-medium text-gray-400 group-hover:text-white transition-colors truncate max-w-[80px] md:max-w-none">{t.user}</span>
                        </div>

                         {/* Amount */}
                         <div className="flex flex-col items-end">
                            <span className="font-bold text-white tabular-nums text-sm md:text-base tracking-tight">
                                <span className="text-emerald-400">{t.amount}</span>
                            </span>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}

