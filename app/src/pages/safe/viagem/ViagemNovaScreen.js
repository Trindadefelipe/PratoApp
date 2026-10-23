// ============================================================
// TELA 08: Nova viagem
//
// Componente: ViagemNovaScreen
// Navegação: Tab (aba Viagem), raiz do ViagemStack
// Responsável: Higor Bueno
// Entrega: 2 (24/10)
//
// O que o protótipo (Entrega 1, seção 4) mostra nesta tela:
//   * Campos De e Para
//   * Tempo estimado: 15, 30, 45, 60 min e chegada prevista
//   * Quem será avisada (contatos do Círculo com checkbox)
//   * Botão Iniciar viagem (Stack.replace para ViagemEmAndamento)
// ============================================================

import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import BotaoPrimario from '../../../components/BotaoPrimario';
import Chip from '../../../components/Chip';
import { contatos } from '../../../data/contatos';
import { viagemAtiva } from '../../../data/viagens';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';

const OPCOES_TEMPO = [15, 30, 45, 60];

const CORES_AVATAR = [
    { fundo: colors.pessegoClaro, texto: colors.grafite },
    { fundo: colors.verdeClaro, texto: colors.verdeProfundo },
    { fundo: colors.pessegoPastel, texto: colors.grafite },
];

export default function ViagemNovaScreen({ navigation }) {
    const [origem, setOrigem] = useState(viagemAtiva.origem_descricao);
    const [destino, setDestino] = useState(viagemAtiva.destino_descricao);
    const [tempoSelecionado, setTempoSelecionado] = useState(30);
    const [contatosSelecionados, setContatosSelecionados] = useState(
        viagemAtiva.contatos_notificados_ids || [1, 2]
    );

    // Calcula horário previsto somando os minutos selecionados ao horário atual
    function calcularChegadaPrevista(minutos) {
        const agora = new Date();
        const chegada = new Date(agora.getTime() + minutos * 60000);
        const horas = String(chegada.getHours()).padStart(2, '0');
        const mins = String(chegada.getMinutes()).padStart(2, '0');
        return `${horas}:${mins}`;
    }

    function alternarContato(id) {
        if (contatosSelecionados.includes(id)) {
            setContatosSelecionados(contatosSelecionados.filter((item) => item !== id));
        } else {
            setContatosSelecionados([...contatosSelecionados, id]);
        }
    }

    function iniciarViagem() {
        // Na Entrega 2, faz a transição de estado da navegação conforme o protótipo
        navigation.replace('ViagemEmAndamento');
    }

    return (
        <SafeAreaView style={estilos.tela} edges={['top']}>
            <ScrollView contentContainerStyle={estilos.conteudo} showsVerticalScrollIndicator={false}>
                
                {/* Cabeçalho */}
                <View style={estilos.cabecalho}>
                    <Pressable
                        style={estilos.botaoVoltar}
                        onPress={() => navigation.goBack()}
                        hitSlop={8}
                    >
                        <Ionicons name="chevron-back" size={24} color={colors.grafite} />
                    </Pressable>
                    <Text style={estilos.titulo}>Nova viagem</Text>
                </View>

                {/* Campo De */}
                <Text style={estilos.rotulo}>De</Text>
                <View style={estilos.inputContainer}>
                    <Ionicons name="location-outline" size={20} color={colors.cinza} />
                    <TextInput
                        style={estilos.input}
                        value={origem}
                        onChangeText={setOrigem}
                        placeholder="Ponto de partida"
                        placeholderTextColor={colors.cinza}
                    />
                </View>

                {/* Campo Para */}
                <Text style={estilos.rotulo}>Para</Text>
                <View style={estilos.inputContainer}>
                    <Ionicons name="location-outline" size={20} color={colors.cinza} />
                    <TextInput
                        style={estilos.input}
                        value={destino}
                        onChangeText={setDestino}
                        placeholder="Destino final"
                        placeholderTextColor={colors.cinza}
                    />
                </View>

                {/* Tempo Estimado */}
                <Text style={estilos.rotulo}>Tempo estimado</Text>
                <View style={estilos.chipsContainer}>
                    {OPCOES_TEMPO.map((minutos) => (
                        <Chip
                            key={minutos}
                            titulo={`${minutos} min`}
                            ativo={tempoSelecionado === minutos}
                            onPress={() => setTempoSelecionado(minutos)}
                        />
                    ))}
                </View>
                <Text style={estilos.previsaoTexto}>
                    Chegada prevista às {calcularChegadaPrevista(tempoSelecionado)}
                </Text>

                {/* Quem será avisada */}
                <Text style={estilos.secaoTitulo}>Quem será avisada</Text>
                <View style={estilos.listaContatos}>
                    {contatos.map((contato, index) => {
                        const estaMarcado = contatosSelecionados.includes(contato.id);
                        const estiloCor = CORES_AVATAR[index % CORES_AVATAR.length];
                        const inicial = contato.nome.trim().charAt(0).toUpperCase();

                        return (
                            <Pressable
                                key={contato.id}
                                style={estilos.itemContato}
                                onPress={() => alternarContato(contato.id)}
                            >
                                <View style={[estilos.avatar, { backgroundColor: estiloCor.fundo }]}>
                                    <Text style={[estilos.avatarTexto, { color: estiloCor.texto }]}>
                                        {inicial}
                                    </Text>
                                </View>

                                <View style={estilos.infoContato}>
                                    <Text style={estilos.nomeContato}>
                                        {contato.nome}{' '}
                                        <Text style={estilos.parentescoContato}>
                                            ({contato.parentesco_relacao})
                                        </Text>
                                    </Text>
                                </View>

                                <View style={[estilos.checkbox, estaMarcado && estilos.checkboxMarcado]}>
                                    {estaMarcado && (
                                        <Ionicons name="checkmark" size={16} color={colors.branco} />
                                    )}
                                </View>
                            </Pressable>
                        );
                    })}
                </View>

                {/* Botão de Ação */}
                <BotaoPrimario
                    titulo="Iniciar viagem"
                    variante="positivo"
                    style={estilos.botaoIniciar}
                    onPress={iniciarViagem}
                />

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
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20,
    },
    botaoVoltar: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: colors.branco,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.pessegoClaro,
    },
    titulo: {
        fontFamily: fonts.bold,
        fontSize: 24,
        color: colors.grafite,
    },
    rotulo: {
        fontFamily: fonts.medium,
        fontSize: 14,
        color: colors.grafite,
        marginBottom: 8,
        marginTop: 12,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.branco,
        height: 52,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.pessegoClaro,
        paddingHorizontal: 16,
        gap: 12,
    },
    input: {
        flex: 1,
        fontFamily: fonts.regular,
        fontSize: 15,
        color: colors.grafite,
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 4,
    },
    previsaoTexto: {
        fontFamily: fonts.regular,
        fontSize: 13,
        color: colors.cinza,
        marginTop: 8,
        marginBottom: 16,
    },
    secaoTitulo: {
        fontFamily: fonts.bold,
        fontSize: 16,
        color: colors.grafite,
        marginTop: 12,
        marginBottom: 12,
    },
    listaContatos: {
        gap: 12,
        marginBottom: 28,
    },
    itemContato: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.branco,
        padding: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.pessegoClaro,
        gap: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarTexto: {
        fontFamily: fonts.bold,
        fontSize: 16,
    },
    infoContato: {
        flex: 1,
    },
    nomeContato: {
        fontFamily: fonts.semibold,
        fontSize: 15,
        color: colors.grafite,
    },
    parentescoContato: {
        fontFamily: fonts.regular,
        fontSize: 13,
        color: colors.cinza,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 7,
        borderWidth: 1.5,
        borderColor: colors.cinza,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.branco,
    },
    checkboxMarcado: {
        backgroundColor: colors.verdeProfundo,
        borderColor: colors.verdeProfundo,
    },
    botaoIniciar: {
        marginTop: 8,
    },
});