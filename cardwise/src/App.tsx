import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { QuickTestBar } from './components/QuickTestBar';
import { SpendInput } from './components/SpendInput';
import { HeroRecommendation } from './components/HeroRecommendation';
import { AmexMilestoneBanner } from './components/AmexMilestoneBanner';
import { ComparisonTable } from './components/ComparisonTable';
import { AllCardsGrid } from './components/AllCardsGrid';
import { WalletDrawer } from './components/WalletDrawer';
import { MERCHANT_PRESETS, QUICK_TEST_SCENARIOS, QuickTestScenario } from './data/merchants';
import { MerchantPreset } from './types/card';
import { evaluateSpend } from './utils/engine';
import { useWalletState, useTheme } from './utils/storage';
import { AlertTriangle, Sparkles, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';

export function App() {
  const { isDark, toggleTheme } = useTheme();
  const {
    walletState,
    toggleCard,
    updateCardSpend,
    setAmexCount,
    setTaxBracket,
    resetWalletState
  } = useWalletState();

  // Spend state
  const [amount, setAmount] = useState<number>(1500);
  const [selectedPreset, setSelectedPreset] = useState<MerchantPreset>(MERCHANT_PRESETS[0]);
  const [customMerchantName, setCustomMerchantName] = useState<string>('');
  const [paymentRail, setPaymentRail] = useState<'Card' | 'UPI'>('Card');
  const [isWalletDrawerOpen, setIsWalletDrawerOpen] = useState<boolean>(false);
  const [activeScenarioId, setActiveScenarioId] = useState<string | undefined>('test_instamart');

  // Effective merchant name & category
  const activeMerchantName = customMerchantName.trim() ? customMerchantName.trim() : selectedPreset.name;
  const activeMerchantCategory = selectedPreset.category;

  // Evaluate engine deterministically
  const engineResult = useMemo(() => {
    return evaluateSpend(
      amount,
      activeMerchantCategory,
      activeMerchantName,
      paymentRail,
      walletState
    );
  }, [amount, activeMerchantCategory, activeMerchantName, paymentRail, walletState]);

  // Handle Quick Test Scenario clicks
  const handleSelectScenario = (scenario: QuickTestScenario) => {
    setActiveScenarioId(scenario.id);
    setAmount(scenario.amount);
    setPaymentRail(scenario.paymentRail);
    setCustomMerchantName('');

    const preset = MERCHANT_PRESETS.find(p => p.id === scenario.merchantId);
    if (preset) {
      setSelectedPreset(preset);
    }
  };

  const handleSelectMerchant = (preset: MerchantPreset) => {
    setSelectedPreset(preset);
    setCustomMerchantName('');
    setActiveScenarioId(undefined);
    if (preset.defaultRail) {
      setPaymentRail(preset.defaultRail);
    }
  };

  const handleCustomMerchantChange = (name: string) => {
    setCustomMerchantName(name);
    setActiveScenarioId(undefined);
  };

  const handleAmountChange = (amt: number) => {
    setAmount(amt);
    setActiveScenarioId(undefined);
  };

  const handlePaymentRailChange = (rail: 'Card' | 'UPI') => {
    setPaymentRail(rail);
    setActiveScenarioId(undefined);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] transition-colors selection:bg-emerald-500 selection:text-white">
      
      {/* Sticky Header */}
      <Header
        walletState={walletState}
        onOpenWalletDrawer={() => setIsWalletDrawerOpen(true)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Interactive Demo Test Bar */}
      <QuickTestBar
        onSelectScenario={handleSelectScenario}
        activeScenarioId={activeScenarioId}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Step 1: Spend Input & Payment Mode */}
        <SpendInput
          amount={amount}
          onAmountChange={handleAmountChange}
          selectedMerchantId={selectedPreset.id}
          onSelectMerchant={handleSelectMerchant}
          customMerchantName={customMerchantName}
          onCustomMerchantChange={handleCustomMerchantChange}
          paymentRail={paymentRail}
          onPaymentRailChange={handlePaymentRailChange}
        />

        {/* UPI Warning Banner if in UPI mode */}
        {paymentRail === 'UPI' && (
          <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-200 flex items-start space-x-3 text-xs sm:text-sm animate-fade-in shadow-sm">
            <AlertTriangle className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">UPI Scan & Pay Rule:</strong> Visa, Mastercard & Amex cannot scan standard merchant UPI QRs. Only RuPay credit cards (e.g. Kiwi Neon & Tata Neu Plus) are eligible for UPI QR Scan & Pay.
            </div>
          </div>
        )}

        {/* Hero Recommendation Card (Rank #1) */}
        <HeroRecommendation
          evaluation={engineResult.bestCard}
          amount={amount}
          merchantName={activeMerchantName}
          paymentRail={paymentRail}
          upiWarning={engineResult.upiWarning}
        />

        {/* Amex MRCC Milestone Optimization Banner (if eligible) */}
        {engineResult.amexMilestoneTip && (
          <AmexMilestoneBanner
            amount={amount}
            currentCount={walletState.amexMilestoneTxnCount}
            onIncrementCount={() => setAmexCount(walletState.amexMilestoneTxnCount + 1)}
          />
        )}

        {/* Step 2: Comparison Table of Runners-up */}
        <ComparisonTable
          runnersUp={engineResult.runnersUp}
          bestCard={engineResult.bestCard}
          amount={amount}
        />

        {/* Step 3: All 14 Instruments Explorer */}
        <AllCardsGrid
          evaluations={engineResult.allEvaluations}
          onToggleCard={toggleCard}
          enabledCards={walletState.enabledCards}
        />

      </main>

      {/* Wallet Management Drawer */}
      <WalletDrawer
        isOpen={isWalletDrawerOpen}
        onClose={() => setIsWalletDrawerOpen(false)}
        walletState={walletState}
        onToggleCard={toggleCard}
        onUpdateCardSpend={updateCardSpend}
        onSetAmexCount={setAmexCount}
        onSetTaxBracket={setTaxBracket}
        onReset={resetWalletState}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 py-8 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="p-1 rounded-lg bg-emerald-600 text-white font-bold">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white">CardWise Engine</span> · 100% Deterministic Arithmetic Spend & Reward Optimizer
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span>Client-side LocalStorage Persistence</span>
            <span>•</span>
            <span>Zero Hallucination Guarantee</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
