export type CalcInputs = {
  years: number;
  gasLPer100: number;
  annualKm: number;
  gasPrice: number;
  elecPrice: number;
  evKwhPer100: number;
};

export type YearRow = {
  year: number;
  gas: number;
  elec: number;
  save: number;
  cumulative: number;
};

export type CalcResult = {
  gasLitersYear: number;
  elecKwhYear: number;
  gasPerYear: number;
  elecPerYear: number;
  savePerYear: number;
  saveTotal: number;
  saveRounded: number;
  gasPerMil: number;
  elecPerMil: number;
  gasPer100: number;
  elecPer100: number;
  co2GasKg: number;
  co2ElecKg: number;
  co2SavedKg: number;
  yearly: YearRow[];
};

/** Tank-to-wheel petrol, kg CO₂ per litre. */
const CO2_KG_PER_LITRE = 2.31;
/** Location-based Norwegian grid mix, kg CO₂ per kWh. */
const CO2_KG_PER_KWH_NO = 0.019;

export function calculate(input: CalcInputs): CalcResult {
  const years = clamp(Math.round(input.years), 1, 40);
  const km = Math.max(0, input.annualKm);
  const gasLPer100 = Math.max(0, input.gasLPer100);
  const evKwhPer100 = Math.max(0, input.evKwhPer100);
  const gasPrice = Math.max(0, input.gasPrice);
  const elecPrice = Math.max(0, input.elecPrice);

  const gasLitersYear = (km / 100) * gasLPer100;
  const elecKwhYear = (km / 100) * evKwhPer100;
  const gasPerYear = gasLitersYear * gasPrice;
  const elecPerYear = elecKwhYear * elecPrice;
  const savePerYear = gasPerYear - elecPerYear;
  const saveTotal = savePerYear * years;
  const saveRounded = Math.round(saveTotal / 100) * 100;

  const yearly: YearRow[] = [];
  for (let year = 1; year <= years; year++) {
    yearly.push({
      year,
      gas: gasPerYear * year,
      elec: elecPerYear * year,
      save: savePerYear,
      cumulative: savePerYear * year,
    });
  }

  const co2GasKg = gasLitersYear * CO2_KG_PER_LITRE * years;
  const co2ElecKg = elecKwhYear * CO2_KG_PER_KWH_NO * years;

  return {
    gasLitersYear,
    elecKwhYear,
    gasPerYear,
    elecPerYear,
    savePerYear,
    saveTotal,
    saveRounded,
    gasPerMil: (gasLPer100 / 10) * gasPrice,
    elecPerMil: (evKwhPer100 / 10) * elecPrice,
    gasPer100: gasLPer100 * gasPrice,
    elecPer100: evKwhPer100 * elecPrice,
    co2GasKg,
    co2ElecKg,
    co2SavedKg: co2GasKg - co2ElecKg,
    yearly,
  };
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
