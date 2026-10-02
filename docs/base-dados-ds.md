# 📊 Escolha e Justificativa da Base de Dados Pública (Data Science)

**Projeto Integrador:** Desenvolvimento Móvel & Data Science  
**Semestre:** 2º Semestre de 2026 — Universidade Positivo  
**Responsáveis:** Alana Caled, Felipe Trindade, Higor Bueno, Higor Domingos, João Pedro  

---

## 1. Base Selecionada

* **Nome da Base:** **Atlas da Violência — Dados Abertos (IPEA / Fórum Brasileiro de Segurança Pública - FBSP)** & **Relatórios Abertos do Painel Ligue 180**
* **Fonte Primária:** [IPEA / FBSP - Atlas da Violência](https://www.ipea.gov.br/atlasviolencia/dados-series) e [Ministério das Mulheres - Painel Ligue 180](https://www.gov.br/mulheres/pt-br/central-de-atendimento-a-mulher-ligue-180)
* **Formato:** CSV / XLSX (Microdados agregados por município, tipo de agressão, perfil da vítima e ano).

---

## 2. Justificativa da Escolha

1. **Relevância Direta ao Domínio:** O Atlas da Violência e os registros públicos do Ligue 180 representam a base consolidada mais confiável sobre taxas de violência interpessoal e doméstica contra a mulher no Brasil.
2. **Conformidade Ética e LGPD:** Todos os microdados são anonimizados e de domínio público, sem qualquer exposição de nomes, dados sensíveis identificáveis ou vítimas reais, cumprindo estritamente as diretrizes da Seção 2.3 e 5.4 do edital.
3. **Viabilidade Técnica para Aprendizado de Máquina:**
   * **Análise Exploratória (EDA):** Permite verificar distribuições regionais, correlações temporais e padrões de ocorrência.
   * **Modelagem (ML):** Permite treinar modelos preditivos ou de clusterização (ex.: agrupamento de fatores de risco ou classificação de criticidade de cenários) para alimentar o módulo de autoavaliação preventiva no aplicativo mobile.

---

## 3. Divisão do Pipeline no Notebook (`notebook.ipynb`)

| Etapa | Aluno Responsável | Entregável Principal |
| :--- | :--- | :--- |
| **1. Governança e Ética de Dados** | **Alana Caled** | Identificação da licença de uso, metadados, contexto LGPD e justificativa. |
| **2. Análise Exploratória (EDA)** | **Felipe Trindade** | Medidas descritivas (média, mediana, desvio padrão), análise de frequências e gráficos de correlação. |
| **3. Qualidade e Limpeza** | **Higor Bueno** | Tratamento de valores ausentes (*NaN*), remoção de inconsistências, normalização e encoding. |
| **4. Modelagem de Machine Learning** | **Higor Domingos** | Aplicação de algoritmos (K-Means para clusterização ou Random Forest / Regressão Logística para classificação). |
| **5. Avaliação e Integração** | **João Pedro** | Cálculo de acurácia, precisão, recall, F1-Score, matriz de confusão e exportação das regras/indicador para o app mobile. |

---

> ℹ️ **Aviso Legal e Ético:** Todo indicador de risco gerado a partir desta modelagem e exibido no aplicativo mobile é acompanhado do aviso expresso de que se trata de uma estimativa acadêmica/estatística e **não substitui** atendimento policial, médico ou judiciário.
