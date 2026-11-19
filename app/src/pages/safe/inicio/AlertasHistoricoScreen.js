// ============================================================
// TELA 15: Histórico de alertas SOS
//
// Componente: AlertasHistoricoScreen
// Navegação: Stack (push a partir do Início / SafeHomeScreen)
// Responsável: Higor Domingos (Issues #75, #76 e #78)
// Entrega Final
//
// Funcionalidades da Entrega Final:
//   * Consumo direto da API Node.js/Express (Supabase) via GET /alertas
//   * Polling periódico (atualização a cada 5s enquanto a tela está aberta)
//   * Ações de Update (PUT para avançar status) e Delete (DELETE)
//   * Nenhum dado simulado ou import de data/alertas
// ============================================================

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
  Alert,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';
import {
  listarAlertas,
  atualizarStatusAlerta,
  removerAlerta,
  USUARIA_TESTE_ID,
} from '../../../services/api';
import { lerIdUsuaria } from '../../../services/sessao';

const CONFIG_GATILHOS = {
  BOTAO_DIRETO: {
    label: 'Botão SOS',
    icone: 'radio-outline',
    corIcone: colors.coral,
  },
  FALTA_CHECKIN: {
    label: 'Falta de check-in',
    icone: 'time-outline',
    corIcone: colors.laranja,
  },
  DURESS_PIN: {
    label: 'PIN de coação',
    icone: 'lock-closed-outline',
    corIcone: colors.laranja,
  },
  SHAKE: {
    label: 'Agitar o celular',
    icone: 'phone-portrait-outline',
    corIcone: colors.laranja,
  },
  // Compatibilidade com registros legados
  botao: {
    label: 'Botão SOS',
    icone: 'radio-outline',
    corIcone: colors.coral,
  },
  deslocamento: {
    label: 'Falta de check-in',
    icone: 'time-outline',
    corIcone: colors.laranja,
  },
  duress_pin: {
    label: 'PIN de coação',
    icone: 'lock-closed-outline',
    corIcone: colors.laranja,
  },
  agitar_celular: {
    label: 'Agitar o celular',
    icone: 'phone-portrait-outline',
    corIcone: colors.laranja,
  },
};

function formatarDataHora(isoString) {
  if (!isoString) return '';
  const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  try {
    const data = new Date(isoString);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = meses[data.getMonth()];
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    return `${dia} ${mes}, ${horas}:${minutos}`;
  } catch (e) {
    return isoString;
  }
}

export default function AlertasHistoricoScreen() {
  const [listaAlertas, setListaAlertas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [recarregandoManual, setRecarregandoManual] = useState(false);
  const [erro, setErro] = useState(null);
  // Confirmação de exclusão dentro do card (o Alert.alert não funciona no navegador)
  const [idConfirmando, setIdConfirmando] = useState(null);
  const [erroExclusao, setErroExclusao] = useState(null);

  const carregarAlertas = useCallback(async (mostrarCarregando = true) => {
    if (mostrarCarregando) setCarregando(true);
    setErro(null);

    try {
      const idSessao = await lerIdUsuaria().catch(() => null);
      const usuariaId = idSessao || USUARIA_TESTE_ID;
      const dados = await listarAlertas(usuariaId);
      setListaAlertas(Array.isArray(dados) ? dados : []);
    } catch (err) {
      console.warn('[Historico] Falha ao sincronizar alertas:', err.message);
      if (mostrarCarregando) {
        setErro(err.message || 'Erro ao carregar histórico de alertas.');
      }
    } finally {
      if (mostrarCarregando) setCarregando(false);
      setRecarregandoManual(false);
    }
  }, []);

  // Polling automático a cada 5 segundos enquanto a tela estiver aberta (Issue #78)
  useEffect(() => {
    let ativo = true;

    carregarAlertas(true);

    const intervalo = setInterval(() => {
      if (ativo) {
        carregarAlertas(false);
      }
    }, 5000);

    return () => {
      ativo = false;
      clearInterval(intervalo);
    };
  }, [carregarAlertas]);

  // Ação de avançar o status (PUT /alertas/:id) para demonstrar Update (Issue #76)
  const handleAvancarStatus = async (item) => {
    let proximoStatus = 'EM_ATENDIMENTO';
    if (item.status_delegacia === 'NOVO' || item.status_delegacia === 'Novo') {
      proximoStatus = 'EM_ATENDIMENTO';
    } else if (item.status_delegacia === 'EM_ATENDIMENTO' || item.status_delegacia === 'Em atendimento') {
      proximoStatus = 'CONCLUIDO';
    } else {
      proximoStatus = 'NOVO';
    }

    try {
      await atualizarStatusAlerta(item.id, proximoStatus);
      carregarAlertas(false);
    } catch (err) {
      Alert.alert('Erro ao atualizar status', err.message);
    }
  };

  // Ação de excluir o alerta (DELETE /alertas/:id) para demonstrar Delete (Issue #76)
  const handleExcluir = async (id) => {
    try {
      await removerAlerta(id);
      setIdConfirmando(null);
      setErroExclusao(null);
      carregarAlertas(false);
    } catch (err) {
      setErroExclusao(err.message || 'Não foi possível apagar o alerta.');
    }
  };

  const renderItem = ({ item }) => {
    const infoGatilho = CONFIG_GATILHOS[item.tipo_gatilho] || {
      label: item.tipo_gatilho,
      icone: 'alert-circle-outline',
      corIcone: colors.coral,
    };

    const statusNorm = String(item.status_delegacia || '').toUpperCase();
    const isNovo = statusNorm === 'NOVO';
    const isEmAtendimento = statusNorm === 'EM_ATENDIMENTO' || statusNorm === 'EM ATENDIMENTO';
    const isConcluido = statusNorm === 'CONCLUIDO' || statusNorm === 'CONCLUÍDO';

    let badgeEstilo = styles.badgeConcluido;
    let badgeTextoEstilo = styles.badgeTextoConcluido;
    let textoFormatado = 'Concluído';

    if (isNovo) {
      badgeEstilo = styles.badgeNovo;
      badgeTextoEstilo = styles.badgeTextoNovo;
      textoFormatado = 'Novo';
    } else if (isEmAtendimento) {
      badgeEstilo = styles.badgeEmAtendimento;
      badgeTextoEstilo = styles.badgeTextoEmAtendimento;
      textoFormatado = 'Em atendimento';
    }

    const lat = typeof item.latitude === 'number' ? item.latitude.toFixed(4) : item.latitude;
    const lng = typeof item.longitude === 'number' ? item.longitude.toFixed(4) : item.longitude;

    return (
      <View style={styles.card}>
        {/* Linha 1: Data/Hora e Selo de Status interativo */}
        <View style={styles.cardHeader}>
          <Text style={styles.dataHora}>{formatarDataHora(item.criado_em)}</Text>
          <Pressable
            style={[styles.badgeStatus, badgeEstilo]}
            onPress={() => handleAvancarStatus(item)}
            accessibilityRole="button"
            accessibilityLabel={`Mudar status de ${textoFormatado}`}
          >
            <Text style={[styles.badgeStatusTexto, badgeTextoEstilo]}>
              {textoFormatado} ⟳
            </Text>
          </Pressable>
        </View>

        {/* Linha 2: Ícone do Gatilho e Ação de Excluir */}
        <View style={styles.linhaGatilho}>
          <View style={styles.gatilhoInfo}>
            <Ionicons
              name={infoGatilho.icone}
              size={18}
              color={infoGatilho.corIcone}
            />
            <Text style={styles.gatilhoTexto}>{infoGatilho.label}</Text>
          </View>
          <Pressable
            onPress={() => { setErroExclusao(null); setIdConfirmando(item.id); }}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Apagar alerta"
          >
            <Ionicons name="trash-outline" size={18} color={colors.cinza} />
          </Pressable>
        </View>

        {/* Linha 3: Localização e Coordenadas */}
        <View style={styles.linhaLocal}>
          <Ionicons name="location-outline" size={14} color={colors.cinza} />
          <Text style={styles.localTexto}>
            {item.endereco_aproximado || 'Londrina/PR'} {lat && lng ? `· ${lat}, ${lng}` : ''}
          </Text>
        </View>

        {/* Confirmação de exclusão dentro do card */}
        {idConfirmando === item.id && (
          <View style={styles.confirmacao}>
            <Text style={styles.confirmacaoTexto}>Apagar este alerta do histórico?</Text>
            {erroExclusao && <Text style={styles.confirmacaoErro}>{erroExclusao}</Text>}
            <View style={styles.confirmacaoBotoes}>
              <Pressable onPress={() => setIdConfirmando(null)} accessibilityRole="button" hitSlop={6}>
                <Text style={styles.confirmacaoCancelar}>Cancelar</Text>
              </Pressable>
              <Pressable onPress={() => handleExcluir(item.id)} accessibilityRole="button" hitSlop={6}>
                <Text style={styles.confirmacaoApagar}>Apagar</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderFooter = () => (
    <View style={styles.footer}>
      <Text style={styles.footerTexto}>
        ● Atualização em tempo real ativa
      </Text>
    </View>
  );

  const renderVazio = () => {
    if (carregando) return null;
    return (
      <View style={styles.vazioContainer}>
        <Ionicons name="shield-outline" size={48} color={colors.cinza} />
        <Text style={styles.vazioTexto}>Nenhum alerta registrado no momento.</Text>
      </View>
    );
  };

  if (carregando && listaAlertas.length === 0) {
    return (
      <View style={[styles.container, styles.centralizado]}>
        <ActivityIndicator size="large" color={colors.verdeProfundo} />
        <Text style={styles.carregandoTexto}>Carregando histórico da API...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {erro && (
        <View style={styles.bannerErro}>
          <Ionicons name="alert-circle-outline" size={18} color={colors.coral} />
          <Text style={styles.bannerErroTexto}>{erro}</Text>
        </View>
      )}

      <FlatList
        data={listaAlertas}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderVazio}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={recarregandoManual}
            onRefresh={() => {
              setRecarregandoManual(true);
              carregarAlertas(false);
            }}
            colors={[colors.verdeProfundo]}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.creme,
  },
  centralizado: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  carregandoTexto: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.grafite,
  },
  bannerErro: {
    backgroundColor: colors.coralClaro,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 8,
    gap: 8,
  },
  bannerErroTexto: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.coral,
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: colors.branco,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.begeCard,
    shadowColor: colors.preto,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dataHora: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.grafite,
  },
  badgeStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeNovo: {
    backgroundColor: colors.azulClaro,
  },
  badgeEmAtendimento: {
    backgroundColor: colors.amareloClaro,
  },
  badgeConcluido: {
    backgroundColor: colors.verdeClaro,
  },
  badgeStatusTexto: {
    fontFamily: fonts.semibold,
    fontSize: 12,
  },
  badgeTextoNovo: {
    color: colors.azulEscuro,
  },
  badgeTextoEmAtendimento: {
    color: colors.amareloEscuro,
  },
  badgeTextoConcluido: {
    color: colors.verdeProfundo,
  },
  linhaGatilho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  gatilhoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  gatilhoTexto: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.grafite,
  },
  linhaLocal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  localTexto: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.grafite,
    opacity: 0.7,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 18,
  },
  footerTexto: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.cinza,
  },
  vazioContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  vazioTexto: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.cinza,
  },
    confirmacao: {
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.coralClaro,
    gap: 8,
  },
  confirmacaoTexto: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.grafite,
  },
  confirmacaoErro: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.coral,
  },
  confirmacaoBotoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 24,
  },
  confirmacaoCancelar: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.grafite,
  },
  confirmacaoApagar: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    color: colors.coral,
  },
});
