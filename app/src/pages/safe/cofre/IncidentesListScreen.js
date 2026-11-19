// ============================================================
// TELA 10: Cofre de Incidentes
//
// Componente: IncidentesListScreen
// Navegação: Tab (aba Cofre), raiz do CofreStack
// Responsável: João Pedro
// Entrega Final: Integrado à API REST (Issue #81)
//
// O que o protótipo (safe-06-cofre-lista.png) mostra nesta tela:
//   * Topo com texto "Só você vê estes registros" e ícone de cadeado
//   * Título "Cofre de Incidentes"
//   * Chips de filtro por tipo: Todos, Verbal, Física, Patrimonial, Virtual
//   * Linha do tempo com marcadores coloridos, data, título, resumo e evidências
//   * Estados visuais: carregando, lista vazia e erro da API
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
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';
import Chip from '../../../components/Chip';
import { listarIncidentes } from '../../../services/api';
import { idUsuariaAtual } from '../../../services/sessao';
import {
  TIPOS_VIOLENCIA,
  TIPO_PADRAO,
  formatarDataIncidente,
  extrairEvidencias,
  resumirTituloIncidente,
} from '../../../services/incidentes';

const FILTROS = ['Todos', 'Verbal', 'Física', 'Patrimonial', 'Virtual'];

export default function IncidentesListScreen({ navigation }) {
  const [listaIncidentes, setListaIncidentes] = useState([]);
  const [filtroAtivo, setFiltroAtivo] = useState('Todos');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregarIncidentes = async () => {
    try {
      setCarregando(true);
      setErro(null);
      const dados = await listarIncidentes(await idUsuariaAtual());
      setListaIncidentes(Array.isArray(dados) ? dados : []);
    } catch (err) {
      setErro(err.message || 'Não foi possível carregar os registros do cofre.');
    } finally {
      setCarregando(false);
    }
  };

  // Atualiza a lista sempre que a tela ganha foco (ao voltar de criação, edição ou exclusão)
  useFocusEffect(
    useCallback(() => {
      carregarIncidentes();
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
      'Os registros ficam guardados na área protegida do app, que só abre com o seu PIN secreto. Eles não aparecem no Pratô.',
      [{ text: 'Entendi' }]
    );
  };

  const renderItem = ({ item, index }) => {
    const tipoInfo = TIPOS_VIOLENCIA[item.tipo_violencia] || TIPO_PADRAO;
    const evidenciasInfo = extrairEvidencias(item.anexo_evidencia_url);
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
          onPress={() => navigation.navigate('IncidenteDetalhe', { id: item.id })}
        >
          {/* Topo do Card: Data/Hora e Badge do Tipo */}
          <View style={estilos.cardCabecalho}>
            <Text style={estilos.cardData}>
              {formatarDataIncidente(item.data_ocorrencia)}
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
            {resumirTituloIncidente(item)}
          </Text>

          {/* Resumo do Relato */}
          <Text style={estilos.cardRelato} numberOfLines={2}>
            {item.relato_detalhado}
          </Text>

          {/* Rodapé: Quantidade e Tipo de Evidências */}
          {Boolean(evidenciasInfo.label) && (
            <View style={estilos.cardEvidenciaLinha}>
              <Ionicons
                name="document-text-outline"
                size={14}
                color={colors.cinza}
                style={estilos.iconeEvidencia}
              />
              <Text style={estilos.cardEvidenciaTexto}>
                {evidenciasInfo.label}
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

      {/* Estado de Erro */}
      {erro && (
        <View style={estilos.erroCard}>
          <Ionicons name="alert-circle-outline" size={22} color={colors.coral} style={estilos.erroIcone} />
          <View style={estilos.erroInfo}>
            <Text style={estilos.erroTexto}>{erro}</Text>
            <Pressable style={estilos.botaoTentarNovamente} onPress={carregarIncidentes}>
              <Text style={estilos.botaoTentarTexto}>Tentar novamente</Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* Lista / Linha do tempo dos Incidentes */}
      {carregando && listaIncidentes.length === 0 ? (
        <View style={estilos.loadingContainer}>
          <ActivityIndicator size="large" color={colors.coral} />
          <Text style={estilos.loadingTexto}>Carregando registros do cofre...</Text>
        </View>
      ) : (
        <FlatList
          data={incidentesFiltrados}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={estilos.listaConteudo}
          showsVerticalScrollIndicator={false}
          refreshing={carregando}
          onRefresh={carregarIncidentes}
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
      )}

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
});