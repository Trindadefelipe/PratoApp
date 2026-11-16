# Checklist de Verificação de Fechamento de Issues

Este checklist deve ser consultado antes de qualquer encerramento de issue no projeto **PratoApp**.

---

## 1. Integridade de Código e Entrega Técnica
- [ ] O código-fonte que implementa a funcionalidade existe no repositório?
- [ ] Não restaram dados mocados (`import ... from 'data/...'`) em telas que deveriam consumir a API?
- [ ] Foram utilizadas variáveis de ambiente (`.env`) em vez de credenciais hardcoded?
- [ ] Prepared statements e sanitização foram empregados para mitigar injeção de SQL?

## 2. Rastreabilidade e Governança no GitHub
- [ ] Foi aberta uma branch temática no padrão do time (ex: `api/rotas-alertas`, `app/sos-api`)?
- [ ] A mensagem de commit ou descrição do PR utiliza as palavras-chave `Closes #N` ou `Fixes #N`?
- [ ] O PR passou por revisão de código técnica antes do merge na `main`?
- [ ] O quadro Kanban no GitHub Projects foi atualizado refletindo a coluna "Concluído"?

## 3. Grafo de Dependências e Impacto
- [ ] As issues pré-requisito estão 100% fechadas e testadas?
- [ ] Os integrantes das issues dependentes foram notificados sobre o desbloqueio?
- [ ] Não há quebra de contrato de API ou rota de navegação que afete outros módulos?
