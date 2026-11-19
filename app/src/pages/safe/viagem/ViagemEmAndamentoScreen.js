// ============================================================
// TELA 09: Viagem em andamento
//
// Componente: ViagemEmAndamentoScreen
// Navegação: Stack (replace após iniciar)
// Responsável: Higor Bueno
// Entrega: Final (integrado com a API e Supabase, issue #73)
//
// O que o protótipo (Entrega 1, seção 4) mostra nesta tela:
//   * Origem, destino e status Em andamento vindos da API
//   * Contador regressivo do tempo restante calculado da previsao_chegada
//   * Botão "Cheguei segura" (PUT /viagens/:id encerrando status e finalizado_em)
//   * Botão "Preciso de mais 10 minutos" (PUT atualizando previsão e POST /checkins)
// ============================================================

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import BotaoPrimario from '../../../components/BotaoPrimario';
import {
    buscarViagem,
    listarViagens,
    encerrarViagem,
    atualizarViagem,
    criarCheckin,
} from '../../../services/api';
import { idUsuariaAtual } from '../../../services/sessao';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';

export default function ViagemEmAndamentoScreen({ navigation, route }) {
    const viagemParam = route?.params?.viagem || null;
    const viagemIdParam = route?.params?.viagemId || viagemParam?.id || null;

    const [viagem, setViagem] = useState(viagemParam);
    const [segundosRestantes, setSegundosRestantes] = useState(18 * 60 + 42);
    const [carregando, setCarregando] = useState(!viagemParam);
    const [erro, setErro] = useState(null);
    const [processandoAcao, setProcessandoAcao] = useState(false);

    // Carrega viagem da API se não foi passada via parâmetros
    useEffect(() => {
        let montado = true;

        async function carregarDados() {
            try {
                let v = null;
                if (viagemIdParam) {
                    v = await buscarViagem(viagemIdParam);
                } else {
                    const viagens = await listarViagens(await idUsuariaAtual());
                    v = viagens.find((item) => item.status_viagem === 'EM_ANDAMENTO') || viagens[0];
                }

                if (montado && v) {
                    setViagem(v);
                    if (v.previsao_chegada) {
                        const chegada = new Date(v.previsao_chegada).getTime();
                        const agora = Date.now();
                        const diffSegundos = Math.max(0, Math.floor((chegada - agora) / 1000));
                        setSegundosRestantes(diffSegundos > 0 ? diffSegundos : 15 * 60);
                    }
                }
            } catch (err) {
                if (montado) {
                    setErro(err.message || 'Erro ao carregar dados da viagem.');
                }
            } finally {
                if (montado) setCarregando(false);
            }
        }

        carregarDados();

        return () => {
            montado = false;
        };
    }, [viagemIdParam]);

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

    // Aumenta 10 minutos (600 segundos) e registra check-in com POST /checkins
    async function adicionarMais10Minutos() {
        if (!viagem) return;
        setProcessandoAcao(true);
        setErro(null);

        const novoTempo = segundosRestantes + 600;
        setSegundosRestantes(novoTempo);

        try {
            const novaPrevisao = new Date(Date.now() + novoTempo * 1000).toISOString();
            await atualizarViagem(viagem.id, { previsao_chegada: novaPrevisao });
            // Registra o check-in na API confirmando status
            await criarCheckin({
                viagem_id: viagem.id,
                status_resposta: 'CONFIRMADO',
            });
        } catch (err) {
            setErro('Aviso: tempo estendido localmente, mas houve erro ao sincronizar com a API.');
        } finally {
            setProcessandoAcao(false);
        }
    }

    // Finaliza a viagem na API com status CONCLUIDA_COM_SUCESSO e retorna para ViagemNova
    async function concluirViagem() {
        if (!viagem) {
            navigation.replace('ViagemNova');
            return;
        }

        setProcessandoAcao(true);
        setErro(null);

        try {
            await encerrarViagem(viagem.id);
            navigation.replace('ViagemNova');
        } catch (err) {
            setErro(err.message || 'Erro ao finalizar viagem na API.');
            setProcessandoAcao(false);
        }
    }

    // Formata hora de previsão a partir do timestamp ou segundos restantes
    function formatarHoraPrevista() {
        if (viagem?.previsao_chegada) {
            const data = new Date(viagem.previsao_chegada);
            if (!isNaN(data.getTime())) {
                const h = String(data.getHours()).padStart(2, '0');
                const m = String(data.getMinutes()).padStart(2, '0');
                return `${h}:${m}`;
            }
        }
        const agora = new Date();
        const futura = new Date(agora.getTime() + segundosRestantes * 1000);
        return `${String(futura.getHours()).padStart(2, '0')}:${String(futura.getMinutes()).padStart(2, '0')}`;
    }

    // Parâmetros do Anel de Progresso SVG
    const tamanho = 220;
    const espessura = 18;
    const raio = (tamanho - espessura) / 2;
    const circunferencia = 2 * Math.PI * raio;
    const tempoTotalReferencia = 30 * 60; // 30 minutos de viagem base
    const proporcao = Math.min(1, Math.max(0, segundosRestantes / tempoTotalReferencia));
    const strokeDashoffset = circunferencia * (1 - proporcao);

    const origemTexto = viagem?.origem_descricao || 'Faculdade Positivo';
    const destinoTexto = viagem?.destino_descricao || 'Casa';

    return (
        <SafeAreaView style={estilos.tela} edges={['top']}>
            <ScrollView contentContainerStyle={estilos.conteudo} showsVerticalScrollIndicator={false}>

                {/* Cabeçalho */}
                <View style={estilos.cabecalho}>
                    <Text style={estilos.subtitulo}>Trajeto ativo</Text>
                    <Text style={estilos.titulo}>Viagem segura</Text>
                </View>

                {/* Mensagem de Erro/Alerta */}
                {erro ? (
                    <View style={estilos.alertaErro}>
                        <Ionicons name="alert-circle-outline" size={20} color={colors.vermelho} />
                        <Text style={estilos.textoErro}>{erro}</Text>
                    </View>
                ) : null}

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
                            <Text style={estilos.pontoTexto}>{origemTexto}</Text>
                            <Text style={estilos.pontoTexto}>{destinoTexto}</Text>
                        </View>
                    </View>

                    {/* Tag de Status Em andamento */}
                    <View style={estilos.badgeStatus}>
                        <Text style={estilos.badgeTexto}>
                            {viagem?.status_viagem === 'CONCLUIDA_COM_SUCESSO'
                                ? 'Concluída'
                                : 'Em andamento'}
                        </Text>
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

                {/* Legenda de Chegada Prevista */}
                <Text style={estilos.chegadaTexto}>
                    Chegada prevista às {formatarHoraPrevista()}
                </Text>

                {/* Botões de Ação */}
                <View style={estilos.botoesContainer}>
                    <BotaoPrimario
                        titulo={processandoAcao ? 'Gravando na API...' : '✓ Cheguei segura'}
                        variante="positivo"
                        onPress={concluirViagem}
                        desabilitado={processandoAcao || carregando}
                    />

                    <BotaoPrimario
                        titulo="Preciso de mais 10 minutos"
                        variante="secundario"
                        onPress={adicionarMais10Minutos}
                        desabilitado={processandoAcao || carregando}
                    />
                </View>

                {carregando && (
                    <ActivityIndicator size="small" color={colors.verdeProfundo} style={{ marginTop: 16 }} />
                )}

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
    alertaErro: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: colors.pessegoClaro,
        padding: 12,
        borderRadius: 12,
        marginBottom: 16,
    },
    textoErro: {
        flex: 1,
        fontFamily: fonts.regular,
        fontSize: 14,
        color: colors.vermelho,
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
