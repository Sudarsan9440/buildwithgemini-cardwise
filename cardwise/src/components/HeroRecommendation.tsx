import React from 'react';
import { SpendEvaluation } from '../types/card';
import { CardVisual } from './CardVisual';
import { CheckCircle2, TrendingUp, AlertTriangle, ArrowRight, ShieldCheck, Sparkles, Tag, HelpCircle, Layers } from 'lucide-react';

interface HeroRecommendationProps {
  evaluation: SpendEvaluation | null;
  amount: number;
  merchantName: string;
  paymentRail: 'Card' | 'UPI';
  upiWarning?: string;
}

export const HeroRecommendation: React.FC<HeroRecommendationProps> = ({
  evaluation,
  amount,
  merchantName,
  paymentRail,
  upiWarning
}) => {
  if (!evaluation) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-800 p-8 text-center">
        <Layers className="w-10 h-10 text-slate-400 mx-auto mb-2" />
        <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">No Eligible Card Available</h3>
        <p className="text-xs text-slate-500 mt-1">
          {paymentRail === 'UPI' ? 'Please enable RuPay UPI cards in your wallet drawer.' : 'Please enable cards in your wallet drawer to see recommendations.'}
        </p>
      </div>
    );
  }

  const { instrument, netReturn, effectiveRate, reasonBadge, actionGuidance, ruleExplanation, isTaxShield, capInfo } = evaluation;
  const returnPercentage = (effectiveRate * 100).toFixed(1);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-500/10 via-white to-white dark:from-emerald-950/30 dark:via-slate-900 dark:to-slate-900 rounded-3xl border-2 border-emerald-500 dark:border-emerald-500/80 shadow-2xl shadow-emerald-500/10 p-6 sm:p-8 transition-all animate-fade-in">
      
      {/* Top Banner Tag */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="flex items-center justify-center p-1.5 rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
            <CheckCircle2 className="w-4 h-4" />
          </span>
          <span className="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-emerald-700 dark:text-emerald-400">
            Rank #1 Best Optimal Choice
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {isTaxShield && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-700">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-teal-600 dark:text-teal-400" />
              Tax Shield Exemption
            </span>
          )}
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-emerald-600 dark:text-emerald-400" />
            {reasonBadge}
          </span>
        </div>
      </div>

      {/* Main Grid: Card Mockup + Return Numbers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left: Card Visual */}
        <div className="lg:col-span-5 flex justify-center lg:justify-start">
          <CardVisual card={instrument} size="lg" />
        </div>

        {/* Right: Net Rupee Value & Strategy */}
        <div className="lg:col-span-7 space-y-4">
          
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Net Rupee Value Return
            </span>
            <div className="flex items-baseline space-x-3 mt-1">
              <div className="text-3xl sm:text-4xl font-black tracking-tight text-emerald-600 dark:text-emerald-400 font-['JetBrains_Mono',monospace]">
                Save ₹{netReturn.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
              </div>
              <div className="text-sm sm:text-base font-extrabold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-xl">
                ({returnPercentage}% net return)
              </div>
            </div>
          </div>

          {/* Action Guidance */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
            <div className="flex items-start space-x-2.5">
              <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold uppercase text-emerald-800 dark:text-emerald-300 block">
                  Recommended Action:
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                  {actionGuidance}
                </p>
              </div>
            </div>
          </div>

          {/* Rule Note & Explanation */}
          <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <p className="font-medium">
              <strong className="text-slate-800 dark:text-slate-200">Calculation Logic:</strong> {ruleExplanation}
            </p>
            {isTaxShield && (
              <p className="text-teal-700 dark:text-teal-400 font-semibold italic bg-teal-50 dark:bg-teal-950/30 p-2 rounded-xl border border-teal-200 dark:border-teal-800">
                💡 Tip: Saves 30% via pre-tax allowance if balance is available; otherwise use Swiggy HDFC or HSBC Live+.
              </p>
            )}
          </div>

          {/* Cap Utilization Bar (if applicable) */}
          {capInfo && (
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="flex justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                <span>Monthly Cap Usage</span>
                <span>₹{capInfo.spentAfter.toLocaleString()} / ₹{capInfo.capAmount.toLocaleString()}</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-2 rounded-full transition-all ${
                    capInfo.spentAfter >= capInfo.capAmount ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, (capInfo.spentAfter / capInfo.capAmount) * 100)}%` }}
                />
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
