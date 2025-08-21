from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db.models import Sum, Avg
from .models import RelatorioProducao
from .serializers import RelatorioProducaoSerializer, RelatorioProducaoListSerializer

class RelatorioProducaoCreateView(generics.CreateAPIView):
    """
    View para criar um novo relatório de produção.
    Retorna os dados do relatório e métricas calculadas.
    """
    queryset = RelatorioProducao.objects.all()
    serializer_class = RelatorioProducaoSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)

            instance = serializer.instance
            response_data = {
                'success': True,
                'message': 'Relatório salvo com sucesso!',
                'data': serializer.data,
                'metrics': {
                    'produtividade': instance.produtividade,
                    'eficienciaMeta': instance.atingimento_meta,
                    'eficienciaPlanejamento': instance.atingimento_planejado,
                    'totalVendas': instance.total_vendas,
                    'vendasPorProduto': {
                        'produtoA': instance.produto_a_vendas,
                        'produtoB': instance.produto_b_vendas,
                        'produtoC': instance.produto_c_vendas,
                        'produtoD': instance.produto_d_vendas,
                    }
                }
            }

            return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)

        except Exception as e:
            return Response(
                {'success': False, 'message': f'Erro ao salvar relatório: {str(e)}'},
                status=status.HTTP_400_BAD_REQUEST
            )


class RelatorioProducaoListView(generics.ListAPIView):
    """
    View para listar todos os relatórios de produção.
    Retorna dados, contagem total e métricas consolidadas.
    """
    queryset = RelatorioProducao.objects.all()
    serializer_class = RelatorioProducaoListSerializer
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        # Métricas consolidadas
        metrics = {
            'totalRelatorios': queryset.count(),
            'producaoTotal': queryset.aggregate(Sum('total_producao'))['total_producao__sum'] or 0,
            'vendasTotal': queryset.aggregate(Sum('total_vendas'))['total_vendas__sum'] or 0,
            'mediaAtingimentoMeta': queryset.aggregate(Avg('atingimento_meta'))['atingimento_meta__avg'] or 0,
            'mediaAtingimentoPlanejado': queryset.aggregate(Avg('atingimento_planejado'))['atingimento_planejado__avg'] or 0,
            'vendasPorProduto': {
                'produtoA': queryset.aggregate(Sum('produto_a_vendas'))['produto_a_vendas__sum'] or 0,
                'produtoB': queryset.aggregate(Sum('produto_b_vendas'))['produto_b_vendas__sum'] or 0,
                'produtoC': queryset.aggregate(Sum('produto_c_vendas'))['produto_c_vendas__sum'] or 0,
                'produtoD': queryset.aggregate(Sum('produto_d_vendas'))['produto_d_vendas__sum'] or 0,
            }
        }

        response_data = {
            'data': serializer.data,
            'total': queryset.count(),
            'metrics': metrics
        }

        return Response(response_data)
