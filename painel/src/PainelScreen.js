// ============================================================
// PainelScreen: tela única do Painel da Delegacia.
//
// Layout (protótipo docs/prototipo/painel-delegacia-web.png):
//   * Topo: logotipo, "Painel da Delegacia", selo "Ao vivo", central e relógio
//   * Esquerda: contadores (novos, em atendimento, concluídos) e lista de alertas
//   * Centro: mapa ilustrado com um ponto por alerta
//   * Direita: detalhe do alerta selecionado e botões de atendimento
// Em telas estreitas as três colunas ficam uma embaixo da outra.
//
// Dados: busca GET /alertas e GET /painel a cada 5 segundos (tempo real por polling)
// e muda o status com PUT /alertas/:id.
// Responsáveis: Higor Domingos (rota /painel, #78) e Alana Caled (painel em React Native)
// ============================================================
import { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { colors } from './theme/colors';
import { fonts } from './theme/fonts';
import { listarAlertas, buscarPainel, listarContatos, mudarStatus } from './services/api';
import { STATUS, hora } from './formatos';
import MapaAlertas from './components/MapaAlertas';
import ItemAlerta from './components/ItemAlerta';
import DetalheAlerta from './components/DetalheAlerta';

const INTERVALO_MS = 5000;
const LARGURA_TRES_COLUNAS = 1000;

export default function PainelScreen() {
  const { width } = useWindowDimensions();
  const tresColunas = width >= LARGURA_TRES_COLUNAS;

  const [alertas, setAlertas] = useState([]);
  const [selecionadoId, setSelecionadoId] = useState(null);
  const [contatosPorUsuaria, setContatosPorUsuaria] = useState({});
  const [conectado, setConectado] = useState(true);
  const [erroCarga, setErroCarga] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erroStatus, setErroStatus] = useState(null);
  const [agora, setAgora] = useState(new Date());
  const selecionadoRef = useRef(null);
  selecionadoRef.current = selecionadoId;

  const carregar = useCallback(async () => {
    try {
      const [todos, painel] = await Promise.all([listarAlertas(), buscarPainel()]);
      // O /painel traz a viagem dos alertas abertos: junta com a lista completa
      const extras = {};
      (painel?.alertas || []).forEach((a) => { extras[a.id] = a; });
      const lista = (Array.isArray(todos) ? todos : [])
        .map((a) => ({ ...a, viagem_origem: extras[a.id]?.viagem_origem, viagem_destino: extras[a.id]?.viagem_destino }))
        .sort((x, y) => new Date(y.criado_em) - new Date(x.criado_em));
      setAlertas(lista);
      setConectado(true);
      setErroCarga(null);
      // Seleciona o mais recente na primeira carga (ou se o selecionado sumiu)
      if (lista.length && !lista.some((a) => a.id === selecionadoRef.current)) {
        setSelecionadoId(lista[0].id);
      }
    } catch (err) {
      setConectado(false);
      setErroCarga(err.message);
    } finally {
      setCarregando(false);
    }
  }, []);

  // Polling: atualiza a lista a cada 5 segundos
  useEffect(() => {
    carregar();
    const id = setInterval(carregar, INTERVALO_MS);
    return () => clearInterval(id);
  }, [carregar]);

  // Relógio do topo
  useEffect(() => {
    const id = setInterval(() => setAgora(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const selecionado = alertas.find((a) => a.id === selecionadoId) || null;

  // Busca o Círculo de Confiança da usuária do alerta selecionado (uma vez por usuária)
  useEffect(() => {
    const usuariaId = selecionado?.usuaria_id;
    if (!usuariaId || contatosPorUsuaria[usuariaId]) return;
    listarContatos(usuariaId)
      .then((lista) => setContatosPorUsuaria((atual) => ({ ...atual, [usuariaId]: Array.isArray(lista) ? lista : [] })))
      .catch(() => setContatosPorUsuaria((atual) => ({ ...atual, [usuariaId]: [] })));
  }, [selecionado?.usuaria_id, contatosPorUsuaria]);

  async function alterarStatus(novoStatus) {
    if (!selecionado) return;
    setSalvando(true);
    setErroStatus(null);
    try {
      await mudarStatus(selecionado.id, novoStatus);
      setAlertas((atual) => atual.map((a) => (a.id === selecionado.id ? { ...a, status_delegacia: novoStatus } : a)));
      carregar();
    } catch (err) {
      setErroStatus(err.message);
    } finally {
      setSalvando(false);
    }
  }

  const contagem = (status) => alertas.filter((a) => a.status_delegacia === status).length;

  const colunaAlertas = (
    <View style={[estilos.colunaEsquerda, tresColunas ? estilos.colunaEsquerdaLarga : estilos.colunaCheia]}>
      <View style={estilos.contadores}>
        {Object.entries(STATUS).map(([chave, s]) => (
          <View key={chave} style={[estilos.contador, chave !== 'NOVO' && estilos.contadorLargo, { backgroundColor: s.fundo }]}>
            <Text style={[estilos.contadorNumero, { color: s.texto }]}>{contagem(chave)}</Text>
            <Text style={[estilos.contadorRotulo, { color: s.texto }]}>{s.plural}</Text>
          </View>
        ))}
      </View>

      <Text style={estilos.secao}>Alertas</Text>

      {erroCarga ? <Text style={estilos.erroCarga}>{erroCarga}</Text> : null}
      {!carregando && !erroCarga && !alertas.length ? (
        <Text style={estilos.semAlertas}>Nenhum alerta recebido ainda.</Text>
      ) : null}

      <View style={estilos.lista}>
        {alertas.map((a) => (
          <ItemAlerta
            key={a.id}
            alerta={a}
            ativo={a.id === selecionadoId}
            agora={agora}
            onPress={() => { setSelecionadoId(a.id); setErroStatus(null); }}
          />
        ))}
      </View>
    </View>
  );

  const mapa = (
    <View style={[estilos.colunaMapa, !tresColunas && estilos.mapaEmpilhado]}>
      <MapaAlertas alertas={alertas} selecionadoId={selecionadoId} onSelecionar={(id) => { setSelecionadoId(id); setErroStatus(null); }} />
    </View>
  );

  const detalhe = (
    <View style={[estilos.colunaDireita, tresColunas ? estilos.colunaDireitaLarga : estilos.colunaCheia]}>
      <DetalheAlerta
        alerta={selecionado}
        contatos={(selecionado && contatosPorUsuaria[selecionado.usuaria_id]) || []}
        salvando={salvando}
        erro={erroStatus}
        onMudarStatus={alterarStatus}
      />
    </View>
  );

  return (
    <View style={estilos.tela}>
      <View style={estilos.topo}>
        <View style={estilos.marca}>
          <View style={estilos.logo}>
            <Image source={require('../assets/logo.png')} style={estilos.logoImagem} />
          </View>
          <Text style={[estilos.titulo, width < 700 && estilos.tituloPequeno]}>Painel da Delegacia</Text>
          <View style={[estilos.aoVivo, !conectado && estilos.semConexao]}>
            <View style={[estilos.aoVivoPonto, !conectado && estilos.semConexaoPonto]} />
            <Text style={[estilos.aoVivoTexto, !conectado && estilos.semConexaoTexto]}>
              {conectado ? 'Ao vivo' : 'Sem conexão'}
            </Text>
          </View>
        </View>
        <View style={estilos.topoDireita}>
          {width >= 700 ? <Text style={estilos.central}>Central 190 · Londrina</Text> : null}
          <Text style={estilos.relogio}>{hora(agora)}</Text>
        </View>
      </View>

      {tresColunas ? (
        <View style={estilos.corpo}>
          <ScrollView style={estilos.rolagemEsquerda}>{colunaAlertas}</ScrollView>
          {mapa}
          <ScrollView style={estilos.rolagemDireita}>{detalhe}</ScrollView>
        </View>
      ) : (
        <ScrollView>
          {detalhe}
          {mapa}
          {colunaAlertas}
        </ScrollView>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    height: '100vh',
    backgroundColor: colors.branco,
  },
  topo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderBottomWidth: 1,
    borderBottomColor: colors.begeDivisor,
    backgroundColor: colors.branco,
  },
  marca: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  tituloPequeno: {
    fontSize: 18,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.verdeClaro,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImagem: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
  },
  titulo: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.grafite,
  },
  aoVivo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.verdeClaro,
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  aoVivoPonto: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.verdeProfundo,
  },
  aoVivoTexto: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    color: colors.verdeProfundo,
  },
  semConexao: {
    backgroundColor: colors.coralClaro,
  },
  semConexaoPonto: {
    backgroundColor: colors.coral,
  },
  semConexaoTexto: {
    color: colors.coralEscuro,
  },
  topoDireita: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 28,
  },
  central: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.cinzaEscuro,
  },
  relogio: {
    fontFamily: fonts.semibold,
    fontSize: 17,
    color: colors.grafite,
  },
  corpo: {
    flex: 1,
    flexDirection: 'row',
  },
  rolagemEsquerda: {
    width: 390,
    flexGrow: 0,
    backgroundColor: colors.creme,
    borderRightWidth: 1,
    borderRightColor: colors.begeDivisor,
  },
  rolagemDireita: {
    width: 380,
    flexGrow: 0,
    backgroundColor: colors.branco,
    borderLeftWidth: 1,
    borderLeftColor: colors.begeDivisor,
  },
  colunaEsquerda: {
    padding: 24,
    gap: 16,
    backgroundColor: colors.creme,
  },
  colunaEsquerdaLarga: {
    minHeight: '100%',
  },
  colunaCheia: {
    width: '100%',
  },
  colunaMapa: {
    flex: 1,
  },
  mapaEmpilhado: {
    height: 420,
    flex: 0,
  },
  colunaDireita: {
    backgroundColor: colors.branco,
  },
  colunaDireitaLarga: {
    minHeight: '100%',
  },
  contadores: {
    flexDirection: 'row',
    gap: 10,
  },
  contador: {
    flexGrow: 1,
    flexBasis: 0,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 12,
    minHeight: 104,
  },
  contadorLargo: {
    flexGrow: 1.35,
  },
  contadorNumero: {
    fontFamily: fonts.bold,
    fontSize: 30,
  },
  contadorRotulo: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 18,
  },
  secao: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    color: colors.grafite,
    marginTop: 8,
  },
  lista: {
    gap: 12,
  },
  erroCarga: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.coralEscuro,
    backgroundColor: colors.coralClaro,
    padding: 12,
    borderRadius: 12,
  },
  semAlertas: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.cinzaEscuro,
  },
});
