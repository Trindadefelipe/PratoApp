# Uso de Inteligência Artificial: Equipe Pratô / SAFE

## Ferramentas utilizadas
- Google Gemini / Antigravity
- ChatGPT (OpenAI)
- Claude (Anthropic)

## Onde foram usadas

| Parte do projeto | Ferramenta | Como foi usada | Revisado por |
|---|---|---|---|
| Brainstorming de arquitetura e pesquisa de concorrentes | ChatGPT | Análise de mercado sobre apps de segurança e lacunas existentes | Felipe Trindade e Equipe |
| Definição do conceito de disfarce (Pratô) e gatilhos | Gemini / Antigravity | Estruturação da transição entre app de dieta e área sigilosa | Alana Caled |
| Modelagem de dados (DER) e especificação das 5 entidades | Gemini / Antigravity | Elaboração do esquema relacional em PostgreSQL e relacionamentos | João Pedro e Felipe Trindade |
| Planejamento do Kanban e divisão de papéis | Gemini / Antigravity | Estruturação das sprints quinzenais e matriz de papéis | Higor Bueno e Higor Domingos |
| Estrutura inicial do repositório | Gemini / Antigravity | Criação das pastas e da documentação inicial a partir da ideia do projeto e do enunciado | Equipe |
| Protótipo visual das telas (Pratô e SAFE) | Claude | Criação dos mockups das 18 telas a partir da logo e da paleta escolhida pelo grupo | Equipe |
| Navegação e organização da entrega | Claude | Diagrama e tabela de navegação (Stack e Tab), imagem do DER, cards do Kanban e montagem do PDF da Entrega 1 | Equipe |
| Análise do repositório contra o enunciado | Claude | Levantamento das pendências da Entrega 1 | Equipe |

## Prompts testados

### Estrutura do repositório (Gemini / Antigravity)

**Prompt:** "analise a ideia do projeto e o que é solicitado pelo professor, com base nisso construa a estrutura do repositório"

**Resultado:** estrutura inicial com as pastas `app/`, `api/`, `painel/`, `data-science/` e `docs/`, além do `README.md`, do `USO_IA.md` e dos documentos da Entrega 1.

### Análise de pendências (Claude)

**Prompt (resumo):** pedido para analisar o repositório e dizer se faltava somente o protótipo de telas, enviando o enunciado e o exemplo de referência.

**Resultado:** lista de pendências além do protótipo: navegação com tipo de transição, quadro Kanban real com datas e prompts no USO_IA.md.

### Protótipo das telas (Claude)

**Prompt (resumo):** pedido para criar os protótipos das telas, com a logo do Pratô e um laranja mais pastel.

**Resultado:** 18 telas de celular em imagem, paleta de cores e tipografia, usadas na seção de protótipo do documento.

## Observações do grupo
A Inteligência Artificial foi utilizada como ferramenta de apoio metodológico para auxiliar na estruturação da documentação inicial, brainstorm de diferenciais contra soluções existentes de mercado e geração de diagramas de arquitetura. Todas as decisões de produto, escolhas técnicas de stack (React Native Expo, Node.js Express e PostgreSQL) e a divisão de escopo foram debatidas, validadas e aprovadas pelos 5 integrantes da equipe.
