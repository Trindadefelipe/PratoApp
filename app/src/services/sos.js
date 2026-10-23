// ============================================================
// Serviço de SOS Silencioso (Entrega 2 / Issue #57)
//
// Responsável: Higor Domingos
//
// COMO CHAMAR ESTA FUNÇÃO (instruções para Alana / outros integrantes):
// ------------------------------------------------------------
// Nome: dispararSos (ou import padrão dispararSos)
// Caminho de importação:
//   import { dispararSos } from '../../services/sos'; // ajuste os níveis de pasta conforme o arquivo
//   // ou: import dispararSos from '../services/sos';
//
// Parâmetros:
//   tipoGatilho (string): 'botao' | 'duress_pin' | 'deslocamento'
//   detalhes (object, opcional): { latitude, longitude, endereco_aproximado, viagem_id, ... }
//
// Retorno:
//   Promise<{ sucesso: boolean, alerta: object }>
//
// Exemplo de uso no PIN de coação (Alana - Issue #37):
//   await dispararSos({ tipoGatilho: 'duress_pin' });
// ============================================================

import { usuaria } from '../data/usuaria';

export const TIPOS_GATILHO = {
  BOTAO: 'botao',
  DURESS_PIN: 'duress_pin',
  DESLOCAMENTO: 'deslocamento',
};

/**
 * Dispara o alerta de SOS silencioso.
 * Na Entrega 2, registra o evento no console.log com data/hora e tipo de gatilho.
 * O envio via API e captura real de GPS (expo-location) serão integrados na Entrega 3.
 *
 * @param {Object} params
 * @param {'botao' | 'duress_pin' | 'deslocamento'} params.tipoGatilho - Gatilho que originou o SOS
 * @param {Object} [params.detalhes] - Informações adicionais opcionais
 * @returns {Promise<{sucesso: boolean, alerta: Object}>}
 */
export async function dispararSos({ tipoGatilho = TIPOS_GATILHO.BOTAO, detalhes = {} } = {}) {
  const dataHora = new Date().toISOString();

  // Log obrigatório para a Entrega 2 (Issue #57)
  console.log('🚨 [SOS SILENCIOSO ACIONADO]');
  console.log(`   ├─ Gatilho: ${tipoGatilho}`);
  console.log(`   ├─ Data/Hora: ${dataHora}`);
  console.log(`   └─ Detalhes: ${JSON.stringify(detalhes)}`);

  const alertaCriado = {
    id: Date.now(),
    usuaria_id: usuaria.id,
    viagem_id: detalhes.viagem_id || null,
    latitude: detalhes.latitude || -23.3045,
    longitude: detalhes.longitude || -51.1696,
    endereco_aproximado: detalhes.endereco_aproximado || 'Londrina/PR',
    tipo_gatilho: tipoGatilho,
    status_delegacia: 'Em atendimento',
    criado_em: dataHora,
    atualizado_em: dataHora,
  };

  return {
    sucesso: true,
    alerta: alertaCriado,
  };
}

export default dispararSos;
