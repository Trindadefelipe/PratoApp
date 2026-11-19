// ============================================================
// TELA 06: Círculo de Confiança
//
// Componente: ContatosListScreen
// Navegação: Tab (aba Círculo), raiz do CirculoStack
// Responsável: Felipe Trindade
// Entrega Final: Integrado à API REST (Issue #70)
//
// O que o protótipo mostra nesta tela:
//   * Busca de contato e aviso sobre prioridade Alta
//   * Lista de contatos da usuária via API com relação, telefone, prioridade e canais
//   * Estados visuais: carregando, lista vazia e erro da API
//   * Botão flutuante + para criar contato
// ============================================================

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';
import { listarContatos, PRIORIDADES } from '../../../services/api';
import { idUsuariaAtual } from '../../../services/sessao';

export default function ContatosListScreen({ navigation }) {
  const [busca, setBusca] = useState('');
  const [listaContatos, setListaContatos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregarContatos = async () => {
    try {
      setCarregando(true);
      setErro(null);
      // Contatos da usuária deste celular (ou da usuária de teste, sem primeiro acesso)
      const dados = await listarContatos(await idUsuariaAtual());
      setListaContatos(dados || []);
    } catch (err) {
      setErro(err.message || 'Não foi possível carregar os contatos de confiança.');
    } finally {
      setCarregando(false);
    }
  };

  // Recarrega sempre que a tela ganha foco (ao voltar da criação/edição/exclusão)
  useFocusEffect(
    useCallback(() => {
      carregarContatos();
    }, [])
  );

  // Filtragem da busca por nome ou relação
  const contatosFiltrados = listaContatos.filter((c) => {
    const termo = busca.toLowerCase();
    const nomeMatch = c.nome?.toLowerCase().includes(termo);
    const relacaoMatch = c.parentesco_relacao?.toLowerCase().includes(termo);
    return nomeMatch || relacaoMatch;
  });

  // Cores dinâmicas para o avatar de inicial
  const obterCorAvatar = (index) => {
    const paletaAvatares = [
      { bg: colors.pessegoClaro, text: colors.coral },
      { bg: colors.verdeClaro, text: colors.verdeProfundo },
      { bg: colors.amareloClaro, text: colors.amareloEscuro },
      { bg: colors.coralClaro, text: colors.coral },
    ];
    return paletaAvatares[index % paletaAvatares.length];
  };

  // Badge de prioridade (nivel_prioridade: 1 = Alta, 2 = Média, 3 = Baixa)
  const renderBadgePrioridade = (nivel) => {
    let estiloBadge = styles.badgeAlta;
    let estiloTexto = styles.badgeTextoAlta;

    if (nivel === 2) {
      estiloBadge = styles.badgeMedia;
      estiloTexto = styles.badgeTextoMedia;
    } else if (nivel === 3) {
      estiloBadge = styles.badgeBaixa;
      estiloTexto = styles.badgeTextoBaixa;
    }

    return (
      <View style={[styles.badgeBase, estiloBadge]}>
        <Text style={[styles.badgeTextoBase, estiloTexto]}>
          {PRIORIDADES[nivel] || 'Normal'}
        </Text>
      </View>
    );
  };

  const renderItem = ({ item, index }) => {
    const inicial = item.nome ? item.nome.charAt(0).toUpperCase() : '?';
    const corAvatar = obterCorAvatar(index);

    return (
      <Pressable
        style={({ pressed }) => [
          styles.itemCard,
          pressed && styles.itemCardPressionado,
        ]}
        onPress={() => navigation.navigate('ContatoForm', { contato: item })}
      >
        {/* Avatar com inicial */}
        <View style={[styles.avatar, { backgroundColor: corAvatar.bg }]}>
          <Text style={[styles.avatarTexto, { color: corAvatar.text }]}>
            {inicial}
          </Text>
        </View>

        {/* Informações centrais */}
        <View style={styles.infoContainer}>
          <View style={styles.linhaNome}>
            <Text style={styles.nomeContato}>{item.nome}</Text>
            {item.parentesco_relacao ? (
              <Text style={styles.relacaoContato}>
                {' '}({item.parentesco_relacao})
              </Text>
            ) : null}
          </View>
          <Text style={styles.telefoneContato}>{item.telefone}</Text>
        </View>

        {/* Coluna direita: Badge de prioridade e canais */}
        <View style={styles.ladoDireitoContainer}>
          {renderBadgePrioridade(item.nivel_prioridade)}

          <View style={styles.canaisContainer}>
            {item.notificar_sms && (
              <Ionicons
                name="chatbubble-outline"
                size={16}
                color={colors.cinza}
                style={styles.iconeCanal}
              />
            )}
            {item.notificar_whatsapp && (
              <Ionicons
                name="call-outline"
                size={16}
                color={colors.cinza}
                style={styles.iconeCanal}
              />
            )}
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.tela}>
      {/* Cabeçalho */}
      <View style={styles.cabecalho}>
        <Text style={styles.contadorPessoas}>
          {contatosFiltrados.length} {contatosFiltrados.length === 1 ? 'pessoa' : 'pessoas'}
        </Text>
        <Text style={styles.titulo}>Círculo de Confiança</Text>
      </View>

      {/* Barra de busca */}
      <View style={styles.campoBuscaContainer}>
        <Ionicons name="search-outline" size={20} color={colors.cinza} />
        <TextInput
          style={styles.inputBusca}
          placeholder="Buscar contato"
          placeholderTextColor={colors.cinza}
          value={busca}
          onChangeText={setBusca}
        />
        {busca.length > 0 && (
          <Pressable onPress={() => setBusca('')}>
            <Ionicons name="close-circle" size={18} color={colors.cinza} />
          </Pressable>
        )}
      </View>

      {/* Card informativo de aviso */}
      <View style={styles.avisoCard}>
        <Ionicons
          name="notifications-outline"
          size={20}
          color={colors.coral}
          style={styles.avisoIcone}
        />
        <Text style={styles.avisoTexto}>
          Quem tem prioridade Alta recebe seu alerta primeiro.
        </Text>
      </View>

      {/* Estado de Erro */}
      {erro && (
        <View style={styles.erroCard}>
          <Ionicons name="alert-circle-outline" size={22} color={colors.coral} style={styles.erroIcone} />
          <View style={styles.erroInfo}>
            <Text style={styles.erroTexto}>{erro}</Text>
            <Pressable style={styles.botaoTentarNovamente} onPress={carregarContatos}>
              <Text style={styles.botaoTentarTexto}>Tentar novamente</Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* Estado de Carregamento inicial */}
      {carregando && listaContatos.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.coral} />
          <Text style={styles.loadingTexto}>Carregando contatos de confiança...</Text>
        </View>
      ) : (
        /* Lista de contatos */
        <FlatList
          data={contatosFiltrados}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.listaConteudo}
          showsVerticalScrollIndicator={false}
          refreshing={carregando}
          onRefresh={carregarContatos}
          ItemSeparatorComponent={() => <View style={styles.separador} />}
          ListEmptyComponent={() => (
            <View style={styles.vazioContainer}>
              <Ionicons name="people-outline" size={40} color={colors.cinza} style={{ marginBottom: 8 }} />
              <Text style={styles.vazioTitulo}>
                {busca.length > 0 ? 'Nenhum contato encontrado' : 'Seu Círculo está vazio'}
              </Text>
              <Text style={styles.vazioTexto}>
                {busca.length > 0
                  ? 'Tente buscar por outro nome ou parentesco.'
                  : 'Adicione pessoas de extrema confiança para receberem seus alertas de emergência.'}
              </Text>
            </View>
          )}
        />
      )}

      {/* Botão flutuante (+) para criar novo contato */}
      <Pressable
        style={({ pressed }) => [
          styles.fab,
          pressed && styles.fabPressionado,
        ]}
        onPress={() => navigation.navigate('ContatoForm')}
      >
        <Ionicons name="add" size={32} color={colors.grafite} />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: colors.creme,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  cabecalho: {
    marginBottom: 16,
  },
  contadorPessoas: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.cinza,
    marginBottom: 4,
  },
  titulo: {
    fontFamily: fonts.bold,
    fontSize: 26,
    color: colors.grafite,
  },
  campoBuscaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.branco,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.begeDivisor,
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 14,
  },
  inputBusca: {
    flex: 1,
    marginLeft: 10,
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.grafite,
  },
  avisoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.pessegoSuave,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  avisoIcone: {
    marginRight: 10,
  },
  avisoTexto: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.grafite,
    lineHeight: 18,
  },
  erroCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.pessegoClaro,
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },
  erroIcone: {
    marginRight: 10,
    marginTop: 2,
  },
  erroInfo: {
    flex: 1,
  },
  erroTexto: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.coral,
    marginBottom: 8,
  },
  botaoTentarNovamente: {
    alignSelf: 'flex-start',
    backgroundColor: colors.coral,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  botaoTentarTexto: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    color: colors.branco,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
  },
  loadingTexto: {
    marginTop: 12,
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.cinza,
  },
  listaConteudo: {
    paddingBottom: 90,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  itemCardPressionado: {
    opacity: 0.7,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarTexto: {
    fontFamily: fonts.bold,
    fontSize: 18,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  linhaNome: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  nomeContato: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    color: colors.grafite,
  },
  relacaoContato: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.cinza,
  },
  telefoneContato: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.cinza,
    marginTop: 2,
  },
  ladoDireitoContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  badgeBase: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 6,
  },
  badgeTextoBase: {
    fontFamily: fonts.semibold,
    fontSize: 12,
  },
  badgeAlta: {
    backgroundColor: colors.pessegoClaro,
  },
  badgeTextoAlta: {
    color: colors.coral,
  },
  badgeMedia: {
    backgroundColor: colors.amareloClaro,
  },
  badgeTextoMedia: {
    color: colors.amareloEscuro,
  },
  badgeBaixa: {
    backgroundColor: colors.verdeClaro,
  },
  badgeTextoBaixa: {
    color: colors.verdeProfundo,
  },
  canaisContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconeCanal: {
    marginLeft: 6,
  },
  separador: {
    height: 1,
    backgroundColor: colors.begeCard,
    marginVertical: 4,
  },
  vazioContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  vazioTitulo: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.grafite,
    marginBottom: 4,
  },
  vazioTexto: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.cinza,
    textAlign: 'center',
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.pessegoPastel,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: colors.preto,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  fabPressionado: {
    transform: [{ scale: 0.95 }],
  },
});
