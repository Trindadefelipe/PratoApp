// ============================================================
// TELA 06: Círculo de Confiança
//
// Componente: ContatosListScreen
// Navegação: Tab (aba Círculo), raiz do CirculoStack
// Responsável: Felipe Trindade
// Entrega: 2 (24/10)
//
// O que o protótipo (Entrega 1, seção 4) mostra nesta tela:
//   * Busca de contato e aviso sobre prioridade Alta
//   * Lista de contatos com relação, telefone, prioridade e canais (SMS, WhatsApp)
//   * Botão flutuante + para criar contato
// ============================================================

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';
import { contatos as contatosIniciais } from '../../../data/contatos';

export default function ContatosListScreen({ navigation }) {
  const [busca, setBusca] = useState('');
  const [listaContatos] = useState(contatosIniciais);

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
      { bg: '#FEF3C7', text: '#B45309' },
      { bg: '#FEE2E2', text: colors.coral },
    ];
    return paletaAvatares[index % paletaAvatares.length];
  };

  // Badge de prioridade
  const renderBadgePrioridade = (prioridade) => {
    let estiloBadge = styles.badgeAlta;
    let estiloTexto = styles.badgeTextoAlta;

    if (prioridade === 'Média') {
      estiloBadge = styles.badgeMedia;
      estiloTexto = styles.badgeTextoMedia;
    } else if (prioridade === 'Baixa') {
      estiloBadge = styles.badgeBaixa;
      estiloTexto = styles.badgeTextoBaixa;
    }

    return (
      <View style={[styles.badgeBase, estiloBadge]}>
        <Text style={[styles.badgeTextoBase, estiloTexto]}>{prioridade}</Text>
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
            {item.parentesco_relacao && (
              <Text style={styles.relacaoContato}>
                {' '}({item.parentesco_relacao})
              </Text>
            )}
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

      {/* Lista de contatos */}
      <FlatList
        data={contatosFiltrados}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listaConteudo}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separador} />}
        ListEmptyComponent={() => (
          <View style={styles.vazioContainer}>
            <Text style={styles.vazioTexto}>Nenhum contato encontrado.</Text>
          </View>
        )}
      />

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
    borderColor: '#E5E7EB',
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
    backgroundColor: '#FDE3CC80',
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
    backgroundColor: '#FDE3CC',
  },
  badgeTextoAlta: {
    color: colors.coral,
  },
  badgeMedia: {
    backgroundColor: '#FEF3C7',
  },
  badgeTextoMedia: {
    color: '#B45309',
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
    backgroundColor: '#F3F4F6',
    marginVertical: 4,
  },
  vazioContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  vazioTexto: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.cinza,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  fabPressionado: {
    transform: [{ scale: 0.95 }],
  },
});
