// ============================================================
// Dados simulados da fachada Pratô: refeições do dia, metas, calorias da semana e receitas.
// Não fazem parte do DER, existem só para a fachada parecer real.
//
// Responsável: Alana Caled
// ============================================================

export const refeicoes = [
  {
    id: 1,
    nome: 'Café da manhã',
    descricao: 'Tapioca com ovo, café sem açúcar',
    kcal: 320,
    registrada: true,
  },
  {
    id: 2,
    nome: 'Almoço',
    descricao: 'Arroz, feijão, frango grelhado, salada',
    kcal: 540,
    registrada: true,
  },
  {
    id: 3,
    nome: 'Lanche',
    descricao: 'Iogurte natural com banana',
    kcal: 180,
    registrada: true,
  },
  {
    id: 4,
    nome: 'Jantar',
    descricao: 'Toque para registrar',
    kcal: 0,
    registrada: false,
  },
];

export const metas = {
  calorias: 1800,
  pesoAtual: 62.4,
  pesoDesejado: 60,
  aguaMetaCopos: 8,
  aguaCopos: 5,
};

export const caloriasSemana = [
  { dia: 'Seg', kcal: 1720 },
  { dia: 'Ter', kcal: 1950 },
  { dia: 'Qua', kcal: 1640 },
  { dia: 'Qui', kcal: 1040 },
  { dia: 'Sex', kcal: 0 },
  { dia: 'Sáb', kcal: 0 },
  { dia: 'Dom', kcal: 0 },
];

export const receitas = [
  { id: 1, nome: 'Panqueca de banana e aveia', tempoMin: 10, kcal: 280, categoria: 'Café da manhã', favorita: true },
  { id: 2, nome: 'Omelete de espinafre',       tempoMin: 8,  kcal: 210, categoria: 'Café da manhã', favorita: false },
  { id: 3, nome: 'Frango grelhado com legumes', tempoMin: 25, kcal: 430, categoria: 'Almoço',        favorita: false },
  { id: 4, nome: 'Salada de grão-de-bico',     tempoMin: 15, kcal: 350, categoria: 'Almoço',        favorita: true },
  { id: 5, nome: 'Sopa de abóbora',            tempoMin: 30, kcal: 260, categoria: 'Jantar',        favorita: false },
  { id: 6, nome: 'Wrap integral de atum',      tempoMin: 12, kcal: 320, categoria: 'Jantar',        favorita: false },
];