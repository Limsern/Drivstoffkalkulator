import { i as __toESM } from "../_runtime.mjs";
import { L as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Fuel, i as Leaf, o as Calculator, r as RotateCcw, t as Zap } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CVqFK0ev.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function formatNb(value, decimals = 0) {
	return new Intl.NumberFormat("nb-NO", {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals
	}).format(value);
}
/** Whole numbers stay clean (8), decimals only when typed (7,63). */
function formatInput(value, maxDecimals = 2) {
	return new Intl.NumberFormat("nb-NO", {
		minimumFractionDigits: 0,
		maximumFractionDigits: maxDecimals
	}).format(value);
}
function formatKr(value, decimals = 0) {
	return `${formatNb(value, decimals)} kr`;
}
function formatCompactKg(kg) {
	if (kg >= 1e3) return `${formatNb(kg / 1e3, 1)} t`;
	return `${formatNb(kg, 0)} kg`;
}
function parseNbNumber(raw) {
	const cleaned = raw.replace(/\s/g, "").replace(",", ".").trim();
	if (cleaned === "" || cleaned === "-" || cleaned === ".") return null;
	const n = Number(cleaned);
	return Number.isFinite(n) ? n : null;
}
function Insights({ result, years }) {
	const gasShare = result.gasPerYear <= 0 ? 0 : Math.min(100, result.elecPerYear / Math.max(result.gasPerYear, 1) * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-4",
		"aria-label": "Sammenligning",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fuel, {
						className: "size-4",
						strokeWidth: 1.75
					}),
					label: "Bensin/diesel",
					value: formatKr(result.gasPerYear, 0),
					hint: "per år"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, {
						className: "size-4",
						strokeWidth: 1.75
					}),
					label: "Strøm",
					value: formatKr(result.elecPerYear, 0),
					hint: "per år"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between text-xs text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Kostnad per år" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums",
						children: [formatNb(gasShare, 0), " % av bensin/diesel"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-2 overflow-hidden rounded-full bg-line",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full bg-fg transition-[width] duration-500",
						style: { width: `${gasShare}%` }
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
					label: "Bensin/diesel · mil",
					value: `${formatNb(result.gasPerMil, 2)} kr`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
					label: "Strøm · mil",
					value: `${formatNb(result.elecPerMil, 2)} kr`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SavingsChart, { result }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 rounded-md bg-bg px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, {
					className: "size-4 shrink-0 text-save",
					strokeWidth: 1.75
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm leading-snug text-muted",
					children: [
						"Omtrent ",
						formatCompactKg(Math.max(0, result.co2SavedKg)),
						" CO₂ spart over ",
						years,
						" ",
						"år med norsk strømmiks."
					]
				})]
			})
		]
	});
}
function StatCard({ icon, label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md bg-bg px-4 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center gap-2 text-muted",
				children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-medium",
					children: label
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-lg font-semibold tracking-tight tabular-nums",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-subtle",
				children: hint
			})
		]
	});
}
function MiniStat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md px-4 py-3 shadow-field",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-base font-semibold tabular-nums",
			children: value
		})]
	});
}
function SavingsChart({ result }) {
	const rows = result.yearly;
	if (rows.length === 0) return null;
	const max = Math.max(...rows.map((r) => r.gas), 1);
	const w = 320;
	const h = 120;
	const padX = 8;
	const innerW = 304;
	const innerH = 100;
	const point = (index, value) => {
		return `${padX + (rows.length === 1 ? innerW / 2 : index / (rows.length - 1) * innerW)},${110 - value / max * innerH}`;
	};
	const gasLine = rows.map((r, i) => point(i, r.gas)).join(" ");
	const elecLine = rows.map((r, i) => point(i, r.elec)).join(" ");
	const area = `${point(0, 0)} ${gasLine} ${[...rows].reverse().map((r, i) => point(rows.length - 1 - i, r.elec)).join(" ")}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-center justify-between text-xs text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Akkumulert kostnad" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-gas" }), " Bensin/diesel"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-fg" }), " Strøm"]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: `0 0 ${w} ${h}`,
			className: "h-28 w-full",
			role: "img",
			"aria-label": "Kostnad over tid",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: area,
					className: "fill-fg/10"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
					points: gasLine,
					fill: "none",
					className: "stroke-gas",
					strokeWidth: "2",
					strokeLinejoin: "round",
					strokeLinecap: "round"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
					points: elecLine,
					fill: "none",
					className: "stroke-fg",
					strokeWidth: "2",
					strokeLinejoin: "round",
					strokeLinecap: "round"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between text-xs text-subtle tabular-nums",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "År 1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["År ", rows.length] })]
		})
	] });
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function NumericField({ label, value, onChange, unit, decimals = 2, min = 0, max = 1e6, step }) {
	const [focused, setFocused] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)("");
	const id = `field-${label.toLowerCase().replace(/[^a-z0-9æøå]+/g, "-")}`;
	(0, import_react.useEffect)(() => {
		if (!focused) setDraft(formatInput(value, decimals));
	}, [
		value,
		decimals,
		focused
	]);
	function commit(raw) {
		const parsed = parseNbNumber(raw);
		if (parsed === null) {
			setDraft(formatInput(value, decimals));
			return;
		}
		const next = Math.min(max, Math.max(min, parsed));
		onChange(next);
		setDraft(formatInput(next, decimals));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		htmlFor: id,
		className: cn("group relative flex min-h-11 items-center justify-between gap-4 rounded-md px-4 py-3", "shadow-field transition-[box-shadow] duration-150 ease-out", "hover:shadow-field-hover focus-within:shadow-field-focus"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex min-w-0 flex-1 flex-col gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-medium text-muted",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id,
				inputMode: "decimal",
				autoComplete: "off",
				spellCheck: false,
				value: focused ? draft : formatInput(value, decimals),
				step,
				onFocus: () => {
					setFocused(true);
					setDraft(formatInput(value, decimals));
				},
				onBlur: () => {
					commit(draft);
					setFocused(false);
				},
				onChange: (e) => setDraft(e.target.value),
				onKeyDown: (e) => {
					if (e.key === "Enter") e.target.blur();
				},
				className: "w-full bg-transparent text-xl font-semibold leading-snug tracking-tight text-fg tabular-nums outline-none"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "shrink-0 text-sm text-subtle",
			children: unit
		})]
	});
}
function useAnimatedNumber(target, duration = 480) {
	const [value, setValue] = (0, import_react.useState)(target);
	const current = (0, import_react.useRef)(target);
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			current.current = target;
			setValue(target);
			return;
		}
		const from = current.current;
		const started = performance.now();
		let frame = 0;
		const tick = (now) => {
			const t = Math.min(1, (now - started) / duration);
			const eased = 1 - (1 - t) ** 3;
			const next = from + (target - from) * eased;
			current.current = next;
			setValue(next);
			if (t < 1) frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [target, duration]);
	return value;
}
function SavingsHero({ total, perYear }) {
	const animated = useAnimatedNumber(total);
	const display = Math.round(animated / 100) * 100;
	const negative = total < 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "flex flex-wrap items-baseline gap-x-2 text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-3xl font-semibold tracking-tight tabular-nums",
				children: [formatNb(Math.abs(display), 0), " kr"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-base font-medium text-muted",
				children: negative ? "est. merkostnad" : "est. besparelser"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-subtle tabular-nums",
			children: [
				negative ? "Ekstra" : "Sparer",
				" ",
				formatNb(Math.abs(perYear), 0),
				" kr per år"
			]
		})]
	});
}
function CalculatorPanel({ calc }) {
	const { draft, committed, result, patch, compute, reset } = calc;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto grid w-full max-w-5xl overflow-hidden rounded-xl bg-surface shadow-panel lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex flex-col border-b border-line lg:border-r lg:border-b-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between px-5 py-4 sm:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-muted",
					children: "Elbil vs bensin/diesel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: reset,
					className: "flex size-10 items-center justify-center rounded-md text-muted transition-colors duration-150 hover:bg-bg hover:text-fg",
					"aria-label": "Tilbakestill verdier",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
						className: "size-4",
						strokeWidth: 1.75
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col gap-2 px-5 pb-8 sm:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rise-in",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumericField, {
							label: "År",
							value: draft.years,
							onChange: (years) => patch({ years }),
							unit: "år",
							decimals: 0,
							min: 1,
							max: 40,
							step: 1
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rise-in rise-in-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumericField, {
							label: "Forbruk bensin/diesel",
							value: draft.gasLPer100,
							onChange: (gasLPer100) => patch({ gasLPer100 }),
							unit: "L / 100 km",
							decimals: 2,
							min: 2,
							max: 25,
							step: .1
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rise-in rise-in-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumericField, {
							label: "Elbilforbruk",
							value: draft.evKwhPer100,
							onChange: (evKwhPer100) => patch({ evKwhPer100 }),
							unit: "kWh / 100 km",
							decimals: 1,
							min: 8,
							max: 35,
							step: .1
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rise-in rise-in-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumericField, {
							label: "Årlig kjørelengde",
							value: draft.annualKm,
							onChange: (annualKm) => patch({ annualKm }),
							unit: "km",
							decimals: 0,
							min: 1e3,
							max: 1e5,
							step: 1e3
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rise-in rise-in-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumericField, {
							label: "Pris bensin/diesel",
							value: draft.gasPrice,
							onChange: (gasPrice) => patch({ gasPrice }),
							unit: "kr / liter",
							decimals: 2,
							min: 5,
							max: 50,
							step: .1
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rise-in rise-in-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumericField, {
							label: "Strømkostnad",
							value: draft.elecPrice,
							onChange: (elecPrice) => patch({ elecPrice }),
							unit: "kr / kWh",
							decimals: 2,
							min: .1,
							max: 10,
							step: .01
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: compute,
						className: "mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-fg px-4 text-sm font-medium text-primary-fg transition-opacity duration-150 hover:opacity-90",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, {
							className: "size-4",
							strokeWidth: 1.75
						}), "Beregn"]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex flex-col gap-6 bg-bg/40 px-5 py-6 sm:px-8 sm:py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rise-in rise-in-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SavingsHero, {
						total: result.saveRounded,
						perYear: result.savePerYear
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rise-in rise-in-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Insights, {
						result,
						years: committed.years
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto space-y-2 text-xs leading-relaxed text-subtle",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Trykk Beregn for å oppdatere resultatet. Faktisk forbruk og pris varierer med kjørestil, vær, temperatur og strømavtale." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Bensin/diesel ",
							formatInput(committed.gasLPer100, 2),
							" l/100 km · Elbil",
							" ",
							formatInput(committed.evKwhPer100, 1),
							" kWh/100 km"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Est. besparelser er ikke garantert." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Tallene, inkludert CO₂-estimatet, kan være feil eller ufullstendige. Beregningen er kun til illustrasjon og utgjør ikke økonomisk eller miljømessig rådgivning." })
					]
				})
			]
		})]
	});
}
/** Tank-to-wheel petrol, kg CO₂ per litre. */
var CO2_KG_PER_LITRE = 2.31;
/** Location-based Norwegian grid mix, kg CO₂ per kWh. */
var CO2_KG_PER_KWH_NO = .019;
function calculate(input) {
	const years = clamp(Math.round(input.years), 1, 40);
	const km = Math.max(0, input.annualKm);
	const gasLPer100 = Math.max(0, input.gasLPer100);
	const evKwhPer100 = Math.max(0, input.evKwhPer100);
	const gasPrice = Math.max(0, input.gasPrice);
	const elecPrice = Math.max(0, input.elecPrice);
	const gasLitersYear = km / 100 * gasLPer100;
	const elecKwhYear = km / 100 * evKwhPer100;
	const gasPerYear = gasLitersYear * gasPrice;
	const elecPerYear = elecKwhYear * elecPrice;
	const savePerYear = gasPerYear - elecPerYear;
	const saveTotal = savePerYear * years;
	const saveRounded = Math.round(saveTotal / 100) * 100;
	const yearly = [];
	for (let year = 1; year <= years; year++) yearly.push({
		year,
		gas: gasPerYear * year,
		elec: elecPerYear * year,
		save: savePerYear,
		cumulative: savePerYear * year
	});
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
		gasPerMil: gasLPer100 / 10 * gasPrice,
		elecPerMil: evKwhPer100 / 10 * elecPrice,
		gasPer100: gasLPer100 * gasPrice,
		elecPer100: evKwhPer100 * elecPrice,
		co2GasKg,
		co2ElecKg,
		co2SavedKg: co2GasKg - co2ElecKg,
		yearly
	};
}
function clamp(n, min, max) {
	return Math.min(max, Math.max(min, n));
}
var STORAGE_KEY = "elspar:v5";
var DEFAULT_STATE = {
	years: 5,
	gasLPer100: 6,
	annualKm: 2e4,
	gasPrice: 28,
	elecPrice: 2,
	evKwhPer100: 15
};
function asState(parsed) {
	return {
		years: num(parsed.years, DEFAULT_STATE.years),
		gasLPer100: num(parsed.gasLPer100, DEFAULT_STATE.gasLPer100),
		annualKm: num(parsed.annualKm, DEFAULT_STATE.annualKm),
		gasPrice: num(parsed.gasPrice, DEFAULT_STATE.gasPrice),
		elecPrice: num(parsed.elecPrice, DEFAULT_STATE.elecPrice),
		evKwhPer100: num(parsed.evKwhPer100, DEFAULT_STATE.evKwhPer100)
	};
}
function readStored() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (parsed.draft && parsed.committed) return {
			draft: asState(parsed.draft),
			committed: asState(parsed.committed)
		};
		if (typeof parsed.years === "number") {
			const state = asState(parsed);
			return {
				draft: state,
				committed: state
			};
		}
		return null;
	} catch {
		return null;
	}
}
function num(value, fallback) {
	return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}
function useCalculator() {
	const [draft, setDraft] = (0, import_react.useState)(DEFAULT_STATE);
	const [committed, setCommitted] = (0, import_react.useState)(DEFAULT_STATE);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const stored = readStored();
		if (stored) {
			setDraft(stored.draft);
			setCommitted(stored.committed);
		}
		setReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify({
			draft,
			committed
		}));
	}, [
		draft,
		committed,
		ready
	]);
	const result = (0, import_react.useMemo)(() => calculate(committed), [committed]);
	function patch(partial) {
		setDraft((prev) => ({
			...prev,
			...partial
		}));
	}
	function compute() {
		setCommitted(draft);
	}
	function reset() {
		setDraft(DEFAULT_STATE);
		setCommitted(DEFAULT_STATE);
	}
	return {
		draft,
		committed,
		result,
		patch,
		compute,
		reset
	};
}
function Home() {
	const calc = useCalculator();
	(0, import_react.useEffect)(() => {
		if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-dvh bg-bg px-4 py-8 sm:px-6 sm:py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalculatorPanel, { calc })
	});
}
//#endregion
export { Home as component };
