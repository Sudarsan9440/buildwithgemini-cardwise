import React from 'react';
import { IndianRupee, QrCode, CreditCard, ShoppingBag, Store, ChevronDown } from 'lucide-react';
import { MERCHANT_PRESETS } from '../data/merchants';
import { MerchantCategory, MerchantPreset } from '../types/card';

interface SpendInputProps {
  amount: number;
  onAmountChange: (amt: number) => void;
  selectedMerchantId: string;
  onSelectMerchant: (merchant: MerchantPreset) => void;
  customMerchantName: string;
  onCustomMerchantChange: (name: string) => void;
  paymentRail: 'Card' | 'UPI';
  onPaymentRailChange: (rail: 'Card' | 'UPI') => void;
}

const AMOUNT_PILLS = [500, 1500, 4000, 10000];

export const SpendInput: React.FC<SpendInputProps> = ({
  amount,
  onAmountChange,
  selectedMerchantId,
  onSelectMerchant,
  customMerchantName,
  onCustomMerchantChange,
  paymentRail,
  onPaymentRailChange
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl shadow-slate-200/40 dark:shadow-slate-950/50 p-5 sm:p-7 transition-all">
      
      {/* Section Title */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-sm font-black">
              1
            </span>
            Enter Spend Details
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Evaluate the mathematical highest reward return across all payment rails
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Amount & Quick Pills */}
        <div className="lg:col-span-5 space-y-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Transaction Amount
          </label>
          
          <div className="relative rounded-2xl shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-emerald-600 dark:text-emerald-400">
              <span className="text-2xl font-bold">₹</span>
            </div>
            <input
              type="number"
              min="1"
              max="5000000"
              value={amount || ''}
              onChange={(e) => onAmountChange(Math.max(0, Number(e.target.value)))}
              className="block w-full rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 py-3.5 pl-11 pr-4 text-2xl font-extrabold text-slate-900 dark:text-white placeholder-slate-400 focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-['JetBrains_Mono',monospace]"
              placeholder="1,500"
            />
          </div>

          {/* Quick Amount Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mr-1">Quick:</span>
            {AMOUNT_PILLS.map((pill) => (
              <button
                key={pill}
                type="button"
                onClick={() => onAmountChange(pill)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  amount === pill
                    ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-500/40'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                ₹{pill.toLocaleString()}
              </button>
            ))}
          </div>

          {/* Payment Rail Selector */}
          <div className="pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
              Payment Rail / Mode
            </label>
            <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => onPaymentRailChange('Card')}
                className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  paymentRail === 'Card'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-md border border-slate-200/50 dark:border-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <CreditCard className="w-4 h-4 text-emerald-500" />
                <span>💳 Online / Card POS</span>
              </button>
              <button
                type="button"
                onClick={() => onPaymentRailChange('UPI')}
                className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  paymentRail === 'UPI'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400'
                }`}
              >
                <QrCode className="w-4 h-4 text-current" />
                <span>📲 UPI Scan & Pay</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Instant Merchant Presets */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Select Merchant / Category Preset
            </label>
            <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
              8 Instant Categories
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {MERCHANT_PRESETS.map((preset) => {
              const isSelected = selectedMerchantId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onSelectMerchant(preset)}
                  className={`text-left p-3 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between h-24 ${
                    isSelected
                      ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                      : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100/60 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xl">{preset.icon}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200/80 dark:bg-slate-700/80 text-slate-600 dark:text-slate-400'
                    }`}>
                      {preset.badge}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1 block">
                      {preset.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Custom Merchant Input */}
          <div className="pt-1">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customMerchantName}
                onChange={(e) => onCustomMerchantChange(e.target.value)}
                placeholder="Or type custom merchant name (e.g. Zepto, Uber, Dineout, Nykaa)..."
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
