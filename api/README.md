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
| `/viagens` e `/checkins` | `viagens_seguras` e `checkins_viagem` | Higor Bueno | #72 | a fazer |
| `/alertas` e `/painel` | `alertas_sos` | Higor Domingos | #75 e #78 | a fazer |
| `/incidentes` | `cofre_incidentes` | João Pedro | #80 | a fazer |
| `/indicadores` | `indicadores_capitais` | João Pedro | #83 | a fazer |

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

## ⚠️ Respostas de erro

| Status | Quando |
|---|---|
| `400` | Campo obrigatório faltando, valor fora da lista, id que não é UUID, relacionamento que não existe, valor repetido |
| `404` | Id não encontrado, ou caminho que não existe |
| `500` | Erro interno (a mensagem real aparece só no terminal da API) |
| `503` | Só no `GET /`: a API está no ar, mas o banco não respondeu |
