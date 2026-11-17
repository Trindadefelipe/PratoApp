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
| Auditoria e Governança de Issues | Gemini / Antigravity | Levantamento, filtragem e ordenação topológica das issues da Entrega Final abertas pela Alana, garantindo atendimento à Definição de Pronto (DoD) | Higor Bueno |

### Prompts testados

#### Rotas da API de Viagens e Check-ins (Gemini / Antigravity)

**Prompt:** "construa as rotas RESTful para viagens_seguras em api/src/rotas/viagens.js e checkins_viagem em api/src/rotas/checkins.js seguindo o padrão _modelo.js, com validação de campos do DER, conferência de chave estrangeira com usuarias e viagens_seguras via garantirExiste, e atualização da tabela de rotas do api/README.md"

**Resultado:** Criação de endpoints robustos com tratamento padronizado `{ "erro": "..." }`, prepared statements para prevenção de SQL injection e suporte a filtros por `usuaria_id` e `viagem_id`.

#### Integração das Telas 08 e 09 com a API (Gemini / Antigravity)

**Prompt:** "atualize ViagemNovaScreen e ViagemEmAndamentoScreen para consumir os serviços da API em app/src/services/api.js, removendo completamente os imports de data/viagens.js e data/contatos.js, gerenciando estados de carregamento e erro, e registrando check-ins e encerramento no Supabase"

**Resultado:** Migração completa das telas para consumo assíncrono da API, cálculo preciso do anel de progresso com base na previsão de chegada e eliminação total de acoplamento a dados simulados locais.

### O que eu aprendi e decidi

* A separação entre o ciclo de vida da viagem (`viagens_seguras`) e os seus marcos periódicos (`checkins_viagem`) viabiliza auditoria forense detalhada em caso de atraso ou acionamento de SOS, com integridade referencial protegida no banco relacional.
* No desenvolvimento mobile para situações de risco, o botão "Cheguei segura" deve encerrar a viagem e persistir o carimbo de data/hora (`finalizado_em`) no back-end antes de resetar a navegação, assegurando que o status no painel da delegacia seja imediatamente atualizado.
* A eliminação gradual de dados mockados em favor de um cliente unificado de API (`services/api.js`) centraliza o tratamento de falhas de rede (`try/catch`) e uniformiza a experiência da usuária em todo o ecossistema do app.

