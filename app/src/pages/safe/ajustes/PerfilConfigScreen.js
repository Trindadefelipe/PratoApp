// ============================================================
// TELA 13: Ajustes e perfil
//
// Componente: PerfilConfigScreen
// Navegação: Tab (aba Ajustes), raiz do AjustesStack
// Responsável: Alana Caled
// Entrega: 2 (24/10); pela API na Entrega Final (#67)
//
// O que o protótipo (Entrega 1, seção 4) mostra nesta tela:
//   * Avatar com a inicial do nome fictício
//   * Campos nome fictício e e-mail, botão Salvar alterações
//   * Links Redefinir PIN secreto e Camuflagem e gatilhos
//   * Botão Sair da conta
//   * Entrega Final: lê e salva pela API e tem "Apagar meus dados" (DELETE /usuarias/:id)
// ============================================================

import { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import BotaoPrimario from '../../../components/BotaoPrimario';
import LinhaMenu from '../../../components/safe/LinhaMenu';
import { buscarUsuaria, atualizarUsuaria, removerUsuaria } from '../../../services/api';
import { lerIdUsuaria, apagarIdUsuaria, idUsuariaAtual } from '../../../services/sessao';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';


export default function PerfilConfigScreen({navigation}){
    const [usuariaId, setUsuariaId]                 = useState(null);
    const [nome, setNome]                           = useState('');
    const [email, setEmail]                         = useState('');
    const [carregando, setCarregando]               = useState(true);
    const [erroCarga, setErroCarga]                 = useState(null);
    const [salvando, setSalvando]                   = useState(false);
    const [mensagem, setMensagem]                   = useState(null);
    const [confirmandoApagar, setConfirmandoApagar] = useState(false);
    const [apagando, setApagando]                   = useState(false);

    const inicial = nome.trim() ? nome.trim().charAt(0).toLocaleUpperCase() : '?';

    // Read: GET /usuarias/:id
    const carregar = useCallback(async () => {
        setCarregando(true);
        setErroCarga(null);
        try {
            const id = await idUsuariaAtual();
            const usuaria = await buscarUsuaria(id);
            setUsuariaId(id);
            setNome(usuaria.nome_ficticio);
            setEmail(usuaria.email);
        } catch (erro) {
            setErroCarga(erro.message);
        } finally {
            setCarregando(false);
        }
    }, []);

    useEffect(() => { carregar(); }, [carregar]);

    // Update: PUT /usuarias/:id (a API devolve o erro, ex.: e-mail já usado)
    async function salvar(){
        if (!nome.trim() || !email.includes('@')){
            setMensagem({tipo: 'erro', texto: 'Preencha o nome e um e-mail válido.'});
            return;
        }

        setSalvando(true);
        try {
            const atualizada = await atualizarUsuaria(usuariaId, { nome_ficticio: nome.trim(), email: email.trim() });
            setNome(atualizada.nome_ficticio);
            setEmail(atualizada.email);
            setMensagem({tipo: 'ok', texto: 'Alterações salvas.'});
        } catch (erro) {
            setMensagem({tipo: 'erro', texto: erro.message});
        } finally {
            setSalvando(false);
        }
    }

    // Delete: DELETE /usuarias/:id. Depois volta ao primeiro acesso, como um app recém-instalado.
    async function apagar(){
        const idCelular = await lerIdUsuaria().catch(() => null);
        if (!idCelular){
            setMensagem({tipo: 'erro', texto: 'Esta é a usuária de teste do banco e não pode ser apagada pelo app.'});
            setConfirmandoApagar(false);
            return;
        }

        setApagando(true);
        try {
            await removerUsuaria(idCelular);
            await apagarIdUsuaria();
            navigation.reset({index: 0, routes: [{name: 'PrimeiroAcesso'}]});
        } catch (erro) {
            setMensagem({tipo: 'erro', texto: erro.message});
            setConfirmandoApagar(false);
            setApagando(false);
        }
    }

    function sair(){
        navigation.reset({index: 0, routes: [{name: 'PratoTabs'}]})
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
            <SafeAreaView style={[estilos.tela, estilos.centro]} edges={['top']}>
                <Ionicons name='cloud-offline-outline' size={40} color={colors.coral}/>
                <Text style={estilos.textoErroCarga}>{erroCarga}</Text>
                <BotaoPrimario titulo='Tentar novamente' onPress={carregar} style={estilos.botaoTentar}/>
            </SafeAreaView>
        )
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

                <BotaoPrimario
                    titulo={salvando ? 'Salvando...' : 'Salvar alterações'}
                    onPress={salvar}
                    desativado={salvando}
                    style={estilos.botaoSalvar}
                />

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

                {/* Confirmação na própria tela: Alert não tem botões no navegador */}
                {confirmandoApagar ? (
                    <View style={estilos.confirmacao}>
                        <Text style={estilos.confirmacaoTitulo}>Apagar todos os seus dados?</Text>
                        <Text style={estilos.confirmacaoTexto}>
                            Seu perfil, contatos, viagens, registros do cofre e alertas serão apagados do servidor. Isso não pode ser desfeito.
                        </Text>
                        <Pressable
                            style={[estilos.botaoApagarDefinitivo, apagando && estilos.desativado]}
                            onPress={apagar}
                            disabled={apagando}
                        >
                            <Text style={estilos.textoApagarDefinitivo}>
                                {apagando ? 'Apagando...' : 'Apagar definitivamente'}
                            </Text>
                        </Pressable>
                        <Pressable style={estilos.botaoCancelar} onPress={() => setConfirmandoApagar(false)} hitSlop={8} disabled={apagando}>
                            <Text style={estilos.textoCancelar}>Cancelar</Text>
                        </Pressable>
                    </View>
                ) : (
                    <Pressable
                        style={estilos.botaoApagar}
                        onPress={() => { setConfirmandoApagar(true); setMensagem(null); }}
                        hitSlop={8}
                    >
                        <Ionicons name='trash-outline' size={16} color={colors.cinza}/>
                        <Text style={estilos.textoApagar}>Apagar meus dados</Text>
                    </Pressable>
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
    },

    centro: {
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

    botaoApagar: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        gap: 6,
        marginTop: 28,
    },

    textoApagar: {
        fontFamily: fonts.medium,
        fontSize: 14,
        color: colors.cinza,
    },

    confirmacao: {
        backgroundColor: colors.coralClaro,
        borderRadius: 16,
        padding: 16,
        marginTop: 28,
    },

    confirmacaoTitulo: {
        fontFamily: fonts.bold,
        fontSize: 16,
        color: colors.grafite,
    },

    confirmacaoTexto: {
        fontFamily: fonts.regular,
        fontSize: 14,
        color: colors.grafite,
        marginTop: 6,
    },

    botaoApagarDefinitivo: {
        backgroundColor: colors.coral,
        borderRadius: 14,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },

    desativado: {
        opacity: 0.5,
    },

    textoApagarDefinitivo: {
        fontFamily: fonts.semibold,
        fontSize: 15,
        color: colors.branco,
    },

    botaoCancelar: {
        alignSelf: 'center',
        marginTop: 12,
    },

    textoCancelar: {
        fontFamily: fonts.medium,
        fontSize: 15,
        color: colors.grafite,
    },

})
