import { useState, useEffect } from 'react';
import { UserWalletState } from '../types/card';
import { INITIAL_INSTRUMENTS } from '../data/instruments';

const STORAGE_KEY = 'cardwise_wallet_state_v1';
const THEME_STORAGE_KEY = 'cardwise_theme_v1';

export const DEFAULT_WALLET_STATE: UserWalletState = {
  enabledCards: INITIAL_INSTRUMENTS.reduce((acc, card) => {
    acc[card.id] = true;
    return acc;
  }, {} as Record<string, boolean>),
  spentThisMonth: {
    // default 0 for clean start, user can simulate
    zaggle_zinger: 0,
    swiggy_hdfc: 0,
    hsbc_live_plus: 0,
    sbi_cashback: 0,
    bob_eterna: 0,
    amazon_icici: 0,
    flipkart_axis: 0,
    kiwi_neon: 0,
    tata_neu_plus: 0,
    amex_mrcc: 0,
  },
  amexMilestoneTxnCount: 1,
  taxBracket: 0.30
};

export function loadWalletState(): UserWalletState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_WALLET_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_WALLET_STATE,
      ...parsed,
      enabledCards: {
        ...DEFAULT_WALLET_STATE.enabledCards,
        ...(parsed.enabledCards || {})
      },
      spentThisMonth: {
        ...DEFAULT_WALLET_STATE.spentThisMonth,
        ...(parsed.spentThisMonth || {})
      }
    };
  } catch (e) {
    console.error('Failed to load wallet state from LocalStorage:', e);
    return DEFAULT_WALLET_STATE;
  }
}

export function saveWalletState(state: UserWalletState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save wallet state to LocalStorage:', e);
  }
}

export function useWalletState() {
  const [walletState, setWalletState] = useState<UserWalletState>(() => loadWalletState());

  useEffect(() => {
    saveWalletState(walletState);
  }, [walletState]);

  const toggleCard = (cardId: string) => {
    setWalletState(prev => ({
      ...prev,
      enabledCards: {
        ...prev.enabledCards,
        [cardId]: prev.enabledCards[cardId] === false ? true : false
      }
    }));
  };

  const updateCardSpend = (cardId: string, amount: number) => {
    setWalletState(prev => ({
      ...prev,
      spentThisMonth: {
        ...prev.spentThisMonth,
        [cardId]: Math.max(0, amount)
      }
    }));
  };

  const setAmexCount = (count: number) => {
    setWalletState(prev => ({
      ...prev,
      amexMilestoneTxnCount: Math.max(0, Math.min(4, count))
    }));
  };

  const setTaxBracket = (rate: number) => {
    setWalletState(prev => ({
      ...prev,
      taxBracket: rate
    }));
  };

  const resetWalletState = () => {
    setWalletState(DEFAULT_WALLET_STATE);
  };

  return {
    walletState,
    toggleCard,
    updateCardSpend,
    setAmexCount,
    setTaxBracket,
    resetWalletState,
    setWalletState
  };
}

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved !== null) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem(THEME_STORAGE_KEY, 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  return { isDark, toggleTheme };
}
