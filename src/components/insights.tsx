import type { ReactNode } from "react";
import { Fuel, Leaf, Zap } from "lucide-react";
import { formatCompactKg, formatKr, formatNb } from "@/lib/format";
import type { CalcResult } from "@/lib/calc";

type InsightsProps = {
  result: CalcResult;
  years: number;
};

export function Insights({ result, years }: InsightsProps) {
  const gasShare =
    result.gasPerYear <= 0
      ? 0
      : Math.min(100, (result.elecPerYear / Math.max(result.gasPerYear, 1)) * 100);

  return (
    <section className="space-y-4" aria-label="Sammenligning">
      <div className="grid grid-cols-2 gap-2">
        <StatCard
          icon={<Fuel className="size-4" strokeWidth={1.75} />}
          label="Bensin/diesel"
          value={formatKr(result.gasPerYear, 0)}
          hint="per år"
        />
        <StatCard
          icon={<Zap className="size-4" strokeWidth={1.75} />}
          label="Strøm"
          value={formatKr(result.elecPerYear, 0)}
          hint="per år"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-end justify-between text-xs text-muted">
          <span>Kostnad per år</span>
          <span className="tabular-nums">{formatNb(gasShare, 0)} % av bensin/diesel</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-fg transition-[width] duration-500"
            style={{ width: `${gasShare}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <MiniStat label="Bensin/diesel · mil" value={`${formatNb(result.gasPerMil, 2)} kr`} />
        <MiniStat label="Strøm · mil" value={`${formatNb(result.elecPerMil, 2)} kr`} />
      </div>

      <SavingsChart result={result} />

      <div className="flex items-center gap-3 rounded-md bg-bg px-4 py-3">
        <Leaf className="size-4 shrink-0 text-save" strokeWidth={1.75} />
        <p className="text-sm leading-snug text-muted">
          Omtrent {formatCompactKg(Math.max(0, result.co2SavedKg))} CO₂ spart over {years}{" "}
          år med norsk strømmiks.
        </p>
      </div>
    </section>
  );
}

function StatCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-md bg-bg px-4 py-3">
      <div className="mb-2 flex items-center gap-2 text-muted">
        {icon}
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className="text-lg font-semibold tracking-tight tabular-nums">{value}</p>
      <p className="text-xs text-subtle">{hint}</p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md px-4 py-3 shadow-field">
      <p className="text-xs font-medium text-muted">{label}</p>
      <p className="mt-1 text-base font-semibold tabular-nums">{value}</p>
    </div>
  );
}

function SavingsChart({ result }: { result: CalcResult }) {
  const rows = result.yearly;
  if (rows.length === 0) return null;
  const max = Math.max(...rows.map((r) => r.gas), 1);
  const w = 320;
  const h = 120;
  const padX = 8;
  const padY = 10;
  const innerW = w - padX * 2;
  const innerH = h - padY * 2;

  const point = (index: number, value: number) => {
    const x = padX + (rows.length === 1 ? innerW / 2 : (index / (rows.length - 1)) * innerW);
    const y = padY + innerH - (value / max) * innerH;
    return `${x},${y}`;
  };

  const gasLine = rows.map((r, i) => point(i, r.gas)).join(" ");
  const elecLine = rows.map((r, i) => point(i, r.elec)).join(" ");
  const area = `${point(0, 0)} ${gasLine} ${[...rows]
    .reverse()
    .map((r, i) => point(rows.length - 1 - i, r.elec))
    .join(" ")}`;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs text-muted">
        <span>Akkumulert kostnad</span>
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-gas" /> Bensin/diesel
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-fg" /> Strøm
          </span>
        </span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-28 w-full" role="img" aria-label="Kostnad over tid">
        <polygon points={area} className="fill-fg/10" />
        <polyline
          points={gasLine}
          fill="none"
          className="stroke-gas"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <polyline
          points={elecLine}
          fill="none"
          className="stroke-fg"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <div className="flex justify-between text-xs text-subtle tabular-nums">
        <span>År 1</span>
        <span>År {rows.length}</span>
      </div>
    </div>
  );
}
