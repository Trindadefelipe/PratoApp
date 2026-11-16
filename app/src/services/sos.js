// ============================================================
// Serviço de SOS Silencioso (Entrega Final / Issues #75 e #76)
//
// Responsável: Higor Domingos
//
// Integração real com a API Node.js/Express (Supabase) via POST /alertas.
// Não utiliza mais dados simulados ou mocks locais.
//
// Regra crítica de segurança da vítima:
// Quando o gatilho for DURESS_PIN (coação), nenhum erro de rede
// ou aviso visual pode ser exibido para não alertar o agressor.
// ============================================================

import { criarAlerta, USUARIA_TESTE_ID } from './api';
import { lerIdUsuaria } from './sessao';

export const TIPOS_GATILHO = {
  BOTAO: 'BOTAO_DIRETO',
  DURESS_PIN: 'DURESS_PIN',
  DESLOCAMENTO: 'FALTA_CHECKIN',
  SHAKE: 'SHAKE',
};

// Mapeamento de compatibilidade para quem chama com termos da Entrega 2
function normalizarGatilho(gatilho) {
  if (!gatilho) return TIPOS_GATILHO.BOTAO;
  const g = String(gatilho).toLowerCase();
  if (g === 'botao' || g === 'botao_direto') return 'BOTAO_DIRETO';
  if (g === 'duress_pin' || g === 'coacao') return 'DURESS_PIN';
  if (g === 'deslocamento' || g === 'falta_checkin') return 'FALTA_CHECKIN';
  if (g === 'shake' || g === 'agitar_celular') return 'SHAKE';
  return 'BOTAO_DIRETO';
}

/**
 * Dispara o alerta de SOS silencioso gravando diretamente no Supabase via API.
 *
 * @param {Object} params
 * @param {string} [params.tipoGatilho] - Gatilho ('BOTAO_DIRETO', 'DURESS_PIN', etc.)
 * @param {Object} [params.detalhes] - Coordenadas e metadados opcionais
 * @returns {Promise<{sucesso: boolean, alerta: Object, erro?: string}>}
 */
export async function dispararSos({ tipoGatilho = TIPOS_GATILHO.BOTAO, detalhes = {} } = {}) {
  const gatilhoFormatado = normalizarGatilho(tipoGatilho);
  const dataHora = new Date().toISOString();

  console.log('🚨 [SOS SILENCIOSO ACIONADO]');
  console.log(`   ├─ Gatilho: ${gatilhoFormatado}`);
  console.log(`   ├─ Data/Hora: ${dataHora}`);
  console.log(`   └─ Detalhes: ${JSON.stringify(detalhes)}`);

  // Identificação da usuária: celular ou usuária padrão de teste
  let usuariaId = USUARIA_TESTE_ID;
  try {
    const idSessao = await lerIdUsuaria();
    if (idSessao) usuariaId = idSessao;
  } catch (e) {
    console.warn('[SOS] Falha ao ler ID da sessão, usando usuária de teste:', e.message);
  }

  // Coordenadas: informadas ou coordenadas de Londrina/PR
  const latitude = typeof detalhes.latitude === 'number' ? detalhes.latitude : -23.3045;
  const longitude = typeof detalhes.longitude === 'number' ? detalhes.longitude : -51.1696;
  const enderecoAproximado = detalhes.endereco_aproximado || 'Londrina/PR';

  const payload = {
    usuaria_id: usuariaId,
    latitude,
    longitude,
    endereco_aproximado: enderecoAproximado,
    tipo_gatilho: gatilhoFormatado,
    status_delegacia: 'NOVO',
  };

  if (detalhes.viagem_id) {
    payload.viagem_id = detalhes.viagem_id;
  }

  try {
    const alertaGravado = await criarAlerta(payload);
    console.log('✅ [SOS] Alerta persistido na API com sucesso:', alertaGravado?.id);
    return {
      sucesso: true,
      alerta: alertaGravado,
    };
  } catch (erro) {
    console.error('❌ [SOS] Falha ao gravar alerta na API:', erro.message);

    // Proteção de vida: em modo coação (DURESS_PIN), engole o erro para não alertar o agressor
    if (gatilhoFormatado === 'DURESS_PIN') {
      return {
        sucesso: false,
        alerta: { ...payload, id: 'fallback-silencioso', criado_em: dataHora },
        erro: erro.message,
      };
    }

    throw erro;
  }
}

export default dispararSos;
