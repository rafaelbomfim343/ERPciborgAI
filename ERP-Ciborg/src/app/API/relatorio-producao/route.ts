// src/app/api/relatorio-producao/route.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

interface RelatorioProducao {
  data: string;
  horasTrabalhadas: string;
  metaProducao: string;
  producaoPlanejada: string;
  produtoA: string;
  produtoB: string;
  produtoC: string;
  produtoD: string;
  produtosVendidos: string;
  produtosDespachados: string;
  veiculoEntrega: string;
  observacoes: string;
  totalProducao: number;
  atingimentoMeta: number;
  atingimentoPlanejado: number;
}

interface StoredRelatorioProducao extends RelatorioProducao {
  timestamp: string;
}

const relatorios: StoredRelatorioProducao[] = [];

export async function POST(request: NextRequest) {
  try {
    const relatorio: RelatorioProducao = await request.json();

    if (!relatorio.data) {
      return NextResponse.json({ message: 'Data é obrigatória' }, { status: 400 });
    }

    if (!relatorio.horasTrabalhadas || parseInt(relatorio.horasTrabalhadas) <= 0) {
      return NextResponse.json({ message: 'Horas trabalhadas devem ser maiores que zero' }, { status: 400 });
    }

    if (relatorio.totalProducao === 0) {
      return NextResponse.json({ message: 'É necessário informar a produção de pelo menos um produto' }, { status: 400 });
    }

    const relatorioExistente = relatorios.find(r => r.data === relatorio.data);
    if (relatorioExistente) {
      return NextResponse.json({ message: 'Já existe um relatório para esta data' }, { status: 400 });
    }

    const storedRelatorio: StoredRelatorioProducao = { ...relatorio, timestamp: new Date().toISOString() };
    relatorios.push(storedRelatorio);

    const metrics = {
      produtividade: relatorio.totalProducao / parseInt(relatorio.horasTrabalhadas),
      eficienciaMeta: relatorio.atingimentoMeta,
      eficienciaPlanejamento: relatorio.atingimentoPlanejado,
    };

    // Log apenas em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.log('Relatório salvo:', storedRelatorio);
    }

    return NextResponse.json(
      { success: true, message: 'Relatório salvo com sucesso!', data: storedRelatorio, metrics },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro ao processar relatório:', error);
    }
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function GET() {
  const metrics = {
    totalRelatorios: relatorios.length,
    producaoTotal: relatorios.reduce((sum, r) => sum + r.totalProducao, 0),
    mediaAtingimentoMeta:
      relatorios.length > 0 ? relatorios.reduce((sum, r) => sum + r.atingimentoMeta, 0) / relatorios.length : 0,
    mediaAtingimentoPlanejado:
      relatorios.length > 0 ? relatorios.reduce((sum, r) => sum + r.atingimentoPlanejado, 0) / relatorios.length : 0,
  };

  return NextResponse.json({ data: relatorios, total: relatorios.length, metrics }, { status: 200 });
}
