export interface MetricConfig {
  value: string;
  change: number;
  unit?: string;
  comparisonText?: string;
  invertedLogic?: boolean;
}

export const metricConfig: Record<string, MetricConfig> = {
  "Meta de produção": {
    value: "1200",
    change: 0.08,
    unit: "un",
    comparisonText: " meta prevista"
  },
  "Produção Real": {
    value: "1150", 
    change: -0.13,
    unit: "un",
    comparisonText: "ligeiramente abaixo do planejado"
  },
  "Produção Planejada": {
    value: "1300",
    change: 0.08,
    unit: "un",
    comparisonText: "acima da meta"
  },
  "Custos Operacionais": {
    value: "45000",
    change: -0.12,
    unit: "R$",
    comparisonText: "redução significativa",
    invertedLogic: true
  },
  "Qualidade": {
    value: "98.5",
    change: 0.02,
    unit: "%",
    comparisonText: "melhoria contínua"
  },
  "Horas de Trabalho": {
    value: "360",
    change: -0.08,
    unit: "horas",
    comparisonText: "tempo otimizado",
    invertedLogic: true
  }
};