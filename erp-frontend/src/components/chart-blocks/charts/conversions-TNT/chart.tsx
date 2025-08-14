"use client";

import { VChart } from "@visactor/react-vchart";
import type { ICirclePackingChartSpec } from "@visactor/vchart";
import { convertions_TNT } from "@/data/convertions";
import { addThousandsSeparator } from "@/lib/utils";

const spec: ICirclePackingChartSpec = {
  data: [
    {
      id: "data",
      values: convertions_TNT,
    },
  ],
  type: "circlePacking",
  categoryField: "name",
  valueField: "value",
  drill: true,
  padding: 0,
  layoutPadding: 5,
  label: {
    style: {
      fill: "white",
      stroke: false,
      visible: true,       // mostra em todos os círculos
      text: (d) => d.name, // exibe só o nome
      fontSize: (d) => {
        const baseSize = d.radius / 2;
        return Math.max(10, Math.min(baseSize, 24)); 
        // mínimo 10px, máximo 24px
      },
      dy: (d) => d.radius / 8,
    },
  },
  legends: [
    {
      visible: true,
      orient: "top",
      position: "start",
      padding: 0,
    },
  ],
  tooltip: {
    trigger: ["click", "hover"],
    mark: {
      content: {
        value: (d) => addThousandsSeparator(d?.value),
      },
    },
  },
  animationEnter: {
    easing: "cubicInOut",
  },
  animationExit: {
    easing: "cubicInOut",
  },
  animationUpdate: {
    easing: "cubicInOut",
  },
};

export default function Chart() {
  return <VChart spec={spec} />;
}
