# 🧭 Padrões de Código do App Mobile

**Projeto:** Pratô / SAFE (Sistema de Apoio e Fortalecimento Emergencial)  
**Vale para:** tudo dentro de `app/` (React Native com Expo)  
**Objetivo:** que o código dos 5 integrantes pareça escrito por uma pessoa só, e que a troca dos dados simulados pela API na Entrega 4 não exija reescrever as telas.

Antes de abrir um commit, confira o [checklist](#-checklist-antes-do-commit) no fim deste documento.

---

## 📁 1. Onde cada arquivo fica

```
app/src/
├── assets/          # Imagens (ex.: Logo/logo.png)
├── components/      # Componentes reutilizáveis
│   ├── BotaoPrimario.js     ← comuns a todo o app ficam na raiz
│   ├── Chip.js
│   └── prato/               ← só da fachada Pratô (AnelCalorias, GraficoSemana...)
├── data/            # Dados simulados (um arquivo por tabela do DER)
├── pages/           # Telas
│   ├── prato/               ← fachada: Diário, Metas, Receitas
│   └── safe/<area>/         ← inicio, circulo, viagem, cofre, ajustes
├── routes/          # Navegadores (RootStack, Tabs e Stacks)
├── services/        # Funções que não são tela (ex.: sos.js; api.js na Entrega 4)
└── theme/           # colors.js e fonts.js
```

* Componente usado por **mais de uma área** do app vai na raiz de `components/`.
* Componente usado **só por uma área** vai em `components/<area>/` (ex.: `components/prato/`, `components/safe/`).
* **Não mova** arquivos que outros integrantes já importam (`BotaoPrimario`, `Chip`, `theme/`, `routes/`). Se precisar, combine no painel da entrega antes.

---

## 🏷️ 2. Nomes

| O quê | Padrão | Exemplo |
|---|---|---|
| Arquivo de tela | PascalCase + `Screen` | `ContatosListScreen.js` |
| Arquivo de componente | PascalCase, igual ao nome do componente | `GraficoSemana.js` |
| Arquivo de dados ou serviço | camelCase | `contatos.js`, `sos.js` |
| Funções, variáveis e estados | camelCase, em português | `salvarMeta`, `valorDigitado` |
| Constantes fixas | MAIÚSCULAS | `ALTURA_GRAFICO`, `DIAS` |
| Campos que existem no DER | **snake_case, idênticos ao DER** | `nome_ficticio`, `tipo_gatilho` |
| Campos que só existem no app | camelCase | `pesoAtual`, `tempoMin` |

* **Nomes de arquivo sem acento e sem espaço** (`logo.png`, e não `Pratô_Logo.jpeg`). Acento pode quebrar o `require` em Mac e Linux.
* Maiúsculas e minúsculas importam: `assets/Logo/logo.png` e `assets/logo/logo.png` são caminhos diferentes fora do Windows.

---

## 📝 3. Cabeçalho de todo arquivo

Todo arquivo começa com um bloco de comentário dizendo o que ele é, quem é o responsável e, se for componente, quais props recebe:

```js
// ============================================================
// GraficoSemana: barras de calorias por dia com a linha tracejada da meta.
// Usado na Tela 02 (Metas). Recebe os dados por props.
//   * dados: lista de { dia, kcal }
//   * meta: meta diária em kcal
// ============================================================
```

As telas já vieram com esse cabeçalho (componente, navegação, responsável e o que o protótipo mostra). **Mantenha o cabeçalho** ao implementar a tela e atualize se algo mudar.

---

## 🎨 4. Cores, fontes e estilos

### Cores: sempre do `theme/colors.js`

```js
import { colors } from '../../theme/colors';

backgroundColor: colors.verdeClaro    // ✅
backgroundColor: '#EAF5E9'            // ❌ hexadecimal solto
```

* Precisa de uma cor que não existe? **Adicione no `colors.js`** com um nome e um comentário de uso, e importe de lá:

```js
verdeClaro   :   '#EAF4E0', // fundo dos ícones de objetivos
```

* Antes de criar, veja se já existe uma parecida. Duas cores quase iguais (`#EAF4E0` e `#EAF5E9`) deixam o app com tons diferentes.

### Fontes: sempre do `theme/fonts.js`

```js
fontFamily: fonts.semibold   // títulos
fontFamily: fonts.regular    // textos
fontFamily: fonts.medium     // rótulos e abas
fontFamily: fonts.bold       // números e destaques
```

Todo `Text` precisa de `fontFamily`. Sem ele, o texto aparece com a fonte do sistema, e não com a Poppins.

### Estilos

* Use `StyleSheet.create` no **fim do arquivo**, num objeto chamado `estilos`.
* Evite estilo escrito direto no JSX (`style={{ ... }}`). Ele é aceitável só para um valor calculado na hora, como a altura de uma barra.
* Recuo de **4 espaços**.

---

## 🗂️ 5. Dados simulados

Até a Entrega 4, os dados vêm de `app/src/data/`. As regras abaixo existem para que, na Entrega 4, **só a origem do dado mude**, e não as telas.

* **Nunca escreva dado direto na tela.** Importe do arquivo de dados:

```js
import { usuaria } from '../../../data/usuaria';

<Text>Olá, {usuaria.nome_ficticio.split(' ')[0]}</Text>   // ✅
<Text>Olá, Ana</Text>                                     // ❌
```

* Os campos que vêm do DER usam **exatamente o nome do DER** ([modelagem-der.md](modelagem-der.md)).
* As referências entre tabelas usam o mesmo ID: `usuaria_id` em contatos, viagens, alertas e incidentes é sempre `usuaria.id`, importado do `usuaria.js`.
* Valores calculados (total de calorias, kcal restantes, nível de risco) **não ficam no arquivo de dados**: a tela calcula. Assim, mudar um dado atualiza tudo sozinho.
* Somente dados fictícios: nomes, telefones, endereços e coordenadas inventados.

---

## 🧩 6. Componentes

* Um componente **recebe os dados por props**, e não importa o `data/` direto. Quem busca o dado é a tela:

```js
// Na tela
<GraficoSemana dados={caloriasSemana} meta={meta} />

// No componente
export default function GraficoSemana({ dados, meta, altura = 150 }) { ... }
```

* Props opcionais têm valor padrão na própria assinatura (`altura = 150`).
* Cada componente leva os próprios estilos.
* Antes de criar um botão ou chip, use o `BotaoPrimario` e o `Chip`, que já existem.

---

## 🧭 7. Navegação

Os nomes das rotas **não têm** o sufixo `Screen`:

| Aba | Rotas |
|---|---|
| Pratô (abas) | `Diario`, `Metas`, `Receitas` |
| Início | `SafeHome`, `AlertasHistorico`, `GuiaDireitos`, `Autoavaliacao`, `ResultadoRisco` |
| Círculo | `ContatosList`, `ContatoForm` |
| Viagem | `ViagemNova`, `ViagemEmAndamento` |
| Cofre | `IncidentesList`, `IncidenteForm`, `IncidenteDetalhe` |
| Ajustes | `PerfilConfig`, `ConfigCamuflagem` |
| Raiz | `PratoTabs`, `SafeTabs` |

| Para fazer | Use |
|---|---|
| Abrir outra tela do mesmo Stack | `navigation.navigate('ContatoForm')` |
| Abrir passando dados | `navigation.navigate('ContatoForm', { contato })` e, na tela, `route.params.contato` |
| Voltar | `navigation.goBack()` |
| Trocar a tela sem deixar voltar (viagem) | `navigation.replace('ViagemEmAndamento')` |
| Trocar de aba | `navigation.navigate('Viagem')` |
| Entrar no SAFE ou sair dele | `navigation.reset({ index: 0, routes: [{ name: 'SafeTabs' }] })` |

**Entrar e sair do SAFE é sempre com `reset`.** O `navigate` deixaria o Pratô no histórico, e o botão Voltar revelaria o caminho.

---

## 🕵️ 8. Regras do disfarce

* Nada na fachada Pratô pode mencionar SAFE, violência, alerta ou ajuda: textos, nomes de aba, títulos de tela e mensagens de erro.
* O PIN de coação **nunca mostra** que algo aconteceu: a tela exibe um erro comum de "dados nutricionais", e o SOS vai em segundo plano.
* `console.log` com dados sensíveis só nesta etapa, para teste. Na Entrega 3 em diante, combinar antes de deixar logs.

---

## ✍️ 9. Detalhes de JSX que já causaram erro

* **Espaço entre textos em linhas diferentes:** o JSX apaga espaços e quebras de linha no começo e no fim de cada linha. Para um espaço proposital, use `{' '}`:

```js
<Text>
    <Text style={estilos.numero}>{kcal}</Text>{' '}kcal
</Text>
```

* **`key` em listas:** todo `map` que gera elementos precisa de `key` única, de preferência o `id` do item (`key={item.id}`). Nunca um número fixo (`key={1}`).
* **Nome da opção errado não dá erro:** `headerShow: false` (sem o "n") é ignorado em silêncio. Se uma opção "não funciona", confira a grafia.

---

## 🔀 10. Git e commits

* **`git pull` antes de começar** a trabalhar. Se entrou pacote novo, rode `npm install` também.
* **Pacotes novos sempre com `npx expo install <pacote>`**, nunca com `npm install <pacote>`. O `expo install` escolhe a versão compatível com o SDK do projeto.
* **Um commit por tarefa terminada**, só com os arquivos daquela tarefa.
* **Mensagem:** `Área: o que foi feito (Nome)`, com a issue na descrição:

```
Summary:     Mobile: implementar Tela 06 Círculo de Confiança (Felipe)
Description: Closes #44
```

| Use | Quando |
|---|---|
| `Closes #N` | A tarefa da issue terminou: ela fecha sozinha quando o commit chega na `main` |
| `Refs #N` | O commit é parte da tarefa, mas ela ainda não terminou |

* Áreas: `Mobile`, `Rotas`, `Dados`, `Docs`, `DS` (Data Science), `API`, `Painel`.
* **Entrega 2:** commits direto na `main`. Se usar branch e Pull Request, faça o merge com **"Create a merge commit"** (nunca "Squash"), para os commits individuais continuarem aparecendo para o professor. Os `Closes` dos commits só fecham as issues depois do merge.

---

## ✅ Checklist antes do commit

- [ ] O app abre no Expo Go sem tela vermelha e sem aviso amarelo novo
- [ ] Nenhum hexadecimal solto: todas as cores vêm do `colors.js`
- [ ] Todo `Text` tem `fontFamily`
- [ ] Nenhum dado escrito direto na tela: tudo vem de `data/`
- [ ] Campos do DER com o nome exato do DER
- [ ] Nomes de rota conforme a tabela da seção 7
- [ ] Nenhum teste esquecido (`useState(true)` de teste, `initialRouteName` provisório)
- [ ] Cabeçalho do arquivo mantido e atualizado
- [ ] Só os arquivos da tarefa marcados no commit
- [ ] Mensagem no padrão `Área: o que foi feito (Nome)` + `Closes #N`
