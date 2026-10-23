// ============================================================
// LinhaSwitch: linha com título, descrição e um switch de liga e desliga.
// Usado na Tela 14 (Camuflagem). Recebe os dados por props.
//   * titulo e descricao: textos da linha
//   * valor: se o switch está ligado
//   * onAlterar: recebe o novo valor (true ou false) ao tocar
// ============================================================


import { View, Text, Switch, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';

export default function LinhaSwitch({titulo, descricao, valor, onAlterar}){
    return(
        <View style={estilos.linha}>
            <View style={estilos.textos}>
                <Text style={estilos.titulo}>{titulo}</Text>
                <Text style={estilos.descricao}>{descricao}</Text>
            </View>
            <Switch
                value={valor}
                onValueChange={onAlterar}
                trackColor={{false: colors.begeDivisor, true: colors.verdeProfundo}}
                thumbColor={colors.branco}
                ios_backgroundColor={colors.begeDivisor}
            />
        </View>
    )
}

const estilos = StyleSheet.create({
    linha: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: colors.pessegoClaro,
    },

    textos: {
        flex: 1,
    },

    titulo: {
        fontFamily: fonts.medium,
        fontSize: 16,
        color: colors.grafite,
    },

    descricao: {
        fontFamily: fonts.regular,
        fontSize: 13,
        color: colors.cinza,
    },
})