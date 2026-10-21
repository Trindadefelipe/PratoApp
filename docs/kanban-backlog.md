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
* [x] **[Geral]** Criação e estruturação inicial do repositório Git. *(Resp: Felipe)* — [#2](https://github.com/Trindadefelipe/PratoApp/issues/2)
* [x] **[Geral]** Elaboração da Matriz de Papéis e Responsabilidades e Justificativa do disfarce "Pratô". *(Resp: Alana/Equipe)* — [#3](https://github.com/Trindadefelipe/PratoApp/issues/3)
* [x] **[Mobile]** Desenho dos wireframes/protótipos de tela (Pratô e SAFE). *(Resp: Higor B. e Higor D.)* — [#4](https://github.com/Trindadefelipe/PratoApp/issues/4)
* [x] **[API]** Modelagem do Diagrama Entidade-Relacionamento (DER) das 5 entidades. *(Resp: João Pedro e Felipe)* — [#5](https://github.com/Trindadefelipe/PratoApp/issues/5)
* [x] **[Data Science]** Definição e justificativa da base de dados pública (Atlas da Violência / IPEA / Ligue 180). *(Resp: Equipe DS)* — [#6](https://github.com/Trindadefelipe/PratoApp/issues/6)

---

### 🔹 Sprint 2: Estrutura Mobile, Fachada Pratô & Análise Exploratória (15/10/2026) — *Entrega 2*
* [ ] **[Mobile]** Setup do projeto React Native com Expo e React Navigation (Stack + BottomTabs). *(Resp: Felipe / Alana)* — [#7](https://github.com/Trindadefelipe/PratoApp/issues/7)
* [ ] **[Mobile]** Construção da interface visual de fachada do **Pratô** (Diário alimentar e metas). *(Resp: Alana)* — [#8](https://github.com/Trindadefelipe/PratoApp/issues/8)
* [ ] **[Mobile]** Implementação do primeiro gatilho de transição secreta (PIN no Pratô $\rightarrow$ SAFE). *(Resp: Alana / Higor D.)* — [#9](https://github.com/Trindadefelipe/PratoApp/issues/9)
* [ ] **[Mobile]** Telas navegáveis dos 5 módulos com dados estáticos/visuais prontos. *(Resp: Todos nos seus CRUDs)* — [#10](https://github.com/Trindadefelipe/PratoApp/issues/10)
* [ ] **[Data Science]** Download, carga da base pública no Jupyter Notebook e documentação de Governança (LGPD). *(Resp: Alana)* — [#11](https://github.com/Trindadefelipe/PratoApp/issues/11)
* [ ] **[Data Science]** Análise Exploratória de Dados (EDA) completa com estatísticas descritivas e histogramas/gráficos. *(Resp: Felipe)* — [#12](https://github.com/Trindadefelipe/PratoApp/issues/12)
* [ ] **[Data Science]** Limpeza, tratamento de nulos e normalização de variáveis. *(Resp: Higor Bueno)* — [#13](https://github.com/Trindadefelipe/PratoApp/issues/13)

---

### 🔹 Sprint 3: Interatividade dos CRUDs, Quick Exit & Primeiro Modelo (29/10/2026) — *Entrega 3*
* [ ] **[Mobile]** Adição de estado reativo (`useState` / `useEffect`) nos formulários e listagens de cada CRUD. *(Resp: Cada integrante)* — [#14](https://github.com/Trindadefelipe/PratoApp/issues/14)
* [ ] **[Mobile]** Implementação do Botão de Saída Rápida (*Quick Exit*) e *Duress PIN*. *(Resp: Higor Domingos / Alana)* — [#15](https://github.com/Trindadefelipe/PratoApp/issues/15)
* [ ] **[Mobile]** Criação do componente visual de mapa e captura de coordenadas GPS com `expo-location`. *(Resp: Higor D. / Higor B.)* — [#16](https://github.com/Trindadefelipe/PratoApp/issues/16)
* [ ] **[Data Science]** Treinamento da primeira versão do modelo preditivo / clusterização (Scikit-Learn). *(Resp: Higor Domingos)* — [#17](https://github.com/Trindadefelipe/PratoApp/issues/17)
* [ ] **[Data Science]** Primeiras métricas e matriz de confusão. *(Resp: João Pedro)* — [#18](https://github.com/Trindadefelipe/PratoApp/issues/18)

---

### 🔹 Sprint 4: Back-end API, Painel da Delegacia & Integração Final (12/11/2026) — *Entrega 4*
* [ ] **[API]** Criação da API RESTful em Node.js com Express e conexão com banco PostgreSQL. *(Resp: Todos em seus endpoints)* — [#19](https://github.com/Trindadefelipe/PratoApp/issues/19)
* [ ] **[API]** Migrations e scripts de seed populando banco com personas fictícias de teste. *(Resp: Felipe / João Pedro)* — [#20](https://github.com/Trindadefelipe/PratoApp/issues/20)
* [ ] **[Painel]** Desenvolvimento da tela Web do Dashboard da Delegacia em tempo real com mapa e alertas sonoros/visuais. *(Resp: Higor Domingos)* — [#21](https://github.com/Trindadefelipe/PratoApp/issues/21)
* [ ] **[Mobile]** Substituição total de dados mocados por chamadas HTTP reais (`axios`) aos endpoints da API. *(Resp: Cada integrante)* — [#22](https://github.com/Trindadefelipe/PratoApp/issues/22)
* [ ] **[Data Science]** Integração do resultado/indicador de risco dentro da tela do app mobile. *(Resp: João Pedro / Higor B.)* — [#23](https://github.com/Trindadefelipe/PratoApp/issues/23)
* [ ] **[Doc]** Revisão geral do README, checklist final de entrega e atualização do `USO_IA.md`. *(Resp: Equipe)* — [#24](https://github.com/Trindadefelipe/PratoApp/issues/24)

---

### 🔹 Sprint 5: Defesa Final & Apresentação (23/11/2026)
* [ ] **[Testes]** Validação do checklist de ponta a ponta e ensaio geral da apresentação para a banca. *(Resp: Todos os 5 integrantes)* — [#25](https://github.com/Trindadefelipe/PratoApp/issues/25)
