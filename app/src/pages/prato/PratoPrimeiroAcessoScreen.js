// ============================================================
// PRIMEIRO ACESSO: cadastro disfarçado do Pratô
//
// Componente: PratoPrimeiroAcessoScreen
// Navegação: RootStack (rota PrimeiroAcesso). Abre quando não há id guardado.
//            Ao terminar: navigation.reset para PratoTabs
// Responsável: Alana Caled (issue #87)
// Entrega: Final
//
// O que o protótipo (docs/prototipo/telas/prato-05 a 09) mostra:
//   * Passo 1: nome, e-mail e "código do diário" (de verdade: pin_secreto)
//   * Passo 2: "código de recuperação" (de verdade: duress_pin)
//   * Erros de cadastro comum: códigos iguais e e-mail já em uso
// Nenhum texto desta tela menciona o SAFE.
// ============================================================

import { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import BotaoPrimario from '../../components/BotaoPrimario';
import { criarUsuaria } from '../../services/api';
import { guardarIdUsuaria } from '../../services/sessao';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';

const FORMATO_CODIGO = /^[0-9]{4,6}$/;
const FORMATO_EMAIL  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function somenteNumeros(texto){
    return texto.replace(/\D/g, '');
}

function Campo({rotulo, erro, ajuda, destaque, ...props}){
    return(
        <View style={estilos.campo}>
            <Text style={estilos.rotulo}>{rotulo}</Text>
            <TextInput
                style={[
                    estilos.input,
                    destaque && estilos.inputCodigo,
                    erro && estilos.inputErro,
                ]}
                placeholderTextColor={colors.cinza}
                {...props}
            />
            {erro ? (
                <View style={estilos.linhaErro}>
                    <Ionicons name='alert-circle-outline' size={16} color={colors.coral}/>
                    <Text style={estilos.textoErro}>{erro}</Text>
                </View>
            ) : ajuda ? (
                <Text style={estilos.ajuda}>{ajuda}</Text>
            ) : null}
        </View>
    )
}

export default function PratoPrimeiroAcessoScreen({navigation}){
    const [passo, setPasso]                   = useState(1);
    const [nome, setNome]                     = useState('');
    const [email, setEmail]                   = useState('');
    const [codigo, setCodigo]                 = useState('');
    const [recuperacao, setRecuperacao]       = useState('');
    const [erros, setErros]                   = useState({});
    const [aviso, setAviso]                   = useState(null);
    const [enviando, setEnviando]             = useState(false);

    // Passo 1: confere tudo na tela, sem chamar a API.
    function continuar(){
        const novos = {};
        if (!nome.trim())                      novos.nome = 'Digite o seu nome.';
        if (!FORMATO_EMAIL.test(email.trim())) novos.email = 'Digite um e-mail válido.';
        if (!FORMATO_CODIGO.test(codigo))      novos.codigo = 'Use de 4 a 6 números.';
        setErros(novos);
        if (Object.keys(novos).length === 0){
            setAviso(null);
            setPasso(2);
        }
    }

    // Passo 2: confere o segundo código e só então cria a usuária na API.
    async function criarDiario(){
        if (!FORMATO_CODIGO.test(recuperacao)){
            setErros({ recuperacao: 'Use de 4 a 6 números.' });
            return;
        }
        if (recuperacao === codigo){
            setErros({ recuperacao: 'Os dois códigos precisam ser diferentes.' });
            return;
        }

        setErros({});
        setEnviando(true);
        try {
            const usuaria = await criarUsuaria({
                nome_ficticio: nome.trim(),
                email: email.trim(),
                pin_secreto: codigo,
                duress_pin: recuperacao,
            });
            await guardarIdUsuaria(usuaria.id);
            navigation.reset({ index: 0, routes: [{ name: 'PratoTabs' }] });
        } catch (erro) {
            // Nunca mostra a mensagem da API: ela pode citar o "PIN de emergência".
            if (erro.message.includes('Já existe')){
                setErros({ email: 'Este e-mail já está em uso.' });
                setAviso('Não foi possível criar o seu diário. Confira o e-mail e tente de novo.');
                setPasso(1);
            } else {
                setAviso('Não foi possível criar o seu diário. Confira a internet e tente de novo.');
            }
        } finally {
            setEnviando(false);
        }
    }

    return(
        <SafeAreaView style={estilos.tela}>
            <ScrollView contentContainerStyle={estilos.conteudo} keyboardShouldPersistTaps='handled'>

                <View style={estilos.cabecalho}>
                    {passo === 1 ? (
                        <View style={estilos.marca}>
                            <Image source={require('../../assets/Logo/logo.png')} style={estilos.logo}/>
                            <Text style={estilos.nomeApp}>Pratô</Text>
                        </View>
                    ) : (
                        <Pressable
                            style={estilos.voltar}
                            onPress={() => { setErros({}); setAviso(null); setPasso(1); }}
                            accessibilityLabel='Voltar'
                        >
                            <Ionicons name='chevron-back' size={20} color={colors.grafite}/>
                        </Pressable>
                    )}
                    <Text style={estilos.contadorPasso}>Passo {passo} de 2</Text>
                </View>

                <View style={estilos.progresso}>
                    <View style={[estilos.barra, estilos.barraAtiva]}/>
                    <View style={[estilos.barra, passo === 2 && estilos.barraAtiva]}/>
                </View>

                {aviso && (
                    <View style={estilos.aviso}>
                        <Ionicons name='alert-circle-outline' size={20} color={colors.coral}/>
                        <Text style={estilos.avisoTexto}>{aviso}</Text>
                    </View>
                )}

                {passo === 1 ? (
                    <>
                        <View style={estilos.textos}>
                            <Text style={estilos.titulo}>Bem-vinda ao Pratô!</Text>
                            <Text style={estilos.subtitulo}>Vamos montar o seu diário de refeições. Leva menos de um minuto.</Text>
                        </View>

                        <Campo
                            rotulo='Seu nome'
                            value={nome}
                            onChangeText={setNome}
                            erro={erros.nome}
                        />
                        <Campo
                            rotulo='Seu e-mail'
                            value={email}
                            onChangeText={setEmail}
                            keyboardType='email-address'
                            autoCapitalize='none'
                            autoCorrect={false}
                            erro={erros.email}
                        />
                        <Campo
                            rotulo='Crie seu código do diário'
                            value={codigo}
                            onChangeText={(t) => setCodigo(somenteNumeros(t))}
                            keyboardType='number-pad'
                            secureTextEntry
                            maxLength={6}
                            destaque
                            erro={erros.codigo}
                            ajuda='De 4 a 6 números. Guarde bem: ele protege o seu diário.'
                        />
                    </>
                ) : (
                    <>
                        <View style={estilos.textos}>
                            <Text style={estilos.titulo}>Crie um código de recuperação</Text>
                            <Text style={estilos.subtitulo}>Um segundo código, diferente do primeiro. Anote em um lugar seguro.</Text>
                        </View>

                        <Campo
                            rotulo='Código de recuperação'
                            value={recuperacao}
                            onChangeText={(t) => setRecuperacao(somenteNumeros(t))}
                            keyboardType='number-pad'
                            secureTextEntry
                            maxLength={6}
                            destaque
                            erro={erros.recuperacao}
                            ajuda='De 4 a 6 números, diferente do código do diário.'
                        />

                        <View style={estilos.dica}>
                            <Ionicons name='lock-closed-outline' size={20} color={colors.verdeProfundo}/>
                            <Text style={estilos.dicaTexto}>Use números que só você saiba. Evite datas de aniversário.</Text>
                        </View>
                    </>
                )}

                <View style={estilos.espaco}/>

                {passo === 1 ? (
                    <BotaoPrimario titulo='Continuar' onPress={continuar}/>
                ) : (
                    <BotaoPrimario
                        titulo={enviando ? 'Criando...' : 'Criar meu diário'}
                        variante='positivo'
                        desativado={enviando}
                        onPress={criarDiario}
                    />
                )}

            </ScrollView>
        </SafeAreaView>
    )
}

const estilos = StyleSheet.create({
    tela:          { flex: 1, backgroundColor: colors.creme },
    conteudo:      { flexGrow: 1, paddingHorizontal: 24, paddingTop: 24, paddingBottom: 32, gap: 20 },

    cabecalho:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    marca:         { flexDirection: 'row', alignItems: 'center', gap: 10 },
    logo:          { width: 40, height: 40 },
    nomeApp:       { fontFamily: fonts.bold, fontSize: 20, color: colors.grafite },
    contadorPasso: { fontFamily: fonts.regular, fontSize: 13, color: colors.cinza },
    voltar:        { width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: colors.begeDivisor,
                     backgroundColor: colors.branco, alignItems: 'center', justifyContent: 'center' },

    progresso:     { flexDirection: 'row', gap: 8 },
    barra:         { flex: 1, height: 6, borderRadius: 3, backgroundColor: colors.pessegoClaro },
    barraAtiva:    { backgroundColor: colors.pessegoPastel },

    aviso:         { flexDirection: 'row', gap: 12, alignItems: 'flex-start', backgroundColor: colors.coralClaro,
                     borderRadius: 16, paddingVertical: 14, paddingHorizontal: 16 },
    avisoTexto:    { flex: 1, fontFamily: fonts.regular, fontSize: 13, lineHeight: 20, color: colors.grafite },

    textos:        { gap: 8 },
    titulo:        { fontFamily: fonts.bold, fontSize: 28, lineHeight: 34, color: colors.grafite },
    subtitulo:     { fontFamily: fonts.regular, fontSize: 15, lineHeight: 22, color: colors.cinza },

    campo:         { gap: 6 },
    rotulo:        { fontFamily: fonts.medium, fontSize: 14, color: colors.grafite },
    input:         { height: 52, borderRadius: 16, borderWidth: 1, borderColor: colors.pessegoClaro,
                     backgroundColor: colors.branco, paddingHorizontal: 16,
                     fontFamily: fonts.regular, fontSize: 16, color: colors.grafite },
    inputCodigo:   { height: 56, borderWidth: 2, borderColor: colors.pessegoPastel, fontSize: 22, letterSpacing: 8 },
    inputErro:     { borderWidth: 2, borderColor: colors.coral },
    ajuda:         { fontFamily: fonts.regular, fontSize: 13, color: colors.cinza },
    linhaErro:     { flexDirection: 'row', alignItems: 'center', gap: 6 },
    textoErro:     { fontFamily: fonts.medium, fontSize: 13, color: colors.coral },

    dica:          { flexDirection: 'row', gap: 12, alignItems: 'flex-start', backgroundColor: colors.verdeClaro,
                     borderRadius: 16, paddingVertical: 14, paddingHorizontal: 16 },
    dicaTexto:     { flex: 1, fontFamily: fonts.regular, fontSize: 13, lineHeight: 20, color: colors.grafite },

    espaco:        { flex: 1, minHeight: 16 },
});