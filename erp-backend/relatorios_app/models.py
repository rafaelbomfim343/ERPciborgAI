from django.db import models
from django.core.validators import MinValueValidator

class RelatorioProducao(models.Model):
    """
    Modelo para registrar relatórios diários de produção,
    vendas e métricas de produtividade.
    """

    # Tipos de veículos para entrega
    VEICULO_CHOICES = [
        ('caminhao', 'Caminhão'),
        ('vuc', 'VUC'),
        ('carro', 'Carro'),
        ('moto', 'Moto'),
        ('transporte_externo', 'Transporte Externo'),
        ('outro', 'Outro'),
    ]

    # Informações principais
    data = models.DateField(unique=True)
    horas_trabalhadas = models.PositiveIntegerField(
        validators=[MinValueValidator(1)],
        help_text="Horas trabalhadas no dia (mínimo 1)"
    )
    meta_producao = models.PositiveIntegerField(default=0)
    producao_planejada = models.PositiveIntegerField(default=0)

    # Produção por produto
    produto_a_producao = models.PositiveIntegerField(default=0)
    produto_b_producao = models.PositiveIntegerField(default=0)
    produto_c_producao = models.PositiveIntegerField(default=0)
    produto_d_producao = models.PositiveIntegerField(default=0)

    # Vendas por produto
    produto_a_vendas = models.PositiveIntegerField(default=0)
    produto_b_vendas = models.PositiveIntegerField(default=0)
    produto_c_vendas = models.PositiveIntegerField(default=0)
    produto_d_vendas = models.PositiveIntegerField(default=0)

    produtos_despachados = models.PositiveIntegerField(default=0)
    veiculo_entrega = models.CharField(
        max_length=20,
        choices=VEICULO_CHOICES,
        blank=True,
        help_text="Veículo utilizado para entrega"
    )
    observacoes = models.TextField(blank=True)

    # Métricas calculadas automaticamente
    total_producao = models.PositiveIntegerField(default=0)
    total_vendas = models.PositiveIntegerField(default=0)
    atingimento_meta = models.FloatField(default=0)
    atingimento_planejado = models.FloatField(default=0)
    produtividade = models.FloatField(default=0)

    # Timestamps
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Relatório de Produção"
        verbose_name_plural = "Relatórios de Produção"
        ordering = ['-data']

    def __str__(self):
        return f"Relatório - {self.data}"

    def save(self, *args, **kwargs):
        """
        Calcula automaticamente totais e métricas antes de salvar:
        - total_producao: soma da produção de todos os produtos
        - total_vendas: soma das vendas de todos os produtos
        - atingimento_meta: % da meta atingida
        - atingimento_planejado: % da produção planejada atingida
        - produtividade: produção por hora trabalhada
        """
        # Total de produção
        self.total_producao = (
            self.produto_a_producao +
            self.produto_b_producao +
            self.produto_c_producao +
            self.produto_d_producao
        )

        # Total de vendas
        self.total_vendas = (
            self.produto_a_vendas +
            self.produto_b_vendas +
            self.produto_c_vendas +
            self.produto_d_vendas
        )

        # Cálculo de métricas
        self.atingimento_meta = (
            (self.total_producao / self.meta_producao) * 100
            if self.meta_producao > 0 else 0
        )

        self.atingimento_planejado = (
            (self.total_producao / self.producao_planejada) * 100
            if self.producao_planejada > 0 else 0
        )

        self.produtividade = (
            self.total_producao / self.horas_trabalhadas
            if self.horas_trabalhadas > 0 else 0
        )

        super().save(*args, **kwargs)
