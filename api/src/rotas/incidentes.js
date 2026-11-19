// ============================================================
// Rotas da tabela COFRE_INCIDENTES (Cofre de Incidentes).
//   GET    /incidentes          lista (aceita ?usuaria_id=... para filtrar)
//   GET    /incidentes/:id      um incidente
//   POST   /incidentes          cria       (201)
//   PUT    /incidentes/:id      atualiza só os campos enviados
//   DELETE /incidentes/:id      apaga
// Erros: 400 dado inválido ou relacionamento inexistente, 404 id não encontrado.
// Responsável: João Pedro (issue #80)
// ============================================================
const express = require('express');
const db = require('../db');
const { ErroApi, validarId, garantirExiste } = require('../erros');

const roteador = express.Router();

const TABELA = 'cofre_incidentes';

const TIPOS_VIOLENCIA_VALIDOS = [
    'VERBAL_PSICOLOGICA',
    'FISICA',
    'PATRIMONIAL',
    'VIRTUAL_PERSEGUICAO',
];

const CAMPOS = [
    'usuaria_id',
    'data_ocorrencia',
    'tipo_violencia',
    'relato_detalhado',
    'local_ocorrencia',
    'notas_adicionais',
    'anexo_evidencia_url',
];

// Regras da tabela cofre_incidentes (DER). Devolve lista de erros (vazia = válido).
// "parcial" = true no PUT: só confere os campos enviados no pedido.
function validar(corpo, parcial = false) {
    const erros = [];

    if (!parcial && corpo.usuaria_id === undefined) {
        erros.push("O campo 'usuaria_id' é obrigatório.");
    }

    if (!parcial || corpo.data_ocorrencia !== undefined) {
        if (typeof corpo.data_ocorrencia !== 'string' || !corpo.data_ocorrencia.trim()) {
            erros.push("O campo 'data_ocorrencia' é obrigatório.");
        } else if (Number.isNaN(new Date(corpo.data_ocorrencia).getTime())) {
            erros.push("O campo 'data_ocorrencia' precisa ser uma data válida.");
        }
    }

    if (!parcial || corpo.tipo_violencia !== undefined) {
        if (typeof corpo.tipo_violencia !== 'string' || !TIPOS_VIOLENCIA_VALIDOS.includes(corpo.tipo_violencia)) {
            erros.push(
                `O campo 'tipo_violencia' é obrigatório e deve ser um de: ${TIPOS_VIOLENCIA_VALIDOS.join(', ')}.`,
            );
        }
    }

    if (!parcial || corpo.relato_detalhado !== undefined) {
        if (typeof corpo.relato_detalhado !== 'string' || !corpo.relato_detalhado.trim()) {
            erros.push("O campo 'relato_detalhado' é obrigatório.");
        }
    }

    if (corpo.local_ocorrencia !== undefined && corpo.local_ocorrencia !== null) {
        if (typeof corpo.local_ocorrencia !== 'string') {
            erros.push("O campo 'local_ocorrencia' precisa ser texto.");
        } else if (corpo.local_ocorrencia.length > 255) {
            erros.push("O campo 'local_ocorrencia' não pode ter mais de 255 caracteres.");
        }
    }

    if (corpo.notas_adicionais !== undefined && corpo.notas_adicionais !== null) {
        if (typeof corpo.notas_adicionais !== 'string') {
            erros.push("O campo 'notas_adicionais' precisa ser texto.");
        }
    }

    if (corpo.anexo_evidencia_url !== undefined && corpo.anexo_evidencia_url !== null) {
        if (typeof corpo.anexo_evidencia_url !== 'string') {
            erros.push("O campo 'anexo_evidencia_url' precisa ser texto.");
        } else if (corpo.anexo_evidencia_url.length > 255) {
            erros.push("O campo 'anexo_evidencia_url' não pode ter mais de 255 caracteres.");
        }
    }

    return erros;
}

// Relacionamento real: a usuária precisa existir no banco antes de gravar.
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

function naoEncontrado(id) {
    return new ErroApi(404, `Incidente ${id} não encontrado.`);
}

// GET /incidentes (e /incidentes?usuaria_id=...)
// Ordena sempre do mais novo para o mais antigo.
roteador.get('/', async (req, res) => {
    if (req.query.usuaria_id) {
        validarId(req.query.usuaria_id, 'usuaria_id');
        const { rows } = await db.query(
            `select * from ${TABELA} where usuaria_id = $1 order by data_ocorrencia desc, criado_em desc`,
            [req.query.usuaria_id],
        );
        return res.json(rows);
    }
    const { rows } = await db.query(
        `select * from ${TABELA} order by data_ocorrencia desc, criado_em desc`,
    );
    res.json(rows);
});

// GET /incidentes/:id
roteador.get('/:id', async (req, res) => {
    validarId(req.params.id);
    const { rows } = await db.query(`select * from ${TABELA} where id = $1`, [req.params.id]);
    if (rows.length === 0) throw naoEncontrado(req.params.id);
    res.json(rows[0]);
});

// POST /incidentes
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

// PUT /incidentes/:id (só os campos enviados)
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

// DELETE /incidentes/:id
roteador.delete('/:id', async (req, res) => {
    validarId(req.params.id);
    const { rows } = await db.query(`delete from ${TABELA} where id = $1 returning *`, [req.params.id]);
    if (rows.length === 0) throw naoEncontrado(req.params.id);
    res.json({ removido: rows[0] });
});

module.exports = roteador;
