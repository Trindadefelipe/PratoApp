// ============================================================
// TELA 12: Detalhe do incidente
//
// Componente: IncidenteDetalheScreen
// Navegação: Stack (push ao abrir um item da lista)
// Responsável: João Pedro
// Entrega Final: Integrado à API REST (Issue #81)
//
// O que o protótipo (safe-08-incidente-detalhe.png / Seção 4, Página 8) mostra nesta tela:
//   * Topo com botão Voltar, título "Incidente", botão de editar e botão de excluir
//   * Linha com badge de tipo de violência e data/hora por extenso
//   * Linha com ícone de localização e local do fato
//   * Seção "Relato" com o depoimento completo
//   * Seção "Notas adicionais"
//   * Seção "Evidências" com cards estilizados (Áudio, Captura, Foto)
//   * Botão em destaque verde "Exportar com segurança"
//   * Carregamento por GET /incidentes/:id e exclusão via DELETE /incidentes/:id
// ============================================================

import React, { useState, useCallback, useLayoutEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
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
import { buscarIncidente, removerIncidente } from '../../../services/api';
import {
  TIPOS_VIOLENCIA,
  TIPO_PADRAO,
  formatarDataIncidente,
  extrairEvidencias,
} from '../../../services/incidentes';

export default function IncidenteDetalheScreen({ navigation, route }) {
  const idIncidente = route.params?.id || route.params?.incidente?.id;
  const [incidente, setIncidente] = useState(route.params?.incidente || null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [confirmandoExcluir, setConfirmandoExcluir] = useState(false);
  const [excluindo, setExcluindo] = useState(false);

  // Oculta o header nativo para exibir o cabeçalho customizado idêntico ao protótipo
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const carregarIncidente = async () => {
    if (!idIncidente) {
      setErro('Incidente não encontrado.');
      setCarregando(false);
      return;
    }

    try {
      setCarregando(true);
      setErro(null);
      const dados = await buscarIncidente(idIncidente);
      setIncidente(dados);
    } catch (err) {
      setErro(err.message || 'Não foi possível carregar o incidente.');
    } finally {
      setCarregando(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarIncidente();
    }, [idIncidente])
  );

  if (carregando && !incidente) {
    return (
      <SafeAreaView style={estilos.tela} edges={['top']}>
        <View style={estilos.erroContainer}>
          <ActivityIndicator size="large" color={colors.coral} />
          <Text style={estilos.loadingTexto}>Carregando incidente...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!incidente) {
    return (
      <SafeAreaView style={estilos.tela} edges={['top']}>
        <View style={estilos.erroContainer}>
          <Text style={estilos.erroTexto}>{erro || 'Incidente não encontrado.'}</Text>
          <View style={estilos.erroAcoes}>
            {Boolean(idIncidente) && (
              <Pressable
                style={estilos.botaoVoltarSimples}
                onPress={carregarIncidente}
              >
                <Text style={estilos.botaoVoltarTexto}>Tentar novamente</Text>
              </Pressable>
            )}
            <Pressable
              style={estilos.botaoVoltarSimples}
              onPress={() => navigation.goBack()}
            >
              <Text style={estilos.botaoVoltarTexto}>Voltar</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const tipoInfo = TIPOS_VIOLENCIA[incidente.tipo_violencia] || TIPO_PADRAO;
  const evidenciasCards = extrairEvidencias(incidente.anexo_evidencia_url).cards;

  const handleEditar = () => {
    navigation.navigate('IncidenteForm', { incidente });
  };

  const handleExcluir = async () => {
    setErro(null);
    try {
      setExcluindo(true);
      await removerIncidente(incidente.id);
      navigation.goBack();
    } catch (err) {
      setErro(err.message || 'Falha ao excluir registro na API.');
      setConfirmandoExcluir(false);
    } finally {
      setExcluindo(false);
    }
  };

  const handleExportar = () => {
    Alert.alert(
      'Exportar com segurança',
      'Simulação: na versão final, este registro vira um relatório para enviar à Delegacia da Mulher, à Defensoria Pública ou anexar a um pedido de medida protetiva de urgência.',
      [
        { text: 'Entendi' },
        {
          text: 'Simular envio',
          onPress: () => {
            Alert.alert(
              'Dossiê pronto',
              'Envio simulado. Nenhum arquivo foi gerado nem enviado.'
            );
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={estilos.tela} edges={['top']}>
      <ScrollView
        contentContainerStyle={estilos.scrollConteudo}
        showsVerticalScrollIndicator={false}
      >
        {/* Topo com Voltar, Título e Ações (Editar e Excluir) */}
        <View style={estilos.topo}>
          <View style={estilos.topoEsquerda}>
            <Pressable
              style={({ pressed }) => [
                estilos.botaoAcao,
                pressed && estilos.botaoAcaoPressionado,
              ]}
              onPress={() => navigation.goBack()}
              hitSlop={8}
              accessibilityLabel="Voltar"
            >
              <Ionicons name="chevron-back" size={22} color={colors.grafite} />
            </Pressable>

            <Text style={estilos.tituloTopo}>Incidente</Text>
          </View>

          <View style={estilos.acoesDireita}>
            {/* Botão Editar */}
            <Pressable
              style={({ pressed }) => [
                estilos.botaoAcao,
                pressed && estilos.botaoAcaoPressionado,
              ]}
              onPress={handleEditar}
              hitSlop={8}
              accessibilityLabel="Editar registro"
            >
              <Ionicons name="pencil-outline" size={20} color={colors.grafite} />
            </Pressable>

            {/* Botão Excluir */}
            <Pressable
              style={({ pressed }) => [
                estilos.botaoAcao,
                pressed && estilos.botaoAcaoPressionado,
              ]}
              onPress={() => {
                setErro(null);
                setConfirmandoExcluir((atual) => !atual);
              }}
              disabled={excluindo}
              hitSlop={8}
              accessibilityLabel="Excluir registro"
            >
              <Ionicons name="trash-outline" size={20} color={colors.coral} />
            </Pressable>
          </View>
        </View>

        {/* Mensagem de erro da API */}
        {erro && (
          <View style={estilos.erroBanner}>
            <Ionicons name="alert-circle" size={20} color={colors.coral} style={estilos.erroBannerIcone} />
            <Text style={estilos.erroBannerTexto}>{erro}</Text>
          </View>
        )}

        {/* Confirmação inline de exclusão */}
        {confirmandoExcluir && (
          <View style={estilos.confirmacao}>
            <Text style={estilos.confirmacaoTexto}>
              Remover este registro do seu cofre? Esta ação não pode ser desfeita.
            </Text>
            <View style={estilos.confirmacaoBotoes}>
              <Pressable
                style={estilos.botaoConfirmacao}
                onPress={() => setConfirmandoExcluir(false)}
                disabled={excluindo}
              >
                <Text style={estilos.textoCancelar}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={estilos.botaoConfirmacao}
                onPress={handleExcluir}
                disabled={excluindo}
              >
                {excluindo ? (
                  <ActivityIndicator size="small" color={colors.coral} />
                ) : (
                  <Text style={estilos.textoExcluir}>Excluir</Text>
                )}
              </Pressable>
            </View>
          </View>
        )}

        {/* Linha 1: Badge de Tipo de Violência e Data/Hora */}
        <View style={estilos.linhaMeta}>
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
              {tipoInfo.rotulo}
            </Text>
          </View>

          <Text style={estilos.dataTexto}>
            {formatarDataIncidente(incidente.data_ocorrencia, true)}
          </Text>
        </View>

        {/* Linha 2: Local da ocorrência com ícone de pin */}
        <View style={estilos.linhaLocal}>
          <Ionicons
            name="location-outline"
            size={18}
            color={colors.cinza}
            style={estilos.iconeLocal}
          />
          <Text style={estilos.localTexto}>
            {incidente.local_ocorrencia || 'Local não informado'}
          </Text>
        </View>

        {/* Seção Relato */}
        <View style={estilos.secao}>
          <Text style={estilos.secaoTitulo}>Relato</Text>
          <Text style={estilos.relatoTexto}>
            {incidente.relato_detalhado}
          </Text>
        </View>

        {/* Seção Notas Adicionais */}
        <View style={estilos.secao}>
          <Text style={estilos.secaoTitulo}>Notas adicionais</Text>
          <Text style={estilos.notasTexto}>
            {incidente.notas_adicionais || 'Nenhuma nota adicional registrada.'}
          </Text>
        </View>

        {/* Seção Evidências */}
        <View style={estilos.secao}>
          <Text style={estilos.secaoTitulo}>Evidências</Text>
          {evidenciasCards.length > 0 ? (
            <View style={estilos.evidenciasCardsContainer}>
              {evidenciasCards.map((ev) => (
                <View
                  key={ev.id || ev.label}
                  style={[
                    estilos.cardEvidencia,
                    { backgroundColor: ev.corBg || colors.pessegoClaro },
                  ]}
                >
                  <Ionicons
                    name={ev.icone || 'document-outline'}
                    size={24}
                    color={ev.corTexto || colors.grafite}
                  />
                  <Text
                    style={[
                      estilos.cardEvidenciaTexto,
                      { color: ev.corTexto || colors.grafite },
                    ]}
                  >
                    {ev.label}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={estilos.notasTexto}>Nenhuma evidência anexada.</Text>
          )}
        </View>

        {/* Botão Exportar com Segurança */}
        <Pressable
          style={({ pressed }) => [
            estilos.botaoExportar,
            pressed && estilos.botaoExportarPressionado,
          ]}
          onPress={handleExportar}
          accessibilityLabel="Exportar com segurança"
        >
          <Ionicons
            name="share-outline"
            size={20}
            color={colors.branco}
            style={estilos.iconeExportar}
          />
          <Text style={estilos.botaoExportarTexto}>
            Exportar com segurança
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: colors.creme,
  },

  scrollConteudo: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 90,
  },

  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  topoEsquerda: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  tituloTopo: {
    fontFamily: fonts.bold,
    fontSize: 26,
    color: colors.grafite,
  },

  acoesDireita: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  botaoAcao: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.branco,
    borderWidth: 1,
    borderColor: colors.begeDivisor,
    alignItems: 'center',
    justifyContent: 'center',
  },

  botaoAcaoPressionado: {
    opacity: 0.7,
  },

  linhaMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },

  badgeTipo: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },

  badgeTipoTexto: {
    fontFamily: fonts.semibold,
    fontSize: 13,
  },

  dataTexto: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.cinza,
  },

  linhaLocal: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },

  iconeLocal: {
    marginRight: 6,
  },

  localTexto: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.grafite,
  },

  secao: {
    marginBottom: 20,
  },

  secaoTitulo: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.grafite,
    marginBottom: 8,
  },

  relatoTexto: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.grafite,
    lineHeight: 22,
  },

  notasTexto: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.cinza,
    lineHeight: 22,
  },

  evidenciasCardsContainer: {
    flexDirection: 'row',
    gap: 12,
  },

  cardEvidencia: {
    width: 106,
    height: 84,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 8,
  },

  cardEvidenciaTexto: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    textAlign: 'center',
  },

  botaoExportar: {
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.verdeProfundo,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    marginBottom: 20,
    elevation: 3,
    shadowColor: colors.preto,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  botaoExportarPressionado: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },

  iconeExportar: {
    marginRight: 8,
  },

  botaoExportarTexto: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    color: colors.branco,
  },

  erroContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  erroTexto: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: colors.coral,
    marginBottom: 16,
  },

  botaoVoltarSimples: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.pessegoPastel,
    borderRadius: 10,
  },

  botaoVoltarTexto: {
    fontFamily: fonts.semibold,
    color: colors.grafite,
  },

  loadingTexto: {
    marginTop: 12,
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.cinza,
  },

  erroAcoes: {
    flexDirection: 'row',
    gap: 12,
  },

  erroBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.pessegoClaro,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.coral,
  },

  erroBannerIcone: {
    marginRight: 8,
  },

  erroBannerTexto: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.coral,
    lineHeight: 18,
  },

  confirmacao: {
    backgroundColor: colors.coralClaro,
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
  },

  confirmacaoTexto: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.grafite,
    textAlign: 'center',
  },

  confirmacaoBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },

  botaoConfirmacao: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  textoCancelar: {
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.grafite,
  },

  textoExcluir: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.coral,
  },
});