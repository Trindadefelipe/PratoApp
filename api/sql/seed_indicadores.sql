-- ============================================================
-- seed_indicadores.sql: carga inicial das 27 capitais em indicadores_capitais.
-- Baseado em data-science/dados/capitais_dados_processados.csv (ano 2022)
-- e nos perfis K-Means da seção 6.3.4 do notebook.ipynb.
-- Atualizar com o CSV final após a conclusão da issue #82 e execução no Colab.
-- Responsável: João Pedro (issue #83)
-- ============================================================

insert into indicadores_capitais (capital, regiao, ano_referencia, taxa_recente, classe_risco, probabilidade_alto, perfil_cluster, modelo_origem) values
    ('Porto Velho', 'Norte', 2022, 5.16, 'Alto', 0.645, 'Perfil 3: Taxa Crítica / Histórico Elevado', 'Regressão Logística (pré-carga #83)'),
    ('Rio Branco', 'Norte', 2022, 1.81, 'Baixo', 0.226, 'Perfil 3: Taxa Crítica / Histórico Elevado', 'Regressão Logística (pré-carga #83)'),
    ('Manaus', 'Norte', 2022, 6.14, 'Alto', 0.767, 'Perfil 3: Taxa Crítica / Histórico Elevado', 'Regressão Logística (pré-carga #83)'),
    ('Boa Vista', 'Norte', 2022, 6.91, 'Alto', 0.864, 'Perfil 3: Taxa Crítica / Histórico Elevado', 'Regressão Logística (pré-carga #83)'),
    ('Belém', 'Norte', 2022, 2.89, 'Baixo', 0.361, 'Perfil 2: Taxa Intermediária / Variável', 'Regressão Logística (pré-carga #83)'),
    ('Macapá', 'Norte', 2022, 3.37, 'Baixo', 0.421, 'Perfil 2: Taxa Intermediária / Variável', 'Regressão Logística (pré-carga #83)'),
    ('Palmas', 'Norte', 2022, 2.48, 'Baixo', 0.31, 'Perfil 1: Taxa Baixa / Histórico Estável', 'Regressão Logística (pré-carga #83)'),
    ('São Luís', 'Nordeste', 2022, 1.7, 'Baixo', 0.212, 'Perfil 1: Taxa Baixa / Histórico Estável', 'Regressão Logística (pré-carga #83)'),
    ('Teresina', 'Nordeste', 2022, 3.29, 'Baixo', 0.411, 'Perfil 1: Taxa Baixa / Histórico Estável', 'Regressão Logística (pré-carga #83)'),
    ('Fortaleza', 'Nordeste', 2022, 5.89, 'Alto', 0.736, 'Perfil 2: Taxa Intermediária / Variável', 'Regressão Logística (pré-carga #83)'),
    ('Natal', 'Nordeste', 2022, 2.77, 'Baixo', 0.346, 'Perfil 1: Taxa Baixa / Histórico Estável', 'Regressão Logística (pré-carga #83)'),
    ('João Pessoa', 'Nordeste', 2022, 1.15, 'Baixo', 0.144, 'Perfil 3: Taxa Crítica / Histórico Elevado', 'Regressão Logística (pré-carga #83)'),
    ('Recife', 'Nordeste', 2022, 5.28, 'Alto', 0.66, 'Perfil 3: Taxa Crítica / Histórico Elevado', 'Regressão Logística (pré-carga #83)'),
    ('Maceió', 'Nordeste', 2022, 4.57, 'Alto', 0.571, 'Perfil 3: Taxa Crítica / Histórico Elevado', 'Regressão Logística (pré-carga #83)'),
    ('Aracaju', 'Nordeste', 2022, 3.71, 'Baixo', 0.464, 'Perfil 1: Taxa Baixa / Histórico Estável', 'Regressão Logística (pré-carga #83)'),
    ('Salvador', 'Nordeste', 2022, 4.89, 'Alto', 0.611, 'Perfil 2: Taxa Intermediária / Variável', 'Regressão Logística (pré-carga #83)'),
    ('Belo Horizonte', 'Sudeste', 2022, 2.64, 'Baixo', 0.33, 'Perfil 2: Taxa Intermediária / Variável', 'Regressão Logística (pré-carga #83)'),
    ('Vitória', 'Sudeste', 2022, 3.92, 'Alto', 0.49, 'Perfil 3: Taxa Crítica / Histórico Elevado', 'Regressão Logística (pré-carga #83)'),
    ('Rio de Janeiro', 'Sudeste', 2022, 1.92, 'Baixo', 0.24, 'Perfil 1: Taxa Baixa / Histórico Estável', 'Regressão Logística (pré-carga #83)'),
    ('São Paulo', 'Sudeste', 2022, 0.55, 'Baixo', 0.069, 'Perfil 1: Taxa Baixa / Histórico Estável', 'Regressão Logística (pré-carga #83)'),
    ('Curitiba', 'Sul', 2022, 3.41, 'Baixo', 0.426, 'Perfil 2: Taxa Intermediária / Variável', 'Regressão Logística (pré-carga #83)'),
    ('Florianópolis', 'Sul', 2022, 1.08, 'Baixo', 0.135, 'Perfil 1: Taxa Baixa / Histórico Estável', 'Regressão Logística (pré-carga #83)'),
    ('Porto Alegre', 'Sul', 2022, 6.12, 'Alto', 0.765, 'Perfil 2: Taxa Intermediária / Variável', 'Regressão Logística (pré-carga #83)'),
    ('Campo Grande', 'Centro-Oeste', 2022, 3.84, 'Baixo', 0.48, 'Perfil 1: Taxa Baixa / Histórico Estável', 'Regressão Logística (pré-carga #83)'),
    ('Cuiabá', 'Centro-Oeste', 2022, 2.86, 'Baixo', 0.357, 'Perfil 3: Taxa Crítica / Histórico Elevado', 'Regressão Logística (pré-carga #83)'),
    ('Goiânia', 'Centro-Oeste', 2022, 1.82, 'Baixo', 0.228, 'Perfil 2: Taxa Intermediária / Variável', 'Regressão Logística (pré-carga #83)'),
    ('Brasília', 'Centro-Oeste', 2022, 2.16, 'Baixo', 0.27, 'Perfil 2: Taxa Intermediária / Variável', 'Regressão Logística (pré-carga #83)')
on conflict (capital) do update set
    regiao = excluded.regiao,
    ano_referencia = excluded.ano_referencia,
    taxa_recente = excluded.taxa_recente,
    classe_risco = excluded.classe_risco,
    probabilidade_alto = excluded.probabilidade_alto,
    perfil_cluster = excluded.perfil_cluster,
    modelo_origem = excluded.modelo_origem,
    atualizado_em = current_timestamp;
