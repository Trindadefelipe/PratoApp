---
name: pr-code-reviewer
description: Use esta skill quando o usuário solicitar code review de Pull Requests abertos no repositório PratoApp (Pratô / SAFE), auditoria de PRs pendentes de review, validação de conformidade técnica em relação a issues vinculadas, verificação de segurança (disfarce velado, Quick Exit, SQL Injection, LGPD), checagem de padrões de arquitetura (React Native Expo, Express API, Jupyter DS) ou aprovação/rejeição formal de PRs. Realiza a investigação de issues e PRs, análise profunda do diff e emite parecer técnico com veredicto conclusivo, permitindo execução controlada de ações via GitHub CLI (gh).
---

# PR Code Reviewer — Pratô / SAFE

Guia operacional para conduzir **Code Reviews aprofundados, rigorosos e didáticos** em Pull Requests no repositório **PratoApp**, cruzando os requisitos das issues das Sprints com os padrões de segurança da vítima, arquitetura do aplicativo móvel, API em Node.js e pipeline de Data Science.

---

## 🚫 Regras Críticas e Restrições (Hard Constraints)

> [!IMPORTANT]
> - **NUNCA execute merge ou approve no GitHub sem autorização explícita do usuário:** O agente deve primeiro apresentar o parecer técnico detalhado na conversa. A execução de comandos via CLI (`gh pr review --approve`, `gh pr merge`) ocorre exclusivamente sob comando claro do usuário.
> - **SEMPRE verifique os requisitos de segurança da vítima:**
>   - Abertura direta do app deve cair na fachada do Pratô (culinária).
>   - Saída rápida (*Quick Exit*) deve fechar a visão segura sem permitir retorno pelo histórico de navegação.
>   - O *Duress PIN* (coação) jamais pode expor pistas visuais para o agressor.
> - **SEMPRE valide o uso de Prepared Statements na API:** Consultas SQL com interpolação de strings (`"SELECT ... " + id`) devem ser reprovadas imediatamente como falha crítica de segurança.
> - **NUNCA permita credenciais ou segredos em texto claro:** Tokens, senhas de banco ou chaves de serviço devem vir obrigatoriamente de variáveis de ambiente (`.env`).
> - **SEMPRE cruze o diff com a issue vinculada:** Verifique se o código entrega exatamente o que foi acordado no escopo e nos critérios de aceite da issue.

---

## 🧭 As 4 Dimensões Obrigatórias de Avaliação

Todo parecer emitido por esta skill deve responder de forma clara e estruturada às 4 dimensões:

1. **Atendimento à Solicitação da Issue:**
   - O escopo técnico descrito na issue vinculada foi integralmente coberto?
   - Os critérios do Plano de Testes e a Definição de Pronto (DoD) foram cumpridos?
2. **Aderência aos Padrões do Projeto:**
   - **Mobile:** Respeita a separação em `pages/`, `components/`, `routes/` e o uso correto de hooks do React?
   - **API:** Estrutura rotas e controllers RESTful com códigos HTTP adequados e queries parametrizadas?
   - **Data Science:** Notebook documentado com governança, tratamento ético de dados e métricas sem vazamento?
   - Consulte o [Checklist de Padrões Técnicos](references/checklist-code-review.md) para detalhes.
3. **Integridade de Código e Análise de Quebras:**
   - Há riscos de quebra na navegação, exceções não tratadas que possam travar o aplicativo ou falhas de rede?
   - Os testes ou simulações cobrem os cenários reais de uso da vítima?
4. **Veredicto Conclusivo:**
   - `✅ APROVADO / APTO PARA MERGE`
   - `⚠️ APROVADO COM RESSALVA` (ajuste menor não impeditivo)
   - `❌ NÃO APROVADO (CHANGES REQUESTED)` (requer correções obrigatórias antes do merge)
   - `🚫 REJEITADO / FECHAR SEM MERGE` (código fora de escopo ou duplicado)

---

## 🛠️ Procedimento Operacional Passo a Passo

### Passo 1: Identificação de PRs e Contexto Remoto
1. Liste os PRs abertos e seus status:
   ```bash
   gh pr list --json number,title,headRefName,baseRefName,author,reviewDecision,mergeable
   ```
2. Se o usuário forneceu um número específico (ex: `PR #26`), obtenha os detalhes:
   ```bash
   gh pr view <numero-do-pr>
   ```

### Passo 2: Extração dos Requisitos da Issue Vinculada
1. Identifique a issue vinculada na descrição do PR (ex: `Closes #9` ou pelo título da branch).
2. Obtenha os detalhes completos da issue:
   ```bash
   gh issue view <numero-da-issue>
   ```
3. Mapeie o escopo funcional, o que deve ser validado e o plano de testes definido para iniciantes.

### Passo 3: Inspeção Profunda do Diff
1. Obtenha os arquivos alterados e o diff completo:
   ```bash
   gh pr diff <numero-do-pr>
   ```
2. Analise minuciosamente:
   - Se mobile: como o estado e as rotas são manipulados.
   - Se API: sanitização de entradas, queries parametrizadas e tratamento de erros.
   - Se Data Science: divisão treino/teste e ausência de vazamento de dados.

### Passo 4: Emissão do Parecer Técnico Estruturado
Estruture o parecer técnico seguindo o formato demonstrado em [Exemplos de Parecer Técnico](examples/exemplo-parecer-tecnico.md):
- Identificação do PR, Autor, Branch e Issue vinculada;
- Avaliação detalhada nas 4 dimensões obrigatórias;
- Veredicto final em destaque;
- Comandos CLI sugeridos caso o usuário aprove ou solicite alterações.

### Passo 5: Execução de Ações via GitHub CLI (Sob Comando do Usuário)
Quando o usuário autorizar explicitamente a ação:
- **Para Aprovar:**
  ```bash
  gh pr review <numero> --approve --body "<parecer técnico fundamentado>"
  ```
- **Para Solicitar Alterações:**
  ```bash
  gh pr review <numero> --request-changes --body "<apontamentos objetivos de correção>"
  ```
- **Para Efetuar o Merge:**
  ```bash
  gh pr merge <numero> --merge
  ```

---

## 📚 Documentos Complementares
- [Checklist de Padrões Técnicos e Governança](references/checklist-code-review.md)
- [Exemplos Reais de Parecer Técnico](examples/exemplo-parecer-tecnico.md)
