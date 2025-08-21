"use client";

import { useAtomValue } from "jotai";
import { FilePlus2 } from "lucide-react";
import { productionChartDataAtom } from "@/lib/atoms";
import type { ProductionMetric } from "@/types/types";
import ChartTitle from "../../components/chart-title";
import Chart from "./chart";
import { DatePickerWithRange } from "./components/date-range-picker";
import MetricCard from "./components/metric-card";

const calMetricCardValue = (
  data: ProductionMetric[],
  type: "Real" | "Planejada",
) => {
  const filteredData = data.filter((item) => item.type === type);
  return Math.round(
    filteredData.reduce((acc, curr) => acc + curr.count, 0) /
      filteredData.length,
  );
};

export default function AverageTicketsCreated() {
  const ticketChartData = useAtomValue(productionChartDataAtom);
  const avgCreated = calMetricCardValue(ticketChartData, "Real");
  const avgResolved = calMetricCardValue(ticketChartData, "Planejada");

  return (
    <section className="flex h-full flex-col gap-2">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <ChartTitle title="Produção Planejada vs Produção Real" icon={FilePlus2} />
        <DatePickerWithRange className="" />
      </div>
      <div className="flex flex-wrap">
        <div className="my-4 flex w-52 shrink-0 flex-col justify-center gap-6">
          <MetricCard
            title="Média produzida por dia"
            value={avgCreated}
            color="#3498db"
          />
          <MetricCard
            title="Média de produção planejada por dia"
            value={avgResolved}
            color="#2ecc71"
          />
        </div>
        <div className="relative h-96 min-w-[320px] flex-1">
          <Chart />
        </div>
      </div>
    </section>
  );
}
