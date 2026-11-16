// ============================================================
// Rotas do PAINEL AGREGADO DA DELEGACIA (Entrega Final).
//   GET    /painel          retorna alertas abertos ('NOVO', 'EM_ATENDIMENTO')
//                           com dados da usuária e da viagem
// Responsável: Higor Domingos (issue #78)
// ============================================================
const express = require('express');
const db = require('../db');

const roteador = express.Router();

// GET /painel
// Retorna lista agregada de alertas ativos para o painel em tempo real da delegacia
roteador.get('/', async (req, res) => {
    const consulta = `
        select 
            a.id,
            a.latitude,
            a.longitude,
            a.endereco_aproximado,
            a.tipo_gatilho,
            a.status_delegacia,
            a.criado_em,
            a.atualizado_em,
            a.usuaria_id,
            u.nome_ficticio as usuaria_nome,
            u.email as usuaria_email,
            a.viagem_id,
            v.origem_descricao as viagem_origem,
            v.destino_descricao as viagem_destino,
            v.status_viagem
        from alertas_sos a
        inner join usuarias u on a.usuaria_id = u.id
        left join viagens_seguras v on a.viagem_id = v.id
        where a.status_delegacia in ('NOVO', 'EM_ATENDIMENTO')
        order by a.criado_em desc
    `;

    const { rows } = await db.query(consulta);

    // Contadores para o cabeçalho do painel
    const novos = rows.filter(r => r.status_delegacia === 'NOVO').length;
    const emAtendimento = rows.filter(r => r.status_delegacia === 'EM_ATENDIMENTO').length;

    res.json({
        total_abertos: rows.length,
        novos,
        em_atendimento: emAtendimento,
        alertas: rows,
    });
});

module.exports = roteador;
