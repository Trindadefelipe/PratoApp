// ============================================================
// TELA 11: Novo registro (e edição)
//
// Componente: IncidenteFormScreen
// Navegação: Stack (push sobre a lista ou a partir do detalhe)
// Responsável: João Pedro
// Entrega Final: Integrado à API REST (Issue #81)
//
// O que o protótipo (safe-07-incidente-form.png / Seção 4, Página 8) mostra nesta tela:
//   * Topo com botão Voltar e título "Novo registro" (ou "Editar registro")
//   * Campo "Data e hora" com ícone de relógio
//   * Campo "Tipo de violência" com chips: Verbal/Psicológica, Física, Patrimonial, Perseguição
//   * Campo "Local" com ícone de localização
//   * Campo "Relato" de múltiplas linhas
//   * Campo "Notas adicionais" opcional (notas_adicionais do DER, exibido na Tela 12)
//   * Botões de evidência em caixas tracejadas: Foto, Áudio, Captura
//   * Botão principal "Salvar no cofre"
//   * Suporte completo ao modo edição com POST /incidentes e PUT /incidentes/:id
// ============================================================

import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';
import BotaoPrimario from '../../../components/BotaoPrimario';
import { criarIncidente, atualizarIncidente } from '../../../services/api';
import { idUsuariaAtual } from '../../../services/sessao';
import {
  formatarDataIsoParaInput,
  converterDataInputParaIso,
  extrairEvidencias,
  montarAnexoEvidenciaUrl,
} from '../../../services/incidentes';

const CHIPS_LINHA_1 = [
  { chave: 'VERBAL_PSICOLOGICA', rotulo: 'Verbal/Psicológica' },
  { chave: 'FISICA', rotulo: 'Física' },
  { chave: 'PATRIMONIAL', rotulo: 'Patrimonial' },
];

const CHIPS_LINHA_2 = [
  { chave: 'VIRTUAL_PERSEGUICAO', rotulo: 'Perseguição' },
];

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
      ? formatarDataIsoParaInput(incidenteEdicao.data_ocorrencia)
      : formatarDataIsoParaInput()
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

  const [evidenciasSelecionadas, setEvidenciasSelecionadas] = useState(() => {
    if (incidenteEdicao?.anexo_evidencia_url) {
      return extrairEvidencias(incidenteEdicao.anexo_evidencia_url).tipos;
    }
    return [];
  });

  const [salvando, setSalvando] = useState(false);
  const [erroFormulario, setErroFormulario] = useState(null);

  const alternarEvidencia = (tipo) => {
    if (evidenciasSelecionadas.includes(tipo)) {
      setEvidenciasSelecionadas(evidenciasSelecionadas.filter((t) => t !== tipo));
    } else {
      setEvidenciasSelecionadas([...evidenciasSelecionadas, tipo]);
    }
  };

  const handleSalvar = async () => {
    setErroFormulario(null);

    if (!relato.trim()) {
      setErroFormulario('Por favor, preencha o relato do ocorrido.');
      return;
    }

    const dataIso = converterDataInputParaIso(dataHora);
    if (!dataIso) {
      setErroFormulario('Informe a data e hora no formato DD/MM/AAAA, HH:mm.');
      return;
    }

    const dadosRegistro = {
      usuaria_id: incidenteEdicao?.usuaria_id || (await idUsuariaAtual()),
      data_ocorrencia: dataIso,
      tipo_violencia: tipoViolencia,
      local_ocorrencia: local.trim() || null,
      relato_detalhado: relato.trim(),
      notas_adicionais: notasAdicionais.trim() || null,
      anexo_evidencia_url: montarAnexoEvidenciaUrl(evidenciasSelecionadas),
    };

    try {
      setSalvando(true);
      if (modoEdicao) {
        await atualizarIncidente(incidenteEdicao.id, dadosRegistro);
      } else {
        await criarIncidente(dadosRegistro);
      }
      navigation.goBack();
    } catch (err) {
      setErroFormulario(err.message || 'Falha ao salvar registro na API.');
    } finally {
      setSalvando(false);
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

        {/* Mensagem de erro da API ou validação */}
        {erroFormulario && (
          <View style={estilos.erroBanner}>
            <Ionicons name="alert-circle" size={20} color={colors.coral} style={estilos.erroBannerIcone} />
            <Text style={estilos.erroBannerTexto}>{erroFormulario}</Text>
          </View>
        )}

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

          {/* Campo Notas adicionais (opcional, aparece na Tela 12) */}
          <View style={estilos.campoGrupo}>
            <Text style={estilos.rotulo}>Notas adicionais (opcional)</Text>
            <TextInput
              style={[estilos.inputRelato, estilos.inputNotas]}
              value={notasAdicionais}
              onChangeText={setNotasAdicionais}
              placeholder="Testemunhas, contexto ou qualquer detalhe extra..."
              placeholderTextColor={colors.cinza}
              multiline
              numberOfLines={3}
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
            titulo={salvando ? 'Salvando no cofre...' : 'Salvar no cofre'}
            onPress={handleSalvar}
            desativado={salvando}
            style={estilos.botaoSalvar}
          />
        </View>
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

  inputNotas: {
    minHeight: 80,
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
});