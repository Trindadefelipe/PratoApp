-- ============================================================
-- seed_indicadores.sql: carga das 27 capitais em indicadores_capitais.
-- Gerado diretamente a partir de data-science/dados/indicadores_capitais.csv
-- (saída do modelo Random Forest pipe_rf no notebook.ipynb).
-- Responsável: João Pedro (issue #83)
-- ============================================================

insert into indicadores_capitais (capital, regiao, ano_referencia, taxa_recente, classe_risco, probabilidade_alto, perfil_cluster, modelo_origem) values
    ('Aracaju', 'Nordeste', 2022, 3.71, 'Baixo', 0.241, 'Perfil 1: Taxa Baixa / Histórico Estável', 'Random Forest (pipe_rf)'),
    ('Belo Horizonte', 'Sudeste', 2022, 2.64, 'Baixo', 0.195, 'Perfil 1: Taxa Baixa / Histórico Estável', 'Random Forest (pipe_rf)'),
    ('Belém', 'Norte', 2022, 2.89, 'Alto', 0.707, 'Perfil 2: Taxa Intermediária / Variável', 'Random Forest (pipe_rf)'),
    ('Boa Vista', 'Norte', 2022, 6.91, 'Alto', 0.777, 'Perfil 3: Taxa Crítica / Histórico Elevado', 'Random Forest (pipe_rf)'),
    ('Brasília', 'Centro-Oeste', 2022, 2.16, 'Baixo', 0.265, 'Perfil 1: Taxa Baixa / Histórico Estável', 'Random Forest (pipe_rf)'),
    ('Campo Grande', 'Centro-Oeste', 2022, 3.84, 'Baixo', 0.255, 'Perfil 1: Taxa Baixa / Histórico Estável', 'Random Forest (pipe_rf)'),
    ('Cuiabá', 'Centro-Oeste', 2022, 2.86, 'Baixo', 0.254, 'Perfil 2: Taxa Intermediária / Variável', 'Random Forest (pipe_rf)'),
    ('Curitiba', 'Sul', 2022, 3.41, 'Baixo', 0.15, 'Perfil 1: Taxa Baixa / Histórico Estável', 'Random Forest (pipe_rf)'),
    ('Florianópolis', 'Sul', 2022, 1.08, 'Baixo', 0.182, 'Perfil 1: Taxa Baixa / Histórico Estável', 'Random Forest (pipe_rf)'),
    ('Fortaleza', 'Nordeste', 2022, 5.89, 'Alto', 0.926, 'Perfil 3: Taxa Crítica / Histórico Elevado', 'Random Forest (pipe_rf)'),
    ('Goiânia', 'Centro-Oeste', 2022, 1.82, 'Baixo', 0.136, 'Perfil 2: Taxa Intermediária / Variável', 'Random Forest (pipe_rf)'),
    ('João Pessoa', 'Nordeste', 2022, 1.15, 'Baixo', 0.212, 'Perfil 2: Taxa Intermediária / Variável', 'Random Forest (pipe_rf)'),
    ('Macapá', 'Norte', 2022, 3.37, 'Alto', 0.778, 'Perfil 1: Taxa Baixa / Histórico Estável', 'Random Forest (pipe_rf)'),
    ('Maceió', 'Nordeste', 2022, 4.57, 'Alto', 0.701, 'Perfil 3: Taxa Crítica / Histórico Elevado', 'Random Forest (pipe_rf)'),
    ('Manaus', 'Norte', 2022, 6.14, 'Alto', 0.873, 'Perfil 3: Taxa Crítica / Histórico Elevado', 'Random Forest (pipe_rf)'),
    ('Natal', 'Nordeste', 2022, 2.77, 'Baixo', 0.21, 'Perfil 1: Taxa Baixa / Histórico Estável', 'Random Forest (pipe_rf)'),
    ('Palmas', 'Norte', 2022, 2.48, 'Alto', 0.862, 'Perfil 1: Taxa Baixa / Histórico Estável', 'Random Forest (pipe_rf)'),
    ('Porto Alegre', 'Sul', 2022, 6.12, 'Alto', 0.521, 'Perfil 3: Taxa Crítica / Histórico Elevado', 'Random Forest (pipe_rf)'),
    ('Porto Velho', 'Norte', 2022, 5.16, 'Alto', 0.892, 'Perfil 3: Taxa Crítica / Histórico Elevado', 'Random Forest (pipe_rf)'),
    ('Recife', 'Nordeste', 2022, 5.28, 'Alto', 0.803, 'Perfil 3: Taxa Crítica / Histórico Elevado', 'Random Forest (pipe_rf)'),
    ('Rio Branco', 'Norte', 2022, 1.81, 'Alto', 0.897, 'Perfil 2: Taxa Intermediária / Variável', 'Random Forest (pipe_rf)'),
    ('Rio de Janeiro', 'Sudeste', 2022, 1.92, 'Baixo', 0.107, 'Perfil 1: Taxa Baixa / Histórico Estável', 'Random Forest (pipe_rf)'),
    ('Salvador', 'Nordeste', 2022, 4.89, 'Alto', 0.933, 'Perfil 3: Taxa Crítica / Histórico Elevado', 'Random Forest (pipe_rf)'),
    ('São Luís', 'Nordeste', 2022, 1.7, 'Baixo', 0.192, 'Perfil 1: Taxa Baixa / Histórico Estável', 'Random Forest (pipe_rf)'),
    ('São Paulo', 'Sudeste', 2022, 0.55, 'Baixo', 0.103, 'Perfil 1: Taxa Baixa / Histórico Estável', 'Random Forest (pipe_rf)'),
    ('Teresina', 'Nordeste', 2022, 3.29, 'Alto', 0.522, 'Perfil 1: Taxa Baixa / Histórico Estável', 'Random Forest (pipe_rf)'),
    ('Vitória', 'Sudeste', 2022, 3.92, 'Baixo', 0.26, 'Perfil 3: Taxa Crítica / Histórico Elevado', 'Random Forest (pipe_rf)')
on conflict (capital) do update set
    regiao = excluded.regiao,
    ano_referencia = excluded.ano_referencia,
    taxa_recente = excluded.taxa_recente,
    classe_risco = excluded.classe_risco,
    probabilidade_alto = excluded.probabilidade_alto,
    perfil_cluster = excluded.perfil_cluster,
    modelo_origem = excluded.modelo_origem,
    atualizado_em = current_timestamp;
