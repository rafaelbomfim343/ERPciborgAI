-- Tabela de experimentos
CREATE TABLE IF NOT EXISTS experimentos (
    id SERIAL PRIMARY KEY,  -- Alterado para SERIAL (PostgreSQL)
    nome_experimento VARCHAR(100) NOT NULL,
    descricao TEXT,
    data_realizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de materiais
CREATE TABLE IF NOT EXISTS materiais (
    id SERIAL PRIMARY KEY,
    nome_material VARCHAR(50) NOT NULL,
    condutividade_termica DECIMAL(10,2)
);

-- Tabela de medições
CREATE TABLE IF NOT EXISTS medicoes (
    id SERIAL PRIMARY KEY,
    experimento_id INT NOT NULL,
    material_id INT NOT NULL,
    tempo_minutos INT NOT NULL,
    temperatura DECIMAL(4,1) NOT NULL,
    FOREIGN KEY (experimento_id) REFERENCES experimentos(id) ON DELETE CASCADE,
    FOREIGN KEY (material_id) REFERENCES materiais(id) ON DELETE CASCADE
);