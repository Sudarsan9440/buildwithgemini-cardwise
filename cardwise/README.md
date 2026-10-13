# 💳 CardWise: Personal Spend & Reward Optimizer

**CardWise** is a production-grade personal spend and reward optimization web application built with React, Vite, TypeScript, and Tailwind CSS. It features a **100% deterministic arithmetic engine** (zero hallucination) that scans 14 active payment instruments, evaluates payment rails (Card vs RuPay UPI vs Meal Card), checks monthly reward caps, and ranks cards by net rupee value return.

---

## 🚀 Key Features

1. **Deterministic Arithmetic Engine**:
   - Zero-hallucination mathematical reward calculations.
   - Rail compatibility evaluation (`Card`, `RuPay UPI`, `Meal Card`).
   - Category-accelerated cashback calculation with partial and full monthly cap tracking.
   - Amex MRCC 4x ₹1,500 monthly milestone detection and interactive tracker.
   - Zaggle Zinger Meal Card 30% pre-tax direct income tax exemption logic.

2. **Built-in 14 Payment Instruments**:
   - **Zaggle Zinger Meal Card** (30% pre-tax food/grocery shield)
   - **Swiggy HDFC** (10% Swiggy ecosystem, 5% partners)
   - **HSBC Live+** (10% Dining, Food & Grocery)
   - **SBI Cashback** (5% online shopping)
   - **Amazon Pay ICICI** (5% unlimited Amazon Prime, 2% utility bills)
   - **BoB Eterna** (3.75% travel, dining & international)
   - **Flipkart Axis** (5% Flipkart & Cleartrip, 4% preferred partners)
   - **Kiwi Neon RuPay** (2% instant cashback on UPI Scan & Pay)
   - **Tata Neu Plus HDFC RuPay** (7% on Tata brands, 1% RuPay UPI)
   - **American Express MRCC** (4x ₹1,500 monthly milestone master)
   - **Axis Privilege Amex** (1% EDGE reward points)
   - **HSBC Platinum** (0.4% base reward points)
   - **HSBC Salary Debit Card** (0.2% debit fallback)
   - **HDFC EasyShop Debit Card** (1% via PayZapp utilities/grocery)

3. **Interactive Demo Quick-Test Scenarios**:
   - **Button 1**: `₹1,500 Instamart` (Triggers Swiggy HDFC / HSBC Live+ / Zaggle 30% tax shield)
   - **Button 2**: `₹1,500 Amex Milestone Spend` (Triggers Amex MRCC pro-tip & 4-tx progress counter)
   - **Button 3**: `₹450 Local Grocery via UPI` (Auto-switches to UPI Scan & Pay, recommends Kiwi Neon 2%)
   - **Button 4**: `₹6,000 Flight on Cleartrip` (Triggers Flipkart Axis 5% & SBI Cashback 5%)

4. **Wallet Management Drawer**:
   - Toggle individual cards ON / OFF.
   - Interactive sliders to simulate reaching monthly spend caps.
   - Tax bracket adjustments (20%, 30%, 39% HNI).
   - LocalStorage persistence.

---

## 🛠️ Run Locally

```bash
cd cardwise
npm install
npm run dev
```

Visit: `http://localhost:5173`
