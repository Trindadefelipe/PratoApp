---
name: issue-closer
description: Use esta skill para auditar, planejar a ordem ótima de execução e conduzir o fechamento formal de issues no repositório PratoApp (Pratô / SAFE). Analisa a rastreabilidade entre issues, branches e PRs, mapeia o grafo de dependências e bloqueios mútuos (blast radius), valida os critérios de aceite e Definição de Pronto (DoD) antes do encerramento e executa o fechamento controlado via GitHub CLI (gh) ou por vinculação com commits e PRs.
---

# Issue Closer — Pratô / SAFE

Guia operacional para **auditar, organizar a precedência e conduzir o fechamento seguro de issues** no repositório **PratoApp**, assegurando conformidade com as diretrizes da Entrega Final, integridade do checklist avaliativo e rastreabilidade total no GitHub.

---

## 🚫 Regras Críticas e Restrições (Hard Constraints)

> [!IMPORTANT]
> - **NUNCA feche issues sem evidência de implementação ou justificativa formal:** Nenhuma issue técnica pode ser fechada no GitHub sem que o código correspondente esteja implementado, testado e preferencialmente integrado via Pull Request na `main`. O fechamento prematuro mascara o progresso real no quadro Kanban e prejudica a avaliação acadêmica.
> - **Respeite o fluxo de fechamento padrão do projeto:**
>   - Conforme `docs/padroes-de-codigo.md`, o fechamento primário deve ser automático via mensagem de commit/PR com `Closes #N` mergeado na `main`.
>   - O fechamento manual via `gh issue close <id>` é reservado para encerramento de tarefas de documentação/gestão validadas, issues duplicadas ou itens com testes comprovados onde o merge automático não disparou.
> - **NUNCA feche issues que possuam dependências ativas não resolvidas:** Sempre audite o grafo de dependências. Fechar uma issue dependente antes de sua base gera inconsistências e quebras de integração.
> - **SEMPRE informe o impacto e bloqueios:** Antes de encerrar qualquer issue, avalie o impacto colateral (blast radius) nas tarefas dos demais integrantes da equipe.

---

## 🧭 As 4 Etapas Obrigatórias de Auditoria de Issues

1. **Levantamento e Extração de Metadados:**
   - Número da issue, título, autor, responsável atribuído, labels e marco/milestone.
   - Extração do corpo da issue: escopo funcional, por que existe, tarefas (checklist) e Definição de Pronto ("Pronto quando").

2. **Mapeamento de Dependências e Ordem de Precedência (DAG):**
   - Identificar dependências montante (o que bloqueia esta issue).
   - Identificar dependências jusante (quais outras issues dependem do resultado desta).
   - Determinar a ordenação topológica ideal para execução e encerramento.

3. **Auditoria de Conformidade e Evidências:**
   - O código foi escrito e comitado no repositório?
   - Os testes funcionais e de integração foram executados?
   - Os critérios de segurança (disfarce Pratô, Quick Exit, ausência de mocks `data/`) foram respeitados?
   - Há PR aberto ou mergeado com `Closes #N`?

4. **Veredicto e Ação de Encerramento:**
   - `🟢 APTO PARA FECHAMENTO`: Todas as tarefas e testes concluídos; comando `gh issue close` autorizado ou aguardando merge do PR.
   - `🟡 EM ANDAMENTO / BLOQUEADO POR REQUISITOS`: Código em desenvolvimento ou aguardando dependência prévia.
   - `🔴 NÃO APTO (PREMATURO)`: Código ainda não implementado no repositório. Fechamento rejeitado para preservar governança.

---

## 🛠️ Procedimento Operacional Passo a Passo

### Passo 1: Listagem das Issues sob Auditoria
```bash
gh issue list --assignee <usuario> --state open
```

### Passo 2: Análise Detalhada dos Requisitos
```bash
gh issue view <numero-da-issue>
```

### Passo 3: Verificação de Branches e Pull Requests Vinculados
```bash
gh pr list --state all | grep -E "#<numero>|refs #<numero>"
git log --all --grep="Closes #<numero>" --oneline
```

### Passo 4: Fechamento Controlado (Após Validação Conclusiva)
Quando todas as evidências estiverem comprovadas:
```bash
gh issue close <numero-da-issue> --comment "Encerramento formal validado via issue-closer: requisitos atendidos, testes comprovados e código integrado."
```
