import type { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// Tipo original (tickets)
export type TicketMetric = {
  date: string;
  type: "created" | "resolved";
  count: number;
};

// Novo tipo (condutividade térmica)
export type ConductivityMetric = {
  material: "aluminio" | "controle"; // Material medido
  time: number;                      // Tempo em minutos
  value: number;                     // Condutividade térmica
};
