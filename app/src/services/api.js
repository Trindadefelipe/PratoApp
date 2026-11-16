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


// ---------- Usuárias (Alana, #65) ----------
export function buscarUsuaria(id) {
  return requisitar(`/usuarias/${id}`);
}

export function atualizarUsuaria(id, dados) {
  return requisitar(`/usuarias/${id}`, { metodo: 'PUT', corpo: dados });
}

export function criarUsuaria(dados) {
  return requisitar('/usuarias', { metodo: 'POST', corpo: dados });
}

