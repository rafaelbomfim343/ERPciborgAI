// src/types/relatorio.ts
export type ProdutosVendidos = {
  produtoA: number;
  produtoB: number;
  produtoC: number;
  produtoD: number;
};

export type RelatorioProducao = {
  data: string;
  horasTrabalhadas: number;
  metaProducao: number;
  producaoPlanejada: number;
  produtoA: number;
  produtoB: number;
  produtoC: number;
  produtoD: number;
  produtosVendidos: ProdutosVendidos;
  produtosDespachados: number;
  veiculoEntrega: string;
  observacoes: string;
};
