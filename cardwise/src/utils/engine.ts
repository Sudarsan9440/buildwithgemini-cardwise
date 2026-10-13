import { Instrument, MerchantCategory, SpendEvaluation, EngineResult, UserWalletState } from '../types/card';
import { INITIAL_INSTRUMENTS } from '../data/instruments';

export function evaluateSpend(
  amount: number,
  merchantCategory: MerchantCategory,
  merchantName: string,
  paymentRail: 'Card' | 'UPI',
  walletState: UserWalletState,
  customInstruments?: Instrument[]
): EngineResult {
  const instruments = customInstruments || INITIAL_INSTRUMENTS;
  const evaluations: SpendEvaluation[] = [];

  const lowerMerchant = merchantName.toLowerCase();
  const isFoodOrGrocery = 
    merchantCategory === 'food_delivery' ||
    merchantCategory === 'grocery_quick_commerce' ||
    merchantCategory === 'dining' ||
    lowerMerchant.includes('swiggy') ||
    lowerMerchant.includes('zomato') ||
    lowerMerchant.includes('instamart') ||
    lowerMerchant.includes('blinkit') ||
    lowerMerchant.includes('zepto') ||
    lowerMerchant.includes('grocer');

  const isAmazon = 
    merchantCategory === 'ecommerce_amazon' || 
    lowerMerchant.includes('amazon');

  const isFlipkartOrCleartrip = 
    merchantCategory === 'ecommerce_flipkart' ||
    lowerMerchant.includes('flipkart') ||
    lowerMerchant.includes('cleartrip') ||
    lowerMerchant.includes('myntra');

  const isTataBrand = 
    merchantCategory === 'tata_ecosystem' ||
    lowerMerchant.includes('1mg') ||
    lowerMerchant.includes('bigbasket') ||
    lowerMerchant.includes('cliq') ||
    lowerMerchant.includes('croma') ||
    lowerMerchant.includes('air india') ||
    lowerMerchant.includes('tata');

  const isBillPay = 
    merchantCategory === 'bills_utilities' ||
    lowerMerchant.includes('electricity') ||
    lowerMerchant.includes('recharge') ||
    lowerMerchant.includes('bill') ||
    lowerMerchant.includes('utility');

  const isTravelFlight = 
    merchantCategory === 'travel_flights' ||
    lowerMerchant.includes('flight') ||
    lowerMerchant.includes('hotel') ||
    lowerMerchant.includes('cleartrip') ||
    lowerMerchant.includes('makemytrip') ||
    lowerMerchant.includes('travel');

  // Process each card
  for (const card of instruments) {
    const isEnabled = walletState.enabledCards[card.id] !== false; // default true

    // Check payment rail compatibility
    if (paymentRail === 'UPI') {
      const supportsUPI = card.rail === 'UPI' || card.rail === 'UPI_and_Card';
      if (!supportsUPI) {
        evaluations.push({
          instrument: card,
          eligible: false,
          ineligibleReason: `${card.network || card.type} card cannot scan merchant UPI QRs. Only RuPay credit cards support UPI.`,
          rateApplied: 0,
          grossReturn: 0,
          netReturn: 0,
          effectiveRate: 0,
          reasonBadge: 'Incompatible Rail',
          actionGuidance: 'Cannot be used for UPI QR scanning',
          ruleExplanation: `${card.name} is on the ${card.network || 'Card'} network and does not support RuPay UPI Scan & Pay.`
        });
        continue;
      }
    }

    if (!isEnabled) {
      evaluations.push({
        instrument: card,
        eligible: false,
        ineligibleReason: 'Toggled OFF in your wallet drawer',
        rateApplied: 0,
        grossReturn: 0,
        netReturn: 0,
        effectiveRate: 0,
        reasonBadge: 'Disabled in Wallet',
        actionGuidance: 'Enable this card in your wallet settings to evaluate',
        ruleExplanation: 'Card is currently excluded from optimization by user preference.'
      });
      continue;
    }

    // Determine accelerated category & rate
    let appliedRate = card.baseRate;
    let reasonBadge = `${(card.baseRate * 100).toFixed(1)}% base return`;
    let actionGuidance = `Use ${card.name} at checkout`;
    let ruleExplanation = card.ruleSummary;
    let isTaxShield = false;
    let categoryCap: number | undefined = undefined;

    const currentSpent = walletState.spentThisMonth[card.id] || 0;

    // 1. ZAGGLE ZINGER MEAL CARD
    if (card.id === 'zaggle_zinger') {
      if (isFoodOrGrocery && paymentRail === 'Card') {
        const taxRate = walletState.taxBracket || 0.30;
        appliedRate = taxRate;
        isTaxShield = true;
        categoryCap = card.monthlyCap || 2500;
        reasonBadge = `~${(taxRate * 100).toFixed(0)}% pre-tax direct savings`;
        actionGuidance = 'Select Zaggle Meal Card as payment method on Food/Grocery app';
        ruleExplanation = 'Direct income tax exemption via pre-tax salary meal voucher allowance.';
      } else {
        appliedRate = 0;
        reasonBadge = '0% (Non-food spend)';
        actionGuidance = 'Meal cards are only tax-deductible for food & grocery items';
        ruleExplanation = 'Meal cards only apply to food, dining, and grocery purchases.';
      }
    }
    // 2. SWIGGY HDFC
    else if (card.id === 'swiggy_hdfc') {
      if (lowerMerchant.includes('swiggy') || lowerMerchant.includes('instamart') || lowerMerchant.includes('dineout')) {
        appliedRate = 0.10;
        categoryCap = 1500;
        reasonBadge = '10% Swiggy ecosystem cashback';
        actionGuidance = 'Pay via saved Swiggy HDFC card on Swiggy / Instamart checkout';
        ruleExplanation = '10% accelerated cashback across all Swiggy orders (Capped at ₹1,500/mo).';
      } else if (
        isAmazon || isFlipkartOrCleartrip ||
        lowerMerchant.includes('myntra') || lowerMerchant.includes('uber') ||
        lowerMerchant.includes('nykaa') || lowerMerchant.includes('ola') ||
        lowerMerchant.includes('blinkit')
      ) {
        appliedRate = 0.05;
        categoryCap = 1500;
        reasonBadge = '5% top partner cashback';
        actionGuidance = `Pay directly with Swiggy HDFC card on ${merchantName}`;
        ruleExplanation = '5% cashback on top partner platforms (Amazon, Flipkart, Myntra, Uber, etc. capped at ₹1,500/mo).';
      } else {
        appliedRate = 0.01;
        reasonBadge = '1% general online/offline base';
        actionGuidance = 'Use Swiggy HDFC for general online spend';
        ruleExplanation = '1% flat cashback on all other eligible spends.';
      }
    }
    // 3. HSBC LIVE+
    else if (card.id === 'hsbc_live_plus') {
      if (isFoodOrGrocery) {
        appliedRate = 0.10;
        categoryCap = 1000;
        reasonBadge = '10% Dining & Grocery accelerated';
        actionGuidance = 'Use HSBC Live+ for dining, food delivery, and supermarkets';
        ruleExplanation = '10% cashback across all Dining, Food Delivery & Groceries (online & offline, capped at ₹1,000/mo).';
      } else {
        appliedRate = 0.015;
        reasonBadge = '1.5% unlimited base rate';
        actionGuidance = 'Use HSBC Live+ for general purchases';
        ruleExplanation = '1.5% flat unlimited cashback on all other eligible spends.';
      }
    }
    // 4. SBI CASHBACK
    else if (card.id === 'sbi_cashback') {
      if (paymentRail === 'Card' && !isBillPay) {
        appliedRate = 0.05;
        categoryCap = 5000;
        reasonBadge = '5% online retail cashback';
        actionGuidance = 'Use SBI Cashback directly on online payment gateway';
        ruleExplanation = '5% flat cashback on almost all online retail purchases up to ₹5,000/mo.';
      } else {
        appliedRate = 0.01;
        reasonBadge = '1% offline/excluded spend rate';
        actionGuidance = 'Use SBI Cashback (1% base rate applies)';
        ruleExplanation = '1% base cashback on offline retail and excluded categories.';
      }
    }
    // 5. AMAZON PAY ICICI
    else if (card.id === 'amazon_icici') {
      if (isAmazon) {
        appliedRate = 0.05;
        reasonBadge = '5% unlimited Amazon Prime cashback';
        actionGuidance = 'Select Amazon Pay ICICI on Amazon checkout';
        ruleExplanation = '5% unlimited direct cashback credited as Amazon Pay balance with Prime.';
      } else if (isBillPay) {
        appliedRate = 0.02;
        reasonBadge = '2% Amazon Pay Bill Payments';
        actionGuidance = 'Pay bills / recharges via Amazon Pay with this card';
        ruleExplanation = '2% cashback on utilities, electricity, mobile recharges via Amazon Pay.';
      } else {
        appliedRate = 0.01;
        reasonBadge = '1% unlimited base cashback';
        actionGuidance = 'Use Amazon Pay ICICI for general merchant payments';
        ruleExplanation = '1% flat unlimited cashback on all other eligible spends.';
      }
    }
    // 6. BOB ETERNA
    else if (card.id === 'bob_eterna') {
      if (isTravelFlight || isFoodOrGrocery || merchantCategory === 'general_online' || isAmazon || isFlipkartOrCleartrip) {
        appliedRate = 0.0375;
        categoryCap = 1250;
        reasonBadge = '3.75% (15 pts/₹100) accelerated';
        actionGuidance = 'Use BoB Eterna for travel, dining, or online shopping';
        ruleExplanation = '15 reward points per ₹100 spend (3.75% value), capped at ₹1,250 bonus/mo.';
      } else {
        appliedRate = 0.0075;
        reasonBadge = '0.75% base points rate';
        actionGuidance = 'Use BoB Eterna (0.75% base reward)';
        ruleExplanation = '3 reward points per ₹100 base rate.';
      }
    }
    // 7. FLIPKART AXIS
    else if (card.id === 'flipkart_axis') {
      if (lowerMerchant.includes('flipkart') || lowerMerchant.includes('cleartrip')) {
        appliedRate = 0.05;
        reasonBadge = '5% unlimited Flipkart/Cleartrip cashback';
        actionGuidance = 'Select Flipkart Axis on Flipkart or Cleartrip';
        ruleExplanation = '5% unlimited cashback on Flipkart & Cleartrip with direct statement credit.';
      } else if (
        lowerMerchant.includes('swiggy') || lowerMerchant.includes('uber') ||
        lowerMerchant.includes('pvr') || lowerMerchant.includes('cult') ||
        lowerMerchant.includes('1mg')
      ) {
        appliedRate = 0.04;
        reasonBadge = '4% preferred partner cashback';
        actionGuidance = `Pay directly with Flipkart Axis on ${merchantName}`;
        ruleExplanation = '4% cashback on preferred partner merchants (Swiggy, Uber, PVR, Cult.fit, Tata 1mg).';
      } else {
        appliedRate = 0.01;
        reasonBadge = '1% base cashback';
        actionGuidance = 'Use Flipkart Axis for general spends';
        ruleExplanation = '1% flat cashback on other eligible retail spends.';
      }
    }
    // 8. KIWI NEON (RUPAY)
    else if (card.id === 'kiwi_neon') {
      if (paymentRail === 'UPI') {
        appliedRate = 0.02;
        reasonBadge = '2% instant UPI cashback';
        actionGuidance = 'Scan & Pay via Kiwi App linked to Neon RuPay Card';
        ruleExplanation = '2% instant cashback on all merchant UPI Scan & Pay transactions via Kiwi.';
      } else {
        appliedRate = 0.005;
        reasonBadge = '0.5% base card rate';
        actionGuidance = 'Use Kiwi Neon RuPay card';
        ruleExplanation = '0.5% base cashback on non-UPI standard card transactions.';
      }
    }
    // 9. TATA NEU PLUS
    else if (card.id === 'tata_neu_plus') {
      if (isTataBrand) {
        appliedRate = 0.07;
        reasonBadge = '7% NeuCoins (2% Card + 5% NeuPass)';
        actionGuidance = 'Pay via Tata Neu App or Tata partner website with Tata Neu Plus';
        ruleExplanation = '7% total NeuCoins on BigBasket, 1mg, Tata CliQ, Air India, and Croma.';
      } else if (paymentRail === 'UPI') {
        appliedRate = 0.01;
        reasonBadge = '1% NeuCoins on RuPay UPI';
        actionGuidance = 'Scan UPI QR using Tata Neu or any UPI app with Tata Neu Plus';
        ruleExplanation = '1% NeuCoins on all RuPay merchant UPI transactions.';
      } else {
        appliedRate = 0.01;
        reasonBadge = '1% base NeuCoins';
        actionGuidance = 'Use Tata Neu Plus card';
        ruleExplanation = '1% base NeuCoins on non-Tata general card spends.';
      }
    }
    // 10. AMEX MRCC
    else if (card.id === 'amex_mrcc') {
      if (amount >= 1500 && amount <= 2000) {
        appliedRate = 0.066;
        reasonBadge = '6.6% effective (4x₹1,500 milestone)';
        actionGuidance = 'Use Amex MRCC to count toward the 4x ₹1,500 monthly milestone';
        ruleExplanation = 'Hitting 4 transactions of ≥₹1,500 in a month yields 1,000 bonus points (~6.6% return on Marriott/Gold).';
      } else {
        appliedRate = 0.01;
        reasonBadge = '1% base Membership Rewards rate';
        actionGuidance = 'Use Amex MRCC (1 MR point per ₹50)';
        ruleExplanation = 'Base reward rate is 1 Membership Reward point per ₹50 spent (~1%).';
      }
    }
    // 11. AXIS PRIVILEGE AMEX
    else if (card.id === 'axis_privilege_amex') {
      appliedRate = 0.01;
      reasonBadge = '1% EDGE points (10 pts/₹200)';
      actionGuidance = 'Use Axis Privilege Amex card';
      ruleExplanation = '10 EDGE reward points per ₹200 spent (~1% base value).';
    }
    // 12. HSBC PLATINUM
    else if (card.id === 'hsbc_platinum') {
      appliedRate = 0.004;
      reasonBadge = '0.4% base points (2 pts/₹150)';
      actionGuidance = 'Use HSBC Platinum card';
      ruleExplanation = '2 Reward points per ₹150 (~0.4% effective value).';
    }
    // 13. HSBC SALARY DEBIT
    else if (card.id === 'hsbc_salary_debit') {
      appliedRate = 0.002;
      reasonBadge = '0.2% debit fallback';
      actionGuidance = 'Use HSBC Salary Debit Card';
      ruleExplanation = 'Standard debit card with fallback reward points.';
    }
    // 14. HDFC EASYSHOP DEBIT
    else if (card.id === 'hdfc_eshop_debit') {
      if (isFoodOrGrocery || isBillPay) {
        appliedRate = 0.01;
        reasonBadge = '1% Grocery & Utilities via PayZapp';
        actionGuidance = 'Pay via PayZapp / Netbanking with HDFC EasyShop Debit';
        ruleExplanation = '1% cashback on groceries, telecom & utilities through PayZapp.';
      } else {
        appliedRate = 0.005;
        reasonBadge = '0.5% base debit rate';
        actionGuidance = 'Use HDFC EasyShop Debit Card';
        ruleExplanation = '0.5% base reward on other eligible POS spends.';
      }
    }

    // CAP CALCULATION & MONTHLY REWARD CEILING
    let grossReturn = Math.round(amount * appliedRate * 100) / 100;
    let netReturn = grossReturn;
    let hitCap = false;
    let remainingCapBefore = categoryCap ? Math.max(0, categoryCap - currentSpent) : 999999;

    if (categoryCap !== undefined) {
      if (currentSpent >= categoryCap) {
        // Cap fully exhausted -> fallback to base rate!
        hitCap = true;
        const fallbackRate = card.id === 'zaggle_zinger' ? 0 : card.baseRate;
        netReturn = Math.round(amount * fallbackRate * 100) / 100;
        appliedRate = fallbackRate;
        reasonBadge = `${(fallbackRate * 100).toFixed(1)}% base (Cap of ₹${categoryCap.toLocaleString()} reached!)`;
        ruleExplanation = `Monthly accelerated reward cap of ₹${categoryCap.toLocaleString()} has been reached for this month. Falling back to base rate of ${(fallbackRate * 100).toFixed(1)}%.`;
      } else {
        const potentialReward = amount * appliedRate;
        if (currentSpent + potentialReward > categoryCap) {
          hitCap = true;
          const acceleratedReward = categoryCap - currentSpent;
          const remainderSpend = amount - (acceleratedReward / appliedRate);
          const fallbackRate = card.id === 'zaggle_zinger' ? 0 : card.baseRate;
          const remainderReward = Math.max(0, remainderSpend * fallbackRate);
          netReturn = Math.round((acceleratedReward + remainderReward) * 100) / 100;
          reasonBadge = `Partial cap applied (₹${acceleratedReward.toFixed(0)} accelerated + ₹${remainderReward.toFixed(0)} base)`;
          ruleExplanation = `Transaction partially hits the monthly cap. ₹${acceleratedReward.toFixed(0)} earned at ${(appliedRate * 100).toFixed(1)}% and remainder at ${(fallbackRate * 100).toFixed(1)}%.`;
        }
      }
    }

    const effectiveRate = amount > 0 ? netReturn / amount : 0;

    evaluations.push({
      instrument: card,
      eligible: true,
      rateApplied: appliedRate,
      grossReturn,
      netReturn,
      effectiveRate,
      reasonBadge,
      actionGuidance,
      ruleExplanation,
      isTaxShield,
      capInfo: categoryCap ? {
        capAmount: categoryCap,
        spentBefore: currentSpent,
        spentAfter: Math.min(categoryCap, currentSpent + netReturn),
        hitCap,
        remainingCapBefore
      } : undefined
    });
  }

  // Sort eligible cards by net return descending, then by isTaxShield, then by isLTF
  const eligibleCards = evaluations
    .filter(e => e.eligible)
    .sort((a, b) => {
      if (b.netReturn !== a.netReturn) {
        return b.netReturn - a.netReturn;
      }
      if (b.isTaxShield && !a.isTaxShield) return 1;
      if (a.isTaxShield && !b.isTaxShield) return -1;
      if (b.instrument.isLTF && !a.instrument.isLTF) return 1;
      if (a.instrument.isLTF && !b.instrument.isLTF) return -1;
      return a.instrument.name.localeCompare(b.instrument.name);
    });

  const bestCard = eligibleCards.length > 0 ? eligibleCards[0] : null;
  const runnersUp = eligibleCards.slice(1, 4);

  // Amex MRCC Milestone tip condition
  let amexMilestoneTip: string | undefined = undefined;
  if (amount >= 1500 && amount <= 2000 && paymentRail === 'Card') {
    const amexCount = walletState.amexMilestoneTxnCount || 0;
    amexMilestoneTip = `💡 Pro-Tip: If you haven't completed your 4 monthly transactions of ₹1,500 on Amex MRCC (${amexCount}/4 completed), spending ₹${amount.toLocaleString()} here unlocks 1,000 bonus points (~6.6% return)!`;
  }

  // UPI Warning if payment rail is UPI
  let upiWarning: string | undefined = undefined;
  if (paymentRail === 'UPI') {
    upiWarning = '⚠️ Visa, Mastercard & Amex cannot scan standard merchant UPI QRs. Only RuPay Credit Cards (Kiwi Neon & Tata Neu Plus) are eligible for UPI Scan & Pay.';
  }

  return {
    amount,
    merchant: merchantName,
    merchantCategory,
    paymentRail,
    bestCard,
    runnersUp,
    allEvaluations: evaluations,
    upiWarning,
    amexMilestoneTip
  };
}
