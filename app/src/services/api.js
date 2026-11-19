// ============================================================
// api: chamadas HTTP do app para a API Node.js/Express (Entrega Final).
// As telas usam as funções daqui, nunca fetch direto.
//   * requisitar(caminho, opcoes): faz o fetch e transforma erro da API em Error
//   * cada integrante acrescenta as funções da sua tabela no fim do arquivo
// Responsável: Alana Caled (issue #66)
// ============================================================

// Endereço da API. Troque SÓ aqui.
//   * Celular físico (Expo Go): IP do computador na mesma rede Wi-Fi.
//     No Windows: `ipconfig`, linha "Endereço IPv4". Ex.: http://192.168.0.10:3333
//   * Emulador Android: http://10.0.2.2:3333
//   * Navegador (tecla w no Expo): http://localhost:3333
export const BASE_URL = 'http://localhost:3333';


// Usuária de teste do api/sql/seed.sql. Até o primeiro acesso (#87) guardar
// o id da usuária real, todas as telas usam este.
export const USUARIA_TESTE_ID = '7b1e4c2a-9f3d-4e8a-b6c1-2d5f8a9e0c31';


// Chama a API e devolve o JSON da resposta.
// Em erro, lança Error com a mensagem da API (a tela mostra no catch).
//   await requisitar('/usuarias/' + id)
//   await requisitar('/contatos', { metodo: 'POST', corpo: { nome: 'Ana' } })
export async function requisitar(caminho, opcoes = {}) {
  const { metodo = 'GET', corpo } = opcoes;

  let resposta;
  try {
    resposta = await fetch(BASE_URL + caminho, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: corpo !== undefined ? JSON.stringify(corpo) : undefined,
    });
  } catch {
    throw new Error('Sem conexão com o servidor. Confira a internet e tente de novo.');
  }

  // Lê o JSON com cuidado: uma resposta vazia ou quebrada não pode travar o app.
  const dados = await resposta.json().catch(() => null);

  if (!resposta.ok) {
    throw new Error(dados?.erro || `Erro ${resposta.status} no servidor.`);
  }
  return dados;
}


// ---------- Usuárias (Alana, #65 / #87) ----------
export function buscarUsuaria(id) {
  return requisitar(`/usuarias/${id}`);
}

export function atualizarUsuaria(id, dados) {
  return requisitar(`/usuarias/${id}`, { metodo: 'PUT', corpo: dados });
}

export function criarUsuaria(dados) {
  return requisitar('/usuarias', { metodo: 'POST', corpo: dados });
}

export function removerUsuaria(id) {
  return requisitar(`/usuarias/${id}`, { metodo: 'DELETE' });
}


// ---------- Contatos de Confiança (Felipe, #70) ----------
export const PRIORIDADES = {
  1: 'Alta',
  2: 'Média',
  3: 'Baixa',
};

export function listarContatos(usuariaId = USUARIA_TESTE_ID) {
  const query = usuariaId ? `?usuaria_id=${usuariaId}` : '';
  return requisitar(`/contatos${query}`);
}

export function buscarContato(id) {
  return requisitar(`/contatos/${id}`);
}

export function criarContato(dados) {
  return requisitar('/contatos', { metodo: 'POST', corpo: dados });
}

export function atualizarContato(id, dados) {
  return requisitar(`/contatos/${id}`, { metodo: 'PUT', corpo: dados });
}

export function removerContato(id) {
  return requisitar(`/contatos/${id}`, { metodo: 'DELETE' });
}


// ---------- Alertas SOS (Higor Domingos, #75 / #76 / #78) ----------
export function listarAlertas(usuariaId) {
  const query = usuariaId ? `?usuaria_id=${usuariaId}` : '';
  return requisitar(`/alertas${query}`);
}

export function buscarAlerta(id) {
  return requisitar(`/alertas/${id}`);
}

export function criarAlerta(dados) {
  return requisitar('/alertas', { metodo: 'POST', corpo: dados });
}

export function atualizarStatusAlerta(id, status_delegacia) {
  return requisitar(`/alertas/${id}`, { metodo: 'PUT', corpo: { status_delegacia } });
}

export function removerAlerta(id) {
  return requisitar(`/alertas/${id}`, { metodo: 'DELETE' });
}

export function buscarPainel() {
  return requisitar('/painel');
}


// ---------- Viagens Seguras e Check-ins (Higor Bueno, #72 / #73) ----------
export function listarViagens(usuariaId) {
  const query = usuariaId ? `?usuaria_id=${usuariaId}` : '';
  return requisitar(`/viagens${query}`);
}

export function buscarViagem(id) {
  return requisitar(`/viagens/${id}`);
}

export function criarViagem(dados) {
  return requisitar('/viagens', { metodo: 'POST', corpo: dados });
}

export function atualizarViagem(id, dados) {
  return requisitar(`/viagens/${id}`, { metodo: 'PUT', corpo: dados });
}

export function encerrarViagem(id) {
  return requisitar(`/viagens/${id}`, {
    metodo: 'PUT',
    corpo: {
      status_viagem: 'CONCLUIDA_COM_SUCESSO',
      finalizado_em: new Date().toISOString(),
    },
  });
}

export function cancelarViagem(id) {
  return requisitar(`/viagens/${id}`, { metodo: 'DELETE' });
}

export function listarCheckins(viagemId) {
  const query = viagemId ? `?viagem_id=${viagemId}` : '';
  return requisitar(`/checkins${query}`);
}

export function criarCheckin(dados) {
  return requisitar('/checkins', { metodo: 'POST', corpo: dados });
}


// ---------- Cofre de Incidentes (João Pedro, #80 / #81) ----------
export function listarIncidentes(usuariaId) {
  const query = usuariaId ? `?usuaria_id=${usuariaId}` : '';
  return requisitar(`/incidentes${query}`);
}

export function buscarIncidente(id) {
  return requisitar(`/incidentes/${id}`);
}

export function criarIncidente(dados) {
  return requisitar('/incidentes', { metodo: 'POST', corpo: dados });
}

export function atualizarIncidente(id, dados) {
  return requisitar(`/incidentes/${id}`, { metodo: 'PUT', corpo: dados });
}

export function removerIncidente(id) {
  return requisitar(`/incidentes/${id}`, { metodo: 'DELETE' });
}
