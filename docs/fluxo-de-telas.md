# 📱 Especificação de Protótipo e Fluxo de Navegação

**Projeto:** Pratô / SAFE  
**Framework:** React Native com Expo  
**Arquitetura de Navegação:** React Navigation (Stack Navigator + Bottom Tab Navigator)  

---

## 1. Mapa Geral de Telas e Navegação

```
[ INÍCIO DO APP ]
       │
       ▼
┌─────────────────────────────────────────────────────────┐
│              FACHADA PÚBLICA: "PRATÔ"                   │
│                                                         │
│  • Tela 1.1: Diário de Refeições (Café, Almoço, Jantar) │
│  • Tela 1.2: Contador de Calorias & Metas Nutricionais  │
│  • Tela 1.3: Catálogo de Receitas Rápidas               │
└────────────────────────────┬────────────────────────────┘
                             │
            [ GATILHO OCULTO: Código / PIN / Long-Press ]
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│              ÁREA RESTRITA: "SAFE"                      │
│                                                         │
│  [ Bottom Tabs de Navegação ]:                          │
│                                                         │
│  1. 🏠 Home / Painel Rápido (SOS + Quick Exit)          │
│  2. 👥 Círculo de Confiança (CRUD Felipe Trindade)      │
│  3. 🚗 Viagem Segura (CRUD Higor Bueno)                 │
│  4. 📁 Cofre de Incidentes (CRUD João Pedro)            │
│  5. ⚙️ Configurações & Camuflagem (CRUD Alana Caled)    │
│                                                         │
│  [ Subtelas & Telas de Apoio ]:                         │
│  • Tela 2.6: Histórico de Alertas SOS (CRUD Higor D.)   │
│  • Tela 2.7: Autoavaliação de Risco (Data Science)      │
│  • Tela 2.8: Guia de Direitos & Contatos 180 / 190      │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Detalhamento das Telas e Componentes

### 🥗 A. Fachada: Pratô (Camuflagem)
1. **`PratoHomeScreen` (Diário Alimentar):**
   * Exibe resumo diário de calorias consumidas vs meta diária.
   * Lista de refeições cadastradas (Café da manhã, Almoço, Jantar).
   * **Gatilho Principal:** Campo de busca/meta de calorias onde a digitação do código numérico secreto (`7390` / `1900`) e clique em "Salvar" transiciona para o SAFE.
   * **Gatilho Secundário:** Toque longo (*long-press* de 2 segundos) no logotipo do pratinho no cabeçalho.
2. **`PratoReceitasScreen`:**
   * Catálogo de receitas saudáveis com ingredientes e modo de preparo para garantir verossimilhança da fachada.

---

### 🛡️ B. Área Secreta: SAFE (5 CRUDs e Telas Integradas)

#### 1. Módulo de Perfil e Acesso Camuflado *(Responsável: Alana Caled)*
* **`PerfilConfigScreen`:** Formulário de perfil para alteração de nome fictício de teste, e-mail e redefinição do PIN secreto.
* **`ConfigCamuflagemScreen`:** Opções de camuflagem ativa, configuração do **PIN de Coação (*Duress PIN*)** e ajuste de sensibilidade de gatilhos.

#### 2. Módulo Círculo de Confiança *(Responsável: Felipe Trindade)*
* **`ContatosListScreen`:** Lista de contatos de emergência cadastrados, exibindo nome, telefone, relação e badge de prioridade (Alta, Média, Baixa).
* **`ContatoFormScreen`:** Tela de formulário para **Criar e Editar** contato (campos: Nome, Telefone/WhatsApp, Grau de Parentesco/Relação, Notificação SMS/WhatsApp).
* **Ação de Exclusão:** Modal de confirmação com exclusão física no banco de dados.

#### 3. Módulo Viagem Segura & Check-in *(Responsável: Higor Bueno)*
* **`ViagemNovaScreen`:** Formulário para iniciar trajeto (Origem, Destino, Tempo estimado em minutos e seleção de contatos da rede a notificar).
* **`ViagemEmAndamentoScreen`:** Exibe cronômetro regressivo com contagem ativa, status da viagem e botões de ação:
  * Botão em destaque: **"🟢 Cheguei Segura"** (Finaliza a viagem com status de sucesso).
  * Botão discreto: **"⏱️ Preciso de mais 10 minutos"** (Estende o prazo estimado).
  * Falta de resposta/estouro do tempo: Disparo automático de alerta preventivo para o Círculo de Confiança.

#### 4. Módulo Alertas SOS & Painel em Tempo Real *(Responsável: Higor Domingos)*
* **`BotaoSosComponent`:** Botão de emergência de 1 toque com confirmação discreta via vibração e captura imediata da latitude/longitude via GPS (`expo-location`).
* **`AlertasHistoricoScreen`:** Listagem de todos os acionamentos de SOS gerados pela usuária (data, hora, coordenadas e status do atendimento policial).
* **`Painel Delegacia (Web)`:** Dashboard web separado em tela cheia voltado para centrais de atendimento, listando alertas em tempo real com indicador sonoro/visual, mapa e alteração de status (*Novo*, *Em Atendimento*, *Concluído*).

#### 5. Módulo Cofre de Incidentes & Evidências *(Responsável: João Pedro)*
* **`IncidentesListScreen`:** Linha do tempo confidencial e cronológica com os relatos arquivados ordenados por data.
* **`IncidenteFormScreen`:** Formulário de registro (Data/hora do fato, Tipo de violência: Verbal/Psicológica, Física, Patrimonial ou Perseguição, Local e Relato detalhado).
* **`IncidenteDetalheScreen`:** Visualização completa do registro, com suporte a edição, exclusão e exportação segura.

---

### 🚨 C. Componentes Transversais Obrigatórios

1. **Botão Flutuante de Saída Rápida (*Quick Exit*):**
   * Componente flutuante fixado em todas as telas confidenciais. Ao ser tocado, executa o reset imediato da pilha de navegação diretamente para `PratoHomeScreen`, sem deixar rastros no histórico recente.
2. **Banner Informativo & Canais Oficiais de Socorro:**
   * Rodapé de apoio com discagem rápida em 1 clique para **Ligue 180** e **190 (Polícia Militar)**, além do aviso legal obrigatório de protótipo acadêmico.
