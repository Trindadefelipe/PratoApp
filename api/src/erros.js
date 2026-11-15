// ============================================================
// erros: o padrão de erro da API, usado por todas as rotas.
// Toda resposta de erro sai no formato { erro: "mensagem" }.
//   * 400: dados inválidos ou relacionamento que não existe
//   * 404: id ou rota que não existe
//   * 500: erro interno (a mensagem real só aparece no terminal)
//
// Nas rotas, para recusar um pedido:
//     throw new ErroApi(400, "O campo 'nome' é obrigatório.");
// O Express 5 entrega o erro ao tratarErros sozinho, mesmo em função async.
// Responsável: Alana Caled (issue #64)
// ============================================================
const db = require('./db');

class ErroApi extends Error {
    constructor(status, mensagem) {
        super(mensagem);
        this.status = status;
    }
}

const FORMATO_UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Confere se o id tem formato de UUID. Sem isso, o banco devolveria erro 500.
function validarId(id, campo = 'id') {
    if (typeof id !== 'string' || !FORMATO_UUID.test(id)) {
        throw new ErroApi(400, `O campo '${campo}' precisa ser um UUID válido.`);
    }
}

// Confere se um registro existe em outra tabela (relacionamento real, item 3 do checklist).
// Exemplo: await garantirExiste('usuarias', corpo.usuaria_id, 'usuaria_id');
const TABELAS = ['usuarias', 'contatos_confianca', 'viagens_seguras', 'checkins_viagem', 'alertas_sos', 'cofre_incidentes'];

async function garantirExiste(tabela, id, campo) {
    if (!TABELAS.includes(tabela)) {
        throw new Error(`Tabela desconhecida: ${tabela}`);
    }
    validarId(id, campo);
    const { rowCount } = await db.query(`select 1 from ${tabela} where id = $1`, [id]);
    if (rowCount === 0) {
        throw new ErroApi(400, `O ${campo} informado não existe em ${tabela}.`);
    }
}

// Último middleware do server.js: transforma qualquer erro em resposta JSON.
function tratarErros(erro, req, res, next) {
    if (erro instanceof ErroApi) {
        return res.status(erro.status).json({ erro: erro.message });
    }

    // JSON mal escrito no corpo do pedido
    if (erro.type === 'entity.parse.failed') {
        return res.status(400).json({ erro: 'O corpo do pedido não é um JSON válido.' });
    }

    // Erros do PostgreSQL que são culpa do pedido, e não do servidor
    switch (erro.code) {
        case '23505': // valor repetido em campo único (ex.: e-mail)
            return res.status(400).json({ erro: `Valor repetido: ${erro.detail || 'já existe um registro com esse valor.'}` });
        case '23503': // chave estrangeira que não existe, ou registro ainda usado por outro
            return res.status(400).json({ erro: 'Relacionamento inválido: o registro ligado não existe ou ainda está em uso.' });
        case '23502': // campo obrigatório vazio
            return res.status(400).json({ erro: `O campo '${erro.column}' é obrigatório.` });
        case '23514': // regra CHECK do schema.sql (valor fora da lista, PINs iguais...)
            return res.status(400).json({ erro: `Valor não aceito pela regra '${erro.constraint}'.` });
        case '22P02': // texto no lugar de número, UUID inválido...
        case '22007': // data inválida
        case '22008':
            return res.status(400).json({ erro: 'Formato de dado inválido.' });
        case '22001': // texto maior que o campo
            return res.status(400).json({ erro: 'Um dos textos é maior que o tamanho permitido.' });
        default:
            console.error('Erro interno:', erro);
            return res.status(500).json({ erro: 'Erro interno no servidor.' });
    }
}

module.exports = { ErroApi, validarId, garantirExiste, tratarErros };
