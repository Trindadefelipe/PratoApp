-- ============================================================
-- schema.sql: cria as 6 tabelas do DER no PostgreSQL (Supabase).
-- Fonte: docs/modelagem-der.md (Entrega 1). Nomes de campo idênticos ao DER.
-- Como usar: Supabase > SQL Editor > New query > colar tudo > Run.
-- Depois rode o seed.sql para os dados de teste.
-- Responsável: Alana Caled (issue #63)
-- ============================================================

-- gen_random_uuid() já vem no Supabase; a linha abaixo só garante.
create extension if not exists pgcrypto;

-- Para recriar tudo do zero (APAGA OS DADOS), tire os "--" das linhas abaixo:
-- drop table if exists checkins_viagem, alertas_sos, cofre_incidentes,
--     viagens_seguras, contatos_confianca, usuarias cascade;


-- ---------- Tabela 1: usuarias (Alana Caled) ----------
create table if not exists usuarias (
    id                uuid primary key default gen_random_uuid(),
    nome_ficticio     varchar(150) not null,
    email             varchar(150) not null unique,
    senha_hash        varchar(255) not null,
    pin_secreto       varchar(10)  not null check (pin_secreto ~ '^[0-9]{4,6}$'),
    duress_pin        varchar(10)  not null check (duress_pin  ~ '^[0-9]{4,6}$'),
    camuflagem_ativa  boolean      default true,
    criado_em         timestamp    default current_timestamp,
    constraint pins_diferentes check (pin_secreto <> duress_pin)
);


-- ---------- Tabela 2: contatos_confianca (Felipe Trindade) ----------
create table if not exists contatos_confianca (
    id                  uuid primary key default gen_random_uuid(),
    usuaria_id          uuid not null references usuarias(id) on delete cascade,
    nome                varchar(100) not null,
    telefone            varchar(20)  not null,
    parentesco_relacao  varchar(50)  not null,
    nivel_prioridade    integer      not null check (nivel_prioridade in (1, 2, 3)), -- 1 Alta, 2 Média, 3 Baixa
    notificar_sms       boolean      default true,
    notificar_whatsapp  boolean      default true,
    criado_em           timestamp    default current_timestamp
);


-- ---------- Tabela 3: viagens_seguras (Higor Bueno) ----------
create table if not exists viagens_seguras (
    id                 uuid primary key default gen_random_uuid(),
    usuaria_id         uuid not null references usuarias(id) on delete cascade,
    origem_descricao   varchar(200) not null,
    destino_descricao  varchar(200) not null,
    horario_inicio     timestamp    not null default current_timestamp,
    previsao_chegada   timestamp    not null,
    -- O DER dizia varchar(20), mas 'CONCLUIDA_COM_SUCESSO' tem 21 letras: aumentado para 25.
    status_viagem      varchar(25)  not null default 'EM_ANDAMENTO'
        check (status_viagem in ('EM_ANDAMENTO', 'CONCLUIDA_COM_SUCESSO', 'ATRASADA', 'SOS_ACIONADO')),
    latitude_destino   double precision,
    longitude_destino  double precision,
    finalizado_em      timestamp
);


-- ---------- Tabela 3b: checkins_viagem (Higor Bueno) ----------
create table if not exists checkins_viagem (
    id               uuid primary key default gen_random_uuid(),
    viagem_id        uuid not null references viagens_seguras(id) on delete cascade,
    horario_checkin  timestamp   not null default current_timestamp,
    latitude_atual   double precision,
    longitude_atual  double precision,
    status_resposta  varchar(20) not null default 'PENDENTE'
        check (status_resposta in ('PENDENTE', 'CONFIRMADO', 'EXPIRADO'))
);


-- ---------- Tabela 4: alertas_sos (Higor Domingos) ----------
-- O DER não pede "on delete cascade" na usuária: o alerta fica guardado para a delegacia.
-- Se a viagem for apagada, o alerta continua e só perde a ligação com ela.
create table if not exists alertas_sos (
    id                   uuid primary key default gen_random_uuid(),
    usuaria_id           uuid not null references usuarias(id),
    viagem_id            uuid references viagens_seguras(id) on delete set null,
    latitude             double precision not null,
    longitude            double precision not null,
    endereco_aproximado  varchar(200),
    tipo_gatilho         varchar(20) not null
        check (tipo_gatilho in ('BOTAO_DIRETO', 'DURESS_PIN', 'FALTA_CHECKIN', 'SHAKE')),
    status_delegacia     varchar(30) not null default 'NOVO'
        check (status_delegacia in ('NOVO', 'EM_ATENDIMENTO', 'CONCLUIDO')),
    criado_em            timestamp not null default current_timestamp,
    atualizado_em        timestamp not null default current_timestamp
);


-- ---------- Tabela 5: cofre_incidentes (João Pedro) ----------
create table if not exists cofre_incidentes (
    id                   uuid primary key default gen_random_uuid(),
    usuaria_id           uuid not null references usuarias(id) on delete cascade,
    data_ocorrencia      timestamp   not null,
    tipo_violencia       varchar(50) not null
        check (tipo_violencia in ('VERBAL_PSICOLOGICA', 'FISICA', 'PATRIMONIAL', 'VIRTUAL_PERSEGUICAO')),
    relato_detalhado     text not null,
    local_ocorrencia     varchar(255),
    notas_adicionais     text,
    anexo_evidencia_url  varchar(255),
    criado_em            timestamp not null default current_timestamp
);


-- ---------- Segurança no Supabase ----------
-- Liga o RLS sem nenhuma regra: o acesso público do Supabase (chave "anon")
-- não lê nem grava nada. A nossa API em Node conecta direto no banco
-- (DATABASE_URL, usuário postgres) e continua funcionando normalmente.
alter table usuarias           enable row level security;
alter table contatos_confianca enable row level security;
alter table viagens_seguras    enable row level security;
alter table checkins_viagem    enable row level security;
alter table alertas_sos        enable row level security;
alter table cofre_incidentes   enable row level security;
