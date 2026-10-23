// ============================================================
// TELA 16: Autoavaliação de risco
//
// Componente: AutoavaliacaoScreen
// Navegação: Stack (push a partir do Início)
// Responsável: Alana Caled (indicador de risco: João Pedro e Higor Bueno na Entrega 4)
// Entrega: 2 (24/10)
//
// O que o protótipo (Entrega 1, seção 4) mostra nesta tela:
//   * Barra de progresso (pergunta X de 8)
//   * Pergunta com opções de resposta: Nunca, Às vezes, Com frequência, Quase sempre
//   * Botões Voltar e Próxima, aviso de estimativa acadêmica
// ============================================================

import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BotaoPrimario from '../../../components/BotaoPrimario';
import CabecalhoTela from '../../../components/safe/CabecalhoTela';
import OpcaoResposta from '../../../components/safe/OpcaoResposta';
import { perguntas, opcoes } from '../../../data/autoavaliacao';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';

export default function AutoavaliacaoScreen({navigation}){
    const [indice, setIndice]       = useState(0);
    const [respostas, setRespostas] = useState(Array(perguntas.length).fill(null));

    const numero        = indice + 1;
    const total         = perguntas.length;
    const progresso     = Math.round((numero / total) * 100);
    const respostaAtual = respostas[indice];
    const ultima        = numero === total;

    function responder(valor){
        setRespostas((atual) => atual.map((r, i) => (i === indice ? valor : r)));
    }

    function proxima(){
        if (ultima){
            navigation.navigate('ResultadoRisco', { respostas });
            return;
        }
        setIndice(indice + 1);
    }

    function voltar(){
        if (indice === 0){
            navigation.goBack();
            return;
        }
        setIndice(indice - 1);
    }

    return(
        <SafeAreaView style={estilos.tela} edges={['top']}>
            <ScrollView contentContainerStyle={estilos.conteudo}>

                <CabecalhoTela titulo='Autoavaliação' onVoltar={() => navigation.goBack()}/>

                <View style={estilos.progressoTextos}>
                    <Text style={estilos.progressoTexto}>Pergunta {numero} de {total}</Text>
                    <Text style={estilos.progressoTexto}>{progresso}%</Text>
                </View>
                <View style={estilos.barra}>
                    <View style={[estilos.barraPreenchida, {width: `${progresso}%`}]}/>
                </View>

                <Text style={estilos.pergunta}>{perguntas[indice]}</Text>

                {opcoes.map((opcao) => (
                    <OpcaoResposta
                        key={opcao.valor}
                        texto={opcao.texto}
                        selecionada={respostaAtual === opcao.valor}
                        onPress={() => responder(opcao.valor)}
                    />
                ))}

                <View style={estilos.botoes}>
                    <BotaoPrimario
                        titulo='Voltar'
                        variante='secundario'
                        onPress={voltar}
                        style={estilos.botaoVoltar}
                    />
                    <BotaoPrimario
                        titulo={ultima ? 'Ver resultado' : 'Próxima'}
                        onPress={proxima}
                        desativado={respostaAtual === null}
                        style={estilos.botaoProxima}
                    />
                </View>

                <Text style={estilos.aviso}>
                    Estimativa acadêmica. Não substitui atendimento profissional.
                </Text>

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
        paddingBottom: 40,
    },

    progressoTextos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },

    progressoTexto: {
        fontFamily: fonts.regular,
        fontSize: 14,
        color: colors.cinza,
    },

    barra: {
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.pessegoClaro,
        marginTop: 10,
        overflow: 'hidden',
    },

    barraPreenchida: {
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.verdeProfundo,
    },

    pergunta: {
        fontFamily: fonts.bold,
        fontSize: 24,
        color: colors.grafite,
        marginTop: 28,
        marginBottom: 24,
    },

    botoes: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 8,
    },

    botaoVoltar: {
        flex: 1,
    },

    botaoProxima: {
        flex: 1.4,
    },

    aviso: {
        fontFamily: fonts.regular,
        fontSize: 13,
        color: colors.cinza,
        textAlign: 'center',
        marginTop: 20,
    },
})