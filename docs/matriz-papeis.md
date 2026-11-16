# 📋 Matriz de Papéis e Responsabilidades

**Projeto:** Pratô / SAFE (Sistema de Apoio e Fortalecimento Emergencial)  
**Curso:** Análise e Desenvolvimento de Sistemas — Universidade Positivo (Campus Londrina)  
**Disciplinas Integradas:** Desenvolvimento Móvel & Data Science  
**Professor:** Alex Junior Nunes  
**Semestre:** 2º Semestre de 2026  

---

## 👥 1. Tabela Geral de Atribuição de Responsabilidades

| Aluno(a) | CRUD Mobile & API sob Responsabilidade | Cursa Data Science? | Etapa de Data Science sob Responsabilidade | Contato (GitHub / E-mail) |
| :--- | :--- | :---: | :--- | :--- |
| **Alana Caled** | **Perfil & Acesso Camuflado**<br>• Gestão de usuárias, PINs secretos (Normal e Coação/Duress), preferências do disfarce Pratô e telas de autenticação/configuração. | **Sim** | **Governança, Ética & Aquisição**<br>• Identificação da fonte de dados pública, licenças, conformidade com a LGPD e documentação ética. | `@alanakaled10` |
| **Felipe Trindade** | **Círculo de Confiança (Rede de Apoio)**<br>• Cadastro, listagem, edição e exclusão de contatos de confiança, níveis de prioridade e canais de notificação. | **Sim** | **Análise Exploratória de Dados (EDA)**<br>• Análise estatística descritiva, dispersão, frequências e geração de visualizações gráficas iniciais. | `@Trindadefelipe` |
| **Higor Bueno** | **Modo Deslocamento (Viagem Segura & Check-in)**<br>• Gestão de viagens seguras, definição de trajetos/destinos, contagem de tempo estimado e botão "Cheguei Segura". | **Sim** | **Qualidade & Pré-processamento**<br>• Limpeza da base, tratamento de valores nulos/anômalos, normalização e encoding de variáveis. | `@HigorHBO` |
| **Higor Domingos** | **Alertas / SOS & Monitoramento em Tempo Real**<br>• Histórico de acionamento do botão do pânico, geolocalização e rotas consumidas pelo Painel Web da Delegacia. | **Sim** | **Modelagem de Machine Learning**<br>• Implementação e treinamento de algoritmos supervisionados/não-supervisionados (Scikit-Learn). | `@hdomigos10` |
| **João Pedro** | **Cofre Seguro de Incidentes & Evidências**<br>• Registro cronológico e confidencial de episódios, relatos, catalogação de provas/prints e exportação segura. | **Sim** | **Avaliação & Integração do Modelo**<br>• Métricas (Acurácia, Precisão, Recall, F1, Matriz de Confusão) e integração do indicador no app mobile. | `@JPmoreiraq1` |

---

## 🚀 2. Matriz Detalhada da Entrega Final (Sprints 3 e 4)

Na etapa final do projeto, cada integrante foi encarregado da implementação e teste de ponta a ponta do seu módulo nas três camadas: banco relacional no Supabase, rotas RESTful na API Express e integração de UI no app mobile Expo.

| Integrante | Back-end API (`api/src/rotas/`) | Banco de Dados (`PostgreSQL`) | Telas do App Integradas (`app/src/pages/`) | Requisitos Específicos sob Responsabilidade |
| :--- | :--- | :--- | :--- | :--- |
| **Alana Caled** | `usuarias.js`<br>• `GET /usuarias`<br>• `GET /usuarias/:id`<br>• `POST /usuarias`<br>• `PUT /usuarias/:id`<br>• `DELETE /usuarias/:id` | Tabela `usuarias`<br>• Hashing scrypt de senha<br>• Validação de PINs de 4 a 6 dígitos | • Tela 13 (`PerfilConfigScreen`)<br>• Tela 14 (`ConfigCamuflagemScreen`)<br>• Primeiro Acesso (`CadastroDisfarcadoScreen`) | • Estrutura base da API Node/Express (#64)<br>• Scripts de schema e seed no Supabase (#63)<br>• Camada base `services/api.js` (#66)<br>• Funcionalidade "Apagar meus dados" com exclusão em cascata |
| **Felipe Trindade** | `contatos.js`<br>• `GET /contatos`<br>• `GET /contatos/:id`<br>• `POST /contatos`<br>• `PUT /contatos/:id`<br>• `DELETE /contatos/:id` | Tabela `contatos_confianca`<br>• Relacionamento FK com `usuarias`<br>• Validação de prioridade (1, 2, 3) | • Tela 06 (`ContatosListScreen`)<br>• Tela 07 (`ContatoFormScreen`)<br>• Componente `BotaoSaidaRapida` | • Validação de relacionamento real: `usuaria_id` inexistente devolve 400 antes de gravar (#69)<br>• Consumo da API com recarregamento via `useFocusEffect` (#70)<br>• Botão de Saída Rápida (*Quick Exit*) sobreposto a todas as telas do SAFE (#77)<br>• Atualização da arquitetura final e README (#71) |
| **Higor Bueno** | `viagens.js`<br>• `GET /viagens`<br>• `POST /viagens`<br>• `POST /checkins` | Tabelas `viagens_seguras` e `checkins_viagem` | • Tela 08 (`ViagemNovaScreen`)<br>• Tela 09 (`ViagemEmAndamentoScreen`) | • Criação de viagem com cálculo de estimativa e registro de check-ins periódicos via API (#72, #73)<br>• Execução e validação do notebook final de DS (#74) |
| **Higor Domingos** | `alertas.js`<br>• `GET /alertas`<br>• `POST /alertas`<br>• `GET /painel` | Tabela `alertas_sos` | • Tela 05 (`SafeHomeScreen`)<br>• Tela 15 (`AlertasHistoricoScreen`)<br>• Dashboard Web da Delegacia | • Gravação de alertas SOS silenciosos disparados pelo botão de pânico ou Duress PIN (#75, #76)<br>• Atualização em tempo real do status dos alertas no painel da delegacia (#78)<br>• Treinamento e comparação dos modelos de Machine Learning (#79) |
| **João Pedro** | `incidentes.js` & `indicadores.js`<br>• `GET /incidentes`<br>• `POST /incidentes`<br>• `GET /indicadores` | Tabela `cofre_incidentes` e `indicadores_capitais` | • Tela 10 (`IncidentesListScreen`)<br>• Tela 11 (`IncidenteFormScreen`)<br>• Tela 12 (`IncidenteDetalheScreen`)<br>• Tela 17 (`ResultadoRiscoScreen`) | • CRUD do Cofre com classificação por tipo de violência da Lei Maria da Penha (#80, #81)<br>• Avaliação completa com métricas de classificação (Acurácia, F1, Recall) (#82)<br>• Integração do indicador de risco da capital na Tela 17 (#83) |

---

## 🎯 3. Regras de Integração e Governança da Equipe
1. **Independência e Rastreabilidade dos Commits:** Cada tarefa de API e mobile é implementada em branch isolada e commitada individualmente no padrão `Área: o que foi feito (Nome) Closes #N`, permitindo a auditoria clara da autoria exigida pelo professor.
2. **Prepared Statements Obrigatórios:** Nenhuma rota da API utiliza interpolação de strings em SQL. Todas as consultas utilizam parâmetros posicionais (`$1, $2, ...`) do driver `pg`.
3. **Padrão de Erros RESTful:** Todas as rotas devolvem erros no formato `{ "erro": "mensagem" }` com códigos semânticos (`400` para validações/relacionamentos inválidos, `404` para recursos inexistentes e `500` para falhas internas).
4. **Segurança da Vítima:** Saída rápida sem confirmações intermediárias (`navigation.reset`), descarte de dados voláteis e persistência em cofre criptografado.
