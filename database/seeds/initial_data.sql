-- Inserir experimento inicial
INSERT INTO experimentos (nome_experimento, descricao) 
VALUES ('Teste 2 - Condutividade Térmica', 'Comparação com Isopor e TNT')
ON CONFLICT (nome_experimento) DO NOTHING;

-- Inserir materiais padrão
INSERT INTO materiais (nome_material) VALUES 
('Isopor'), ('TNT')
ON CONFLICT (nome_material) DO NOTHING;

-- Inserir medições (ajuste os IDs conforme necessário)
INSERT INTO medicoes (experimento_id, material_id, tempo_minutos, temperatura) VALUES
(2, 1, 5, 57.0), (2, 4, 5, 64.0), (2, 5, 5, 60.0),
(2, 1, 10, 52.0), (2, 4, 10, 60.0), (2, 5, 10, 56.0)
ON CONFLICT DO NOTHING;