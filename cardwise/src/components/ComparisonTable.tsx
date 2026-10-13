import React from 'react';
import { SpendEvaluation } from '../types/card';
import { TrendingUp, AlertCircle, ArrowUpRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ComparisonTableProps {
  runnersUp: SpendEvaluation[];
  bestCard: SpendEvaluation | null;
  amount: number;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  runnersUp,
  bestCard,
  amount
}) => {
  if (runnersUp.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl shadow-slate-200/30 dark:shadow-slate-950/40 p-5 sm:p-7 transition-all">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-xs font-black">
              2
            </span>
            Ranked Alternatives & Runners-Up
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Fallback strategies if monthly caps are reached or cards unavailable
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <th className="py-3 px-3">Rank & Instrument</th>
              <th className="py-3 px-3">Type / Network</th>
              <th className="py-3 px-3 text-right">Net Return</th>
              <th className="py-3 px-3 text-right">Effective Rate</th>
              <th className="py-3 px-4">Condition & Fallback Strategy</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {runnersUp.map((evalItem, idx) => {
              const rank = idx + 2;
              const { instrument, netReturn, effectiveRate, reasonBadge, ruleExplanation, isTaxShield } = evalItem;
              const returnPct = (effectiveRate * 100).toFixed(1);

              // Generate fallback scenario tip
              let conditionTip = ruleExplanation;
              if (bestCard?.instrument.id === 'hsbc_live+' && instrument.id === 'swiggy_hdfc') {
                conditionTip = "If monthly ₹1,000 cap is reached on HSBC Live+, switch to Swiggy HDFC for 10% on Swiggy or 5% partner cashback.";
              } else if (bestCard?.instrument.id === 'zaggle_zinger' && (instrument.id === 'swiggy_hdfc' || instrument.id === 'hsbc_live+')) {
                conditionTip = "If Zaggle monthly balance is exhausted, use this as primary payment method for 10% direct cashback.";
              } else if (bestCard?.instrument.id === 'amazon_icici' && instrument.id === 'sbi_cashback') {
                conditionTip = "Direct 5% online shopping alternative; useful if Amazon Pay balance redemption is not preferred.";
              }

              return (
                <tr key={instrument.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="flex items-center space-x-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[11px] font-extrabold text-slate-600 dark:text-slate-400">
                        #{rank}
                      </span>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">
                          {instrument.name}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          {instrument.annualFee}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {instrument.type}
                      </span>
                      {instrument.network && (
                        <span className="text-[10px] text-slate-400 font-mono">
                          ({instrument.network})
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3.5 px-3 text-right font-['JetBrains_Mono',monospace] font-extrabold text-slate-900 dark:text-white">
                    ₹{netReturn.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                  </td>

                  <td className="py-3.5 px-3 text-right">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400">
                      {returnPct}%
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-xs text-slate-600 dark:text-slate-300 max-w-xs sm:max-w-md">
                    <p className="line-clamp-2">
                      <strong className="text-slate-800 dark:text-slate-200">Rule:</strong> {conditionTip}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
