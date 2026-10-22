// ============================================================
// TELA 04: Receitas rápidas
//
// Componente: PratoReceitasScreen
// Navegação: Tab (aba Receitas)
// Responsável: Alana Caled
// Entrega: 2 (24/10)
//
// O que o protótipo (Entrega 1, seção 4) mostra nesta tela:
//   * Chips de filtro: Todas, Café da manhã, Almoço, Jantar
//   * Lista de receitas com tempo de preparo, kcal e botão de favoritar
// ============================================================

import { useState } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Chip from '../../components/Chip';
import CartaoReceita from '../../components/prato/CartaoReceita';
import { receitas } from '../../data/prato';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';

const FILTROS = ['Todas', 'Café da manhã', 'Almoço', 'Jantar'];

const CORES_CARTAO = [colors.verdeFolha, colors.amarelo, colors.pessegoPastel, colors.coral, colors.verdeProfundo];

export default function PratoReceitasScreen(){
    const [filtro, setFiltro]       = useState('Todas');
    const [favoritas, setFavoritas] = useState(
        receitas.filter((r) => r.favorita).map((r) => r.id)
    );

    const lista = filtro === 'Todas'
        ? receitas
        : receitas.filter((r) => r.categoria === filtro);

    function alternarFavorita(id){
        setFavoritas((atual) =>
            atual.includes(id) ? atual.filter((f) => f !== id) : [...atual, id]
        );
    }

    return(
        <SafeAreaView style={estilos.tela} edges={['top']}>
            <FlatList
                data={lista}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={estilos.conteudo}
                ListHeaderComponent={
                    <View>
                        <Text style={estilos.subtitulo}>
                            Ideias leves para o dia
                        </Text>

                        <Text style={estilos.titulo}>
                            Receitas rápidas
                        </Text>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={estilos.filtros}
                        >
                            {FILTROS.map((f) => (
                                <Chip key={f} titulo={f} ativo={filtro === f} onPress={() => setFiltro(f)}/>
                            ))}

                        </ScrollView>
                    </View>
                }

                renderItem={({item}) => (
                    <CartaoReceita
                        receita={item}
                        cor={CORES_CARTAO[(item.id - 1) % CORES_CARTAO.length]}
                        favorita={favoritas.includes(item.id)}
                        onFavoritar={() => alternarFavorita(item.id)}
                    />
                )}
                ListEmptyComponent={
                    <Text style={estilos.vazio}>Nenhuma receita nesta categoria.</Text>
                }
            />
        </SafeAreaView>
    )
}

const estilos = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: colors.creme,
    }, 

    conteudo: {
        flexGrow: 1,
        padding: 20,
        paddingBottom: 32,
    },

    subtitulo: {
        fontFamily: fonts.regular,
        fontSize: 14,
        color: colors.cinza,
    },

    titulo: {
        fontFamily: fonts.bold,
        fontSize: 26,
        color: colors.grafite
    },

    filtros: {
        marginTop: 16,
        marginBottom: 20,
        marginHorizontal: -20, 
        paddingHorizontal: 20,
    },
    
    vazio: {
        fontFamily: fonts.regular,
        fontSize: 14,
        color: colors.cinza,
        textAlign: 'center',
        marginTop: 24,
    },
})
