// src/lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL; // URL do Django no Railway

export type ProdutosVendidos = {
  produtoA: number;
  produtoB: number;
  produtoC: number;
  produtoD: number;
};

export type RelatorioProducao = {
  data: string;
  horas_trabalhadas: number;
  meta_producao: number;
  producao_planejada: number;
  produto_a_producao: number;
  produto_b_producao: number;
  produto_c_producao: number;
  produto_d_producao: number;
  produtosVendidos: ProdutosVendidos;
  produtos_despachados: number;
  veiculo_entrega: string;
  observacoes: string;
};

// Buscar todos os relatórios
export async function getRelatorios() {
  const res = await fetch(`${API_BASE}/api/relatorio-producao/list/`);
  if (!res.ok) throw new Error("Erro ao buscar relatórios");
  return res.json();
}

// Criar um novo relatório
export async function createRelatorio(data: RelatorioProducao) {
  const res = await fetch(`${API_BASE}/api/relatorio-producao/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erro ao criar relatório");
  }

  return res.json();
}
