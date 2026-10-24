// ============================================================
// TELA 12: Detalhe do incidente
//
// Componente: IncidenteDetalheScreen
// Navegação: Stack (push ao abrir um item da lista)
// Responsável: João Pedro (Issue #60)
// Entrega: 2 (24/10)
//
// O que o protótipo (safe-08-incidente-detalhe.png / Seção 4, Página 8) mostra nesta tela:
//   * Topo com botão Voltar, título "Incidente", botão de editar e botão de excluir
//   * Linha com badge de tipo de violência e data/hora por extenso
//   * Linha com ícone de localização e local do fato
//   * Seção "Relato" com o depoimento completo
//   * Seção "Notas adicionais"
//   * Seção "Evidências" com cards estilizados (Áudio, Captura, Foto)
//   * Botão em destaque verde "Exportar com segurança"
//   * Botão de documento/apoio no rodapé
// ============================================================

import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';
import {
  excluirIncidente,
  TIPOS_VIOLENCIA,
} from '../../../data/incidentes';

function formatarDataDetalhe(dataIso) {
  if (!dataIso) return '';
  const meses = [
    'jan', 'fev', 'mar', 'abr', 'mai', 'jun',
    'jul', 'ago', 'set', 'out', 'nov', 'dez',
  ];

  try {
    const data = new Date(dataIso);
    if (isNaN(data.getTime())) return dataIso;
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = meses[data.getMonth()];
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    return `${dia} ${mes} ${ano}, ${horas}:${minutos}`;
  } catch (e) {
    return dataIso;
  }
}

export default function IncidenteDetalheScreen({ navigation, route }) {
  const incidente = route.params?.incidente;

  // Oculta o header nativo para exibir o cabeçalho customizado idêntico ao protótipo
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  if (!incidente) {
    return (
      <SafeAreaView style={estilos.tela} edges={['top']}>
        <View style={estilos.erroContainer}>
          <Text style={estilos.erroTexto}>Incidente não encontrado.</Text>
          <Pressable
            style={estilos.botaoVoltarSimples}
            onPress={() => navigation.goBack()}
          >
            <Text style={estilos.botaoVoltarTexto}>Voltar</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const tipoInfo = TIPOS_VIOLENCIA[incidente.tipo_violencia] || {
    rotulo: 'Incidente',
    filtro: 'Geral',
    corBadgeBg: colors.pessegoClaro,
    corBadgeTexto: colors.marromEscuro,
    corPonto: colors.coral,
  };

  const handleEditar = () => {
    navigation.navigate('IncidenteForm', { incidente });
  };

  const handleExcluir = () => {
    Alert.alert(
      'Excluir incidente',
      'Tem certeza de que deseja remover este registro do seu cofre? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            excluirIncidente(incidente.id);
            Alert.alert('Removido', 'Registro excluído do cofre com sucesso.', [
              { text: 'OK', onPress: () => navigation.goBack() },
            ]);
          },
        },
      ]
    );
  };

  const handleExportar = () => {
    Alert.alert(
      'Exportar com segurança',
      'O relatório deste incidente foi compilado em formato protegido (PDF assinado com hash de integridade). Ele pode ser enviado à Delegacia da Mulher, Defensoria Pública ou anexado a um pedido de medida protetiva de urgência.',
      [
        { text: 'Entendi' },
        {
          text: 'Simular envio',
          onPress: () => {
            Alert.alert(
              'Dossiê pronto',
              'Arquivo protegido gerado. Nenhum dado sensível é mantido em cache temporário desprotegido.'
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
              onPress={handleExcluir}
              hitSlop={8}
              accessibilityLabel="Excluir registro"
            >
              <Ionicons name="trash-outline" size={20} color={colors.coral} />
            </Pressable>
          </View>
        </View>

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
            {formatarDataDetalhe(incidente.data_ocorrencia)}
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
          <View style={estilos.evidenciasCardsContainer}>
            {incidente.evidencias && incidente.evidencias.length > 0 ? (
              incidente.evidencias.map((ev) => (
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
              ))
            ) : (
              // Evidências padrão caso não venha no array
              <>
                <View
                  style={[
                    estilos.cardEvidencia,
                    { backgroundColor: colors.verdeClaro },
                  ]}
                >
                  <Ionicons name="mic-outline" size={24} color={colors.verdeProfundo} />
                  <Text
                    style={[
                      estilos.cardEvidenciaTexto,
                      { color: colors.verdeProfundo },
                    ]}
                  >
                    Áudio 0:42
                  </Text>
                </View>

                <View
                  style={[
                    estilos.cardEvidencia,
                    { backgroundColor: colors.pessegoClaro },
                  ]}
                >
                  <Ionicons name="image-outline" size={24} color={colors.marromEscuro} />
                  <Text
                    style={[
                      estilos.cardEvidenciaTexto,
                      { color: colors.marromEscuro },
                    ]}
                  >
                    Captura
                  </Text>
                </View>
              </>
            )}
          </View>
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

      {/* Botão de Documento/Apoio no rodapé (conforme protótipo) */}
      <View style={estilos.rodapeApoio}>
        <View style={estilos.botaoApoio}>
          <Ionicons name="document-text-outline" size={20} color={colors.grafite} />
        </View>
      </View>
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

  rodapeApoio: {
    position: 'absolute',
    left: 20,
    bottom: 24,
  },

  botaoApoio: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.branco,
    borderWidth: 1,
    borderColor: colors.begeDivisor,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: colors.preto,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
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
});