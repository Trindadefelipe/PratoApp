# 🚓 Painel da Delegacia

App web em **React Native** (Expo + react-native-web) que a central de atendimento usa para acompanhar os alertas SOS em tempo real. É um projeto **separado** do app da usuária: a delegacia nunca instala o Pratô.

Visual baseado no protótipo [`docs/prototipo/painel-delegacia-web.png`](../docs/prototipo/painel-delegacia-web.png).

## ▶️ Como rodar

1. Suba a API antes (pasta `api/`: `npm run dev`). O painel lê de `http://localhost:3333` (troque em `src/services/api.js` se precisar).
2. Na pasta `painel/`:
   ```bash
   npm install
   ```
   ```bash
   npm start
   ```
3. Abra o endereço que aparecer no terminal (normalmente `http://localhost:8081`).

## O que a tela faz

| Parte | O que mostra | De onde vem |
|---|---|---|
| Topo | Selo **Ao vivo** (fica **Sem conexão** se a API cair) e relógio | — |
| Contadores | Novos, em atendimento e concluídos | `GET /alertas` |
| Lista | Alertas do mais novo para o mais antigo, com gatilho, horário e endereço aproximado | `GET /alertas` |
| Mapa | Um ponto por alerta, na cor do status (posição aproximada a partir da latitude e longitude) | `GET /alertas` |
| Detalhe | Gatilho, horário, coordenadas, viagem em andamento e Círculo de Confiança avisado | `GET /painel` e `GET /contatos?usuaria_id=` |
| Botões | **Assumir atendimento** e **Marcar como concluído** (o seletor de status avança Novo → Em atendimento → Concluído → Novo) | `PUT /alertas/:id` |

A lista se atualiza sozinha a cada **5 segundos** (polling), então um SOS disparado no app aparece aqui sem recarregar.

O painel não mostra o nome nem o e-mail da usuária, só o necessário para o atendimento. Todos os dados são fictícios.

## Arquivos

```
painel/
├── App.js                      # carrega as fontes e abre o PainelScreen
├── src/
│   ├── PainelScreen.js         # layout de três colunas e polling
│   ├── formatos.js             # textos e cores de status e gatilho
│   ├── services/api.js         # chamadas à API
│   ├── components/
│   │   ├── ItemAlerta.js       # cartão da lista e selo de status
│   │   ├── MapaAlertas.js      # mapa ilustrado com os pontos
│   │   └── DetalheAlerta.js    # coluna da direita
│   └── theme/                  # cópia das cores e da fonte Poppins do app
└── assets/logo.png
```

**Responsáveis:** Higor Domingos (rota `/painel`, #78) e Alana Caled (painel em React Native).
