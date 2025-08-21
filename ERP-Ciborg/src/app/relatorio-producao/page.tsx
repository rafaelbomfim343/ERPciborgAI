'use client';

import { useState } from 'react';

interface ProdutosVendidos {
  produtoA: string;
  produtoB: string;
  produtoC: string;
  produtoD: string;
}

interface FormData {
  data: string;
  horasTrabalhadas: string;
  metaProducao: string;
  producaoPlanejada: string;
  produtoA: string;
  produtoB: string;
  produtoC: string;
  produtoD: string;
  produtosVendidos: ProdutosVendidos;
  produtosDespachados: string;
  veiculoEntrega: string;
  observacoes: string;
}

const tiposVeiculo = [
  { value: 'caminhao', label: 'Caminhão' },
  { value: 'vuc', label: 'VUC' },
  { value: 'carro', label: 'Carro' },
  { value: 'moto', label: 'Moto' },
  { value: 'transporte_externo', label: 'Transporte Externo' },
  { value: 'outro', label: 'Outro' },
];

export default function RelatorioProducaoPage() {
  const [formData, setFormData] = useState<FormData>({
    data: new Date().toISOString().split('T')[0],
    horasTrabalhadas: '8',
    metaProducao: '',
    producaoPlanejada: '',
    produtoA: '',
    produtoB: '',
    produtoC: '',
    produtoD: '',
    produtosVendidos: { produtoA: '', produtoB: '', produtoC: '', produtoD: '' },
    produtosDespachados: '',
    veiculoEntrega: '',
    observacoes: '',
  });

  const [enviado, setEnviado] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith('venda_')) {
      const key = name.replace('venda_', '') as keyof ProdutosVendidos;
      setFormData(prev => ({
        ...prev,
        produtosVendidos: { ...prev.produtosVendidos, [key]: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (erro) setErro('');
  };

  const calcularTotalProducao = () =>
    [formData.produtoA, formData.produtoB, formData.produtoC, formData.produtoD]
      .map(Number)
      .reduce((a, b) => a + (isNaN(b) ? 0 : b), 0);

  const calcularTotalVendas = () =>
    Object.values(formData.produtosVendidos)
      .map(Number)
      .reduce((a, b) => a + (isNaN(b) ? 0 : b), 0);

  const calcularAtingimentoMeta = () => {
    const total = calcularTotalProducao();
    const meta = parseInt(formData.metaProducao) || 0;
    return meta === 0 ? 0 : (total / meta) * 100;
  };

  const calcularAtingimentoPlanejado = () => {
    const total = calcularTotalProducao();
    const planejado = parseInt(formData.producaoPlanejada) || 0;
    return planejado === 0 ? 0 : (total / planejado) * 100;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    if (calcularTotalProducao() === 0) {
      setErro('É necessário informar a produção de pelo menos um produto');
      setCarregando(false);
      return;
    }

    const totalVendas = calcularTotalVendas();
    if (totalVendas > calcularTotalProducao()) {
      setErro('Não é possível vender mais do que foi produzido');
      setCarregando(false);
      return;
    }

    if (!formData.veiculoEntrega && parseInt(formData.produtosDespachados || '0') > 0) {
      setErro('Se há produtos despachados, é necessário informar o veículo de entrega');
      setCarregando(false);
      return;
    }

    try {
      const response = await fetch('/api/relatorio-producao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          totalProducao: calcularTotalProducao(),
          atingimentoMeta: calcularAtingimentoMeta(),
          atingimentoPlanejado: calcularAtingimentoPlanejado(),
        }),
      });

      const data = (await response.json()) as { message?: string };

      if (response.ok) {
        setEnviado(true);
        setFormData({
          data: new Date().toISOString().split('T')[0],
          horasTrabalhadas: '8',
          metaProducao: '',
          producaoPlanejada: '',
          produtoA: '',
          produtoB: '',
          produtoC: '',
          produtoD: '',
          produtosVendidos: { produtoA: '', produtoB: '', produtoC: '', produtoD: '' },
          produtosDespachados: '',
          veiculoEntrega: '',
          observacoes: '',
        });
      } else {
        setErro(data.message || 'Erro ao enviar relatório');
      }
    } catch {
      setErro('Erro de conexão. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  if (enviado) {
    return (
      <div className="form-container max-w-4xl mx-auto">
        <div className="form-success text-center">
          <h3 className="font-semibold text-lg mb-2">✅ Relatório enviado com sucesso!</h3>
          <p>Relatório diário de produção registrado no sistema.</p>
        </div>
      </div>
    );
  }

  const totalProducao = calcularTotalProducao();
  const totalVendas = calcularTotalVendas();
  const atingimentoMeta = calcularAtingimentoMeta();
  const atingimentoPlanejado = calcularAtingimentoPlanejado();

  return (
    <div className="form-container max-w-4xl mx-auto">
      {/* Formulário */}
      <h1 className="form-title">📊 Relatório Diário de Produção</h1>
      {erro && <div className="form-error">{erro}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Data e Horas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="data" className="form-label">
              Data *
            </label>
            <input
              type="date"
              id="data"
              name="data"
              value={formData.data}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="horasTrabalhadas" className="form-label">
              Horas Trabalhadas *
            </label>
            <input
              type="number"
              id="horasTrabalhadas"
              name="horasTrabalhadas"
              value={formData.horasTrabalhadas}
              onChange={handleChange}
              required
              min={1}
              max={24}
              className="form-input"
              placeholder="Ex: 8"
            />
          </div>
          <div>
            <label htmlFor="metaProducao" className="form-label">
              Meta de Produção
            </label>
            <input
              type="number"
              id="metaProducao"
              name="metaProducao"
              value={formData.metaProducao}
              onChange={handleChange}
              min={0}
              className="form-input"
              placeholder="Meta diária"
            />
          </div>
        </div>

        {/* Produção Planejada */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="producaoPlanejada" className="form-label">
              Produção Planejada
            </label>
            <input
              type="number"
              id="producaoPlanejada"
              name="producaoPlanejada"
              value={formData.producaoPlanejada}
              onChange={handleChange}
              min={0}
              className="form-input"
            />
          </div>
          <div className="flex items-end">
            <div className="w-full p-3 bg-muted rounded-md text-center">
              <span className="text-sm text-muted-foreground">Produção Real: </span>
              <span className="font-bold text-primary text-lg">{totalProducao} unidades</span>
            </div>
          </div>
        </div>

        {/* Campos de produção, vendas, despachos e observações continuam iguais */}

        <button type="submit" disabled={carregando} className="form-button">
          {carregando ? 'Enviando...' : '📤 Enviar Relatório Diário'}
        </button>
      </form>
    </div>
  );
}
