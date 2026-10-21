// ============================================================
// OpcoesTabs: visual comum das barras de abas (PratoTabs e SafeTabs).
// Pílula pêssego em volta do ícone ativo e texto verde em semibold.
// ============================================================
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

export function criarOpcoesTabs(icones, insets) {
  return ({ route }) => ({
    headerShown: false,
    tabBarActiveTintColor: colors.verdeProfundo,
    tabBarInactiveTintColor: colors.cinza,
    tabBarStyle: {
      height: 68 + insets.bottom,
      paddingTop: 8,
      paddingBottom: 8 + insets.bottom,
      backgroundColor: '#FFFFFF',
      borderTopWidth: 1,
      borderTopColor: colors.pessegoClaro,
    },
    tabBarIcon: ({ focused, color }) => (
      <View style={[styles.pilula, focused && styles.pilulaAtiva]}>
        <Ionicons
          name={focused ? icones[route.name].ativo : icones[route.name].inativo}
          size={20}
          color={color}
        />
      </View>
    ),
    tabBarLabel: ({ focused, color, children }) => (
      <Text style={[styles.texto, { color }, focused && styles.textoAtivo]}>
        {children}
      </Text>
    ),
  });
}

const styles = StyleSheet.create({
  pilula: {
    width: 44,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pilulaAtiva: {
    backgroundColor: colors.pessegoClaro,
  },
  texto: {
    fontFamily: fonts.medium,
    fontSize: 11,
    marginTop: 2,
  },
  textoAtivo: {
    fontFamily: fonts.semibold,
  },
});