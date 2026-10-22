// ============================================================
// ErroDados: estado de erro simulado da Tela 03.
// Aparece no lugar das Metas quando a usuária digita o PIN de coação.
//   * onTentarNovamente: o que acontece ao tocar em "Tentar novamente"
// ============================================================

import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import BotaoPrimario from '../BotaoPrimario';


export default function ErroDados({onTentarNovamente}){
    return(
        <View style={estilos.erro}>
            <View style={estilos.erroCirculo}>
                <Ionicons name='cloud-offline-outline' size={44} color={colors.coral}/>
            </View>
            <Text style={estilos.erroTitulo}>
                Não foi possível carregar seus dados nutricionais
            </Text>
            <Text style={estilos.erroTexto}>
                Verifique sua conexão e tente novamente mais tarde.
            </Text>

            <BotaoPrimario titulo='Tentar novamente' onPress={onTentarNovamente} style={estilos.erroBotao}
            />
        </View>
    )
}

const estilos = StyleSheet.create({
    erro: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
    },

    erroCirculo: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: colors.pessegoClaro,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },

    erroTitulo: {
        fontFamily: fonts.bold,
        fontSize: 20,
        color: colors.grafite,
        textAlign: 'center',
    },

    erroTexto: {
        fontFamily: fonts.regular,
        fontSize: 15,
        color: colors.cinza,
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 24,
    },

    erroBotao: {
        alignSelf: 'stretch',
    },
})