// src/components/chart-blocks/charts/conductivity-chart/index.tsx
"use client";

import { useMemo } from "react";
import { Thermometer } from "lucide-react";
import ChartTitle from "../../components/chart-title";
import Chart from "./chart";
import MetricCard from "./components/metric-card";

// Dados de condutividade térmica (Alumínio e Controle)
const conductivityData = [
  { time: "t1", conductivity: 53, material: "Real" },
  { time: "t2", conductivity: 48, material: "Real" },
  { time: "t3", conductivity: 45, material: "Real" },
  { time: "t4", conductivity: 42, material: "Alumínio" },

  { time: "t1", conductivity: 50, material: "Controle" },
  { time: "t2", conductivity: 45, material: "Controle" },
  { time: "t3", conductivity: 41, material: "Controle" },
  { time: "t4", conductivity: 38, material: "Controle" },
];

const calcAverageConductivity = (data: typeof conductivityData, material: string) => {
  const filtered = data.filter((item) => item.material === material);
  return Math.round(filtered.reduce((acc, curr) => acc + curr.conductivity, 0) / filtered.length);
};

export default function ConductivityChartBlock() {
  // Calcula médias só uma vez
  const avgAluminio = useMemo(
    () => calcAverageConductivity(conductivityData, "Planejada"),
    []
  );
  const avgControle = useMemo(
    () => calcAverageConductivity(conductivityData, "Real"),
    []
  );

  return (
    <section className="flex h-full flex-col gap-2">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <ChartTitle
          title="Produção Planejada vs Produção Real"
          icon={Thermometer}
        />
      </div>
      <div className="flex flex-wrap">
        <div className="my-4 flex w-52 shrink-0 flex-col justify-center gap-6">
          <MetricCard
            title="Média — Real"
            value={avgAluminio}
            color="#60C2FB"
          />
          <MetricCard
            title="Média — Planejada"
            value={avgControle}
            color="#3161F8"
          />
        </div>
        <div className="relative h-96 min-w-[320px] flex-1">
          <Chart />
        </div>
      </div>
    </section>
  );
}
