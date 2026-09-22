import { useAnimatedNumber } from "@/lib/use-animated-number";
import { formatNb } from "@/lib/format";

type SavingsHeroProps = {
  total: number;
  perYear: number;
};

export function SavingsHero({ total, perYear }: SavingsHeroProps) {
  const animated = useAnimatedNumber(total);
  const display = Math.round(animated / 100) * 100;
  const negative = total < 0;

  return (
    <div className="space-y-1">
      <p className="flex flex-wrap items-baseline gap-x-2 text-fg">
        <span className="text-3xl font-semibold tracking-tight tabular-nums">
          {formatNb(Math.abs(display), 0)} kr
        </span>
        <span className="text-base font-medium text-muted">
          {negative ? "est. merkostnad" : "est. besparelser"}
        </span>
      </p>
      <p className="text-sm text-subtle tabular-nums">
        {negative ? "Ekstra" : "Sparer"} {formatNb(Math.abs(perYear), 0)} kr per år
      </p>
    </div>
  );
}
