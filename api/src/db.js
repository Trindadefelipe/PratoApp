// ============================================================
// db: conexão com o PostgreSQL do Supabase.
// Lê a URL de DATABASE_URL (arquivo .env). Use sempre consulta com
// parâmetros ($1, $2...), nunca texto do usuário colado no SQL:
//     const { rows } = await db.query('select * from usuarias where id = $1', [id]);
// Responsável: Alana Caled (issue #64)
// ============================================================
const { Pool, types } = require('pg');

// As colunas "timestamp" (sem fuso) guardam o horário em UTC, porque o banco do
// Supabase está em UTC e o app envia as datas com toISOString().
// Sem isto, o pg lê esse horário como se fosse do fuso do computador (Brasília)
// e todas as datas voltam com 3 horas a mais.
types.setTypeParser(1114, (texto) => new Date(texto.replace(' ', 'T') + 'Z'));

if (!process.env.DATABASE_URL) {
    console.error('Falta a variável DATABASE_URL. Copie o .env.example para .env e preencha (veja o README da API).');
    process.exit(1);
}

// O Supabase exige SSL. Um Postgres local (testes) não usa.
const local = /@(localhost|127\.0\.0\.1)[:/]/.test(process.env.DATABASE_URL);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: local ? false : { rejectUnauthorized: false },
    max: 5,
});

pool.on('error', (erro) => {
    console.error('Erro na conexão com o banco:', erro.message);
});

module.exports = {
    query: (texto, parametros) => pool.query(texto, parametros),
    pool,
};
