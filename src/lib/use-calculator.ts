import { useEffect, useMemo, useState } from "react";
import { calculate, type CalcInputs } from "@/lib/calc";

export type CalculatorState = CalcInputs;

const STORAGE_KEY = "elspar:v5";

export const DEFAULT_STATE: CalculatorState = {
  years: 5,
  gasLPer100: 6,
  annualKm: 20000,
  gasPrice: 28,
  elecPrice: 2,
  evKwhPer100: 15,
};

function asState(parsed: Partial<CalculatorState>): CalculatorState {
  return {
    years: num(parsed.years, DEFAULT_STATE.years),
    gasLPer100: num(parsed.gasLPer100, DEFAULT_STATE.gasLPer100),
    annualKm: num(parsed.annualKm, DEFAULT_STATE.annualKm),
    gasPrice: num(parsed.gasPrice, DEFAULT_STATE.gasPrice),
    elecPrice: num(parsed.elecPrice, DEFAULT_STATE.elecPrice),
    evKwhPer100: num(parsed.evKwhPer100, DEFAULT_STATE.evKwhPer100),
  };
}

function readStored(): { draft: CalculatorState; committed: CalculatorState } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as {
      draft?: Partial<CalculatorState>;
      committed?: Partial<CalculatorState>;
      years?: number;
    };
    if (parsed.draft && parsed.committed) {
      return { draft: asState(parsed.draft), committed: asState(parsed.committed) };
    }
    if (typeof parsed.years === "number") {
      const state = asState(parsed);
      return { draft: state, committed: state };
    }
    return null;
  } catch {
    return null;
  }
}

function num(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

export function useCalculator() {
  const [draft, setDraft] = useState<CalculatorState>(DEFAULT_STATE);
  const [committed, setCommitted] = useState<CalculatorState>(DEFAULT_STATE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readStored();
    if (stored) {
      setDraft(stored.draft);
      setCommitted(stored.committed);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ draft, committed }));
  }, [draft, committed, ready]);

  const result = useMemo(() => calculate(committed), [committed]);

  function patch(partial: Partial<CalculatorState>) {
    setDraft((prev) => ({ ...prev, ...partial }));
  }

  function compute() {
    setCommitted(draft);
  }

  function reset() {
    setDraft(DEFAULT_STATE);
    setCommitted(DEFAULT_STATE);
  }

  return { draft, committed, result, patch, compute, reset };
}
