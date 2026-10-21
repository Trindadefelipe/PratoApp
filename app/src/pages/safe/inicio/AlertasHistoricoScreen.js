// ============================================================
// TELA 15: Histórico de alertas SOS
//
// Componente: AlertasHistoricoScreen
// Navegação: Stack (push a partir do Início / SafeHomeScreen)
// Responsável: Higor Domingos (Issue #55)
// Entrega: 2 (24/10)
//
// O que o protótipo (safe-11-historico-sos.png) mostra nesta tela:
//   * Lista de alertas (FlatList) com data e hora formatadas
//   * Gatilho de cada alerta (Botão SOS, Falta de check-in, PIN de coação, Agitar)
//   * Cidade e coordenadas aproximadas
//   * Selo de status com cores (Em atendimento = amarelo, Concluído = verde)
//   * Rodapé: "Dados fictícios de teste"
// ============================================================

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';
import { alertas } from '../../../data/alertas';

const CONFIG_GATILHOS = {
  botao: {
    label: 'Botão SOS',
    icone: 'radio-outline',
    corIcone: colors.coral,
  },
  falta_checkin: {
    label: 'Falta de check-in',
    icone: 'time-outline',
    corIcone: '#D97706',
  },
  deslocamento: {
    label: 'Falta de check-in',
    icone: 'time-outline',
    corIcone: '#D97706',
  },
  duress_pin: {
    label: 'PIN de coação',
    icone: 'lock-closed-outline',
    corIcone: '#D97706',
  },
  agitar_celular: {
    label: 'Agitar o celular',
    icone: 'phone-portrait-outline',
    corIcone: '#D97706',
  },
};

function formatarDataHora(isoString) {
  if (!isoString) return '';
  const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  try {
    const data = new Date(isoString);
    const dia = String(data.getUTCDate()).padStart(2, '0');
    const mes = meses[data.getUTCMonth()];
    const horas = String(data.getUTCHours()).padStart(2, '0');
    const minutos = String(data.getUTCMinutes()).padStart(2, '0');
    return `${dia} ${mes}, ${horas}:${minutos}`;
  } catch (e) {
    return isoString;
  }
}

export default function AlertasHistoricoScreen() {
  const renderItem = ({ item }) => {
    const infoGatilho = CONFIG_GATILHOS[item.tipo_gatilho] || {
      label: item.tipo_gatilho,
      icone: 'alert-circle-outline',
      corIcone: colors.coral,
    };

    const isEmAtendimento = item.status_delegacia === 'Em atendimento';

    return (
      <View style={styles.card}>
        {/* Linha 1: Data/Hora e Selo de Status */}
        <View style={styles.cardHeader}>
          <Text style={styles.dataHora}>{formatarDataHora(item.criado_em)}</Text>
          <View
            style={[
              styles.badgeStatus,
              isEmAtendimento ? styles.badgeEmAtendimento : styles.badgeConcluido,
            ]}
          >
            <Text
              style={[
                styles.badgeStatusTexto,
                isEmAtendimento
                  ? styles.badgeTextoEmAtendimento
                  : styles.badgeTextoConcluido,
              ]}
            >
              {item.status_delegacia}
            </Text>
          </View>
        </View>

        {/* Linha 2: Ícone do Gatilho e Nome */}
        <View style={styles.linhaGatilho}>
          <Ionicons
            name={infoGatilho.icone}
            size={18}
            color={infoGatilho.corIcone}
          />
          <Text style={styles.gatilhoTexto}>{infoGatilho.label}</Text>
        </View>

        {/* Linha 3: Localização e Coordenadas */}
        <View style={styles.linhaLocal}>
          <Ionicons name="location-outline" size={14} color={colors.cinza} />
          <Text style={styles.localTexto}>
            {item.endereco_aproximado} · {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
          </Text>
        </View>
      </View>
    );
  };

  const renderFooter = () => (
    <View style={styles.footer}>
      <Text style={styles.footerTexto}>Dados fictícios de teste</Text>
    </View>
  );

  const renderVazio = () => (
    <View style={styles.vazioContainer}>
      <Ionicons name="shield-outline" size={48} color={colors.cinza} />
      <Text style={styles.vazioTexto}>Nenhum alerta registrado no momento.</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={alertas}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderVazio}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.creme,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EFE6DC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dataHora: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.grafite,
  },
  badgeStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeEmAtendimento: {
    backgroundColor: '#FFF4D9',
  },
  badgeConcluido: {
    backgroundColor: '#EAF5E9',
  },
  badgeStatusTexto: {
    fontFamily: fonts.semibold,
    fontSize: 12,
  },
  badgeTextoEmAtendimento: {
    color: '#9A6700',
  },
  badgeTextoConcluido: {
    color: colors.verdeProfundo,
  },
  linhaGatilho: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  gatilhoTexto: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.grafite,
  },
  linhaLocal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  localTexto: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.grafite,
    opacity: 0.7,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 18,
  },
  footerTexto: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.cinza,
  },
  vazioContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  vazioTexto: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.cinza,
  },
});