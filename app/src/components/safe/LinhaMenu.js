// ============================================================
// LinhaMenu: linha clicável com ícone, título, descrição e seta.
// Usado na Tela 13 (Ajustes). Recebe os dados por props.
//   * icone: nome do ícone do Ionicons (ex.: 'key-outline')
//   * titulo: texto principal
//   * descricao: texto menor embaixo
//   * onPress: o que acontece ao tocar na linha
// ============================================================
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';

export default function LinhaMenu({icone, titulo, descricao, onPress}){
    return(
        <Pressable
            style={({pressed}) => [estilos.linha, pressed && estilos.linhaPressionada]}
            onPress={onPress}
        >
            <View style={estilos.icone}>
                <Ionicons name={icone} size={22} color={colors.coral}/>
            </View>

            <View style={estilos.textos}>
                <Text style={estilos.titulo}>{titulo}</Text>
                <Text style={estilos.descricao}>{descricao}</Text>
            </View>

            <Ionicons name='chevron-forward' size={20} color={colors.grafite}/>
        </Pressable>
    )
}

const estilos = StyleSheet.create({
    linha: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: colors.pessegoClaro,
    },

    linhaPressionada: {
        opacity: 0.7,
    },

    icone: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: colors.pessegoSuave,
        alignItems: 'center',
        justifyContent: 'center',
    },

    textos: {
        flex: 1,
    },

    titulo: {
        fontFamily: fonts.medium,
        fontSize: 15,
        color: colors.grafite,
    },

    descricao: {
        fontFamily: fonts.regular,
        fontSize: 13,
        color: colors.cinza,
    },
})