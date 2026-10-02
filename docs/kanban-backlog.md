# 📊 Backlog Inicial e Quadro Kanban do Projeto

**Metodologia:** Kanban com sprints quinzenais alinhadas às datas de entrega oficiais do Projeto Integrador.  
**Ferramenta Sugerida:** GitHub Projects / Trello / Notion  

---

## 📌 Colunas Padrão do Quadro Kanban

1. **📋 A Fazer (Backlog)**
2. **🔄 Em Andamento (In Progress)**
3. **👀 Em Revisão / Code Review**
4. **✅ Concluído (Done)**

---

## 🗓️ Cronograma e Backlog de Tarefas por Sprint

### 🔹 Sprint 1: Planejamento, Disfarce & Modelagem (01/10/2026) — *Entrega 1*
* [x] **[Geral]** Criação e estruturação inicial do repositório Git. *(Resp: Felipe)*
* [x] **[Geral]** Elaboração da Matriz de Papéis e Responsabilidades. *(Resp: Equipe)*
* [x] **[Geral]** Documentação e justificativa do conceito de disfarce "Pratô". *(Resp: Alana)*
* [x] **[Data Science]** Definição e justificativa da base de dados pública (Atlas da Violência / IPEA / Ligue 180). *(Resp: Equipe DS)*
* [x] **[Mobile]** Desenho dos wireframes/protótipos de tela (Pratô e SAFE). *(Resp: Higor B. e Higor D.)*
* [x] **[API]** Modelagem do Diagrama Entidade-Relacionamento (DER) das 5 entidades. *(Resp: João Pedro e Felipe)*
* [x] **[Doc]** Criação e preenchimento inicial do arquivo `USO_IA.md`. *(Resp: Equipe)*

---

### 🔹 Sprint 2: Estrutura Mobile, Fachada Pratô & Análise Exploratória (15/10/2026) — *Entrega 2*
* [ ] **[Mobile]** Setup do projeto React Native com Expo e React Navigation (Stack + BottomTabs). *(Resp: Felipe / Alana)*
* [ ] **[Mobile]** Construção da interface visual de fachada do **Pratô** (Diário alimentar e metas). *(Resp: Alana)*
* [ ] **[Mobile]** Implementação do primeiro gatilho de transição secreta (PIN no Pratô $\rightarrow$ SAFE). *(Resp: Alana / Higor D.)*
* [ ] **[Mobile]** Telas navegáveis dos 5 módulos com dados estáticos/visuais prontos. *(Resp: Todos nos seus CRUDs)*
* [ ] **[Data Science]** Download, carga da base pública no Jupyter Notebook e documentação de Governança (LGPD). *(Resp: Alana)*
* [ ] **[Data Science]** Análise Exploratória de Dados (EDA) completa com estatísticas descritivas e histogramas/gráficos. *(Resp: Felipe)*
* [ ] **[Data Science]** Limpeza, tratamento de nulos e normalização de variáveis. *(Resp: Higor Bueno)*

---

### 🔹 Sprint 3: Interatividade dos CRUDs, Quick Exit & Primeiro Modelo (29/10/2026) — *Entrega 3*
* [ ] **[Mobile]** Adição de estado reativo (`useState` / `useEffect`) nos formulários e listagens de cada CRUD. *(Resp: Cada integrante)*
* [ ] **[Mobile]** Implementação do Botão de Saída Rápida (*Quick Exit*) e *Duress PIN*. *(Resp: Higor Domingos / Alana)*
* [ ] **[Mobile]** Criação do componente visual de mapa e captura de coordenadas GPS com `expo-location`. *(Resp: Higor D. / Higor B.)*
* [ ] **[Data Science]** Treinamento da primeira versão do modelo preditivo / clusterização (Scikit-Learn). *(Resp: Higor Domingos)*
* [ ] **[Data Science]** Primeiras métricas e matriz de confusão. *(Resp: João Pedro)*

---

### 🔹 Sprint 4: Back-end API, Painel da Delegacia & Integração Final (12/11/2026) — *Entrega 4*
* [ ] **[API]** Criação da API RESTful em Node.js com Express e conexão com banco PostgreSQL. *(Resp: Todos em seus endpoints)*
* [ ] **[API]** Migrations e scripts de seed populando banco com personas fictícias de teste. *(Resp: Felipe / João Pedro)*
* [ ] **[Painel]** Desenvolvimento da tela Web do Dashboard da Delegacia em tempo real com mapa e alertas sonoros/visuais. *(Resp: Higor Domingos)*
* [ ] **[Mobile]** Substituição total de dados mocados por chamadas HTTP reais (`axios`) aos endpoints da API. *(Resp: Cada integrante)*
* [ ] **[Data Science]** Integração do resultado/indicador de risco dentro da tela do app mobile. *(Resp: João Pedro / Higor B.)*
* [ ] **[Doc]** Revisão geral do README, checklist final de entrega e atualização do `USO_IA.md`. *(Resp: Equipe)*

---

### 🔹 Sprint 5: Defesa Final & Apresentação (23/11/2026)
* [ ] **[Apresentação]** Gravação do vídeo de demonstração ou ensaio geral para a banca presencial. *(Resp: Todos os 5 integrantes)*
* [ ] **[Testes]** Validação do checklist de ponta a ponta sem falhas de conexão. *(Resp: Equipe)*
