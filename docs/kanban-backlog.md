# 📊 Backlog e Quadro Kanban do Projeto

**Metodologia:** Kanban com sprints quinzenais alinhadas às datas de entrega oficiais do Projeto Integrador.  
**Ferramenta:** [GitHub Projects](https://github.com/users/alanakaled10/projects/1)  
**Como funciona:** Cada cartão é uma issue rastreável do repositório. Issue fechada é movida para **Concluído** automaticamente.  

---

## 📌 Colunas Padrão do Quadro Kanban

1. **📋 A Fazer (Backlog)**
2. **🔄 Em Andamento (In Progress)**
3. **👀 Em Revisão / Code Review (PR Aberto)**
4. **✅ Concluído (Done)**

---

## 🗓️ Cronograma e Backlog de Tarefas por Sprint

### 🔹 Sprint 1: Planejamento, Disfarce & Modelagem (01/10/2026) — *Entrega 1 (Concluída)*
* [x] **[Geral]** Criação e estruturação inicial do repositório Git. *(Resp: Felipe)* — [#2](https://github.com/Trindadefelipe/PratoApp/issues/2)
* [x] **[Geral]** Elaboração da Matriz de Papéis e Responsabilidades e Justificativa do disfarce "Pratô". *(Resp: Alana/Equipe)* — [#3](https://github.com/Trindadefelipe/PratoApp/issues/3)
* [x] **[Mobile]** Desenho dos wireframes/protótipos de tela (Pratô e SAFE). *(Resp: Higor B. e Higor D.)* — [#4](https://github.com/Trindadefelipe/PratoApp/issues/4)
* [x] **[API]** Modelagem do Diagrama Entidade-Relacionamento (DER) das 5 entidades. *(Resp: João Pedro e Felipe)* — [#5](https://github.com/Trindadefelipe/PratoApp/issues/5)
* [x] **[Data Science]** Definição e justificativa da base de dados pública (Atlas da Violência / IPEA / Ligue 180). *(Resp: Equipe DS)* — [#6](https://github.com/Trindadefelipe/PratoApp/issues/6)

---

### 🔹 Sprint 2: Estrutura Mobile, Fachada Pratô & Análise Exploratória (15/10/2026) — *Entrega 2 (Concluída)*
* [x] **[Mobile]** Setup do projeto React Native com Expo e React Navigation (Stack + BottomTabs). *(Resp: Felipe / Alana)* — [#29](https://github.com/Trindadefelipe/PratoApp/issues/29), [#30](https://github.com/Trindadefelipe/PratoApp/issues/30), [#31](https://github.com/Trindadefelipe/PratoApp/issues/31), [#32](https://github.com/Trindadefelipe/PratoApp/issues/32)
* [x] **[Mobile]** Interface visual da fachada **Pratô** (Diário alimentar e metas). *(Resp: Alana)* — [#33](https://github.com/Trindadefelipe/PratoApp/issues/33), [#34](https://github.com/Trindadefelipe/PratoApp/issues/34), [#35](https://github.com/Trindadefelipe/PratoApp/issues/35), [#36](https://github.com/Trindadefelipe/PratoApp/issues/36)
* [x] **[Mobile]** Implementação do primeiro gatilho de transição secreta (PIN no Pratô $\rightarrow$ SAFE). *(Resp: Alana / Higor D.)* — [#37](https://github.com/Trindadefelipe/PratoApp/issues/37), [#38](https://github.com/Trindadefelipe/PratoApp/issues/38), [#57](https://github.com/Trindadefelipe/PratoApp/issues/57)
* [x] **[Mobile]** Telas navegáveis dos 5 módulos com dados estáticos/visuais prontos. *(Resp: Todos nos seus CRUDs)* — [#54](https://github.com/Trindadefelipe/PratoApp/issues/54), [#44](https://github.com/Trindadefelipe/PratoApp/issues/44), [#49](https://github.com/Trindadefelipe/PratoApp/issues/49), [#58](https://github.com/Trindadefelipe/PratoApp/issues/58), [#39](https://github.com/Trindadefelipe/PratoApp/issues/39)
* [x] **[Data Science]** Carga da base pública e Governança LGPD. *(Resp: Alana)* — [#11](https://github.com/Trindadefelipe/PratoApp/issues/11)
* [x] **[Data Science]** Análise Exploratória de Dados (EDA) completa com estatísticas descritivas e histogramas. *(Resp: Felipe)* — [#47](https://github.com/Trindadefelipe/PratoApp/issues/47), [#48](https://github.com/Trindadefelipe/PratoApp/issues/48)
* [x] **[Data Science]** Limpeza, tratamento de nulos e normalização de variáveis. *(Resp: Higor Bueno)* — [#52](https://github.com/Trindadefelipe/PratoApp/issues/52), [#53](https://github.com/Trindadefelipe/PratoApp/issues/53)
* [x] **[Doc]** Atualização do `USO_IA.md` e do quadro Kanban. *(Resp: Equipe)* — [#27](https://github.com/Trindadefelipe/PratoApp/issues/27)

---

### 🔹 Sprints 3 e 4: Back-end API, Integração Mobile, Quick Exit & Data Science — *Entrega Final (19/11/2026)*
**Painel Geral:** [#86](https://github.com/Trindadefelipe/PratoApp/issues/86)

#### 🗄️ Infraestrutura e Back-end (API Express / Supabase)
* [x] **[API]** Criação do banco no Supabase com as 6 tabelas do DER e constraints de integridade. *(Resp: Alana)* — [#63](https://github.com/Trindadefelipe/PratoApp/issues/63)
* [x] **[API]** Estrutura da API Node.js/Express ligada ao Supabase com `pg`, CORS e middleware de erros. *(Resp: Alana)* — [#64](https://github.com/Trindadefelipe/PratoApp/issues/64)
* [x] **[API]** Rotas da tabela `usuarias` com hash scrypt e validação de PINs. *(Resp: Alana)* — [#65](https://github.com/Trindadefelipe/PratoApp/issues/65)
* [x] **[API]** Rotas da tabela `contatos_confianca` com validação de relacionamento real (`garantirExiste`). *(Resp: Felipe)* — [#69](https://github.com/Trindadefelipe/PratoApp/issues/69) *(PR #90 aberto)*
* [ ] **[API]** Rotas de viagens seguras e check-ins (`viagens_seguras` e `checkins_viagem`). *(Resp: Higor Bueno)* — [#72](https://github.com/Trindadefelipe/PratoApp/issues/72)
* [ ] **[API]** Rotas de alertas SOS (`alertas_sos`) com gravação silenciosa de coordenadas. *(Resp: Higor Domingos)* — [#75](https://github.com/Trindadefelipe/PratoApp/issues/75)
* [ ] **[API]** Rotas do cofre de incidentes (`cofre_incidentes`). *(Resp: João Pedro)* — [#80](https://github.com/Trindadefelipe/PratoApp/issues/80)

#### 📱 Integração Mobile & Segurança
* [x] **[Mobile]** Camada base de acesso HTTP no app (`services/api.js`). *(Resp: Alana)* — [#66](https://github.com/Trindadefelipe/PratoApp/issues/66)
* [x] **[Mobile]** Integração do Círculo de Confiança (Telas 06 e 07) consumindo a API real via `useFocusEffect`. *(Resp: Felipe)* — [#70](https://github.com/Trindadefelipe/PratoApp/issues/70) *(PR #91 aberto)*
* [x] **[Mobile]** Botão de saída rápida (*Quick Exit*) sobreposto a todas as telas do SAFE com `navigation.reset`. *(Resp: Felipe)* — [#77](https://github.com/Trindadefelipe/PratoApp/issues/77) *(PR #92 aberto)*
* [ ] **[Mobile]** Telas 13 e 14 consumindo a API com funcionalidade "Apagar meus dados". *(Resp: Alana)* — [#67](https://github.com/Trindadefelipe/PratoApp/issues/67)
* [ ] **[Mobile]** Primeiro acesso disfarçado criando usuária pela API. *(Resp: Alana)* — [#87](https://github.com/Trindadefelipe/PratoApp/issues/87)
* [ ] **[Mobile]** Entrada pelo PIN com códigos dinâmicos vindos da API. *(Resp: Alana)* — [#68](https://github.com/Trindadefelipe/PratoApp/issues/68)
* [ ] **[Mobile]** Telas 08 e 09 (Viagem Segura) consumindo a API. *(Resp: Higor Bueno)* — [#73](https://github.com/Trindadefelipe/PratoApp/issues/73)
* [ ] **[Mobile]** Botão SOS e histórico gravando alertas na API. *(Resp: Higor Domingos)* — [#76](https://github.com/Trindadefelipe/PratoApp/issues/76)
* [ ] **[Mobile]** Status dos alertas atualizando sozinho no Painel da Delegacia. *(Resp: Higor Domingos)* — [#78](https://github.com/Trindadefelipe/PratoApp/issues/78)
* [ ] **[Mobile]** Telas 10, 11 e 12 (Cofre de Incidentes) consumindo a API. *(Resp: João Pedro)* — [#81](https://github.com/Trindadefelipe/PratoApp/issues/81)
* [ ] **[Mobile]** Indicador da capital integrado na Tela 17 com aviso acadêmico. *(Resp: João Pedro)* — [#83](https://github.com/Trindadefelipe/PratoApp/issues/83)

#### 📊 Data Science
* [ ] **[Data Science]** Treinamento e comparação dos modelos de Machine Learning. *(Resp: Higor Domingos)* — [#79](https://github.com/Trindadefelipe/PratoApp/issues/79)
* [ ] **[Data Science]** Avaliação com métricas completas e validação cruzada. *(Resp: João Pedro)* — [#82](https://github.com/Trindadefelipe/PratoApp/issues/82)
* [ ] **[Data Science]** Notebook final executado e documentado com README de DS. *(Resp: Higor Bueno)* — [#74](https://github.com/Trindadefelipe/PratoApp/issues/74)

#### 📚 Governança, Documentação e Encerramento
* [x] **[Doc]** README raiz, modelagem DER e matriz de papéis com a arquitetura final. *(Resp: Felipe)* — [#71](https://github.com/Trindadefelipe/PratoApp/issues/71)
* [x] **[Doc]** Atualização do `USO_IA.md` com ferramentas e prompts da Entrega Final. *(Resp: Equipe)* — [#84](https://github.com/Trindadefelipe/PratoApp/issues/84)
* [ ] **[Geral]** Teste de ponta a ponta sem mocks e consolidação dos 5 envios no Blackboard. *(Resp: Equipe)* — [#85](https://github.com/Trindadefelipe/PratoApp/issues/85)
