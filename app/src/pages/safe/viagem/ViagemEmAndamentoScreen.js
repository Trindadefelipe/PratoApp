// ============================================================
// TELA 09: Viagem em andamento
//
// Componente: ViagemEmAndamentoScreen
// Navegação: Stack (replace após iniciar)
// Responsável: Higor Bueno
// Entrega: 2 (24/10)
//
// O que o protótipo (Entrega 1, seção 4) mostra nesta tela:
//   * Origem, destino e status Em andamento
//   * Contador regressivo do tempo restante
//   * Botões Cheguei segura (Stack.replace para ViagemNova) e Preciso de mais 10 minutos
// ============================================================

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import BotaoPrimario from '../../../components/BotaoPrimario';
import { viagemAtiva } from '../../../data/viagens';
import { contatos } from '../../../data/contatos';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';

export default function ViagemEmAndamentoScreen({ navigation }) {
    // 18 minutos e 42 segundos conforme o protótipo visual oficial
    const [segundosRestantes, setSegundosRestantes] = useState(18 * 60 + 42);

    // Contagem regressiva ativa a cada segundo
    useEffect(() => {
        if (segundosRestantes <= 0) return;

        const intervalo = setInterval(() => {
            setSegundosRestantes((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(intervalo);
    }, [segundosRestantes]);

    // Formata os segundos em MM:SS
    function formatarTempo(segundos) {
        const mins = Math.floor(segundos / 60);
        const segs = segundos % 60;
        return `${String(mins).padStart(2, '0')}:${String(segs).padStart(2, '0')}`;
    }

    // Aumenta 10 minutos (600 segundos) ao tocar no botão secundário
    function adicionarMais10Minutos() {
        setSegundosRestantes((prev) => prev + 600);
    }

    // Finaliza a viagem e retorna para ViagemNova
    function concluirViagem() {
        navigation.replace('ViagemNova');
    }

    // Monta dinamicamente a string com o primeiro nome dos contatos notificados
    const nomesAcompanhantes = (viagemAtiva.contatos_notificados_ids || [])
        .map((id) => {
            const c = contatos.find((item) => item.id === id);
            return c ? c.nome.trim().split(' ')[0] : null;
        })
        .filter(Boolean);

    const textoAcompanhantes = nomesAcompanhantes.length > 0
        ? ` · ${nomesAcompanhantes.join(' e ')} acompanham`
        : '';

    // Parâmetros do Anel de Progresso SVG
    const tamanho = 220;
    const espessura = 18;
    const raio = (tamanho - espessura) / 2;
    const circunferencia = 2 * Math.PI * raio;
    const tempoTotalReferencia = 30 * 60; // 30 minutos de viagem
    const proporcao = Math.min(1, Math.max(0, segundosRestantes / tempoTotalReferencia));
    const strokeDashoffset = circunferencia * (1 - proporcao);

    return (
        <SafeAreaView style={estilos.tela} edges={['top']}>
            <ScrollView contentContainerStyle={estilos.conteudo} showsVerticalScrollIndicator={false}>

                {/* Cabeçalho */}
                <View style={estilos.cabecalho}>
                    <Text style={estilos.subtitulo}>Trajeto ativo</Text>
                    <Text style={estilos.titulo}>Viagem segura</Text>
                </View>

                {/* Card do Trajeto Ativo */}
                <View style={estilos.cardTrajeto}>
                    <View style={estilos.rotaLinha}>
                        {/* Indicadores visuais da rota */}
                        <View style={estilos.indicadorColuna}>
                            <View style={estilos.pontoOrigem} />
                            <View style={estilos.linhaTracejada} />
                            <Ionicons name="location" size={18} color={colors.coral} />
                        </View>

                        {/* Textos de Origem e Destino */}
                        <View style={estilos.textosColuna}>
                            <Text style={estilos.pontoTexto}>{viagemAtiva.origem_descricao}</Text>
                            <Text style={estilos.pontoTexto}>{viagemAtiva.destino_descricao}</Text>
                        </View>
                    </View>

                    {/* Tag de Status Em andamento */}
                    <View style={estilos.badgeStatus}>
                        <Text style={estilos.badgeTexto}>Em andamento</Text>
                    </View>
                </View>

                {/* Anel SVG de Contagem Regressiva */}
                <View style={estilos.containerAnel}>
                    <Svg width={tamanho} height={tamanho} style={{ transform: [{ rotate: '-90deg' }] }}>
                        {/* Círculo de Fundo (Pêssego Claro) */}
                        <Circle
                            cx={tamanho / 2}
                            cy={tamanho / 2}
                            r={raio}
                            fill="none"
                            stroke={colors.pessegoClaro}
                            strokeWidth={espessura}
                        />
                        {/* Arco de Progresso Ativo (Verde Profundo) */}
                        <Circle
                            cx={tamanho / 2}
                            cy={tamanho / 2}
                            r={raio}
                            fill="none"
                            stroke={colors.verdeProfundo}
                            strokeWidth={espessura}
                            strokeDasharray={circunferencia}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                        />
                    </Svg>

                    {/* Tempo Centralizado */}
                    <View style={estilos.textoCentroAnel}>
                        <Text style={estilos.tempoNumero}>{formatarTempo(segundosRestantes)}</Text>
                        <Text style={estilos.tempoLegenda}>restantes</Text>
                    </View>
                </View>

                {/* Legenda de Chegada Prevista e Contatos */}
                <Text style={estilos.chegadaTexto}>
                    Chegada prevista às 22:15{textoAcompanhantes}
                </Text>

                {/* Botões de Ação */}
                <View style={estilos.botoesContainer}>
                    <BotaoPrimario
                        titulo="✓ Cheguei segura"
                        variante="positivo"
                        onPress={concluirViagem}
                    />

                    <BotaoPrimario
                        titulo="Preciso de mais 10 minutos"
                        variante="secundario"
                        onPress={adicionarMais10Minutos}
                    />
                </View>

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
        paddingBottom: 36,
    },
    cabecalho: {
        marginBottom: 16,
    },
    subtitulo: {
        fontFamily: fonts.medium,
        fontSize: 14,
        color: colors.cinza,
    },
    titulo: {
        fontFamily: fonts.bold,
        fontSize: 26,
        color: colors.grafite,
    },
    cardTrajeto: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.branco,
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.pessegoClaro,
        marginBottom: 28,
    },
    rotaLinha: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    indicadorColuna: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
    },
    pontoOrigem: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.verdeProfundo,
    },
    linhaTracejada: {
        width: 2,
        height: 22,
        backgroundColor: colors.pessegoClaro,
        marginVertical: 2,
    },
    textosColuna: {
        justifyContent: 'space-between',
        height: 48,
    },
    pontoTexto: {
        fontFamily: fonts.semibold,
        fontSize: 14,
        color: colors.grafite,
    },
    badgeStatus: {
        backgroundColor: colors.verdeClaro,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 999,
    },
    badgeTexto: {
        fontFamily: fonts.semibold,
        fontSize: 12,
        color: colors.verdeProfundo,
    },
    containerAnel: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 12,
    },
    textoCentroAnel: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tempoNumero: {
        fontFamily: fonts.bold,
        fontSize: 38,
        color: colors.grafite,
        lineHeight: 44,
    },
    tempoLegenda: {
        fontFamily: fonts.regular,
        fontSize: 14,
        color: colors.cinza,
    },
    chegadaTexto: {
        fontFamily: fonts.regular,
        fontSize: 13,
        color: colors.cinza,
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 32,
    },
    botoesContainer: {
        gap: 12,
    },
});