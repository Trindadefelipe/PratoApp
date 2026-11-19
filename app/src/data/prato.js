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

// Cada receita tem ingredientes e modo de preparo para a tela de detalhe (ReceitaDetalhe).
export const receitas = [
  {
    id: 1, nome: 'Omelete de espinafre com tomate', tempoMin: 15, kcal: 220, categoria: 'Café da manhã', favorita: false, porcoes: 1,
    ingredientes: ['2 ovos', '1 xícara de espinafre picado', '1 tomate pequeno em cubos', '1 colher (chá) de azeite', 'Sal e pimenta a gosto'],
    passos: [
      'Bata os ovos com uma pitada de sal e pimenta.',
      'Aqueça o azeite numa frigideira antiaderente e refogue o espinafre por 1 minuto.',
      'Junte os ovos batidos e o tomate, espalhando bem pela frigideira.',
      'Cozinhe em fogo baixo até firmar, dobre ao meio e sirva.',
    ],
  },
  {
    id: 2, nome: 'Salada morna de grão-de-bico', tempoMin: 10, kcal: 310, categoria: 'Almoço', favorita: false, porcoes: 2,
    ingredientes: ['1 lata de grão-de-bico cozido', '1/2 cebola roxa fatiada', '1 pimentão vermelho em tiras', 'Folhas de rúcula', 'Suco de 1/2 limão', '1 colher (sopa) de azeite'],
    passos: [
      'Escorra e lave o grão-de-bico.',
      'Salteie a cebola e o pimentão no azeite por 3 minutos.',
      'Junte o grão-de-bico e aqueça por mais 2 minutos.',
      'Sirva sobre a rúcula e finalize com o suco de limão.',
    ],
  },
  {
    id: 3, nome: 'Sopa cremosa de abóbora', tempoMin: 30, kcal: 180, categoria: 'Jantar', favorita: false, porcoes: 3,
    ingredientes: ['500 g de abóbora cabotiá em cubos', '1 cebola picada', '2 dentes de alho', '600 ml de água', '1 colher (chá) de azeite', 'Gengibre ralado a gosto'],
    passos: [
      'Refogue a cebola e o alho no azeite até dourar.',
      'Acrescente a abóbora, o gengibre e a água.',
      'Cozinhe por 20 minutos, até a abóbora ficar macia.',
      'Bata no liquidificador e acerte o sal.',
    ],
  },
  {
    id: 4, nome: 'Panqueca de banana e aveia', tempoMin: 15, kcal: 260, categoria: 'Café da manhã', favorita: false, porcoes: 1,
    ingredientes: ['1 banana madura', '1 ovo', '3 colheres (sopa) de aveia em flocos', 'Canela a gosto'],
    passos: [
      'Amasse a banana com um garfo.',
      'Misture o ovo, a aveia e a canela até formar uma massa.',
      'Despeje porções pequenas numa frigideira antiaderente aquecida.',
      'Doure 2 minutos de cada lado.',
    ],
  },
  {
    id: 5, nome: 'Frango grelhado com legumes', tempoMin: 25, kcal: 340, categoria: 'Almoço', favorita: false, porcoes: 2,
    ingredientes: ['2 filés de frango', '1 abobrinha em rodelas', '1 cenoura em palitos', '1 xícara de brócolis', 'Suco de 1 limão', 'Ervas secas a gosto'],
    passos: [
      'Tempere o frango com limão, ervas e sal por 10 minutos.',
      'Grelhe o frango 5 minutos de cada lado.',
      'Na mesma frigideira, salteie os legumes até ficarem macios e crocantes.',
      'Sirva o frango fatiado com os legumes.',
    ],
  },
  {
    id: 6, nome: 'Wrap integral de atum', tempoMin: 12, kcal: 320, categoria: 'Jantar', favorita: false, porcoes: 1,
    ingredientes: ['1 pão folha integral', '1 lata de atum em água', '1 colher (sopa) de iogurte natural', 'Folhas de alface', '1/2 tomate fatiado'],
    passos: [
      'Escorra o atum e misture com o iogurte.',
      'Aqueça o pão folha por 30 segundos na frigideira.',
      'Monte com a alface, o tomate e o atum.',
      'Enrole bem firme e corte ao meio.',
    ],
  },
];