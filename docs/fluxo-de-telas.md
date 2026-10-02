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

## 2. Detalhamento das Telas por Módulo

### 🥗 A. Fachada: Pratô (Camuflagem)
1. **`PratoHomeScreen` (Diário Alimentar):**
   * Exibe resumo diário de calorias consumidas vs meta.
   * Lista de refeições cadastradas (dados locais).
   * **Gatilho 1:** Campo de busca ou meta de calorias onde a digitação do PIN (`7390` / `1900`) e clique em "Salvar" abre o SAFE.
   * **Gatilho 2:** Toque longo de 2s na logo do pratinho no cabeçalho.
2. **`PratoReceitasScreen`:**
   * Lista de receitas saudáveis com fotos e modo de preparo para garantir verossimilhança.

---

### 🛡️ B. Área Secreta: SAFE (5 CRUDs e Telas Integradas)

#### 1. Módulo de Perfil e Acesso Camuflado *(Responsável: Alana Caled)*
* **`PerfilConfigScreen`:** Formulário para alteração de nome fictício, e-mail e redefinição de PIN secreto.
* **`ConfigCamuflagemScreen`:** Opções de disfarce ativo, configuração do **PIN de Coação (*Duress PIN*)** e modo de gatilho.

#### 2. Módulo Círculo de Confiança *(Responsável: Felipe Trindade)*
* **`ContatosListScreen`:** Lista de contatos de emergência cadastrados, exibindo nome, telefone, relação e badge de prioridade (Alta, Média, Baixa).
* **`ContatoFormScreen`:** Tela para **Criar e Editar** contato (campos: Nome, Telefone/WhatsApp, Grau de Parentesco/Relação, Notificação SMS/Zap).
* **Ação de Exclusão:** Modal de confirmação para remoção do contato da lista.

#### 3. Módulo Viagem Segura & Check-in *(Responsável: Higor Bueno)*
* **`ViagemNovaScreen`:** Formulário para iniciar viagem (Origem, Destino, Tempo estimado de trajeto e seleção de contatos a notificar).
* **`ViagemEmAndamentoScreen`:** Exibe cronômetro regressivo, status atual e botões de ação:
  * Botão grande: **"🟢 Cheguei Segura"** (Finaliza a viagem com sucesso).
  * Botão discreto: **"⏱️ Preciso de mais 10 minutos"** (Estende o prazo).
  * Falta de resposta ao término: Disparo automático de alerta para a rede.

#### 4. Módulo Alertas SOS & Painel em Tempo Real *(Responsável: Higor Domingos)*
* **`BotaoSosComponent`:** Botão de emergência 1-toque com confirmação háptica/vibração discreta. Captura imediata da latitude/longitude via GPS.
* **`AlertasHistoricoScreen`:** Listagem de todos os acionamentos de SOS gerados (data, hora, coordenadas e status do atendimento).
* **Painel Web da Delegacia:** Dashboard web separado em tela cheia que monitora e apita a cada novo registro deste CRUD.

#### 5. Módulo Cofre de Incidentes & Evidências *(Responsável: João Pedro)*
* **`IncidentesListScreen`:** Linha do tempo confidencial com os relatos arquivados ordenados por data.
* **`IncidenteFormScreen`:** Formulário de registro (Data/hora do fato, Tipo de violência: Verbal, Física, Patrimonial ou Perseguição, Local e Relato detalhado).
* **`IncidenteDetalheScreen`:** Visualização completa do registro, com opção de edição, exclusão e exportação rápida.

---

### 🚨 C. Componentes Transversais Obrigatórios

1. **Botão Flutuante de Saída Rápida (*Quick Exit*):**
   * Fixado em todas as telas confidenciais. Ao ser tocado, executa reset da pilha de navegação diretamente para `PratoHomeScreen`.
2. **Banner Informativo & Canais Oficiais:**
   * Rodapé de apoio com discagem rápida para **Ligue 180** e **190 (Polícia Militar)**, além do aviso legal de protótipo acadêmico.
