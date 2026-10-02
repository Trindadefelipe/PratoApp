# 🥗 Justificativa e Especificação do Mecanismo de Disfarce: "Pratô"

**Projeto Integrador:** Desenvolvimento Móvel & Data Science  
**Tema:** Violência contra a Mulher — Aplicativo de Apoio Camuflado  

---

## 1. Contexto e Escolha do Disfarce

A segurança de mulheres em situação de vulnerabilidade exige que a posse de um aplicativo de proteção não desperte suspeitas em eventuais agressores que tenham acesso visual ou físico ao smartphone. 

Enquanto a metáfora clássica da "calculadora" já se tornou amplamente conhecida e previsível, a equipe optou pela criação do **"Pratô"**: um aplicativo com identidade visual realista e funcional de **controle alimentar, contagem de calorias e planejamento de refeições**.

### Por que um app de dieta/alimentação?
1. **Comum e Insuspeito:** Aplicativos de saúde, dietas e rotina fitness estão presentes no cotidiano de milhões de pessoas.
2. **Campos Numéricos Naturais:** O registro diário de calorias, peso e ingestão de água fornece locais perfeitamente contextuais para a digitação de códigos/PINs sem levantar qualquer estranheza.
3. **Funcionalidade Real de Fachada:** O usuário pode navegar, adicionar refeições fictícias e visualizar gráficos nutricionais caso terceiros olhem a tela.

---

## 2. Mecanismos Técnicos de Entrada e Camuflagem

### 2.1 Gatilho Secreto de Acesso (Entrada Principal)
* **Local:** Campo de inserção "Meta de Calorias Diárias" ou "Buscar Alimento".
* **Ação:** Ao digitar o código numérico secreto pré-cadastrado (ex.: `7390` ou `*190#`) e pressionar o botão "Salvar/Buscar", o aplicativo intercepta o input, valida a credencial e transiciona de forma suave para a área protegida do **SAFE**.
* **Gatilho Alternativo:** Pressionar continuamente (*long-press* por 2 segundos) o ícone de logotipo do pratinho na barra de navegação superior.

### 2.2 O PIN de Coação (*Duress PIN*)
* **Cenário de Risco:** Caso a vítima seja forçada pelo agressor a desbloquear e mostrar o conteúdo do aplicativo.
* **Comportamento:** Ao digitar o PIN de emergência secundário (ex.: `9999`):
  1. A tela simula uma falha de conexão convencional (*"Erro ao carregar dados nutricionais. Tente novamente mais tarde."*).
  2. Em segundo plano, o sistema dispara um **SOS Silencioso**, enviando imediatamente a geolocalização da vítima para a rede de contatos e para o **Painel em Tempo Real da Delegacia**.

### 2.3 Mecanismo de Saída Rápida (*Quick Exit*)
* **Ação:** Disponível em todas as telas da área confidencial por meio de um botão flutuante discreto (ícone de "Salvar Rascunho") ou pelo gesto de puxar a tela de cima para baixo (*swipe down* rápido).
* **Resultado:** Encerra a sessão da área confidencial em milissegundos e renderiza imediatamente a tela inicial do diário alimentar do Pratô, limpando o histórico de visualização recente.

---

## 3. Visão Geral da Arquitetura Funcional (Antes / Durante / Depois)

```
========================================================================
                      FACHADA PÚBLICA: "PRATÔ"
      (Diário Alimentar · Contador de Calorias · Receitas)
                             │
                  [ Gatilho Secreto / PIN ]
                             ▼
========================================================================
                      ÁREA PROTEGIDA: "SAFE"
                             │
     ┌───────────────────────┼───────────────────────┐
     ▼                       ▼                       ▼
🟢 ANTES                🟡 DURANTE              🔴 DEPOIS
• Círculo de Confiança  • SOS Silencioso 1-Toque • Cofre de Incidentes
• Modo Viagem Segura    • GPS em Tempo Real     • Histórico de Provas
• Check-ins Programados • Alerta na Delegacia   • Canais Oficiais (180/190)
========================================================================
```
