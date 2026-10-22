// ============================================================
// Dados simulados da tabela ALERTAS_SOS (DER da Entrega 1, seção 3).
//
// Use exatamente estes nomes de campo, para a troca pela API na Entrega 4 ser simples:
//   id, usuaria_id, viagem_id, latitude, longitude, endereco_aproximado, tipo_gatilho, status_delegacia, criado_em, atualizado_em
//
// Somente dados fictícios.
// Responsável: Higor Domingos (Issue #56)
// ============================================================

import { usuaria } from './usuaria';

export const alertas = [
  {
    id: 'a1b2c3d4-0001-4000-8000-000000000001',
    usuaria_id: usuaria.id,
    viagem_id: null,
    latitude: -23.3045,
    longitude: -51.1696,
    endereco_aproximado: 'Londrina/PR',
    tipo_gatilho: 'botao', // Botão SOS de 1 toque
    status_delegacia: 'Em atendimento',
    criado_em: '2026-09-28T22:03:00.000Z',
    atualizado_em: '2026-09-28T22:05:00.000Z',
  },
  {
    id: 'a1b2c3d4-0002-4000-8000-000000000002',
    usuaria_id: usuaria.id,
    viagem_id: 'v1a2b3c4-0001-4000-8000-000000000012',
    latitude: -23.2760,
    longitude: -51.2790,
    endereco_aproximado: 'Cambé/PR',
    tipo_gatilho: 'deslocamento', // Falta de check-in / atraso de viagem
    status_delegacia: 'Concluído',
    criado_em: '2026-09-15T18:47:00.000Z',
    atualizado_em: '2026-09-15T19:10:00.000Z',
  },
  {
    id: 'a1b2c3d4-0003-4000-8000-000000000003',
    usuaria_id: usuaria.id,
    viagem_id: null,
    latitude: -23.3110,
    longitude: -51.1620,
    endereco_aproximado: 'Londrina/PR',
    tipo_gatilho: 'duress_pin', // PIN de coação no Pratô
    status_delegacia: 'Concluído',
    criado_em: '2026-09-03T23:12:00.000Z',
    atualizado_em: '2026-09-03T23:40:00.000Z',
  },
  {
    id: 'a1b2c3d4-0004-4000-8000-000000000004',
    usuaria_id: usuaria.id,
    viagem_id: null,
    latitude: -23.3200,
    longitude: -51.1500,
    endereco_aproximado: 'Londrina/PR',
    tipo_gatilho: 'agitar_celular', // Acelerômetro / Agitar o celular
    status_delegacia: 'Concluído',
    criado_em: '2026-08-21T07:55:00.000Z',
    atualizado_em: '2026-08-21T08:15:00.000Z',
  },
];

export default alertas;
