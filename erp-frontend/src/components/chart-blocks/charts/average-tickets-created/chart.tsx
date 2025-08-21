"use client";

import { VChart } from "@visactor/react-vchart";
import type { IBarChartSpec } from "@visactor/vchart";

// Dados de exemplo para produção planejada vs real
const productionData = [
  { periodo: "Jan", planejada: 1200, real: 1150 },
  { periodo: "Fev", planejada: 1350, real: 1420 },
  { periodo: "Mar", planejada: 1100, real: 1080 },
  { periodo: "Abr", planejada: 1500, real: 1450 },
  { periodo: "Mai", planejada: 1600, real: 1620 },
  { periodo: "Jun", planejada: 1400, real: 1380 },
];

const generateSpec = (data: typeof productionData): IBarChartSpec => ({
  type: "bar",
  data: [
    {
      id: "productionData",
      values: data,
    },
  ],
  xField: "periodo",
  yField: ["planejada", "real"],
  seriesField: "category",
  padding: [20, 10, 50, 60], // [top, right, bottom, left]
  legends: {
    visible: true,
    position: "middle",
    orient: "bottom",
    padding: [20, 0, 0, 0], // [top, right, bottom, left]
    item: {
      shape: {
        style: {
          symbolType: "square",
        },
      },
    },
  },
  tooltip: {
    trigger: ["click", "hover"],
    mark: {
      title: {
        value: (datum) => `Período: ${datum.periodo}`,
      },
      content: [
        {
          key: (datum) => "Produção Planejada",
          value: (datum) => `${datum.planejada} unidades`,
        },
        {
          key: (datum) => "Produção Real",
          value: (datum) => `${datum.real} unidades`,
        },
        {
          key: () => "Diferença",
          value: (datum) => `${datum.real - datum.planejada} unidades`,
        },
      ],
    },
  },
  axes: [
    {
      orient: "left",
      title: {
        visible: true,
        text: "Quantidade Produzida",
        style: { fontSize: 14, fontWeight: "bold" },
      },
      label: {
        format: (value) => `${value} un`,
      },
    },
    {
      orient: "bottom",
      title: {
        visible: true,
        text: "Período",
        style: { fontSize: 14, fontWeight: "bold" },
      },
    },
  ],
  bar: {
    state: {
      hover: {
        stroke: "#000",
        lineWidth: 1,
        outerBorder: {
          distance: 2,
          lineWidth: 2,
        },
      },
    },
    style: {
      cornerRadius: [6, 6, 0, 0],
    },
  },
  color: ["#3498db", "#2ecc71"], // Azul para planejada, Verde para real
  dataToSeries: [
    {
      dataKey: "planejada",
      seriesName: "Produção Planejada",
      stack: false,
    },
    {
      dataKey: "real",
      seriesName: "Produção Real",
      stack: false,
    },
  ],
});

export default function ProductionChart() {
  const spec = generateSpec(productionData);
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <VChart spec={spec} />
    </div>
  );
}