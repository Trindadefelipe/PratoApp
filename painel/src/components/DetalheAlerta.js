// ============================================================
// DetalheAlerta: coluna da direita com o alerta selecionado.
//   * alerta: alerta da API (com viagem_origem/viagem_destino quando vier do /painel)
//   * contatos: Círculo de Confiança da usuária (GET /contatos?usuaria_id=)
//   * salvando: trava os botões enquanto o PUT não volta
//   * erro: mensagem do último PUT que falhou
//   * onMudarStatus(status)
// O painel nunca mostra o nome nem o e-mail da usuária: só o necessário para o atendimento.
// ============================================================
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { SeloStatus } from './ItemAlerta';
import { infoStatus, infoGatilho, hora, codigoAlerta, coordenadas, endereco } from '../formatos';

const CORES_AVATAR = [
  { fundo: colors.pessegoClaro, texto: colors.amareloProfundo },
  { fundo: colors.verdeClaro, texto: colors.verdeProfundo },
  { fundo: colors.coralClaro, texto: colors.coralEscuro },
];

const PROXIMO = { NOVO: 'EM_ATENDIMENTO', EM_ATENDIMENTO: 'CONCLUIDO', CONCLUIDO: 'NOVO' };

function Campo({ rotulo, children }) {
  return (
    <View style={estilos.campo}>
      <Text style={estilos.rotulo}>{rotulo}</Text>
      {children}
    </View>
  );
}

export default function DetalheAlerta({ alerta, contatos, salvando, erro, onMudarStatus }) {
  if (!alerta) {
    return (
      <View style={estilos.vazio}>
        <Ionicons name="notifications-outline" size={32} color={colors.cinza} />
        <Text style={estilos.vazioTexto}>Selecione um alerta para ver os detalhes.</Text>
      </View>
    );
  }

  const status = alerta.status_delegacia;
  const concluido = status === 'CONCLUIDO';

  return (
    <View style={estilos.detalhe}>
      <View style={estilos.topo}>
        <Text style={estilos.titulo}>Alerta {codigoAlerta(alerta.id)}</Text>
        <SeloStatus status={status} grande />
      </View>

      <Campo rotulo="Gatilho">
        <Text style={estilos.valor}>{infoGatilho(alerta.tipo_gatilho).longo}</Text>
      </Campo>

      <Campo rotulo="Recebido às">
        <Text style={estilos.valor}>{hora(alerta.criado_em, true)}</Text>
      </Campo>

      <Campo rotulo="Localização">
        <Text style={estilos.valor}>{coordenadas(alerta.latitude, alerta.longitude)}</Text>
        <Text style={estilos.secundario}>{endereco(alerta)}</Text>
      </Campo>

      {alerta.viagem_origem ? (
        <Campo rotulo="Viagem segura em andamento">
          <Text style={estilos.valor}>{alerta.viagem_origem} → {alerta.viagem_destino}</Text>
        </Campo>
      ) : null}

      <Campo rotulo="Círculo de Confiança avisado">
        {contatos.length ? (
          <View style={estilos.avatares}>
            {contatos.slice(0, 3).map((c, i) => {
              const cor = CORES_AVATAR[i % CORES_AVATAR.length];
              return (
                <View key={c.id} style={[estilos.avatar, { backgroundColor: cor.fundo }]}>
                  <Text style={[estilos.avatarTexto, { color: cor.texto }]}>{(c.nome || '?').trim().charAt(0).toUpperCase()}</Text>
                </View>
              );
            })}
            <Text style={estilos.secundario}>
              {contatos.length} {contatos.length === 1 ? 'contato' : 'contatos'}
            </Text>
          </View>
        ) : (
          <Text style={estilos.secundario}>Nenhum contato cadastrado.</Text>
        )}
      </Campo>

      <Campo rotulo="Status">
        <Pressable
          style={({ hovered }) => [estilos.seletor, hovered && estilos.seletorHover]}
          onPress={() => onMudarStatus(PROXIMO[status] || 'NOVO')}
          disabled={salvando}
          accessibilityRole="button"
          accessibilityLabel={`Status ${infoStatus(status).rotulo}. Tocar para avançar`}
        >
          <Text style={estilos.seletorTexto}>{infoStatus(status).rotulo}</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.grafite} />
        </Pressable>
      </Campo>

      {status === 'NOVO' && (
        <Pressable
          style={({ hovered }) => [estilos.botao, estilos.botaoPrincipal, hovered && estilos.botaoHover, salvando && estilos.desativado]}
          onPress={() => onMudarStatus('EM_ATENDIMENTO')}
          disabled={salvando}
          accessibilityRole="button"
        >
          <Text style={estilos.botaoTexto}>Assumir atendimento</Text>
        </Pressable>
      )}

      {!concluido ? (
        <Pressable
          style={({ hovered }) => [estilos.botao, estilos.botaoSecundario, hovered && estilos.botaoSecundarioHover, salvando && estilos.desativado]}
          onPress={() => onMudarStatus('CONCLUIDO')}
          disabled={salvando}
          accessibilityRole="button"
        >
          <Text style={estilos.botaoTexto}>Marcar como concluído</Text>
        </Pressable>
      ) : (
        <View style={estilos.concluido}>
          <Ionicons name="checkmark-circle" size={20} color={colors.verdeProfundo} />
          <Text style={estilos.concluidoTexto}>Atendimento concluído</Text>
        </View>
      )}

      {erro ? <Text style={estilos.erro}>{erro}</Text> : null}

      <Text style={estilos.rodape}>Dados fictícios para fins acadêmicos.</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  detalhe: {
    padding: 28,
    gap: 18,
  },
  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  titulo: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.grafite,
  },
  campo: {
    gap: 6,
  },
  rotulo: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.cinzaEscuro,
  },
  valor: {
    fontFamily: fonts.regular,
    fontSize: 17,
    color: colors.grafite,
  },
  secundario: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.cinzaEscuro,
  },
  avatares: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTexto: {
    fontFamily: fonts.bold,
    fontSize: 15,
  },
  seletor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.begeDivisor,
    paddingHorizontal: 18,
    backgroundColor: colors.branco,
    cursor: 'pointer',
  },
  seletorHover: {
    borderColor: colors.pessegoPastel,
  },
  seletorTexto: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.grafite,
  },
  botao: {
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  botaoPrincipal: {
    backgroundColor: colors.pessegoPastel,
  },
  botaoHover: {
    opacity: 0.9,
  },
  botaoSecundario: {
    backgroundColor: colors.branco,
    borderWidth: 1,
    borderColor: colors.begeDivisor,
  },
  botaoSecundarioHover: {
    borderColor: colors.pessegoPastel,
  },
  desativado: {
    opacity: 0.5,
  },
  botaoTexto: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: colors.grafite,
  },
  concluido: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 56,
    borderRadius: 18,
    backgroundColor: colors.verdeClaro,
  },
  concluidoTexto: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    color: colors.verdeProfundo,
  },
  erro: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.coralEscuro,
  },
  rodape: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.cinzaEscuro,
  },
  vazio: {
    flex: 1,
    minHeight: 240,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 28,
  },
  vazioTexto: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.cinzaEscuro,
    textAlign: 'center',
  },
});
