import { Instrument } from '../types/card';

export const INITIAL_INSTRUMENTS: Instrument[] = [
  {
    id: "zaggle_zinger",
    name: "Zaggle Zinger Meal Card",
    type: "Meal Card",
    annualFee: "Free (Employer Sponsored)",
    rail: "Card",
    isLTF: true,
    ruleSummary: "Tax-exempt pre-tax meal allowance (~30% direct tax savings)",
    categories: {
      food_grocery: {
        rate: 0.30,
        note: "Pre-tax salary deduction equates to ~30% tax savings on Food & Groceries (Swiggy, Zomato, Instamart, Zepto, Blinkit, Supermarkets)."
      }
    },
    baseRate: 0.0,
    monthlyCap: 2500,
    cardGradient: "from-emerald-600 via-teal-700 to-slate-900",
    accentColor: "#059669"
  },
  {
    id: "swiggy_hdfc",
    name: "Swiggy HDFC",
    type: "Credit Card",
    network: "Mastercard",
    annualFee: "LTF",
    rail: "Card",
    isLTF: true,
    ruleSummary: "10% on Swiggy ecosystem, 5% on top partner apps, 1% base",
    categories: {
      swiggy: {
        rate: 0.10,
        cap: 1500,
        note: "10% cashback on Swiggy, Instamart, Dineout up to ₹1,500/mo."
      },
      online_partner: {
        rate: 0.05,
        cap: 1500,
        merchants: ["Amazon", "Flipkart", "Myntra", "Uber", "Nykaa", "Ola", "Blinkit"],
        note: "5% on select apps up to ₹1,500/mo."
      }
    },
    baseRate: 0.01,
    cardGradient: "from-orange-500 via-amber-600 to-slate-900",
    accentColor: "#ea580c"
  },
  {
    id: "hsbc_live_plus",
    name: "HSBC Live+",
    type: "Credit Card",
    network: "Visa",
    annualFee: "₹1,000 + 18% GST",
    rail: "Card",
    isLTF: false,
    ruleSummary: "10% on Dining, Food Delivery & Groceries (Cap: ₹1,000/mo), 1.5% base",
    categories: {
      food_dining_grocery: {
        rate: 0.10,
        cap: 1000,
        note: "10% accelerated cashback across all Dining, Food Delivery & Grocery (online & offline) up to ₹1,000/mo."
      }
    },
    baseRate: 0.015,
    cardGradient: "from-red-600 via-rose-700 to-slate-950",
    accentColor: "#e11d48"
  },
  {
    id: "sbi_cashback",
    name: "SBI Cashback",
    type: "Credit Card",
    network: "Visa",
    annualFee: "₹1,000 + 18% GST",
    rail: "Card",
    isLTF: false,
    ruleSummary: "5% online shopping cashback (Cap: ₹5,000/mo), 1% offline",
    categories: {
      online_shopping: {
        rate: 0.05,
        cap: 5000,
        note: "5% flat on almost all online retail (Amazon, Flipkart, flights, fashion, etc.). Excludes utilities, rent, jewelry, fuel, school fees."
      }
    },
    baseRate: 0.01,
    cardGradient: "from-blue-600 via-indigo-700 to-slate-900",
    accentColor: "#2563eb"
  },
  {
    id: "amazon_icici",
    name: "Amazon Pay ICICI",
    type: "Credit Card",
    network: "Visa",
    annualFee: "LTF",
    rail: "Card",
    isLTF: true,
    ruleSummary: "5% unlimited on Amazon (Prime), 2% on recharges & bill payments, 1% base",
    categories: {
      amazon_prime: {
        rate: 0.05,
        note: "5% unlimited cashback as Amazon Pay balance."
      },
      bill_pay: {
        rate: 0.02,
        note: "2% on electricity, mobile recharges, bill payments on Amazon Pay."
      }
    },
    baseRate: 0.01,
    cardGradient: "from-amber-500 via-yellow-600 to-slate-900",
    accentColor: "#d97706"
  },
  {
    id: "bob_eterna",
    "name": "BoB Eterna",
    type: "Credit Card",
    network: "Visa",
    annualFee: "LTF",
    rail: "Card",
    isLTF: true,
    ruleSummary: "3.75% on Online Shopping, Dining, Travel & International (15 pts/₹100), 0.75% base",
    categories: {
      online_travel_dining: {
        rate: 0.0375,
        cap: 1250,
        note: "15 Reward points per ₹100 (3.75% value). Bonus points capped at 5,000 pts (₹1,250 cashback)/mo."
      }
    },
    baseRate: 0.0075,
    cardGradient: "from-orange-600 via-amber-700 to-slate-950",
    accentColor: "#f97316"
  },
  {
    id: "flipkart_axis",
    name: "Flipkart Axis Bank",
    type: "Credit Card",
    network: "Visa / Mastercard",
    annualFee: "₹500 + 18% GST",
    rail: "Card",
    isLTF: false,
    ruleSummary: "5% on Flipkart & Cleartrip, 4% on Swiggy, Uber, PVR, Cult.fit, 1% base",
    categories: {
      flipkart_cleartrip: {
        rate: 0.05,
        note: "5% unlimited cashback on Flipkart & Cleartrip."
      },
      axis_partners: {
        rate: 0.04,
        merchants: ["Swiggy", "Uber", "PVR", "Cult.fit", "Tata 1mg"],
        note: "4% on preferred partners."
      }
    },
    baseRate: 0.01,
    cardGradient: "from-blue-500 via-sky-600 to-slate-900",
    accentColor: "#0284c7"
  },
  {
    id: "kiwi_neon",
    name: "Kiwi Neon (RuPay)",
    type: "Credit Card",
    network: "RuPay",
    annualFee: "₹1,000 + 18% GST",
    rail: "UPI",
    isLTF: false,
    ruleSummary: "2% instant cashback on UPI Scan & Pay via Kiwi App (up to 5% with milestones)",
    categories: {
      upi_scan_pay: {
        rate: 0.02,
        note: "2% direct cashback on all merchant UPI Scan & Pay via Kiwi app."
      }
    },
    baseRate: 0.005,
    cardGradient: "from-lime-500 via-emerald-600 to-slate-900",
    accentColor: "#84cc16"
  },
  {
    id: "tata_neu_plus",
    name: "Tata Neu Plus HDFC",
    type: "Credit Card",
    network: "RuPay",
    annualFee: "₹500 + 18% GST",
    rail: "UPI_and_Card",
    isLTF: false,
    ruleSummary: "2% NeuCoins on Tata Neu (7% with NeuPass), 1% on non-Tata UPI & general spends",
    categories: {
      tata_brands: {
        rate: 0.07,
        note: "2% card + 5% NeuPass = 7% NeuCoins on BigBasket, 1mg, Tata CliQ, Air India, Croma."
      },
      upi: {
        rate: 0.01,
        note: "1% NeuCoins on all RuPay UPI merchant spends."
      }
    },
    baseRate: 0.01,
    cardGradient: "from-purple-600 via-violet-700 to-slate-900",
    accentColor: "#9333ea"
  },
  {
    id: "amex_mrcc",
    name: "American Express MRCC",
    type: "Credit Card",
    network: "Amex",
    annualFee: "₹4,500 + 18% GST",
    rail: "Card",
    isLTF: false,
    ruleSummary: "Milestone Master: 1,000 bonus pts for 4x₹1,500/mo + 1,000 bonus pts for ₹20k total/mo",
    categories: {
      milestone_1500: {
        rate: 0.066,
        note: "Hitting 4 transactions of ₹1,500 earns 1,000 bonus points (~6.6% effective return if redeemed for gold collection / Marriott)."
      }
    },
    baseRate: 0.01,
    cardGradient: "from-sky-700 via-blue-800 to-slate-950",
    accentColor: "#0284c7"
  },
  {
    id: "axis_privilege_amex",
    name: "Axis Privilege (Amex Network)",
    type: "Credit Card",
    network: "Amex",
    annualFee: "LTF",
    rail: "Card",
    isLTF: true,
    ruleSummary: "10 EDGE points per ₹200 (1% base), priority Amex Network offers",
    baseRate: 0.01,
    cardGradient: "from-burgundy-800 via-rose-900 to-slate-950",
    accentColor: "#be123c"
  },
  {
    id: "hsbc_platinum",
    name: "HSBC Platinum",
    type: "Credit Card",
    network: "Visa",
    annualFee: "LTF",
    rail: "Card",
    isLTF: true,
    ruleSummary: "2 Reward points per ₹150 (~0.4% base), zero liability & fuel waiver",
    baseRate: 0.004,
    cardGradient: "from-slate-400 via-slate-600 to-slate-900",
    accentColor: "#64748b"
  },
  {
    id: "hsbc_salary_debit",
    name: "HSBC Salary Debit Card",
    type: "Debit Card",
    annualFee: "Free (Salary)",
    rail: "Card",
    isLTF: true,
    ruleSummary: "Debit card fallback, occasional ATM/POS discounts",
    baseRate: 0.002,
    cardGradient: "from-slate-600 via-slate-700 to-slate-950",
    accentColor: "#475569"
  },
  {
    id: "hdfc_eshop_debit",
    name: "HDFC EasyShop Debit Card",
    type: "Debit Card",
    annualFee: "Free (Account Tier)",
    rail: "Card",
    isLTF: true,
    ruleSummary: "1% cashback on grocery, telecom, utilities via PayZapp / Netbanking",
    baseRate: 0.005,
    cardGradient: "from-blue-700 via-blue-900 to-slate-950",
    accentColor: "#1d4ed8"
  }
];
