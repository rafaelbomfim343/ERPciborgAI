// src/components/chart-blocks/charts/conductivity-chart/index.tsx
"use client";

import { useMemo } from "react";
import { Thermometer } from "lucide-react";
import ChartTitle from "../../components/chart-title";
import Chart from "./chart";
import MetricCard from "./components/metric-card";

// Dados de condutividade térmica (Isopor e Controle)
const conductivityData = [
  { time: "t1", conductivity: 65, material: "Isopor" },
  { time: "t2", conductivity: 64, material: "Isopor" },
  { time: "t3", conductivity: 60, material: "Isopor" },
  { time: "t4", conductivity: 56, material: "Isopor" },

  { time: "t1", conductivity: 65, material: "Controle" },
  { time: "t2", conductivity: 57, material: "Controle" },
  { time: "t3", conductivity: 47, material: "Controle" },
  { time: "t4", conductivity: 42, material: "Controle" },
];

const calcAverageConductivity = (data: typeof conductivityData, material: string) => {
  const filtered = data.filter((item) => item.material === material);
  return Math.round(filtered.reduce((acc, curr) => acc + curr.conductivity, 0) / filtered.length);
};

export default function ConductivityChartBlock() {
  // Calcula médias só uma vez
  const avgAluminio = useMemo(
    () => calcAverageConductivity(conductivityData, "Isopor"),
    []
  );
  const avgControle = useMemo(
    () => calcAverageConductivity(conductivityData, "Controle"),
    []
  );

  return (
    <section className="flex h-full flex-col gap-2">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <ChartTitle
          title="Condutividade Térmica — Isopor x Controle"
          icon={Thermometer}
        />
      </div>
      <div className="flex flex-wrap">
        <div className="my-4 flex w-52 shrink-0 flex-col justify-center gap-6">
          <MetricCard
            title="Média — Isopor"
            value={avgAluminio}
            color="#60C2FB"
          />
          <MetricCard
            title="Média — Controle"
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
