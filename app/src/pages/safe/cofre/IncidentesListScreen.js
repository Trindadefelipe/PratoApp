// ============================================================
// TELA 10: Cofre de Incidentes
//
// Componente: IncidentesListScreen
// Navegação: Tab (aba Cofre), raiz do CofreStack
// Responsável: João Pedro (Issue #58)
// Entrega: 2 (24/10)
//
// O que o protótipo (safe-06-cofre-lista.png) mostra nesta tela:
//   * Topo com texto "Só você vê estes registros" e ícone de cadeado
//   * Título "Cofre de Incidentes"
//   * Chips de filtro por tipo: Todos, Verbal, Física, Patrimonial, Virtual
//   * Linha do tempo com marcadores coloridos, data, título, resumo e evidências
//   * Botão flutuante (+) para abrir a Tela 11 (Novo registro)
//   * Toque no card abrindo a Tela 12 (Detalhe do incidente)
// ============================================================

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';
import Chip from '../../../components/Chip';
import {
  obterIncidentes,
  TIPOS_VIOLENCIA,
} from '../../../data/incidentes';

const FILTROS = ['Todos', 'Verbal', 'Física', 'Patrimonial', 'Virtual'];

function formatarDataLinhaTempo(dataIso) {
  if (!dataIso) return '';
  const meses = [
    'jan', 'fev', 'mar', 'abr', 'mai', 'jun',
    'jul', 'ago', 'set', 'out', 'nov', 'dez',
  ];

  try {
    const data = new Date(dataIso);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = meses[data.getMonth()];
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    return `${dia} ${mes}, ${horas}:${minutos}`;
  } catch (e) {
    return dataIso;
  }
}

export default function IncidentesListScreen({ navigation }) {
  const [listaIncidentes, setListaIncidentes] = useState([]);
  const [filtroAtivo, setFiltroAtivo] = useState('Todos');

  // Atualiza a lista sempre que a tela ganha foco (ao voltar de criação, edição ou exclusão)
  useFocusEffect(
    useCallback(() => {
      setListaIncidentes(obterIncidentes());
    }, [])
  );

  // Filtragem dos registros pelos chips
  const incidentesFiltrados = listaIncidentes.filter((item) => {
    if (filtroAtivo === 'Todos') return true;
    const tipoInfo = TIPOS_VIOLENCIA[item.tipo_violencia];
    return tipoInfo?.filtro === filtroAtivo;
  });

  const handleAjudaCofre = () => {
    Alert.alert(
      'Cofre Protegido',
      'Todos os registros são armazenados de forma sigilosa e criptografada. Somente você possui acesso com o seu PIN secreto.',
      [{ text: 'Entendi' }]
    );
  };

  const renderItem = ({ item, index }) => {
    const tipoInfo = TIPOS_VIOLENCIA[item.tipo_violencia] || {
      rotulo: 'Incidente',
      filtro: 'Geral',
      corBadgeBg: colors.pessegoClaro,
      corBadgeTexto: colors.marromEscuro,
      corPonto: colors.coral,
    };

    const isUltimo = index === incidentesFiltrados.length - 1;

    return (
      <View style={estilos.linhaItem}>
        {/* Coluna da Linha do Tempo: Ponto indicador e linha contínua */}
        <View style={estilos.colunaTimeline}>
          <View
            style={[
              estilos.marcadorPonto,
              { backgroundColor: tipoInfo.corPonto },
            ]}
          />
          {!isUltimo && <View style={estilos.linhaConectora} />}
        </View>

        {/* Card do Incidente */}
        <Pressable
          style={({ pressed }) => [
            estilos.card,
            pressed && estilos.cardPressionado,
          ]}
          onPress={() => navigation.navigate('IncidenteDetalhe', { incidente: item })}
        >
          {/* Topo do Card: Data/Hora e Badge do Tipo */}
          <View style={estilos.cardCabecalho}>
            <Text style={estilos.cardData}>
              {formatarDataLinhaTempo(item.data_ocorrencia)}
            </Text>
            <View
              style={[
                estilos.badgeTipo,
                { backgroundColor: tipoInfo.corBadgeBg },
              ]}
            >
              <Text
                style={[
                  estilos.badgeTipoTexto,
                  { color: tipoInfo.corBadgeTexto },
                ]}
              >
                {tipoInfo.filtro}
              </Text>
            </View>
          </View>

          {/* Título do Registro */}
          <Text style={estilos.cardTitulo}>
            {item.titulo_curto || item.tipo_violencia}
          </Text>

          {/* Resumo do Relato */}
          <Text style={estilos.cardRelato} numberOfLines={2}>
            {item.relato_detalhado}
          </Text>

          {/* Rodapé: Quantidade e Tipo de Evidências */}
          {Boolean(item.evidencia_label) && (
            <View style={estilos.cardEvidenciaLinha}>
              <Ionicons
                name="document-text-outline"
                size={14}
                color={colors.cinza}
                style={estilos.iconeEvidencia}
              />
              <Text style={estilos.cardEvidenciaTexto}>
                {item.evidencia_label}
              </Text>
            </View>
          )}
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={estilos.tela} edges={['top']}>
      {/* Topo: Texto sigiloso e Ícone de cadeado */}
      <View style={estilos.topoLinha}>
        <View style={estilos.topoTextoContainer}>
          <Text style={estilos.subtituloSegredo}>Só você vê estes registros</Text>
          <Text style={estilos.tituloPrincipal}>Cofre de Incidentes</Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            estilos.botaoCadeado,
            pressed && estilos.botaoCadeadoPressionado,
          ]}
          onPress={handleAjudaCofre}
        >
          <Ionicons name="lock-closed" size={20} color={colors.verdeProfundo} />
        </Pressable>
      </View>

      {/* Barra de Filtros com Chips */}
      <View style={estilos.chipsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={estilos.chipsScroll}
        >
          {FILTROS.map((nomeFiltro) => (
            <Chip
              key={nomeFiltro}
              titulo={nomeFiltro}
              ativo={filtroAtivo === nomeFiltro}
              onPress={() => setFiltroAtivo(nomeFiltro)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Lista / Linha do tempo dos Incidentes */}
      <FlatList
        data={incidentesFiltrados}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={estilos.listaConteudo}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={estilos.vazioContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={48}
              color={colors.cinza}
              style={estilos.vazioIcone}
            />
            <Text style={estilos.vazioTitulo}>Nenhum registro encontrado</Text>
            <Text style={estilos.vazioTexto}>
              Toque no botão + abaixo para guardar com segurança um novo episódio.
            </Text>
          </View>
        )}
      />

      {/* Botão de Documento/Apoio no canto inferior esquerdo (conforme protótipo) */}
      <Pressable
        style={({ pressed }) => [
          estilos.botaoApoio,
          pressed && estilos.botaoApoioPressionado,
        ]}
        onPress={handleAjudaCofre}
        accessibilityLabel="Informações de segurança"
      >
        <Ionicons name="document-text-outline" size={22} color={colors.grafite} />
      </Pressable>

      {/* Botão Flutuante (+) para criar novo registro */}
      <Pressable
        style={({ pressed }) => [
          estilos.fab,
          pressed && estilos.fabPressionado,
        ]}
        onPress={() => navigation.navigate('IncidenteForm')}
        accessibilityLabel="Novo registro no cofre"
      >
        <Ionicons name="add" size={32} color={colors.grafite} />
      </Pressable>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: colors.creme,
    paddingHorizontal: 20,
    paddingTop: 8,
  },

  topoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  topoTextoContainer: {
    flex: 1,
  },

  subtituloSegredo: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.cinza,
    marginBottom: 2,
  },

  tituloPrincipal: {
    fontFamily: fonts.bold,
    fontSize: 26,
    color: colors.grafite,
  },

  botaoCadeado: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.branco,
    borderWidth: 1,
    borderColor: colors.begeDivisor,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },

  botaoCadeadoPressionado: {
    opacity: 0.7,
  },

  chipsContainer: {
    marginBottom: 16,
  },

  chipsScroll: {
    paddingRight: 10,
  },

  listaConteudo: {
    paddingBottom: 100,
  },

  linhaItem: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 16,
  },

  colunaTimeline: {
    width: 24,
    alignItems: 'center',
    marginRight: 12,
  },

  marcadorPonto: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 18,
    zIndex: 2,
  },

  linhaConectora: {
    width: 2,
    flex: 1,
    backgroundColor: colors.begeDivisor,
    marginTop: -4,
  },

  card: {
    flex: 1,
    backgroundColor: colors.branco,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.begeCard,
    padding: 16,
    shadowColor: colors.preto,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  cardPressionado: {
    opacity: 0.8,
    transform: [{ scale: 0.99 }],
  },

  cardCabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  cardData: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.cinza,
  },

  badgeTipo: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },

  badgeTipoTexto: {
    fontFamily: fonts.semibold,
    fontSize: 12,
  },

  cardTitulo: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.grafite,
    marginBottom: 6,
  },

  cardRelato: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.grafite,
    lineHeight: 19,
    marginBottom: 10,
  },

  cardEvidenciaLinha: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconeEvidencia: {
    marginRight: 6,
  },

  cardEvidenciaTexto: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.cinza,
  },

  vazioContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },

  vazioIcone: {
    marginBottom: 12,
  },

  vazioTitulo: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: colors.grafite,
    marginBottom: 6,
  },

  vazioTexto: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.cinza,
    textAlign: 'center',
    lineHeight: 19,
  },

  botaoApoio: {
    position: 'absolute',
    left: 20,
    bottom: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.branco,
    borderWidth: 1,
    borderColor: colors.begeDivisor,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: colors.preto,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  botaoApoioPressionado: {
    opacity: 0.7,
  },

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.pessegoPastel,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: colors.preto,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
  },

  fabPressionado: {
    transform: [{ scale: 0.95 }],
  },
});