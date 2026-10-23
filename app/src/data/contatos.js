// ============================================================
// Dados simulados da tabela CONTATOS_CONFIANCA (DER da Entrega 1, seção 3).
//
// Use exatamente estes nomes de campo, para a troca pela API na Entrega 4 ser simples:
//   id, usuaria_id, nome, telefone, parentesco_relacao, nivel_prioridade, notificar_sms, notificar_whatsapp, criado_em
//
// Somente dados fictícios.
// Responsável: Felipe Trindade
// ============================================================

export const contatos = [
  {
    id: 1,
    usuaria_id: 1,
    nome: 'José Roberto Leite',
    telefone: '(43) 9 4002-8922',
    parentesco_relacao: 'Pai',
    nivel_prioridade: 'Alta',
    notificar_sms: true,
    notificar_whatsapp: true,
    criado_em: '22/10/2026 12:00'
  },
  {
    id: 2,
    usuaria_id: 1,
    nome: 'Maria de Lourdes Leite',
    telefone: '(43) 9 4002-8923',
    parentesco_relacao: 'Mãe',
    nivel_prioridade: 'Alta',
    notificar_sms: true,
    notificar_whatsapp: true,
    criado_em: '22/10/2026 11:15'
  },
  {
    id: 3,
    usuaria_id: 1,
    nome: 'Carlos Manoel',
    telefone: '(43) 9 4002-8924',
    parentesco_relacao: 'Amigo',
    nivel_prioridade: 'Baixa',
    notificar_sms: false,
    notificar_whatsapp: false,
    criado_em: '23/10/2026 00:23'
  },
  {
    id: 4,
    usuaria_id: 1,
    nome: 'Juraci Rodrigues de Lima',
    telefone: '(43) 9 4002-8925',
    parentesco_relacao: 'Prima',
    nivel_prioridade: 'Média',
    notificar_sms: true,
    notificar_whatsapp: true,
    criado_em: '22/10/2026 16:37'
  },
];