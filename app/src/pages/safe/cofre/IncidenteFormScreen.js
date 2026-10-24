// ============================================================
// TELA 11: Novo registro (e edição)
//
// Componente: IncidenteFormScreen
// Navegação: Stack (push sobre a lista ou a partir do detalhe)
// Responsável: João Pedro (Issue #59)
// Entrega: 2 (24/10)
//
// O que o protótipo (safe-07-incidente-form.png / Seção 4, Página 8) mostra nesta tela:
//   * Topo com botão Voltar e título "Novo registro" (ou "Editar registro")
//   * Campo "Data e hora" com ícone de relógio
//   * Campo "Tipo de violência" com chips: Verbal/Psicológica, Física, Patrimonial, Perseguição
//   * Campo "Local" com ícone de localização
//   * Campo "Relato" de múltiplas linhas
//   * Botões de evidência em caixas tracejadas: Foto, Áudio, Captura
//   * Botão principal "Salvar no cofre"
//   * Suporte completo ao modo edição quando acionado a partir da Tela 12
// ============================================================

import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';
import BotaoPrimario from '../../../components/BotaoPrimario';
import {
  adicionarIncidente,
  atualizarIncidente,
  TIPOS_VIOLENCIA,
} from '../../../data/incidentes';

const CHIPS_LINHA_1 = [
  { chave: 'VERBAL_PSICOLOGICA', rotulo: 'Verbal/Psicológica' },
  { chave: 'FISICA', rotulo: 'Física' },
  { chave: 'PATRIMONIAL', rotulo: 'Patrimonial' },
];

const CHIPS_LINHA_2 = [
  { chave: 'VIRTUAL_PERSEGUICAO', rotulo: 'Perseguição' },
];

function gerarDataHoraAtualFormatada() {
  const agora = new Date();
  const dia = String(agora.getDate()).padStart(2, '0');
  const mes = String(agora.getMonth() + 1).padStart(2, '0');
  const ano = agora.getFullYear();
  const horas = String(agora.getHours()).padStart(2, '0');
  const minutos = String(agora.getMinutes()).padStart(2, '0');
  return `${dia}/${mes}/${ano}, ${horas}:${minutos}`;
}

function formatarDataIsoParaExibicao(dataIso) {
  if (!dataIso) return gerarDataHoraAtualFormatada();
  try {
    const data = new Date(dataIso);
    if (isNaN(data.getTime())) return dataIso;
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    return `${dia}/${mes}/${ano}, ${horas}:${minutos}`;
  } catch (e) {
    return dataIso;
  }
}

export default function IncidenteFormScreen({ navigation, route }) {
  const incidenteEdicao = route.params?.incidente;
  const modoEdicao = Boolean(incidenteEdicao);

  // Remove o header nativo para manter o cabeçalho customizado idêntico ao protótipo
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // Estados dos campos do formulário
  const [dataHora, setDataHora] = useState(
    incidenteEdicao
      ? formatarDataIsoParaExibicao(incidenteEdicao.data_ocorrencia)
      : gerarDataHoraAtualFormatada()
  );

  const [tipoViolencia, setTipoViolencia] = useState(
    incidenteEdicao?.tipo_violencia || 'VERBAL_PSICOLOGICA'
  );

  const [local, setLocal] = useState(
    incidenteEdicao?.local_ocorrencia || ''
  );

  const [relato, setRelato] = useState(
    incidenteEdicao?.relato_detalhado || ''
  );

  const [notasAdicionais, setNotasAdicionais] = useState(
    incidenteEdicao?.notas_adicionais || ''
  );

  // Estado das evidências (seleção simulada conforme protótipo)
  const [evidenciasSelecionadas, setEvidenciasSelecionadas] = useState(() => {
    if (incidenteEdicao?.evidencia_tipo) {
      return [incidenteEdicao.evidencia_tipo];
    }
    return ['audio']; // Simulação padrão inicial para novos testes
  });

  const alternarEvidencia = (tipo) => {
    if (evidenciasSelecionadas.includes(tipo)) {
      setEvidenciasSelecionadas(evidenciasSelecionadas.filter((t) => t !== tipo));
    } else {
      setEvidenciasSelecionadas([...evidenciasSelecionadas, tipo]);
    }
  };

  const handleSalvar = () => {
    if (!relato.trim()) {
      Alert.alert(
        'Relato obrigatório',
        'Por favor, preencha o relato do ocorrido para registrar com segurança no cofre.'
      );
      return;
    }

    // Monta o label da evidência para exibição
    let labelEvidencia = 'Sem evidências';
    let tipoPrincipalEvidencia = null;
    let evidenciasArray = [];

    if (evidenciasSelecionadas.length > 0) {
      tipoPrincipalEvidencia = evidenciasSelecionadas[0];
      if (evidenciasSelecionadas.includes('audio')) {
        labelEvidencia = '1 áudio';
        evidenciasArray.push({
          id: 'ev-audio',
          tipo: 'audio',
          label: 'Áudio gravado',
          corBg: colors.verdeClaro,
          corTexto: colors.verdeProfundo,
          icone: 'mic-outline',
        });
      }
      if (evidenciasSelecionadas.includes('captura')) {
        labelEvidencia = evidenciasArray.length > 0 ? `${labelEvidencia} e 1 captura` : '1 captura de tela';
        evidenciasArray.push({
          id: 'ev-captura',
          tipo: 'captura',
          label: 'Captura',
          corBg: colors.pessegoClaro,
          corTexto: colors.marromEscuro,
          icone: 'image-outline',
        });
      }
      if (evidenciasSelecionadas.includes('foto')) {
        labelEvidencia = evidenciasArray.length > 0 ? `${labelEvidencia} e 1 foto` : '1 foto anexada';
        evidenciasArray.push({
          id: 'ev-foto',
          tipo: 'foto',
          label: 'Foto',
          corBg: colors.amareloClaro,
          corTexto: colors.amareloProfundo,
          icone: 'camera-outline',
        });
      }
    }

    const dadosRegistro = {
      tipo_violencia: tipoViolencia,
      local_ocorrencia: local.trim() || 'Não informado',
      relato_detalhado: relato.trim(),
      notas_adicionais: notasAdicionais.trim(),
      evidencia_tipo: tipoPrincipalEvidencia,
      evidencia_label: labelEvidencia,
      evidencias: evidenciasArray,
    };

    if (modoEdicao) {
      atualizarIncidente(incidenteEdicao.id, dadosRegistro);
      Alert.alert(
        'Registro atualizado',
        'As informações do incidente foram atualizadas com sucesso no seu cofre.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Volta para a lista ou detalhe atualizado
              navigation.navigate('IncidentesList');
            },
          },
        ]
      );
    } else {
      adicionarIncidente({
        ...dadosRegistro,
        titulo_curto: relato.trim().slice(0, 24),
      });
      Alert.alert(
        'Salvo no cofre',
        'Seu registro foi guardado de forma sigilosa e protegida.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={estilos.tela} edges={['top']}>
      <ScrollView
        contentContainerStyle={estilos.scrollConteudo}
        showsVerticalScrollIndicator={false}
      >
        {/* Topo: Botão Voltar e Título */}
        <View style={estilos.topo}>
          <Pressable
            style={({ pressed }) => [
              estilos.botaoVoltar,
              pressed && estilos.botaoVoltarPressionado,
            ]}
            onPress={() => navigation.goBack()}
            hitSlop={8}
            accessibilityLabel="Voltar"
          >
            <Ionicons name="chevron-back" size={22} color={colors.grafite} />
          </Pressable>

          <Text style={estilos.tituloTopo}>
            {modoEdicao ? 'Editar registro' : 'Novo registro'}
          </Text>
        </View>

        {/* Formulário */}
        <View style={estilos.formulario}>
          {/* Campo Data e hora */}
          <View style={estilos.campoGrupo}>
            <Text style={estilos.rotulo}>Data e hora</Text>
            <View style={estilos.inputContainer}>
              <Ionicons
                name="time-outline"
                size={20}
                color={colors.cinza}
                style={estilos.iconeInput}
              />
              <TextInput
                style={estilos.inputTexto}
                value={dataHora}
                onChangeText={setDataHora}
                placeholder="DD/MM/AAAA, HH:mm"
                placeholderTextColor={colors.cinza}
              />
            </View>
          </View>

          {/* Campo Tipo de violência com Chips */}
          <View style={estilos.campoGrupo}>
            <Text style={estilos.rotulo}>Tipo de violência</Text>
            
            {/* Linha 1 de chips */}
            <View style={estilos.linhaChips}>
              {CHIPS_LINHA_1.map((item) => {
                const ativo = tipoViolencia === item.chave;
                return (
                  <Pressable
                    key={item.chave}
                    style={[
                      estilos.chip,
                      ativo && estilos.chipAtivo,
                    ]}
                    onPress={() => setTipoViolencia(item.chave)}
                  >
                    <Text
                      style={[
                        estilos.chipTexto,
                        ativo && estilos.chipTextoAtivo,
                      ]}
                    >
                      {item.rotulo}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Linha 2 de chips */}
            <View style={[estilos.linhaChips, { marginTop: 8 }]}>
              {CHIPS_LINHA_2.map((item) => {
                const ativo = tipoViolencia === item.chave;
                return (
                  <Pressable
                    key={item.chave}
                    style={[
                      estilos.chip,
                      ativo && estilos.chipAtivo,
                    ]}
                    onPress={() => setTipoViolencia(item.chave)}
                  >
                    <Text
                      style={[
                        estilos.chipTexto,
                        ativo && estilos.chipTextoAtivo,
                      ]}
                    >
                      {item.rotulo}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Campo Local */}
          <View style={estilos.campoGrupo}>
            <Text style={estilos.rotulo}>Local</Text>
            <View style={estilos.inputContainer}>
              <Ionicons
                name="location-outline"
                size={20}
                color={colors.cinza}
                style={estilos.iconeInput}
              />
              <TextInput
                style={estilos.inputTexto}
                value={local}
                onChangeText={setLocal}
                placeholder="Ex.: Em casa, no trabalho..."
                placeholderTextColor={colors.cinza}
              />
            </View>
          </View>

          {/* Campo Relato */}
          <View style={estilos.campoGrupo}>
            <Text style={estilos.rotulo}>Relato</Text>
            <TextInput
              style={estilos.inputRelato}
              value={relato}
              onChangeText={setRelato}
              placeholder="Descreva o que aconteceu com o máximo de detalhes que se lembrar..."
              placeholderTextColor={colors.cinza}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>

          {/* Seção Evidências (Caixas tracejadas interativas) */}
          <View style={estilos.campoGrupo}>
            <Text style={estilos.rotulo}>Evidências</Text>
            <View style={estilos.evidenciasLinha}>
              {/* Foto */}
              <Pressable
                style={[
                  estilos.caixaEvidencia,
                  evidenciasSelecionadas.includes('foto') && estilos.caixaEvidenciaAtiva,
                ]}
                onPress={() => alternarEvidencia('foto')}
              >
                <Ionicons
                  name="camera-outline"
                  size={24}
                  color={
                    evidenciasSelecionadas.includes('foto')
                      ? colors.marromEscuro
                      : colors.cinza
                  }
                />
                <Text
                  style={[
                    estilos.textoEvidencia,
                    evidenciasSelecionadas.includes('foto') && estilos.textoEvidenciaAtivo,
                  ]}
                >
                  Foto
                </Text>
              </Pressable>

              {/* Áudio */}
              <Pressable
                style={[
                  estilos.caixaEvidencia,
                  evidenciasSelecionadas.includes('audio') && estilos.caixaEvidenciaAtiva,
                ]}
                onPress={() => alternarEvidencia('audio')}
              >
                <Ionicons
                  name="mic-outline"
                  size={24}
                  color={
                    evidenciasSelecionadas.includes('audio')
                      ? colors.verdeProfundo
                      : colors.cinza
                  }
                />
                <Text
                  style={[
                    estilos.textoEvidencia,
                    evidenciasSelecionadas.includes('audio') && estilos.textoEvidenciaAtivo,
                  ]}
                >
                  Áudio
                </Text>
              </Pressable>

              {/* Captura */}
              <Pressable
                style={[
                  estilos.caixaEvidencia,
                  evidenciasSelecionadas.includes('captura') && estilos.caixaEvidenciaAtiva,
                ]}
                onPress={() => alternarEvidencia('captura')}
              >
                <Ionicons
                  name="image-outline"
                  size={24}
                  color={
                    evidenciasSelecionadas.includes('captura')
                      ? colors.marromEscuro
                      : colors.cinza
                  }
                />
                <Text
                  style={[
                    estilos.textoEvidencia,
                    evidenciasSelecionadas.includes('captura') && estilos.textoEvidenciaAtivo,
                  ]}
                >
                  Captura
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Botão Principal Salvar no Cofre */}
          <BotaoPrimario
            titulo="Salvar no cofre"
            onPress={handleSalvar}
            style={estilos.botaoSalvar}
          />
        </View>
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
    alignItems: 'center',
    marginBottom: 20,
    gap: 16,
  },

  botaoVoltar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.branco,
    borderWidth: 1,
    borderColor: colors.begeDivisor,
    alignItems: 'center',
    justifyContent: 'center',
  },

  botaoVoltarPressionado: {
    opacity: 0.7,
  },

  tituloTopo: {
    fontFamily: fonts.bold,
    fontSize: 26,
    color: colors.grafite,
  },

  formulario: {
    gap: 18,
  },

  campoGrupo: {
    gap: 8,
  },

  rotulo: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.grafite,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.branco,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.begeDivisor,
    paddingHorizontal: 14,
    height: 50,
  },

  iconeInput: {
    marginRight: 10,
  },

  inputTexto: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.grafite,
  },

  linhaChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  chip: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.pessegoClaro,
    backgroundColor: colors.branco,
  },

  chipAtivo: {
    backgroundColor: colors.pessegoClaro,
    borderColor: colors.pessegoPastel,
  },

  chipTexto: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.grafite,
  },

  chipTextoAtivo: {
    fontFamily: fonts.semibold,
    color: colors.marromEscuro,
  },

  inputRelato: {
    backgroundColor: colors.branco,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.begeDivisor,
    padding: 14,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.grafite,
    minHeight: 120,
    lineHeight: 20,
  },

  evidenciasLinha: {
    flexDirection: 'row',
    gap: 12,
  },

  caixaEvidencia: {
    flex: 1,
    height: 76,
    backgroundColor: colors.branco,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.begeDivisor,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },

  caixaEvidenciaAtiva: {
    backgroundColor: colors.pessegoSuave,
    borderColor: colors.pessegoPastel,
    borderStyle: 'solid',
  },

  textoEvidencia: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.cinza,
  },

  textoEvidenciaAtivo: {
    color: colors.grafite,
    fontFamily: fonts.semibold,
  },

  botaoSalvar: {
    marginTop: 10,
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
});