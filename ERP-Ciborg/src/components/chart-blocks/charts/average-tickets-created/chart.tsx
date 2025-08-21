"use client";

import { useAtomValue } from "jotai";
import { VChart } from "@visactor/react-vchart";
import type { IBarChartSpec } from "@visactor/vchart";
import { productionChartDataAtom } from "@/lib/atoms";
import type { ProductionMetric } from "@/types/types";

interface ChartDatum {
  date?: string;
  count?: number;
  type?: string;
  periodo?: string;
}

const generateSpec = (data: ProductionMetric[]): IBarChartSpec => ({
  type: "bar",
  color: ["#2ecc71", "#3498db"],
  data: [
    {
      id: "barData",
      values: data,
    },
  ],
  xField: "date",
  yField: "count",
  seriesField: "type",
  padding: [10, 0, 10, 0],
  legends: {
    visible: true,
  },
  stack: false,
  
  bar: {
    state: {
      hover: {
        outerBorder: {
          distance: 2,
          lineWidth: 2,
        },
      },
    },
    style: {
      cornerRadius: [12, 12, 12, 12],
      zIndex: (datum: ChartDatum | undefined) => {
        return datum?.type === "real" ? 2 : 1;
      },
    },
  },
});

export default function Chart() {
  const ticketChartData = useAtomValue(productionChartDataAtom);
  const spec = generateSpec(ticketChartData);
  return <VChart spec={spec} />;
}