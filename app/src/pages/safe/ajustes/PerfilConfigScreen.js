// ============================================================
// TELA 13: Ajustes e perfil
//
// Componente: PerfilConfigScreen
// Navegação: Tab (aba Ajustes), raiz do AjustesStack
// Responsável: Alana Caled
// Entrega: 2 (24/10)
//
// O que o protótipo (Entrega 1, seção 4) mostra nesta tela:
//   * Avatar com a inicial do nome fictício
//   * Campos nome fictício e e-mail, botão Salvar alterações
//   * Links Redefinir PIN secreto e Camuflagem e gatilhos
//   * Botão Sair da conta
// ============================================================

import { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BotaoPrimario from '../../../components/BotaoPrimario';
import LinhaMenu from '../../../components/safe/LinhaMenu';
import { usuaria } from '../../../data/usuaria';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';


export default function PerfilConfigScreen({navigation}){
    const[nome, setNome]        = useState(usuaria.nome_ficticio);
    const[email, setEmail]      = useState(usuaria.email);
    const[mensagem, setMensagem] = useState(null);

    const inicial = nome.trim() ? nome.trim().charAt(0).toLocaleUpperCase() : '?';

    function salvar(){
        if (!nome.trim() || !email.includes('@')){
            setMensagem({tipo: 'erro', texto: 'Preencha o nome e um e-mail válido.'});
            return;
        }

        setMensagem({tipo: 'ok', texto: 'Alterações salvas.'});
    }

    function sair(){
        navigation.reset({index: 0, routes: [{name: 'PratoTabs'}]})
    }

    return(
        <SafeAreaView style={estilos.tela} edges={['top']}>
            <ScrollView
                contentContainerStyle={estilos.conteudo}
                keyboardShouldPersistTaps='handled'
            >
                <Text style={estilos.subtitulo}>
                    Perfil
                </Text>
                <Text style={estilos.titulo}>
                    Ajustes
                </Text>

                <View style={estilos.avatarArea}>
                    <View style={estilos.avatar}>
                        <Text style={estilos.avatarInicial}>{inicial}</Text>
                    </View>
                    <Text style={estilos.avatarAviso}>Foto e nome aparecem só aqui dentro</Text>
                </View>

                <Text style={estilos.rotulo}>Nome fictício</Text>
                <TextInput 
                    style={estilos.campo}
                    value={nome}
                    onChangeText={(texto) => { setNome(texto); setMensagem(null); }}
                />

                <Text style={estilos.rotulo}>E-mail</Text>
                <TextInput 
                    style={estilos.campo}
                    value={email}
                    onChangeText={(texto) => { setEmail(texto); setMensagem(null); }}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                />

                <BotaoPrimario titulo='Salvar alterações' onPress={salvar} style={estilos.botaoSalvar}/>

                {mensagem && (
                    <Text style={[estilos.mensagem, mensagem.tipo === 'erro' && estilos.mensagemErro]}>
                        {mensagem.texto}
                    </Text>
                )}

                <View style={estilos.menu}>
                    <LinhaMenu
                        icone='key-outline'
                        titulo='Redefinir PIN secreto'
                        descricao='Alterar o código de entrada'
                        onPress={() => navigation.navigate('ConfigCamuflagem')}
                    />

                    <LinhaMenu
                        icone='eye-outline'
                        titulo='Camuflagem e gatilhos'
                        descricao='Fachada Pratô, PIN de coação'
                        onPress={() => navigation.navigate('ConfigCamuflagem')}
                    />
                </View>

                <Pressable style={estilos.botaoSair} onPress={sair} hitSlop={8}>
                    <Text style={estilos.textoSair}>Sair da conta</Text>
                </Pressable>

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

    subtitulo: {
        fontFamily: fonts.regular,
        fontSize: 14,
        color: colors.cinza
    },

    titulo: {
        fontFamily: fonts.bold,
        fontSize: 26,
        color: colors.grafite
    },

    avatarArea: {
        alignItems: 'center',
        marginVertical: 16,
    },

    avatar: {
        width: 96,
        height: 96,
        backgroundColor: colors.pessegoClaro,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 48,
        marginBottom: 10
    },

    avatarInicial: {
        fontFamily: fonts.bold,
        fontSize: 36,
        color: colors.marromEscuro,
    },

    avatarAviso: {
        fontFamily: fonts.regular,
        fontSize: 13,
        color: colors.cinza,
    },

    rotulo: {
        fontFamily: fonts.regular,
        fontSize: 14,
        color: colors.cinza,
        marginTop: 8,
        marginBottom: 8,
    },

    campo: {
        backgroundColor: colors.branco,
        paddingHorizontal: 16,
        height: 56,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.pessegoClaro,
        fontFamily: fonts.regular,
        fontSize: 16,
        color: colors.grafite,
    },

    botaoSalvar: {
        marginTop: 20,
    },

    mensagem: {
        fontFamily: fonts.regular,
        fontSize: 12,
        color: colors.verdeProfundo,
        marginTop: 8,
    },

    mensagemErro: {
        color: colors.coral
    }, 

    menu: {
        marginTop: 16
    },

    botaoSair: {
        alignSelf: 'center',
        marginTop: 20,
    },

    textoSair: {
        fontFamily: fonts.bold,
        fontSize: 15,
        color: colors.coral,
    }

})
