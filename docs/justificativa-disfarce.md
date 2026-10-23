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

---

## 4. Primeiro Acesso: Como a Usuária Conhece o SAFE

O disfarce só protege se a usuária souber que a área SAFE existe e como entrar nela, sem que isso fique visível para quem mais tiver acesso ao celular. A equipe adotou uma **combinação de duas estratégias**: a usuária **conhece o app pela rede de proteção** e **configura os códigos num primeiro acesso disfarçado**.

A escolha considera a possibilidade, levantada pelo professor, de o projeto ser apresentado à prefeitura e integrado à rede municipal de atendimento à mulher.

### 4.1 Estratégia 1: Indicação pela Rede de Proteção

A usuária não descobre o SAFE sozinha, pela loja de aplicativos ou por propaganda. Quem apresenta o app é uma profissional da rede de atendimento, durante um atendimento reservado, por exemplo:

* Centro de Referência de Atendimento à Mulher (CRAM) ou CREAS
* Delegacia da Mulher
* Casa da Mulher Brasileira
* Unidades de saúde (UBS e hospitais)
* Patrulha Maria da Penha ou Guarda Municipal

No atendimento, a profissional:

1. Orienta a instalação do **Pratô** pela loja de aplicativos, como um app de dieta comum.
2. Acompanha o primeiro acesso (seção 4.2), para a usuária criar o PIN secreto e o PIN de coação.
3. Mostra os gatilhos de entrada (PIN no campo de meta e toque longo no logotipo) e a saída rápida, e pede que a usuária pratique.
4. Ajuda a cadastrar os primeiros contatos do Círculo de Confiança.

A divulgação do SAFE fica restrita aos atendimentos. Material público (cartazes, redes sociais) não associa o nome "Pratô" a proteção, para o disfarce continuar funcionando.

### 4.2 Estratégia 2: Primeiro Acesso Disfarçado

Na primeira vez que o app é aberto, ele mostra uma configuração inicial com aparência de qualquer app de dieta. Para quem olha a tela, a usuária está só criando uma senha:

| Passo | O que aparece na tela | O que é de verdade |
|---|---|---|
| 1 | "Bem-vinda ao Pratô! Crie seu código do diário" | Cria o `pin_secreto` |
| 2 | "Crie um código de recuperação" | Cria o `duress_pin` (PIN de coação) |
| 3 | Diário de hoje, vazio | Fachada pronta para uso |

Nenhum texto do primeiro acesso menciona SAFE, violência ou ajuda. A explicação do que cada código faz acontece **só dentro do SAFE**, num guia curto exibido na primeira entrada, já depois do gatilho. Assim, mesmo que alguém acompanhe a instalação, vê apenas um app de dieta pedindo senha.

### 4.3 Por Que Combinar as Duas

| Risco | Como a combinação responde |
|---|---|
| A usuária não sabe que o SAFE existe | A profissional da rede apresenta e explica |
| O agressor acompanha a instalação | A configuração parece a de um app de dieta comum |
| A usuária esquece como entrar | Pode praticar no atendimento, e o guia dentro do SAFE reforça |
| O app é divulgado como "app de proteção" | A divulgação fica restrita aos atendimentos da rede |

### 4.4 Impacto no Projeto

Esta seção registra uma decisão de produto. Ela **não faz parte da Entrega 2**, que pede apenas o gatilho funcionando com dados simulados.

* **Telas novas:** primeiro acesso disfarçado (2 passos) e guia de boas-vindas dentro do SAFE.
* **Dados:** os campos `pin_secreto` e `duress_pin` da tabela USUARIAS passam a ser preenchidos pela própria usuária. O armazenamento seguro (hash) segue planejado para a API, na Entrega 4.
* **Tela 14 (Camuflagem e PINs):** continua sendo o lugar para trocar os códigos depois do primeiro acesso.

### 4.5 Pontos em Aberto

* **Esqueci meu PIN:** recuperar por e-mail é arriscado, porque o e-mail pode ser monitorado. Alternativa a avaliar: a recuperação acontece presencialmente, na rede de atendimento.
* **Celular compartilhado:** como agir quando o aparelho é de uso comum da família.
* **Parceria com a prefeitura:** definir quais serviços da rede municipal participariam e como seria o treinamento das profissionais.
