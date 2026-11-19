// ============================================================
// Rotas da tabela CHECKINS_VIAGEM (Check-ins periódicos do trajeto).
//   GET    /checkins         lista (aceita ?viagem_id=... para filtrar)
//   GET    /checkins/:id     um check-in
//   POST   /checkins         registra novo check-in da viagem (201)
//   PUT    /checkins/:id     atualiza status_resposta (ex.: CONFIRMADO)
//   DELETE /checkins/:id     apaga check-in
// Erros: 400 dado inválido ou relacionamento inexistente, 404 id não encontrado.
// Responsável: Higor Bueno (issue #72)
// ============================================================
const express = require('express');
const db = require('../db');
const { ErroApi, validarId, garantirExiste } = require('../erros');

const roteador = express.Router();

const TABELA = 'checkins_viagem';

const CAMPOS = [
    'viagem_id',
    'horario_checkin',
    'latitude_atual',
    'longitude_atual',
    'status_resposta',
];

const STATUS_VALIDOS = ['PENDENTE', 'CONFIRMADO', 'EXPIRADO'];

/**
 * Validação de dados de checkins_viagem conforme o DER.
 * @param {Object} corpo 
 * @param {boolean} parcial (true para PUT)
 */
function validar(corpo, parcial = false) {
    const erros = [];

    // viagem_id obrigatório no POST
    if (!parcial || corpo.viagem_id !== undefined) {
        if (!corpo.viagem_id) {
            erros.push("O campo 'viagem_id' é obrigatório.");
        }
    }

    // horario_checkin (opcional, default current_timestamp)
    if (corpo.horario_checkin !== undefined && corpo.horario_checkin !== null) {
        const data = new Date(corpo.horario_checkin);
        if (isNaN(data.getTime())) {
            erros.push("O campo 'horario_checkin' precisa ser uma data/hora válida.");
        }
    }

    // status_resposta (se fornecido, deve pertencer aos valores do CHECK)
    if (corpo.status_resposta !== undefined) {
        if (!STATUS_VALIDOS.includes(corpo.status_resposta)) {
            erros.push(`O campo 'status_resposta' deve ser um dos seguintes: ${STATUS_VALIDOS.join(', ')}.`);
        }
    }

    // latitude_atual e longitude_atual (opcionais, mas devem ser válidos)
    if (corpo.latitude_atual !== undefined && corpo.latitude_atual !== null) {
        if (typeof corpo.latitude_atual !== 'number' || isNaN(corpo.latitude_atual)) {
            erros.push("O campo 'latitude_atual' precisa ser um número válido.");
        } else if (corpo.latitude_atual < -90 || corpo.latitude_atual > 90) {
            erros.push("O campo 'latitude_atual' deve estar entre -90 e 90.");
        }
    }

    if (corpo.longitude_atual !== undefined && corpo.longitude_atual !== null) {
        if (typeof corpo.longitude_atual !== 'number' || isNaN(corpo.longitude_atual)) {
            erros.push("O campo 'longitude_atual' precisa ser um número válido.");
        } else if (corpo.longitude_atual < -180 || corpo.longitude_atual > 180) {
            erros.push("O campo 'longitude_atual' deve estar entre -180 e 180.");
        }
    }

    return erros;
}

/**
 * Validação de integridade referencial: viagem_id precisa existir em viagens_seguras.
 */
async function conferirRelacionamentos(corpo) {
    if (corpo.viagem_id !== undefined) {
        await garantirExiste('viagens_seguras', corpo.viagem_id, 'viagem_id');
    }
}

function somenteCampos(corpo) {
    const dados = {};
    for (const campo of CAMPOS) {
        if (corpo[campo] !== undefined) dados[campo] = corpo[campo];
    }
    return dados;
}

// -------------------------------------------------------------
// GET /checkins  (e /checkins?viagem_id=...)
// -------------------------------------------------------------
roteador.get('/', async (req, res) => {
    if (req.query.viagem_id) {
        validarId(req.query.viagem_id, 'viagem_id');
        const { rows } = await db.query(
            `select * from ${TABELA} where viagem_id = $1 order by horario_checkin desc`,
            [req.query.viagem_id]
        );
        return res.json(rows);
    }
    const { rows } = await db.query(`select * from ${TABELA} order by horario_checkin desc`);
    res.json(rows);
});

// -------------------------------------------------------------
// GET /checkins/:id
// -------------------------------------------------------------
roteador.get('/:id', async (req, res) => {
    validarId(req.params.id);
    const { rows } = await db.query(`select * from ${TABELA} where id = $1`, [req.params.id]);
    if (rows.length === 0) {
        throw new ErroApi(404, `Check-in ${req.params.id} não encontrado.`);
    }
    res.json(rows[0]);
});

// -------------------------------------------------------------
// POST /checkins
// Registra check-in para a viagem
// -------------------------------------------------------------
roteador.post('/', async (req, res) => {
    const corpo = req.body || {};
    const erros = validar(corpo);
    if (erros.length > 0) throw new ErroApi(400, erros.join(' '));

    await conferirRelacionamentos(corpo);

    const dados = somenteCampos(corpo);
    if (!dados.status_resposta) {
        dados.status_resposta = 'PENDENTE';
    }

    const colunas = Object.keys(dados);
    const placeholders = colunas.map((_, i) => `$${i + 1}`);

    const { rows } = await db.query(
        `insert into ${TABELA} (${colunas.join(', ')}) values (${placeholders.join(', ')}) returning *`,
        Object.values(dados)
    );

    res.status(201).json(rows[0]);
});

// -------------------------------------------------------------
// PUT /checkins/:id
// Atualiza check-in (ex.: status_resposta para CONFIRMADO)
// -------------------------------------------------------------
roteador.put('/:id', async (req, res) => {
    validarId(req.params.id);
    const corpo = req.body || {};
    const erros = validar(corpo, true);
    if (erros.length > 0) throw new ErroApi(400, erros.join(' '));

    await conferirRelacionamentos(corpo);

    const dados = somenteCampos(corpo);
    const colunas = Object.keys(dados);
    if (colunas.length === 0) throw new ErroApi(400, 'Nenhum campo para atualizar.');

    const sets = colunas.map((col, i) => `${col} = $${i + 1}`);
    const valores = Object.values(dados);

    const { rows } = await db.query(
        `update ${TABELA} set ${sets.join(', ')} where id = $${valores.length + 1} returning *`,
        [...valores, req.params.id]
    );

    if (rows.length === 0) {
        throw new ErroApi(404, `Check-in ${req.params.id} não encontrado.`);
    }

    res.json(rows[0]);
});

// -------------------------------------------------------------
// DELETE /checkins/:id
// Remove um check-in
// -------------------------------------------------------------
roteador.delete('/:id', async (req, res) => {
    validarId(req.params.id);
    const { rows } = await db.query(`delete from ${TABELA} where id = $1 returning *`, [req.params.id]);
    if (rows.length === 0) {
        throw new ErroApi(404, `Check-in ${req.params.id} não encontrado.`);
    }
    res.json({ removido: rows[0] });
});

module.exports = roteador;
