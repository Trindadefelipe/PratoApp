// ============================================================
// TELA 18: Guia de direitos e canais
//
// Componente: GuiaDireitosScreen
// Navegação: Stack (push a partir do Início)
// Responsável: Felipe Trindade
// Entrega: 2 (24/10)
//
// O que o protótipo (Entrega 1, seção 4) mostra nesta tela:
//   * Ligue agora: 180 e 190
//   * Seus direitos: Lei Maria da Penha e medidas protetivas
//   * Onde buscar ajuda: Delegacia da Mulher e Casa da Mulher Brasileira
// ============================================================

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CabecalhoTela from '../../../components/safe/CabecalhoTela';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';

export default function GuiaDireitosScreen({ navigation }) {
  const discar = (numero) => {
    Linking.openURL(`tel:${numero}`).catch((err) =>
      console.error(`Erro ao discar para ${numero}:`, err)
    );
  };

  return (
    <SafeAreaView style={estilos.tela} edges={['top']}>
      <ScrollView
        contentContainerStyle={estilos.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <CabecalhoTela
          titulo="Guia de direitos"
          onVoltar={() => navigation.goBack()}
        />

        <Text style={estilos.subtituloTopo}>
          Canais de acolhimento rápido, legislação protetiva e orientação
          jurídica à sua disposição.
        </Text>

        {/* 1. SEÇÃO LIGUE AGORA */}
        <View style={estilos.secao}>
          <Text style={estilos.tituloSecao}>Ligue agora</Text>

          <View style={estilos.linhaBotoesEmergencia}>
            {/* Botão 180 */}
            <Pressable
              style={({ pressed }) => [
                estilos.cardLigue,
                estilos.card180,
                pressed && estilos.pressionado,
              ]}
              onPress={() => discar('180')}
            >
              <View style={estilos.topoCardLigue}>
                <Ionicons name="call" size={22} color={colors.verdeProfundo} />
                <Text style={estilos.numeroLigue}>180</Text>
              </View>
              <Text style={estilos.tituloLigue}>Central da Mulher</Text>
              <Text style={estilos.descLigue}>
                Gratuito, sigiloso e 24h. Orientações e denúncias.
              </Text>
            </Pressable>

            {/* Botão 190 */}
            <Pressable
              style={({ pressed }) => [
                estilos.cardLigue,
                estilos.card190,
                pressed && estilos.pressionado,
              ]}
              onPress={() => discar('190')}
            >
              <View style={estilos.topoCardLigue}>
                <Ionicons name="shield-outline" size={22} color={colors.coral} />
                <Text style={[estilos.numeroLigue, { color: colors.coral }]}>
                  190
                </Text>
              </View>
              <Text style={estilos.tituloLigue}>Polícia Militar</Text>
              <Text style={estilos.descLigue}>
                Emergência imediata e risco em andamento.
              </Text>
            </Pressable>
          </View>
        </View>

        {/* 2. SEÇÃO SEUS DIREITOS */}
        <View style={estilos.secao}>
          <Text style={estilos.tituloSecao}>Seus direitos</Text>

          {/* Card Maria da Penha */}
          <View style={estilos.cardInformativo}>
            <View style={estilos.cabecalhoCardInfo}>
              <View style={[estilos.circuloIcone, { backgroundColor: colors.verdeClaro }]}>
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color={colors.verdeProfundo}
                />
              </View>
              <Text style={estilos.tituloCardInfo}>Lei Maria da Penha (Lei nº 11.340/06)</Text>
            </View>
            <Text style={estilos.textoCardInfo}>
              Protege mulheres contra qualquer forma de violência doméstica e
              familiar. A violência não se restringe à agressão física:
            </Text>
            <View style={estilos.listaItens}>
              <Text style={estilos.itemLista}>
                • <Text style={estilos.itemDestaque}>Psicológica:</Text> ameaças, humilhações, manipulação e isolamento.
              </Text>
              <Text style={estilos.itemLista}>
                • <Text style={estilos.itemDestaque}>Patrimonial:</Text> retenção de dinheiro, documentos ou bens.
              </Text>
              <Text style={estilos.itemLista}>
                • <Text style={estilos.itemDestaque}>Moral:</Text> calúnia, injúria ou difamação.
              </Text>
              <Text style={estilos.itemLista}>
                • <Text style={estilos.itemDestaque}>Física e Sexual:</Text> qualquer ato que fira a integridade corporal.
              </Text>
            </View>
          </View>

          {/* Card Medidas Protetivas */}
          <View style={estilos.cardInformativo}>
            <View style={estilos.cabecalhoCardInfo}>
              <View style={[estilos.circuloIcone, { backgroundColor: colors.pessegoClaro }]}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={20}
                  color={colors.coral}
                />
              </View>
              <Text style={estilos.tituloCardInfo}>Medidas Protetivas de Urgência</Text>
            </View>
            <Text style={estilos.textoCardInfo}>
              Ordens judiciais concedidas pelo juiz em até 48 horas após a denúncia
              para resguardar sua integridade física e emocional:
            </Text>
            <View style={estilos.listaItens}>
              <Text style={estilos.itemLista}>
                • Afastamento imediato do agressor do lar ou local de convivência.
              </Text>
              <Text style={estilos.itemLista}>
                • Proibição de aproximação e de qualquer tipo de contato (ligações, mensagens ou redes sociais).
              </Text>
              <Text style={estilos.itemLista}>
                • Não é necessário advogado particular para requerer as medidas protetivas de urgência.
              </Text>
            </View>
          </View>
        </View>

        {/* 3. SEÇÃO ONDE BUSCAR AJUDA */}
        <View style={estilos.secao}>
          <Text style={estilos.tituloSecao}>Onde buscar ajuda</Text>

          {/* Delegacia da Mulher */}
          <View style={estilos.cardLocal}>
            <View style={estilos.cabecalhoCardInfo}>
              <View style={[estilos.circuloIcone, { backgroundColor: colors.verdeClaro }]}>
                <Ionicons
                  name="business-outline"
                  size={20}
                  color={colors.verdeProfundo}
                />
              </View>
              <View style={estilos.conteudoLocal}>
                <Text style={estilos.tituloCardInfo}>Delegacia da Mulher (DEAM)</Text>
                <Text style={estilos.textoLocal}>
                  Atendimento policial especializado, registro de Boletim de Ocorrência
                  (B.O.) e pedido imediato de medida protetiva. Em vários estados
                  o B.O. pode ser registrado pela Delegacia Eletrônica.
                </Text>
              </View>
            </View>
          </View>

          {/* Casa da Mulher Brasileira / CRAS / CREAS */}
          <View style={estilos.cardLocal}>
            <View style={estilos.cabecalhoCardInfo}>
              <View style={[estilos.circuloIcone, { backgroundColor: colors.amareloClaro }]}>
                <Ionicons
                  name="heart-outline"
                  size={20}
                  color={colors.amareloEscuro}
                />
              </View>
              <View style={estilos.conteudoLocal}>
                <Text style={estilos.tituloCardInfo}>Casa da Mulher Brasileira / CREAS</Text>
                <Text style={estilos.textoLocal}>
                  Espaço integrado com acolhimento psicológico, assistência social,
                  alojamento temporário de passagem e apoio com transporte e autonomia econômica.
                </Text>
              </View>
            </View>
          </View>

          {/* Defensoria Pública */}
          <View style={estilos.cardLocal}>
            <View style={estilos.cabecalhoCardInfo}>
              <View style={[estilos.circuloIcone, { backgroundColor: colors.pessegoSuave }]}>
                <Ionicons
                  name="scale-outline"
                  size={20}
                  color={colors.grafite}
                />
              </View>
              <View style={estilos.conteudoLocal}>
                <Text style={estilos.tituloCardInfo}>Defensoria Pública (NUDEM)</Text>
                <Text style={estilos.textoLocal}>
                  Assistência jurídica gratuita e integral para mulheres sem recursos
                  financeiros para pagar advogado particular.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Nota de rodapé */}
        <View style={estilos.rodapeCard}>
          <Text style={estilos.rodapeTexto}>
            Você não está sozinha. Todo atendimento é protegido por sigilo de
            acordo com a legislação brasileira.
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
    paddingBottom: 36,
  },
  subtituloTopo: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.grafite,
    lineHeight: 20,
    marginBottom: 20,
    opacity: 0.85,
  },
  secao: {
    marginBottom: 24,
  },
  tituloSecao: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.grafite,
    marginBottom: 12,
  },
  linhaBotoesEmergencia: {
    flexDirection: 'row',
    gap: 12,
  },
  cardLigue: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    backgroundColor: colors.branco,
    borderWidth: 1,
    justifyContent: 'space-between',
  },
  card180: {
    borderColor: colors.verdeBorda,
    backgroundColor: colors.verdeClaro,
  },
  card190: {
    borderColor: colors.pessegoPastel,
    backgroundColor: colors.coralClaro,
  },
  topoCardLigue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  numeroLigue: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.verdeProfundo,
  },
  tituloLigue: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: colors.grafite,
    marginBottom: 4,
  },
  descLigue: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.grafite,
    lineHeight: 16,
    opacity: 0.8,
  },
  cardInformativo: {
    backgroundColor: colors.branco,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.begeCard,
    marginBottom: 14,
  },
  cabecalhoCardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  circuloIcone: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tituloCardInfo: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    color: colors.grafite,
    flex: 1,
  },
  textoCardInfo: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.grafite,
    lineHeight: 19,
    marginBottom: 10,
    opacity: 0.9,
  },
  listaItens: {
    gap: 6,
  },
  itemLista: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.grafite,
    lineHeight: 18,
  },
  itemDestaque: {
    fontFamily: fonts.semibold,
    color: colors.grafite,
  },
  cardLocal: {
    backgroundColor: colors.branco,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.begeCard,
    marginBottom: 12,
  },
  conteudoLocal: {
    flex: 1,
  },
  textoLocal: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.grafite,
    lineHeight: 18,
    marginTop: 4,
    opacity: 0.85,
  },
  rodapeCard: {
    backgroundColor: colors.verdeClaro,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.verdeBorda,
    alignItems: 'center',
  },
  rodapeTexto: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.verdeProfundo,
    textAlign: 'center',
    lineHeight: 18,
  },
  pressionado: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
});