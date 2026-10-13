import React, { useState } from 'react';
import { X, RotateCcw, ShieldCheck, Check, SlidersHorizontal, Info, IndianRupee } from 'lucide-react';
import { INITIAL_INSTRUMENTS } from '../data/instruments';
import { UserWalletState } from '../types/card';

interface WalletDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  walletState: UserWalletState;
  onToggleCard: (cardId: string) => void;
  onUpdateCardSpend: (cardId: string, amount: number) => void;
  onSetAmexCount: (count: number) => void;
  onSetTaxBracket: (bracket: number) => void;
  onReset: () => void;
}

export const WalletDrawer: React.FC<WalletDrawerProps> = ({
  isOpen,
  onClose,
  walletState,
  onToggleCard,
  onUpdateCardSpend,
  onSetAmexCount,
  onSetTaxBracket,
  onReset
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Manage Wallet & Spend Caps
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Toggle active cards and simulate monthly spend caps
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Global Settings Box */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Simulation Controls
              </h4>

              {/* Tax Bracket */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Income Tax Bracket (for Zaggle Meal Card tax shield):
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[0.20, 0.30, 0.39].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => onSetTaxBracket(rate)}
                      className={`py-1.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                        walletState.taxBracket === rate
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {rate === 0.39 ? '39% (HNI)' : `${(rate * 100).toFixed(0)}% Tax`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amex MRCC Milestone Count */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Amex MRCC 4x ₹1,500 Transactions Logged This Month:
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[0, 1, 2, 3, 4].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => onSetAmexCount(count)}
                      className={`py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        walletState.amexMilestoneTxnCount === count
                          ? 'bg-sky-600 text-white border-sky-500 shadow-sm'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {count}/4
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Individual Cards List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Active Wallet Instruments ({INITIAL_INSTRUMENTS.length})
                </span>
                <span className="text-[11px] text-slate-500">
                  Toggle on/off or simulate spend
                </span>
              </div>

              {INITIAL_INSTRUMENTS.map((card) => {
                const isEnabled = walletState.enabledCards[card.id] !== false;
                const spent = walletState.spentThisMonth[card.id] || 0;
                
                // Find primary cap if any
                const primaryCap = card.monthlyCap || (card.categories && Object.values(card.categories).find(c => c.cap)?.cap);

                return (
                  <div
                    key={card.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isEnabled
                        ? 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 shadow-sm'
                        : 'bg-slate-100/60 dark:bg-slate-900/60 border-slate-200/50 dark:border-slate-800 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-sm text-slate-900 dark:text-white">
                            {card.name}
                          </span>
                          {card.isLTF && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                              LTF
                            </span>
                          )}
                          <span className="text-[10px] font-semibold text-slate-500 uppercase">
                            {card.rail}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {card.ruleSummary}
                        </p>
                      </div>

                      {/* Enable/Disable Toggle */}
                      <button
                        type="button"
                        onClick={() => onToggleCard(card.id)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          isEnabled ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            isEnabled ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Spend Cap Simulator (if card has a monthly cap) */}
                    {primaryCap && isEnabled && (
                      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-semibold text-slate-600 dark:text-slate-300">
                            Simulate Spent This Month:
                          </span>
                          <span className="font-mono font-bold text-slate-900 dark:text-white">
                            ₹{spent.toLocaleString()} / ₹{primaryCap.toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <input
                            type="range"
                            min="0"
                            max={primaryCap}
                            step="100"
                            value={spent}
                            onChange={(e) => onUpdateCardSpend(card.id, Number(e.target.value))}
                            className="w-full accent-emerald-600 cursor-pointer"
                          />
                          <button
                            type="button"
                            onClick={() => onUpdateCardSpend(card.id, primaryCap)}
                            className="text-[10px] px-2 py-0.5 rounded font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 hover:bg-amber-200 shrink-0"
                          >
                            Set Cap Reached
                          </button>
                          <button
                            type="button"
                            onClick={() => onUpdateCardSpend(card.id, 0)}
                            className="text-[10px] px-1.5 py-0.5 rounded font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 shrink-0"
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

          {/* Footer */}
          <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-center justify-between">
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All Defaults</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 cursor-pointer transition-all"
            >
              Apply & Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
