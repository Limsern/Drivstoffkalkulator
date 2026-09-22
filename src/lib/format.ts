export function formatNb(value: number, decimals = 0): string {
  return new Intl.NumberFormat("nb-NO", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/** Whole numbers stay clean (8), decimals only when typed (7,63). */
export function formatInput(value: number, maxDecimals = 2): string {
  return new Intl.NumberFormat("nb-NO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDecimals,
  }).format(value);
}

export function formatKr(value: number, decimals = 0): string {
  return `${formatNb(value, decimals)} kr`;
}

export function formatCompactKg(kg: number): string {
  if (kg >= 1000) return `${formatNb(kg / 1000, 1)} t`;
  return `${formatNb(kg, 0)} kg`;
}

export function parseNbNumber(raw: string): number | null {
  const cleaned = raw.replace(/\s/g, "").replace(",", ".").trim();
  if (cleaned === "" || cleaned === "-" || cleaned === ".") return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}
