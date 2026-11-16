// ============================================================
// Rotas da tabela ALERTAS_SOS (Alertas e SOS Silencioso).
//   GET    /alertas          lista (aceita ?usuaria_id=... para filtrar)
//   GET    /alertas/:id      um alerta
//   POST   /alertas          cria alerta (201)
//   PUT    /alertas/:id      atualiza status_delegacia e atualizado_em
//   DELETE /alertas/:id      apaga alerta
// Erros: 400 dado inválido ou relacionamento inexistente, 404 id não encontrado.
// Responsável: Higor Domingos (issue #75)
// ============================================================
const express = require('express');
const db = require('../db');
const { ErroApi, validarId, garantirExiste } = require('../erros');

const roteador = express.Router();

const TABELA = 'alertas_sos';

// Campos permitidos no POST e PUT conforme modelagem DER (sql/schema.sql)
const CAMPOS = [
    'usuaria_id',
    'viagem_id',
    'latitude',
    'longitude',
    'endereco_aproximado',
    'tipo_gatilho',
    'status_delegacia',
];

const GATILHOS_VALIDOS = ['BOTAO_DIRETO', 'DURESS_PIN', 'FALTA_CHECKIN', 'SHAKE'];
const STATUS_VALIDOS = ['NOVO', 'EM_ATENDIMENTO', 'CONCLUIDO'];

/**
 * Validação de payload para criação e edição de alertas.
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

    // Coordenadas geográficas obrigatórias no POST
    if (!parcial || corpo.latitude !== undefined) {
        if (corpo.latitude === undefined || typeof corpo.latitude !== 'number' || isNaN(corpo.latitude)) {
            erros.push("O campo 'latitude' precisa ser um número válido.");
        } else if (corpo.latitude < -90 || corpo.latitude > 90) {
            erros.push("O campo 'latitude' deve estar entre -90 e 90.");
        }
    }

    if (!parcial || corpo.longitude !== undefined) {
        if (corpo.longitude === undefined || typeof corpo.longitude !== 'number' || isNaN(corpo.longitude)) {
            erros.push("O campo 'longitude' precisa ser um número válido.");
        } else if (corpo.longitude < -180 || corpo.longitude > 180) {
            erros.push("O campo 'longitude' deve estar entre -180 e 180.");
        }
    }

    // Tipo de gatilho obrigatório no POST (valores estritos do DER)
    if (!parcial || corpo.tipo_gatilho !== undefined) {
        if (!corpo.tipo_gatilho || !GATILHOS_VALIDOS.includes(corpo.tipo_gatilho)) {
            erros.push(`O campo 'tipo_gatilho' deve ser um dos seguintes: ${GATILHOS_VALIDOS.join(', ')}.`);
        }
    }

    // Status da delegacia (se fornecido, deve ser válido)
    if (corpo.status_delegacia !== undefined) {
        if (!STATUS_VALIDOS.includes(corpo.status_delegacia)) {
            erros.push(`O campo 'status_delegacia' deve ser um dos seguintes: ${STATUS_VALIDOS.join(', ')}.`);
        }
    }

    // Endereço aproximado (opcional, máximo 200 caracteres)
    if (corpo.endereco_aproximado !== undefined && corpo.endereco_aproximado !== null) {
        if (typeof corpo.endereco_aproximado !== 'string' || corpo.endereco_aproximado.length > 200) {
            erros.push("O campo 'endereco_aproximado' deve ter no máximo 200 caracteres.");
        }
    }

    return erros;
}

/**
 * Validação de integridade referencial: usuaria_id e viagem_id precisam existir.
 */
async function conferirRelacionamentos(corpo) {
    if (corpo.usuaria_id !== undefined) {
        await garantirExiste('usuarias', corpo.usuaria_id, 'usuaria_id');
    }
    if (corpo.viagem_id !== undefined && corpo.viagem_id !== null) {
        await garantirExiste('viagens_seguras', corpo.viagem_id, 'viagem_id');
    }
}

// Filtra apenas campos conhecidos da tabela
function somenteCampos(corpo) {
    const dados = {};
    for (const campo of CAMPOS) {
        if (corpo[campo] !== undefined) dados[campo] = corpo[campo];
    }
    return dados;
}

// -------------------------------------------------------------
// GET /alertas (ou GET /alertas?usuaria_id=...)
// Do mais recente para o mais antigo (criado_em desc)
// -------------------------------------------------------------
roteador.get('/', async (req, res) => {
    if (req.query.usuaria_id) {
        validarId(req.query.usuaria_id, 'usuaria_id');
        const { rows } = await db.query(
            `select * from ${TABELA} where usuaria_id = $1 order by criado_em desc`,
            [req.query.usuaria_id]
        );
        return res.json(rows);
    }

    const { rows } = await db.query(`select * from ${TABELA} order by criado_em desc`);
    res.json(rows);
});

// -------------------------------------------------------------
// GET /alertas/:id
// -------------------------------------------------------------
roteador.get('/:id', async (req, res) => {
    validarId(req.params.id);
    const { rows } = await db.query(`select * from ${TABELA} where id = $1`, [req.params.id]);
    if (rows.length === 0) {
        throw new ErroApi(404, `Alerta ${req.params.id} não encontrado.`);
    }
    res.json(rows[0]);
});

// -------------------------------------------------------------
// POST /alertas
// Grava novo alerta com status inicial NOVO (ou o informado)
// -------------------------------------------------------------
roteador.post('/', async (req, res) => {
    const corpo = req.body || {};
    const erros = validar(corpo);
    if (erros.length > 0) throw new ErroApi(400, erros.join(' '));

    await conferirRelacionamentos(corpo);

    const dados = somenteCampos(corpo);
    if (!dados.status_delegacia) {
        dados.status_delegacia = 'NOVO';
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
// PUT /alertas/:id
// Atualiza status_delegacia e atualizado_em
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

    // Adiciona atualizado_em automaticamente
    colunas.push('atualizado_em');
    const valores = [...Object.values(dados)];
    
    // Expressão SQL para os SETs
    const sets = colunas.map((col, i) => {
        if (col === 'atualizado_em') return 'atualizado_em = current_timestamp';
        return `${col} = $${i + 1}`;
    });

    const { rows } = await db.query(
        `update ${TABELA} set ${sets.join(', ')} where id = $${valores.length + 1} returning *`,
        [...valores, req.params.id]
    );

    if (rows.length === 0) {
        throw new ErroApi(404, `Alerta ${req.params.id} não encontrado.`);
    }

    res.json(rows[0]);
});

// -------------------------------------------------------------
// DELETE /alertas/:id
// Remove um alerta
// -------------------------------------------------------------
roteador.delete('/:id', async (req, res) => {
    validarId(req.params.id);
    const { rows } = await db.query(`delete from ${TABELA} where id = $1 returning *`, [req.params.id]);
    if (rows.length === 0) {
        throw new ErroApi(404, `Alerta ${req.params.id} não encontrado.`);
    }
    res.json({ removido: rows[0] });
});

module.exports = roteador;
