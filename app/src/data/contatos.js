// ============================================================
// Dados simulados da tabela CONTATOS_CONFIANCA (DER da Entrega 1, seção 3).
//
// Use exatamente estes nomes de campo, para a troca pela API na Entrega 4 ser simples:
//   id, usuaria_id, nome, telefone, parentesco_relacao, nivel_prioridade, notificar_sms, notificar_whatsapp, criado_em
//
// Somente dados fictícios.
// Responsável: Felipe Trindade
// ============================================================

import { usuaria } from './usuaria';

// nivel_prioridade é INTEGER no DER: 1 = Alta, 2 = Média, 3 = Baixa
export const PRIORIDADES = {
  1: 'Alta',
  2: 'Média',
  3: 'Baixa',
};

export const contatos = [
  {
    id: 1,
    usuaria_id: usuaria.id,
    nome: 'José Roberto Leite',
    telefone: '(43) 9 4002-8922',
    parentesco_relacao: 'Pai',
    nivel_prioridade: 1,
    notificar_sms: true,
    notificar_whatsapp: true,
    criado_em: '2026-10-22T12:00:00',
  },
  {
    id: 2,
    usuaria_id: usuaria.id,
    nome: 'Maria de Lourdes Leite',
    telefone: '(43) 9 4002-8923',
    parentesco_relacao: 'Mãe',
    nivel_prioridade: 1,
    notificar_sms: true,
    notificar_whatsapp: true,
    criado_em: '2026-10-22T11:15:00',
  },
  {
    id: 3,
    usuaria_id: usuaria.id,
    nome: 'Carlos Manoel',
    telefone: '(43) 9 4002-8924',
    parentesco_relacao: 'Amigo',
    nivel_prioridade: 3,
    notificar_sms: false,
    notificar_whatsapp: false,
    criado_em: '2026-10-23T00:23:00',
  },
  {
    id: 4,
    usuaria_id: usuaria.id,
    nome: 'Juraci Rodrigues de Lima',
    telefone: '(43) 9 4002-8925',
    parentesco_relacao: 'Prima',
    nivel_prioridade: 2,
    notificar_sms: true,
    notificar_whatsapp: true,
    criado_em: '2026-10-22T16:37:00',
  },
];
