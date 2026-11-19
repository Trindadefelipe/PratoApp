// ============================================================
// Rotas dos INDICADORES DAS CAPITAIS (Entrega Final, Data Science).
//   GET    /indicadores            lista as 27 capitais (ordem alfabética)
//   GET    /indicadores/:capital   uma capital pelo nome
//                                  (não diferencia maiúsculas nem acentos)
// A tabela indicadores_capitais é preenchida pelo sql/seed_indicadores.sql,
// gerado pelo notebook de DS. Só leitura: o app não grava indicadores.
// O indicador descreve a capital, nunca o risco individual da usuária.
// Responsável: João Pedro (issue #83)
// ============================================================
const express = require('express');
const db = require('../db');
const { ErroApi } = require('../erros');

const roteador = express.Router();

const TABELA = 'indicadores_capitais';

// "São Paulo", "sao paulo" e "SAO PAULO" viram o mesmo texto.
function normalizar(texto) {
    return String(texto)
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .trim()
        .toLowerCase();
}

// GET /indicadores
roteador.get('/', async (req, res) => {
    const { rows } = await db.query(`select * from ${TABELA} order by capital asc`);
    res.json(rows);
});

// GET /indicadores/:capital
// São só 27 linhas, então a comparação sem acento é feita aqui no Node.
roteador.get('/:capital', async (req, res) => {
    const procurada = normalizar(req.params.capital);
    if (!procurada) throw new ErroApi(400, "O campo 'capital' é obrigatório.");

    const { rows } = await db.query(`select * from ${TABELA}`);
    const encontrada = rows.find((linha) => normalizar(linha.capital) === procurada);
    if (!encontrada) throw new ErroApi(404, `Capital ${req.params.capital} não encontrada.`);
    res.json(encontrada);
});

module.exports = roteador;
