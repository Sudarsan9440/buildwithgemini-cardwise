import React, { useState } from 'react';
import { Instrument, SpendEvaluation } from '../types/card';
import { CardVisual } from './CardVisual';
import { Search, Filter, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';

interface AllCardsGridProps {
  evaluations: SpendEvaluation[];
  onToggleCard: (cardId: string) => void;
  enabledCards: Record<string, boolean>;
}

export const AllCardsGrid: React.FC<AllCardsGridProps> = ({
  evaluations,
  onToggleCard,
  enabledCards
}) => {
  const [filter, setFilter] = useState<'all' | 'credit' | 'debit' | 'meal' | 'rupay' | 'ltf'>('all');
  const [search, setSearch] = useState('');

  const filtered = evaluations.filter((item) => {
    const card = item.instrument;
    const matchesSearch = 
      card.name.toLowerCase().includes(search.toLowerCase()) ||
      card.ruleSummary.toLowerCase().includes(search.toLowerCase()) ||
      (card.network && card.network.toLowerCase().includes(search.toLowerCase()));

    if (!matchesSearch) return false;

    if (filter === 'credit') return card.type === 'Credit Card';
    if (filter === 'debit') return card.type === 'Debit Card';
    if (filter === 'meal') return card.type === 'Meal Card';
    if (filter === 'rupay') return card.network === 'RuPay';
    if (filter === 'ltf') return card.isLTF;
    return true;
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl shadow-slate-200/30 dark:shadow-slate-950/40 p-5 sm:p-7 transition-all">
      
      {/* Header with Search and Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-xs font-black">
              3
            </span>
            Explore All 14 Wallet Instruments
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Full directory of rules, networks, caps, and evaluated returns for current spend
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cards, rules, or banks..."
            className="text-xs pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {[
          { id: 'all', label: 'All (14)' },
          { id: 'credit', label: 'Credit Cards' },
          { id: 'rupay', label: 'RuPay UPI' },
          { id: 'meal', label: 'Meal Card' },
          { id: 'debit', label: 'Debit Cards' },
          { id: 'ltf', label: 'Lifetime Free (LTF)' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              filter === tab.id
                ? 'bg-slate-900 text-white dark:bg-emerald-600 dark:text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((evalItem) => {
          const card = evalItem.instrument;
          const isEnabled = enabledCards[card.id] !== false;

          return (
            <div
              key={card.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                isEnabled
                  ? 'bg-slate-50/60 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-500/50 hover:shadow-md'
                  : 'bg-slate-100/40 dark:bg-slate-900/40 border-slate-200/40 dark:border-slate-800 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {card.name}
                    </span>
                    {card.isLTF && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        LTF
                      </span>
                    )}
                  </div>

                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    evalItem.eligible
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                  }`}>
                    {evalItem.eligible ? `₹${evalItem.netReturn.toFixed(0)} (${(evalItem.effectiveRate * 100).toFixed(1)}%)` : 'Ineligible'}
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                  {card.ruleSummary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">
                  {card.annualFee} · <strong className="text-slate-700 dark:text-slate-300">{card.network || card.type}</strong>
                </span>

                <button
                  type="button"
                  onClick={() => onToggleCard(card.id)}
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                >
                  {isEnabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
