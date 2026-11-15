-- ============================================================
-- seed.sql: dados de teste (somente fictícios), os mesmos de app/src/data/.
-- Rode DEPOIS do schema.sql. Pode rodar de novo sem duplicar (on conflict do nothing).
-- Responsável: Alana Caled (issue #63)
--
-- Mudanças em relação a app/src/data/ para caber no DER:
--   * ids que não eram UUID válido ganharam um UUID fixo (contatos 1 a 4, viagens "v1...", incidentes "i1...");
--   * tipo_gatilho e status_delegacia dos alertas com os valores do DER
--     (botao = BOTAO_DIRETO, deslocamento = FALTA_CHECKIN, duress_pin = DURESS_PIN, agitar_celular = SHAKE);
--   * campos que só existiam no app (titulo_curto, evidencias, contatos_notificados_ids) não entram.
-- ============================================================

-- ---------- usuarias ----------
insert into usuarias (id, nome_ficticio, email, senha_hash, pin_secreto, duress_pin, camuflagem_ativa, criado_em) values
    ('7b1e4c2a-9f3d-4e8a-b6c1-2d5f8a9e0c31', 'Ana Souza', 'ana.souza@email.com',
     '$2b$10$exemploFicticioDeHashBcryptSomenteParaTeste', '1234', '9999', true, '2026-10-01 10:00:00')
on conflict (id) do nothing;

-- ---------- contatos_confianca ----------
insert into contatos_confianca (id, usuaria_id, nome, telefone, parentesco_relacao, nivel_prioridade, notificar_sms, notificar_whatsapp, criado_em) values
    ('d1a2b3c4-0001-4000-8000-000000000001', '7b1e4c2a-9f3d-4e8a-b6c1-2d5f8a9e0c31', 'José Roberto Leite',       '(43) 9 4002-8922', 'Pai',   1, true,  true,  '2026-10-22 12:00:00'),
    ('d1a2b3c4-0001-4000-8000-000000000002', '7b1e4c2a-9f3d-4e8a-b6c1-2d5f8a9e0c31', 'Maria de Lourdes Leite',   '(43) 9 4002-8923', 'Mãe',   1, true,  true,  '2026-10-22 11:15:00'),
    ('d1a2b3c4-0001-4000-8000-000000000003', '7b1e4c2a-9f3d-4e8a-b6c1-2d5f8a9e0c31', 'Carlos Manoel',            '(43) 9 4002-8924', 'Amigo', 3, false, false, '2026-10-23 00:23:00'),
    ('d1a2b3c4-0001-4000-8000-000000000004', '7b1e4c2a-9f3d-4e8a-b6c1-2d5f8a9e0c31', 'Juraci Rodrigues de Lima', '(43) 9 4002-8925', 'Prima', 2, true,  true,  '2026-10-22 16:37:00')
on conflict (id) do nothing;

-- ---------- viagens_seguras ----------
insert into viagens_seguras (id, usuaria_id, origem_descricao, destino_descricao, horario_inicio, previsao_chegada, status_viagem, latitude_destino, longitude_destino, finalizado_em) values
    ('b1a2b3c4-0001-4000-8000-000000000001', '7b1e4c2a-9f3d-4e8a-b6c1-2d5f8a9e0c31', 'Faculdade Positivo', 'Casa',
     '2026-10-22 21:45:00', '2026-10-22 22:15:00', 'EM_ANDAMENTO',          -23.3105, -51.1628, null),
    ('b1a2b3c4-0001-4000-8000-000000000002', '7b1e4c2a-9f3d-4e8a-b6c1-2d5f8a9e0c31', 'Trabalho (Centro)', 'Casa',
     '2026-10-21 18:00:00', '2026-10-21 18:35:00', 'CONCLUIDA_COM_SUCESSO', -23.3105, -51.1628, '2026-10-21 18:32:00'),
    ('b1a2b3c4-0001-4000-8000-000000000012', '7b1e4c2a-9f3d-4e8a-b6c1-2d5f8a9e0c31', 'Shopping Boulevard', 'Casa de Amiga',
     '2026-09-15 18:00:00', '2026-09-15 18:30:00', 'ATRASADA',              -23.2760, -51.2790, '2026-09-15 19:10:00')
on conflict (id) do nothing;

-- ---------- checkins_viagem ----------
insert into checkins_viagem (id, viagem_id, horario_checkin, latitude_atual, longitude_atual, status_resposta) values
    ('c1b2c3d4-0001-4000-8000-000000000001', 'b1a2b3c4-0001-4000-8000-000000000001', '2026-10-22 22:00:00', -23.3080, -51.1650, 'CONFIRMADO')
on conflict (id) do nothing;

-- ---------- alertas_sos ----------
insert into alertas_sos (id, usuaria_id, viagem_id, latitude, longitude, endereco_aproximado, tipo_gatilho, status_delegacia, criado_em, atualizado_em) values
    ('a1b2c3d4-0001-4000-8000-000000000001', '7b1e4c2a-9f3d-4e8a-b6c1-2d5f8a9e0c31', null,
     -23.3045, -51.1696, 'Londrina/PR', 'BOTAO_DIRETO',  'EM_ATENDIMENTO', '2026-09-28 22:03:00', '2026-09-28 22:05:00'),
    ('a1b2c3d4-0002-4000-8000-000000000002', '7b1e4c2a-9f3d-4e8a-b6c1-2d5f8a9e0c31', 'b1a2b3c4-0001-4000-8000-000000000012',
     -23.2760, -51.2790, 'Cambé/PR',    'FALTA_CHECKIN', 'CONCLUIDO',      '2026-09-15 18:47:00', '2026-09-15 19:10:00'),
    ('a1b2c3d4-0003-4000-8000-000000000003', '7b1e4c2a-9f3d-4e8a-b6c1-2d5f8a9e0c31', null,
     -23.3110, -51.1620, 'Londrina/PR', 'DURESS_PIN',    'CONCLUIDO',      '2026-09-03 23:12:00', '2026-09-03 23:40:00'),
    ('a1b2c3d4-0004-4000-8000-000000000004', '7b1e4c2a-9f3d-4e8a-b6c1-2d5f8a9e0c31', null,
     -23.3200, -51.1500, 'Londrina/PR', 'SHAKE',         'CONCLUIDO',      '2026-08-21 07:55:00', '2026-08-21 08:15:00')
on conflict (id) do nothing;

-- ---------- cofre_incidentes ----------
insert into cofre_incidentes (id, usuaria_id, data_ocorrencia, tipo_violencia, relato_detalhado, local_ocorrencia, notas_adicionais, anexo_evidencia_url, criado_em) values
    ('e1a2b3c4-0001-4000-8000-000000000001', '7b1e4c2a-9f3d-4e8a-b6c1-2d5f8a9e0c31', '2026-09-26 21:40:00', 'VERBAL_PSICOLOGICA',
     'Durante uma discussão, ele gritou comigo e disse que eu não poderia sair de casa sem avisar. Aconteceu na frente de um vizinho, que ouviu parte da conversa.',
     'Em casa', 'Não é a primeira vez neste mês. O vizinho pode confirmar o horário.', 'audio_042.m4a', '2026-09-26 22:05:00'),
    ('e1a2b3c4-0002-4000-8000-000000000002', '7b1e4c2a-9f3d-4e8a-b6c1-2d5f8a9e0c31', '2026-09-19 08:15:00', 'VIRTUAL_PERSEGUICAO',
     'Mais de 30 mensagens em duas horas com ofensas, ameaças veladas e exigência de envio imediato de localização.',
     'Trabalho', 'Arquivado no cofre para comprovação de assédio psicológico e perseguição continuada.', 'prints_whatsapp_19set.png', '2026-09-19 09:00:00'),
    ('e1a2b3c4-0003-4000-8000-000000000003', '7b1e4c2a-9f3d-4e8a-b6c1-2d5f8a9e0c31', '2026-09-02 19:05:00', 'PATRIMONIAL',
     'Documentos e cartão de transporte retirados sem aviso. Fiquei impossibilitada de me locomover até a faculdade.',
     'Residência', 'Precisei solicitar empréstimo emergencial para retornar para casa.', 'foto_carteira.jpg', '2026-09-02 19:40:00'),
    ('e1a2b3c4-0004-4000-8000-000000000004', '7b1e4c2a-9f3d-4e8a-b6c1-2d5f8a9e0c31', '2026-08-14 22:30:00', 'FISICA',
     'Discussão no quarto com empurrão contra a porta e ameaças verbais caso procurasse ajuda na delegacia.',
     'Quarto', 'Houve hematoma visível registrado fotograficamente.', 'foto_hematoma_14ago.jpg', '2026-08-14 23:10:00')
on conflict (id) do nothing;

-- Conferência rápida: deve mostrar 1, 4, 3, 1, 4, 4.
select 'usuarias' as tabela, count(*) from usuarias
union all select 'contatos_confianca', count(*) from contatos_confianca
union all select 'viagens_seguras',    count(*) from viagens_seguras
union all select 'checkins_viagem',    count(*) from checkins_viagem
union all select 'alertas_sos',        count(*) from alertas_sos
union all select 'cofre_incidentes',   count(*) from cofre_incidentes;
