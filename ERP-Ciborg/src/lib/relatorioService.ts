// src/lib/relatorioService.ts
import { getRelatorios, createRelatorio, RelatorioProducao } from '@/lib/api';

// Criar um novo relatório
export async function criarRelatorio(relatorio: RelatorioProducao) {
  try {
    const data = await createRelatorio(relatorio);
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao criar relatório');
  }
}

// Listar todos os relatórios
export async function listarRelatorios() {
  try {
    const data = await getRelatorios();
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao buscar relatórios');
  }
}
