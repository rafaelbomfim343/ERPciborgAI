// src/components/chart-blocks/charts/conductivity-chart/chart.tsx
"use client";

import { VChart } from "@visactor/react-vchart";
import type { IBarChartSpec } from "@visactor/vchart";

const conductivityData = [
  { time: "5 min", conductivity: 52, material: "Tetrapak" },
  { time: "10 min", conductivity: 47, material: "Tetrapak" },
  { time: "15 min", conductivity: 44, material: "Tetrapak" },
  { time: "20 min", conductivity: 42, material: "Tetrapak" },

  { time: "5 min", conductivity: 50, material: "Controle" },
  { time: "10 min", conductivity: 45, material: "Controle" },
  { time: "15 min", conductivity: 41, material: "Controle" },
  { time: "20 min", conductivity: 38, material: "Controle" },
];

const generateSpec = (data: typeof conductivityData): IBarChartSpec => ({
  type: "bar",
  data: [
    {
      id: "barData",
      values: data,
    },
  ],
  xField: "time",
  yField: "conductivity",
  seriesField: "material",
  padding: [10, 0, 10, 0],
  legends: {
  visible: true,
  position: "end", // ou "start", "middle"
},
  stack: false,
  tooltip: {
    trigger: ["click", "hover"],
  },
  axes: [
    {
      orient: "left",
      title: {
        text: "°C",
        style: { fontSize: 14, fontWeight: "bold" },
      },
    },
    {
      orient: "bottom",
      title: {
        text: "Tempo (s)",
        style: { fontSize: 14, fontWeight: "bold" },
      },
    },
  ],
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
      cornerRadius: [6, 6, 0, 0],
    },
  },
});

export default function Chart() {
  const spec = generateSpec(conductivityData);
  return <VChart spec={spec} />;
}

