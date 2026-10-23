// ============================================================
// TELA 07: Criar e editar contato
//
// Componente: ContatoFormScreen
// Navegação: Stack (push sobre a lista)
// Responsável: Felipe Trindade
// Entrega: 2 (24/10)
//
// O que o protótipo (Entrega 1, seção 4) mostra nesta tela:
//   * Campos: nome, telefone ou WhatsApp, relação
//   * Prioridade: Alta, Média, Baixa
//   * Switches: avisar por SMS e por WhatsApp
//   * Botões Salvar contato e Excluir contato
// ============================================================

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Switch,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';
import BotaoPrimario from '../../../components/BotaoPrimario';
import { PRIORIDADES } from '../../../data/contatos';

export default function ContatoFormScreen({ navigation, route }) {
  const contatoExistente = route.params?.contato;
  const modoEdicao = Boolean(contatoExistente);

  // Estados dos campos
  const [nome, setNome] = useState(contatoExistente?.nome || '');
  const [telefone, setTelefone] = useState(contatoExistente?.telefone || '');
  const [relacao, setRelacao] = useState(contatoExistente?.parentesco_relacao || '');
  // nivel_prioridade: 1 = Alta, 2 = Média, 3 = Baixa (contato novo começa em Alta)
  const [prioridade, setPrioridade] = useState(contatoExistente?.nivel_prioridade || 1);
  const [notificarSms, setNotificarSms] = useState(
    contatoExistente ? Boolean(contatoExistente.notificar_sms) : true
  );
  const [notificarWhatsapp, setNotificarWhatsapp] = useState(
    contatoExistente ? Boolean(contatoExistente.notificar_whatsapp) : true
  );

  const inicial = nome.trim() ? nome.trim().charAt(0).toUpperCase() : 'M';

  const handleSalvar = () => {
    if (!nome.trim() || !telefone.trim()) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha o nome e o telefone do contato.');
      return;
    }

    Alert.alert(
      'Sucesso',
      modoEdicao ? 'Contato atualizado com sucesso!' : 'Contato adicionado com sucesso!',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const handleExcluir = () => {
    Alert.alert(
      'Excluir contato',
      `Tem certeza de que deseja remover ${nome || 'este contato'} do seu Círculo de Confiança?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Removido', 'Contato removido com sucesso.', [
              { text: 'OK', onPress: () => navigation.goBack() },
            ]);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.tela}>
      <ScrollView
        contentContainerStyle={styles.scrollConteudo}
        showsVerticalScrollIndicator={false}
      >
        {/* Topo com botão Voltar e Título */}
        <View style={styles.topo}>
          <Pressable
            style={({ pressed }) => [
              styles.botaoVoltar,
              pressed && styles.botaoVoltarPressionado,
            ]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={22} color={colors.grafite} />
          </Pressable>

          <Text style={styles.titulo}>
            {modoEdicao ? 'Editar contato' : 'Novo contato'}
          </Text>
        </View>

        {/* Avatar com inicial grande */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarTexto}>{inicial}</Text>
          </View>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
          {/* Campo Nome */}
          <View style={styles.campoGrupo}>
            <Text style={styles.rotulo}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome do contato"
              placeholderTextColor={colors.cinza}
              value={nome}
              onChangeText={setNome}
            />
          </View>

          {/* Campo Telefone ou WhatsApp */}
          <View style={styles.campoGrupo}>
            <Text style={styles.rotulo}>Telefone ou WhatsApp</Text>
            <View style={styles.inputComIcone}>
              <Ionicons
                name="call-outline"
                size={18}
                color={colors.cinza}
                style={styles.iconeInput}
              />
              <TextInput
                style={styles.inputTexto}
                placeholder="(00) 00000-0000"
                placeholderTextColor={colors.cinza}
                keyboardType="phone-pad"
                value={telefone}
                onChangeText={setTelefone}
              />
            </View>
          </View>

          {/* Campo Relação */}
          <View style={styles.campoGrupo}>
            <Text style={styles.rotulo}>Relação</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Mãe, Amiga, Vizinha"
              placeholderTextColor={colors.cinza}
              value={relacao}
              onChangeText={setRelacao}
            />
          </View>

          {/* Seleção de Prioridade (Chips / Segmented) */}
          <View style={styles.campoGrupo}>
            <Text style={styles.rotulo}>Prioridade</Text>
            <View style={styles.prioridadeContainer}>
              {[1, 2, 3].map((nivel) => {
                const ativo = prioridade === nivel;
                return (
                  <Pressable
                    key={nivel}
                    style={[
                      styles.opcaoPrioridade,
                      ativo && styles.opcaoPrioridadeAtiva,
                    ]}
                    onPress={() => setPrioridade(nivel)}
                  >
                    <Text
                      style={[
                        styles.textoPrioridade,
                        ativo && styles.textoPrioridadeAtivo,
                      ]}
                    >
                      {PRIORIDADES[nivel]}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Switches de notificação */}
          <View style={styles.switchesSecao}>
            <View style={styles.linhaSwitch}>
              <View style={styles.linhaSwitchEsquerda}>
                <Ionicons
                  name="chatbubble-outline"
                  size={20}
                  color={colors.grafite}
                  style={styles.iconeSwitch}
                />
                <Text style={styles.textoSwitch}>Avisar por SMS</Text>
              </View>
              <Switch
                value={notificarSms}
                onValueChange={setNotificarSms}
                trackColor={{ false: colors.begeDivisor, true: colors.verdeProfundo }}
                thumbColor={colors.branco}
              />
            </View>

            <View style={styles.divisorSwitch} />

            <View style={styles.linhaSwitch}>
              <View style={styles.linhaSwitchEsquerda}>
                <Ionicons
                  name="call-outline"
                  size={20}
                  color={colors.grafite}
                  style={styles.iconeSwitch}
                />
                <Text style={styles.textoSwitch}>Avisar por WhatsApp</Text>
              </View>
              <Switch
                value={notificarWhatsapp}
                onValueChange={setNotificarWhatsapp}
                trackColor={{ false: colors.begeDivisor, true: colors.verdeProfundo }}
                thumbColor={colors.branco}
              />
            </View>
          </View>

          {/* Botão Salvar Contato */}
          <BotaoPrimario
            titulo="Salvar contato"
            onPress={handleSalvar}
            style={styles.botaoSalvar}
          />

          {/* Botão Excluir Contato (visível no modo edição) */}
          {modoEdicao && (
            <Pressable
              style={({ pressed }) => [
                styles.botaoExcluir,
                pressed && styles.botaoExcluirPressionado,
              ]}
              onPress={handleExcluir}
            >
              <Text style={styles.textoExcluir}>Excluir contato</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: colors.creme,
  },
  scrollConteudo: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  topo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  botaoVoltar: {
    width: 42,
    height: 42,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.begeDivisor,
    backgroundColor: colors.branco,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  botaoVoltarPressionado: {
    opacity: 0.7,
  },
  titulo: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.grafite,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.pessegoClaro,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTexto: {
    fontFamily: fonts.bold,
    fontSize: 28,
    color: colors.grafite,
  },
  form: {
    width: '100%',
  },
  campoGrupo: {
    marginBottom: 16,
  },
  rotulo: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.cinza,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.branco,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.begeDivisor,
    paddingHorizontal: 16,
    height: 52,
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.grafite,
  },
  inputComIcone: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.branco,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.begeDivisor,
    paddingHorizontal: 16,
    height: 52,
  },
  iconeInput: {
    marginRight: 10,
  },
  inputTexto: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.grafite,
  },
  prioridadeContainer: {
    flexDirection: 'row',
    backgroundColor: colors.branco,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.begeDivisor,
    padding: 4,
    height: 52,
  },
  opcaoPrioridade: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  opcaoPrioridadeAtiva: {
    backgroundColor: colors.pessegoClaro,
  },
  textoPrioridade: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.cinza,
  },
  textoPrioridadeAtivo: {
    fontFamily: fonts.bold,
    color: colors.grafite,
  },
  switchesSecao: {
    marginVertical: 12,
  },
  linhaSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  linhaSwitchEsquerda: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconeSwitch: {
    marginRight: 12,
  },
  textoSwitch: {
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.grafite,
  },
  divisorSwitch: {
    height: 1,
    backgroundColor: colors.begeCard,
  },
  botaoSalvar: {
    marginTop: 20,
    marginBottom: 16,
  },
  botaoExcluir: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  botaoExcluirPressionado: {
    opacity: 0.7,
  },
  textoExcluir: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.coral,
  },
});
