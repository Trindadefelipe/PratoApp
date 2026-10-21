# Exemplo Real de Parecer Técnico de Code Review — Pratô / SAFE

Este documento demonstra o formato esperado para emissão de pareceres técnicos na execução da skill `pr-code-reviewer` no projeto Pratô / SAFE.

---

## Exemplo 1: Parecer de Aprovação Direta (Mobile)

### Entrada do Usuário
> "Faça o code review do PR #26 sobre o gatilho secreto do Pratô e me diga se está apto a aprovar."

### Parecer Emitido pelo Agente
```markdown
### 🔍 Code Review: PR #26 — feat(mobile): implement stealth trigger in recipe search bar
- **Autor:** @AlanaCaled
- **Branch:** `feature/ISSUE-9-gatilho-secreto` $\rightarrow$ `main`
- **Issue Vinculada:** #9 ([Sprint 2][Mobile] Gatilho Secreto de Transição (PIN Pratô -> SAFE))

#### 1. Atendimento aos Requisitos da Issue
- [x] Interceptação do PIN no campo de busca culinária sem alertar terceiros.
- [x] Limpeza imediata do texto do campo após a validação do PIN para não deixar rastros.
- [x] Redirecionamento com `navigation.replace` para impedir que o botão "Voltar" retorne ao modo protegido.

#### 2. Aderência aos Padrões do Projeto
- **Arquitetura:** Componente modularizado em `pages/PratoHome/` com estilos em arquivo separado.
- **Segurança:** O PIN digitado não é gravado em logs ou storage desnecessariamente.
- **Governança:** Título e commits seguem Conventional Commits; branch vinculada à issue #9.

#### 3. Integridade e Análise de Quebras
- **Navegação:** Testado em simulação de rota; sem quebras na navegação de receitas comuns quando qualquer outro termo é buscado.
- **Experiência do Usuário (UX):** Transição suave e discreta.

#### 4. Veredicto Conclusivo
✅ **APROVADO / APTO PARA MERGE**

> **Comando CLI sugerido:**
> ```bash
> gh pr review 26 --approve --body "Code review aprovado por @Trindadefelipe. Transição secreta velada implementada com sucesso e pilha de navegação limpa."
> gh pr merge 26 --merge
> ```
```

---

## Exemplo 2: Parecer de Alterações Solicitadas (Falha de Segurança na API)

### Entrada do Usuário
> "Pode revisar o PR #27 de cadastro de contatos de confiança na API?"

### Parecer Emitido pelo Agente
```markdown
### 🔍 Code Review: PR #27 — feat(api): add contacts controller and routes
- **Autor:** @Trindadefelipe
- **Branch:** `feature/ISSUE-19-api-contacts` $\rightarrow$ `main`
- **Issue Vinculada:** #19 ([Sprint 4][API] Desenvolvimento dos Endpoints RESTful em Node.js / Express)

#### 1. Atendimento aos Requisitos da Issue
- [x] Endpoints para listar, cadastrar, atualizar e deletar contatos criados.
- [x] Retorno dos códigos de status HTTP apropriados (`201 Created` no POST).

#### 2. Aderência aos Padrões do Projeto
- ⚠️ **Falha Crítica de Segurança (SQL Injection):** Na query de listagem em `controllers/contactController.js`, o `usuario_id` foi interpolado diretamente na string (`"SELECT * FROM contatos WHERE usuario_id = " + req.query.usuario_id`). Deve obrigatoriamente usar query parametrizada (`"SELECT * FROM contatos WHERE usuario_id = $1"`, `[req.query.usuario_id]`).
- ⚠️ **Validação de Payload Ausente:** O endpoint POST não valida se os campos `nome` e `telefone` estão presentes antes de tentar persistir no banco.

#### 3. Integridade e Análise de Quebras
- **Vulnerabilidade Alta:** Risco iminente de injeção SQL no parâmetro de busca.
- **Tratamento de Exceções:** Ausência de bloco `try/catch`, podendo derrubar o processo Node.js em caso de erro no banco.

#### 4. Veredicto Conclusivo
❌ **NÃO APROVADO (CHANGES REQUESTED)**

> **Comando CLI sugerido:**
> ```bash
> gh pr review 27 --request-changes --body "Identificada falha de SQL Injection em `contactController.js`: substituir concatenação de string por prepared statements com placeholders `$1`. Adicionar também validação obrigatória dos campos `nome` e `telefone` antes da inserção."
> ```
```
