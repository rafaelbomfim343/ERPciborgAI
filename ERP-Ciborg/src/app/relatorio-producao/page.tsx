'use client';

import { useState } from 'react';

interface FormData {
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
}

const tiposVeiculo = [
  { value: 'caminhao', label: 'Caminhão' },
  { value: 'vuc', label: 'VUC' },
  { value: 'carro', label: 'Carro' },
  { value: 'moto', label: 'Moto' },
  { value: 'transporte_externo', label: 'Transporte Externo' },
  { value: 'outro', label: 'Outro' }
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
    produtosVendidos: '',
    produtosDespachados: '',
    veiculoEntrega: '',
    observacoes: ''
  });

  const [enviado, setEnviado] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (erro) setErro('');
  };

  const calcularTotalProducao = () => {
    const a = parseInt(formData.produtoA) || 0;
    const b = parseInt(formData.produtoB) || 0;
    const c = parseInt(formData.produtoC) || 0;
    const d = parseInt(formData.produtoD) || 0;
    return a + b + c + d;
  };

  const calcularAtingimentoMeta = () => {
    const totalProducao = calcularTotalProducao();
    const meta = parseInt(formData.metaProducao) || 0;
    if (meta === 0) return 0;
    return (totalProducao / meta) * 100;
  };

  const calcularAtingimentoPlanejado = () => {
    const totalProducao = calcularTotalProducao();
    const planejado = parseInt(formData.producaoPlanejada) || 0;
    if (planejado === 0) return 0;
    return (totalProducao / planejado) * 100;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    // Validações básicas
    if (calcularTotalProducao() === 0) {
      setErro('É necessário informar a produção de pelo menos um produto');
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          totalProducao: calcularTotalProducao(),
          atingimentoMeta: calcularAtingimentoMeta(),
          atingimentoPlanejado: calcularAtingimentoPlanejado()
        }),
      });

      const data = await response.json();

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
          produtosVendidos: '',
          produtosDespachados: '',
          veiculoEntrega: '',
          observacoes: ''
        });
      } else {
        setErro(data.message || 'Erro ao enviar relatório');
      }
    } catch (error) {
      setErro('Erro de conexão. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  if (enviado) {
    return (
      <div className="form-container max-w-4xl mx-auto">
        <div className="form-success text-center">
          <h3 className="font-semibold text-lg mb-2">
            ✅ Relatório enviado com sucesso!
          </h3>
          <p>Relatório diário de produção registrado no sistema.</p>
        </div>
      </div>
    );
  }

  const totalProducao = calcularTotalProducao();
  const atingimentoMeta = calcularAtingimentoMeta();
  const atingimentoPlanejado = calcularAtingimentoPlanejado();

  return (
    <div className="form-container max-w-4xl mx-auto">
      <h1 className="form-title">
        📊 Relatório Diário de Produção
      </h1>

      {erro && (
        <div className="form-error">
          {erro}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Data e Horas Trabalhadas */}
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
              min="1"
              max="24"
              className="form-input"
              placeholder="Ex: 8"
            />
          </div>

          <div>
            <label htmlFor="metaProducao" className="form-label">
              Meta de Produção (unidades)
            </label>
            <input
              type="number"
              id="metaProducao"
              name="metaProducao"
              value={formData.metaProducao}
              onChange={handleChange}
              min="0"
              className="form-input"
              placeholder="Meta diária"
            />
          </div>
        </div>

        {/* Produção Planejada */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="producaoPlanejada" className="form-label">
              Produção Planejada (unidades)
            </label>
            <input
              type="number"
              id="producaoPlanejada"
              name="producaoPlanejada"
              value={formData.producaoPlanejada}
              onChange={handleChange}
              min="0"
              className="form-input"
              placeholder="Planejamento do dia"
            />
          </div>

          <div className="flex items-end">
            <div className="w-full p-3 bg-muted rounded-md text-center">
              <span className="text-sm text-muted-foreground">Produção Real: </span>
              <span className="font-bold text-primary text-lg">{totalProducao} unidades</span>
            </div>
          </div>
        </div>

        {/* Produção de Produtos */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            🏭 Produção Diária por Produto
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="produtoA" className="form-label">
                Produto A (unidades)
              </label>
              <input
                type="number"
                id="produtoA"
                name="produtoA"
                value={formData.produtoA}
                onChange={handleChange}
                min="0"
                className="form-input"
                placeholder="0"
              />
            </div>

            <div>
              <label htmlFor="produtoB" className="form-label">
                Produto B (unidades)
              </label>
              <input
                type="number"
                id="produtoB"
                name="produtoB"
                value={formData.produtoB}
                onChange={handleChange}
                min="0"
                className="form-input"
                placeholder="0"
              />
            </div>

            <div>
              <label htmlFor="produtoC" className="form-label">
                Produto C (unidades)
              </label>
              <input
                type="number"
                id="produtoC"
                name="produtoC"
                value={formData.produtoC}
                onChange={handleChange}
                min="0"
                className="form-input"
                placeholder="0"
              />
            </div>

            <div>
              <label htmlFor="produtoD" className="form-label">
                Produto D (unidades)
              </label>
              <input
                type="number"
                id="produtoD"
                name="produtoD"
                value={formData.produtoD}
                onChange={handleChange}
                min="0"
                className="form-input"
                placeholder="0"
              />
            </div>
          </div>

          <div className="mt-4 p-3 bg-muted rounded-md">
            <span className="font-semibold">Total Produzido: </span>
            <span className="text-primary font-bold">{totalProducao} unidades</span>
          </div>
        </div>

        {/* Vendas e Despachos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              💰 Vendas
            </h3>
            
            <div>
              <label htmlFor="produtosVendidos" className="form-label">
                Produtos Vendidos (unidades)
              </label>
              <input
                type="number"
                id="produtosVendidos"
                name="produtosVendidos"
                value={formData.produtosVendidos}
                onChange={handleChange}
                min="0"
                max={totalProducao}
                className="form-input"
                placeholder="0"
              />
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              🚚 Despachos
            </h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="produtosDespachados" className="form-label">
                  Produtos Despachados (unidades)
                </label>
                <input
                  type="number"
                  id="produtosDespachados"
                  name="produtosDespachados"
                  value={formData.produtosDespachados}
                  onChange={handleChange}
                  min="0"
                  max={totalProducao}
                  className="form-input"
                  placeholder="0"
                />
              </div>

              <div>
                <label htmlFor="veiculoEntrega" className="form-label">
                  Veículo de Entrega
                </label>
                <select
                  id="veiculoEntrega"
                  name="veiculoEntrega"
                  value={formData.veiculoEntrega}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">Selecione o veículo...</option>
                  {tiposVeiculo.map(veiculo => (
                    <option key={veiculo.value} value={veiculo.value}>
                      {veiculo.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Observações */}
        <div>
          <label htmlFor="observacoes" className="form-label">
            Observações / Anotações
          </label>
          <textarea
            id="observacoes"
            name="observacoes"
            value={formData.observacoes}
            onChange={handleChange}
            rows={3}
            className="form-textarea"
            placeholder="Observações importantes sobre o dia de produção, metas, planejamento, etc."
          />
        </div>

        {/* Resumo e Indicadores */}
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-semibold mb-4 text-foreground">📋 Indicadores de Desempenho</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-primary">{totalProducao}</div>
              <div className="text-sm text-muted-foreground">Total Produzido</div>
            </div>

            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-blue-600">
                {totalProducao > 0 && parseInt(formData.horasTrabalhadas) > 0 
                  ? `${(totalProducao / parseInt(formData.horasTrabalhadas)).toFixed(1)}` 
                  : '0'}
              </div>
              <div className="text-sm text-muted-foreground">unid/hora</div>
            </div>

            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-green-600">
                {formData.metaProducao ? `${atingimentoMeta.toFixed(1)}%` : 'N/A'}
              </div>
              <div className="text-sm text-muted-foreground">Atingimento Meta</div>
            </div>

            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-purple-600">
                {formData.producaoPlanejada ? `${atingimentoPlanejado.toFixed(1)}%` : 'N/A'}
              </div>
              <div className="text-sm text-muted-foreground">Atingimento Planejado</div>
            </div>
          </div>

          {/* Barra de progresso da meta */}
          {formData.metaProducao && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progresso da Meta</span>
                <span>{atingimentoMeta.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(atingimentoMeta, 100)}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={carregando}
          className="form-button"
        >
          {carregando ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando Relatório...
            </>
          ) : (
            '📤 Enviar Relatório Diário'
          )}
        </button>
      </form>
    </div>
  );
}