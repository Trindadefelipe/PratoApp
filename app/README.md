# 📱 Pratô / SAFE: App Mobile (Entrega Final)

App em **React Native com Expo** (SDK 58). Por fora é o **Pratô**, um diário de dieta comum. Por dentro está o **SAFE**, a área protegida de apoio a mulheres em situação de violência, que só abre com um gesto ou um PIN secreto.

Desde a Entrega Final, todos os dados do SAFE vêm da **API real** (`../api`, Node.js + Express + Supabase). Nenhuma tela do SAFE usa dados simulados.

## ▶️ Como rodar

**1. Suba a API primeiro** (pasta `api/`, ver o `README.md` dela):

```bash
npm install
npm start
```

A API precisa do arquivo `.env` com a `DATABASE_URL` do Supabase (a credencial fica com a equipe e nunca vai para o Git).

**2. Depois o app**, num segundo terminal, nesta pasta:

```bash
npm install
npx expo start
```

Aperte **w** para abrir no navegador ou leia o QR code com o **Expo Go**.

**Celular físico:** o celular não enxerga o `localhost` do computador. Troque `BASE_URL` em `src/services/api.js` pelo IP da máquina na mesma rede Wi-Fi (`ipconfig` no Windows), por exemplo `http://192.168.0.10:3333`.

## 🔐 Como testar o disfarce

| Passo | O que fazer |
|---|---|
| Primeiro acesso | Na primeira abertura, o app pede nome, e-mail e um "código do diário" (o PIN secreto), e depois um código de emergência (o PIN de coação). A usuária é criada pela API (`POST /usuarias`) e o id fica guardado no celular |
| Fachada | O app abre no **Diário de hoje**, como um app de dieta |
| Entrar no SAFE | Aba **Metas**: digitar o PIN secreto no campo de meta de calorias e tocar em **Salvar meta**. Ou segurar o logotipo do Diário por 2 segundos |
| PIN de coação | Digitado no mesmo campo, mostra um erro falso ("Não foi possível carregar seus dados nutricionais") e envia um alerta SOS silencioso (`POST /alertas`, gatilho `DURESS_PIN`) |
| Saída rápida | Botão redondo com ícone de documento, no canto inferior esquerdo de qualquer tela do SAFE. Volta ao Diário com `navigation.reset`, sem deixar o SAFE no histórico |

A usuária de teste do `api/sql/seed.sql` (Ana Souza) já tem contatos, viagens, alertas e incidentes cadastrados.

## 🗂️ CRUDs consumindo a API

| Módulo | Telas | Rotas da API | Responsável |
|---|---|---|---|
| Usuárias e camuflagem | Primeiro acesso, Tela 13 (Ajustes), Tela 14 (Camuflagem e PINs, apagar meus dados) | `/usuarias` | Alana Caled |
| Círculo de Confiança | Telas 06 e 07 | `/contatos` | Felipe Trindade |
| Viagem Segura | Telas 08 e 09 | `/viagens` e `/checkins` | Higor Bueno |
| Alertas SOS | Tela 05 (SOS) e Tela 15 (histórico, atualiza sozinho) | `/alertas` | Higor Domingos |
| Cofre de Incidentes | Telas 10, 11 e 12 | `/incidentes` | João Pedro |
| Indicador de Data Science | Tela 17 (Resultado da autoavaliação) | `/indicadores` | João Pedro e equipe de DS |

**Relacionamentos reais:** contatos, viagens, alertas e incidentes pertencem a uma usuária (`usuaria_id`), e o check-in pertence a uma viagem (`viagem_id`). A API confere se o registro ligado existe antes de salvar e devolve `400` se não existir.

## 📊 Indicador de Data Science (Tela 17)

Depois da autoavaliação, a Tela 17 mostra o nível de atenção da usuária e, no final, o card **"Sobre a sua capital"**: a usuária busca a capital pelo nome e vê se a violência contra a mulher ali tende a ficar acima ou abaixo da média das capitais, com a chance estimada pelo modelo (Random Forest do `data-science/notebook.ipynb`). O card sempre traz o aviso de **estimativa acadêmica** e deixa claro que fala da cidade, não da situação da usuária.

## 📁 Estrutura

```
app/
├── App.js                 # fontes e NavigationContainer
├── src/
│   ├── routes/            # RootStack, PratoTabs, SafeTabs e os Stacks de cada aba
│   ├── pages/prato/       # fachada: Diário, Metas (gatilho do PIN), Receitas, Primeiro acesso
│   ├── pages/safe/        # área protegida: inicio, circulo, viagem, cofre, ajustes
│   ├── components/        # botões, chips, cartões e o BotaoSaidaRapida
│   ├── services/          # api.js (requisitar e BASE_URL), sessao.js, sos.js, incidentes.js
│   ├── data/              # só conteúdo fixo da fachada Pratô e as perguntas da autoavaliação
│   └── theme/             # cores e fontes
```

O padrão de código, de nomes e de commits está em `docs/padroes-de-codigo.md` no repositório.
