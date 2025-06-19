'use client';

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FX_SYMBOLS, useFxRates } from "@/hooks/useFxRates";
import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import Image from "next/image";

type Option = { code: string; name: string; flag: string };

// Helper: country code to flag
// helper within ExchangeRatesTicker

const codeToFlag = (code: string) =>
  `https://flagcdn.com/32x24/${countryCodeMap[code]?.toLowerCase() || 'us'}.png`;


// Basic currency name + country code mapping (minimal for demo)
const countryCodeMap: Record<string, string> = {
  USD: "US", EUR: "EU", GBP: "GB", JPY: "JP", AUD: "AU",
  CAD: "CA", CHF: "CH", CNY: "CN", ZAR: "ZA",SGD:"SG"
};

const currencyNames: Record<string, string> = {
  USD: "US Dollar", EUR: "Euro", GBP: "British Pound", JPY: "Japanese Yen",
  AUD: "Australian Dollar", CAD: "Canadian Dollar", CHF: "Swiss Franc",
  CNY: "Chinese Yuan", ZAR: "South African Rand", SGD:"Singapore Dollar", INR:"Indian Rupee"
};

export default function ExchangeRatesTicker() {
  const [from, setFrom] = useState("USD");
  const [to, setTo]     = useState("EUR");
  const [window, setWindow] = useState<"D"|"W"|"M">("W");
  const { data, isLoading, error } = useFxRates(from, to, window);

  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Update chart when data changes
  useEffect(() => {
    if (!data || data.length === 0 || !chartRef.current) return;

    const history = data[0].history;
    const labels  = history.map((p) => p.date);
    const values  = history.map((p) => p.value);

    chartInstance.current?.destroy();
    chartInstance.current = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: `${from} → ${to}`,
          data: values,
          borderColor: "#0056B6",
          backgroundColor: "rgba(0,86,182,0.2)",
          pointRadius: 2,
          tension: 0.4,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: { mode: "index", intersect: false },
          legend: { display: true }
        },
        scales: {
          x: { title: { display: false }, grid: { display: false }},
          y: { title: { display: false }, grid: { color: "#e6effa" }},
        },
      }
    });
  }, [data, from, to]);

  return (
    <Card className="p-6 bg-[#fafdff] border border-[#e6effa] rounded-2xl mb-6 shadow-sm min-h-[340px]">
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6 ">
        <div className="flex items-center gap-2">
          <Dropdown
            value={from}
            setValue={setFrom}
            exclude={to}
            label="From"
            
          />
          <span className="mx-2 text-xl font-bold">→</span>
          <Dropdown
            value={to}
            setValue={setTo}
            exclude={from}
            label="To"
          />
        </div>
        <div className="flex gap-2 ml-auto">
          <TimeButton val="D" window={window} setWindow={setWindow}>1D</TimeButton>
          <TimeButton val="W" window={window} setWindow={setWindow}>1W</TimeButton>
          <TimeButton val="M" window={window} setWindow={setWindow}>1M</TimeButton>
        </div>
      </div>

      {isLoading && <Skeleton className="h-56 w-full rounded-2xl animate-pulse" />}
      {error && (
        <div className="text-red-500 text-sm font-semibold">
          {(error as Error).message}
        </div>
      )}

      {!isLoading && !error && data && (
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex items-center gap-3 min-w-[180px]">
            <Image
              src={codeToFlag(from)}
              alt={from}
              width={32}
              height={32}
              className="rounded shadow"
            />
            <span className="font-semibold text-lg text-[#02152b]">{from} </span>
            <span className="text-[#A5B8C9]">to</span>
            <Image
              src={codeToFlag(to)}
              alt={to}
              width={32}
              height={32}
              className="rounded shadow"
            />
            <span className="font-semibold text-lg text-[#02152b]">{to}</span>
          </div>
          <div className="flex flex-col flex-1 items-center">
            <span className="text-3xl font-extrabold text-[#0056B6] mb-2">
              {data[0].rate.toFixed(4)}
            </span>
            <span className="text-base text-[#888]">
              {currencyNames[from]} → {currencyNames[to]}
            </span>
          </div>
          <div className="w-full md:w-[380px] h-56">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
      )}
    </Card>
  );
}

// Dropdown with flags and codes
function Dropdown({
  value,
  setValue,
  exclude,
  label,
}: {
  value: string;
  setValue: (v: string) => void;
  exclude: string;
  label: string;
}) {
  return (
    <select
      className="p-2 rounded-lg border border-[#e6effa] bg-white text-[#02152b] font-semibold"
      value={value}
      onChange={e => setValue(e.target.value)}
    >
      {FX_SYMBOLS.filter(c => c !== exclude).map((code) => (
        <option key={code} value={code}>
          {code} - {currencyNames[code] || code}
        </option>
      ))}
    </select>
  );
}

// Button for window
function TimeButton({ val, window, setWindow, children }:{
  val: "D"|"W"|"M", window: string, setWindow: (v:"D"|"W"|"M")=>void, children: React.ReactNode
}) {
  return (
    <button
      className={`px-3 py-1 rounded-xl font-semibold border 
        ${window === val ? 'bg-[#0056B6] text-white border-[#0056B6]' : 'bg-white text-[#0056B6] border-[#e6effa]'}
        hover:bg-[#e8f4ff] transition`}
      onClick={() => setWindow(val)}
    >{children}</button>
  );
}
