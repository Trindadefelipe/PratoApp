// ============================================================
// TELA 05: Início e SOS
//
// Componente: SafeHomeScreen
// Navegação: Tab (aba Início), raiz do InicioStack
// Responsável: Higor Domingos (Issue #54)
// Entrega: 2 (24/10)
//
// O que o protótipo (safe-01-inicio.png) mostra nesta tela:
//   * Saudação com nome fictício e selo SAFE
//   * Botão SOS central de um toque com anéis concêntricos (halo)
//   * Descrição de envio ao Círculo de Confiança e central
//   * 4 Atalhos rápidos: Viagem segura, Registrar incidente,
//     Autoavaliação de risco e Guia de direitos
//   * Link direto para o Histórico de alertas
//   * Botões de discagem rápida: Ligue 180 e 190
// ============================================================

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';
import { dispararSos, TIPOS_GATILHO } from '../../../services/sos';
import { usuaria } from '../../../data/usuaria';

export default function SafeHomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [sosEnviado, setSosEnviado] = useState(false);

  const handleAcionarSos = async () => {
    try {
      await dispararSos({ tipoGatilho: TIPOS_GATILHO.BOTAO });
      setSosEnviado(true);
      Alert.alert(
        'Alerta SOS Disparado',
        'Sua localização e pedido de ajuda foram registrados silenciosamente.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Erro ao disparar SOS:', error);
    }
  };

  const abrirLigacao = (numero) => {
    Linking.openURL(`tel:${numero}`).catch((err) =>
      console.error('Erro ao abrir discador:', err)
    );
  };

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top + 12 }]}
      contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom + 24 }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View>
          <Text style={styles.saudacao}>Olá, {usuaria.nome_ficticio.split(' ')[0]}</Text>
          <Text style={styles.titulo}>Espaço seguro</Text>
        </View>

        <View style={styles.badgeSafe}>
          <Ionicons name="shield-checkmark-outline" size={14} color={colors.verdeProfundo} />
          <Text style={styles.badgeSafeTexto}>SAFE</Text>
        </View>
      </View>

      {/* Botão SOS Central com Halos Concêntricos */}
      <View style={styles.sosArea}>
        <View style={styles.haloExterno}>
          <View style={styles.haloMedio}>
            <Pressable
              onPress={handleAcionarSos}
              style={({ pressed }) => [
                styles.botaoSos,
                pressed && styles.botaoSosPressionado,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Botão SOS de emergência de um toque"
            >
              <Text style={styles.sosTexto}>SOS</Text>
              <Text style={styles.sosSubtexto}>um toque</Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.descricaoSos}>
          Envia sua localização ao Círculo de Confiança e à central de atendimento.
        </Text>
      </View>

      {/* Grade de 4 Atalhos (2x2) */}
      <View style={styles.gridAtalhos}>
        {/* Atalho 1: Viagem Segura (troca para a aba Viagem) */}
        <Pressable
          style={[styles.cardAtalho, styles.cardViagem]}
          onPress={() => navigation.navigate('Viagem')}
        >
          <Ionicons name="location-outline" size={24} color={colors.verdeProfundo} />
          <Text style={[styles.cardTitulo, { color: colors.verdeProfundo }]}>
            Viagem segura
          </Text>
        </Pressable>

        {/* Atalho 2: Registrar Incidente (troca para a aba Cofre) */}
        <Pressable
          style={[styles.cardAtalho, styles.cardIncidente]}
          onPress={() => navigation.navigate('Cofre')}
        >
          <Ionicons name="lock-closed-outline" size={24} color={colors.marrom} />
          <Text style={[styles.cardTitulo, { color: colors.marromEscuro }]}>
            Registrar incidente
          </Text>
        </Pressable>

        {/* Atalho 3: Autoavaliação de Risco (push no InicioStack) */}
        <Pressable
          style={[styles.cardAtalho, styles.cardAutoavaliacao]}
          onPress={() => navigation.navigate('Autoavaliacao')}
        >
          <Ionicons name="heart-outline" size={24} color={colors.amareloEscuro} />
          <Text style={[styles.cardTitulo, { color: colors.amareloProfundo }]}>
            Autoavaliação de risco
          </Text>
        </Pressable>

        {/* Atalho 4: Guia de Direitos (push no InicioStack) */}
        <Pressable
          style={[styles.cardAtalho, styles.cardGuia]}
          onPress={() => navigation.navigate('GuiaDireitos')}
        >
          <Ionicons name="bookmark-outline" size={24} color={colors.verdeProfundo} />
          <Text style={[styles.cardTitulo, { color: colors.verdeProfundo }]}>
            Guia de direitos
          </Text>
        </Pressable>
      </View>

      {/* Divisor */}
      <View style={styles.divisor} />

      {/* Linha Atalho para Histórico de Alertas */}
      <Pressable
        style={styles.linhaHistorico}
        onPress={() => navigation.navigate('AlertasHistorico')}
      >
        <View style={styles.historicoEsquerda}>
          <Ionicons name="time-outline" size={20} color={colors.grafite} />
          <Text style={styles.historicoTexto}>Histórico de alertas</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.cinza} />
      </Pressable>

      {/* Botões de Emergência (Ligue 180 e 190) */}
      <View style={styles.linhaEmergencia}>
        <Pressable
          style={styles.botaoEmergencia}
          onPress={() => abrirLigacao('180')}
        >
          <Ionicons name="call-outline" size={18} color={colors.verdeProfundo} />
          <Text style={styles.botaoEmergenciaTexto}>Ligue 180</Text>
        </Pressable>

        <Pressable
          style={styles.botaoEmergencia}
          onPress={() => abrirLigacao('190')}
        >
          <Ionicons name="call-outline" size={18} color={colors.coral} />
          <Text style={styles.botaoEmergenciaTexto}>190</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.creme,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  saudacao: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.grafite,
    marginBottom: 2,
  },
  titulo: {
    fontFamily: fonts.bold,
    fontSize: 26,
    color: colors.grafite,
  },
  badgeSafe: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: colors.verdeClaro,
    borderWidth: 1,
    borderColor: colors.verdeBorda,
  },
  badgeSafeTexto: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    color: colors.verdeProfundo,
    letterSpacing: 0.5,
  },
  sosArea: {
    alignItems: 'center',
    marginVertical: 10,
  },
  haloExterno: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(226, 103, 77, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  haloMedio: {
    width: 194,
    height: 194,
    borderRadius: 97,
    backgroundColor: 'rgba(226, 103, 77, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoSos: {
    width: 146,
    height: 146,
    borderRadius: 73,
    backgroundColor: colors.coral,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.coral,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  botaoSosPressionado: {
    transform: [{ scale: 0.96 }],
    opacity: 0.9,
  },
  sosTexto: {
    fontFamily: fonts.bold,
    fontSize: 32,
    color: colors.branco,
    letterSpacing: 1,
  },
  sosSubtexto: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.branco,
    marginTop: -2,
    opacity: 0.95,
  },
  descricaoSos: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.grafite,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 14,
    paddingHorizontal: 24,
    opacity: 0.8,
  },
  gridAtalhos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 20,
  },
  cardAtalho: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    minHeight: 100,
    justifyContent: 'space-between',
  },
  cardViagem: {
    backgroundColor: colors.verdeClaro,
  },
  cardIncidente: {
    backgroundColor: colors.pessegoClaro,
  },
  cardAutoavaliacao: {
    backgroundColor: colors.amareloClaro,
  },
  cardGuia: {
    backgroundColor: colors.verdeClaro,
  },
  cardTitulo: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    lineHeight: 18,
    marginTop: 12,
  },
  divisor: {
    height: 1,
    backgroundColor: colors.begeDivisor,
    marginVertical: 16,
  },
  linhaHistorico: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  historicoEsquerda: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  historicoTexto: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.grafite,
  },
  linhaEmergencia: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  botaoEmergencia: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 48,
    backgroundColor: colors.branco,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.begeDivisor,
  },
  botaoEmergenciaTexto: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: colors.grafite,
  },
});