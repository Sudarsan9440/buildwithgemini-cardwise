import React from 'react';
import { Award, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AmexMilestoneBannerProps {
  amount: number;
  currentCount: number;
  onIncrementCount: () => void;
}

export const AmexMilestoneBanner: React.FC<AmexMilestoneBannerProps> = ({
  amount,
  currentCount,
  onIncrementCount
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-900 via-blue-900 to-indigo-950 text-white p-5 sm:p-6 shadow-xl border border-sky-400/30 animate-slide-up">
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded-lg bg-sky-500/30 border border-sky-400/40 text-sky-300">
              <Award className="w-4 h-4" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-sky-300">
              Amex MRCC Milestone Optimization Triggered
            </span>
          </div>
          
          <h4 className="text-base sm:text-lg font-extrabold text-white">
            💡 Pro-Tip: Transaction of ₹{amount.toLocaleString()} qualifies for 4x ₹1,500 Monthly Milestone!
          </h4>
          
          <p className="text-xs text-sky-100/90 leading-relaxed">
            American Express MRCC awards <strong className="text-sky-300 font-bold">1,000 bonus Membership Reward points</strong> upon completing 4 transactions of ₹1,500+ each in a calendar month. That is an effective <strong className="text-emerald-400 font-bold">~6.6% to 16% return</strong> on redemption!
          </p>

          {/* Milestone Progress Tracker */}
          <div className="flex items-center space-x-3 pt-2">
            <span className="text-xs font-bold text-sky-200">Current Month Progress:</span>
            <div className="flex items-center space-x-1.5">
              {[1, 2, 3, 4].map((step) => {
                const isCompleted = step <= currentCount;
                return (
                  <div
                    key={step}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold border transition-all ${
                      isCompleted
                        ? 'bg-emerald-500 text-white border-emerald-400 shadow-md shadow-emerald-500/30'
                        : 'bg-white/10 text-white/60 border-white/20'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : step}
                  </div>
                );
              })}
            </div>
            <span className="text-xs font-semibold text-sky-200">
              ({currentCount}/4 Completed)
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
          <button
            onClick={onIncrementCount}
            className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-sky-400 hover:bg-sky-300 text-slate-950 shadow-md shadow-sky-400/20 transition-all cursor-pointer flex items-center justify-center space-x-1.5"
          >
            <span>Log Amex Spend #{Math.min(4, currentCount + 1)}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
