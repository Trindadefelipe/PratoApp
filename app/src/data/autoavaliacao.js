// ============================================================
// Dados da autoavaliação de risco (Tela 16).
// Não fazem parte do DER: são as perguntas fixas do questionário.
//
// Perguntas fictícias, escritas para o protótipo acadêmico. Antes de uso real,
// o grupo deve revisá-las com base num instrumento oficial, como o
// Formulário Nacional de Avaliação de Risco (Lei 14.149/2021).
//
// Responsável: Alana Caled
// ============================================================

export const opcoes = [
  { texto: 'Nunca',          valor: 0 },
  { texto: 'Às vezes',       valor: 1 },
  { texto: 'Com frequência', valor: 2 },
  { texto: 'Quase sempre',   valor: 3 },
];

export const perguntas = [
  'Com que frequência você se sente controlada nas suas saídas, roupas ou amizades?',
  'Com que frequência mexem no seu celular ou nas suas mensagens sem a sua permissão?',
  'Com que frequência você sente medo da reação de quem mora com você?',
  'Com que frequência você é xingada, humilhada ou ameaçada?',
  'Com que frequência controlam o seu dinheiro ou impedem que você trabalhe?',
  'Com que frequência você é empurrada, segurada com força ou agredida?',
  'Com que frequência você evita falar com família ou amigos para não gerar briga?',
  'Com que frequência você sente que a situação está ficando mais grave?',
];