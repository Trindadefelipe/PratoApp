// ============================================================
// Dados simulados da tabela COFRE_INCIDENTES (DER da Entrega 1, seção 3).
//
// Use exatamente estes nomes de campo, para a troca pela API na Entrega 4 ser simples:
//   id, usuaria_id, data_ocorrencia, tipo_violencia, relato_detalhado, local_ocorrencia, notas_adicionais, anexo_evidencia_url, criado_em
//
// Somente dados fictícios.
// Responsável: João Pedro (Issues #58, #59, #60, #61)
// ============================================================

import { usuaria } from './usuaria';
import { colors } from '../theme/colors';

// Mapeamento dos tipos de violência conforme a modelagem DER (seção 146) e protótipo
export const TIPOS_VIOLENCIA = {
  VERBAL_PSICOLOGICA: {
    id: 'VERBAL_PSICOLOGICA',
    rotulo: 'Verbal/Psicológica',
    filtro: 'Verbal',
    corBadgeBg: colors.pessegoClaro,
    corBadgeTexto: colors.marromEscuro,
    corPonto: colors.coral,
  },
  VIRTUAL_PERSEGUICAO: {
    id: 'VIRTUAL_PERSEGUICAO',
    rotulo: 'Perseguição',
    filtro: 'Virtual',
    corBadgeBg: colors.verdeClaro,
    corBadgeTexto: colors.verdeProfundo,
    corPonto: colors.verdeProfundo,
  },
  PATRIMONIAL: {
    id: 'PATRIMONIAL',
    rotulo: 'Patrimonial',
    filtro: 'Patrimonial',
    corBadgeBg: colors.amareloClaro,
    corBadgeTexto: colors.amareloProfundo,
    corPonto: colors.amarelo,
  },
  FISICA: {
    id: 'FISICA',
    rotulo: 'Física',
    filtro: 'Física',
    corBadgeBg: colors.coralClaro,
    corBadgeTexto: colors.coral,
    corPonto: colors.coral,
  },
};

// Registros fictícios cobrindo diferentes tipos da Lei Maria da Penha
export let incidentes = [
  {
    id: 'i1a2b3c4-0001-4000-8000-000000000001',
    usuaria_id: usuaria.id,
    titulo_curto: 'Discussão em casa',
    data_ocorrencia: '2026-09-26T21:40:00',
    tipo_violencia: 'VERBAL_PSICOLOGICA',
    relato_detalhado: 'Durante uma discussão, ele gritou comigo e disse que eu não poderia sair de casa sem avisar. Aconteceu na frente de um vizinho, que ouviu parte da conversa.',
    local_ocorrencia: 'Em casa',
    notas_adicionais: 'Não é a primeira vez neste mês. O vizinho pode confirmar o horário.',
    anexo_evidencia_url: 'audio_042.m4a',
    evidencia_tipo: 'audio',
    evidencia_label: '1 áudio',
    evidencias: [
      { id: 'ev-1', tipo: 'audio', label: 'Áudio 0:42', corBg: colors.verdeClaro, corTexto: colors.verdeProfundo, icone: 'mic-outline' },
    ],
    criado_em: '2026-09-26T22:05:00',
  },
  {
    id: 'i1a2b3c4-0002-4000-8000-000000000002',
    usuaria_id: usuaria.id,
    titulo_curto: 'Mensagens repetidas',
    data_ocorrencia: '2026-09-19T08:15:00',
    tipo_violencia: 'VIRTUAL_PERSEGUICAO',
    relato_detalhado: 'Mais de 30 mensagens em duas horas com ofensas, ameaças veladas e exigência de envio imediato de localização.',
    local_ocorrencia: 'Trabalho',
    notas_adicionais: 'Arquivado no cofre para comprovação de assédio psicológico e perseguição continuada.',
    anexo_evidencia_url: 'prints_whatsapp_19set.png',
    evidencia_tipo: 'captura',
    evidencia_label: '2 capturas de tela',
    evidencias: [
      { id: 'ev-2', tipo: 'captura', label: 'Captura', corBg: colors.pessegoClaro, corTexto: colors.marromEscuro, icone: 'image-outline' },
    ],
    criado_em: '2026-09-19T09:00:00',
  },
  {
    id: 'i1a2b3c4-0003-4000-8000-000000000003',
    usuaria_id: usuaria.id,
    titulo_curto: 'Cartão retido',
    data_ocorrencia: '2026-09-02T19:05:00',
    tipo_violencia: 'PATRIMONIAL',
    relato_detalhado: 'Documentos e cartão de transporte retirados sem aviso. Fiquei impossibilitada de me locomover até a faculdade.',
    local_ocorrencia: 'Residência',
    notas_adicionais: 'Precisei solicitar empréstimo emergencial para retornar para casa.',
    anexo_evidencia_url: 'foto_carteira.jpg',
    evidencia_tipo: 'foto',
    evidencia_label: '1 foto',
    evidencias: [
      { id: 'ev-3', tipo: 'foto', label: 'Foto', corBg: colors.amareloClaro, corTexto: colors.amareloEscuro, icone: 'camera-outline' },
    ],
    criado_em: '2026-09-02T19:40:00',
  },
  {
    id: 'i1a2b3c4-0004-4000-8000-000000000004',
    usuaria_id: usuaria.id,
    titulo_curto: 'Agressão e empurrão',
    data_ocorrencia: '2026-08-14T22:30:00',
    tipo_violencia: 'FISICA',
    relato_detalhado: 'Discussão no quarto com empurrão contra a porta e ameaças verbais caso procurasse ajuda na delegacia.',
    local_ocorrencia: 'Quarto',
    notas_adicionais: 'Houve hematoma visível registrado fotograficamente.',
    anexo_evidencia_url: 'foto_hematoma_14ago.jpg',
    evidencia_tipo: 'foto',
    evidencia_label: '1 foto',
    evidencias: [
      { id: 'ev-4', tipo: 'foto', label: 'Foto', corBg: colors.coralClaro, corTexto: colors.coral, icone: 'camera-outline' },
    ],
    criado_em: '2026-08-14T23:10:00',
  },
];

// Funções utilitárias para gerenciar o CRUD simulado em memória
export function obterIncidentes() {
  return [...incidentes];
}

export function adicionarIncidente(novo) {
  const idGerado = `i1a2b3c4-${String(Date.now()).slice(-4)}-4000-8000-${String(Math.floor(Math.random() * 1000000000000)).padStart(12, '0')}`;
  const registro = {
    id: novo.id || idGerado,
    usuaria_id: usuaria.id,
    titulo_curto: novo.titulo_curto || novo.relato_detalhado?.slice(0, 24) || 'Registro',
    data_ocorrencia: novo.data_ocorrencia || new Date().toISOString(),
    tipo_violencia: novo.tipo_violencia || 'VERBAL_PSICOLOGICA',
    relato_detalhado: novo.relato_detalhado || '',
    local_ocorrencia: novo.local_ocorrencia || '',
    notas_adicionais: novo.notas_adicionais || '',
    anexo_evidencia_url: novo.anexo_evidencia_url || null,
    evidencia_tipo: novo.evidencia_tipo || 'geral',
    evidencia_label: novo.evidencia_label || 'Sem evidências',
    evidencias: novo.evidencias || [],
    criado_em: new Date().toISOString(),
  };

  // Insere no início para manter a ordem cronológica decrescente
  incidentes = [registro, ...incidentes];
  return registro;
}

export function atualizarIncidente(id, dadosAtualizados) {
  incidentes = incidentes.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        ...dadosAtualizados,
        titulo_curto: dadosAtualizados.titulo_curto || dadosAtualizados.relato_detalhado?.slice(0, 24) || item.titulo_curto,
      };
    }
    return item;
  });
}

export function excluirIncidente(id) {
  incidentes = incidentes.filter((item) => item.id !== id);
}

export default incidentes;
