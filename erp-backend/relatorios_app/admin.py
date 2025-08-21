from django.contrib import admin
from .models import RelatorioProducao

@admin.register(RelatorioProducao)
class RelatorioProducaoAdmin(admin.ModelAdmin):
    # Campos exibidos na lista de objetos
    list_display = [
        'data', 
        'total_producao', 
        'total_vendas', 
        'atingimento_meta', 
        'produtividade'
    ]
    
    # Filtros laterais
    list_filter = ['data', 'veiculo_entrega']
    
    # Campos pesquisáveis
    search_fields = ['data', 'observacoes']
    
    # Campos somente leitura
    readonly_fields = [
        'total_producao', 
        'total_vendas', 
        'atingimento_meta', 
        'atingimento_planejado', 
        'produtividade'
    ]
    
    # Organização dos campos no formulário
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('data', 'horas_trabalhadas', 'meta_producao', 'producao_planejada')
        }),
        ('Produção por Produto', {
            'fields': ('produto_a_producao', 'produto_b_producao', 'produto_c_producao', 'produto_d_producao')
        }),
        ('Vendas por Produto', {
            'fields': ('produto_a_vendas', 'produto_b_vendas', 'produto_c_vendas', 'produto_d_vendas')
        }),
        ('Logística e Despachos', {
            'fields': ('produtos_despachados', 'veiculo_entrega')
        }),
        ('Métricas Calculadas', {
            'fields': ('total_producao', 'total_vendas', 'atingimento_meta', 'atingimento_planejado', 'produtividade'),
            'classes': ('collapse',)  # Permite recolher essa seção
        }),
        ('Observações', {
            'fields': ('observacoes',)
        }),
    )
