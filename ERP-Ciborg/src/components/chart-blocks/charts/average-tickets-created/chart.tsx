"use client";

import { useAtomValue } from "jotai";
import { VChart } from "@visactor/react-vchart";
import type { IBarChartSpec } from "@visactor/vchart";
import { productionChartDataAtom } from "@/lib/atoms";
import type { ProductionMetric } from "@/types/types";

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
  tooltip: {
    trigger: ["click", "hover"],
    mark: {
      title: {
        value: (datum) => `Período: ${datum ? (datum as any).periodo || 'N/A' : 'N/A'}`,
      },
      content: [
        {
          value: (datum) => {
            if (!datum) return 'Valor: Não disponível';
            const safeDatum = datum as { count?: number; type?: string };
            return `Quantidade: ${safeDatum?.count ?? 0}`;
          },
        },
        {
          value: (datum) => {
            if (!datum) return 'Tipo: Não disponível';
            const safeDatum = datum as { type?: string };
            return `Tipo: ${safeDatum?.type || 'N/A'}`;
          },
        },
      ],
    },
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
        const safeDatum = datum as { type?: string };
        return safeDatum?.type === "real" ? 2 : 1;
      },
    },
  },
});

export default function Chart() {
  const ticketChartData = useAtomValue(productionChartDataAtom);
  const spec = generateSpec(ticketChartData);
  return <VChart spec={spec} />;
}