# CardWise: Personal Spend & Reward Optimizer

## Project Description
CardWise is a production-grade personal spend and reward optimization web application built with React, Vite, TypeScript, and Tailwind CSS. It features a 100% deterministic arithmetic engine (zero hallucination) that scans 14 active payment instruments, evaluates payment rails (Credit Card vs RuPay UPI vs Meal Card), checks monthly reward caps, and ranks cards by net rupee value return.

## Key Highlights
- **14 Pre-seeded Payment Instruments**: Zaggle Zinger Meal Card, Swiggy HDFC, HSBC Live+, SBI Cashback, Amazon Pay ICICI, BoB Eterna, Flipkart Axis Bank, Kiwi Neon RuPay, Tata Neu Plus HDFC RuPay, Amex MRCC, Axis Privilege Amex, HSBC Platinum, HSBC Salary Debit, HDFC EasyShop Debit.
- **Smart Tax Shield**: ~30% direct income tax savings evaluation for meal cards on food/groceries.
- **RuPay UPI Optimization**: Instant filtering of eligible RuPay cards (Kiwi Neon 2% cashback) with non-RuPay QR warnings.
- **Milestone Pro-Tips**: Amex MRCC 4x ₹1,500 monthly milestone detection and interactive tracker.
- **Production Deployment**: Containerized with multi-stage Docker and Nginx, deployed to Google Cloud Run.
