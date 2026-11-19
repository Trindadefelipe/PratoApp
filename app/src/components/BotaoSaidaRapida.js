// ============================================================
// BotaoSaidaRapida: botão de saída rápida camuflado de "salvar rascunho",
// presente em todas as telas da área protegida SAFE (protótipo da Entrega 1).
// Círculo branco com ícone de documento no canto inferior esquerdo,
// logo acima da barra de abas. Fica no SafeTabs, então aparece em todas as telas.
//
// Ao tocar:
//   * Executa navigation.reset para PratoTabs, limpando o SAFE do histórico.
//   * O botão "Voltar" do Android jamais reabre o SAFE.
//   * Formulários abertos são descartados de imediato, sem diálogo de confirmação.
//   * Sem texto: só o ícone, para não chamar atenção.
//
// Responsável: Felipe Trindade (Issue #77); visual ajustado ao protótipo por Alana Caled
// ============================================================

import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { ALTURA_BARRA_ABAS } from '../routes/OpcoesTabs';

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
        { bottom: ALTURA_BARRA_ABAS + insets.bottom + 24 },
        pressed && styles.botaoPressionado,
      ]}
      onPress={handleSaidaRapida}
      accessibilityRole="button"
      accessibilityLabel="Salvar rascunho"
      hitSlop={8}
    >
      <Ionicons name="document-text-outline" size={22} color={colors.grafite} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    position: 'absolute',
    left: 20,
    zIndex: 9999,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.branco,
    borderWidth: 1,
    borderColor: colors.begeDivisor,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: colors.preto,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  botaoPressionado: {
    opacity: 0.7,
    transform: [{ scale: 0.96 }],
  },
});
