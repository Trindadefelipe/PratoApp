// ============================================================
// SeletorNivel: barra com marcador para escolher uma entre poucas opções.
// Usado na Tela 14 (sensibilidade do gesto). Recebe os dados por props.
//   * opcoes: lista de textos (ex.: ['Baixa', 'Média', 'Alta'])
//   * valor: a opção escolhida
//   * onAlterar: recebe a opção tocada
// ============================================================

import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';

export default function SeletorNivel({opcoes, valor, onAlterar}){
    const posicao = (opcoes.indexOf(valor) / (opcoes.length - 1)) * 100;

    return(
        <View>
            <View style={estilos.trilho}>
                <View style={[estilos.preenchido, {width: `${posicao}%`}]}/>
                <View style={[estilos.marcador, {left: `${posicao}%`}]}/>

                <View style={estilos.areas}>
                    {opcoes.map((opcao) => (
                        <Pressable key={opcao} style={estilos.area} onPress={() => onAlterar(opcao)}/>
                    ))}
                </View>
            </View>

            <View style={estilos.rotulos}>
                {opcoes.map((opcao) => (
                    <Pressable key={opcao} onPress={() => onAlterar(opcao)} hitSlop={8}>
                        <Text style={[estilos.rotulo, opcao === valor && estilos.rotuloAtivo]}>{opcao}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
    )
}

const estilos = StyleSheet.create({
    trilho: {
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.pessegoClaro,
        marginTop: 20,
    },

    preenchido: {
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.pessegoPastel,
    },

    marcador: {
        position: 'absolute',
        top: -11,
        width: 28,
        height: 28,
        marginLeft: -14,
        borderRadius: 14,
        borderWidth: 3,
        borderColor: colors.pessegoPastel,
        backgroundColor: colors.branco,
    },

    areas: {
        position: 'absolute',
        top: -16,
        bottom: -16,
        left: 0,
        right: 0,
        flexDirection: 'row',
    },

    area: {
        flex: 1,
    },

    rotulos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },

    rotulo: {
        fontFamily: fonts.regular,
        fontSize: 14,
        color: colors.cinza,
    },

    rotuloAtivo: {
        fontFamily: fonts.bold,
        color: colors.grafite,
    },
})