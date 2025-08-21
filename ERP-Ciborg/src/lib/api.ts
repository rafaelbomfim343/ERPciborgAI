// src/lib/api.ts
import type { RelatorioProducao } from '@/types/relatorio';

export async function getRelatorios(): Promise<{ data: RelatorioProducao[]; metrics: any }> {
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
