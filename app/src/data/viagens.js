// ============================================================
// Dados simulados da tabela VIAGENS_SEGURAS e CHECKINS_VIAGEM (DER da Entrega 1, seção 3).
//
// Use exatamente estes nomes de campo, para a troca pela API na Entrega 4 ser simples:
//   id, usuaria_id, origem_descricao, destino_descricao, horario_inicio,
//   previsao_chegada, status_viagem, latitude_destino, longitude_destino, finalizado_em
//
// Somente dados fictícios.
// Responsável: Higor Bueno (Issues #49, #50, #51)
// ============================================================

import { usuaria } from './usuaria';

// Tabela: VIAGENS_SEGURAS
export const viagens = [
    {
        id: 'v1a2b3c4-0001-4000-8000-000000000001',
        usuaria_id: usuaria.id,
        origem_descricao: 'Faculdade Positivo',
        destino_descricao: 'Casa',
        horario_inicio: '2026-10-22T21:45:00.000Z',
        previsao_chegada: '2026-10-22T22:15:00.000Z',
        status_viagem: 'EM_ANDAMENTO', // Conforme DER: EM_ANDAMENTO, CONCLUIDA_COM_SUCESSO, ATRASADA, SOS_ACIONADO
        latitude_destino: -23.3105,
        longitude_destino: -51.1628,
        finalizado_em: null,
        // Contatos do Círculo que estão acompanhando esta viagem (Marta e Camila)
        contatos_notificados_ids: [1, 2],
    },
    {
        id: 'v1a2b3c4-0001-4000-8000-000000000002',
        usuaria_id: usuaria.id,
        origem_descricao: 'Trabalho (Centro)',
        destino_descricao: 'Casa',
        horario_inicio: '2026-10-21T18:00:00.000Z',
        previsao_chegada: '2026-10-21T18:35:00.000Z',
        status_viagem: 'CONCLUIDA_COM_SUCESSO',
        latitude_destino: -23.3105,
        longitude_destino: -51.1628,
        finalizado_em: '2026-10-21T18:32:00.000Z',
        contatos_notificados_ids: [1],
    },
    {
        id: 'v1a2b3c4-0001-4000-8000-000000000012',
        usuaria_id: usuaria.id,
        origem_descricao: 'Shopping Boulevard',
        destino_descricao: 'Casa de Amiga',
        horario_inicio: '2026-09-15T18:00:00.000Z',
        previsao_chegada: '2026-09-15T18:30:00.000Z',
        status_viagem: 'ATRASADA',
        latitude_destino: -23.2760,
        longitude_destino: -51.2790,
        finalizado_em: '2026-09-15T19:10:00.000Z',
        contatos_notificados_ids: [1, 2, 4],
    },
];

// Tabela: CHECKINS_VIAGEM
export const checkinsViagem = [
    {
        id: 'c1b2c3d4-0001-4000-8000-000000000001',
        viagem_id: 'v1a2b3c4-0001-4000-8000-000000000001',
        horario_checkin: '2026-10-22T22:00:00.000Z',
        latitude_atual: -23.3080,
        longitude_atual: -51.1650,
        status_resposta: 'CONFIRMADO', // PENDENTE, CONFIRMADO, EXPIRADO
    },
];

// Viagem atualmente ativa que alimenta a Tela 09 (ViagemEmAndamentoScreen)
export const viagemAtiva = viagens[0];

export default viagens;
