// ============================================================
// LinhaObjetivo: linha de "Seus objetivos" com ícone, título, valor e botões de menos e mais.
// Usado na Tela 02 (Metas). Recebe os dados por props.
//   * icone: o ícone já montado (ex.: <Ionicons name="water-outline" ... />)
//   * titulo: texto da linha (ex.: "Peso atual")
//   * valor: valor já formatado (ex.: "62,4 kg")
//   * onMenos e onMais: o que acontece ao tocar em cada botão
// ============================================================
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';

export default function LinhaObjetivo({icone, titulo, valor, onMenos, onMais}){
    return(
        <View style={estilos.objetivo}>
            <View style={estilos.objetivoIcone}>{icone}</View>
            <Text style={estilos.objetivoTitulo}>{titulo}</Text>
            <Text style={estilos.objetivoValor}>{valor}</Text>
            <Pressable style={estilos.passo} onPress={onMenos} hitSlop={4}>
                <Ionicons name='remove' size={18} color={colors.grafite}/>
            </Pressable>
            <Pressable style={estilos.passo} onPress={onMais} hitSlop={4}>
                <Ionicons name='add' size={18} color={colors.grafite}/>
            </Pressable>
        </View>
    );
}

const estilos = StyleSheet.create({
    objetivo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.pessegoClaro,
    },

    objetivoIcone: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: colors.verdeClaro,
        alignItems: 'center',
        justifyContent: 'center',
    },

    objetivoTitulo: {
        flex: 1,
        fontFamily: fonts.regular,
        fontSize: 15,
        color: colors.grafite,
    },

    objetivoValor: {
        fontFamily: fonts.bold,
        fontSize: 15,
        color: colors.grafite,
        marginRight: 4,
    },

    passo: {
        width: 36,
        height: 36,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.pessegoClaro,
        backgroundColor: colors.branco,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
