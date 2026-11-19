# 🔌 API do Pratô / SAFE (Entrega Final)

API REST em **Node.js + Express** com banco **PostgreSQL no Supabase**. É o back-end que o app Expo consome a partir da Entrega Final, sem dados simulados.

| Exigência da entrega | Onde está |
|---|---|
| Node.js/Express | `src/server.js` |
| Uma tabela por CRUD (no mínimo uma por integrante) | 6 tabelas do DER em `sql/schema.sql` |
| Rotas RESTful completas (GET, GET por id, POST, PUT, DELETE) | Um arquivo por tabela em `src/rotas/` |
| Relacionamento real validado pela API | `garantirExiste()` em `src/erros.js`, usado nas rotas antes de gravar, e as chaves estrangeiras do banco |
| Tratamento de erros com status HTTP | `tratarErros()` em `src/erros.js`: `400`, `404` e `500`, sempre `{ "erro": "..." }` |

---

## ▶️ Como rodar

1. Instale o [Node.js](https://nodejs.org) 20 ou mais novo.
2. Na pasta `api/`:
   ```bash
   npm install
   ```
3. Copie o `.env.example` para `.env` e cole a URL do banco (peça a senha para a Alana, por mensagem privada):
   * Supabase > botão **Connect** no topo do projeto > **Session pooler** > copie a URL e troque `[YOUR-PASSWORD]` pela senha.
   * O `.env` **nunca** vai para o Git (já está no `.gitignore`).
4. Suba a API:
   ```bash
   npm start
   ```
   ou `npm run dev`, que reinicia sozinho quando você salva um arquivo.
5. Teste: abra `http://localhost:3333/` no navegador. Tem que aparecer `{"status":"ok","banco":"ok",...}`.

### Celular com Expo Go
O celular não enxerga o `localhost` do computador. No app (`app/src/services/api.js`), use o **IP do computador** na mesma rede Wi-Fi, por exemplo `http://192.168.0.10:3333`. Para ver o IP no Windows: `ipconfig` (linha "Endereço IPv4"). Se não conectar, libere a porta 3333 no Firewall do Windows.

---

## 🗄️ Banco de dados

* `sql/schema.sql`: cria as 6 tabelas do DER (já rodado no Supabase).
* `sql/seed.sql`: dados de teste fictícios (a usuária de teste tem id `7b1e4c2a-9f3d-4e8a-b6c1-2d5f8a9e0c31`).
* Para recriar do zero: rode os dois de novo no **SQL Editor** do Supabase (o `schema.sql` tem as linhas de `drop` comentadas no topo).

---

## 🧩 Como criar as rotas da sua tabela

1. Copie `src/rotas/_modelo.js` para `src/rotas/<caminho>.js`. O nome do arquivo vira o caminho: `contatos.js` vira `/contatos`. **Não precisa mexer no `server.js`.**
2. No arquivo novo, troque `TABELA`, `CAMPOS` e as regras de `validar()` pelas da sua tabela, com os nomes do DER.
3. Em `conferirRelacionamentos()`, confira cada chave estrangeira com `garantirExiste('tabela', id, 'campo')`.
4. Teste as 5 rotas e anote na tabela abaixo.

Regras:
* Sempre consulta com parâmetros (`$1`, `$2`), nunca texto do pedido colado no SQL.
* Para recusar um pedido: `throw new ErroApi(400, 'mensagem')`. O `tratarErros` responde no formato padrão.
* Erros do próprio banco (e-mail repetido, valor fora da lista do `CHECK`, chave estrangeira) já viram `400` sozinhos.
* Nunca devolva `senha_hash`.

---

## 🛣️ Rotas

| Caminho | Tabela | Responsável | Issue | Situação |
|---|---|---|---|---|
| `GET /` | (saúde da API e do banco) | Alana | #64 | ✅ |
| `/usuarias` | `usuarias` | Alana | #65 | ✅ |
| `/contatos` | `contatos_confianca` | Felipe | #69 | ✅ |
| `/viagens` e `/checkins` | `viagens_seguras` e `checkins_viagem` | Higor Bueno | #72 | ✅ |
| `/alertas` e `/painel` | `alertas_sos` | Higor Domingos | #75 e #78 | ✅ |
| `/incidentes` | `cofre_incidentes` | João Pedro | #80 | ✅ |
| `/indicadores` | `indicadores_capitais` | João Pedro | #83 | ✅ |

Cada caminho tem `GET /caminho`, `GET /caminho/:id`, `POST /caminho`, `PUT /caminho/:id` e `DELETE /caminho/:id`.

### `/usuarias` (Alana, #65)

Campos: `nome_ficticio`, `email`, `pin_secreto` e `duress_pin` (obrigatórios no `POST`), mais `camuflagem_ativa` (`true` por padrão) e `senha` (opcionais). No `PUT`, mande só o que quer mudar.

* PINs vão como **texto** (`"0123"`), com 4 a 6 dígitos, e os dois precisam ser diferentes.
* A `senha` é opcional porque o app entra pelo PIN, sem login (o primeiro acesso só cria os dois códigos). Sem `senha`, a API preenche o `senha_hash` com o hash de um valor aleatório, porque o campo é obrigatório no banco.
* A senha nunca é guardada em texto, e nenhuma resposta devolve `senha_hash`.
* E-mail repetido (sem diferenciar maiúsculas) devolve `400`.

Exemplo de `POST /usuarias`:
```json
{
  "nome_ficticio": "Maria Teste",
  "email": "maria.teste@exemplo.com",
  "pin_secreto": "1234",
  "duress_pin": "9876"
}
```

Testes feitos (todos com o resultado esperado):

| Pedido | Caso | Status |
|---|---|---|
| `GET /usuarias` | lista | `200` |
| `GET /usuarias/:id` | usuária do `seed.sql` | `200` |
| `GET /usuarias/:id` | id que não existe / id mal formado | `404` / `400` |
| `POST /usuarias` | dados certos, sem senha / com senha | `201` |
| `POST /usuarias` | sem e-mail, senha curta, PIN com 2 dígitos, PIN como número, PINs iguais | `400` |
| `POST /usuarias` | e-mail que já existe | `400` |
| `PUT /usuarias/:id` | só `camuflagem_ativa` / o próprio e-mail | `200` |
| `PUT /usuarias/:id` | `duress_pin` igual ao PIN atual, e-mail de outra usuária, corpo vazio | `400` |
| `PUT /usuarias/:id` | id que não existe | `404` |
| `DELETE /usuarias/:id` | usuária criada no teste / a mesma de novo | `200` / `404` |

### `/contatos` (Felipe, #69)

Campos: `usuaria_id`, `nome`, `telefone`, `parentesco_relacao` e `nivel_prioridade` (obrigatórios no `POST`), mais `notificar_sms` e `notificar_whatsapp` (`true` por padrão). No `PUT`, mande apenas os campos que deseja alterar.

* `usuaria_id` precisa ser um UUID válido e existir na tabela `usuarias` (validado via `garantirExiste`, devolvendo `400` antes de gravar caso não exista).
* `nome` (máx. 100 caracteres), `telefone` (máx. 20 caracteres) e `parentesco_relacao` (máx. 50 caracteres) não podem ser vazios.
* `nivel_prioridade` deve ser obrigatoriamente `1` (Alta), `2` (Média) ou `3` (Baixa).
* `GET /contatos?usuaria_id=...` filtra os contatos da usuária informada e ordena prioritariamente por `nivel_prioridade asc` (prioridade 1 no topo) e secundariamente por `criado_em desc`.

Exemplo de `POST /contatos`:
```json
{
  "usuaria_id": "7b1e4c2a-9f3d-4e8a-b6c1-2d5f8a9e0c31",
  "nome": "Carla Silva",
  "telefone": "11988887777",
  "parentesco_relacao": "Irmã",
  "nivel_prioridade": 1,
  "notificar_sms": true,
  "notificar_whatsapp": true
}
```

Testes feitos (todos com o resultado esperado):

| Pedido | Caso | Status |
|---|---|---|
| `GET /contatos` | lista geral | `200` |
| `GET /contatos?usuaria_id=...` | filtrando por usuária, ordenado por prioridade | `200` |
| `GET /contatos/:id` | contato existente / id inexistente (`404`) / id inválido (`400`) | `200` / `404` / `400` |
| `POST /contatos` | dados válidos | `201` |
| `POST /contatos` | campos obrigatórios faltando / prioridade inválida | `400` |
| `POST /contatos` | `usuaria_id` inexistente no banco (relacionamento real) | `400` |
| `PUT /contatos/:id` | atualização parcial de campos | `200` |
| `PUT /contatos/:id` | id que não existe / corpo vazio | `404` / `400` |
| `DELETE /contatos/:id` | contato removido com sucesso / o mesmo de novo | `200` / `404` |

### `/alertas` e `/painel` (Higor Domingos, #75 e #78)

Campos de `alertas_sos`: `usuaria_id`, `latitude`, `longitude`, `tipo_gatilho` (obrigatórios no `POST`), mais `viagem_id` (opcional, com validação de existência), `endereco_aproximado` e `status_delegacia` (`'NOVO'`, `'EM_ATENDIMENTO'`, `'CONCLUIDO'`).

* `tipo_gatilho`: deve ser um dos valores do DER: `'BOTAO_DIRETO'`, `'DURESS_PIN'`, `'FALTA_CHECKIN'`, `'SHAKE'`.
* `status_delegacia`: default `'NOVO'`. Atualizável via `PUT /alertas/:id` para acompanhar o atendimento da delegacia.
* **Relacionamentos reais:** valida via `garantirExiste()` se `usuaria_id` e `viagem_id` (quando informado) existem no banco, devolvendo `400` caso inexistentes.
* `GET /alertas?usuaria_id=...`: filtra os alertas de uma usuária ordenados do mais recente para o mais antigo (`criado_em desc`).
* `GET /painel`: endpoint agregado que junta alertas ativos (`NOVO` e `EM_ATENDIMENTO`) com os dados da usuária (`nome_ficticio`) e viagem (`origem_descricao`, `destino_descricao`), servindo o painel da delegacia e a atualização em tempo real do app.

Exemplo de `POST /alertas`:
```json
{
  "usuaria_id": "7b1e4c2a-9f3d-4e8a-b6c1-2d5f8a9e0c31",
  "latitude": -23.3045,
  "longitude": -51.1696,
  "endereco_aproximado": "Londrina/PR",
  "tipo_gatilho": "BOTAO_DIRETO"
}
```

Testes feitos:

| Pedido | Caso | Status |
|---|---|---|
| `GET /alertas` | lista geral de alertas | `200` |
| `GET /alertas?usuaria_id=...` | filtrado por usuária, ordenado desc | `200` |
| `GET /alertas/:id` | alerta existente do `seed.sql` | `200` |
| `GET /alertas/:id` | id inexistente / UUID inválido | `404` / `400` |
| `POST /alertas` | dados válidos | `201` |
| `POST /alertas` | sem latitude/longitude, gatilho inválido | `400` |
| `POST /alertas` | usuaria_id inexistente / viagem_id inexistente | `400` |
| `PUT /alertas/:id` | atualização de status_delegacia | `200` |
| `PUT /alertas/:id` | status inválido / corpo vazio | `400` |
| `DELETE /alertas/:id` | remoção com sucesso / repetido | `200` / `404` |
| `GET /painel` | agregação de alertas abertos com usuária e viagem | `200` |

### `/viagens` e `/checkins` (Higor Bueno, #72)

Campos de `viagens_seguras`: `usuaria_id`, `origem_descricao`, `destino_descricao`, `previsao_chegada` (obrigatórios no `POST`), mais `horario_inicio` (default atual), `status_viagem` (`'EM_ANDAMENTO'`, `'CONCLUIDA_COM_SUCESSO'`, `'ATRASADA'`, `'SOS_ACIONADO'`), `latitude_destino`, `longitude_destino` e `finalizado_em`.

Campos de `checkins_viagem`: `viagem_id` (obrigatório no `POST`), mais `horario_checkin` (default atual), `latitude_atual`, `longitude_atual` e `status_resposta` (`'PENDENTE'`, `'CONFIRMADO'`, `'EXPIRADO'`).

* `status_viagem`: default `'EM_ANDAMENTO'`. Finalização ("Cheguei segura") atualiza para `'CONCLUIDA_COM_SUCESSO'` e grava `finalizado_em` via `PUT /viagens/:id`.
* **Relacionamentos reais:** valida via `garantirExiste()` se `usuaria_id` existe em `usuarias` antes de criar a viagem, e se `viagem_id` existe em `viagens_seguras` antes de criar o check-in (devolvendo `400` caso inexistentes).
* `GET /viagens?usuaria_id=...`: filtra as viagens de uma usuária ordenadas do mais recente para o mais antigo (`horario_inicio desc`).
* `GET /checkins?viagem_id=...`: lista os check-ins vinculados a uma viagem específica (`horario_checkin desc`).

Exemplo de `POST /viagens`:
```json
{
  "usuaria_id": "7b1e4c2a-9f3d-4e8a-b6c1-2d5f8a9e0c31",
  "origem_descricao": "Faculdade Positivo",
  "destino_descricao": "Casa",
  "previsao_chegada": "2026-11-17T02:00:00.000Z"
}
```

Exemplo de `POST /checkins`:
```json
{
  "viagem_id": "b1a2b3c4-0001-4000-8000-000000000001",
  "status_resposta": "CONFIRMADO",
  "latitude_atual": -23.3080,
  "longitude_atual": -51.1650
}
```

Testes feitos:

| Pedido | Caso | Status |
|---|---|---|
| `GET /viagens` | lista geral de viagens | `200` |
| `GET /viagens?usuaria_id=...` | filtrado por usuária, ordenado desc | `200` |
| `GET /viagens/:id` | viagem existente do `seed.sql` | `200` |
| `GET /viagens/:id` | id inexistente / UUID inválido | `404` / `400` |
| `POST /viagens` | dados válidos | `201` |
| `POST /viagens` | sem origem/destino/previsão, status inválido | `400` |
| `POST /viagens` | usuaria_id inexistente | `400` |
| `PUT /viagens/:id` | encerramento "Cheguei segura" (`CONCLUIDA_COM_SUCESSO`, `finalizado_em`) | `200` |
| `PUT /viagens/:id` | status inválido / corpo vazio / id inexistente | `400` / `400` / `404` |
| `DELETE /viagens/:id` | remoção com sucesso / repetido | `200` / `404` |
| `GET /checkins?viagem_id=...` | lista check-ins da viagem | `200` |
| `GET /checkins/:id` | check-in existente / inexistente | `200` / `404` |
| `POST /checkins` | dados válidos | `201` |
| `POST /checkins` | viagem_id inexistente | `400` |
| `PUT /checkins/:id` | confirmação de resposta (`CONFIRMADO`) | `200` |
| `DELETE /checkins/:id` | remoção com sucesso / repetido | `200` / `404` |

### `/incidentes` (João Pedro, #80)

Campos de `cofre_incidentes`: `usuaria_id`, `data_ocorrencia`, `tipo_violencia` (`'VERBAL_PSICOLOGICA'`, `'FISICA'`, `'PATRIMONIAL'`, `'VIRTUAL_PERSEGUICAO'`) e `relato_detalhado` (obrigatórios no `POST`), mais `local_ocorrencia`, `notas_adicionais` e `anexo_evidencia_url` (opcionais). No `PUT`, envie só os campos que deseja atualizar.

* **Relacionamento real:** valida via `garantirExiste('usuarias', usuaria_id, 'usuaria_id')` se a usuária existe antes de gravar (devolvendo `400` se não existir).
* `GET /incidentes?usuaria_id=...`: filtra os registros de uma usuária ordenados do mais novo para o mais antigo (`data_ocorrencia desc, criado_em desc`).

Exemplo de `POST /incidentes`:
```json
{
  "usuaria_id": "7b1e4c2a-9f3d-4e8a-b6c1-2d5f8a9e0c31",
  "data_ocorrencia": "2026-09-26T21:40:00.000Z",
  "tipo_violencia": "VERBAL_PSICOLOGICA",
  "relato_detalhado": "Discussão com ameaças verbais em casa.",
  "local_ocorrencia": "Em casa",
  "notas_adicionais": "Vizinho presenciou parte da discussão.",
  "anexo_evidencia_url": "audio_gravado.m4a"
}
```

Testes feitos (todos com o resultado esperado):

| Pedido | Caso | Status |
|---|---|---|
| `GET /incidentes` | lista geral | `200` |
| `GET /incidentes?usuaria_id=...` | filtrando pela usuária, do mais novo para o mais antigo | `200` |
| `GET /incidentes/:id` | incidente existente / id que não existe / id mal formado | `200` / `404` / `400` |
| `POST /incidentes` | dados válidos | `201` |
| `POST /incidentes` | sem data, tipo e relato / `tipo_violencia` fora da lista do DER / data inválida | `400` |
| `POST /incidentes` | `usuaria_id` que não existe (relacionamento real) | `400` |
| `PUT /incidentes/:id` | só `notas_adicionais` | `200` |
| `PUT /incidentes/:id` | `tipo_violencia` inválido / corpo vazio | `400` |
| `PUT /incidentes/:id` | id que não existe | `404` |
| `DELETE /incidentes/:id` | incidente criado no teste / o mesmo de novo | `200` / `404` |

### `/indicadores` (João Pedro, #83)

Rotas de leitura da tabela `indicadores_capitais` (`sql/schema.sql` e `sql/seed_indicadores.sql`), alimentada pelo notebook de Data Science:

* `GET /indicadores`: lista as 27 capitais ordenadas por nome (`capital asc`).
* `GET /indicadores/:capital`: busca o indicador da capital informada (sem diferenciar maiúsculas ou acentos); devolve `404` se a capital não existir.

## ⚠️ Respostas de erro

| Status | Quando |
|---|---|
| `400` | Campo obrigatório faltando, valor fora da lista, id que não é UUID, relacionamento que não existe, valor repetido |
| `404` | Id não encontrado, ou caminho que não existe |
| `500` | Erro interno (a mensagem real aparece só no terminal da API) |
| `503` | Só no `GET /`: a API está no ar, mas o banco não respondeu |