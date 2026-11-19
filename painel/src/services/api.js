// ============================================================
// api: chamadas do painel para a API Node.js/Express.
//   * GET /alertas            todos os alertas (para a lista e os contadores)
//   * GET /painel             alertas abertos com a viagem (Higor Domingos, #78)
//   * GET /contatos?usuaria_id Círculo de Confiança avisado
//   * PUT /alertas/:id        muda o status do atendimento
// ============================================================

// Endereço da API. Troque SÓ aqui se a API rodar em outro computador.
export const BASE_URL = 'http://localhost:3333';

async function requisitar(caminho, opcoes = {}) {
  const { metodo = 'GET', corpo } = opcoes;
  let resposta;
  try {
    resposta = await fetch(BASE_URL + caminho, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: corpo !== undefined ? JSON.stringify(corpo) : undefined,
    });
  } catch {
    throw new Error('Sem conexão com a API. Confira se ela está rodando (npm run dev na pasta api).');
  }
  const dados = await resposta.json().catch(() => null);
  if (!resposta.ok) {
    throw new Error(dados?.erro || `Erro ${resposta.status} na API.`);
  }
  return dados;
}

export function listarAlertas() {
  return requisitar('/alertas');
}

export function buscarPainel() {
  return requisitar('/painel');
}

export function listarContatos(usuariaId) {
  return requisitar(`/contatos?usuaria_id=${usuariaId}`);
}

export function mudarStatus(id, status_delegacia) {
  return requisitar(`/alertas/${id}`, { metodo: 'PUT', corpo: { status_delegacia } });
}
