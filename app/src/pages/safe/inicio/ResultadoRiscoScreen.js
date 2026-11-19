// ============================================================
// TELA 17: Resultado da autoavaliação
//
// Componente: ResultadoRiscoScreen
// Navegação: Stack (push após a última pergunta)
// Responsável: Felipe Trindade (tela) / João Pedro (indicador DS #83)
//
// O que o protótipo (Entrega 1, seção 4) mostra nesta tela:
//   * Nível de atenção (Baixo, Moderado, Alto) com barra
//   * Botões Falar com o Círculo, Ver guia de direitos e Ligar para o 180
//   * Aviso de estimativa acadêmica
//   * Indicador contextual da capital vindo da API (GET /indicadores), no final
// ============================================================

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Linking,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CabecalhoTela from '../../../components/safe/CabecalhoTela';
import BotaoPrimario from '../../../components/BotaoPrimario';
import Chip from '../../../components/Chip';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';
import {
  listarIndicadores,
  buscarIndicadorPorCapital,
} from '../../../services/api';

// As três faixas do medidor. A faixa do nível da usuária fica forte, as outras claras.
const NIVEIS = [
  { rotulo: 'Baixo', cor: colors.verdeFolha },
  { rotulo: 'Moderado', cor: colors.amarelo },
  { rotulo: 'Alto', cor: colors.coral },
];

export default function ResultadoRiscoScreen({ route, navigation }) {
  const respostas = route.params?.respostas || [];
  const soma = respostas.reduce(
    (acc, val) => acc + (typeof val === 'number' ? val : 0),
    0
  );

  const [capitais, setCapitais] = useState([]);
  const [capitalSelecionada, setCapitalSelecionada] = useState('');
  const [indicadorAtual, setIndicadorAtual] = useState(null);
  const [carregandoIndicador, setCarregandoIndicador] = useState(true);
  const [erroIndicador, setErroIndicador] = useState(null);

  const carregarIndicadores = async () => {
    try {
      setCarregandoIndicador(true);
      setErroIndicador(null);
      const lista = await listarIndicadores();
      const itens = Array.isArray(lista) ? lista : [];
      setCapitais(itens);

      if (itens.length > 0) {
        const padrao =
          itens.find((item) => item.capital === 'São Paulo') || itens[0];
        setCapitalSelecionada(padrao.capital);
        setIndicadorAtual(padrao);
      }
    } catch (err) {
      setErroIndicador(
        err.message || 'Não foi possível carregar o indicador da capital.'
      );
    } finally {
      setCarregandoIndicador(false);
    }
  };

  useEffect(() => {
    carregarIndicadores();
  }, []);

  const selecionarCapital = async (capital) => {
    setCapitalSelecionada(capital);
    try {
      setCarregandoIndicador(true);
      setErroIndicador(null);
      const dado = await buscarIndicadorPorCapital(capital);
      setIndicadorAtual(dado);
    } catch (err) {
      setErroIndicador(
        err.message || 'Não foi possível consultar a capital selecionada.'
      );
    } finally {
      setCarregandoIndicador(false);
    }
  };

  // Classificação do nível de atenção conforme a soma das respostas (0 a 24)
  const obterClassificacao = (pontos) => {
    if (pontos <= 7) {
      return {
        nivel: 'Baixo',
        descricao:
          'Suas respostas apontam para uma situação de atenção inicial. Mantenha seus limites claros e continue fortalecendo seus laços de apoio.',
        fundoCard: colors.verdeClaro,
        bordaCard: colors.verdeBorda,
        indiceAtivo: 0,
      };
    }
    if (pontos <= 15) {
      return {
        nivel: 'Moderado',
        descricao:
          'Foram identificados sinais de controle ou situações que merecem atenção redobrada. Considere conversar com pessoas de sua confiança e buscar orientação.',
        fundoCard: colors.amareloClaro,
        bordaCard: colors.amarelo,
        indiceAtivo: 1,
      };
    }
    return {
      nivel: 'Alto',
      descricao:
        'Suas respostas indicam situações graves e padrões preocupantes de agressão ou controle. Sua segurança é prioridade: procure apoio especializado ou acione sua rede de emergência.',
      fundoCard: colors.coralClaro,
      bordaCard: colors.pessegoPastel,
      indiceAtivo: 2,
    };
  };

  const infoRisco = obterClassificacao(soma);

  const ligarPara180 = () => {
    Linking.openURL('tel:180').catch((err) =>
      console.error('Erro ao discar 180:', err)
    );
  };

  return (
    <SafeAreaView style={estilos.tela} edges={['top']}>
      <ScrollView
        contentContainerStyle={estilos.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <CabecalhoTela
          titulo="Seu resultado"
          onVoltar={() => navigation.goBack()}
        />

        {/* Medidor do nível (igual ao protótipo da Tela 17) */}
        <View
          style={[
            estilos.cardResultado,
            {
              backgroundColor: infoRisco.fundoCard,
              borderColor: infoRisco.bordaCard,
            },
          ]}
        >
          <Text style={estilos.rotuloNivel}>Seu nível de atenção</Text>
          <Text style={estilos.nomeNivel}>{infoRisco.nivel}</Text>

          <View style={estilos.linhaSegmentos}>
            {NIVEIS.map((nivel, idx) => {
              const ativo = idx === infoRisco.indiceAtivo;
              return (
                <View key={nivel.rotulo} style={estilos.colunaSegmento}>
                  <View
                    style={[
                      estilos.segmento,
                      { backgroundColor: nivel.cor },
                      !ativo && estilos.segmentoInativo,
                    ]}
                  />
                  <Text
                    style={[
                      estilos.rotuloSegmento,
                      idx === 0 && estilos.rotuloInicio,
                      idx === NIVEIS.length - 1 && estilos.rotuloFim,
                      ativo && estilos.rotuloAtivo,
                    ]}
                  >
                    {nivel.rotulo}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <Text style={estilos.descricaoResultado}>{infoRisco.descricao}</Text>

        {/* Seção de Ações e Atalhos */}
        <View style={estilos.secaoAcoes}>
          <Text style={estilos.tituloSecao}>O que fazer agora</Text>

          {/* Botão Falar com o Círculo */}
          <BotaoPrimario
            titulo="Falar com o Círculo de Confiança"
            onPress={() => navigation.navigate('Circulo')}
            style={estilos.botaoAcao}
          />

          {/* Botão Ver Guia de Direitos */}
          <Pressable
            style={({ pressed }) => [
              estilos.botaoSecundario,
              pressed && estilos.botaoPressionado,
            ]}
            onPress={() => navigation.navigate('GuiaDireitos')}
          >
            <Ionicons
              name="bookmark-outline"
              size={18}
              color={colors.verdeProfundo}
            />
            <Text style={estilos.textoBotaoSecundario}>
              Ver guia de direitos e canais
            </Text>
          </Pressable>

          {/* Botão Ligar 180 */}
          <Pressable
            style={({ pressed }) => [
              estilos.botaoLigue180,
              pressed && estilos.botaoPressionado,
            ]}
            onPress={ligarPara180}
          >
            <Ionicons name="call" size={18} color={colors.coral} />
            <Text style={estilos.textoBotao180}>Ligar para o 180 (Central)</Text>
          </Pressable>
        </View>

        {/* Aviso de Estimativa Acadêmica */}
        <View style={estilos.cardAviso}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color={colors.cinza}
          />
          <Text style={estilos.textoAviso}>
            Aviso de estimativa acadêmica: este cálculo é uma soma preliminar
            baseada nas respostas do questionário simulado e não substitui
            orientação psicológica, jurídica ou policial. Em emergência, ligue
            190.
          </Text>
        </View>

        {/* Contexto Regional (Indicador DS vindo da API) */}
        <View style={estilos.cardIndicador}>
          <Text style={estilos.tituloIndicador}>
            Contexto da capital (Data Science)
          </Text>
          <Text style={estilos.subtituloIndicador}>
            Informação complementar baseada no histórico público da capital:
          </Text>

          {capitais.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={estilos.listaCapitais}
            >
              {capitais.map((item) => (
                <Chip
                  key={item.capital}
                  titulo={item.capital}
                  ativo={capitalSelecionada === item.capital}
                  onPress={() => selecionarCapital(item.capital)}
                />
              ))}
            </ScrollView>
          )}

          {carregandoIndicador && (
            <View style={estilos.estadoIndicador}>
              <ActivityIndicator size="small" color={colors.verdeProfundo} />
              <Text style={estilos.textoEstadoIndicador}>
                Carregando indicador da API...
              </Text>
            </View>
          )}

          {erroIndicador && !carregandoIndicador && (
            <View style={estilos.erroIndicadorBox}>
              <Text style={estilos.erroIndicadorTexto}>{erroIndicador}</Text>
              <Pressable
                style={estilos.botaoTentarIndicador}
                onPress={carregarIndicadores}
              >
                <Text style={estilos.textoTentarIndicador}>
                  Tentar novamente
                </Text>
              </Pressable>
            </View>
          )}

          {indicadorAtual && !carregandoIndicador && !erroIndicador && (
            <View style={estilos.detalheIndicador}>
              <View style={estilos.linhaIndicadorTopo}>
                <Text style={estilos.nomeCapital}>
                  {indicadorAtual.capital} • {indicadorAtual.regiao}
                </Text>
                <View
                  style={[
                    estilos.badgeIndicador,
                    {
                      backgroundColor:
                        indicadorAtual.classe_risco === 'Alto'
                          ? colors.coralClaro
                          : colors.verdeClaro,
                    },
                  ]}
                >
                  <Text
                    style={[
                      estilos.badgeIndicadorTexto,
                      {
                        color:
                          indicadorAtual.classe_risco === 'Alto'
                            ? colors.coral
                            : colors.verdeProfundo,
                      },
                    ]}
                  >
                    Indicador {indicadorAtual.classe_risco} (
                    {Math.round(Number(indicadorAtual.probabilidade_alto) * 100)}%)
                  </Text>
                </View>
              </View>

              <Text style={estilos.metricaIndicador}>
                Taxa em {indicadorAtual.ano_referencia}:{' '}
                {Number(indicadorAtual.taxa_recente).toFixed(2)} por 100 mil
                mulheres
              </Text>
              {Boolean(indicadorAtual.perfil_cluster) && (
                <Text style={estilos.perfilIndicador}>
                  {indicadorAtual.perfil_cluster}
                </Text>
              )}
              <Text style={estilos.notaAcademicaIndicador}>
                Estimativa acadêmica agregada por capital ({indicadorAtual.modelo_origem}) — não mede risco individual.
              </Text>
            </View>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: colors.creme,
  },
  conteudo: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  cardResultado: {
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 8,
    marginBottom: 16,
  },
  rotuloNivel: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.cinza,
  },
  nomeNivel: {
    fontFamily: fonts.bold,
    fontSize: 28,
    color: colors.grafite,
    marginTop: 2,
    marginBottom: 14,
  },
  linhaSegmentos: {
    flexDirection: 'row',
    gap: 6,
  },
  colunaSegmento: {
    flex: 1,
    gap: 6,
  },
  segmento: {
    height: 10,
    borderRadius: 5,
  },
  segmentoInativo: {
    opacity: 0.4,
  },
  rotuloSegmento: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.cinza,
    textAlign: 'center',
  },
  rotuloInicio: {
    textAlign: 'left',
  },
  rotuloFim: {
    textAlign: 'right',
  },
  rotuloAtivo: {
    fontFamily: fonts.bold,
    color: colors.grafite,
  },
  descricaoResultado: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.grafite,
    lineHeight: 22,
    marginBottom: 24,
  },
  secaoAcoes: {
    gap: 12,
    marginBottom: 24,
  },
  tituloSecao: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: colors.grafite,
    marginBottom: 4,
  },
  botaoAcao: {
    width: '100%',
  },
  botaoSecundario: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.branco,
    borderWidth: 1,
    borderColor: colors.begeDivisor,
  },
  textoBotaoSecundario: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: colors.grafite,
  },
  botaoLigue180: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.branco,
    borderWidth: 1,
    borderColor: colors.pessegoPastel,
  },
  textoBotao180: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: colors.coral,
  },
  botaoPressionado: {
    opacity: 0.8,
  },
  cardAviso: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: colors.amareloClaro,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.amarelo,
    alignItems: 'flex-start',
  },
  textoAviso: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.amareloProfundo,
    lineHeight: 18,
  },
  cardIndicador: {
    backgroundColor: colors.branco,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.begeCard,
    padding: 16,
    marginTop: 20,
    marginBottom: 24,
  },
  tituloIndicador: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: colors.grafite,
    marginBottom: 4,
  },
  subtituloIndicador: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.cinza,
    marginBottom: 12,
  },
  listaCapitais: {
    paddingBottom: 10,
  },
  estadoIndicador: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },
  textoEstadoIndicador: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.cinza,
  },
  erroIndicadorBox: {
    backgroundColor: colors.pessegoClaro,
    borderRadius: 12,
    padding: 12,
  },
  erroIndicadorTexto: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.coral,
    marginBottom: 8,
  },
  botaoTentarIndicador: {
    alignSelf: 'flex-start',
    backgroundColor: colors.coral,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  textoTentarIndicador: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    color: colors.branco,
  },
  detalheIndicador: {
    backgroundColor: colors.creme,
    borderRadius: 14,
    padding: 14,
    marginTop: 4,
  },
  linhaIndicadorTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  nomeCapital: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.grafite,
  },
  badgeIndicador: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeIndicadorTexto: {
    fontFamily: fonts.semibold,
    fontSize: 12,
  },
  metricaIndicador: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.grafite,
    marginBottom: 4,
  },
  perfilIndicador: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.cinza,
    marginBottom: 8,
  },
  notaAcademicaIndicador: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.amareloProfundo,
    lineHeight: 16,
  },
});
