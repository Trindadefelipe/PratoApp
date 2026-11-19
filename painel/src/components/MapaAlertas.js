// ============================================================
// MapaAlertas: mapa ilustrado com um ponto por alerta, na cor do status.
// Não usa mapa real (Google/OSM): as ruas são desenho e a posição de cada ponto
// vem da latitude e longitude do alerta, encaixada na área do mapa.
// Alertas no mesmo lugar são afastados em espiral para não ficarem um em cima do outro.
//   * alertas: lista de alertas da API
//   * selecionadoId: id do alerta aberto no detalhe
//   * onSelecionar(id)
// ============================================================
import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { STATUS, infoStatus, infoGatilho, quando } from '../formatos';

const MARGEM = 0.14;       // folga nas bordas (14% de cada lado)
const DISTANCIA_MIN = 0.07; // distância mínima entre pontos (em fração do mapa)

// Converte as coordenadas em posições de 0 a 1 dentro do mapa.
function calcularPosicoes(alertas) {
  const lats = alertas.map((a) => Number(a.latitude));
  const lngs = alertas.map((a) => Number(a.longitude));
  const minLat = Math.min(...lats), maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
  const faixaLat = maxLat - minLat || 1;
  const faixaLng = maxLng - minLng || 1;

  const posicoes = [];
  alertas.forEach((a, i) => {
    let x = maxLng === minLng ? 0.5 : (Number(a.longitude) - minLng) / faixaLng;
    let y = maxLat === minLat ? 0.5 : 1 - (Number(a.latitude) - minLat) / faixaLat;
    x = MARGEM + x * (1 - 2 * MARGEM);
    y = MARGEM + y * (1 - 2 * MARGEM);

    // Espiral: se cair perto de outro ponto, afasta um pouco por vez.
    let passo = 0;
    while (posicoes.some((p) => Math.hypot(p.x - x, p.y - y) < DISTANCIA_MIN) && passo < 60) {
      passo += 1;
      const angulo = passo * 2.4;
      const raio = 0.035 * Math.sqrt(passo);
      x = Math.min(0.92, Math.max(0.08, x + Math.cos(angulo) * raio));
      y = Math.min(0.92, Math.max(0.08, y + Math.sin(angulo) * raio));
    }
    posicoes.push({ id: a.id, x, y, indice: i });
  });
  return posicoes;
}

export default function MapaAlertas({ alertas, selecionadoId, onSelecionar }) {
  const [tamanho, setTamanho] = useState({ largura: 0, altura: 0 });
  const posicoes = alertas.length ? calcularPosicoes(alertas) : [];
  const selecionado = alertas.find((a) => a.id === selecionadoId);

  return (
    <View
      style={estilos.mapa}
      onLayout={(e) => setTamanho({ largura: e.nativeEvent.layout.width, altura: e.nativeEvent.layout.height })}
      accessibilityLabel="Mapa ilustrado com a posição aproximada dos alertas"
    >
      {/* Quadras verdes */}
      <View style={[estilos.quadra, { left: 0, top: '7%', width: '19%', height: '22%' }]} />
      <View style={[estilos.quadra, { right: 0, bottom: '9%', width: '37%', height: '26%' }]} />
      <View style={[estilos.quadra, { left: '62%', top: '-4%', width: '14%', height: '18%' }]} />

      {/* Ruas */}
      <View style={[estilos.rua, { top: '20%', left: '-5%', width: '110%', height: 18, transform: [{ rotate: '1.2deg' }] }]} />
      <View style={[estilos.rua, estilos.avenida, { top: '46%', left: '-5%', width: '110%', transform: [{ rotate: '-1.5deg' }] }]} />
      <View style={[estilos.rua, { top: '70%', left: '-5%', width: '110%', height: 22, transform: [{ rotate: '-2.5deg' }] }]} />
      <View style={[estilos.rua, estilos.avenida, { left: '30%', top: '-5%', height: '110%', transform: [{ rotate: '-1.5deg' }] }]} />
      <View style={[estilos.rua, { left: '77%', top: '-5%', width: 20, height: '110%', transform: [{ rotate: '-2deg' }] }]} />

      {/* Legenda */}
      <View style={estilos.legenda}>
        {Object.entries(STATUS).map(([chave, s]) => (
          <View key={chave} style={estilos.legendaItem}>
            <View style={[estilos.legendaPonto, { backgroundColor: s.ponto }]} />
            <Text style={estilos.legendaTexto}>{s.rotulo}</Text>
          </View>
        ))}
      </View>

      {/* Pontos dos alertas */}
      {tamanho.largura > 0 && posicoes.map((p) => {
        const alerta = alertas[p.indice];
        const s = infoStatus(alerta.status_delegacia);
        const ativo = alerta.id === selecionadoId;
        const halo = ativo ? 84 : alerta.status_delegacia === 'NOVO' ? 64 : 52;
        return (
          <Pressable
            key={alerta.id}
            onPress={() => onSelecionar(alerta.id)}
            accessibilityRole="button"
            accessibilityLabel={`${infoGatilho(alerta.tipo_gatilho).curto}, ${s.rotulo}, ${quando(alerta.criado_em)}`}
            style={[
              estilos.halo,
              {
                width: halo, height: halo, borderRadius: halo / 2,
                left: p.x * tamanho.largura - halo / 2,
                top: p.y * tamanho.altura - halo / 2,
                backgroundColor: s.ponto + (ativo ? '40' : '2E'),
                zIndex: ativo ? 3 : 1,
              },
            ]}
          >
            <View style={[estilos.ponto, ativo && estilos.pontoAtivo, { backgroundColor: s.ponto }]} />
          </Pressable>
        );
      })}

      {selecionado && (
        <Text style={estilos.aviso}>Posições aproximadas, a partir das coordenadas enviadas pelo app.</Text>
      )}
      {!alertas.length && (
        <View style={estilos.vazio}>
          <Text style={estilos.vazioTexto}>Nenhum alerta para mostrar no mapa.</Text>
        </View>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  mapa: {
    flex: 1,
    minHeight: 360,
    backgroundColor: colors.mapaFundo,
    overflow: 'hidden',
    position: 'relative',
  },
  quadra: {
    position: 'absolute',
    backgroundColor: colors.verdeClaro,
    borderRadius: 18,
  },
  rua: {
    position: 'absolute',
    backgroundColor: colors.branco,
    opacity: 0.9,
  },
  avenida: {
    height: 34,
    width: 34,
  },
  legenda: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    backgroundColor: colors.branco,
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 16,
    zIndex: 5,
    shadowColor: colors.sombra,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  legendaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendaPonto: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendaTexto: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.grafite,
  },
  halo: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  ponto: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: colors.branco,
  },
  pontoAtivo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 4,
  },
  aviso: {
    position: 'absolute',
    left: 20,
    bottom: 14,
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.cinzaEscuro,
    backgroundColor: colors.branco,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    zIndex: 5,
  },
  vazio: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vazioTexto: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.cinzaEscuro,
    backgroundColor: colors.branco,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
});
