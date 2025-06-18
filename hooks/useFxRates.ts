import { useQuery } from '@tanstack/react-query';

// Supported currencies from Frankfurter API docs
export const FX_SYMBOLS = [
  "EUR", "USD", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "ZAR", "INR", "SGD"
];

export type FxPoint = { date: string; value: number };
export type FxRow = { code: string; rate: number; history: FxPoint[] };

export function useFxRates(
  from: string = "USD",
  to: string = "EUR",
  window: "D" | "W" | "M" = "W"
) {
  return useQuery<FxRow[]>({
    queryKey: ["fx", from, to, window],
    queryFn: async () => {
      if (!from || !to || from === to) throw new Error("Invalid currency selection");

      // calculate date range
      const end = new Date();
      const start = new Date(end);
      if (window === "D") start.setDate(end.getDate() - 1);
      if (window === "W") start.setDate(end.getDate() - 7);
      if (window === "M") start.setMonth(end.getMonth() - 1);

      const s = start.toISOString().split("T")[0];
      const e = end.toISOString().split("T")[0];

      // Frankfurter API expects single base, and a comma list for to
      const url = `https://api.frankfurter.app/${s}..${e}?from=${from}&to=${to}`;
      console.log("[FX] fetching:", url);

      const res = await fetch(url);
      if (!res.ok) {
        console.error("[FX] HTTP error", res.status);
        throw new Error("FX HTTP error " + res.status);
      }
      const data = await res.json();
      console.log("[FX] raw:", data);

      // Format: { rates: { "2025-06-11": { "EUR": 0.87, ... }, ... } }
      if (!data.rates || typeof data.rates !== "object") {
        console.error("[FX] Malformed response", data);
        throw new Error("FX feed unavailable or malformed response!");
      }

      const history: FxPoint[] = Object.entries(data.rates)
        .map(([date, obj]) => ({
          date,
          value: (obj as Record<string, number>)[to]
        }))
        .filter(point => typeof point.value === "number");

      const rate = history[history.length - 1]?.value ?? null;
      if (rate === null) throw new Error("FX rate unavailable for selected pair.");

      // Chart wants array even if only one row
      return [{ code: to, rate, history }];
    },
    staleTime: 60000,
    retry: 1,
  });
}
