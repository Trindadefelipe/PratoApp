// ============================================================
// Rotas da tabela VIAGENS_SEGURAS (Modo Deslocamento).
//   GET    /viagens          lista (aceita ?usuaria_id=... para filtrar)
//   GET    /viagens/:id      uma viagem
//   POST   /viagens          inicia nova viagem segura (201)
//   PUT    /viagens/:id      atualiza status_viagem e finalizado_em ("Cheguei segura")
//   DELETE /viagens/:id      cancela/apaga viagem
// Erros: 400 dado inválido ou relacionamento inexistente, 404 id não encontrado.
// Responsável: Higor Bueno (issue #72)
// ============================================================
const express = require('express');
const db = require('../db');
const { ErroApi, validarId, garantirExiste } = require('../erros');

const roteador = express.Router();

const TABELA = 'viagens_seguras';

const CAMPOS = [
    'usuaria_id',
    'origem_descricao',
    'destino_descricao',
    'horario_inicio',
    'previsao_chegada',
    'status_viagem',
    'latitude_destino',
    'longitude_destino',
    'finalizado_em',
];

const STATUS_VALIDOS = ['EM_ANDAMENTO', 'CONCLUIDA_COM_SUCESSO', 'ATRASADA', 'SOS_ACIONADO'];

/**
 * Validação de dados de viagens_seguras conforme o DER.
 * @param {Object} corpo 
 * @param {boolean} parcial (true para PUT)
 */
function validar(corpo, parcial = false) {
    const erros = [];

    // usuaria_id obrigatório no POST
    if (!parcial || corpo.usuaria_id !== undefined) {
        if (!corpo.usuaria_id) {
            erros.push("O campo 'usuaria_id' é obrigatório.");
        }
    }

    // origem_descricao obrigatório no POST
    if (!parcial || corpo.origem_descricao !== undefined) {
        if (typeof corpo.origem_descricao !== 'string' || !corpo.origem_descricao.trim()) {
            erros.push("O campo 'origem_descricao' é obrigatório.");
        } else if (corpo.origem_descricao.length > 200) {
            erros.push("O campo 'origem_descricao' deve ter no máximo 200 caracteres.");
        }
    }

    // destino_descricao obrigatório no POST
    if (!parcial || corpo.destino_descricao !== undefined) {
        if (typeof corpo.destino_descricao !== 'string' || !corpo.destino_descricao.trim()) {
            erros.push("O campo 'destino_descricao' é obrigatório.");
        } else if (corpo.destino_descricao.length > 200) {
            erros.push("O campo 'destino_descricao' deve ter no máximo 200 caracteres.");
        }
    }

    // previsao_chegada obrigatório no POST
    if (!parcial || corpo.previsao_chegada !== undefined) {
        if (!corpo.previsao_chegada) {
            erros.push("O campo 'previsao_chegada' é obrigatório.");
        } else {
            const data = new Date(corpo.previsao_chegada);
            if (isNaN(data.getTime())) {
                erros.push("O campo 'previsao_chegada' precisa ser uma data/hora válida.");
            }
        }
    }

    // horario_inicio (opcional)
    if (corpo.horario_inicio !== undefined && corpo.horario_inicio !== null) {
        const data = new Date(corpo.horario_inicio);
        if (isNaN(data.getTime())) {
            erros.push("O campo 'horario_inicio' precisa ser uma data/hora válida.");
        }
    }

    // finalizado_em (opcional)
    if (corpo.finalizado_em !== undefined && corpo.finalizado_em !== null) {
        const data = new Date(corpo.finalizado_em);
        if (isNaN(data.getTime())) {
            erros.push("O campo 'finalizado_em' precisa ser uma data/hora válida.");
        }
    }

    // status_viagem (se fornecido, deve pertencer aos valores do CHECK)
    if (corpo.status_viagem !== undefined) {
        if (!STATUS_VALIDOS.includes(corpo.status_viagem)) {
            erros.push(`O campo 'status_viagem' deve ser um dos seguintes: ${STATUS_VALIDOS.join(', ')}.`);
        }
    }

    // latitude_destino e longitude_destino (opcionais, mas devem ser números válidos)
    if (corpo.latitude_destino !== undefined && corpo.latitude_destino !== null) {
        if (typeof corpo.latitude_destino !== 'number' || isNaN(corpo.latitude_destino)) {
            erros.push("O campo 'latitude_destino' precisa ser um número válido.");
        } else if (corpo.latitude_destino < -90 || corpo.latitude_destino > 90) {
            erros.push("O campo 'latitude_destino' deve estar entre -90 e 90.");
        }
    }

    if (corpo.longitude_destino !== undefined && corpo.longitude_destino !== null) {
        if (typeof corpo.longitude_destino !== 'number' || isNaN(corpo.longitude_destino)) {
            erros.push("O campo 'longitude_destino' precisa ser um número válido.");
        } else if (corpo.longitude_destino < -180 || corpo.longitude_destino > 180) {
            erros.push("O campo 'longitude_destino' deve estar entre -180 e 180.");
        }
    }

    return erros;
}

/**
 * Validação de integridade referencial: usuaria_id precisa existir na tabela usuarias.
 */
async function conferirRelacionamentos(corpo) {
    if (corpo.usuaria_id !== undefined) {
        await garantirExiste('usuarias', corpo.usuaria_id, 'usuaria_id');
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
// GET /viagens  (e /viagens?usuaria_id=...)
// -------------------------------------------------------------
roteador.get('/', async (req, res) => {
    if (req.query.usuaria_id) {
        validarId(req.query.usuaria_id, 'usuaria_id');
        const { rows } = await db.query(
            `select * from ${TABELA} where usuaria_id = $1 order by horario_inicio desc`,
            [req.query.usuaria_id]
        );
        return res.json(rows);
    }
    const { rows } = await db.query(`select * from ${TABELA} order by horario_inicio desc`);
    res.json(rows);
});

// -------------------------------------------------------------
// GET /viagens/:id
// -------------------------------------------------------------
roteador.get('/:id', async (req, res) => {
    validarId(req.params.id);
    const { rows } = await db.query(`select * from ${TABELA} where id = $1`, [req.params.id]);
    if (rows.length === 0) {
        throw new ErroApi(404, `Viagem ${req.params.id} não encontrada.`);
    }
    res.json(rows[0]);
});

// -------------------------------------------------------------
// POST /viagens
// Cria viagem segura com status inicial EM_ANDAMENTO (ou o informado)
// -------------------------------------------------------------
roteador.post('/', async (req, res) => {
    const corpo = req.body || {};
    const erros = validar(corpo);
    if (erros.length > 0) throw new ErroApi(400, erros.join(' '));

    await conferirRelacionamentos(corpo);

    const dados = somenteCampos(corpo);
    if (!dados.status_viagem) {
        dados.status_viagem = 'EM_ANDAMENTO';
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
// PUT /viagens/:id
// Atualiza viagem (status_viagem, finalizado_em, previsão, etc.)
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
        throw new ErroApi(404, `Viagem ${req.params.id} não encontrada.`);
    }

    res.json(rows[0]);
});

// -------------------------------------------------------------
// DELETE /viagens/:id
// Remove uma viagem
// -------------------------------------------------------------
roteador.delete('/:id', async (req, res) => {
    validarId(req.params.id);
    const { rows } = await db.query(`delete from ${TABELA} where id = $1 returning *`, [req.params.id]);
    if (rows.length === 0) {
        throw new ErroApi(404, `Viagem ${req.params.id} não encontrada.`);
    }
    res.json({ removido: rows[0] });
});

module.exports = roteador;
