// ============================================================
// LinhaPin: linha de um PIN mascarado com o botão Alterar.
// Ao tocar em Alterar, abre um campo para digitar o novo PIN.
// Usado na Tela 14 (Camuflagem). Recebe os dados por props.
//   * titulo e descricao: textos da linha
//   * pin: o PIN atual (só a quantidade de dígitos aparece, como bolinhas)
//   * validar: recebe o novo PIN e devolve uma mensagem de erro, ou null se estiver certo
//   * onSalvar: recebe o novo PIN já validado
// ============================================================


import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';

export default function LinhaPin({titulo, descricao, pin, validar, onSalvar}){
    const [editando, setEditando] = useState(false);
    const [novoPin, setNovoPin]   = useState('');
    const [erro, setErro]         = useState(null);

    function cancelar(){
        setEditando(false);
        setNovoPin('');
        setErro(null);
    }

    function salvar(){
        const mensagemErro = validar(novoPin);
        if (mensagemErro){
            setErro(mensagemErro);
            return;
        }
        onSalvar(novoPin);
        cancelar();
    }

    return(
        <View style={estilos.bloco}>
            <View style={estilos.linha}>
                <View style={estilos.textos}>
                    <Text style={estilos.titulo}>{titulo}</Text>
                    <Text style={estilos.descricao}>{descricao}</Text>
                </View>
                <Text style={estilos.bolinhas}>{'•'.repeat(pin.length)}</Text>
                {!editando && (
                    <Pressable onPress={() => setEditando(true)} hitSlop={8}>
                        <Text style={estilos.alterar}>Alterar</Text>
                    </Pressable>
                )}
            </View>

            {editando && (
                <View style={estilos.edicao}>
                    <TextInput
                        style={estilos.campo}
                        value={novoPin}
                        onChangeText={(texto) => { setNovoPin(texto.replace(/\D/g, '')); setErro(null); }}
                        placeholder='Novo PIN (4 a 6 números)'
                        placeholderTextColor={colors.cinza}
                        keyboardType='number-pad'
                        secureTextEntry
                        maxLength={6}
                        autoFocus
                    />
                    {erro && <Text style={estilos.erro}>{erro}</Text>}
                    <View style={estilos.acoes}>
                        <Pressable onPress={cancelar} hitSlop={8}>
                            <Text style={estilos.cancelar}>Cancelar</Text>
                        </Pressable>
                        <Pressable onPress={salvar} hitSlop={8}>
                            <Text style={estilos.alterar}>Salvar</Text>
                        </Pressable>
                    </View>
                </View>
            )}
        </View>
    )
}

const estilos = StyleSheet.create({
    bloco: {
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: colors.pessegoClaro,
    },

    linha: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    textos: {
        flex: 1,
    },

    titulo: {
        fontFamily: fonts.medium,
        fontSize: 16,
        color: colors.grafite,
    },

    descricao: {
        fontFamily: fonts.regular,
        fontSize: 13,
        color: colors.cinza,
    },

    bolinhas: {
        fontFamily: fonts.bold,
        fontSize: 16,
        letterSpacing: 4,
        color: colors.grafite,
    },

    alterar: {
        fontFamily: fonts.bold,
        fontSize: 15,
        color: colors.verdeProfundo,
    },

    edicao: {
        marginTop: 12,
    },

    campo: {
        backgroundColor: colors.branco,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.pessegoClaro,
        paddingHorizontal: 16,
        height: 48,
        fontFamily: fonts.regular,
        fontSize: 15,
        color: colors.grafite,
    },

    erro: {
        fontFamily: fonts.regular,
        fontSize: 12,
        color: colors.coral,
        marginTop: 6,
    },

    acoes: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 24,
        marginTop: 10,
    },

    cancelar: {
        fontFamily: fonts.medium,
        fontSize: 15,
        color: colors.cinza,
    },
})