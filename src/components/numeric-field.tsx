import { useEffect, useState } from "react";
import { formatInput, parseNbNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

type NumericFieldProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  unit: string;
  decimals?: number;
  min?: number;
  max?: number;
  step?: number;
};

export function NumericField({
  label,
  value,
  onChange,
  unit,
  decimals = 2,
  min = 0,
  max = 1_000_000,
  step,
}: NumericFieldProps) {
  const [focused, setFocused] = useState(false);
  const [draft, setDraft] = useState("");
  const id = `field-${label.toLowerCase().replace(/[^a-z0-9æøå]+/g, "-")}`;

  useEffect(() => {
    if (!focused) setDraft(formatInput(value, decimals));
  }, [value, decimals, focused]);

  function commit(raw: string) {
    const parsed = parseNbNumber(raw);
    if (parsed === null) {
      setDraft(formatInput(value, decimals));
      return;
    }
    const next = Math.min(max, Math.max(min, parsed));
    onChange(next);
    setDraft(formatInput(next, decimals));
  }

  return (
    <label
      htmlFor={id}
      className={cn(
        "group relative flex min-h-11 items-center justify-between gap-4 rounded-md px-4 py-3",
        "shadow-field transition-[box-shadow] duration-150 ease-out",
        "hover:shadow-field-hover focus-within:shadow-field-focus",
      )}
    >
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-xs font-medium text-muted">{label}</span>
        <input
          id={id}
          inputMode="decimal"
          autoComplete="off"
          spellCheck={false}
          value={focused ? draft : formatInput(value, decimals)}
          step={step}
          onFocus={() => {
            setFocused(true);
            setDraft(formatInput(value, decimals));
          }}
          onBlur={() => {
            commit(draft);
            setFocused(false);
          }}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") (e.target as HTMLInputElement).blur();
          }}
          className="w-full bg-transparent text-xl font-semibold leading-snug tracking-tight text-fg tabular-nums outline-none"
        />
      </span>
      <span className="shrink-0 text-sm text-subtle">{unit}</span>
    </label>
  );
}
