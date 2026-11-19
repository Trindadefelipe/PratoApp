// ============================================================
// formatos: textos e cores do painel a partir dos dados da API.
// ============================================================
import { colors } from './theme/colors';

export const STATUS = {
  NOVO: {
    rotulo: 'Novo', plural: 'Novos',
    fundo: colors.coralClaro, texto: colors.coralEscuro, ponto: colors.coral,
  },
  EM_ATENDIMENTO: {
    rotulo: 'Em atendimento', plural: 'Em\natendimento',
    fundo: colors.amareloClaro, texto: colors.amareloProfundo, ponto: colors.amarelo,
  },
  CONCLUIDO: {
    rotulo: 'Concluído', plural: 'Concluídos',
    fundo: colors.verdeClaro, texto: colors.verdeProfundo, ponto: colors.verdeFolha,
  },
};

export const GATILHOS = {
  BOTAO_DIRETO:  { curto: 'Botão SOS',        longo: 'Botão SOS (toque direto)' },
  DURESS_PIN:    { curto: 'PIN de coação',    longo: 'PIN de coação (SOS silencioso)' },
  FALTA_CHECKIN: { curto: 'Falta de check-in', longo: 'Falta de check-in na viagem' },
  SHAKE:         { curto: 'Celular sacudido', longo: 'Celular sacudido (gatilho de movimento)' },
};

export function infoStatus(status) {
  return STATUS[status] || STATUS.NOVO;
}

export function infoGatilho(tipo) {
  return GATILHOS[tipo] || { curto: tipo || 'Alerta', longo: tipo || 'Alerta' };
}

const dois = (n) => String(n).padStart(2, '0');
const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

export function hora(dataIso, comSegundos = false) {
  const d = new Date(dataIso);
  if (Number.isNaN(d.getTime())) return '--:--';
  return comSegundos
    ? `${dois(d.getHours())}:${dois(d.getMinutes())}:${dois(d.getSeconds())}`
    : `${dois(d.getHours())}:${dois(d.getMinutes())}`;
}

// "Agora · 21:47" nos últimos 5 minutos, "21:47" hoje e "18 nov, 21:47" em outros dias.
export function quando(dataIso, agora = new Date()) {
  const d = new Date(dataIso);
  if (Number.isNaN(d.getTime())) return '';
  const minutos = (agora - d) / 60000;
  if (minutos >= 0 && minutos < 5) return `Agora · ${hora(dataIso)}`;
  const mesmoDia = d.toDateString() === agora.toDateString();
  return mesmoDia ? hora(dataIso) : `${d.getDate()} ${MESES[d.getMonth()]}, ${hora(dataIso)}`;
}

// Número curto e estável para o alerta, a partir do id (UUID).
export function codigoAlerta(id) {
  return String(id || '').replace(/-/g, '').slice(-4).toUpperCase();
}

export function coordenadas(lat, lng) {
  const f = (v) => Number(v).toFixed(4).replace('.', ',');
  return `${f(lat)}, ${f(lng)}`;
}

export function endereco(alerta) {
  return `${alerta.endereco_aproximado || 'Endereço não informado'} (aprox.)`;
}
