import React from 'react';
import { CreditCard, Wallet, Moon, Sun, ShieldCheck, Sparkles, SlidersHorizontal } from 'lucide-react';
import { INITIAL_INSTRUMENTS } from '../data/instruments';
import { UserWalletState } from '../types/card';

interface HeaderProps {
  walletState: UserWalletState;
  onOpenWalletDrawer: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  walletState,
  onOpenWalletDrawer,
  isDark,
  onToggleTheme
}) => {
  const totalCards = INITIAL_INSTRUMENTS.length;
  const activeCardsCount = Object.values(walletState.enabledCards).filter(Boolean).length;
  const ltfCount = INITIAL_INSTRUMENTS.filter(c => c.isLTF).length;
  const paidCount = INITIAL_INSTRUMENTS.filter(c => !c.isLTF).length;
  const rupayCount = INITIAL_INSTRUMENTS.filter(c => c.network === 'RuPay').length;

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3.5">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-500 shadow-lg shadow-emerald-500/20 text-white">
              <CreditCard className="w-6 h-6 transform -rotate-6" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-900 animate-ping" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-900" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-emerald-800 to-teal-700 dark:from-white dark:via-emerald-300 dark:to-teal-200 bg-clip-text text-transparent">
                  CardWise
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-700/60">
                  <Sparkles className="w-3 h-3 mr-1 text-emerald-500" /> v1.0
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                Personal Spend & Reward Optimizer · <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{totalCards} Active Instruments</span>
              </p>
            </div>
          </div>

          {/* Badges & Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Quick Metrics Badges (Desktop) */}
            <div className="hidden lg:flex items-center space-x-2 text-xs font-semibold">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-500" /> {ltfCount} LTF Cards
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60">
                {paidCount} Paid Cards
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/60">
                {rupayCount} RuPay UPI
              </span>
            </div>

            {/* Wallet Drawer Button */}
            <button
              onClick={onOpenWalletDrawer}
              className="relative inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 shadow-md shadow-slate-900/10 dark:shadow-emerald-900/20 transition-all active:scale-95 cursor-pointer"
              title="Configure Wallet Cards and Spend Caps"
            >
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">My Wallet</span>
              <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold rounded-full bg-slate-700 dark:bg-emerald-800 text-white">
                {activeCardsCount}/{totalCards}
              </span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
