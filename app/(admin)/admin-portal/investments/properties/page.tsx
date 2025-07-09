"use client";

import { useState, useMemo } from "react";
import {
  BadgeCheck,
  MapPin,
  TrendingUp,
  TrendingDown,
  Home,
  Building2,
  DollarSign,
  Globe,
  Filter,
} from "lucide-react";
import { Pie, Doughnut, Bar, Line } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
  Filler,
  ChartOptions,
  Scale,
  Tick,
  CoreScaleOptions,
} from "chart.js";
import { motion } from "framer-motion";

Chart.register(
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
  Filler
);

const properties = [
  // ... [same property data as previous code]
  {
    name: "Emerald Heights Apartments",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    location: "Sandton, Johannesburg, SA",
    country: "South Africa",
    value: 1250000,
    type: "Residential",
    status: "Active",
    roi: 7.2,
    occupancy: 98,
    annualRent: 88000,
    code: "ZA-EMH-203",
    year: 2018,
  },
  {
    name: "Harbour View Office Park",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
    location: "Docklands, London, UK",
    country: "UK",
    value: 2650000,
    type: "Commercial",
    status: "Active",
    roi: 6.9,
    occupancy: 92,
    annualRent: 221000,
    code: "UK-HVP-014",
    year: 2014,
  },
  {
    name: "Sapphire Mews Villas",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
    location: "Sydney, Australia",
    country: "Australia",
    value: 1450000,
    type: "Residential",
    status: "Active",
    roi: 7.6,
    occupancy: 99,
    annualRent: 111200,
    code: "AU-SMV-090",
    year: 2019,
  },
  {
    name: "Golden Plaza Retail",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    location: "Downtown, Dubai, UAE",
    country: "UAE",
    value: 3120000,
    type: "Retail",
    status: "Active",
    roi: 8.7,
    occupancy: 97,
    annualRent: 294000,
    code: "AE-GPR-219",
    year: 2016,
  },
  {
    name: "Cedar Lane Logistics",
    image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=800&q=80",
    location: "Frankfurt, Germany",
    country: "Germany",
    value: 2750000,
    type: "Industrial",
    status: "Active",
    roi: 8.3,
    occupancy: 93,
    annualRent: 198000,
    code: "DE-CLL-302",
    year: 2017,
  },
  {
    name: "Azure Hills Residences",
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
    location: "Minato, Tokyo, Japan",
    country: "Japan",
    value: 1720000,
    type: "Residential",
    status: "Active",
    roi: 6.7,
    occupancy: 97,
    annualRent: 123700,
    code: "JP-AHR-301",
    year: 2015,
  },
  {
    name: "Sunset Office Suites",
    image: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=800&q=80",
    location: "Ikeja, Lagos, Nigeria",
    country: "Nigeria",
    value: 960000,
    type: "Commercial",
    status: "Active",
    roi: 10.1,
    occupancy: 94,
    annualRent: 109000,
    code: "NG-SOS-188",
    year: 2020,
  },
  {
    name: "Parkside Retail Square",
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80",
    location: "West Loop, Chicago, USA",
    country: "USA",
    value: 2270000,
    type: "Retail",
    status: "Active",
    roi: 7.8,
    occupancy: 98,
    annualRent: 171000,
    code: "US-PRS-094",
    year: 2018,
  },
  {
    name: "Summit Business Center",
    image: "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=800&q=80",
    location: "Copacabana, Rio de Janeiro, Brazil",
    country: "Brazil",
    value: 1510000,
    type: "Commercial",
    status: "Active",
    roi: 8.5,
    occupancy: 98,
    annualRent: 144500,
    code: "BR-SBC-221",
    year: 2019,
  },
  {
    name: "Meadowbrook Storage",
    image: "https://images.unsplash.com/photo-1424746219973-8fe3bd07d8e3?auto=format&fit=crop&w=800&q=80",
    location: "Midtown, Atlanta, USA",
    country: "USA",
    value: 830000,
    type: "Industrial",
    status: "Active",
    roi: 8.9,
    occupancy: 95,
    annualRent: 92000,
    code: "US-MBS-123",
    year: 2021,
  },
  {
    name: "Crystal Court",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80",
    location: "Paris, France",
    country: "France",
    value: 1870000,
    type: "Residential",
    status: "Active",
    roi: 7.5,
    occupancy: 97,
    annualRent: 115000,
    code: "FR-CRC-108",
    year: 2017,
  },
  {
    name: "Bay View Lofts",
    image: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=800&q=80",
    location: "Shibuya, Tokyo, Japan",
    country: "Japan",
    value: 2010000,
    type: "Residential",
    status: "Active",
    roi: 7.2,
    occupancy: 99,
    annualRent: 127500,
    code: "JP-BVL-021",
    year: 2022,
  },
];

const allTypes = ["All", ...Array.from(new Set(properties.map((p) => p.type)))];
const allCountries = ["All", ...Array.from(new Set(properties.map((p) => p.country)))];

const stats = [
  {
    label: "Total Portfolio Value",
    value: "$20,910,000",
    icon: <DollarSign className="w-7 h-7 text-blue-700" />,
    bg: "from-blue-100 via-blue-200 to-blue-300",
  },
  {
    label: "Average ROI",
    value: "8.0%",
    icon: <TrendingUp className="w-7 h-7 text-emerald-700" />,
    bg: "from-emerald-100 via-emerald-200 to-emerald-400",
  },
  {
    label: "Total Occupancy",
    value: "97%",
    icon: <Home className="w-7 h-7 text-yellow-600" />,
    bg: "from-yellow-100 via-yellow-200 to-yellow-300",
  },
  {
    label: "Active Properties",
    value: "12",
    icon: <BadgeCheck className="w-7 h-7 text-fuchsia-700" />,
    bg: "from-fuchsia-100 via-fuchsia-200 to-fuchsia-300",
  },
];

const pieTypeData = {
  labels: Array.from(new Set(properties.map((p) => p.type))),
  datasets: [
    {
      data: [
        properties.filter((p) => p.type === "Residential").length,
        properties.filter((p) => p.type === "Commercial").length,
        properties.filter((p) => p.type === "Retail").length,
        properties.filter((p) => p.type === "Industrial").length,
      ],
      backgroundColor: ["#059669", "#0ea5e9", "#eab308", "#a21caf"],
      borderWidth: 2,
      borderColor: "#fff",
    },
  ],
};

const doughnutCountryData = {
  labels: Array.from(new Set(properties.map((p) => p.country))),
  datasets: [
    {
      data: allCountries
        .slice(1)
        .map((country) =>
          properties
            .filter((p) => p.country === country)
            .reduce((acc, curr) => acc + curr.value, 0)
        ),
      backgroundColor: [
        "#0ea5e9",
        "#059669",
        "#eab308",
        "#a21caf",
        "#fbbf24",
        "#f43f5e",
        "#8b5cf6",
        "#14b8a6",
        "#f59e42",
        "#7e22ce",
      ],
      borderWidth: 2,
      borderColor: "#fff",
    },
  ],
};

const barRentData = {
  labels: allCountries.slice(1),
  datasets: [
    {
      label: "Annual Rent ($)",
      data: allCountries
        .slice(1)
        .map((country) =>
          properties
            .filter((p) => p.country === country)
            .reduce((acc, curr) => acc + curr.annualRent, 0)
        ),
      backgroundColor: "#0ea5e9",
      borderRadius: 8,
    },
  ],
};

const lineValueData = {
  labels: [
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "Now",
  ],
  datasets: [
    {
      label: "Portfolio Value ($M)",
      data: [4.2, 6.1, 8.8, 11.2, 13.4, 15.8, 17.4, 19.6, 20.9],
      borderColor: "#059669",
      backgroundColor: "rgba(16,185,129,0.13)",
      fill: true,
      tension: 0.32,
    },
  ],
};

function statusBadge(status: string) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
        status === "Active"
          ? "bg-emerald-100 text-emerald-800"
          : "bg-yellow-100 text-yellow-800"
      }`}
    >
      <BadgeCheck className="w-4 h-4 mr-1" /> {status}
    </span>
  );
}

export default function InvestmentPropertiesPage() {
  const [typeFilter, setTypeFilter] = useState("All");
  const [countryFilter, setCountryFilter] = useState("All");

  const filteredProperties = useMemo(() => {
    return properties.filter(
      (p) =>
        (typeFilter === "All" || p.type === typeFilter) &&
        (countryFilter === "All" || p.country === countryFilter)
    );
  }, [typeFilter, countryFilter]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 w-full">
      {/* 1. Floating stats bar */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 170, delay: 0.1 }}
        className="flex flex-wrap justify-center gap-6 mb-7 sticky top-4 z-20"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ scale: 0.95, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.32, delay: 0.12 }}
            className={`min-w-[210px] flex flex-col items-center rounded-2xl bg-gradient-to-br ${stat.bg} px-6 py-4 shadow-xl border-0 backdrop-blur-md`}
            style={{ backdropFilter: "blur(10px)" }}
          >
            <div className="mb-2">{stat.icon}</div>
            <span className="font-extrabold text-2xl text-emerald-900 mb-1">{stat.value}</span>
            <span className="text-md text-gray-700">{stat.label}</span>
          </motion.div>
        ))}
      </motion.section>

      {/* 2. Header/Intro */}
      <section className="mb-6">
        <h1 className="text-2xl md:text-3xl font-black text-emerald-800 mb-2 tracking-tight">
          Investment Properties Portfolio
        </h1>
        <p className="text-gray-700 text-base md:text-lg max-w-3xl">
          Explore Eleganza Bank’s <span className="text-blue-700 font-semibold">global portfolio</span> of income-generating properties. Instantly filter by region or type, and monitor value, returns, occupancy, and more. Each property is selected for yield, stability, and geographic diversification.
        </p>
      </section>

      {/* 3. Filter Bar */}
      <section className="flex flex-wrap gap-4 items-center mb-8">
        <div className="flex gap-2 items-center">
          <Filter className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-sm text-gray-800">Filter:</span>
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-xl border px-3 py-1 text-sm bg-white focus:ring-2 focus:ring-emerald-400"
        >
          {allTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
        <select
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          className="rounded-xl border px-3 py-1 text-sm bg-white focus:ring-2 focus:ring-blue-400"
        >
          {allCountries.map((country) => (
            <option key={country}>{country}</option>
          ))}
        </select>
        <span className="ml-3 text-xs text-gray-500">
          Showing <b>{filteredProperties.length}</b> of <b>{properties.length}</b>
        </span>
      </section>

      {/* 4. Cards Grid */}
      <section
        className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
        aria-label="Investment properties grid"
      >
        {filteredProperties.length === 0 ? (
          <div className="text-gray-500 col-span-full py-12 text-center">
            No properties found for selected filter.
          </div>
        ) : (
          filteredProperties.map((p) => (
            <motion.div
              key={p.code}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: 0.08 }}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl border-2 border-emerald-50 overflow-hidden flex flex-col transition-all"
            >
              <div className="relative w-full h-44 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2">{statusBadge(p.status)}</div>
                <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-0.5 rounded-xl flex items-center gap-1 text-xs font-bold text-emerald-700 shadow">
                  <DollarSign className="w-4 h-4" /> ${p.value.toLocaleString()}
                </div>
              </div>
              <div className="flex flex-col flex-1 p-4">
                <h2 className="font-bold text-lg mb-1 text-blue-900">{p.name}</h2>
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                  <MapPin className="w-4 h-4" /> {p.location}
                </div>
                <div className="flex items-center gap-2 text-xs mb-2 text-gray-600">
                  <span className="flex items-center gap-1">
                    {p.type === "Residential" && <Home className="w-4 h-4" />}
                    {p.type === "Commercial" && <Building2 className="w-4 h-4" />}
                    {p.type === "Retail" && <TrendingUp className="w-4 h-4" />}
                    {p.type === "Industrial" && <TrendingDown className="w-4 h-4" />}
                    {p.type}
                  </span>
                  <span>• Year {p.year}</span>
                  <span>• <b>{p.occupancy}% occupancy</b></span>
                </div>
                <div className="flex flex-wrap gap-3 text-xs mb-3">
                  <span className="bg-blue-50 text-blue-800 rounded px-2 py-0.5 font-semibold">
                    ROI: {p.roi}%
                  </span>
                  <span className="bg-yellow-50 text-yellow-800 rounded px-2 py-0.5 font-semibold">
                    Rent/yr: ${p.annualRent.toLocaleString()}
                  </span>
                  <span className="bg-emerald-50 text-emerald-700 rounded px-2 py-0.5 font-semibold">
                    Code: {p.code}
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </section>

      {/* 5. Graphs & Analytics */}
      <section className="mt-14 mb-8 grid lg:grid-cols-4 md:grid-cols-2 gap-7">
        <div className="bg-white rounded-3xl shadow-lg p-5 flex flex-col items-center">
          <h3 className="font-bold text-blue-700 text-md mb-3">Property Type Distribution</h3>
          <Pie data={pieTypeData} height={180} options={{
            plugins: { legend: { position: "bottom" as const } }
          }} />
        </div>
        <div className="bg-white rounded-3xl shadow-lg p-5 flex flex-col items-center">
          <h3 className="font-bold text-blue-700 text-md mb-3">Value by Country</h3>
          <Doughnut data={doughnutCountryData} height={180} options={{
            plugins: { legend: { position: "bottom" as const } }
          }} />
        </div>
        <div className="bg-white rounded-3xl shadow-lg p-5 flex flex-col items-center">
          <h3 className="font-bold text-blue-700 text-md mb-3">Annual Rent by Country</h3>
          <Bar data={barRentData} height={180} options={{
            plugins: { legend: { display: false } },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function (
                    this: Scale<CoreScaleOptions>,
                    tickValue: string | number
                  ) {
                    const n =
                      typeof tickValue === "number"
                        ? tickValue
                        : Number(tickValue);
                    return "$" + n.toLocaleString();
                  },
                },
                grid: { color: "#f1f5f9" },
              },
              x: { grid: { color: "#f1f5f9" } },
            },
          }} />
        </div>
        <div className="bg-white rounded-3xl shadow-lg p-5 flex flex-col items-center">
          <h3 className="font-bold text-blue-700 text-md mb-3">Portfolio Value Growth</h3>
          <Line data={lineValueData} height={180} options={{
            plugins: { legend: { display: false } },
            scales: {
              y: {
                beginAtZero: false,
                min: 3,
                max: 23,
                ticks: {
                  callback: function (
                    this: Scale<CoreScaleOptions>,
                    tickValue: string | number
                  ) {
                    const n =
                      typeof tickValue === "number"
                        ? tickValue
                        : Number(tickValue);
                    return "$" + n + "M";
                  },
                },
                grid: { color: "#f1f5f9" },
              },
              x: { grid: { color: "#f1f5f9" } },
            },
          }} />
        </div>
      </section>

      {/* 6. Floating information card */}
      <motion.section
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.48 }}
        className="max-w-3xl mx-auto mb-12"
      >
        <div className="bg-gradient-to-br from-blue-50 via-emerald-50 to-yellow-50 shadow-xl rounded-2xl p-7 flex gap-4 items-start">
          <Globe className="w-12 h-12 text-emerald-700 mt-1" />
          <div>
            <div className="font-bold text-blue-800 text-lg mb-1">
              Why Global Property Diversification?
            </div>
            <div className="text-gray-700 text-sm leading-relaxed mb-2">
              By investing across continents, asset types, and economies, Eleganza Bank provides stable returns, lowers risk, and hedges currency exposure for its investors.  
              <span className="text-emerald-700 font-semibold"> Our admin portal enables real-time insights into every region and property for smart, quick decisions.</span>
            </div>
            <div className="text-xs text-gray-500">
              For detailed asset analytics, admin can click any property for a full breakdown, valuation trends, and tenancy reports.
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
