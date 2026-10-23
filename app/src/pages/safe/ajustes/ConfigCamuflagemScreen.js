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

import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CabecalhoTela from '../../../components/safe/CabecalhoTela';
import LinhaSwitch from '../../../components/safe/LinhaSwitch';
import LinhaPin from '../../../components/safe/LinhaPin';
import SeletorNivel from '../../../components/safe/SeletorNivel';
import { usuaria } from '../../../data/usuaria';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';

function validarPin(novoPin, outroPin){
    if (!/^\d{4,6}$/.test(novoPin)) return 'Use de 4 a 6 números.';
    if (novoPin === outroPin) return 'O PIN secreto e o PIN de coação precisam ser diferentes.';
    return null;
}

export default function ConfigCamuflagemScreen({navigation}){
    const [camuflagem, setCamuflagem]       = useState(usuaria.camuflagem_ativa);
    const [gatilhoPin, setGatilhoPin]       = useState(true);
    const [gatilhoToque, setGatilhoToque]   = useState(true);
    const [pinSecreto, setPinSecreto]       = useState(usuaria.pin_secreto);
    const [pinCoacao, setPinCoacao]         = useState(usuaria.duress_pin);
    const [sensibilidade, setSensibilidade] = useState('Média');
    const [aviso, setAviso]                 = useState(null);

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
                    onAlterar={setCamuflagem}
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
                    onSalvar={setPinSecreto}
                />
                <LinhaPin
                    titulo='PIN de coação'
                    descricao='Para quando você for obrigada a abrir o app'
                    pin={pinCoacao}
                    validar={(novoPin) => validarPin(novoPin, pinSecreto)}
                    onSalvar={setPinCoacao}
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
