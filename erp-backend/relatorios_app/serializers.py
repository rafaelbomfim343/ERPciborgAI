from rest_framework import serializers
from .models import RelatorioProducao
from django.utils import timezone

class ProdutosVendidosSerializer(serializers.Serializer):
    produtoA = serializers.IntegerField(min_value=0, default=0)
    produtoB = serializers.IntegerField(min_value=0, default=0)
    produtoC = serializers.IntegerField(min_value=0, default=0)
    produtoD = serializers.IntegerField(min_value=0, default=0)

class RelatorioProducaoSerializer(serializers.ModelSerializer):
    # Apenas para escrita; os campos reais são armazenados separadamente no modelo
    produtosVendidos = ProdutosVendidosSerializer(write_only=True)

    class Meta:
        model = RelatorioProducao
        fields = [
            'data', 'horas_trabalhadas', 'meta_producao', 'producao_planejada',
            'produto_a_producao', 'produto_b_producao', 'produto_c_producao', 'produto_d_producao',
            'produtosVendidos', 'produtos_despachados', 'veiculo_entrega', 'observacoes',
            'total_producao', 'total_vendas', 'atingimento_meta', 'atingimento_planejado', 'produtividade'
        ]
        read_only_fields = [
            'total_producao', 'total_vendas', 'atingimento_meta', 
            'atingimento_planejado', 'produtividade'
        ]

    def validate_data(self, value):
        if value > timezone.now().date():
            raise serializers.ValidationError("A data não pode ser futura.")
        return value

    def validate(self, data):
        # Soma da produção
        producao_total = (
            data.get('produto_a_producao', 0) +
            data.get('produto_b_producao', 0) +
            data.get('produto_c_producao', 0) +
            data.get('produto_d_producao', 0)
        )

        # Soma das vendas
        vendas = data.get('produtosVendidos', {})
        vendas_total = (
            vendas.get('produtoA', 0) +
            vendas.get('produtoB', 0) +
            vendas.get('produtoC', 0) +
            vendas.get('produtoD', 0)
        )

        if vendas_total > producao_total:
            raise serializers.ValidationError(
                "O total de vendas não pode ser maior que o total produzido."
            )

        # Validar veículo se houver despachos
        if data.get('produtos_despachados', 0) > 0 and not data.get('veiculo_entrega'):
            raise serializers.ValidationError(
                "Se há produtos despachados, é necessário informar o veículo de entrega."
            )

        return data

    def create(self, validated_data):
        produtos_vendidos = validated_data.pop('produtosVendidos', {})

        relatorio = RelatorioProducao.objects.create(
            **validated_data,
            produto_a_vendas=produtos_vendidos.get('produtoA', 0),
            produto_b_vendas=produtos_vendidos.get('produtoB', 0),
            produto_c_vendas=produtos_vendidos.get('produtoC', 0),
            produto_d_vendas=produtos_vendidos.get('produtoD', 0)
        )

        return relatorio

class RelatorioProducaoListSerializer(serializers.ModelSerializer):
    """
    Serializer simplificado para listagem de relatórios
    """
    class Meta:
        model = RelatorioProducao
        fields = [
            'id', 'data', 'horas_trabalhadas', 'total_producao', 'total_vendas',
            'atingimento_meta', 'atingimento_planejado', 'produtividade'
        ]
