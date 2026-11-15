// ============================================================
// Rotas da tabela USUARIAS (Perfil e Acesso Camuflado).
//   GET    /usuarias          lista
//   GET    /usuarias/:id      uma usuária
//   POST   /usuarias          cria       (201)
//   PUT    /usuarias/:id      atualiza só os campos enviados
//   DELETE /usuarias/:id      apaga
// Erros: 400 dado inválido ou e-mail repetido, 404 id não encontrado.
// Nunca devolve senha_hash.
// Responsável: Alana Caled (issue #65)
// ============================================================
const express = require('express');
const crypto = require('crypto');
const db = require('../db');
const { ErroApi, validarId } = require('../erros');

const roteador = express.Router();

// Nome da tabela no banco.
const TABELA = 'usuarias';

// Campos que o app pode enviar (iguais ao DER).
// senha_hash fica de fora: só a API grava. id e criado_em o banco preenche.
const CAMPOS = ['nome_ficticio', 'email', 'pin_secreto', 'duress_pin', 'camuflagem_ativa'];

// Colunas que saem nas respostas: nunca inclui senha_hash.
const COLUNAS_PUBLICAS = 'id, nome_ficticio, email, pin_secreto, duress_pin, camuflagem_ativa, criado_em';

const FORMATO_PIN = /^[0-9]{4,6}$/;
const FORMATO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Regras da tabela. Devolve a lista de erros (vazia = tudo certo).
// "parcial" = true no PUT: só confere os campos que vieram no pedido.
// Os PINs são texto ("0123"), porque como número o zero da frente se perde.
function validar(corpo, parcial = false) {
    const erros = [];

    if (!parcial || corpo.nome_ficticio !== undefined) {
        if (typeof corpo.nome_ficticio !== 'string' || !corpo.nome_ficticio.trim()) {
            erros.push("O campo 'nome_ficticio' é obrigatório.");
        }
    }

    if (!parcial || corpo.email !== undefined) {
        if (typeof corpo.email !== 'string' || !FORMATO_EMAIL.test(corpo.email)) {
            erros.push("O campo 'email' precisa ser um e-mail válido.");
        }
    }

    for (const campo of ['pin_secreto', 'duress_pin']) {
        if (!parcial || corpo[campo] !== undefined) {
            if (typeof corpo[campo] !== 'string' || !FORMATO_PIN.test(corpo[campo])) {
                erros.push(`O campo '${campo}' precisa ter de 4 a 6 dígitos.`);
            }
        }
    }

    if (corpo.pin_secreto !== undefined && corpo.pin_secreto === corpo.duress_pin) {
        erros.push('O PIN secreto e o PIN de emergência precisam ser diferentes.');
    }

    // A senha é opcional: o app entra pelo PIN, não por login. Se vier, é conferida.
    if (corpo.senha !== undefined) {
        if (typeof corpo.senha !== 'string' || corpo.senha.length < 4) {
            erros.push("O campo 'senha' precisa ter pelo menos 4 caracteres.");
        }
    }

    if (corpo.camuflagem_ativa !== undefined && typeof corpo.camuflagem_ativa !== 'boolean') {
        erros.push("O campo 'camuflagem_ativa' precisa ser true ou false.");
    }

    return erros;
}

// Pega do corpo só os campos permitidos (ignora o resto, inclusive senha_hash).
function somenteCampos(corpo) {
    const dados = {};
    for (const campo of CAMPOS) {
        if (corpo[campo] !== undefined) dados[campo] = corpo[campo];
    }
    return dados;
}

// Guarda "sal:hash" (scrypt, já vem com o Node). Nunca a senha em texto.
function gerarHash(senha) {
    const sal = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(senha, sal, 64).toString('hex');
    return `${sal}:${hash}`;
}

// E-mail repetido: 400 com mensagem clara. idAtual deixa a própria usuária
// reenviar o e-mail dela no PUT.
async function conferirEmail(email, idAtual = null) {
    const { rows } = await db.query(`select id from ${TABELA} where lower(email) = lower($1)`, [email]);
    if (rows.length > 0 && rows[0].id !== idAtual) {
        throw new ErroApi(400, 'Já existe uma conta com esse e-mail.');
    }
}

function naoEncontrada(id) {
    return new ErroApi(404, `Usuária ${id} não encontrada.`);
}

// GET /usuarias
roteador.get('/', async (req, res) => {
    const { rows } = await db.query(`select ${COLUNAS_PUBLICAS} from ${TABELA} order by criado_em desc`);
    res.json(rows);
});

// GET /usuarias/:id
roteador.get('/:id', async (req, res) => {
    validarId(req.params.id);
    const { rows } = await db.query(`select ${COLUNAS_PUBLICAS} from ${TABELA} where id = $1`, [req.params.id]);
    if (rows.length === 0) throw naoEncontrada(req.params.id);
    res.json(rows[0]);
});

// POST /usuarias
roteador.post('/', async (req, res) => {
    const corpo = req.body || {};
    const erros = validar(corpo);
    if (erros.length > 0) throw new ErroApi(400, erros.join(' '));
    await conferirEmail(corpo.email);

    const dados = somenteCampos(corpo);
    // senha_hash é NOT NULL no banco. O primeiro acesso só cria os PINs, então,
    // sem senha, guarda o hash de um valor aleatório (ninguém entra por ele).
    const senha = corpo.senha ?? crypto.randomBytes(32).toString('hex');
    dados.senha_hash = gerarHash(senha);

    const colunas = Object.keys(dados);
    const marcas = colunas.map((_, i) => `$${i + 1}`);
    const { rows } = await db.query(
        `insert into ${TABELA} (${colunas.join(', ')}) values (${marcas.join(', ')}) returning ${COLUNAS_PUBLICAS}`,
        Object.values(dados),
    );
    res.status(201).json(rows[0]);
});

// PUT /usuarias/:id  (só os campos enviados)
roteador.put('/:id', async (req, res) => {
    validarId(req.params.id);
    const corpo = req.body || {};
    const erros = validar(corpo, true);
    if (erros.length > 0) throw new ErroApi(400, erros.join(' '));

    // Se veio só um dos PINs, compara com o outro que já está guardado.
    const atual = await db.query(`select pin_secreto, duress_pin from ${TABELA} where id = $1`, [req.params.id]);
    if (atual.rows.length === 0) throw naoEncontrada(req.params.id);
    const pinFinal = corpo.pin_secreto ?? atual.rows[0].pin_secreto;
    const duressFinal = corpo.duress_pin ?? atual.rows[0].duress_pin;
    if (pinFinal === duressFinal) {
        throw new ErroApi(400, 'O PIN secreto e o PIN de emergência precisam ser diferentes.');
    }

    if (corpo.email !== undefined) await conferirEmail(corpo.email, req.params.id);

    const dados = somenteCampos(corpo);
    if (corpo.senha !== undefined) dados.senha_hash = gerarHash(corpo.senha);

    const colunas = Object.keys(dados);
    if (colunas.length === 0) throw new ErroApi(400, 'Nenhum campo para atualizar.');
    const sets = colunas.map((coluna, i) => `${coluna} = $${i + 1}`);
    const { rows } = await db.query(
        `update ${TABELA} set ${sets.join(', ')} where id = $${colunas.length + 1} returning ${COLUNAS_PUBLICAS}`,
        [...Object.values(dados), req.params.id],
    );
    if (rows.length === 0) throw naoEncontrada(req.params.id);
    res.json(rows[0]);
});

// DELETE /usuarias/:id
// Os registros ligados a ela (contatos, viagens...) seguem a regra do schema.sql.
roteador.delete('/:id', async (req, res) => {
    validarId(req.params.id);
    const { rows } = await db.query(`delete from ${TABELA} where id = $1 returning ${COLUNAS_PUBLICAS}`, [req.params.id]);
    if (rows.length === 0) throw naoEncontrada(req.params.id);
    res.json({ removido: rows[0] });
});

module.exports = roteador;
