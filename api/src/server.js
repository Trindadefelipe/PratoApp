// ============================================================
// API REST do Pratô / SAFE (Entrega Final).
// Node.js + Express + PostgreSQL no Supabase.
//
// Cada arquivo em src/rotas/ vira um caminho da API pelo nome:
//     src/rotas/contatos.js  ->  /contatos
// Para criar as suas rotas, basta criar o arquivo (modelo no README).
// Não precisa mexer neste arquivo.
// Responsável: Alana Caled (issue #64)
// ============================================================
require('dotenv').config({ quiet: true });

const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const db = require('./db');
const { tratarErros } = require('./erros');

const app = express();
app.use(cors());
app.use(express.json());

// Saúde da API: confere se o servidor e o banco estão respondendo.
app.get('/', async (req, res) => {
    let banco = 'ok';
    try {
        await db.query('select 1');
    } catch (erro) {
        banco = 'erro';
        console.error('Banco fora do ar:', erro.message);
    }
    res.status(banco === 'ok' ? 200 : 503).json({ status: banco === 'ok' ? 'ok' : 'erro', banco, api: 'Pratô / SAFE' });
});

// Carrega todas as rotas de src/rotas/ (arquivos que começam com "_" ficam de fora).
const PASTA_ROTAS = path.join(__dirname, 'rotas');
const rotasCarregadas = [];
for (const arquivo of fs.readdirSync(PASTA_ROTAS).sort()) {
    if (!arquivo.endsWith('.js') || arquivo.startsWith('_')) continue;
    const caminho = '/' + path.basename(arquivo, '.js');
    app.use(caminho, require(path.join(PASTA_ROTAS, arquivo)));
    rotasCarregadas.push(caminho);
}

// Qualquer outro caminho: 404 no mesmo formato de erro.
app.use((req, res) => {
    res.status(404).json({ erro: `Rota ${req.method} ${req.path} não existe.` });
});

app.use(tratarErros);

const PORTA = process.env.PORT || 3333;
app.listen(PORTA, () => {
    console.log(`API do Pratô / SAFE em http://localhost:${PORTA}`);
    console.log(`Rotas: ${rotasCarregadas.length ? rotasCarregadas.join(', ') : '(nenhuma ainda em src/rotas/)'}`);
});
