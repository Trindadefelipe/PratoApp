// ============================================================
// ModalRefeicao: formulário para registrar uma refeição no Diário (Tela 01).
// Abre pelo botão + de uma refeição ainda não registrada.
// Recebe os dados por props.
//   * visivel: se o modal aparece
//   * refeicao: { nome } da refeição que está sendo registrada (ex.: Jantar)
//   * onSalvar({ descricao, kcal }): chamado com os dados já validados
//   * onFechar: fecha sem salvar
// ============================================================

import { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BotaoPrimario from '../BotaoPrimario';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';

const KCAL_MIN = 1;
const KCAL_MAX = 1500;

export default function ModalRefeicao({ visivel, refeicao, onSalvar, onFechar }) {
    const [descricao, setDescricao] = useState('');
    const [kcal, setKcal]           = useState('');
    const [erro, setErro]           = useState(null);

    // Limpa o formulário toda vez que o modal abre
    useEffect(() => {
        if (visivel) {
            setDescricao('');
            setKcal('');
            setErro(null);
        }
    }, [visivel]);

    function salvar() {
        const valor = Number(kcal);
        if (!descricao.trim()) {
            setErro('Conte o que você comeu.');
            return;
        }
        if (!Number.isInteger(valor) || valor < KCAL_MIN || valor > KCAL_MAX) {
            setErro(`Digite as calorias entre ${KCAL_MIN} e ${KCAL_MAX.toLocaleString('pt-BR')} kcal.`);
            return;
        }
        onSalvar({ descricao: descricao.trim(), kcal: valor });
    }

    return (
        <Modal visible={visivel} transparent animationType="slide" onRequestClose={onFechar}>
            <View style={estilos.fundo}>
                <View style={estilos.cartao}>

                    <View style={estilos.topo}>
                        <Text style={estilos.titulo}>Registrar {refeicao?.nome?.toLowerCase()}</Text>
                        <Pressable
                            onPress={onFechar}
                            hitSlop={10}
                            accessibilityRole="button"
                            accessibilityLabel="Fechar"
                        >
                            <Ionicons name="close" size={24} color={colors.grafite} />
                        </Pressable>
                    </View>

                    <Text style={estilos.rotulo}>O que você comeu?</Text>
                    <TextInput
                        style={estilos.input}
                        value={descricao}
                        onChangeText={(t) => { setDescricao(t); setErro(null); }}
                        placeholder="Ex.: Sopa de legumes com torrada"
                        placeholderTextColor={colors.cinza}
                        maxLength={60}
                    />

                    <Text style={estilos.rotulo}>Calorias</Text>
                    <View style={estilos.campoKcal}>
                        <Ionicons name="flame-outline" size={20} color={colors.grafite} />
                        <TextInput
                            style={estilos.inputKcal}
                            value={kcal}
                            onChangeText={(t) => { setKcal(t.replace(/\D/g, '')); setErro(null); }}
                            placeholder="350"
                            placeholderTextColor={colors.cinza}
                            keyboardType="number-pad"
                            maxLength={4}
                        />
                        <Text style={estilos.sufixo}>kcal</Text>
                    </View>

                    {erro && <Text style={estilos.erro}>{erro}</Text>}

                    <BotaoPrimario titulo="Salvar refeição" onPress={salvar} style={estilos.botao} />
                </View>
            </View>
        </Modal>
    );
}

const estilos = StyleSheet.create({
    fundo: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: colors.fundoModal,
    },

    cartao: {
        backgroundColor: colors.creme,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        padding: 24,
        paddingBottom: 36,
        gap: 8,
    },

    topo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },

    titulo: {
        fontFamily: fonts.bold,
        fontSize: 20,
        color: colors.grafite,
    },

    rotulo: {
        fontFamily: fonts.medium,
        fontSize: 14,
        color: colors.grafite,
        marginTop: 8,
    },

    input: {
        height: 52,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.pessegoClaro,
        backgroundColor: colors.branco,
        paddingHorizontal: 16,
        fontFamily: fonts.regular,
        fontSize: 15,
        color: colors.grafite,
    },

    campoKcal: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        height: 52,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.pessegoClaro,
        backgroundColor: colors.branco,
        paddingHorizontal: 16,
    },

    inputKcal: {
        flex: 1,
        fontFamily: fonts.semibold,
        fontSize: 16,
        color: colors.grafite,
    },

    sufixo: {
        fontFamily: fonts.regular,
        fontSize: 14,
        color: colors.cinza,
    },

    erro: {
        fontFamily: fonts.medium,
        fontSize: 13,
        color: colors.coral,
        marginTop: 4,
    },

    botao: {
        marginTop: 16,
    },
});
