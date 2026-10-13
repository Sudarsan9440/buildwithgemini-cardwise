import React from 'react';
import { Sparkles, ArrowRight, Play, Zap } from 'lucide-react';
import { QUICK_TEST_SCENARIOS, QuickTestScenario } from '../data/merchants';

interface QuickTestBarProps {
  onSelectScenario: (scenario: QuickTestScenario) => void;
  activeScenarioId?: string;
}

export const QuickTestBar: React.FC<QuickTestBarProps> = ({
  onSelectScenario,
  activeScenarioId
}) => {
  return (
    <div className="w-full bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border-y border-emerald-500/20 dark:border-emerald-500/10 py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        <div className="flex items-center space-x-2 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
          <span className="flex items-center justify-center p-1 rounded-lg bg-emerald-600 text-white shadow-sm shadow-emerald-600/30">
            <Zap className="w-3.5 h-3.5 fill-current" />
          </span>
          <span className="uppercase tracking-wider text-[11px] font-extrabold text-emerald-700 dark:text-emerald-400">
            Interactive Demo Test Scenarios:
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {QUICK_TEST_SCENARIOS.map((scenario) => {
            const isActive = activeScenarioId === scenario.id;
            return (
              <button
                key={scenario.id}
                onClick={() => onSelectScenario(scenario)}
                className={`text-left p-2.5 sm:px-3 sm:py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer flex flex-col justify-between group ${
                  isActive
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/25 ring-2 ring-emerald-400/40'
                    : 'bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold tracking-tight text-[12px] sm:text-[13px]">{scenario.title}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold uppercase ${
                    isActive ? 'bg-emerald-700/80 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {scenario.paymentRail}
                  </span>
                </div>
                <p className={`text-[11px] mt-1 line-clamp-1 transition-colors ${
                  isActive ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                }`}>
                  {scenario.subtitle}
                </p>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
