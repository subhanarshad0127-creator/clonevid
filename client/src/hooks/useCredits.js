import { useState, useCallback } from 'react';

const PLAN_CONFIG = {
  starter: { name: 'Starter', minutesTotal: 10, mockUsed: 3, price: 9.99 },
  creator: { name: 'Creator', minutesTotal: 40, mockUsed: 12, price: 29.99 },
  pro: { name: 'Pro', minutesTotal: 90, mockUsed: 25, price: 59.99 },
};

const LENGTH_MINUTES = {
  '30s': 0.5,
  '60s': 1,
  '2min': 2,
  '3min': 3,
};

/**
 * useCredits — tracks minutes-based credit state.
 * In a real app this would fetch from Supabase.
 *
 * Returns:
 *   plan, planName, minutesTotal, minutesUsed, minutesRemaining,
 *   canGenerate, deductMinutes, usagePercent, getEstimatedMinutes
 */
export function useCredits(initialPlan = 'starter') {
  const config = PLAN_CONFIG[initialPlan] || PLAN_CONFIG.starter;

  const [minutesUsed, setMinutesUsed] = useState(config.mockUsed);

  const minutesTotal = config.minutesTotal;
  const minutesRemaining = Math.max(0, minutesTotal - minutesUsed);
  const canGenerate = minutesRemaining > 0;
  const usagePercent = Math.round((minutesUsed / minutesTotal) * 100);

  const deductMinutes = useCallback((length) => {
    const cost = LENGTH_MINUTES[length] || 1;
    setMinutesUsed((prev) => Math.min(minutesTotal, prev + cost));
  }, [minutesTotal]);

  const getEstimatedMinutes = (length) => {
    return LENGTH_MINUTES[length] || 1;
  };

  return {
    plan: initialPlan,
    planName: config.name,
    price: config.price,
    minutesTotal,
    minutesUsed,
    minutesRemaining,
    canGenerate,
    deductMinutes,
    usagePercent,
    getEstimatedMinutes,
  };
}
