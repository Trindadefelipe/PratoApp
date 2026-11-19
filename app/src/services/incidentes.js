// ============================================================
// incidentes: constantes e formatações do Cofre de Incidentes.
// Mantém em um lugar só o mapeamento de tipos de violência do DER,
// formatação de datas e leitura/montagem de evidências para as Telas 10, 11 e 12.
// Responsável: João Pedro (issue #81)
// ============================================================

import { colors } from '../theme/colors';

const MESES = [
  'jan', 'fev', 'mar', 'abr', 'mai', 'jun',
  'jul', 'ago', 'set', 'out', 'nov', 'dez',
];

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

export const TIPO_PADRAO = {
  rotulo: 'Incidente',
  filtro: 'Geral',
  corBadgeBg: colors.pessegoClaro,
  corBadgeTexto: colors.marromEscuro,
  corPonto: colors.coral,
};

export function formatarDataIncidente(dataIso, incluirAno = false) {
  if (!dataIso) return '';
  const data = new Date(dataIso);
  if (Number.isNaN(data.getTime())) return String(dataIso);

  const dia = String(data.getDate()).padStart(2, '0');
  const mes = MESES[data.getMonth()];
  const horas = String(data.getHours()).padStart(2, '0');
  const minutos = String(data.getMinutes()).padStart(2, '0');

  return incluirAno
    ? `${dia} ${mes} ${data.getFullYear()}, ${horas}:${minutos}`
    : `${dia} ${mes}, ${horas}:${minutos}`;
}

export function formatarDataIsoParaInput(dataIso) {
  const data = dataIso ? new Date(dataIso) : new Date();
  if (Number.isNaN(data.getTime())) return String(dataIso || '');

  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  const horas = String(data.getHours()).padStart(2, '0');
  const minutos = String(data.getMinutes()).padStart(2, '0');
  return `${dia}/${mes}/${ano}, ${horas}:${minutos}`;
}

// Converte "DD/MM/AAAA, HH:mm" (ou ISO) em string ISO para enviar à API.
export function converterDataInputParaIso(texto) {
  const limpo = String(texto || '').trim();
  if (!limpo) return null;

  const match = limpo.match(/^(\d{2})\/(\d{2})\/(\d{4})(?:,?\s+(\d{2}):(\d{2}))?$/);
  if (match) {
    const [, dia, mes, ano, hora = '00', min = '00'] = match;
    const data = new Date(Number(ano), Number(mes) - 1, Number(dia), Number(hora), Number(min));
    if (
      data.getFullYear() === Number(ano)
      && data.getMonth() === Number(mes) - 1
      && data.getDate() === Number(dia)
    ) {
      return data.toISOString();
    }
    return null;
  }

  const direta = new Date(limpo);
  return Number.isNaN(direta.getTime()) ? null : direta.toISOString();
}

export function extrairEvidencias(anexoUrl) {
  if (!anexoUrl || typeof anexoUrl !== 'string') {
    return { tipos: [], label: '', cards: [] };
  }

  const texto = anexoUrl.toLowerCase();
  const tipos = [];
  const cards = [];
  const partesLabel = [];

  if (texto.includes('audio') || texto.includes('.m4a') || texto.includes('.mp3')) {
    tipos.push('audio');
    partesLabel.push('1 áudio');
    cards.push({
      id: 'ev-audio',
      tipo: 'audio',
      label: 'Áudio gravado',
      corBg: colors.verdeClaro,
      corTexto: colors.verdeProfundo,
      icone: 'mic-outline',
    });
  }

  if (texto.includes('print') || texto.includes('captura') || texto.includes('.png')) {
    tipos.push('captura');
    partesLabel.push('1 captura');
    cards.push({
      id: 'ev-captura',
      tipo: 'captura',
      label: 'Captura',
      corBg: colors.pessegoClaro,
      corTexto: colors.marromEscuro,
      icone: 'image-outline',
    });
  }

  if (texto.includes('foto') || texto.includes('.jpg') || texto.includes('.jpeg')) {
    tipos.push('foto');
    partesLabel.push('1 foto');
    cards.push({
      id: 'ev-foto',
      tipo: 'foto',
      label: 'Foto',
      corBg: colors.amareloClaro,
      corTexto: colors.amareloProfundo,
      icone: 'camera-outline',
    });
  }

  if (cards.length === 0) {
    partesLabel.push('1 anexo');
    cards.push({
      id: 'ev-anexo',
      tipo: 'geral',
      label: 'Evidência',
      corBg: colors.pessegoClaro,
      corTexto: colors.marromEscuro,
      icone: 'document-outline',
    });
  }

  return {
    tipos,
    label: partesLabel.join(' e '),
    cards,
  };
}

export function montarAnexoEvidenciaUrl(evidenciasSelecionadas) {
  if (!Array.isArray(evidenciasSelecionadas) || evidenciasSelecionadas.length === 0) {
    return null;
  }

  const mapaArquivos = {
    audio: 'audio_gravado.m4a',
    captura: 'captura_tela.png',
    foto: 'foto_anexada.jpg',
  };

  const nomes = evidenciasSelecionadas
    .map((tipo) => mapaArquivos[tipo])
    .filter(Boolean);

  return nomes.length > 0 ? nomes.join(', ') : null;
}

export function resumirTituloIncidente(incidente) {
  if (!incidente) return 'Incidente';
  if (incidente.local_ocorrencia && incidente.local_ocorrencia.trim()) {
    return incidente.local_ocorrencia.trim();
  }
  const relato = String(incidente.relato_detalhado || '').trim();
  if (!relato) return TIPOS_VIOLENCIA[incidente.tipo_violencia]?.rotulo || 'Incidente';
  return relato.length > 32 ? `${relato.slice(0, 32)}...` : relato;
}
