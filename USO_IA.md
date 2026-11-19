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


## Entrega 2: Felipe Trindade

### Onde foram usadas

| Parte do projeto | Ferramenta | Como foi usada | Revisado por |
|---|---|---|---|
| Telas do Círculo de Confiança (06 e 07) | Gemini / Antigravity | Implementação da listagem e do formulário de criação/edição de contatos com validações e prioridades | Felipe Trindade |
| Dados simulados dos contatos | Gemini / Antigravity | Estruturação de `contatos.js` conforme entidades e campos do DER | Felipe Trindade |
| Tela 17: Resultado da autoavaliação | Gemini / Antigravity | Lógica de cálculo dinâmico da pontuação (0 a 24), classificação em 3 níveis (Baixo, Moderado, Alto), barra segmentada de destaque e links de ação | Felipe Trindade |
| Tela 18: Guia de direitos e canais | Gemini / Antigravity | Estruturação dos atalhos de ligação rápida (180 e 190 via `Linking`), orientações da Lei Maria da Penha e locais de acolhimento | Felipe Trindade |
| Análise Exploratória: Medidas descritivas (DS) | Gemini / Antigravity | Cálculo de média, mediana, moda, desvio padrão, variância e amplitude no `notebook.ipynb` com interpretação crítica | Felipe Trindade |
| Análise Exploratória: Frequências e correlação (DS) | Gemini / Antigravity | Elaboração de tabelas de frequência por classes, histogramas com KDE, gráfico de evolução histórica com marco da Lei Maria da Penha, ranking de capitais e heatmap de correlação | Felipe Trindade |
| Auditoria e Governança Técnica de Código | Antigravity (`issue-closer` / `pr-code-reviewer`) | Execução de auditoria automatizada em 4 dimensões (requisitos da issue, aderência aos padrões do projeto, integridade/quebras e veredicto conclusivo) antes de cada commit | Felipe Trindade |

### Prompts testados

#### Telas 17 e 18 do SAFE (Gemini / Antigravity)

**Prompt:** "implemente a Tela 17 (ResultadoRiscoScreen) e a Tela 18 (GuiaDireitosScreen) seguindo as diretrizes de docs/padroes-de-codigo.md, tema com theme/colors.js e theme/fonts.js, garantindo o cálculo de nível por soma e discadores nativos"

**Resultado:** Telas completas e integradas ao `InicioStack`, respeitando a identidade visual, acessibilidade, proteção por sigilo e aviso acadêmico obrigatório.

#### Análise Exploratória no Jupyter Notebook (Gemini / Antigravity)

**Prompt:** "crie a seção da Etapa 2 de EDA no notebook.ipynb respeitando a Etapa 1 já existente, com cálculos descritivos, histogramas de distribuição, série histórica destacando a Lei Maria da Penha e correlação com heatmap"

**Resultado:** Inclusão de células executáveis em Python (pandas, matplotlib, seaborn) e blocos em markdown interpretando a assimetria positiva dos dados absolutos versus a robustez da taxa por 100 mil habitantes.

#### Auditoria com Skill /pr-code-reviewer

**Prompt:** "audite o diff do arquivo implementado validando o atendimento aos critérios da issue, ausência de quebras, sanitização e conformidade com os padrões do repositório"

**Resultado:** Parecer técnico formal garantindo que nenhum segredo vazou, que a navegação não quebra estados anteriores e que todos os critérios de aceite foram integralmente atendidos antes do commit.

### O que eu aprendi e decidi

* A utilização da taxa padronizada por 100 mil mulheres é fundamental em comparação aos números absolutos, pois mitiga a distorção gerada por metrópoles como São Paulo e Rio de Janeiro na modelagem estatística.
* No desenvolvimento mobile para segurança de vítimas, a integração de canais de socorro (180 e 190) precisa ser nativa e rápida através do protocolo `tel:` do `Linking`, sem intermediações complexas que retardem o pedido de ajuda.
* A automação do fluxo com a disciplina do `issue-closer` e do `pr-code-reviewer` garante que cada entrega possua rastreabilidade, commit atômico e fechamento com conformidade rigorosa.


## Entrega 2: João Pedro

### Onde foram usadas

| Parte do projeto | Ferramenta | Como foi usada | Revisado por |
|---|---|---|---|
| Dados simulados do cofre de incidentes | Gemini / Antigravity | Criação de `app/src/data/incidentes.js` cobrindo os 4 tipos da Lei Maria da Penha com campos idênticos ao DER | João Pedro |
| Tela 10: Cofre de Incidentes | Gemini / Antigravity | Implementação da `IncidentesListScreen` com linha do tempo vertical, chips de filtro interativos, marcadores coloridos e botão flutuante (+) | João Pedro |
| Tela 11: Novo registro | Gemini / Antigravity | Implementação da `IncidenteFormScreen` com data/hora, seleção de tipo por chips, relato multilinha, botões de evidência e persistência simulada em memória | João Pedro |
| Tela 12: Detalhe do incidente | Gemini / Antigravity | Implementação da `IncidenteDetalheScreen` com relato integral, notas adicionais, cards de evidências, exclusão confirmada e ação de exportação segura | João Pedro |
| Padronização visual e de temas | Gemini / Antigravity | Validação rigorosa das cores de `theme/colors.js` e tipografia Poppins de `theme/fonts.js` sem valores literais soltos | João Pedro |

### Prompts testados

#### Módulo do Cofre de Incidentes (Gemini / Antigravity)

**Prompt:** "leia todo o projeto e implemente o módulo do Cofre de Incidentes (dados simulados e as Telas 10, 11 e 12) seguindo os padrões de código, os protótipos da Entrega 1 e o tema com colors.js e fonts.js"

**Resultado:** Implementação completa de `incidentes.js`, `IncidentesListScreen.js`, `IncidenteFormScreen.js` e `IncidenteDetalheScreen.js`, respeitando a modelagem de dados do DER, os fluxos de navegação e os mockups visuais da Entrega 1.

### O que eu aprendi e decidi

* A organização do Cofre em linha do tempo cronológica com marcadores visuais por tipo de violência facilita a identificação de padrões de agressão (escalada de violência), elemento essencial para medidas protetivas de urgência.
* O suporte nativo à exclusão e à edição de registros, com confirmação de segurança via diálogo modal, evita perdas acidentais de provas documentadas pela usuária.
* A simulação de exportação segura estruturada sintetiza relatos, datas e anexos em um dossiê pronto para encaminhamento a canais oficiais, mantendo a integridade exigida por órgãos de apoio e segurança pública.


## Entrega 2: Higor Bueno

### Onde foram usadas

| Parte do projeto | Ferramenta | Como foi usada | Revisado por |
|---|---|---|---|
| Dados simulados de viagens e check-ins | Gemini / Antigravity | Criação de `app/src/data/viagens.js` com modelagem idêntica ao DER e chaves estrangeiras vinculadas à usuária | Higor Bueno |
| Tela 08: Nova viagem | Gemini / Antigravity | Implementação da `ViagemNovaScreen` com De/Para, chips de tempo com cálculo automático de chegada e rede de apoio selecionável | Higor Bueno |
| Tela 09: Viagem em andamento | Gemini / Antigravity | Implementação da `ViagemEmAndamentoScreen` com anel circular de contagem regressiva em SVG, botões de ação e legenda dinâmica de acompanhantes | Higor Bueno |
| Qualidade e limpeza de dados (DS) | Gemini / Antigravity | Auditoria de integridade e nulos, validação de tipos primitivos e análise estatística de outliers por IQR (Critério de Tukey) no `notebook.ipynb` | Higor Bueno |
| Engenharia de atributos e normalização (DS) | Gemini / Antigravity | Derivação de macrorregião pelo código IBGE, categorização em 4 faixas de risco e escalonamento numérico via MinMaxScaler e StandardScaler para preparar o dataset para Machine Learning | Higor Bueno |

### Prompts testados

#### Módulo de Viagem Segura (Gemini / Antigravity)

**Prompt:** "implemente o módulo de Viagem Segura (dados simulados de viagens e as Telas 08 e 09) seguindo os padrões de código, os protótipos da Entrega 1, cores de colors.js, fontes de fonts.js e anel regressivo em SVG"

**Resultado:** Implementação de `viagens.js`, `ViagemNovaScreen.js` e `ViagemEmAndamentoScreen.js` com transição de tela via `navigation.replace`, anel regressivo em SVG e conexão com os contatos do Círculo de Confiança.

#### Qualidade, Limpeza e Pré-processamento no Jupyter Notebook (Gemini / Antigravity)

**Prompt:** "crie a seção da Etapa 3 de Qualidade, Limpeza e Pré-processamento no notebook.ipynb respeitando as Etapas 1 e 2 já existentes, com checagem de nulos, detecção de outliers pelo IQR, mapeamento de macrorregiões pelo código IBGE, faixas de risco por quartis e normalização Min-Max e StandardScaler para o modelo de ML"

**Resultado:** Inclusão das células executáveis da Etapa 3 e blocos de markdown fundamentando a decisão metodológica de não excluir outliers sociodemográficos reais e preparando a base para os algoritmos da Etapa 4.

### O que eu aprendi e decidi

* Na arquitetura de segurança pessoal do SAFE, o estado de uma viagem ativa exige `navigation.replace` para evitar retorno acidental a um formulário em branco pelo botão nativo do sistema operacional.
* Em Ciência de Dados para segurança pública, outliers em taxas de homicídio não devem ser descartados como simples "ruído", pois representam momentos críticos de violência real cuja exclusão criaria um viés perigoso nos modelos de predição de risco.
* A criação de features estruturadas (como Macrorregião e faixas ordinais de risco) e a normalização padronizada são etapas indispensáveis para que os algoritmos de Machine Learning (como K-Means ou Random Forest) convirjam sem serem distorcidos pelas disparidades populacionais entre grandes e pequenas capitais.


## Entrega 2: Higor Domingos

### Onde foram usadas

| Parte do projeto | Ferramenta | Como foi usada | Revisado por |
|---|---|---|---|
| Tela 05: Início do SAFE e Botão SOS | Gemini / Antigravity | Implementação da `SafeHomeScreen.js` com botão central de emergência em destaque, saudação dinâmica contextual e navegação protegida | Higor Domingos |
| Tela 15: Histórico de Alertas SOS | Gemini / Antigravity | Implementação da `AlertasHistoricoScreen.js` com lista de acionamentos, badges de status, formatação de data/hora e tipo de gatilho | Higor Domingos |
| Lógica do SOS Silencioso e Duress PIN | Gemini / Antigravity | Implementação de `app/src/services/sos.js` com regra de disparo sob coação (*Duress PIN*), geração de payloads simulados e supressão de alertas visuais de erro | Higor Domingos |
| Dados simulados de alertas SOS | Gemini / Antigravity | Criação de `app/src/data/alertas.js` estruturado conforme entidades e chaves estrangeiras do DER (`usuaria_id`, `tipo_gatilho`, `status_alerta`) | Higor Domingos |
| Padronização visual do módulo SOS | Gemini / Antigravity | Alinhamento das cores de `theme/colors.js` e fontes de `theme/fonts.js` em todo o fluxo de emergência | Higor Domingos |

### Prompts testados

#### Módulo de SOS e Histórico de Alertas (Gemini / Antigravity)

**Prompt:** "implemente a Tela 05 (SafeHomeScreen) com botão de SOS em destaque e a Tela 15 (AlertasHistoricoScreen) seguindo docs/padroes-de-codigo.md, tema com colors.js e fonts.js e fluxo de dados com data/alertas.js"

**Resultado:** Telas completas integradas ao `InicioStack`, respeitando a identidade visual, contraste para situações de estresse e exibição clara do histórico de chamados da usuária.

#### Lógica de Proteção sob Coação (Gemini / Antigravity)

**Prompt:** "crie o serviço app/src/services/sos.js com a regra do Duress PIN: caso a usuária informe a senha sob coação, o app deve abrir a interface normalmente mas acionar o SOS silencioso em segundo plano sem exibir erros visuais"

**Resultado:** Função `dispararSos()` com captura de tipo de gatilho (`MANUAL`, `DURESS_PIN`, `QUEDA_CONEXAO`), isolamento de falhas em modo coação e geração de carimbos de auditoria compatíveis com a tabela `alertas_sos`.

### O que eu aprendi e decidi

* Em interfaces de emergência para vítimas de violência, a usabilidade do botão SOS requer área de toque ampliada e feedback tátil, mas nunca deve travar a usuária com confirmações burocráticas quando o perigo é iminente.
* A regra de segurança do *Duress PIN* exige arquitetura defensiva: a prioridade máxima é proteger a integridade física da usuária, simulando uma operação normal para o agressor enquanto as autoridades e a rede de confiança são notificadas.
* A consistência entre a estrutura dos dados simulados e o modelo relacional (DER) desde a Entrega 2 facilitou a posterior transição para a API real e PostgreSQL sem necessidade de refatorar a árvore de componentes da tela.


## Entrega Final: Felipe Trindade

### Onde foram usadas

| Parte do projeto | Ferramenta | Como foi usada | Revisado por |
|---|---|---|---|
| Back-end: Rotas de contatos (`api/src/rotas/contatos.js`) | Gemini / Antigravity | Implementação dos 5 endpoints RESTful (`GET`, `GET /:id`, `POST`, `PUT /:id`, `DELETE /:id`) com Prepared Statements (`$1, $2, ...`) e validação de relacionamento real via `garantirExiste('usuarias', ...)` | Felipe Trindade |
| Testes automatizados da API | Gemini / Antigravity | Criação de suíte de testes com 10 casos de uso cobrindo CRUD, validação de campos obrigatórios, rejeição de chave estrangeira inexistente (`400`) e `404` | Felipe Trindade |
| Integração Mobile: Círculo de Confiança | Gemini / Antigravity | Conexão de `ContatosListScreen` e `ContatoFormScreen` ao `services/api.js`, recarregamento com `useFocusEffect`, estados de loading/erro/vazio e eliminação de 100% dos mocks de `data/contatos` | Felipe Trindade |
| Botão de Saída Rápida (*Quick Exit*) | Gemini / Antigravity | Implementação de `BotaoSaidaRapida.js` com visual camuflado ("Salvar rascunho"), reset imediato sem confirmação para `PratoTabs` e injeção global no `SafeTabs.js` sobre todas as abas e stacks | Felipe Trindade |
| Documentação e Arquitetura Final | Gemini / Antigravity | Atualização do `README.md` com arquitetura em Mermaid, passos de execução, atualização da matriz de papéis (`matriz-papeis.md`), modelo DER (`modelagem-der.md`) e sincronização do Kanban | Felipe Trindade |
| Auditoria e Code Review (`pr-code-reviewer`) | Antigravity (`/pr-code-reviewer`) | Auditoria formal nas 4 dimensões (atendimento ao escopo, padrões de código, segurança da vítima e integridade sem quebras) antes da abertura de cada PR (#90, #91 e #92) | Felipe Trindade |

### Prompts testados

#### Rotas de Contatos e Validação de Relacionamento (Gemini / Antigravity)

**Prompt:** "crie o arquivo api/src/rotas/contatos.js a partir do modelo _modelo.js com os 5 endpoints RESTful da tabela contatos_confianca, validando campos do DER, ordenação por nivel_prioridade e conferindo o relacionamento real com usuarias via garantirExiste"

**Resultado:** Código robusto com consultas parametrizadas, prevenção de SQL Injection, tratamento centralizado de erro (`ErroApi`) e recusa de `usuaria_id` inválido com status HTTP `400` antes de gravar no banco.

#### Integração das Telas do Círculo de Confiança (Gemini / Antigravity)

**Prompt:** "conecte ContatosListScreen e ContatoFormScreen ao services/api.js, removendo qualquer import de data/contatos, adicionando useFocusEffect para recarregar ao voltar do formulário e tratando loading, erro da API e diálogo de exclusão"

**Resultado:** Telas 06 e 07 integradas à API real, com feedback visual fluido (`ActivityIndicator`), tratamento de lista vazia contextual, banner de erros e recarregamento automático no retorno.

#### Botão de Saída Rápida com Quick Exit Global (Gemini / Antigravity)

**Prompt:** "implemente o BotaoSaidaRapida.js com visual camuflado de 'Salvar rascunho' e navigation.reset para PratoTabs sem confirmação, inserindo-o de forma sobreposta no SafeTabs para cobrir todas as 5 abas e qualquer tela empilhada"

**Resultado:** Componente flutuante estilizado com `zIndex: 9999` e `useSafeAreaInsets` posicionado na raiz de `SafeTabs.js`, garantindo que um toque em qualquer tela do SAFE encerre a sessão protegida e limpe o histórico de navegação.

#### Auditoria de PRs com Skill /pr-code-reviewer

**Prompt:** "execute a skill /pr-code-reviewer para auditar o diff da implementação contra os critérios de aceite da issue, regras de segurança da vítima e integridade do projeto"

**Resultado:** Emissão de pareceres técnicos conclusivos e estruturados nas 4 dimensões obrigatórias, confirmando 100% de conformidade técnica antes da submissão dos PRs #90, #91 e #92 para revisão.

### O que eu aprendi e decidi

* Em arquiteturas de back-end com Express e PostgreSQL, o uso sistemático de Prepared Statements não é apenas uma boa prática de desempenho, mas o requisito fundamental de segurança para neutralizar vetores de SQL Injection.
* A validação de integridade referencial em nível de aplicação (como a verificação prévia da existência do `usuaria_id`) melhora expressivamente a experiência do usuário, pois traduz erros brutos de banco de dados em respostas amigáveis (`400 Bad Request`) com mensagens orientativas.
* Em soluções digitais de apoio a vítimas de violência doméstica, os mecanismos de saída rápida (*Quick Exit*) devem priorizar a segurança física acima de qualquer confirmação de perda de dados: se a vítima for surpreendida, um único toque deve fechar a área protegida sem travas, e a pilha de histórico deve ser purgada para que o botão nativo do Android não reabra a aplicação segura.
* A governança de código com commits atômicos vinculados a issues (`Closes #N`) e auditorias automatizadas via `/pr-code-reviewer` proporciona total rastreabilidade das contribuições individuais de cada membro da equipe.


## Entrega Final: Higor Domingos

### Onde foram usadas

| Parte do projeto | Ferramenta | Como foi usada | Revisado por |
|---|---|---|---|
| Rotas RESTful de Alertas SOS (API) | Gemini / Antigravity | Construção de `api/src/rotas/alertas.js` com os 5 métodos HTTP, validação estrita do DER, checagem de chave estrangeira (`usuaria_id` e `viagem_id`) e prepared statements | Higor Domingos |
| Painel Agregado da Delegacia (API e Web) | Gemini / Antigravity | Criação da rota agregada `GET /painel` com JOIN em usuárias e viagens, além do painel web responsivo em `painel/index.html` com atualização automática | Higor Domingos |
| Integração Mobile do SOS e Histórico | Gemini / Antigravity | Migração de `app/src/services/sos.js` e `AlertasHistoricoScreen.js` para consumo da API real, tratamento velado do *Duress PIN* e suporte a Update e Delete | Higor Domingos |
| Polling em tempo real no app | Gemini / Antigravity | Implementação de atualização periódica a cada 5s via `useEffect` no histórico de alertas | Higor Domingos |
| Modelagem de Machine Learning (Etapa 4 - DS) | Gemini / Antigravity | Construção dos pipelines com `RobustScaler`, `OneHotEncoder`, divisão temporal estrita, validação cruzada com `TimeSeriesSplit` (Regressão Logística e Random Forest) e clusterização K-Means | Higor Domingos |
| Governança e auditoria de issues | Gemini / Antigravity | Criação da skill `.agents/skills/issue-closer/SKILL.md` para auditoria formal de critérios de aceite e ordem de fechamento no GitHub | Higor Domingos |

### Prompts testados

#### Rotas de Alertas SOS e Painel (Gemini / Antigravity)

**Prompt:** "construa as rotas RESTful para alertas_sos em api/src/rotas/alertas.js e a rota agregada em painel.js seguindo o padrão _modelo.js, com validação de chaves estrangeiras, prepared statements e documentação no README"

**Resultado:** Endpoints completos com tratamento padronizado `{ "erro": "..." }`, validação de `usuaria_id` e `viagem_id` via `garantirExiste()` e documentação no `api/README.md`.

#### Integração do SOS Silencioso (Gemini / Antigravity)

**Prompt:** "atualize o serviço sos.js e a tela AlertasHistoricoScreen para consumir a API Supabase sem dados simulados, mantendo a regra de segurança de não alertar o agressor quando o gatilho for DURESS_PIN e adicionando polling periódico"

**Resultado:** Integração fluida com tratamento silencioso de erros no modo de coação, eliminação de imports de `data/alertas.js` e ações de avançar status e excluir alerta na interface.

#### Modelagem e Comparação de Modelos (Gemini / Antigravity)

**Prompt:** "implemente a Etapa 4 no notebook.ipynb com divisão temporal treino (até 2015) e teste (2016-2022), TimeSeriesSplit, RobustScaler dentro de Pipeline, Regressão Logística, Random Forest e K-Means para os perfis das 27 capitais, sem vazamento de dados"

**Resultado:** Células executáveis no notebook com engenharia de atributos retroativos (lags e médias móveis), comparação de métricas focando em Recall e justificativa metodológica alinhada para a Etapa 5 do João Pedro (#82).

### O que eu aprendi e decidi

* A persistência de dados críticos de emergência deve priorizar a integridade referencial: vincular o alerta à usuária e à viagem ativa garante rastreabilidade jurídica sem expor dados desnecessários.
* A regra de segurança do *Duress PIN* é inegociável: mesmo em caso de falha de conexão ou timeout na API, o aplicativo jamais pode emitir alertas visuais de erro na tela de disfarce, resguardando a integridade física da mulher.
* Na modelagem preditiva de séries temporais sociais, o uso de `TimeSeriesSplit` e o cálculo de estatísticas (como a mediana de corte) exclusivamente na janela de treino é indispensável para evitar o vazamento de dados (*look-ahead bias*), garantindo estimativas acadêmicas confiáveis para a equipe.



## Entrega Final: Higor Bueno

### Onde foram usadas

| Parte do projeto | Ferramenta | Como foi usada | Revisado por |
|---|---|---|---|
| Rotas RESTful de Viagens Seguras e Check-ins (API) | Gemini / Antigravity | Construção de `api/src/rotas/viagens.js` e `api/src/rotas/checkins.js` com os 5 métodos HTTP, validação estrita do DER (`status_viagem`, `status_resposta`), integridade referencial via `garantirExiste` e documentação no `api/README.md` | Higor Bueno |
| Camada de Serviços da API (`services/api.js`) | Gemini / Antigravity | Adição de funções cliente para criar, buscar, atualizar, encerrar e cancelar viagens seguras e registrar check-ins | Higor Bueno |
| Integração Mobile de Nova Viagem (Tela 08) | Gemini / Antigravity | Atualização de `ViagemNovaScreen.js` para criar viagem real via `POST /viagens`, carregar contatos de confiança da API e redirecionar para a Tela 09 com o ID gerado, eliminando dados mockados | Higor Bueno |
| Integração Mobile de Viagem em Andamento (Tela 09) | Gemini / Antigravity | Atualização de `ViagemEmAndamentoScreen.js` para sincronização em tempo real da `previsao_chegada`, registro de check-ins via `POST /checkins` ao solicitar mais 10 minutos e encerramento com "Cheguei segura" via `PUT /viagens/:id` | Higor Bueno |
| Consolidação, Execução e Governança de Data Science (Issue #74) | Gemini / Antigravity | Atualização do título, seção 7 com síntese do pipeline e checklist da Entrega Final no notebook, validação das saídas e gráficos embutidos, criação do `data-science/requirements.txt` e atualização detalhada da seção de Data Science no README | Higor Bueno |
| Auditoria e Governança de Issues | Gemini / Antigravity | Levantamento, filtragem e ordenação topológica das issues da Entrega Final abertas pela Alana, garantindo atendimento à Definição de Pronto (DoD) | Higor Bueno |

### Prompts testados

#### Rotas da API de Viagens e Check-ins (Gemini / Antigravity)

**Prompt:** "construa as rotas RESTful para viagens_seguras em api/src/rotas/viagens.js e checkins_viagem em api/src/rotas/checkins.js seguindo o padrão _modelo.js, com validação de campos do DER, conferência de chave estrangeira com usuarias e viagens_seguras via garantirExiste, e atualização da tabela de rotas do api/README.md"

**Resultado:** Criação de endpoints robustos com tratamento padronizado `{ "erro": "..." }`, prepared statements para prevenção de SQL injection e suporte a filtros por `usuaria_id` e `viagem_id`.

#### Integração das Telas 08 e 09 com a API (Gemini / Antigravity)

**Prompt:** "atualize ViagemNovaScreen e ViagemEmAndamentoScreen para consumir os serviços da API em app/src/services/api.js, removendo completamente os imports de data/viagens.js e data/contatos.js, gerenciando estados de carregamento e erro, e registrando check-ins e encerramento no Supabase"

**Resultado:** Migração completa das telas para consumo assíncrono da API, cálculo preciso do anel de progresso com base na previsão de chegada e eliminação total de acoplamento a dados simulados locais.

#### Consolidação e Execução de Data Science (Gemini / Antigravity)

**Prompt:** "atualize o notebook.ipynb para a Entrega Final com título, mapa do notebook e seção 7 de conclusões e checklist completo, garantindo que todas as 34 células executem em ordem com saídas e gráficos visíveis, crie o data-science/requirements.txt e atualize a seção de Data Science do README.md com o modelo Random Forest escolhido, métricas comparadas aos pisos e integração no app"

**Resultado:** Notebook totalmente executado com saídas, tabelas e gráficos renderizados, requirements.txt com todas as dependências especificadas e documentação metodológica detalhada no README e no próprio notebook, fechando a issue #74.


### O que eu aprendi e decidi

* A separação entre o ciclo de vida da viagem (`viagens_seguras`) e os seus marcos periódicos (`checkins_viagem`) viabiliza auditoria forense detalhada em caso de atraso ou acionamento de SOS, com integridade referencial protegida no banco relacional.
* No desenvolvimento mobile para situações de risco, o botão "Cheguei segura" deve encerrar a viagem e persistir o carimbo de data/hora (`finalizado_em`) no back-end antes de resetar a navegação, assegurando que o status no painel da delegacia seja imediatamente atualizado.
* A eliminação gradual de dados mockados em favor de um cliente unificado de API (`services/api.js`) centraliza o tratamento de falhas de rede (`try/catch`) e uniformiza a experiência da usuária em todo o ecossistema do app.


## Entrega Final: João Pedro

### Onde foram usadas

| Parte do projeto | Ferramenta | Como foi usada | Revisado por |
|---|---|---|---|
| Rotas RESTful do Cofre de Incidentes (API) | Gemini / Antigravity | Criação de `api/src/rotas/incidentes.js` com os 5 endpoints (`GET`, `GET /:id`, `POST`, `PUT /:id`, `DELETE /:id`), validação dos campos do DER (`tipo_violencia`, `data_ocorrencia`, `relato_detalhado`), relacionamento real com `usuarias` via `garantirExiste()` e atualização de `api/README.md` | João Pedro |
| Camada de Serviços e Helpers do Cofre | Gemini / Antigravity | Adição das funções `listarIncidentes`, `buscarIncidente`, `criarIncidente`, `atualizarIncidente` e `removerIncidente` em `app/src/services/api.js` e centralização de `TIPOS_VIOLENCIA`, datas e evidências em `app/src/services/incidentes.js` | João Pedro |
| Integração Mobile das Telas 10, 11 e 12 | Gemini / Antigravity | Atualização de `IncidentesListScreen.js`, `IncidenteFormScreen.js` e `IncidenteDetalheScreen.js` para consumir a API real, tratar estados de carregamento/erro, confirmar exclusão inline e remover 100% dos imports de `app/src/data/incidentes.js` | João Pedro |

### Prompts testados

#### Rotas do Cofre de Incidentes na API (Gemini / Antigravity)

**Prompt:** "crie api/src/rotas/incidentes.js seguindo o padrão de _modelo.js com os 5 endpoints RESTful de cofre_incidentes, validando os campos e tipos de violência do DER, ordenação do mais novo para o mais antigo, relacionamento com usuarias via garantirExiste() e atualização do api/README.md"

**Resultado:** Rotas completas com consultas parametrizadas (`$1, $2...`), tratamento padronizado `{ "erro": "..." }`, recusa de `usuaria_id` inexistente (`400`) e retorno `404` para IDs não encontrados, fechando a issue #80.

#### Integração das Telas 10, 11 e 12 com a API (Gemini / Antigravity)

**Prompt:** "adicione as funções de incidentes em app/src/services/api.js e conecte IncidentesListScreen, IncidenteFormScreen e IncidenteDetalheScreen à API, removendo os imports de data/incidentes.js, usando useFocusEffect para recarregar a lista e tratando estados de loading, erro da API e confirmação de exclusão"

**Resultado:** Telas 10, 11 e 12 integradas à API real com helpers centralizados em `app/src/services/incidentes.js`, feedback de carregamento/erro, exclusão com confirmação inline e eliminação total de mocks locais, fechando a issue #81.

### O que eu aprendi e decidi

* Centralizar constantes de domínio e formatações em `app/src/services/incidentes.js` evita duplicação entre as telas de lista, formulário e detalhe e permite remover completamente a dependência de `app/src/data/` sem perder a identidade visual do protótipo.
* Substituir diálogos nativos `Alert.alert` com múltiplos botões por banners inline de erro e confirmação de exclusão garante o mesmo comportamento no celular e no navegador (Expo Web).
* Validar `usuaria_id` com `garantirExiste()` antes de gravar em `cofre_incidentes` assegura integridade referencial e devolve mensagens claras (`400 Bad Request`) ao aplicativo em vez de erros genéricos de banco.



## Entrega Final: Alana Caled

### Onde foram usadas

| Parte do projeto | Ferramenta | Como foi usada | Revisado por |
|---|---|---|---|
| Ordem das issues | Claude (Claude Code) | Análise do repositório e das issues #87, #67 e #68 para decidir a ordem: a #87 primeiro, porque as outras duas dependem do `id` da usuária guardado no primeiro acesso | Alana Caled |
| Protótipo do primeiro acesso (#87) | Claude (Claude Design e Claude Code) | Criação dos layputs das 5 telas do primeiro acesso no visual da fachada e exportação em PNG no mesmo tamanho dos protótipos anteriores (`prato-05` a `prato-09`) | Alana Caled |
| Primeiro acesso, gatilho do PIN e Ajustes (#87, #68 e #67) | Claude (Claude Code) | Sugestão de código (tela de primeiro acesso, `sessao.js`, `RootStack`, PINs vindos da API na tela de Metas), digitado, adaptado e testado por mim; revisão antes de cada commit | Alana Caled |
| Revisão das issues fechadas na madrugada de 19/11 | Claude (Claude Code), em outra máquina | Revisão do código das issues #67, #68, #70 e #71 antes de fechar: conferir se seguia o `padroes-de-codigo.md` (cores do tema, nomes do DER, cabeçalhos), se o Círculo usava a usuária do celular e se o notebook tinha sido executado com as saídas. Resultou nos ajustes do Círculo, da saída rápida, das cores do histórico de alertas e da validação cruzada ordenada por ano | Alana Caled |
| Revisão dos PRs do grupo | Claude (Claude Code) | Simulação dos merges e leitura do código dos PRs #90 a #96: encontrou o `removerAlerta` sem `DELETE` no #91, o `listarContatos` repetido entre o #91 e o #96 e os créditos de Data Science removidos do README no #93. Os comentários de revisão foram escritos com a IA e aprovados por mim antes de publicar | Alana Caled |
| Revisão do Cofre de Incidentes (#80 e #81) | Claude (Claude Code) | Teste das 16 rotas de `/incidentes` e do fluxo no navegador; encontrou a falta da tabela de testes no README, o campo de notas sem lugar para digitar e textos que prometiam criptografia e PDF assinado. Os ajustes foram feitos no PR #97 | Alana Caled |
| Avaliação do modelo (#82) | Claude (Claude Code) | Células da seção 6.4 (pisos recalculados com o mesmo alvo, tabela de métricas, matriz de confusão, comparação com o piso e silhueta do K-Means), coladas e executadas por mim no Colab; texto da decisão escrito a partir dos números que eu obtive | Alana Caled |
| Conferência da modelagem (#79) | Claude (Claude Code) | Comparação das saídas salvas no notebook com uma execução do zero: os números não batiam, e a correção foi registrada na issue | Alana Caled |
| Conferência da entrega | Claude (Claude Code) | Comparação do repositório com o checklist da Entrega Final: rotas da API testadas, telas ainda usando a usuária de teste, indicador da Tela 17 (#83) faltando e README e Kanban desatualizados | Alana Caled |
| Correções encontradas nos testes | Claude (Claude Code) | Diagnóstico de três problemas que vi testando o app: telas de Viagem gravando na usuária de teste, datas voltando 3 horas adiantadas (o `pg` lia as colunas `timestamp` em UTC como horário de Brasília) e lixeira do histórico de alertas sem efeito no navegador (o `Alert.alert` não funciona no react-native-web). O código das correções veio no chat, e eu apliquei e testei antes do commit | Alana Caled |
| Extras da fachada Pratô | Claude (Claude Code) | Código escrito pela IA, a partir da minha ideia: tela de detalhe da receita (ingredientes e modo de preparo) e botão + do Diário registrando a refeição do dia no celular. Revisei e testei no navegador antes de aprovar o PR #101 | Alana Caled |
| Painel da Delegacia em React Native | Claude (Claude Code) | Código escrito pela IA, a partir do protótipo do grupo: o painel em HTML virou um app Expo web separado, com contadores, lista, mapa ilustrado e botões de atendimento ligados à API. Revisei, testei com a API e o banco reais e aprovei o PR #102 | Alana Caled |

### Prompts testados

#### Ordem das issues (Claude Code)

**Prompt:** "analise o projeto e olhe a issue #87, quero adicionar os protótipos da tela, esse é o melhor momento ou é melhor fazer as outras issues antes?"

**Resultado:** recomendação de fazer a #87 primeiro, com os protótipos junto, e depois a #68 e a #67, porque as duas precisam do `id` guardado no primeiro acesso.

#### Revisão das issues da madrugada (Claude Code, outra máquina)

**Prompt (resumo):** "revise o código dessas issues e veja se está no padrão do projeto e se o notebook foi testado antes de eu fechar"

**Resultado:** o Círculo ainda usava a usuária de teste, cores soltas no histórico de alertas e a validação cruzada sem ordenar por ano; a #79 foi reaberta porque o notebook não tinha saídas

#### Revisão dos PRs do grupo (Claude Code)

**Prompt:** "Analise os prs do felipe e do higor, veja se posso dar merge em algum"

**Resultado:** três PRs liberados para merge e dois com ajustes pedidos; a simulação dos merges mostrou os conflitos e a ordem certa (#90 antes do #96, por causa da rota `/contatos`).

#### Avaliação do modelo (Claude Code)

**Prompt:** "me ajude a fazê-la, não commite nada, me mande aqui pra eu tentar fazer"

**Resultado:** células da seção 6.4 para colar no Colab. Ao rodar do zero, a Random Forest teve recall 0,931 e superou o piso de "repetir o ano anterior"; as saídas da modelagem ficaram diferentes das que estavam salvas antes.

#### Conferência da entrega (Claude Code)

**Prompt:** "com o que temos hoje (em relação a código e forma como foi organizado o projeto), está tudo de acordo com a forma da entrega?", junto com o texto do enunciado

**Resultado:** checklist item por item. A API respondia nas 7 rotas e o app abria sem erros, mas faltavam o indicador na Tela 17 (#83), as telas de Viagem usavam a usuária de teste e o README ainda dizia que a modelagem não tinha terminado.

#### Horário errado na viagem (Claude Code)

**Prompt:** "Tá certo isso?", com prints da Nova viagem (chegada às 10:35) e da viagem em andamento (chegada às 13:35, 194 minutos restantes)

**Resultado:** a consulta direta ao banco mostrou que ele gravava certo em UTC, e o erro estava na leitura. Uma linha no `db.js` resolveu as datas do app inteiro, inclusive o Cofre.

#### Extras da fachada e painel (Claude Code)

**Prompt:** "no botão + a pessoa conseguir adicionar uma refeição de fato e na receita, quando clica abrir de fato a receita, criar também a tela que a polícia vê", e depois "o painel está feio, quero igual o do protótipo, usando react native como todas as telas"

**Resultado:** a IA mostrou que o painel da delegacia já existia em HTML e recomendou fazer a refeição sem banco, para não mexer no schema no dia da entrega. O código dos três extras foi escrito por ela numa cópia separada do projeto, sem misturar com as minhas correções ainda sem commit, e testado no navegador antes dos PRs.

### O que eu aprendi e decidi

* Todo código sugerido foi lido, adaptado e testado por mim (no navegador, no Expo Go ou no Colab) antes do commit, e eu mesma fiz os commits.
* Decidi a ordem das minhas issues (#87, depois #68 e #67) e assumi a avaliação do modelo (#82) no lugar do João Pedro.
* Aprendi a comparar o modelo com um piso calculado do mesmo jeito: comparar com um piso feito com outro alvo daria uma conclusão errada.
* Uma execução do zero ("Reiniciar e executar tudo") é a prova de que o notebook funciona; saídas salvas de outra execução podem não bater com o código.
* Os comentários nos PRs e nas issues do grupo foram revisados e aprovados por mim antes de serem publicados.
* Nos extras (receita, refeição e painel), o código foi escrito pela IA e eu revisei, testei e aprovei os PRs. Decidi fazer a refeição só no celular, sem criar tabela nova, para não arriscar o banco no dia da entrega.
* Testar o app de verdade, e não só ler o código, foi o que mostrou os erros de horário e da lixeira: os dois só aparecem com o app rodando no navegador.
