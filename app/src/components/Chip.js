// ============================================================
// Chip: botão de filtro ou opção selecionável (refeições, prioridade, tipo de violência, tempo estimado).
// Usado por todo o grupo. Cores em theme/colors.js.
// ============================================================

import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

export default function Chip({ titulo, ativo = false, onPress, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, ativo && styles.chipAtivo, style]}
    >
      <Text style={[styles.texto, ativo && styles.textoAtivo]}>{titulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.pessegoClaro,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
  },
  chipAtivo: {
    backgroundColor: colors.pessegoClaro,
    borderColor: colors.pessegoPastel,
  },
  texto: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.grafite,
  },
  textoAtivo: {
    fontFamily: fonts.semibold,
  },
});