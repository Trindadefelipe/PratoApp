// ============================================================
// GraficoSemana: barras de calorias por dia com a linha tracejada da meta.
// Usado na Tela 02 (Metas). Recebe os dados por props.
//   * dados: lista de { dia, kcal }
//   * meta: meta diária em kcal
//   * altura: altura das barras (opcional, padrão 150)
// ============================================================
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';

function formataNumero(numero) {
  return String(numero).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export default function GraficoSemana({ dados, meta, altura = 150 }) {
  const maior = Math.max(meta, ...dados.map((d) => d.kcal));

  const hoje = dados.reduce((ultimo, d, i) => (d.kcal > 0 ? i : ultimo), 0);

  return (
    <View>
      <View style={[estilos.grafico, { height: altura }]}>
        <View style={[estilos.linhaMeta, { bottom: (meta / maior) * altura }]}>
          {Array.from({ length: 40 }, (_, i) => <View key={i} style={estilos.traco} />)}
        </View>
        {dados.map((d, i) => (
          <View key={d.dia} style={estilos.coluna}>
            <View
              style={[
                estilos.barra,
                d.kcal === 0
                  ? estilos.barraVazia
                  : {
                      height: (d.kcal / maior) * altura,
                      backgroundColor: i === hoje ? colors.pessegoPastel : colors.verdeFolha,
                    },
              ]}
            />
          </View>
        ))}
      </View>
      <View style={estilos.dias}>
        {dados.map((d) => (
          <Text key={d.dia} style={estilos.dia}>{d.dia[0]}</Text>
        ))}
      </View>
      <Text style={estilos.legenda}>Linha tracejada: sua meta de {formataNumero(meta)} kcal</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
    grafico: { 
        flexDirection: 'row', 
        alignItems: 'flex-end', 
        marginTop: 16 
    },

    linhaMeta: {
        position: 'absolute', 
        left: 0, 
        right: 0, 
        flexDirection: 'row',
        justifyContent: 'space-between', 
        overflow: 'hidden',
    },

    traco: { 
        width: 5, 
        height: 1.5, 
        backgroundColor: colors.pessegoPastel 
    },

    coluna: { 
        flex: 1, 
        alignItems: 'center' 
    },

    barra: { 
        width: 26, 
        borderRadius: 10 
    },

    barraVazia: { 
        height: 6, 
        backgroundColor: colors.pessegoClaro 
    },

    dias: { 
        flexDirection: 'row', 
        marginTop: 8 
    },

    dia: { 
        flex: 1, 
        textAlign: 'center', 
        fontFamily: fonts.regular, 
        fontSize: 13, 
        color: colors.cinza
    },

    legenda: { 
        fontFamily: fonts.regular, 
        fontSize: 13, 
        color: colors.cinza, 
        marginTop: 8 
    },

});