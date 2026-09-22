import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalculatorPanel } from "@/components/calculator-panel";
import { useCalculator } from "@/lib/use-calculator";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const calc = useCalculator();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  return (
    <main className="min-h-dvh bg-bg px-4 py-8 sm:px-6 sm:py-12">
      <CalculatorPanel calc={calc} />
    </main>
  );
}
