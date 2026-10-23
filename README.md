# 🥗 Pratô / SAFE (Sistema de Apoio e Fortalecimento Emergencial)

> ⚠️ **AVISO IMPORTANTE:** Este projeto é um **protótipo acadêmico** desenvolvido exclusivamente para fins educacionais e de conscientização dentro do Projeto Integrador das disciplinas de *Desenvolvimento Móvel* e *Data Science* da **Universidade Positivo (Campus Londrina - 2º Semestre/2026)**. Ele **NÃO** substitui atendimento oficial policial, jurídico, psicológico ou de saúde. Em casos de emergência real no Brasil, utilize os canais oficiais:
> * 📞 **Ligue 180** — Central de Atendimento à Mulher (Gratuito, 24h, anônimo).
> * 🚨 **190** — Polícia Militar (Situações de emergência e flagrante).

---

## 📱 Visão Geral do Projeto

O **Pratô** apresenta-se à primeira vista como um aplicativo inofensivo e funcional de **controle de rotina alimentar, metas e diário de refeições**. No entanto, por trás de gatilhos numéricos ou gestos específicos, a usuária acessa o **SAFE**: uma plataforma discreta de segurança pessoal dividida no modelo **Antes, Durante e Depois**.

```
                           +----------------------------------------+
                           |          FACHADA: "PRATÔ"              |
                           |   (Diário de Dieta / Calorias / Metas) |
                           +-------------------+--------------------+
                                               |
                                    [ PIN Secreto / Long Press ]
                                               v
                           +----------------------------------------+
                           |             ÁREA: "SAFE"               |
                           +-------------------+--------------------+
                                               |
           +-----------------------------------+-----------------------------------+
           |                                   |                                   |
           v                                   v                                   v
+-----------------------+           +-----------------------+           +-----------------------+
|  🟢 ANTES (Prevenção)  |           |  🟡 DURANTE (Socorro)  |           |  🔴 DEPOIS (Registro) |
| - Círculo de Confiança|           | - SOS Silencioso      |           | - Cofre de Incidentes |
| - Viagem Segura       |           | - GPS em Tempo Real   |           | - Registro de Provas  |
| - Check-in Programado |           | - Painel da Delegacia |           | - Guia de Apoio / 180 |
+-----------------------+           +-----------------------+           +-----------------------+
```

---

## 👥 Equipe e Responsabilidades dos CRUDs

| Integrante | CRUD sob Responsabilidade | Etapa de Data Science |
| :--- | :--- | :--- |
| **Alana Caled** | Perfil & Acesso Camuflado (PIN / Duress) | Governança & Aquisição de Dados (LGPD) |
| **Felipe Trindade** | Círculo de Confiança (Rede de Apoio) | Análise Exploratória de Dados (EDA) |
| **Higor Bueno** | Modo Deslocamento (Viagem Segura) | Qualidade & Limpeza de Dados |
| **Higor Domingos** | Alertas / SOS & Painel da Delegacia | Modelagem de Machine Learning |
| **João Pedro** | Cofre de Incidentes & Evidências | Avaliação de Métricas & Integração |

---

## 🛠️ Stack Tecnológica

* **Mobile:** React Native com Expo (JavaScript puro).
* **Back-end / API:** Node.js com Express.
* **Banco de Dados:** PostgreSQL.
* **Painel da Delegacia:** Dashboard Web em tempo real.
* **Data Science:** Python 3, Jupyter Notebook, Pandas, NumPy, Scikit-Learn, Seaborn/Matplotlib.

---

## 🗂️ Estrutura do Repositório

```text
PratoApp/
├── app/                      # Aplicativo Mobile em React Native (Expo)
│   └── src/
│       ├── pages/
│       │   ├── prato/        # Fachada: Diário, Metas, Receitas
│       │   └── safe/
│       │       ├── inicio/   # Início/SOS, Alertas, Guia, Autoavaliação, Resultado
│       │       ├── circulo/  # Círculo de Confiança
│       │       ├── viagem/   # Viagem Segura
│       │       ├── cofre/    # Cofre de Incidentes
│       │       └── ajustes/  # Perfil e Camuflagem
│       ├── components/       # Componentes reutilizáveis (botões, chips, saída rápida)
│       ├── routes/           # RootStack, PratoTabs, SafeTabs e Stacks de cada aba
│       ├── assets/           # Logo, imagens e fontes
│       ├── theme/            # Cores e tipografia
│       ├── data/             # Dados simulados (campos do DER), um arquivo por módulo
│       └── services/         # Chamadas HTTP à API (Entrega 4)
├── api/                      # Back-end Node.js / Express
├── painel/                   # Dashboard Web em tempo real para a Delegacia
├── data-science/             # Pipeline de Ciência de Dados
│   ├── dados/                # Bases públicas (Atlas da Violência / IPEA)
│   └── notebook.ipynb        # Notebook com EDA, modelagem e validação
├── docs/                     # Documentação acadêmica
├── USO_IA.md                 # Registro oficial de uso de Inteligência Artificial
└── README.md                 # Este arquivo
```

---

## 📄 Documentos da Entrega 1

1. [Matriz de Papéis e Responsabilidades](docs/matriz-papeis.md)
2. [Justificativa e Especificação do Disfarce Pratô](docs/justificativa-disfarce.md)
3. [Modelagem do Banco de Dados & DER](docs/modelagem-der.md)
4. [Fluxo de Telas e Navegação](docs/fluxo-de-telas.md)
5. [Base de Dados Pública (Data Science)](docs/base-dados-ds.md)
6. [Backlog e Quadro Kanban](docs/kanban-backlog.md)
7. [Registro de Uso de IA](USO_IA.md)

## 🗂️ Quadro Kanban

* [Quadro do projeto no GitHub Projects](https://github.com/users/alanakaled10/projects/1): as issues de cada entrega, nas colunas A Fazer, Em Andamento, Em Revisão e Concluído.

## 🧭 Guia para quem desenvolve

* [Padrões de Código do App Mobile](docs/padroes-de-codigo.md): pastas, nomes, cores, dados simulados, rotas e mensagens de commit. Leia antes de começar uma tela.
