// ============================================================
// MODELO DE ROTAS: copie este arquivo para criar as rotas da sua tabela.
//   1. Copie para src/rotas/<caminho>.js (ex.: contatos.js vira /contatos).
//      Arquivos que começam com "_" (como este) não são carregados.
//   2. Troque TABELA, CAMPOS e as regras de validar() pelas da sua tabela (DER).
//   3. Se a tabela aponta para outra (usuaria_id, viagem_id), confira com garantirExiste().
//   4. Rode `npm run dev` e teste as 5 rotas (Postman, Insomnia ou Thunder Client).
//
// Rotas que este modelo cria:
//   GET    /caminho          lista (aceita ?usuaria_id=... para filtrar)
//   GET    /caminho/:id      um registro
//   POST   /caminho          cria       (201)
//   PUT    /caminho/:id      atualiza só os campos enviados
//   DELETE /caminho/:id      apaga
// Erros: 400 dado inválido ou relacionamento inexistente, 404 id não encontrado.
// ============================================================
const express = require('express');
const db = require('../db');
const { ErroApi, validarId, garantirExiste } = require('../erros');

const roteador = express.Router();

// Nome da tabela no banco e campos que o app pode enviar (iguais ao DER).
// Não coloque aqui id nem criado_em: o banco preenche sozinho.
const TABELA = 'minha_tabela';
const CAMPOS = ['usuaria_id', 'nome', 'descricao'];

// Regras da sua tabela. Devolve a lista de erros (vazia = tudo certo).
// "parcial" = true no PUT: só confere os campos que vieram no pedido.
function validar(corpo, parcial = false) {
    const erros = [];
    if (!parcial || corpo.nome !== undefined) {
        if (typeof corpo.nome !== 'string' || !corpo.nome.trim()) {
            erros.push("O campo 'nome' é obrigatório.");
        }
    }
    if (!parcial && corpo.usuaria_id === undefined) {
        erros.push("O campo 'usuaria_id' é obrigatório.");
    }
    return erros;
}

// Relacionamentos reais: o registro ligado precisa existir de verdade.
async function conferirRelacionamentos(corpo) {
    if (corpo.usuaria_id !== undefined) {
        await garantirExiste('usuarias', corpo.usuaria_id, 'usuaria_id');
    }
}

// Pega do corpo só os campos permitidos (ignora o resto).
function somenteCampos(corpo) {
    const dados = {};
    for (const campo of CAMPOS) {
        if (corpo[campo] !== undefined) dados[campo] = corpo[campo];
    }
    return dados;
}

// GET /caminho  (e /caminho?usuaria_id=...)
roteador.get('/', async (req, res) => {
    if (req.query.usuaria_id) {
        validarId(req.query.usuaria_id, 'usuaria_id');
        const { rows } = await db.query(`select * from ${TABELA} where usuaria_id = $1 order by criado_em desc`, [req.query.usuaria_id]);
        return res.json(rows);
    }
    const { rows } = await db.query(`select * from ${TABELA} order by criado_em desc`);
    res.json(rows);
});

// GET /caminho/:id
roteador.get('/:id', async (req, res) => {
    validarId(req.params.id);
    const { rows } = await db.query(`select * from ${TABELA} where id = $1`, [req.params.id]);
    if (rows.length === 0) throw new ErroApi(404, `Registro ${req.params.id} não encontrado.`);
    res.json(rows[0]);
});

// POST /caminho
roteador.post('/', async (req, res) => {
    const corpo = req.body || {};
    const erros = validar(corpo);
    if (erros.length > 0) throw new ErroApi(400, erros.join(' '));
    await conferirRelacionamentos(corpo);

    const dados = somenteCampos(corpo);
    const colunas = Object.keys(dados);
    const marcas = colunas.map((_, i) => `$${i + 1}`);
    const { rows } = await db.query(
        `insert into ${TABELA} (${colunas.join(', ')}) values (${marcas.join(', ')}) returning *`,
        Object.values(dados),
    );
    res.status(201).json(rows[0]);
});

// PUT /caminho/:id  (só os campos enviados)
roteador.put('/:id', async (req, res) => {
    validarId(req.params.id);
    const corpo = req.body || {};
    const erros = validar(corpo, true);
    if (erros.length > 0) throw new ErroApi(400, erros.join(' '));
    await conferirRelacionamentos(corpo);

    const dados = somenteCampos(corpo);
    const colunas = Object.keys(dados);
    if (colunas.length === 0) throw new ErroApi(400, 'Nenhum campo para atualizar.');
    const sets = colunas.map((coluna, i) => `${coluna} = $${i + 1}`);
    const { rows } = await db.query(
        `update ${TABELA} set ${sets.join(', ')} where id = $${colunas.length + 1} returning *`,
        [...Object.values(dados), req.params.id],
    );
    if (rows.length === 0) throw new ErroApi(404, `Registro ${req.params.id} não encontrado.`);
    res.json(rows[0]);
});

// DELETE /caminho/:id
roteador.delete('/:id', async (req, res) => {
    validarId(req.params.id);
    const { rows } = await db.query(`delete from ${TABELA} where id = $1 returning *`, [req.params.id]);
    if (rows.length === 0) throw new ErroApi(404, `Registro ${req.params.id} não encontrado.`);
    res.json({ removido: rows[0] });
});

module.exports = roteador;
