# Uso de Inteligência Artificial: Equipe Pratô / SAFE

## Ferramentas utilizadas
- Google Gemini / Antigravity
- ChatGPT (OpenAI)
- Claude (Anthropic)

## Onde foram usadas

| Parte do projeto | Ferramenta | Como foi usada | Revisado por |
|---|---|---|---|
| Brainstorming de arquitetura e pesquisa de concorrentes | ChatGPT | Análise de mercado sobre apps de segurança e lacunas existentes | Felipe Trindade e Equipe |
| Definição do conceito de disfarce (Pratô) e gatilhos | Gemini / Antigravity | Estruturação da transição entre app de dieta e área sigilosa | Alana Caled |
| Modelagem de dados (DER) e especificação das 5 entidades | Gemini / Antigravity | Elaboração do esquema relacional em PostgreSQL e relacionamentos | João Pedro e Felipe Trindade |
| Planejamento do Kanban e divisão de papéis | Gemini / Antigravity | Estruturação das sprints quinzenais e matriz de papéis | Higor Bueno e Higor Domingos |
| Estrutura inicial do repositório | Gemini / Antigravity | Criação das pastas e da documentação inicial a partir da ideia do projeto e do enunciado | Equipe |
| Protótipo visual das telas (Pratô e SAFE) | Claude | Criação dos mockups das 18 telas a partir da logo e da paleta escolhida pelo grupo | Equipe |
| Navegação e organização da entrega | Claude | Diagrama e tabela de navegação (Stack e Tab), imagem do DER, cards do Kanban e montagem do PDF da Entrega 1 | Equipe |
| Análise do repositório contra o enunciado | Claude | Levantamento das pendências da Entrega 1 | Equipe |

## Prompts testados

### Estrutura do repositório (Gemini / Antigravity)

**Prompt:** "analise a ideia do projeto e o que é solicitado pelo professor, com base nisso construa a estrutura do repositório"

**Resultado:** estrutura inicial com as pastas `app/`, `api/`, `painel/`, `data-science/` e `docs/`, além do `README.md`, do `USO_IA.md` e dos documentos da Entrega 1.

### Análise de pendências (Claude)

**Prompt (resumo):** pedido para analisar o repositório e dizer se faltava somente o protótipo de telas, enviando o enunciado e o exemplo de referência.

**Resultado:** lista de pendências além do protótipo: navegação com tipo de transição, quadro Kanban real com datas e prompts no USO_IA.md.

### Protótipo das telas (Claude)

**Prompt (resumo):** pedido para criar os protótipos das telas, com a logo do Pratô e um laranja mais pastel.

**Resultado:** 18 telas de celular em imagem, paleta de cores e tipografia, usadas na seção de protótipo do documento.

## Observações do grupo
A Inteligência Artificial foi utilizada como ferramenta de apoio metodológico para auxiliar na estruturação da documentação inicial, brainstorm de diferenciais contra soluções existentes de mercado e geração de diagramas de arquitetura. Todas as decisões de produto, escolhas técnicas de stack (React Native Expo, Node.js Express e PostgreSQL) e a divisão de escopo foram debatidas, validadas e aprovadas pelos 5 integrantes da equipe.


## Entrega 2: Alana Caled

### Onde foram usadas

| Parte do projeto | Ferramenta | Como foi usada | Revisado por |
|---|---|---|---|
| Organização das issues no GitHub | Claude (Claude Code) | A partir de um arquivo de instruções escrito pelo grupo, criou as 36 issues da Entrega 2 com responsáveis e labels, fechou as issues antigas e vinculou as novas no `kanban-backlog.md` | Alana Caled |
| Rotas e navegação (Stack e Tab) | Claude (Claude Code) | Orientação passo a passo para montar o `RootStack`, o `PratoTabs`, o `SafeTabs` e os 5 Stacks, com explicação de cada opção e revisão do código digitado | Alana Caled |
| Telas da fachada Pratô (01 a 04) | Claude (Claude Code) | Sugestão de código a partir das imagens do protótipo, explicação das decisões e revisão linha a linha do que eu escrevi, apontando erros antes do commit | Alana Caled |
| Gatilhos do disfarce (PIN e toque longo) | Claude (Claude Code) | Explicação de como usar o `navigation.reset` e de por que a checagem do PIN vem antes da validação da meta; revisão do código | Alana Caled |
| Telas do SAFE (13, 14 e 16) | Claude (Claude Code) | Sugestão de código e de componentes reutilizáveis (`LinhaMenu`, `LinhaSwitch`, `LinhaPin`, `SeletorNivel`, `OpcaoResposta`), com revisão antes de cada commit | Alana Caled |
| Componentização | Claude (Claude Code) | Separação do anel de calorias, do gráfico da semana e das linhas de objetivos em componentes que recebem os dados por props | Alana Caled |
| Logotipo | Claude (Claude Code) | Recorte do símbolo da logo e remoção do fundo, gerando o `logo.png` transparente | Alana Caled |
| Revisão do código do grupo | Claude (Claude Code) | Revisão do Pull Request do Higor Domingos e padronização do Círculo de Confiança (campos do DER, cores do tema e cabeçalho duplicado) | Alana Caled |
| Documentação | Claude (Claude Code) | Criação do `docs/padroes-de-codigo.md` e da seção de primeiro acesso no `justificativa-disfarce.md` | Alana Caled |

### Prompts testados

#### Organização das issues (Claude Code)

**Prompt:** "leia esse arquivo e siga as instruções dele para arrumar as issues do repositório"

**Resultado:** 36 issues criadas com títulos e textos em UTF-8 (sem os acentos quebrados das issues anteriores), labels da Entrega 2, issues antigas fechadas e kanban atualizado.

#### Orientação para commits (Claude Code)

**Prompt:** "eu preciso pegar a issue e usá-la para commitar o que eu já fiz, como eu faço? me dê as instruções"

**Resultado:** explicação do `Closes #número` e do `Refs #número`, e separação do trabalho em um commit por issue no GitHub Desktop.

#### Revisão antes do commit (Claude Code)

**Prompt (resumo):** depois de escrever cada tela, pedido para "ver se está tudo certo antes de eu commitar".

**Resultado:** a revisão encontrou erros que não apareciam no terminal, como função chamada com o nome errado, `key` repetida numa lista, `headerShow` sem o "n", espaço apagado pelo JSX ("320kcal") e constante em minúscula (`TIPOS_GATILHO.duress_pin`), que fazia o SOS ser registrado com o gatilho errado.

#### Padrões de código (Claude Code)

**Prompt:** "é bom adicionar uma documentação com padrões de código? se sim faça para mim"

**Resultado:** guia com pastas, nomes, cores, dados simulados, tabela de rotas, regras do disfarce e checklist antes do commit, escrito a partir dos padrões que o projeto já usava.

### O que eu aprendi e decidi

* Toda sugestão de código foi lida, testada no navegador e no Expo Go e, em várias telas, digitada e adaptada por mim antes do commit.
* As decisões de produto foram minhas e do grupo, como esperar a correção do PR do Higor antes do merge e escolher a estratégia de primeiro acesso (indicação pela rede de proteção mais configuração disfarçada).
