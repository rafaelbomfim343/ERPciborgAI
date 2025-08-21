// src/lib/relatorios.ts
import { getRelatorios, createRelatorio } from '@/lib/api';
import type { RelatorioProducao } from '@/types/relatorio';

// Defina a estrutura do retorno esperado da API
interface RelatoriosResponse {
  data: RelatorioProducao[];
  metrics: Record<string, number>; // flexível, mas sem any
}

// Buscar todos os relatórios
export const fetchRelatorios = async (): Promise<RelatoriosResponse> => {
  try {
    const data = await getRelatorios();
    return data as RelatoriosResponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Erro ao buscar relatórios');
  }
};

// Criar um novo relatório
export const criarRelatorio = async (
  relatorio: RelatorioProducao
): Promise<RelatorioProducao> => {
  try {
    const data = await createRelatorio(relatorio);
    return data as RelatorioProducao;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Erro ao criar relatório');
  }
};
