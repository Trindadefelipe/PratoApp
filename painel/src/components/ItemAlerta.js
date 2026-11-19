// ============================================================
// ItemAlerta: um cartão da lista de alertas (coluna da esquerda).
//   * alerta, ativo (selecionado), agora (para o "Agora"), onPress
// ============================================================
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { infoStatus, infoGatilho, quando, endereco } from '../formatos';

export function SeloStatus({ status, grande = false }) {
  const s = infoStatus(status);
  return (
    <View style={[estilos.selo, grande && estilos.seloGrande, { backgroundColor: s.fundo }]}>
      <Text style={[estilos.seloTexto, grande && estilos.seloTextoGrande, { color: s.texto }]}>{s.rotulo}</Text>
    </View>
  );
}

export default function ItemAlerta({ alerta, ativo, agora, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: ativo }}
      style={({ pressed, hovered }) => [
        estilos.cartao,
        hovered && !ativo && estilos.cartaoHover,
        ativo && estilos.cartaoAtivo,
        pressed && estilos.cartaoPressionado,
      ]}
    >
      <View style={estilos.linha}>
        <Text style={estilos.quando}>{quando(alerta.criado_em, agora)}</Text>
        <SeloStatus status={alerta.status_delegacia} />
      </View>
      <Text style={estilos.gatilho}>{infoGatilho(alerta.tipo_gatilho).curto}</Text>
      <Text style={estilos.endereco} numberOfLines={1}>{endereco(alerta)}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    backgroundColor: colors.branco,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: colors.begeDivisor,
    paddingVertical: 14,
    paddingHorizontal: 18,
    gap: 4,
    cursor: 'pointer',
  },
  cartaoHover: {
    borderColor: colors.pessegoClaro,
  },
  cartaoAtivo: {
    borderColor: colors.pessegoPastel,
    borderWidth: 2.5,
  },
  cartaoPressionado: {
    opacity: 0.85,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  quando: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.grafite,
  },
  gatilho: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.grafite,
    marginTop: 4,
  },
  endereco: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.cinzaEscuro,
  },
  selo: {
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  seloGrande: {
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  seloTexto: {
    fontFamily: fonts.semibold,
    fontSize: 12,
  },
  seloTextoGrande: {
    fontSize: 13,
  },
});
