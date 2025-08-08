-- 1. Remova as tabelas se já existirem (opcional, somente se quiser recomeçar)
DROP TABLE IF EXISTS medicoes, materiais, experimentos CASCADE;

-- 2. Crie as tabelas com todas as constraints necessárias
CREATE TABLE experimentos (
    id SERIAL PRIMARY KEY,
    nome_experimento VARCHAR(100) NOT NULL,
    descricao TEXT,
    data_realizacao TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE materiais (
    id SERIAL PRIMARY KEY,
    nome_material VARCHAR(50) NOT NULL UNIQUE, -- Adicionando UNIQUE aqui
    condutividade_termica DECIMAL(10,2)
);

CREATE TABLE medicoes (
    id SERIAL PRIMARY KEY,
    experimento_id INT NOT NULL REFERENCES experimentos(id),
    material_id INT NOT NULL REFERENCES materiais(id),
    tempo_minutos INT NOT NULL,
    temperatura DECIMAL(4,1) NOT NULL
);

-- 3. Inserção segura de materiais
INSERT INTO materiais (nome_material) VALUES 
('Controle') ON CONFLICT (nome_material) DO NOTHING;
INSERT INTO materiais (nome_material) VALUES 
('Tetrapak') ON CONFLICT (nome_material) DO NOTHING;
INSERT INTO materiais (nome_material) VALUES 
('Alumínio') ON CONFLICT (nome_material) DO NOTHING;
INSERT INTO materiais (nome_material) VALUES 
('Isopor') ON CONFLICT (nome_material) DO NOTHING;
INSERT INTO materiais (nome_material) VALUES 
('TNT') ON CONFLICT (nome_material) DO NOTHING;

-- 4. Inserção dos experimentos e medições (usando transações)
BEGIN;

-- Primeiro experimento
WITH novo_exp AS (
    INSERT INTO experimentos (nome_experimento, descricao) 
    VALUES ('Teste 1 - Condutividade', 'Comparação entre Tetrapak e Alumínio')
    RETURNING id
)
INSERT INTO medicoes (experimento_id, material_id, tempo_minutos, temperatura)
SELECT 
    (SELECT id FROM novo_exp),
    m.id,
    vals.tempo,
    vals.temp
FROM (VALUES
    (5, 50.0, 'Controle'),
    (5, 52.0, 'Tetrapak'),
    (5, 53.0, 'Alumínio'),
    (10, 45.0, 'Controle'),
    (10, 47.0, 'Tetrapak'),
    (10, 48.0, 'Alumínio'),
    (15, 41.0, 'Controle'),
    (15, 44.0, 'Tetrapak'),
    (15, 45.0, 'Alumínio'),
    (20, 38.0, 'Controle'),
    (20, 42.0, 'Tetrapak'),
    (20, 42.0, 'Alumínio')
) AS vals(tempo, temp, material)
JOIN materiais m ON m.nome_material = vals.material;

-- Segundo experimento
WITH novo_exp AS (
    INSERT INTO experimentos (nome_experimento, descricao) 
    VALUES ('Teste 2 - Condutividade', 'Comparação com Isopor e TNT')
    RETURNING id
)
INSERT INTO medicoes (experimento_id, material_id, tempo_minutos, temperatura)
SELECT 
    (SELECT id FROM novo_exp),
    m.id,
    vals.tempo,
    vals.temp
FROM (VALUES
    (5, 57.0, 'Controle'),
    (5, 64.0, 'Isopor'),
    (5, 60.0, 'TNT'),
    (10, 52.0, 'Controle'),
    (10, 60.0, 'Isopor'),
    (10, 56.0, 'TNT'),
    (15, 47.0, 'Controle'),
    (15, 56.0, 'Isopor'),
    (15, 53.0, 'TNT'),
    (20, 42.0, 'Controle'),
    (20, 54.0, 'Isopor'),
    (20, 50.0, 'TNT')
) AS vals(tempo, temp, material)
JOIN materiais m ON m.nome_material = vals.material;

COMMIT;

-- Verificação final
SELECT 'Dados inseridos com sucesso!' AS resultado;