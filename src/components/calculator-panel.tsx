import { Calculator, RotateCcw } from "lucide-react";
import { Insights } from "@/components/insights";
import { NumericField } from "@/components/numeric-field";
import { SavingsHero } from "@/components/savings-hero";
import { formatInput } from "@/lib/format";
import type { useCalculator } from "@/lib/use-calculator";

type CalculatorPanelProps = {
  calc: ReturnType<typeof useCalculator>;
};

export function CalculatorPanel({ calc }: CalculatorPanelProps) {
  const { draft, committed, result, patch, compute, reset } = calc;

  return (
    <article className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-xl bg-surface shadow-panel lg:grid-cols-2">
      <section className="flex flex-col border-b border-line lg:border-r lg:border-b-0">
        <header className="flex items-center justify-between px-5 py-4 sm:px-8">
          <p className="text-xs font-medium tracking-wide text-muted">Elbil vs bensin/diesel</p>
          <button
            type="button"
            onClick={reset}
            className="flex size-10 items-center justify-center rounded-md text-muted transition-colors duration-150 hover:bg-bg hover:text-fg"
            aria-label="Tilbakestill verdier"
          >
            <RotateCcw className="size-4" strokeWidth={1.75} />
          </button>
        </header>

        <div className="flex flex-1 flex-col gap-2 px-5 pb-8 sm:px-8">
          <div className="rise-in">
            <NumericField
              label="År"
              value={draft.years}
              onChange={(years) => patch({ years })}
              unit="år"
              decimals={0}
              min={1}
              max={40}
              step={1}
            />
          </div>
          <div className="rise-in rise-in-1">
            <NumericField
              label="Forbruk bensin/diesel"
              value={draft.gasLPer100}
              onChange={(gasLPer100) => patch({ gasLPer100 })}
              unit="L / 100 km"
              decimals={2}
              min={2}
              max={25}
              step={0.1}
            />
          </div>
          <div className="rise-in rise-in-2">
            <NumericField
              label="Elbilforbruk"
              value={draft.evKwhPer100}
              onChange={(evKwhPer100) => patch({ evKwhPer100 })}
              unit="kWh / 100 km"
              decimals={1}
              min={8}
              max={35}
              step={0.1}
            />
          </div>
          <div className="rise-in rise-in-3">
            <NumericField
              label="Årlig kjørelengde"
              value={draft.annualKm}
              onChange={(annualKm) => patch({ annualKm })}
              unit="km"
              decimals={0}
              min={1000}
              max={100000}
              step={1000}
            />
          </div>
          <div className="rise-in rise-in-4">
            <NumericField
              label="Pris bensin/diesel"
              value={draft.gasPrice}
              onChange={(gasPrice) => patch({ gasPrice })}
              unit="kr / liter"
              decimals={2}
              min={5}
              max={50}
              step={0.1}
            />
          </div>
          <div className="rise-in rise-in-5">
            <NumericField
              label="Strømkostnad"
              value={draft.elecPrice}
              onChange={(elecPrice) => patch({ elecPrice })}
              unit="kr / kWh"
              decimals={2}
              min={0.1}
              max={10}
              step={0.01}
            />
          </div>
          <button
            type="button"
            onClick={compute}
            className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-fg px-4 text-sm font-medium text-primary-fg transition-opacity duration-150 hover:opacity-90"
          >
            <Calculator className="size-4" strokeWidth={1.75} />
            Beregn
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-6 bg-bg/40 px-5 py-6 sm:px-8 sm:py-8">
        <div className="rise-in rise-in-2">
          <SavingsHero total={result.saveRounded} perYear={result.savePerYear} />
        </div>
        <div className="rise-in rise-in-4">
          <Insights result={result} years={committed.years} />
        </div>
        <div className="mt-auto space-y-2 text-xs leading-relaxed text-subtle">
          <p>
            Trykk Beregn for å oppdatere resultatet. Faktisk forbruk og pris varierer med
            kjørestil, vær, temperatur og strømavtale.
          </p>
          <p>
            Bensin/diesel {formatInput(committed.gasLPer100, 2)} l/100 km · Elbil{" "}
            {formatInput(committed.evKwhPer100, 1)} kWh/100 km
          </p>
          <p>Est. besparelser er ikke garantert.</p>
          <p>
            Tallene, inkludert CO₂-estimatet, kan være feil eller ufullstendige. Beregningen
            er kun til illustrasjon og utgjør ikke økonomisk eller miljømessig rådgivning.
          </p>
        </div>
      </section>
    </article>
  );
}
