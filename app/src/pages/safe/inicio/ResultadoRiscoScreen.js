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
  const [mostrarCapitais, setMostrarCapitais] = useState(false);
  const acimaDaMedia = indicadorAtual?.classe_risco === 'Alto';

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
        'Não foi possível carregar os dados da capital agora.'
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
    setMostrarCapitais(false);
    try {
      setCarregandoIndicador(true);
      setErroIndicador(null);
      const dado = await buscarIndicadorPorCapital(capital);
      setIndicadorAtual(dado);
    } catch (err) {
      setErroIndicador(
        'Não foi possível carregar os dados dessa capital agora.'
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

        {/* Contexto Regional (Indicador DS vindo da API), escrito para a usuária */}
        <View style={estilos.cardIndicador}>
          <View style={estilos.topoIndicador}>
            <View style={estilos.iconeIndicador}>
              <Ionicons name="location-outline" size={18} color={colors.verdeProfundo} />
            </View>
            <Text style={estilos.tituloIndicador}>Sobre a sua capital</Text>
            {capitais.length > 0 && (
              <Pressable
                onPress={() => setMostrarCapitais((atual) => !atual)}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel="Trocar capital"
              >
                <Text style={estilos.trocarCapital}>
                  {mostrarCapitais ? 'Fechar' : 'Trocar'}
                </Text>
              </Pressable>
            )}
          </View>

          {mostrarCapitais && (
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
                Carregando os dados da capital...
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
            <View>
              <Text style={estilos.nomeCapital}>
                {indicadorAtual.capital}
                <Text style={estilos.regiaoCapital}> · {indicadorAtual.regiao}</Text>
              </Text>

              <View
                style={[
                  estilos.seloIndicador,
                  acimaDaMedia ? estilos.seloAcima : estilos.seloAbaixo,
                ]}
              >
                <Ionicons
                  name={acimaDaMedia ? 'trending-up' : 'trending-down'}
                  size={14}
                  color={acimaDaMedia ? colors.coral : colors.verdeProfundo}
                />
                <Text
                  style={[
                    estilos.seloIndicadorTexto,
                    { color: acimaDaMedia ? colors.coral : colors.verdeProfundo },
                  ]}
                >
                  {acimaDaMedia ? 'Acima da média das capitais' : 'Abaixo da média das capitais'}
                </Text>
              </View>

              <Text style={estilos.fraseIndicador}>
                {acimaDaMedia
                  ? `Pelos dados públicos, a violência contra a mulher em ${indicadorAtual.capital} tende a ficar acima da média das capitais. Vale manter seus contatos de apoio por perto.`
                  : `Pelos dados públicos, a violência contra a mulher em ${indicadorAtual.capital} tende a ficar abaixo da média das capitais. Mesmo assim, o que você vive importa mais do que a média da cidade.`}
              </Text>

              <Text style={estilos.metricaIndicador}>
                Em {indicadorAtual.ano_referencia}, foram{' '}
                {Number(indicadorAtual.taxa_recente).toFixed(2).replace('.', ',')}{' '}
                homicídios de mulheres a cada 100 mil.
              </Text>

              <Text style={estilos.notaAcademicaIndicador}>
                Estimativa acadêmica com dados do Atlas da Violência (IPEA). Fala da
                cidade, não da sua situação.
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
  topoIndicador: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  iconeIndicador: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.verdeClaro,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tituloIndicador: {
    flex: 1,
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: colors.grafite,
  },
  trocarCapital: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    color: colors.verdeProfundo,
  },
  listaCapitais: {
    gap: 8,
    paddingBottom: 12,
  },
  estadoIndicador: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  textoEstadoIndicador: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.cinza,
  },
  erroIndicadorBox: {
    gap: 8,
    paddingVertical: 4,
  },
  erroIndicadorTexto: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.coral,
  },
  botaoTentarIndicador: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.begeDivisor,
  },
  textoTentarIndicador: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    color: colors.grafite,
  },
  nomeCapital: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.grafite,
  },
  regiaoCapital: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.cinza,
  },
  seloIndicador: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 999,
    marginTop: 8,
    marginBottom: 12,
  },
  seloAcima: {
    backgroundColor: colors.coralClaro,
  },
  seloAbaixo: {
    backgroundColor: colors.verdeClaro,
  },
  seloIndicadorTexto: {
    fontFamily: fonts.semibold,
    fontSize: 12,
  },
  fraseIndicador: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 21,
    color: colors.grafite,
  },
  metricaIndicador: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 19,
    color: colors.cinza,
    marginTop: 8,
  },
  notaAcademicaIndicador: {
    fontFamily: fonts.regular,
    fontSize: 11,
    lineHeight: 16,
    color: colors.cinza,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.begeDivisor,
  },
});
