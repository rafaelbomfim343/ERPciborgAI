"use client";

import { useAtomValue } from "jotai";
import { VChart } from "@visactor/react-vchart";
import type { IBarChartSpec } from "@visactor/vchart";
import { productionChartDataAtom } from "@/lib/atoms";
import type { productionMetric} from "@/types/types";

const generateSpec = (data: productionMetric[]): IBarChartSpec => ({
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
  tooltip: {
    trigger: ["click", "hover"],
  },
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
      zIndex: (datum) => {
        return datum.type === "real" ? 2 : 1;
      },
    },
  },
});

export default function Chart() {
  const ticketChartData = useAtomValue(productionChartDataAtom);
  const spec = generateSpec(ticketChartData);
  return <VChart spec={spec} />;
}
