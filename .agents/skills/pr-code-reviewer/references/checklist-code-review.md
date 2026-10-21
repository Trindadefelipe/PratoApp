# Checklist de Padrões Técnicos e Governança — Pratô / SAFE

Este documento serve como referência técnica detalhada para a condução de Code Reviews em Pull Requests do projeto **Pratô / SAFE** (Universidade Positivo - Campus Londrina). Todo PR deve ser avaliado contra os critérios abaixo antes de qualquer parecer favorável.

---

## 1. Segurança da Vítima e Privacidade (Hard Constraints)

- [ ] **Disfarce Preservado (Fachada Pratô):**
  - O aplicativo nunca deve exibir pistas do SAFE na abertura direta. A rota inicial deve ser a fachada culinária do Pratô.
  - O gatilho de transição (PIN) não deve deixar rastros visuais nem preencher campos de histórico ou cache.
- [ ] **Saída Rápida (Quick Exit) e Duress PIN:**
  - O botão de saída rápida deve fechar imediatamente a visão segura e resetar a pilha de navegação (`navigation.reset`), impedindo o retorno pelo botão "Voltar" nativo do Android.
  - Se for digitado o PIN de coação (*Duress PIN*), o app deve permanecer na fachada inofensiva sem alertar o agressor, emitindo apenas sinalização silenciosa interna.
- [ ] **Proteção de Segredos e Credenciais:**
  - Nenhuma chave de API, senha de banco de dados ou token JWT em texto puro no código fonte. Devem ser consumidos via variáveis de ambiente (`.env`).
  - Hashes criptográficos seguros para PINs e senhas (ex: `bcrypt`).

---

## 2. Frontend Mobile (React Native & Expo)

- [ ] **Arquitetura de Pastas (`app/src/`):**
  - Telas organizadas em `pages/`, componentes modulares em `components/`, rotas em `routes/` e tokens de estilo em `theme/`.
- [ ] **Navegação Limpa:**
  - Estrutura clara entre Stack Navigator e Bottom Tabs.
  - Não permitir retorno acidental para telas protegidas após logout ou saída rápida.
- [ ] **Tratamento de Teclado e Layout:**
  - Formulários protegidos contra sobreposição do teclado virtual (`KeyboardAvoidingView` ou `ScrollView`).
- [ ] **Gerenciamento de Estado Reativo:**
  - Uso correto dos hooks do React (`useState`, `useEffect`).
  - Limpeza de estados sensíveis ao deslogar ou trocar de usuário.
- [ ] **Chamadas de Rede HTTP:**
  - Uso centralizado de Axios em `services/api.js`.
  - Tratamento obrigatório de estados de carregamento (`ActivityIndicator`) e erros de rede (sem quebras bruscas do app).

---

## 3. Back-end & API RESTful (Node.js, Express & PostgreSQL)

- [ ] **Prevenção contra SQL Injection:**
  - Consultas SQL parametrizadas / Prepared Statements com placeholders (`$1`, `$2`).
  - Interpolação direta de variáveis na string SQL (`"SELECT ... WHERE id = " + id`) é estritamente proibida.
- [ ] **Padrão REST e Códigos de Status HTTP:**
  - `POST`: Retorna `201 Created` e os dados do recurso criado.
  - `GET`: Retorna `200 OK` ou `404 Not Found`.
  - `PUT`/`PATCH`: Retorna `200 OK`.
  - `DELETE`: Retorna `204 No Content` ou `200 OK`.
  - Erros de validação devem retornar `400 Bad Request` com lista detalhada de campos inválidos.
- [ ] **Tratamento Centralizado de Exceções:**
  - Blocos `try/catch` nos controllers com repasse para middleware de erro sem expor stack traces sensíveis para o cliente.

---

## 4. Data Science & Machine Learning (Jupyter & Scikit-Learn)

- [ ] **Conformidade com LGPD e Ética:**
  - Célula inicial de governança declarando a fonte pública oficial e a garantia de ausência de dados nominais ou identificáveis de pessoas reais.
- [ ] **Prevenção de Vazamento de Dados (Data Leakage):**
  - Separação rigorosa entre conjunto de treino e conjunto de teste (`train_test_split`).
  - Encoders e Scalers ajustados exclusivamente nos dados de treino (`fit` no treino, `transform` no teste).
- [ ] **Avaliação Real de Métricas:**
  - Foco em **Recall** e **F1-Score** em detrimento de acurácia pura em bases desbalanceadas.
  - Matriz de confusão analisada com ênfase na redução de **falsos negativos** (risco para a vítima).

---

## 5. Governança Git e Rastreabilidade

- [ ] **Vínculo com a Issue:**
  - O PR deve referenciar a respectiva issue (ex: `Closes #10`, `Ref #10`).
- [ ] **Conventional Commits:**
  - Commits padronizados (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`).
- [ ] **Branch de Destino:**
  - PRs de desenvolvimento devem ter como base `main` (ou branch de integração ativa).
