// src/lib/relatorios.ts
import { getRelatorios, createRelatorio, RelatorioProducao } from '@/lib/api';

// Buscar todos os relatórios
export const fetchRelatorios = async (): Promise<{ data: RelatorioProducao[]; metrics: any }> => {
  try {
    const data = await getRelatorios();
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao buscar relatórios');
  }
};

// Criar um novo relatório
export const criarRelatorio = async (relatorio: RelatorioProducao): Promise<any> => {
  try {
    const data = await createRelatorio(relatorio);
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao criar relatório');
  }
};
