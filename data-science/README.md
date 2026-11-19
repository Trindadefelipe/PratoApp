# 📊 Pratô / SAFE: Data Science (Entrega Final)

Pipeline de Data Science do projeto, do dado público até o indicador mostrado no app: **a violência letal contra a mulher em uma capital tende a ficar acima da mediana histórica no ano seguinte?**

O resultado aparece na **Tela 17** do app (Resultado da autoavaliação) como um indicador de contexto da capital, sempre com o aviso de **estimativa acadêmica**. Ele descreve a cidade, nunca o risco individual da usuária.

## ▶️ Como rodar

```bash
pip install -r requirements.txt
jupyter notebook notebook.ipynb
```

O notebook já vem **executado**, com todas as saídas, tabelas e gráficos visíveis: dá para só ler de cima a baixo. Para conferir os números, use `Kernel → Restart & Run All`. No Google Colab, o notebook baixa os CSV do GitHub sozinho, sem precisar subir arquivos.

## 🗃️ Base

[Atlas da Violência](https://www.ipea.gov.br/atlasviolencia/tema/61/) (IPEA e FBSP, a partir do SIM/Ministério da Saúde): séries "Homicídios Mulheres" e "Taxa de Homicídios Mulheres", 27 capitais, 1989 a 2022 (918 linhas capital × ano). Dados públicos, agregados e sem informação pessoal.

| Arquivo em `dados/` | O que é |
|---|---|
| `Homicídios Mulheres_capitais.csv` e `Taxa de Homicídios Mulheres_capitais.csv` | Arquivos originais do Atlas, intactos |
| `capitais_homicidios_mulheres.csv` | As duas séries unidas por capital e ano |
| `capitais_dados_processados.csv` | Base tratada, com `regiao` e `faixa_risco` |
| `indicadores_capitais.csv` | Saída do modelo final para as 27 capitais, carregada no Supabase (`api/sql/seed_indicadores.sql`) |

## 📑 O que tem no notebook

| Etapa | Seção do notebook | Responsável |
|---|---|---|
| Governança, ética e LGPD | 1 | Alana Caled |
| Carga da base e dicionário de dados | 2 | Alana Caled |
| Diagnóstico de qualidade (5 dimensões) | 3 | Higor Bueno |
| Tratamento: inválidos, duplicatas, imputação, outliers sinalizados, novas colunas | 4 | Higor Bueno |
| Análise exploratória (EDA) e três perguntas respondidas com os dados | 5 | Felipe Trindade |
| Plano de modelagem e pisos | 6 e 6.1 | Higor Domingos |
| Modelagem: Regressão Logística × Random Forest com validação cruzada temporal (`TimeSeriesSplit`), e K-Means | 6.3 | Higor Domingos (#79) |
| Avaliação: acurácia, precisão, recall, F1, ROC-AUC, matriz de confusão, comparação com os pisos e decisão final | 6.4 | Alana Caled (#82) |
| Exportação do indicador das capitais para a API | 6.4.7 | João Pedro (#83) |
| Conclusões e checklist | 7 | Higor Bueno (#74) |

## 🤖 Modelo escolhido

**Random Forest** (`pipe_rf`), escolhido pelo maior **recall da classe "alto"**: em um app de segurança, o pior erro é dizer que uma capital de taxa alta está tranquila.

Teste fora do tempo (2016 a 2022, 189 linhas capital × ano), sem vazamento: a mediana e os escalonadores usam só os dados de treino (até 2015).

| Métrica | Random Forest | Regressão Logística | Piso: repetir o ano anterior |
|---|:---:|:---:|:---:|
| Recall (alto) | **0,931** | 0,911 | 0,851 |
| Acurácia | **0,794** | 0,788 | 0,772 |
| F1 | **0,828** | 0,821 | 0,800 |
| ROC-AUC | 0,857 | 0,870 | — |

O modelo supera o piso em recall, acurácia e F1. O K-Means separa as capitais em 3 perfis (silhueta 0,346 com k=3).

## 📱 Integração com o app

```
notebook.ipynb (seção 6.4.7)
   → dados/indicadores_capitais.csv
   → tabela indicadores_capitais no Supabase (api/sql/seed_indicadores.sql)
   → GET /indicadores e GET /indicadores/:capital (api/src/rotas/indicadores.js)
   → Tela 17, card "Sobre a sua capital" (app/src/pages/safe/inicio/ResultadoRiscoScreen.js)
```

No app, a usuária busca a capital pelo nome e vê se ela fica acima ou abaixo da média das capitais, com a chance estimada pelo modelo e o aviso de estimativa acadêmica.

## ⚠️ Limitações

Subnotificação e mortes registradas como "causa indeterminada", mudança da CID-9 para a CID-10 em 1996, só capitais e só homicídios. Nenhum indicador daqui substitui atendimento psicológico, jurídico ou policial.
