// ============================================================
// AnelCalorias: anel colorido com as calorias do dia e o que falta para a meta.
// Usado na Tela 01 (Diário). Recebe os dados por props.
//   * fatias: lista de { kcal, cor }, uma por refeição registrada
//   * meta: meta diária em kcal
//   * tamanho: largura e altura do anel (opcional, padrão 200)
// ============================================================
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';

function formataNumero(numero){
    return String(numero).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export default function AnelCalorias({fatias, meta, tamanho = 200}){
    const espessura      = 22;
    const raio           = (tamanho - espessura) / 2;
    const circunferencia = 2 * Math.PI * raio;

    const consumidas = fatias.reduce((soma, f) => soma + f.kcal, 0);
    const restantes  = Math.max(0, meta - consumidas);

    let inicio = 0;
    const partes = fatias.map((f) => {
        const parte = {cor: f.cor, inicio, tamanho: f.kcal / meta};
        inicio += parte.tamanho;

        return parte;
    });

    partes.push({cor: colors.pessegoClaro, inicio, tamanho: Math.max(0, 1 - inicio)});

    return(
        <View style={estilos.anel}>

            <Svg width={tamanho} height={tamanho} style={{transform: [{ rotate: '-90deg' }]}}>
                {partes.map((parte, i) => (
                    <Circle
                        key={i}
                        cx={tamanho / 2}
                        cy={tamanho / 2}
                        r={raio}
                        fill="none"
                        stroke={parte.cor}
                        strokeWidth={espessura}
                        strokeLinecap="round"
                        strokeDasharray={`${Math.max(0.1, parte.tamanho * circunferencia - espessura)} ${circunferencia}`}
                        strokeDashoffset={-(parte.inicio * circunferencia + espessura / 2)}
                    />
                ))}
            </Svg>

            <View style={estilos.anelTexto}>
                <Text style={estilos.anelNumero}>{formataNumero(restantes)}</Text>
                <Text style={estilos.anelLegenda}>kcal restantes</Text>
                <Text style={estilos.anelDetalhe}>{formataNumero(consumidas)} de {formataNumero(meta)}</Text>
            </View>

        </View>
    )
}

const estilos = StyleSheet.create({
    anel: {
        alignSelf: 'center',
        marginVertical: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },

    anelTexto: {
        position: 'absolute',
        alignItems: 'center',
    },

    anelNumero: {
        fontFamily: fonts.bold,
        fontSize: 40,
        color: colors.grafite,
        lineHeight: 46,
    },

    anelLegenda: {
        fontFamily: fonts.regular,
        fontSize: 14,
        color: colors.grafite,
    },

    anelDetalhe: {
        fontFamily: fonts.regular,
        fontSize: 12,
        color: colors.cinza,
    },
})
