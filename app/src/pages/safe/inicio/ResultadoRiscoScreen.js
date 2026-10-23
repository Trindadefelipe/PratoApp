// ============================================================
// TELA 17: Resultado da autoavaliação
//
// Componente: ResultadoRiscoScreen
// Navegação: Stack (push após a última pergunta)
// Responsável: Felipe Trindade
// Entrega: 2 (24/10)
//
// O que o protótipo (Entrega 1, seção 4) mostra nesta tela:
//   * Nível de atenção (Baixo, Moderado, Alto) com barra
//   * Botões Falar com o Círculo, Ver guia de direitos e Ligar para o 180
//   * Aviso de estimativa acadêmica
// ============================================================

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Linking,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CabecalhoTela from '../../../components/safe/CabecalhoTela';
import BotaoPrimario from '../../../components/BotaoPrimario';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';

export default function ResultadoRiscoScreen({ route, navigation }) {
  const respostas = route.params?.respostas || [];
  const soma = respostas.reduce(
    (acc, val) => acc + (typeof val === 'number' ? val : 0),
    0
  );

  // Classificação do nível de atenção conforme a soma das respostas (0 a 24)
  const obterClassificacao = (pontos) => {
    if (pontos <= 7) {
      return {
        nivel: 'Baixo',
        titulo: 'Nível de Atenção Baixo',
        descricao:
          'Suas respostas apontam para uma situação de atenção inicial. Mantenha seus limites claros e continue fortalecendo seus laços de apoio.',
        cor: colors.verdeProfundo,
        fundoCard: colors.verdeClaro,
        bordaCard: colors.verdeBorda,
        icone: 'shield-checkmark',
        indiceAtivo: 0,
      };
    }
    if (pontos <= 15) {
      return {
        nivel: 'Moderado',
        titulo: 'Nível de Atenção Moderado',
        descricao:
          'Foram identificados sinais de controle ou situações que merecem atenção redobrada. Considere conversar com pessoas de sua confiança e buscar orientação.',
        cor: colors.amareloEscuro,
        fundoCard: colors.amareloClaro,
        bordaCard: colors.amarelo,
        icone: 'alert-circle',
        indiceAtivo: 1,
      };
    }
    return {
      nivel: 'Alto',
      titulo: 'Nível de Atenção Alto',
      descricao:
        'Suas respostas indicam situações graves e padrões preocupantes de agressão ou controle. Sua segurança é prioridade: procure apoio especializado ou acione sua rede de emergência.',
      cor: colors.coral,
      fundoCard: colors.coralClaro,
      bordaCard: colors.pessegoPastel,
      icone: 'warning',
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
          titulo="Resultado"
          onVoltar={() => navigation.goBack()}
        />

        {/* Card Principal do Nível */}
        <View
          style={[
            estilos.cardResultado,
            {
              backgroundColor: infoRisco.fundoCard,
              borderColor: infoRisco.bordaCard,
            },
          ]}
        >
          <View style={estilos.topoCard}>
            <View
              style={[
                estilos.circuloIcone,
                { backgroundColor: colors.branco },
              ]}
            >
              <Ionicons
                name={infoRisco.icone}
                size={28}
                color={infoRisco.cor}
              />
            </View>
            <View style={estilos.textoTopoCard}>
              <Text style={[estilos.tagNivel, { color: infoRisco.cor }]}>
                {infoRisco.titulo}
              </Text>
              <Text style={estilos.pontuacaoTexto}>
                Pontuação: {soma} de 24 pontos
              </Text>
            </View>
          </View>

          <Text style={estilos.descricaoResultado}>
            {infoRisco.descricao}
          </Text>

          {/* Barra Segmentada de Nível */}
          <View style={estilos.barraContainer}>
            <View style={estilos.linhaSegmentos}>
              {['Baixo', 'Moderado', 'Alto'].map((rotulo, idx) => {
                const ativo = idx === infoRisco.indiceAtivo;
                const coresBarra = [
                  colors.verdeProfundo,
                  colors.amareloEscuro,
                  colors.coral,
                ];
                return (
                  <View key={rotulo} style={estilos.colunaSegmento}>
                    <View
                      style={[
                        estilos.segmento,
                        ativo && {
                          backgroundColor: coresBarra[idx],
                          height: 8,
                        },
                      ]}
                    />
                    <Text
                      style={[
                        estilos.rotuloSegmento,
                        ativo && {
                          color: coresBarra[idx],
                          fontFamily: fonts.bold,
                        },
                      ]}
                    >
                      {rotulo}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

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
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 8,
    marginBottom: 24,
  },
  topoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 14,
  },
  circuloIcone: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.preto,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  textoTopoCard: {
    flex: 1,
  },
  tagNivel: {
    fontFamily: fonts.bold,
    fontSize: 20,
    marginBottom: 2,
  },
  pontuacaoTexto: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.grafite,
    opacity: 0.8,
  },
  descricaoResultado: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.grafite,
    lineHeight: 22,
    marginBottom: 18,
  },
  barraContainer: {
    marginTop: 4,
  },
  linhaSegmentos: {
    flexDirection: 'row',
    gap: 8,
  },
  colunaSegmento: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  segmento: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.begeDivisor,
  },
  rotuloSegmento: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: colors.cinza,
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
});