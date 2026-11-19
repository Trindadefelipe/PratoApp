// ============================================================
// BotaoSaidaRapida: botão de saída rápida camuflado com ícone e texto
// de "salvar rascunho", presente em todas as telas da área protegida SAFE.
//
// Ao tocar:
//   * Executa navigation.reset para PratoTabs, limpando o SAFE do histórico.
//   * O botão "Voltar" do Android jamais reabre o SAFE.
//   * Formulários abertos são descartados de imediato, sem diálogo de confirmação.
//   * Visual camuflado de culinária para não levantar suspeitas do agressor.
//
// Responsável: Felipe Trindade (Issue #77)
// ============================================================

import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

export default function BotaoSaidaRapida() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleSaidaRapida = () => {
    // Descarte imediato e reset para o Pratô, limpando o SAFE do histórico de navegação
    try {
      const parent = navigation.getParent();
      if (parent && parent.reset) {
        parent.reset({
          index: 0,
          routes: [{ name: 'PratoTabs' }],
        });
        return;
      }
    } catch {
      // fallback caso getParent não esteja acessível
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'PratoTabs' }],
    });
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.botao,
        { top: insets.top + 8 },
        pressed && styles.botaoPressionado,
      ]}
      onPress={handleSaidaRapida}
      accessibilityRole="button"
      accessibilityLabel="Salvar rascunho"
      hitSlop={8}
    >
      <Ionicons name="bookmark-outline" size={14} color={colors.grafite} style={styles.icone} />
      <Text style={styles.texto}>Salvar rascunho</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    position: 'absolute',
    right: 16,
    zIndex: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.branco,
    borderWidth: 1,
    borderColor: colors.begeDivisor,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    elevation: 4,
    shadowColor: colors.preto,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  botaoPressionado: {
    opacity: 0.7,
    transform: [{ scale: 0.96 }],
  },
  icone: {
    marginRight: 4,
  },
  texto: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.grafite,
  },
});
