// src/lib/api.ts
import type { RelatorioProducao } from '@/types/relatorio';

// Interface para as métricas retornadas pela API
interface RelatorioMetrics {
  total_relatorios?: number;
  producao_total?: number;
  media_atingimento_meta?: number;
  media_atingimento_planejado?: number;
  produtividade_media?: number;
  [key: string]: number | undefined; // Para métricas adicionais que possam existir
}

export async function getRelatorios(): Promise<{ data: RelatorioProducao[]; metrics: RelatorioMetrics }> {
  const response = await fetch('http://127.0.0.1:8000/api/relatorio-producao/list/');
  if (!response.ok) throw new Error('Erro ao buscar relatórios');
  return response.json();
}

export async function createRelatorio(relatorio: RelatorioProducao): Promise<RelatorioProducao> {
  const response = await fetch('http://127.0.0.1:8000/api/relatorio-producao/create/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(relatorio),
  });
  if (!response.ok) throw new Error('Erro ao criar relatório');
  return response.json();
}