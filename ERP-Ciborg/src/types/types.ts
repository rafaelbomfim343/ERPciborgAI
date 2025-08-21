import type { SVGProps } from "react";

// Props para ícones SVG
export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// Estrutura de relatório individual
export type RelatorioProducao = {
  id?: number;
  data: string;
  horas_trabalhadas: number;
  meta_producao: number;
  producao_planejada: number;

  produto_a_producao: number;
  produto_b_producao: number;
  produto_c_producao: number;
  produto_d_producao: number;

  produtosVendidos: {
    produtoA: number;
    produtoB: number;
    produtoC: number;
    produtoD: number;
  };

  produtos_despachados: number;
  veiculo_entrega?: string;
  observacoes?: string;

  total_producao: number;
  total_vendas: number;
  produtividade: number;
  atingimento_meta: number;
  atingimento_planejado: number;
};

// Métricas consolidadas retornadas pelo backend
export type RelatorioMetrics = {
  totalRelatorios: number;
  producaoTotal: number;
  vendasTotal: number;
  mediaAtingimentoMeta: number;
  mediaAtingimentoPlanejado: number;
  vendasPorProduto: {
    produtoA: number;
    produtoB: number;
    produtoC: number;
    produtoD: number;
  };
};

// Tipo para gráficos de produção (opcional)
export type ProductionMetric = {
  date: string;
  type: "Real" | "Planejada";
  count: number;
  
};
