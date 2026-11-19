// ============================================================
// TELA 14: Camuflagem e PINs
//
// Componente: ConfigCamuflagemScreen
// Navegação: Stack (push a partir de Ajustes)
// Responsável: Alana Caled
// Entrega: 2 (24/10)
//
// O que o protótipo (Entrega 1, seção 4) mostra nesta tela:
//   * Switches: camuflagem ativa, código no campo de meta, toque longo no logotipo
//   * PIN secreto e PIN de coação (mascarados, com Alterar)
//   * Aviso sobre o PIN de coação
//   * Sensibilidade do gesto: Baixa, Média, Alta
// ============================================================

import { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CabecalhoTela from '../../../components/safe/CabecalhoTela';
import LinhaSwitch from '../../../components/safe/LinhaSwitch';
import LinhaPin from '../../../components/safe/LinhaPin';
import SeletorNivel from '../../../components/safe/SeletorNivel';
import BotaoPrimario from '../../../components/BotaoPrimario';
import { buscarUsuaria, atualizarUsuaria } from '../../../services/api';
import { idUsuariaAtual } from '../../../services/sessao';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';

function validarPin(novoPin, outroPin){
    if (!/^\d{4,6}$/.test(novoPin)) return 'Use de 4 a 6 números.';
    if (novoPin === outroPin) return 'O PIN secreto e o PIN de coação precisam ser diferentes.';
    return null;
}

export default function ConfigCamuflagemScreen({navigation}){
    const [usuariaId, setUsuariaId]         = useState(null);
    const [carregando, setCarregando]       = useState(true);
    const [erroCarga, setErroCarga]         = useState(null);
    const [camuflagem, setCamuflagem]       = useState(true);
    const [gatilhoPin, setGatilhoPin]       = useState(true);
    const [gatilhoToque, setGatilhoToque]   = useState(true);
    const [pinSecreto, setPinSecreto]       = useState('');
    const [pinCoacao, setPinCoacao]         = useState('');
    const [sensibilidade, setSensibilidade] = useState('Média');
    const [aviso, setAviso]                 = useState(null);

    // Read: GET /usuarias/:id
    const carregar = useCallback(async () => {
        setCarregando(true);
        setErroCarga(null);
        try {
            const id = await idUsuariaAtual();
            const usuaria = await buscarUsuaria(id);
            setUsuariaId(id);
            setCamuflagem(usuaria.camuflagem_ativa);
            setPinSecreto(usuaria.pin_secreto);
            setPinCoacao(usuaria.duress_pin);
        } catch (erro) {
            setErroCarga(erro.message);
        } finally {
            setCarregando(false);
        }
    }, []);

    useEffect(() => { carregar(); }, [carregar]);

    // Update da camuflagem: muda na tela na hora e desfaz se a API recusar
    async function alterarCamuflagem(ligada){
        setCamuflagem(ligada);
        setAviso(null);
        try {
            await atualizarUsuaria(usuariaId, { camuflagem_ativa: ligada });
        } catch (erro) {
            setCamuflagem(!ligada);
            setAviso(erro.message);
        }
    }

    // Update de um PIN. Devolve a mensagem de erro para o LinhaPin mostrar, ou null.
    async function salvarPin(campo, novoPin){
        try {
            const atualizada = await atualizarUsuaria(usuariaId, { [campo]: novoPin });
            setPinSecreto(atualizada.pin_secreto);
            setPinCoacao(atualizada.duress_pin);
            return null;
        } catch (erro) {
            return erro.message;
        }
    }

    function alterarGatilho(qual, ligado){
        const outroLigado = qual === 'pin' ? gatilhoToque : gatilhoPin;

        if (!ligado && !outroLigado){
            setAviso('Mantenha pelo menos um jeito de entrar no SAFE.');
            return;
        }

        setAviso(null);
        if (qual === 'pin') setGatilhoPin(ligado);
        else setGatilhoToque(ligado);
    }

    if (carregando){
        return(
            <SafeAreaView style={[estilos.tela, estilos.centro]} edges={['top']}>
                <ActivityIndicator size='large' color={colors.verdeProfundo}/>
            </SafeAreaView>
        )
    }

    if (erroCarga){
        return(
            <SafeAreaView style={estilos.tela} edges={['top']}>
                <View style={estilos.conteudo}>
                    <CabecalhoTela titulo='Camuflagem' onVoltar={() => navigation.goBack()}/>
                    <View style={estilos.centro}>
                        <Ionicons name='cloud-offline-outline' size={40} color={colors.coral}/>
                        <Text style={estilos.textoErroCarga}>{erroCarga}</Text>
                        <BotaoPrimario titulo='Tentar novamente' onPress={carregar} style={estilos.botaoTentar}/>
                    </View>
                </View>
            </SafeAreaView>
        )
    }

    return(
        <SafeAreaView style={estilos.tela} edges={['top']}>
            <ScrollView 
                contentContainerStyle={estilos.conteudo}
                keyboardShouldPersistTaps='handled'
            >
                <CabecalhoTela titulo='Camuflagem' onVoltar={() => navigation.goBack()}/>

                <LinhaSwitch 
                    titulo='Camuflagem ativa'
                    descricao='Mostra o Pratô ao abrir o app'
                    valor={camuflagem}
                    onAlterar={alterarCamuflagem}
                />
                <LinhaSwitch 
                    titulo='Código no campo de meta'
                    descricao='Digite o PIN em Metas e toque em Salvar'
                    valor={gatilhoPin}
                    onAlterar={(ligado) => alterarGatilho('pin', ligado)}
                />
                <LinhaSwitch 
                    titulo='Toque longo no logotipo'
                    descricao='Segure 2 segundos para entrar'
                    valor={gatilhoToque}
                    onAlterar={(ligado) => alterarGatilho('toque', ligado)}
                />

                {aviso && <Text style={estilos.avisoGatilho}>{aviso}</Text>}

                <LinhaPin
                    titulo='PIN secreto'
                    descricao='Abre o espaço SAFE'
                    pin={pinSecreto}
                    validar={(novoPin) => validarPin(novoPin, pinCoacao)}
                    onSalvar={(novoPin) => salvarPin('pin_secreto', novoPin)}
                />
                <LinhaPin
                    titulo='PIN de coação'
                    descricao='Para quando você for obrigada a abrir o app'
                    pin={pinCoacao}
                    validar={(novoPin) => validarPin(novoPin, pinSecreto)}
                    onSalvar={(novoPin) => salvarPin('duress_pin', novoPin)}
                />

                <View style={estilos.cartaoAviso}>
                    <Ionicons name='warning-outline' size={20} color={colors.coral}/>
                    <Text style={estilos.cartaoAvisoTexto}>
                        Com o PIN de coação, o Pratô mostra uma tela de erro e um SOS silencioso é enviado.
                    </Text>
                </View>

                <Text style={estilos.rotulo}>Sensibilidade do gesto</Text>
                <SeletorNivel
                    opcoes={['Baixa', 'Média', 'Alta']}
                    valor={sensibilidade}
                    onAlterar={setSensibilidade}
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

    centro: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },

    textoErroCarga: {
        fontFamily: fonts.regular,
        fontSize: 15,
        color: colors.grafite,
        textAlign: 'center',
        marginTop: 12,
    },

    botaoTentar: {
        alignSelf: 'stretch',
        marginTop: 20,
    },

    conteudo: {
        padding: 20,
        paddingBottom: 40
    },

    avisoGatilho: {
        fontFamily: fonts.regular,
        fontSize: 13,
        color: colors.coral,
        marginTop: 8,
    },

    cartaoAviso: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.pessegoSuave,
        padding: 16,
        borderRadius: 16,
        gap: 12,
        marginTop: 20
    },

    cartaoAvisoTexto: {
        flex: 1,
        fontFamily: fonts.regular,
        fontSize: 14,
        color: colors.marromEscuro
    },

    rotulo: {
        marginTop: 24,
        fontFamily: fonts.regular,
        fontSize: 14,
        color: colors.cinza,
    }

})
