// src/app/api/relatorio-producao/route.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Interface para dados de log
interface LogData {
  [key: string]: string | number | boolean | null | undefined;
}

// Logger simples para diferentes ambientes
const logger = {
  error: (message: string, error?: unknown) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[ERROR] ${message}`, error);
    }
    // Em produção, você pode integrar com serviços como Sentry, LogRocket, etc.
  },
  info: (message: string, data?: LogData) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[INFO] ${message}`, data);
    }
  },
  warn: (message: string, data?: LogData) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[WARN] ${message}`, data);
    }
  }
};

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

interface Metrics {
  produtividade: number;
  eficienciaMeta: number;
  eficienciaPlanejamento: number;
}

interface ApiMetrics {
  totalRelatorios: number;
  producaoTotal: number;
  mediaAtingimentoMeta: number;
  mediaAtingimentoPlanejado: number;
}

const relatorios: StoredRelatorioProducao[] = [];

export async function POST(request: NextRequest) {
  try {
    const relatorio: RelatorioProducao = await request.json();

    logger.info('Recebendo requisição POST para relatório de produção', {
      data: relatorio.data,
      totalProducao: relatorio.totalProducao
    });

    if (!relatorio.data) {
      logger.warn('Tentativa de criar relatório sem data');
      return NextResponse.json({ message: 'Data é obrigatória' }, { status: 400 });
    }

    if (!relatorio.horasTrabalhadas || parseInt(relatorio.horasTrabalhadas) <= 0) {
      logger.warn('Horas trabalhadas inválidas', { horas: relatorio.horasTrabalhadas });
      return NextResponse.json({ message: 'Horas trabalhadas devem ser maiores que zero' }, { status: 400 });
    }

    if (relatorio.totalProducao === 0) {
      logger.warn('Tentativa de criar relatório sem produção', { data: relatorio.data });
      return NextResponse.json({ message: 'É necessário informar a produção de pelo menos um produto' }, { status: 400 });
    }

    const relatorioExistente = relatorios.find(r => r.data === relatorio.data);
    if (relatorioExistente) {
      logger.warn('Tentativa de criar relatório duplicado', { data: relatorio.data });
      return NextResponse.json({ message: 'Já existe um relatório para esta data' }, { status: 400 });
    }

    const storedRelatorio: StoredRelatorioProducao = { ...relatorio, timestamp: new Date().toISOString() };
    relatorios.push(storedRelatorio);

    const metrics: Metrics = {
      produtividade: relatorio.totalProducao / parseInt(relatorio.horasTrabalhadas),
      eficienciaMeta: relatorio.atingimentoMeta,
      eficienciaPlanejamento: relatorio.atingimentoPlanejado,
    };

    logger.info('Relatório salvo com sucesso', {
      data: relatorio.data,
      totalProducao: relatorio.totalProducao,
      timestamp: storedRelatorio.timestamp
    });

    return NextResponse.json(
      { success: true, message: 'Relatório salvo com sucesso!', data: storedRelatorio, metrics },
      { status: 200 }
    );
  } catch (error) {
    logger.error('Erro ao processar relatório de produção', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function GET() {
  try {
    logger.info('Recebendo requisição GET para listar relatórios', {
      totalRelatorios: relatorios.length
    });

    const metrics: ApiMetrics = {
      totalRelatorios: relatorios.length,
      producaoTotal: relatorios.reduce((sum, r) => sum + r.totalProducao, 0),
      mediaAtingimentoMeta:
        relatorios.length > 0 ? relatorios.reduce((sum, r) => sum + r.atingimentoMeta, 0) / relatorios.length : 0,
      mediaAtingimentoPlanejado:
        relatorios.length > 0 ? relatorios.reduce((sum, r) => sum + r.atingimentoPlanejado, 0) / relatorios.length : 0,
    };

    return NextResponse.json({ data: relatorios, total: relatorios.length, metrics }, { status: 200 });
  } catch (error) {
    logger.error('Erro ao buscar relatórios', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}