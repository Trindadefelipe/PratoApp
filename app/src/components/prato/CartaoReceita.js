// ============================================================
// CartaoReceita: uma receita da lista da Tela 04 (Receitas).
// Recebe os dados por props.
//   * receita: { nome, tempoMin, kcal }
//   * cor: cor do quadrado com o ícone
//   * favorita: se o coração aparece preenchido
//   * onFavoritar: o que acontece ao tocar no coração
//   * onAbrir: o que acontece ao tocar na receita (abre o detalhe)
// ============================================================

import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { colors } from "../../theme/colors";
import { fonts } from "../../theme/fonts";



export default function CartaoReceita({receita, cor, favorita, onFavoritar, onAbrir}){
    return(
        <View style={estilos.cartao}>
            <Pressable
                style={({pressed}) => [estilos.abrir, pressed && estilos.pressionado]}
                onPress={onAbrir}
                accessibilityRole="button"
                accessibilityLabel={`Abrir receita ${receita.nome}`}
            >
            <View style={[estilos.imagem, {backgroundColor: cor}]}>
                <Ionicons name="restaurant" size={34} color={colors.branco}/> 
            </View>

            <View style={estilos.info}>
                <Text style={estilos.nome} numberOfLines={2}>
                    {receita.nome}
                </Text>
                <View style={estilos.detalhes}>
                    <View style={estilos.detalhe}>
                        <Ionicons name='time-outline' size={15} color={colors.cinza}/>
                        <Text style={estilos.detalheTexto}>{receita.tempoMin} min</Text>
                    </View>
                    <View style={estilos.detalhe}>
                        <Ionicons name='flame-outline' size={15} color={colors.cinza}/>
                        <Text style={estilos.detalheTexto}>{receita.kcal} kcal</Text>
                    </View>
                </View>
            </View>
            </Pressable>

            <Pressable
                onPress={onFavoritar}
                hitSlop={10}
                accessibilityRole="button"
                accessibilityLabel={favorita ? 'Remover dos favoritos' : 'Favoritar receita'}
            >
                <Ionicons
                    name={favorita ? 'heart' : 'heart-outline'}
                    size={24}
                    color={favorita ? colors.coral : colors.cinza}
                />
            </Pressable>
        </View>
    )
}

const estilos = StyleSheet.create({
    cartao: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        marginBottom: 16,
    },

    abrir: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
    },

    pressionado: {
        opacity: 0.7,
    },

    imagem: {
        width: 92,
        height: 92,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },

    info: {
        flex: 1,
    },

    nome: {
        fontFamily: fonts.bold,
        fontSize: 16,
        color: colors.grafite,
    },

    detalhes: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 6,
    },

    detalhe: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },

    detalheTexto: {
        fontFamily: fonts.regular,
        fontSize: 13,
        color: colors.cinza,
    },
})