// ============================================================
// Rotas da tabela CONTATOS_CONFIANCA (Círculo de Confiança).
//   GET    /contatos          lista (aceita ?usuaria_id=... para filtrar)
//   GET    /contatos/:id      um contato
//   POST   /contatos          cria       (201)
//   PUT    /contatos/:id      atualiza só os campos enviados
//   DELETE /contatos/:id      apaga
// Erros: 400 dado inválido ou relacionamento inexistente, 404 id não encontrado.
// Responsável: Felipe Trindade (issue #69)
// ============================================================
const express = require('express');
const db = require('../db');
const { ErroApi, validarId, garantirExiste } = require('../erros');

const roteador = express.Router();

// Nome da tabela no banco.
const TABELA = 'contatos_confianca';

// Campos que o app pode enviar (iguais ao DER).
// id e criado_em o banco preenche sozinho.
const CAMPOS = [
    'usuaria_id',
    'nome',
    'telefone',
    'parentesco_relacao',
    'nivel_prioridade',
    'notificar_sms',
    'notificar_whatsapp'
];

// Regras da tabela. Devolve a lista de erros (vazia = tudo certo).
// "parcial" = true no PUT: só confere os campos que vieram no pedido.
function validar(corpo, parcial = false) {
    const erros = [];

    if (!parcial && corpo.usuaria_id === undefined) {
        erros.push("O campo 'usuaria_id' é obrigatório.");
    }

    if (!parcial || corpo.nome !== undefined) {
        if (typeof corpo.nome !== 'string' || !corpo.nome.trim()) {
            erros.push("O campo 'nome' é obrigatório.");
        } else if (corpo.nome.length > 100) {
            erros.push("O campo 'nome' não pode ter mais de 100 caracteres.");
        }
    }

    if (!parcial || corpo.telefone !== undefined) {
        if (typeof corpo.telefone !== 'string' || !corpo.telefone.trim()) {
            erros.push("O campo 'telefone' é obrigatório.");
        } else if (corpo.telefone.length > 20) {
            erros.push("O campo 'telefone' não pode ter mais de 20 caracteres.");
        }
    }

    if (!parcial || corpo.parentesco_relacao !== undefined) {
        if (typeof corpo.parentesco_relacao !== 'string' || !corpo.parentesco_relacao.trim()) {
            erros.push("O campo 'parentesco_relacao' é obrigatório.");
        } else if (corpo.parentesco_relacao.length > 50) {
            erros.push("O campo 'parentesco_relacao' não pode ter mais de 50 caracteres.");
        }
    }

    if (!parcial && corpo.nivel_prioridade === undefined) {
        erros.push("O campo 'nivel_prioridade' é obrigatório.");
    } else if (corpo.nivel_prioridade !== undefined) {
        const prioridade = Number(corpo.nivel_prioridade);
        if (!Number.isInteger(prioridade) || ![1, 2, 3].includes(prioridade)) {
            erros.push("O campo 'nivel_prioridade' deve ser 1 (Alta), 2 (Média) ou 3 (Baixa).");
        }
    }

    if (corpo.notificar_sms !== undefined && typeof corpo.notificar_sms !== 'boolean') {
        erros.push("O campo 'notificar_sms' precisa ser true ou false.");
    }

    if (corpo.notificar_whatsapp !== undefined && typeof corpo.notificar_whatsapp !== 'boolean') {
        erros.push("O campo 'notificar_whatsapp' precisa ser true ou false.");
    }

    return erros;
}

// Relacionamentos reais: o registro da usuária precisa existir de verdade no banco.
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

function naoEncontrado(id) {
    return new ErroApi(404, `Contato ${id} não encontrado.`);
}

// GET /contatos  (e /contatos?usuaria_id=...)
// Ordena sempre por nivel_prioridade asc (1=Alta primeiro), depois por criado_em desc.
roteador.get('/', async (req, res) => {
    if (req.query.usuaria_id) {
        validarId(req.query.usuaria_id, 'usuaria_id');
        const { rows } = await db.query(
            `select * from ${TABELA} where usuaria_id = $1 order by nivel_prioridade asc, criado_em desc`,
            [req.query.usuaria_id]
        );
        return res.json(rows);
    }
    const { rows } = await db.query(`select * from ${TABELA} order by nivel_prioridade asc, criado_em desc`);
    res.json(rows);
});

// GET /contatos/:id
roteador.get('/:id', async (req, res) => {
    validarId(req.params.id);
    const { rows } = await db.query(`select * from ${TABELA} where id = $1`, [req.params.id]);
    if (rows.length === 0) throw naoEncontrado(req.params.id);
    res.json(rows[0]);
});

// POST /contatos
roteador.post('/', async (req, res) => {
    const corpo = req.body || {};
    const erros = validar(corpo);
    if (erros.length > 0) throw new ErroApi(400, erros.join(' '));
    await conferirRelacionamentos(corpo);

    const dados = somenteCampos(corpo);
    // Defaults booleanos caso não enviados
    if (dados.notificar_sms === undefined) dados.notificar_sms = true;
    if (dados.notificar_whatsapp === undefined) dados.notificar_whatsapp = true;

    const colunas = Object.keys(dados);
    const marcas = colunas.map((_, i) => `$${i + 1}`);
    const { rows } = await db.query(
        `insert into ${TABELA} (${colunas.join(', ')}) values (${marcas.join(', ')}) returning *`,
        Object.values(dados),
    );
    res.status(201).json(rows[0]);
});

// PUT /contatos/:id  (só os campos enviados)
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
    if (rows.length === 0) throw naoEncontrado(req.params.id);
    res.json(rows[0]);
});

// DELETE /contatos/:id
roteador.delete('/:id', async (req, res) => {
    validarId(req.params.id);
    const { rows } = await db.query(`delete from ${TABELA} where id = $1 returning *`, [req.params.id]);
    if (rows.length === 0) throw naoEncontrado(req.params.id);
    res.json({ removido: rows[0] });
});

module.exports = roteador;
