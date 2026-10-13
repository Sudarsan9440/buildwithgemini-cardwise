import { MerchantPreset } from '../types/card';

export const MERCHANT_PRESETS: MerchantPreset[] = [
  {
    id: 'swiggy_instamart',
    name: 'Swiggy Instamart',
    category: 'grocery_quick_commerce',
    defaultRail: 'Card',
    icon: '🛒',
    badge: 'Quick Commerce',
    suggestedAmounts: [500, 1500, 2500, 4000],
    keywords: ['instamart', 'swiggy instamart', 'quick commerce', 'groceries']
  },
  {
    id: 'zomato_swiggy_food',
    name: 'Zomato / Swiggy Food',
    category: 'food_delivery',
    defaultRail: 'Card',
    icon: '🍔',
    badge: 'Food Delivery',
    suggestedAmounts: [350, 750, 1500, 2500],
    keywords: ['zomato', 'swiggy', 'swiggy food', 'dineout', 'eats']
  },
  {
    id: 'amazon_shopping',
    name: 'Amazon India',
    category: 'ecommerce_amazon',
    defaultRail: 'Card',
    icon: '📦',
    badge: 'Online Shopping',
    suggestedAmounts: [1000, 1500, 5000, 15000],
    keywords: ['amazon', 'amazon prime', 'amazon pay', 'shopping']
  },
  {
    id: 'flipkart_shopping',
    name: 'Flipkart',
    category: 'ecommerce_flipkart',
    defaultRail: 'Card',
    icon: '🏷️',
    badge: 'Online Shopping',
    suggestedAmounts: [1200, 2500, 6000, 20000],
    keywords: ['flipkart', 'cleartrip', 'myntra', 'shopsy']
  },
  {
    id: 'tata_brands',
    name: 'Tata 1mg / BigBasket',
    category: 'tata_ecosystem',
    defaultRail: 'Card',
    icon: '💊',
    badge: 'Tata Brands',
    suggestedAmounts: [600, 1500, 3000, 7500],
    keywords: ['tata 1mg', 'bigbasket', 'tata cliq', 'croma', 'air india', 'tata neu']
  },
  {
    id: 'bills_utilities',
    name: 'Mobile / Electricity Bills',
    category: 'bills_utilities',
    defaultRail: 'Card',
    icon: '📱',
    badge: 'Utilities & Recharges',
    suggestedAmounts: [499, 1500, 3500, 7000],
    keywords: ['electricity', 'mobile recharge', 'wifi', 'broadband', 'gas bill', 'dth', 'payzapp']
  },
  {
    id: 'flight_travel',
    name: 'Flight / Travel Booking (Cleartrip/MMT)',
    category: 'travel_flights',
    defaultRail: 'Card',
    icon: '✈️',
    badge: 'Travel & Flights',
    suggestedAmounts: [3000, 6000, 12000, 25000],
    keywords: ['flight', 'cleartrip', 'makemytrip', 'hotel', 'travel', 'air ticket']
  },
  {
    id: 'offline_kirana_upi',
    name: 'Offline Kirana / Merchant QR',
    category: 'offline_upi',
    defaultRail: 'UPI',
    icon: '🏪',
    badge: 'UPI QR Scan',
    suggestedAmounts: [150, 450, 1200, 3000],
    keywords: ['kirana', 'local store', 'tea stall', 'auto', 'upi qr', 'street vendor']
  }
];

export interface QuickTestScenario {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  merchantId: string;
  paymentRail: 'Card' | 'UPI';
  highlightCardId: string;
  badge: string;
}

export const QUICK_TEST_SCENARIOS: QuickTestScenario[] = [
  {
    id: 'test_instamart',
    title: '₹1,500 Instamart',
    subtitle: 'Swiggy HDFC (10%) · HSBC Live+ (10%) · Zaggle (30% tax)',
    amount: 1500,
    merchantId: 'swiggy_instamart',
    paymentRail: 'Card',
    highlightCardId: 'zaggle_zinger',
    badge: 'Food / Quick Commerce'
  },
  {
    id: 'test_amex_milestone',
    title: '₹1,500 Amex Milestone Spend',
    subtitle: 'Triggers Amex MRCC 1,000 bonus pts (6.6% return) pro-tip',
    amount: 1500,
    merchantId: 'amazon_shopping',
    paymentRail: 'Card',
    highlightCardId: 'amex_mrcc',
    badge: 'Milestone Optimization'
  },
  {
    id: 'test_upi_grocery',
    title: '₹450 Local Grocery via UPI',
    subtitle: 'Auto-switches to UPI mode, recommends Kiwi Neon (2%)',
    amount: 450,
    merchantId: 'offline_kirana_upi',
    paymentRail: 'UPI',
    highlightCardId: 'kiwi_neon',
    badge: 'RuPay UPI Mode'
  },
  {
    id: 'test_flight_cleartrip',
    title: '₹6,000 Flight on Cleartrip',
    subtitle: 'Triggers Flipkart Axis (5%) & SBI Cashback (5%)',
    amount: 6000,
    merchantId: 'flight_travel',
    paymentRail: 'Card',
    highlightCardId: 'flipkart_axis',
    badge: 'Travel Spend'
  }
];
