// ============================================================
// TELA 02 e 03: Metas (gatilho do PIN) e erro simulado
//
// Componente: PratoMetasScreen
// Navegação: Tab (aba Metas). PIN correto: Stack.reset para SafeTabs. PIN de coação: estado de erro, sem navegar
// Responsável: Alana Caled (gatilho em conjunto com Higor Domingos)
// Entrega: 2 (24/10)
//
// O que o protótipo (Entrega 1, seção 4) mostra nesta tela:
//   * Campo de meta de calorias diárias e botão Salvar meta (gatilho do PIN)
//   * Seus objetivos: peso atual, peso desejado e água por dia, com botões de menos e mais
//   * Gráfico de calorias da semana com a linha da meta
//   * Tela 03: estado de erro "Não foi possível carregar seus dados nutricionais"
// ============================================================

import { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { metas, caloriasSemana } from '../../data/prato';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import BotaoPrimario from '../../components/BotaoPrimario';
import GraficoSemana from '../../components/prato/GraficoSemana';
import LinhaObjetivo from '../../components/prato/LinhaObjetivo';
import ErroDados from '../../components/prato/ErroDados';
import { usuaria } from '../../data/usuaria';
import {dispararSos, TIPOS_GATILHO} from '../../services/sos';

function formataNumero(numero) {
  return String(numero).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function formataDecimal(numero) {
  return numero.toFixed(1).replace('.', ',');
}

export default function PratoMetasScreen({navigation}){
    const [meta, setMeta]                     = useState(metas.calorias);
    const [valorDigitado, setValorDigitado]   = useState(String(metas.calorias));
    const [focado, setFocado]                 = useState(false);
    const [mensagem, setMensagem]             = useState(null);
    const [erro, setErro]                     = useState(false);
    const [objetivos, setObjetivos]           = useState({
        pesoAtual: metas.pesoAtual,
        pesoDesejado: metas.pesoDesejado,
        agua: metas.aguaMetaCopos * 0.25,
    });

    function ajustar(campo, passo){
        setObjetivos((atual) => ({
            ...atual,
            [campo]: Math.max(0, Math.round((atual[campo] + passo) * 10) / 10),
        }));
    }

    function limparCampo(){
        setValorDigitado(String(meta));
        setMensagem(null);
    }

    function salvarMeta(){
        
        if (valorDigitado === usuaria.pin_secreto) {
            limparCampo();
            navigation.reset({ index: 0, routes: [{ name: 'SafeTabs' }] });
            return;
        }
        if (valorDigitado === usuaria.duress_pin){
            limparCampo();
            setErro(true);
            dispararSos({tipoGatilho: TIPOS_GATILHO.DURESS_PIN});
            return;
        }

        const valor = Number(valorDigitado);

        if (!Number.isInteger(valor) || valor < 800 || valor > 5000){
            setMensagem({tipo: 'erro', texto: 'Digite um valor entre 800 e 5.000 kcal.'});
            return;
        }

        setMeta(valor);
        setMensagem({tipo: 'ok', texto: `Meta atualizada para ${formataNumero(valor)} kcal.`});
    }

    return(
        <SafeAreaView style={estilos.tela} edges={['top']}>
            <ScrollView contentContainerStyle={estilos.conteudo} keyboardShouldPersistTaps='handled'>

                <Text style={estilos.subtitulo}>Acompanhe seu ritmo</Text>
                <Text style={estilos.titulo}>Metas</Text>

                {erro? (
                    <ErroDados onTentarNovamente={() => setErro(false)}/>
                ) : (
                    <>
                        <Text style={estilos.rotulo}>
                            Meta de calorias diárias
                        </Text>

                        <View style={[estilos.campoBorda, focado && estilos.campoBordaFocado]}>
                            <View style={[estilos.campo, focado && estilos.campoFocado]}>
                                <Ionicons name='flame-outline' color={colors.grafite} size={20}/>

                                <TextInput
                                    style={estilos.campoInput}
                                    value={valorDigitado}
                                    onChangeText={(texto) => {
                                        setValorDigitado(texto.replace(/\D/g, ''));
                                        setMensagem(null);
                                    }}
                                    keyboardType='number-pad'
                                    maxLength={6}
                                    onFocus={() => setFocado(true)}
                                    onBlur={() => setFocado(false)}
                                />

                                <Text style={estilos.campoSufixo}>kcal</Text>
                            </View>
                        </View>

                        <BotaoPrimario titulo='Salvar meta' onPress={salvarMeta} style={estilos.botaoSalvar}/>

                        {mensagem && (
                            <Text style={[estilos.mensagem, mensagem.tipo === 'erro' && estilos.mensagemErro]}>
                                {mensagem.texto}
                            </Text>
                        )}

                        <Text style={estilos.secao}>Seus objetivos</Text>

                        <LinhaObjetivo 
                            icone={<MaterialCommunityIcons name='scale-bathroom' size={22} color={colors.verdeProfundo}/>}
                            titulo='Peso atual'
                            valor={`${formataDecimal(objetivos.pesoAtual)} kg`}
                            onMenos={() => ajustar('pesoAtual', -0.1)}
                            onMais={() => ajustar('pesoAtual', 0.1)}
                        />
                        
                        <LinhaObjetivo
                            icone={<Ionicons name='disc-outline' size={22} color={colors.verdeProfundo}/>}
                            titulo='Peso desejado'
                            valor={`${formataDecimal(objetivos.pesoDesejado)} kg`}
                            onMenos={() => ajustar('pesoDesejado', -0.1)}
                            onMais={() => ajustar('pesoDesejado', 0.1)}
                        />
                        
                        <LinhaObjetivo
                            icone={<Ionicons name='water-outline' size={22} color={colors.verdeProfundo}/>}
                            titulo='Água por dia'
                            valor={`${formataDecimal(objetivos.agua)} L`}
                            onMenos={() => ajustar('agua', -0.1)}
                            onMais={() => ajustar('agua', 0.1)}
                        /> 

                        <Text style={estilos.secao}>Calorias da semana</Text>                    

                        <GraficoSemana dados={caloriasSemana} meta={meta}/>

                    </>
                )}

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
        flexGrow: 1,
        padding: 20,
        paddingBottom: 32,
    },

    subtitulo: {
        fontFamily: fonts.regular,
        fontSize: 14,
        color: colors.cinza
    },

    titulo: {
        fontFamily: fonts.bold,
        fontSize: 26,
        color: colors.grafite,
        marginBottom: 16,
    },

    rotulo: {
        fontFamily: fonts.regular,
        fontSize: 14,
        color: colors.cinza,
        marginBottom: 8,
    },

    campoBorda: {
        borderRadius: 20,
        padding: 3,
        borderWidth: 3,
        borderColor: 'transparent'
    },

    campoBordaFocado: {
        borderColor: colors.pessegoClaro,
    },

    campo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: colors.branco,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.pessegoClaro,
        paddingHorizontal: 16,
        height: 56,
    },

    campoFocado: {
        borderColor: colors.pessegoPastel,
    },

    campoInput: {
        flex: 1,
        fontFamily: fonts.medium,
        fontSize: 18,
        color: colors.grafite
    },

    campoSufixo: {
        fontFamily: fonts.regular,
        fontSize: 15,
        color: colors.cinza
    },

    botaoSalvar: {
        marginTop: 12,
    },

    mensagem: {
        fontFamily: fonts.regular,
        fontSize: 13,
        color: colors.verdeProfundo,
        marginTop: 8,
    },

    mensagemErro: {
        color: colors.coral,
    },

    secao: {
        marginTop: 28,
        marginBottom: 8,
        fontFamily: fonts.bold,
        fontSize: 16,
        color: colors.grafite,
    },
    
})
