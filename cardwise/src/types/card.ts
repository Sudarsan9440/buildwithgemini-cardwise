export type PaymentRail = 'Card' | 'UPI' | 'UPI_and_Card';

export type CardType = 'Credit Card' | 'Debit Card' | 'Meal Card';

export type CardNetwork = 'Visa' | 'Mastercard' | 'RuPay' | 'Amex' | 'Visa / Mastercard' | 'None';

export interface CardCategoryRule {
  rate: number; // e.g. 0.10 for 10%
  cap?: number; // Monthly cashback/points cap in rupees
  merchants?: string[]; // Specific merchant names or domains
  note: string;
}

export interface Instrument {
  id: string;
  name: string;
  type: CardType;
  network?: CardNetwork;
  annualFee: string;
  rail: PaymentRail;
  isLTF: boolean;
  ruleSummary: string;
  categories?: Record<string, CardCategoryRule>;
  baseRate: number;
  monthlyCap?: number;
  // Visual metadata for demo
  cardGradient?: string;
  accentColor?: string;
  textColor?: string;
}

export type MerchantCategory = 
  | 'food_delivery' 
  | 'grocery_quick_commerce' 
  | 'dining' 
  | 'ecommerce_amazon' 
  | 'ecommerce_flipkart' 
  | 'tata_ecosystem' 
  | 'bills_utilities' 
  | 'travel_flights' 
  | 'offline_upi' 
  | 'general_online' 
  | 'general_offline';

export interface MerchantPreset {
  id: string;
  name: string;
  category: MerchantCategory;
  defaultRail: 'Card' | 'UPI';
  icon: string;
  badge: string;
  suggestedAmounts: number[];
  keywords: string[];
}

export interface SpendEvaluation {
  instrument: Instrument;
  eligible: boolean;
  ineligibleReason?: string;
  rateApplied: number; // percentage as decimal (e.g. 0.10)
  grossReturn: number; // calculated raw reward
  netReturn: number; // capped / net reward value in INR
  effectiveRate: number; // netReturn / amount
  reasonBadge: string;
  actionGuidance: string;
  ruleExplanation: string;
  isTaxShield?: boolean;
  capInfo?: {
    capAmount: number;
    spentBefore: number;
    spentAfter: number;
    hitCap: boolean;
    remainingCapBefore: number;
  };
  specialCallout?: string;
}

export interface EngineResult {
  amount: number;
  merchant: string;
  merchantCategory: MerchantCategory;
  paymentRail: 'Card' | 'UPI';
  bestCard: SpendEvaluation | null;
  runnersUp: SpendEvaluation[];
  allEvaluations: SpendEvaluation[];
  upiWarning?: string;
  amexMilestoneTip?: string;
}

export interface UserWalletState {
  enabledCards: Record<string, boolean>; // instrumentId -> boolean
  spentThisMonth: Record<string, number>; // instrumentId -> total spent on accelerated category
  amexMilestoneTxnCount: number; // 0 to 4
  taxBracket: number; // default 0.30 (30%)
}
