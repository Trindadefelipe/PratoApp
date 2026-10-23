// ============================================================
// CabecalhoTela: topo de tela aberta por push, com botão de voltar e título.
// Usado na Tela 14 (Camuflagem). Recebe os dados por props.
//   * titulo: texto do topo
//   * onVoltar: o que acontece ao tocar na seta (normalmente navigation.goBack)
// ============================================================

import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';

export default function CabecalhoTela({titulo, onVoltar}){
    return(
        <View style={estilos.topo}>
            <Pressable 
                style={({pressed}) => [estilos.voltar, pressed && estilos.voltarPressionado]}
                onPress={onVoltar}
                hitSlop={6}
            >
                <Ionicons name='chevron-back' size={22} color={colors.grafite}/>
            </Pressable>

            <Text style={estilos.titulo}>{titulo}</Text>
        </View>
    )
}

const estilos = StyleSheet.create({
     topo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 12,
    },

    voltar: {
        width: 44,
        height: 44,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.begeDivisor,
        backgroundColor: colors.branco,
        alignItems: 'center',
        justifyContent: 'center',
    },

    voltarPressionado: {
        opacity: 0.7,
    },

    titulo: {
        fontFamily: fonts.bold,
        fontSize: 26,
        color: colors.grafite,
    },
})