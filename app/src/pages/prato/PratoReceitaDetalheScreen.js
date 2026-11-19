// ============================================================
// TELA 04b: Detalhe da receita
//
// Componente: PratoReceitaDetalheScreen
// Navegação: Stack (push ao tocar numa receita da Tela 04)
// Responsável: Alana Caled
// Entrega: Final (extra da fachada)
//
// O que a tela mostra:
//   * Capa colorida com o ícone, nome, tempo, kcal e porções
//   * Ingredientes e modo de preparo numerados
//   * Botão de favoritar no topo
// Os dados vêm de data/prato.js: são da fachada e não fazem parte do DER.
// ============================================================

import { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { receitas } from '../../data/prato';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';

export default function PratoReceitaDetalheScreen({ navigation, route }) {
    const receita = receitas.find((r) => r.id === route.params?.id);
    const cor = route.params?.cor || colors.verdeFolha;
    const [favorita, setFavorita] = useState(Boolean(route.params?.favorita));

    if (!receita) {
        return (
            <SafeAreaView style={estilos.tela}>
                <Text style={estilos.vazio}>Receita não encontrada.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={estilos.tela} edges={['top']}>
            <ScrollView contentContainerStyle={estilos.conteudo}>

                <View style={estilos.topo}>
                    <Pressable
                        style={estilos.botaoRedondo}
                        onPress={() => navigation.goBack()}
                        accessibilityRole="button"
                        accessibilityLabel="Voltar"
                        hitSlop={6}
                    >
                        <Ionicons name="chevron-back" size={22} color={colors.grafite} />
                    </Pressable>
                    <Pressable
                        style={estilos.botaoRedondo}
                        onPress={() => setFavorita((f) => !f)}
                        accessibilityRole="button"
                        accessibilityLabel={favorita ? 'Remover dos favoritos' : 'Favoritar receita'}
                        hitSlop={6}
                    >
                        <Ionicons
                            name={favorita ? 'heart' : 'heart-outline'}
                            size={22}
                            color={favorita ? colors.coral : colors.grafite}
                        />
                    </Pressable>
                </View>

                <View style={[estilos.capa, { backgroundColor: cor }]}>
                    <Ionicons name="restaurant" size={64} color={colors.branco} />
                </View>

                <Text style={estilos.categoria}>{receita.categoria}</Text>
                <Text style={estilos.titulo}>{receita.nome}</Text>

                <View style={estilos.resumo}>
                    <View style={estilos.resumoItem}>
                        <Ionicons name="time-outline" size={18} color={colors.verdeProfundo} />
                        <Text style={estilos.resumoValor}>{receita.tempoMin} min</Text>
                        <Text style={estilos.resumoRotulo}>preparo</Text>
                    </View>
                    <View style={estilos.resumoDivisor} />
                    <View style={estilos.resumoItem}>
                        <Ionicons name="flame-outline" size={18} color={colors.verdeProfundo} />
                        <Text style={estilos.resumoValor}>{receita.kcal} kcal</Text>
                        <Text style={estilos.resumoRotulo}>por porção</Text>
                    </View>
                    <View style={estilos.resumoDivisor} />
                    <View style={estilos.resumoItem}>
                        <Ionicons name="people-outline" size={18} color={colors.verdeProfundo} />
                        <Text style={estilos.resumoValor}>{receita.porcoes}</Text>
                        <Text style={estilos.resumoRotulo}>{receita.porcoes === 1 ? 'porção' : 'porções'}</Text>
                    </View>
                </View>

                <Text style={estilos.secao}>Ingredientes</Text>
                {receita.ingredientes.map((item) => (
                    <View key={item} style={estilos.ingrediente}>
                        <View style={estilos.marcador} />
                        <Text style={estilos.texto}>{item}</Text>
                    </View>
                ))}

                <Text style={estilos.secao}>Modo de preparo</Text>
                {receita.passos.map((passo, i) => (
                    <View key={passo} style={estilos.passo}>
                        <View style={estilos.numero}>
                            <Text style={estilos.numeroTexto}>{i + 1}</Text>
                        </View>
                        <Text style={[estilos.texto, estilos.passoTexto]}>{passo}</Text>
                    </View>
                ))}

            </ScrollView>
        </SafeAreaView>
    );
}

const estilos = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: colors.creme,
    },

    conteudo: {
        padding: 20,
        paddingBottom: 40,
    },

    topo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },

    botaoRedondo: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.branco,
        borderWidth: 1,
        borderColor: colors.begeDivisor,
        alignItems: 'center',
        justifyContent: 'center',
    },

    capa: {
        height: 180,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },

    categoria: {
        fontFamily: fonts.medium,
        fontSize: 13,
        color: colors.verdeProfundo,
    },

    titulo: {
        fontFamily: fonts.bold,
        fontSize: 24,
        color: colors.grafite,
        marginTop: 2,
    },

    resumo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.branco,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.pessegoClaro,
        paddingVertical: 14,
        marginTop: 16,
    },

    resumoItem: {
        flex: 1,
        alignItems: 'center',
        gap: 2,
    },

    resumoDivisor: {
        width: 1,
        height: 36,
        backgroundColor: colors.pessegoClaro,
    },

    resumoValor: {
        fontFamily: fonts.semibold,
        fontSize: 14,
        color: colors.grafite,
    },

    resumoRotulo: {
        fontFamily: fonts.regular,
        fontSize: 12,
        color: colors.cinza,
    },

    secao: {
        fontFamily: fonts.bold,
        fontSize: 17,
        color: colors.grafite,
        marginTop: 24,
        marginBottom: 10,
    },

    ingrediente: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 6,
    },

    marcador: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.verdeFolha,
    },

    texto: {
        fontFamily: fonts.regular,
        fontSize: 15,
        color: colors.grafite,
        lineHeight: 22,
    },

    passo: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        paddingVertical: 8,
    },

    numero: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: colors.pessegoClaro,
        alignItems: 'center',
        justifyContent: 'center',
    },

    numeroTexto: {
        fontFamily: fonts.semibold,
        fontSize: 13,
        color: colors.grafite,
    },

    passoTexto: {
        flex: 1,
    },

    vazio: {
        fontFamily: fonts.regular,
        fontSize: 14,
        color: colors.cinza,
        textAlign: 'center',
        marginTop: 40,
    },
});
