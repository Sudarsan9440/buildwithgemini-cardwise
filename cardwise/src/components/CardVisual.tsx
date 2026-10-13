import React from 'react';
import { Instrument } from '../types/card';
import { Wifi, ShieldCheck, Sparkles } from 'lucide-react';

interface CardVisualProps {
  card: Instrument;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export const CardVisual: React.FC<CardVisualProps> = ({
  card,
  size = 'md',
  showDetails = true
}) => {
  const gradient = card.cardGradient || 'from-slate-700 via-slate-800 to-slate-950';

  const sizeClasses = {
    sm: 'w-48 h-28 p-3 rounded-xl text-xs',
    md: 'w-64 sm:w-72 h-40 sm:h-44 p-4 sm:p-5 rounded-2xl text-xs sm:text-sm',
    lg: 'w-full max-w-sm h-48 sm:h-52 p-5 sm:p-6 rounded-3xl text-sm'
  }[size];

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${gradient} text-white shadow-xl shadow-black/20 flex flex-col justify-between border border-white/15 select-none transition-transform hover:scale-[1.02] ${sizeClasses}`}>
      
      {/* Background Holographic Glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-emerald-400/10 rounded-full blur-xl pointer-events-none" />

      {/* Top Row: Type, Network & Contactless */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-black/30 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20">
            {card.type}
          </span>
          {card.isLTF && (
            <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wide bg-emerald-500/80 text-white px-1.5 py-0.5 rounded-full flex items-center">
              <ShieldCheck className="w-2.5 h-2.5 mr-0.5" /> LTF
            </span>
          )}
        </div>
        <div className="flex items-center space-x-1.5 opacity-80">
          <Wifi className="w-4 h-4 transform rotate-90" />
        </div>
      </div>

      {/* Middle Row: Chip & Card Name */}
      <div className="relative z-10 flex items-center space-x-3 my-1">
        {/* Chip visual */}
        <div className="w-8 h-6 sm:w-9 sm:h-7 rounded-md bg-gradient-to-tr from-amber-200 via-amber-400 to-yellow-200 border border-amber-600/50 shadow-inner flex flex-col justify-around p-0.5 opacity-90">
          <div className="w-full h-px bg-amber-700/40" />
          <div className="w-full h-px bg-amber-700/40" />
        </div>
        <div className="font-extrabold tracking-tight text-white drop-shadow-md text-sm sm:text-base leading-tight">
          {card.name}
        </div>
      </div>

      {/* Bottom Row: Rail & Network Logo / Fee */}
      <div className="relative z-10 flex items-end justify-between pt-1 border-t border-white/10">
        <div>
          <span className="text-[10px] font-medium text-white/70 block">
            Annual Fee
          </span>
          <span className="text-[11px] font-bold text-white tracking-tight">
            {card.annualFee}
          </span>
        </div>

        <div className="text-right">
          {card.network && (
            <span className="text-xs sm:text-sm font-black italic tracking-wider text-white drop-shadow-sm uppercase">
              {card.network}
            </span>
          )}
          {card.rail === 'UPI' && (
            <span className="text-[10px] font-bold bg-lime-400 text-slate-900 px-1.5 py-0.5 rounded ml-1">
              RuPay UPI
            </span>
          )}
        </div>
      </div>

    </div>
  );
};
