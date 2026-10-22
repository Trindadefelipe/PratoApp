// ============================================================
// TELA 01: Diário de hoje
//
// Componente: PratoHomeScreen
// Navegação: Tab (aba Diário), tela inicial do app
// Responsável: Alana Caled
// Entrega: 2 (24/10)
//
// O que o protótipo (Entrega 1, seção 4) mostra nesta tela:
//   * Data do dia e logotipo do prato (toque longo de 2s abre o SAFE)
//   * Campo de busca de alimento
//   * Anel de calorias: kcal restantes e consumidas em relação à meta
//   * Lista de refeições: café da manhã, almoço, lanche e jantar
//   * Contador de copos de água
// ============================================================

import { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import BotaoPrimario from '../../components/BotaoPrimario';
import AnelCalorias from '../../components/prato/AnelCalorias';
import { refeicoes, metas } from '../../data/prato';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';

const DIAS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

const corRefeicao = {
  1: { fundo: colors.verdeFolha,    icone: colors.branco },
  2: { fundo: colors.verdeProfundo, icone: colors.branco },
  3: { fundo: colors.amarelo,       icone: colors.grafite },
  4: { fundo: colors.pessegoPastel, icone: colors.grafite },
};

function dataDeHoje(){
    const hoje = new Date();

    return `${DIAS[hoje.getDay()]}, ${hoje.getDate()} de ${MESES[hoje.getMonth()]}`;
}

export default function PratoHomeScreen({navigation}){
    const [copos, setCopos] = useState(metas.aguaCopos);

    const fatias = refeicoes
        .filter((r) => r.registrada)
        .map((r) => ({kcal: r.kcal, cor: corRefeicao[r.id].fundo}));

    return(
        <SafeAreaView style={estilos.tela} edges={['top']}>

            <ScrollView contentContainerStyle={estilos.conteudo}>

                <View style={estilos.cabecalho}>
                    <View style = {estilos.logo}>
                        <Image source={require('../../assets/Logo/logo.png')} style = {estilos.logoImagem}/>
                    </View>
                    <View>
                        <Text style={estilos.data}>{dataDeHoje()}</Text>
                        <Text style={estilos.titulo}>Diário de hoje</Text>
                    </View>
                </View>

                <View style={estilos.busca}>
                    <Ionicons name='search-outline' size={20} color={colors.cinza}/>
                    <TextInput
                        style={estilos.buscaInput}
                        placeholder='Buscar alimento'
                        placeholderTextColor={colors.cinza}
                    />
                </View>

                <AnelCalorias fatias={fatias} meta={metas.calorias}/>
                {refeicoes.map((refeicao) => (
                    <View key={refeicao.id} style={estilos.refeicao}>
                        <View style={[estilos.refeicaoIcone, { backgroundColor: corRefeicao[refeicao.id].fundo }]}>
                            <Ionicons name='restaurant' size={22} color={corRefeicao[refeicao.id].icone} />
                        </View>
                        <View style={estilos.refeicaoInfo}>
                            <Text style={estilos.refeicaoNome}>{refeicao.nome} </Text>
                            <Text style={estilos.refeicaoDescricao} numberOfLines={1}>{refeicao.descricao}</Text>
                        </View>
                        {refeicao.registrada ? (
                            <Text style={estilos.kcal}>
                                <Text style={estilos.kcalNumero}> 
                                    {refeicao.kcal} 
                                </Text>
                                {' '}kcal
                            </Text>
                        ) : (
                            <Pressable style={estilos.botaoMais}>
                                <Ionicons name='add' size={22} color={colors.grafite}/> 
                            </Pressable>
                        )}
                    </View>
                ))}

                <View style={estilos.agua}>
                    <View> 
                        <Text style={estilos.refeicaoNome}>Água</Text>
                        <Text style={estilos.refeicaoDescricao}>{copos} de {metas.aguaMetaCopos} copos</Text>
                    </View>

                    <View style={estilos.gotas}>
                        {Array.from({ length: metas.aguaMetaCopos }, (_, i) => (
                        <Pressable key={i} hitSlop={4} onPress={() => setCopos(i + 1 === copos ? i : i + 1)}>
                            <Ionicons
                                name={i < copos ? 'water' : 'water-outline'}
                                size={20}
                                color={colors.agua}
                                style={i < copos ? null : estilos.gotaVazia}
                            />
                        </Pressable>
                        ))}
                    </View>
                </View>

                {/* Provisório: removido quando o gatilho do PIN ficar pronto (#37) */}
                <BotaoPrimario
                titulo="Entrar no SAFE (teste)"
                variante="secundario"
                style={{ marginTop: 24 }}
                onPress={() => navigation.reset({ index: 0, routes: [{ name: 'SafeTabs' }] })}
                />

            </ScrollView>

        </SafeAreaView>
        
    )
}

const estilos = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: colors.creme,
    },

    conteudo: {
        padding: 20,
        paddingBottom: 32,
    },

    cabecalho: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },

    logo: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: colors.branco,
        alignItems: 'center',
        justifyContent: 'center',
    },

    logoImagem: {
        width: 44,
        height: 44,
        resizeMode: 'contain',
    },

    data: { 
        fontFamily: fonts.regular, 
        fontSize: 14, 
        color: colors.cinza 
    },

    titulo: { 
        fontFamily: fonts.bold, 
        fontSize: 26, 
        color: colors.grafite 
    },

    busca: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.branco,
        paddingHorizontal: 16,
        height: 52,
        gap: 10,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.pessegoClaro,
    }, 
    buscaInput:{
        flex: 1,
        fontFamily: fonts.regular,
        fontSize: 15,
        color: colors.grafite,
    },

    refeicao: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 12,
        borderBottomWidth: 1, 
        borderBottomColor: colors.pessegoClaro
    },

    refeicaoInfo: {
        flex: 1
    },

    refeicaoNome: {
        fontFamily: fonts.bold,
        fontSize: 15,
        color: colors.grafite
    },

    refeicaoDescricao: {
        fontFamily: fonts.regular,
        fontSize: 13,
        color: colors.cinza
    },

    refeicaoIcone: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },

    kcal: {
        fontFamily: fonts.regular,
        fontSize: 13,
        color: colors.grafite,
    },

    kcalNumero: {
        fontFamily: fonts.bold,
        fontSize: 15,
    }, 

    botaoMais: {
        width: 40,
        height: 40,
        backgroundColor: colors.pessegoClaro,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },

    agua: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingVertical: 16
    },

    gotas: {
        flexDirection: 'row',
        gap: 4
    },

    gotaVazia: {
        opacity: 0.4
    }

})
