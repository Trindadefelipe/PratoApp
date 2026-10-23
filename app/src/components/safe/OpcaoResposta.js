// ============================================================
// OpcaoResposta: cartão de uma opção de resposta, com círculo de seleção.
// Usado na Tela 16 (Autoavaliação). Recebe os dados por props.
//   * texto: o texto da opção (ex.: "Às vezes")
//   * selecionada: se é a opção marcada
//   * onPress: o que acontece ao tocar no cartão
// ============================================================

import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';

export default function OpcaoResposta({texto, selecionada, onPress}){
    return(
        <Pressable
            style={[estilos.cartao, selecionada && estilos.cartaoSelecionado]}
            onPress={onPress}
        >
            <View style={[estilos.circulo, selecionada && estilos.circuloSelecionado]}>
                {selecionada && <View style={estilos.ponto}/>}
            </View>
            <Text style={[estilos.texto, selecionada && estilos.textoSelecionado]}>{texto}</Text>
        </Pressable>
    )
}

const estilos = StyleSheet.create({
    cartao: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        backgroundColor: colors.branco,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.begeCard,
        paddingHorizontal: 16,
        height: 56,
        marginBottom: 12,
    },

    cartaoSelecionado: {
        backgroundColor: colors.pessegoSuave,
        borderColor: colors.pessegoPastel,
    },

    circulo: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.begeDivisor,
        alignItems: 'center',
        justifyContent: 'center',
    },

    circuloSelecionado: {
        borderColor: colors.verdeProfundo,
        backgroundColor: colors.verdeProfundo,
    },

    ponto: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.branco,
    },

    texto: {
        fontFamily: fonts.regular,
        fontSize: 16,
        color: colors.grafite,
    },

    textoSelecionado: {
        fontFamily: fonts.bold,
    },
})