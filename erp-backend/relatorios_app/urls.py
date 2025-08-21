from django.urls import path
from . import views

app_name = "relatorios_app"

urlpatterns = [
    # Criar um novo relatório de produção
    path('api/relatorios/', views.RelatorioProducaoCreateView.as_view(), name='create'),
    
    # Listar todos os relatórios de produção
    path('api/relatorios/list/', views.RelatorioProducaoListView.as_view(), name='list'),
]
